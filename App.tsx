import React, { useState } from 'react';
import type { Booking, Room } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Payment from './components/Payment';
import BookingsList from './components/BookingsList';
import Footer from './components/Footer';
import { ROOMS } from './constants';

const App: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const handleNewBooking = (bookingDetails: Omit<Booking, 'id' | 'totalPrice' | 'room'>): Booking => {
        const room = ROOMS.find(r => r.id === bookingDetails.roomId);
        if (!room) {
            throw new Error('Selected room not found!');
        }

        const checkInDate = new Date(bookingDetails.checkIn);
        const checkOutDate = new Date(bookingDetails.checkOut);
        
        // Timezone-safe day calculation
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utcCheckIn = Date.UTC(checkInDate.getUTCFullYear(), checkInDate.getUTCMonth(), checkInDate.getUTCDate());
        const utcCheckOut = Date.UTC(checkOutDate.getUTCFullYear(), checkOutDate.getUTCMonth(), checkOutDate.getUTCDate());
        const days = (utcCheckOut - utcCheckIn) / MS_PER_DAY;


        if (days <= 0) {
            throw new Error('Check-out date must be after check-in date.');
        }
        
        // Approximate daily price from monthly rate for calculation.
        const dailyPrice = room.price / 30;
        const totalPrice = days * dailyPrice;

        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            room,
            ...bookingDetails,
            totalPrice: totalPrice,
        };

        setBookings(prevBookings => [...prevBookings, newBooking]);
        return newBooking;
    };
    
    return (
        <div className="bg-brand-dark min-h-screen font-sans">
            <Header />
            <main>
                <Hero onBook={handleNewBooking} rooms={ROOMS} />
                <About />
                <Rooms rooms={ROOMS} />
                <Gallery />
                <Payment />
                <BookingsList bookings={bookings} />
            </main>
            <Footer />
        </div>
    );
};

export default App;