
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { AlertCircle, CalendarIcon, Clock, MapPin, UserRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { SeatType, Train, Passenger } from '@/lib/types';

interface BookingFormProps {
  train: Train;
  date: Date;
  selectedClass: SeatType;
  numberOfPassengers: number;
  onPassengerCountChange: (count: number) => void;
  onSubmit: (passengers: Passenger[]) => void;
}

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const createPassengerSchema = (count: number) => {
  const schema: Record<string, z.ZodTypeAny> = {};
  
  for (let i = 0; i < count; i++) {
    schema[`passenger${i}Name`] = z.string().min(1, 'Name is required');
    schema[`passenger${i}Age`] = z.string().min(1, 'Age is required').refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120,
      { message: 'Age must be between 1 and 120' }
    );
    schema[`passenger${i}Gender`] = z.enum(['male', 'female', 'other']);
  }
  
  return z.object(schema);
};

const BookingForm = ({
  train,
  date,
  selectedClass,
  numberOfPassengers,
  onPassengerCountChange,
  onSubmit,
}: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSchema = createPassengerSchema(numberOfPassengers);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...[...Array(numberOfPassengers)].reduce((acc, _, i) => ({
        ...acc,
        [`passenger${i}Gender`]: 'male',
      }), {}),
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Transform form data into passengers array
    const passengers: Passenger[] = [];
    
    for (let i = 0; i < numberOfPassengers; i++) {
      passengers.push({
        name: values[`passenger${i}Name`] as string,
        age: Number(values[`passenger${i}Age`]),
        gender: values[`passenger${i}Gender`] as 'male' | 'female' | 'other',
      });
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(passengers);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Journey Details</h2>
            <p className="text-sm text-irctc-dark-gray">
              Review your journey details
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center bg-irctc-light-blue/20 text-irctc-blue px-3 py-1 rounded-full text-sm">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            {format(date, 'dd MMM yyyy, EEEE')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-irctc-blue mt-0.5" />
              <div>
                <p className="text-sm font-medium">From</p>
                <p className="text-sm">{train.from.name} ({train.from.code})</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3.5 w-3.5 text-irctc-dark-gray mr-1" />
                  <span className="text-xs text-irctc-dark-gray">
                    Departure: {train.departureTime}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-irctc-blue mt-0.5" />
              <div>
                <p className="text-sm font-medium">To</p>
                <p className="text-sm">{train.to.name} ({train.to.code})</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3.5 w-3.5 text-irctc-dark-gray mr-1" />
                  <span className="text-xs text-irctc-dark-gray">
                    Arrival: {train.arrivalTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">{train.name} ({train.number})</p>
              <p className="text-sm text-irctc-dark-gray">{train.duration} • {train.distance}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Class</p>
              <p className="text-sm">
                {selectedClass === 'sleeper' && 'Sleeper (SL)'}
                {selectedClass === 'ac3Tier' && 'AC 3 Tier (3A)'}
                {selectedClass === 'ac2Tier' && 'AC 2 Tier (2A)'}
                {selectedClass === 'acFirstClass' && 'AC First Class (1A)'}
              </p>
              <p className="text-xs text-irctc-dark-gray mt-1">
                ₹{train.price[selectedClass]} per passenger
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Passenger Details</h2>
            <p className="text-sm text-irctc-dark-gray">
              Enter details for each passenger
            </p>
          </div>
          <div className="flex items-center">
            <label htmlFor="passengerCount" className="text-sm mr-2">
              Passengers:
            </label>
            <Select
              value={numberOfPassengers.toString()}
              onValueChange={(value) => onPassengerCountChange(parseInt(value))}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please ensure all passenger details match with a valid government ID proof
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {[...Array(numberOfPassengers)].map((_, i) => (
              <div key={i}>
                {i > 0 && <Separator className="my-4" />}
                <div className="flex items-center mb-3">
                  <UserRound className="h-4 w-4 text-irctc-blue mr-2" />
                  <h3 className="text-sm font-semibold">Passenger {i + 1}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`passenger${i}Name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`passenger${i}Age`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`passenger${i}Gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genders.map((gender) => (
                              <SelectItem key={gender.value} value={gender.value}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-irctc-blue hover:bg-irctc-dark-blue"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
