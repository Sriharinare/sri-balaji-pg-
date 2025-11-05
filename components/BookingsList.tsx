import React, { useState } from 'react';
import type { Booking } from '../types';
import { MANAGER_PHONE_NUMBER } from '../constants';
import { getActivitySuggestions } from '../services/geminiService';
import { SparklesIcon } from './Icons';

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const [suggestions, setSuggestions] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGetSuggestions = async () => {
        setIsLoading(true);
        setError('');
        setSuggestions('');
        try {
            const result = await getActivitySuggestions(booking);
            setSuggestions(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const contactManagerMessage = encodeURIComponent(
        `Hello, I'm ${booking.userName}. I have a question about my booking for the ${booking.room.name} from ${booking.checkIn} to ${booking.checkOut}. My booking ID is ${booking.id}. My contact number is ${booking.userContact}.`
    );
    const contactManagerLink = `https://wa.me/${MANAGER_PHONE_NUMBER}?text=${contactManagerMessage}`;

    const renderSuggestions = () => {
        return suggestions.split('\n').map((line, index) => {
            if (line.startsWith('* ') || line.startsWith('- ')) {
                return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
            }
            if(line.trim().length > 0) {
                 return <p key={index} className="mt-2">{line}</p>;
            }
            return null;
        });
    };

    return (
        <div className="bg-brand-gray p-6 rounded-lg shadow-md">
            <div className="md:flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-brand-primary">{booking.room.name}</h3>
                    <p className="text-gray-300 font-semibold">Guest: {booking.userName}</p>
                    <p className="text-gray-300">Check-in: {booking.checkIn}</p>
                    <p className="text-gray-300">Check-out: {booking.checkOut}</p>
                    <p className="text-gray-300">Guests: {booking.guests}</p>
                    <p className="mt-2 text-lg font-semibold text-white">Total (approx): ₹{booking.totalPrice.toFixed(2)}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-3">
                    <a href="#payment" className="text-center bg-brand-secondary text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors duration-300">
                        Pay Now
                    </a>
                    <a href={contactManagerLink} target="_blank" rel="noopener noreferrer" className="text-center bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                        Contact Manager
                    </a>
                    <button onClick={handleGetSuggestions} disabled={isLoading} className="flex justify-center items-center bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Thinking...' : 'AI Activity Suggestions'}
                    </button>
                </div>
            </div>
            {error && <p className="mt-4 text-red-400">{error}</p>}
            {suggestions && (
                <div className="mt-4 pt-4 border-t border-gray-700 text-gray-300">
                    <h4 className="font-bold text-white mb-2">Trip Ideas:</h4>
                    <ul>{renderSuggestions()}</ul>
                </div>
            )}
        </div>
    );
};


const BookingsList: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
    if (bookings.length === 0) {
        return null;
    }

    return (
        <section id="bookings" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">My Bookings</h2>
                    <p className="mt-4 text-lg text-gray-400">Your upcoming adventures.</p>
                </div>
                <div className="space-y-6 max-w-4xl mx-auto">
                    {bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookingsList;