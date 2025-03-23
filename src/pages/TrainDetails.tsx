
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SeatSelection from '@/components/SeatSelection';
import BookingForm from '@/components/BookingForm';
import AnimatedRoute from '@/components/AnimatedRoute';
import { getTrainById } from '@/lib/data';
import { Train, SeatType, Passenger } from '@/lib/types';
import { format } from 'date-fns';

const TrainDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [train, setTrain] = useState<Train | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSeatClass, setSelectedSeatClass] = useState<SeatType | null>(null);
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
    if (location.state?.train) {
      setTrain(location.state.train);
      if (location.state.date) {
        setDate(new Date(location.state.date));
      }
      setLoading(false);
    } else if (id) {
      // Simulate API call
      setTimeout(() => {
        const trainData = getTrainById(id);
        if (trainData) {
          setTrain(trainData);
        }
        setLoading(false);
      }, 1000);
    }
  }, [id, location.state]);

  const handleSeatClassSelect = (seatType: SeatType) => {
    setSelectedSeatClass(seatType);
  };

  const handlePassengerCountChange = (count: number) => {
    setNumberOfPassengers(count);
  };

  const handlePassengerSubmit = (newPassengers: Passenger[]) => {
    setPassengers(newPassengers);
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Generate a random PNR
      const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      // Navigate to success page (we'll just show a toast for now)
      toast.success('Booking Successful!', {
        description: `Your PNR is ${pnr}`,
        duration: 5000,
      });
      
      // Navigate to the home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  const getAvailableClasses = () => {
    if (!train) return [];
    
    const classes: Array<{
      type: SeatType;
      label: string;
      price: number;
      available: number;
    }> = [];
    
    if (train.availability.sleeper > 0) {
      classes.push({
        type: 'sleeper',
        label: 'Sleeper (SL)',
        price: train.price.sleeper,
        available: train.availability.sleeper
      });
    }
    
    if (train.availability.ac3Tier > 0) {
      classes.push({
        type: 'ac3Tier',
        label: 'AC 3 Tier (3A)',
        price: train.price.ac3Tier,
        available: train.availability.ac3Tier
      });
    }
    
    if (train.availability.ac2Tier > 0) {
      classes.push({
        type: 'ac2Tier',
        label: 'AC 2 Tier (2A)',
        price: train.price.ac2Tier,
        available: train.availability.ac2Tier
      });
    }
    
    if (train.availability.acFirstClass > 0) {
      classes.push({
        type: 'acFirstClass',
        label: 'AC First Class (1A)',
        price: train.price.acFirstClass,
        available: train.availability.acFirstClass
      });
    }
    
    return classes;
  };

  const getTotalFare = () => {
    if (!train || !selectedSeatClass) return 0;
    return train.price[selectedSeatClass] * numberOfPassengers;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-irctc-blue animate-spin mb-4" />
          <p className="text-lg font-medium text-irctc-dark-gray">
            Loading train details...
          </p>
        </div>
      );
    }
    
    if (!train) {
      return (
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Train Not Found</h3>
          <p className="text-irctc-dark-gray mb-6">
            We couldn't find the train you're looking for.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-irctc-blue hover:bg-irctc-dark-blue"
          >
            Back to Search
          </Button>
        </div>
      );
    }
    
    if (processing) {
      return (
        <div className="glass-card p-8">
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 text-irctc-blue animate-spin mb-6" />
            <h3 className="text-xl font-semibold mb-2">Processing Your Booking</h3>
            <p className="text-irctc-dark-gray text-center max-w-md">
              Please wait while we process your payment and confirm your booking.
              This might take a few moments.
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <>
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="text-irctc-dark-gray hover:text-irctc-blue hover:bg-irctc-light-blue/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="glass-card p-6 rounded-xl mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{train.name}</h1>
                <span className="ml-3 bg-irctc-light-blue/30 text-irctc-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {train.number}
                </span>
              </div>
              <p className="text-irctc-dark-gray mt-1">
                {train.from.name} to {train.to.name} • {train.duration}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Calendar className="h-4 w-4 text-irctc-blue mr-2" />
              <span>{format(date, 'dd MMM yyyy, EEEE')}</span>
            </div>
          </div>
        </div>
        
        {step === 1 ? (
          <>
            <SeatSelection
              trainId={train.id}
              availableClasses={getAvailableClasses()}
              onSeatClassSelect={handleSeatClassSelect}
              selectedSeatClass={selectedSeatClass}
            />
            
            {selectedSeatClass && (
              <div className="mt-6 glass-card rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Fare Summary</h3>
                    <p className="text-sm text-irctc-dark-gray">
                      Ticket fare breakdown
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Base Fare ({numberOfPassengers} passenger{numberOfPassengers > 1 ? 's' : ''})</span>
                    <span>₹{train.price[selectedSeatClass] * numberOfPassengers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reservation Fee</span>
                    <span>₹{selectedSeatClass === 'sleeper' ? 20 : 40}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (5%)</span>
                    <span>₹{Math.round(train.price[selectedSeatClass] * numberOfPassengers * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Convenience Fee</span>
                    <span>₹30</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                    <span>Total Fare</span>
                    <span className="text-lg">₹{getTotalFare() + (selectedSeatClass === 'sleeper' ? 20 : 40) + Math.round(train.price[selectedSeatClass] * numberOfPassengers * 0.05) + 30}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedSeatClass}
                    className="w-full bg-irctc-blue hover:bg-irctc-dark-blue"
                  >
                    Continue to Passenger Details
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <BookingForm
            train={train}
            date={date}
            selectedClass={selectedSeatClass as SeatType}
            numberOfPassengers={numberOfPassengers}
            onPassengerCountChange={handlePassengerCountChange}
            onSubmit={handlePassengerSubmit}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedRoute>
            {renderContent()}
          </AnimatedRoute>
        </div>
      </div>
    </div>
  );
};

export default TrainDetails;
