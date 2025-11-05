import React, { useState, useEffect } from 'react';
import type { Room, Booking } from '../types';
import { CalendarIcon, UsersIcon, BedIcon, UserIcon, MailIcon, PhoneIcon } from './Icons';
import { MANAGER_PHONE_NUMBER } from '../constants';

interface HeroProps {
    onBook: (details: Omit<Booking, 'id' | 'totalPrice' | 'room'>) => Booking;
    rooms: Room[];
}

const Hero: React.FC<HeroProps> = ({ onBook, rooms }) => {
    const getToday = () => new Date().toISOString().split('T')[0];
    
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const [checkIn, setCheckIn] = useState(getToday());
    const [checkOut, setCheckOut] = useState(getTomorrow());
    const [guests, setGuests] = useState(1);
    const [roomId, setRoomId] = useState(rooms[0]?.id || 1);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userContact, setUserContact] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const resetForm = () => {
        setCheckIn(getToday());
        setCheckOut(getTomorrow());
        setGuests(1);
        setRoomId(rooms[0]?.id || 1);
        setUserName('');
        setUserEmail('');
        setUserContact('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!checkIn || !checkOut || !guests || !roomId || !userName || !userEmail || !userContact) {
            setError('Please fill in all fields.');
            return;
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            setError('Check-out date must be after check-in date.');
            return;
        }

        const selectedRoom = rooms.find(r => r.id === roomId);
        if (selectedRoom && guests > selectedRoom.capacity) {
            setError(`The selected room's capacity is ${selectedRoom.capacity} guest(s).`);
            return;
        }
        
        try {
            const newBooking = onBook({ roomId, checkIn, checkOut, guests: Number(guests), userName, userEmail, userContact });
            
            const managerMessage = encodeURIComponent(
                `*New Booking Inquiry*\n\n` +
                `*Guest Name:* ${newBooking.userName}\n` +
                `*Contact:* ${newBooking.userContact}\n\n` +
                `*Room:* ${newBooking.room.name}\n` +
                `*Check-in:* ${newBooking.checkIn}\n` +
                `*Check-out:* ${newBooking.checkOut}\n` +
                `*Guests:* ${newBooking.guests}\n\n` +
                `*Approx. Total Price:* ₹${newBooking.totalPrice.toFixed(2)}\n` +
                `*Booking ID:* ${newBooking.id}`
            );
            const whatsappUrl = `https://wa.me/${MANAGER_PHONE_NUMBER}?text=${managerMessage}`;
            window.open(whatsappUrl, '_blank');

            const guestMessage = encodeURIComponent(
                `Hi ${newBooking.userName}, your booking at Sri Balaji PG is received!\n\n` +
                `Room: ${newBooking.room.name}\n` +
                `Check-in: ${newBooking.checkIn}\n` +
                `Check-out: ${newBooking.checkOut}\n` +
                `Booking ID: ${newBooking.id}\n\n` +
                `Please complete the payment to confirm your stay.`
            );
            const smsUrl = `sms:${newBooking.userContact}?&body=${guestMessage}`;
            window.open(smsUrl);


            setSuccessMessage('Booking successful! Please check your SMS and send the manager message.');
            resetForm();

            setTimeout(() => {
                const paymentSection = document.getElementById('payment');
                if (paymentSection) {
                    paymentSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        }
    };

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError('');
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, successMessage]);


    return (
        <section id="hero" className="relative h-auto min-h-[600px] py-20 flex items-center justify-center text-white">
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <img src="https://picsum.photos/seed/hostel-hero/1920/1080" alt="Hostel common area" className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="relative z-20 container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-brand-secondary">Sri Balaji PG for Gents</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">Affordable and secure sharing rooms with all modern amenities. Book your stay with us today!</p>
                
                <form onSubmit={handleSubmit} className="bg-brand-dark/70 backdrop-blur-md p-6 rounded-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* User Details */}
                    <div className="flex flex-col items-start md:col-span-2 lg:col-span-4">
                        <p className="text-lg font-semibold mb-2 text-left">Your Details</p>
                    </div>
                    <div className="flex flex-col items-start lg:col-span-2">
                        <label htmlFor="userName" className="text-sm font-medium text-gray-300 mb-1">Your Name</label>
                        <div className="relative w-full">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" id="userName" value={userName} onChange={e => setUserName(e.target.value)} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="John Doe"/>
                        </div>
                    </div>
                     <div className="flex flex-col items-start">
                        <label htmlFor="userEmail" className="text-sm font-medium text-gray-300 mb-1">Email</label>
                        <div className="relative w-full">
                            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="email" id="userEmail" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="you@example.com"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="userContact" className="text-sm font-medium text-gray-300 mb-1">Contact Number</label>
                        <div className="relative w-full">
                            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="tel" id="userContact" value={userContact} onChange={e => setUserContact(e.target.value)} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="+91..."/>
                        </div>
                    </div>

                    {/* Booking Details */}
                     <div className="flex flex-col items-start md:col-span-2 lg:col-span-4 pt-4">
                        <p className="text-lg font-semibold mb-2 text-left">Booking Details</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="checkin" className="text-sm font-medium text-gray-300 mb-1">Check-in</label>
                        <div className="relative w-full">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="date" id="checkin" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={getToday()} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                     <div className="flex flex-col items-start">
                        <label htmlFor="checkout" className="text-sm font-medium text-gray-300 mb-1">Check-out</label>
                         <div className="relative w-full">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            {/* FIX: Corrected typo `_out` to `checkOut` to bind to the correct state variable. */}
                            <input type="date" id="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || getToday()} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="guests" className="text-sm font-medium text-gray-300 mb-1">Guests</label>
                        <div className="relative w-full">
                            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="number" id="guests" value={guests} onChange={e => setGuests(Number(e.target.value))} min="1" className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                     <div className="flex flex-col items-start">
                        <label htmlFor="room" className="text-sm font-medium text-gray-300 mb-1">Room Type</label>
                         <div className="relative w-full">
                            <BedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select id="room" value={roomId} onChange={e => setRoomId(Number(e.target.value))} className="w-full bg-brand-gray border-gray-600 rounded-md py-2 pl-10 pr-3 text-white focus:ring-brand-primary focus:border-brand-primary">
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="md:col-span-2 lg:col-span-4 w-full bg-brand-primary hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 mt-4">Book Now</button>
                    <div className="md:col-span-2 lg:col-span-4 text-left h-6 mt-1">
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Hero;