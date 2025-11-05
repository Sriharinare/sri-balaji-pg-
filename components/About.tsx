import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6">
                <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Your Ideal Home</span>
                            <span className="block text-brand-secondary">in the City.</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">
                           Welcome to Sri Balaji PG, the premier choice for gents seeking comfort, security, and convenience. We provide a clean, friendly environment with top-notch facilities including attached bathrooms, high-speed Wi-Fi, and 3 times delicious South & North Indian meals daily.
                        </p>
                        <div className="mt-6">
                            <a href="#rooms" className="text-base font-medium rounded-md text-white bg-brand-primary hover:bg-blue-700 px-8 py-3">Explore Rooms</a>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:w-1/2">
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <img className="relative rounded-lg shadow-2xl w-full" src="https://picsum.photos/seed/about/600/400" alt="Friendly hostel staff" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;