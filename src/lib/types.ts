
export interface Train {
  id: string;
  name: string;
  number: string;
  from: Station;
  to: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: string;
  price: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
  availability: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
  daysOfOperation: string[];
}

export interface Station {
  code: string;
  name: string;
  city: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: Date;
  class?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  train: Train;
  date: Date;
  passengers: Passenger[];
  class: string;
  status: 'confirmed' | 'waiting' | 'cancelled';
  pnr: string;
  totalFare: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber?: string;
  berth?: 'lower' | 'middle' | 'upper' | 'side lower' | 'side upper';
}

export type SeatType = 'sleeper' | 'ac3Tier' | 'ac2Tier' | 'acFirstClass';
