import React from 'react';
import type { Room } from '../types';
import { BedIcon, WifiIcon, UsersIcon, BathroomIcon, CctvIcon, FoodIcon, WashingMachineIcon, WaterHeaterIcon } from './Icons';

interface RoomsProps {
    rooms: Room[];
}

const amenityIcons: { [key: string]: React.ReactNode } = {
    'Attached Bathroom': <BathroomIcon className="w-5 h-5" />,
    'Wi-Fi': <WifiIcon className="w-5 h-5" />,
    'CCTV Security': <CctvIcon className="w-5 h-5" />,
    '3 Meals Included': <FoodIcon className="w-5 h-5" />,
    'Washing Machine': <WashingMachineIcon className="w-5 h-5" />,
    'Geyser': <WaterHeaterIcon className="w-5 h-5" />,
};

const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
    <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <img className="w-full h-56 object-cover" src={room.image} alt={room.name} />
        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
            <div className="flex items-center text-gray-400 mb-4">
                <UsersIcon className="w-5 h-5 mr-2" />
                <span>Up to {room.capacity} guest(s)</span>
            </div>
            <div className="mb-4">
                <h4 className="font-semibold text-gray-200 mb-2">Amenities:</h4>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                    {room.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-2">
                             {amenityIcons[amenity] || <div className="w-5 h-5" />}
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-brand-secondary">₹{room.price}<span className="text-base font-normal text-gray-400">/month</span></p>
                <a href="#hero" className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Book</a>
            </div>
        </div>
    </div>
);

const Rooms: React.FC<RoomsProps> = ({ rooms }) => {
    return (
        <section id="rooms" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Rooms</h2>
                    <p className="mt-4 text-lg text-gray-400">Comfortable, clean, and ready for you.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {rooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;