import React, { useState } from 'react';
import { BedIcon } from './Icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#rooms', label: 'Rooms' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#payment', label: 'Payment' },
        { href: '#bookings', label: 'My Bookings' },
    ];

    return (
        <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-brand-secondary">
                    <BedIcon className="w-8 h-8"/>
                    <span>Sri Balaji PG</span>
                </a>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-300 hover:text-brand-secondary transition-colors duration-300">{link.label}</a>
                    ))}
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-brand-dark">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                             <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-light hover:bg-brand-gray">{link.label}</a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;