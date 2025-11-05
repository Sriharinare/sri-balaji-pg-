export interface Room {
  id: number;
  name: string;
  capacity: number;
  price: number; // Price per month
  image: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  room: Room;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  userName: string;
  userEmail: string;
  userContact: string;
}