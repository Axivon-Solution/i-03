
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  User, CalendarRange, Ticket, Clock, MapPin, Train, CreditCard, ArrowRight, ChevronDown, ChevronUp, 
  LogOut, Search, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import AnimatedRoute from '@/components/AnimatedRoute';
import { mockUser } from '@/lib/data';

const Profile = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  
  // Filter bookings based on search query
  const filteredBookings = mockUser.bookings.filter(booking => 
    booking.train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.train.number.includes(searchQuery) ||
    booking.pnr.includes(searchQuery)
  );
  
  const toggleBookingExpand = (bookingId: string) => {
    if (expandedBooking === bookingId) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedRoute>
            <div className="max-w-6xl mx-auto">
              <div className="glass-card p-6 rounded-xl mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-irctc-light-blue/50 flex items-center justify-center text-irctc-blue text-2xl font-bold">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1">
                      {mockUser.name}
                    </h1>
                    <div className="text-irctc-dark-gray">
                      <p className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {mockUser.email}
                      </p>
                      <p className="flex items-center gap-1 mt-1">
                        <CreditCard className="h-3.5 w-3.5" />
                        {mockUser.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-irctc-dark-gray hover:text-irctc-blue hover:bg-irctc-light-blue/20"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="bookings" className="space-y-6">
                <div className="flex justify-between items-center">
                  <TabsList className="grid grid-cols-3 w-auto">
                    <TabsTrigger value="bookings" className="px-6">
                      <Ticket className="h-4 w-4 mr-2" />
                      Bookings
                    </TabsTrigger>
                    <TabsTrigger value="history" className="px-6">
                      <Clock className="h-4 w-4 mr-2" />
                      History
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="px-6">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-irctc-dark-gray" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="block md:hidden">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-irctc-dark-gray" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <TabsContent value="bookings" className="space-y-4">
                  {filteredBookings.length === 0 ? (
                    <div className="glass-card p-6 rounded-xl text-center">
                      <div className="py-6">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <Ticket className="h-6 w-6 text-irctc-dark-gray" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
                        <p className="text-irctc-dark-gray mb-6">
                          {searchQuery 
                            ? `No bookings match your search for "${searchQuery}"`
                            : 'You have no upcoming bookings'
                          }
                        </p>
                        <Button
                          onClick={() => navigate('/')}
                          className="bg-irctc-blue hover:bg-irctc-dark-blue"
                        >
                          Book a Train
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-800" />
                        <AlertDescription>
                          Please carry a valid ID proof along with the ticket during your journey
                        </AlertDescription>
                      </Alert>
                      
                      {filteredBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                          <div className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Train className="h-4 w-4 text-irctc-blue" />
                                  <h3 className="font-semibold">{booking.train.name}</h3>
                                  <span className="text-xs bg-irctc-light-blue/30 text-irctc-blue px-2 py-0.5 rounded-full">
                                    {booking.train.number}
                                  </span>
                                </div>
                                
                                <div className="space-y-1 text-sm text-irctc-dark-gray">
                                  <p className="flex items-start gap-1.5">
                                    <CalendarRange className="h-3.5 w-3.5 mt-0.5" />
                                    {format(booking.date, 'dd MMM yyyy, EEEE')}
                                  </p>
                                  <p className="flex items-start gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 mt-0.5" />
                                    {booking.train.from.name} to {booking.train.to.name}
                                  </p>
                                </div>
                                
                                <div className="mt-3 flex items-center gap-3">
                                  <div>
                                    <span className="text-xs text-irctc-dark-gray">PNR</span>
                                    <p className="font-medium">{booking.pnr}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-irctc-dark-gray">Class</span>
                                    <p className="font-medium">
                                      {booking.class === 'sleeper' && 'Sleeper (SL)'}
                                      {booking.class === 'ac3Tier' && 'AC 3 Tier (3A)'}
                                      {booking.class === 'ac2Tier' && 'AC 2 Tier (2A)'}
                                      {booking.class === 'acFirstClass' && 'AC First Class (1A)'}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-irctc-dark-gray">Status</span>
                                    <p className={`font-medium ${
                                      booking.status === 'confirmed' 
                                        ? 'text-green-600' 
                                        : booking.status === 'waiting' 
                                        ? 'text-amber-600' 
                                        : 'text-red-600'
                                    }`}>
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 md:mt-0 flex flex-col items-end">
                                <div className="text-right">
                                  <span className="text-xs text-irctc-dark-gray">Total Fare</span>
                                  <p className="text-lg font-bold">₹{booking.totalFare}</p>
                                  <p className="text-xs text-irctc-dark-gray">{booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}</p>
                                </div>
                                
                                <div className="flex space-x-2 mt-3">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs text-irctc-blue border-irctc-blue hover:bg-irctc-light-blue/20"
                                  >
                                    Download
                                  </Button>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="text-xs bg-irctc-blue hover:bg-irctc-dark-blue"
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleBookingExpand(booking.id)}
                                className="text-irctc-dark-gray hover:text-irctc-blue hover:bg-irctc-light-blue/20"
                              >
                                {expandedBooking === booking.id ? (
                                  <>
                                    <ChevronUp className="h-4 w-4 mr-1" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-4 w-4 mr-1" />
                                    Show Details
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          {expandedBooking === booking.id && (
                            <div className="p-4 md:p-6 bg-gray-50/80 border-t border-gray-100 animate-slide-down">
                              <h4 className="font-medium mb-3">Passenger Details</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="text-xs text-irctc-dark-gray">
                                    <tr>
                                      <th className="px-2 py-2 text-left">Name</th>
                                      <th className="px-2 py-2 text-left">Age</th>
                                      <th className="px-2 py-2 text-left">Gender</th>
                                      <th className="px-2 py-2 text-left">Seat/Berth</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {booking.passengers.map((passenger, index) => (
                                      <tr key={index} className="border-b border-gray-100 last:border-0">
                                        <td className="px-2 py-2">{passenger.name}</td>
                                        <td className="px-2 py-2">{passenger.age}</td>
                                        <td className="px-2 py-2 capitalize">{passenger.gender}</td>
                                        <td className="px-2 py-2">
                                          {passenger.seatNumber} 
                                          {passenger.berth && (
                                            <span className="text-xs text-irctc-dark-gray ml-1 capitalize">
                                              ({passenger.berth})
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Journey Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Train:</span>
                                      <span>{booking.train.number} - {booking.train.name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Date:</span>
                                      <span>{format(booking.date, 'dd MMM yyyy')}</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">From:</span>
                                      <span>{booking.train.from.name} ({booking.train.from.code})</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">To:</span>
                                      <span>{booking.train.to.name} ({booking.train.to.code})</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Departure:</span>
                                      <span>{booking.train.departureTime}</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Arrival:</span>
                                      <span>{booking.train.arrivalTime}</span>
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2 text-sm">Booking Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">PNR Number:</span>
                                      <span>{booking.pnr}</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Class:</span>
                                      <span>
                                        {booking.class === 'sleeper' && 'Sleeper (SL)'}
                                        {booking.class === 'ac3Tier' && 'AC 3 Tier (3A)'}
                                        {booking.class === 'ac2Tier' && 'AC 2 Tier (2A)'}
                                        {booking.class === 'acFirstClass' && 'AC First Class (1A)'}
                                      </span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Status:</span>
                                      <span className={`${
                                        booking.status === 'confirmed' 
                                          ? 'text-green-600' 
                                          : booking.status === 'waiting' 
                                          ? 'text-amber-600' 
                                          : 'text-red-600'
                                      }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                      </span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Passengers:</span>
                                      <span>{booking.passengers.length}</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="text-irctc-dark-gray">Booking Date:</span>
                                      <span>{format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'dd MMM yyyy')}</span>
                                    </p>
                                    <p className="flex justify-between font-medium">
                                      <span>Total Fare:</span>
                                      <span>₹{booking.totalFare}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="glass-card p-6 rounded-xl">
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-irctc-dark-gray" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
                    <p className="text-irctc-dark-gray mb-6">
                      Your past bookings and travel history will appear here
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">Full Name</label>
                        <Input defaultValue={mockUser.name} />
                      </div>
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">Email</label>
                        <Input defaultValue={mockUser.email} />
                      </div>
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">Phone</label>
                        <Input defaultValue={mockUser.phone} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">ID Type</label>
                        <Input defaultValue="Aadhaar Card" />
                      </div>
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">ID Number</label>
                        <Input defaultValue="XXXX-XXXX-XXXX" type="password" />
                      </div>
                      <div>
                        <label className="text-sm text-irctc-dark-gray mb-1 block">Date of Birth</label>
                        <Input defaultValue="15/08/1985" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-irctc-blue hover:bg-irctc-dark-blue">
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </AnimatedRoute>
        </div>
      </div>
    </div>
  );
};

export default Profile;
