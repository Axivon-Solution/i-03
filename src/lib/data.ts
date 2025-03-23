
import { Train, User, Station } from './types';

export const stations: Station[] = [
  { code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi' },
  { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' },
  { code: 'CSTM', name: 'Chhatrapati Shivaji Terminus', city: 'Mumbai' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
  { code: 'SBC', name: 'KSR Bengaluru City Junction', city: 'Bengaluru' },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna' },
  { code: 'ALD', name: 'Allahabad Junction', city: 'Prayagraj' },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal' },
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur' },
];

export const trains: Train[] = [
  {
    id: '1',
    name: 'Rajdhani Express',
    number: '12301',
    from: stations[0],
    to: stations[1],
    departureTime: '16:35',
    arrivalTime: '08:15',
    duration: '15h 40m',
    distance: '1384 km',
    price: {
      sleeper: 0,
      ac3Tier: 2255,
      ac2Tier: 3225,
      acFirstClass: 5400
    },
    availability: {
      sleeper: 0,
      ac3Tier: 15,
      ac2Tier: 8,
      acFirstClass: 4
    },
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: '2',
    name: 'Duronto Express',
    number: '12213',
    from: stations[0],
    to: stations[1],
    departureTime: '23:40',
    arrivalTime: '15:55',
    duration: '16h 15m',
    distance: '1384 km',
    price: {
      sleeper: 1320,
      ac3Tier: 1845,
      ac2Tier: 2750,
      acFirstClass: 4570
    },
    availability: {
      sleeper: 24,
      ac3Tier: 12,
      ac2Tier: 6,
      acFirstClass: 2
    },
    daysOfOperation: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '3',
    name: 'Shatabdi Express',
    number: '12002',
    from: stations[0],
    to: stations[9],
    departureTime: '06:05',
    arrivalTime: '10:40',
    duration: '4h 35m',
    distance: '303 km',
    price: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 1045,
      acFirstClass: 1825
    },
    availability: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 28,
      acFirstClass: 10
    },
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: '4',
    name: 'Jan Shatabdi Express',
    number: '12058',
    from: stations[0],
    to: stations[8],
    departureTime: '17:20',
    arrivalTime: '07:30',
    duration: '14h 10m',
    distance: '708 km',
    price: {
      sleeper: 385,
      ac3Tier: 1120,
      ac2Tier: 0,
      acFirstClass: 0
    },
    availability: {
      sleeper: 42,
      ac3Tier: 20,
      ac2Tier: 0,
      acFirstClass: 0
    },
    daysOfOperation: ['Mon', 'Tue', 'Thu', 'Sat']
  },
  {
    id: '5',
    name: 'Humsafar Express',
    number: '22913',
    from: stations[1],
    to: stations[4],
    departureTime: '16:00',
    arrivalTime: '18:15',
    duration: '26h 15m',
    distance: '1362 km',
    price: {
      sleeper: 0,
      ac3Tier: 1595,
      ac2Tier: 0,
      acFirstClass: 0
    },
    availability: {
      sleeper: 0,
      ac3Tier: 35,
      ac2Tier: 0,
      acFirstClass: 0
    },
    daysOfOperation: ['Tue', 'Fri', 'Sun']
  },
  {
    id: '6',
    name: 'Vande Bharat Express',
    number: '22435',
    from: stations[0],
    to: stations[7],
    departureTime: '06:10',
    arrivalTime: '14:00',
    duration: '7h 50m',
    distance: '635 km',
    price: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 1770,
      acFirstClass: 3105
    },
    availability: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 45,
      acFirstClass: 12
    },
    daysOfOperation: ['Mon', 'Wed', 'Thu', 'Sat']
  },
  {
    id: '7',
    name: 'Tejas Express',
    number: '22119',
    from: stations[1],
    to: stations[5],
    departureTime: '05:50',
    arrivalTime: '21:30',
    duration: '15h 40m',
    distance: '981 km',
    price: {
      sleeper: 0,
      ac3Tier: 1640,
      ac2Tier: 2350,
      acFirstClass: 0
    },
    availability: {
      sleeper: 0,
      ac3Tier: 22,
      ac2Tier: 14,
      acFirstClass: 0
    },
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: '8',
    name: 'Gatimaan Express',
    number: '12049',
    from: stations[0],
    to: stations[7],
    departureTime: '08:10',
    arrivalTime: '15:50',
    duration: '7h 40m',
    distance: '635 km',
    price: {
      sleeper: 0,
      ac3Tier: 1085,
      ac2Tier: 1965,
      acFirstClass: 3085
    },
    availability: {
      sleeper: 0,
      ac3Tier: 18,
      ac2Tier: 15,
      acFirstClass: 5
    },
    daysOfOperation: ['Tue', 'Wed', 'Fri', 'Sun']
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '9876543210',
  bookings: [
    {
      id: 'b1',
      train: trains[0],
      date: new Date(2023, 8, 15),
      passengers: [
        {
          name: 'Rahul Sharma',
          age: 32,
          gender: 'male',
          seatNumber: 'B1-23',
          berth: 'lower'
        },
        {
          name: 'Priya Sharma',
          age: 30,
          gender: 'female',
          seatNumber: 'B1-24',
          berth: 'upper'
        }
      ],
      class: 'ac2Tier',
      status: 'confirmed',
      pnr: '2641278193',
      totalFare: 6450
    },
    {
      id: 'b2',
      train: trains[2],
      date: new Date(2023, 9, 10),
      passengers: [
        {
          name: 'Rahul Sharma',
          age: 32,
          gender: 'male',
          seatNumber: 'C5-67',
          berth: 'side lower'
        }
      ],
      class: 'ac2Tier',
      status: 'confirmed',
      pnr: '1452369780',
      totalFare: 1045
    }
  ]
};

export const searchTrains = (from: string, to: string, date: Date) => {
  return trains.filter(train => 
    (train.from.code === from || train.from.city.toLowerCase().includes(from.toLowerCase())) && 
    (train.to.code === to || train.to.city.toLowerCase().includes(to.toLowerCase())) &&
    train.daysOfOperation.includes(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()])
  );
};

export const getTrainById = (id: string) => {
  return trains.find(train => train.id === id);
};

export const getStations = (query: string) => {
  if (!query) return stations;
  
  return stations.filter(station => 
    station.name.toLowerCase().includes(query.toLowerCase()) ||
    station.city.toLowerCase().includes(query.toLowerCase()) ||
    station.code.toLowerCase().includes(query.toLowerCase())
  );
};
