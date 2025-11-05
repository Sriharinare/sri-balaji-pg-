import type { Room } from './types';

export const MANAGER_PHONE_NUMBER = '919347589018'; 
export const PAYMENT_QR_CODE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=sribalajipg@ybl&pn=Sri%20Balaji%20PG'; // Placeholder UPI QR Code

export const ROOMS: Room[] = [
  {
    id: 1,
    name: 'Single Sharing Room',
    capacity: 1,
    price: 7000,
    image: 'https://picsum.photos/seed/pg1/800/600',
    amenities: ['Attached Bathroom', 'Wi-Fi', 'CCTV Security', '3 Meals Included', 'Washing Machine', 'Geyser'],
  },
  {
    id: 2,
    name: '2 Sharing Room',
    capacity: 2,
    price: 6500,
    image: 'https://picsum.photos/seed/pg2/800/600',
    amenities: ['Attached Bathroom', 'Wi-Fi', 'CCTV Security', '3 Meals Included', 'Washing Machine', 'Geyser'],
  },
  {
    id: 3,
    name: '3 Sharing Room',
    capacity: 3,
    price: 6000,
    image: 'https://picsum.photos/seed/pg3/800/600',
    amenities: ['Attached Bathroom', 'Wi-Fi', 'CCTV Security', '3 Meals Included', 'Washing Machine', 'Geyser'],
  },
  {
    id: 4,
    name: '4 Sharing Room',
    capacity: 4,
    price: 5000,
    image: 'https://picsum.photos/seed/pg4/800/600',
    amenities: ['Attached Bathroom', 'Wi-Fi', 'CCTV Security', '3 Meals Included', 'Washing Machine', 'Geyser'],
  },
];