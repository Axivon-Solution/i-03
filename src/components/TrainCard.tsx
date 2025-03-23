
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Clock, Compass, Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Train, SeatType } from '@/lib/types';
import { format } from 'date-fns';

interface TrainCardProps {
  train: Train;
  date: Date;
}

const TrainCard = ({ train, date }: TrainCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const seatClasses: Array<{ type: SeatType; label: string }> = [
    { type: 'sleeper', label: 'Sleeper (SL)' },
    { type: 'ac3Tier', label: 'AC 3 Tier (3A)' },
    { type: 'ac2Tier', label: 'AC 2 Tier (2A)' },
    { type: 'acFirstClass', label: 'AC First Class (1A)' }
  ];

  const availableSeatClasses = seatClasses.filter(
    (seat) => train.availability[seat.type] > 0
  );

  return (
    <div className="glass-card overflow-hidden rounded-xl mb-4 transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Train Details */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <span className="bg-irctc-light-blue/30 text-irctc-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
                {train.number}
              </span>
              <h3 className="ml-2 font-bold text-irctc-black">{train.name}</h3>
            </div>
            <p className="text-xs text-irctc-dark-gray mb-1">
              Runs on: {train.daysOfOperation.join(', ')}
            </p>
          </div>

          {/* Journey Details */}
          <div className="flex items-start md:items-center gap-4 md:gap-10">
            {/* Departure */}
            <div className="text-left">
              <p className="font-bold text-lg">{train.departureTime}</p>
              <p className="text-xs text-irctc-dark-gray">{format(date, 'dd MMM')}</p>
              <p className="text-sm font-medium">{train.from.code}</p>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-irctc-dark-gray px-2">{train.duration}</span>
              <div className="relative w-16 md:w-24 h-0.5 bg-gray-200 my-2">
                <Dot className="absolute -left-1 -top-1.5 h-3 w-3 text-irctc-blue" />
                <Dot className="absolute -right-1 -top-1.5 h-3 w-3 text-irctc-blue" />
              </div>
              <span className="text-xs text-irctc-dark-gray px-2">{train.distance}</span>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <p className="font-bold text-lg">{train.arrivalTime}</p>
              <p className="text-xs text-irctc-dark-gray">
                {format(
                  new Date(
                    date.getTime() + 
                    (parseInt(train.duration.split('h')[0]) * 60 * 60 * 1000) + 
                    (parseInt(train.duration.split('h')[1].replace('m', '').trim()) * 60 * 1000)
                  ), 
                  'dd MMM'
                )}
              </p>
              <p className="text-sm font-medium">{train.to.code}</p>
            </div>
          </div>
        </div>

        {/* Show Available Classes */}
        <div className="flex flex-wrap gap-2 mt-4">
          {availableSeatClasses.map((seatClass) => (
            <div
              key={seatClass.type}
              className="flex flex-col items-center rounded-lg border border-gray-100 px-3 py-1.5 bg-white"
            >
              <span className="text-xs font-medium text-irctc-dark-gray">
                {seatClass.label}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-bold">
                  ₹{train.price[seatClass.type]}
                </span>
                <span className="text-xs text-irctc-dark-gray">
                  ({train.availability[seatClass.type]} available)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-irctc-blue hover:text-irctc-dark-blue hover:bg-irctc-light-blue/20 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Less details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                More details
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 bg-gray-50/80 border-t border-gray-100 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <Clock className="h-4 w-4 text-irctc-blue" />
                Journey Information
              </h4>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-irctc-dark-gray">Duration:</span>
                  <span>{train.duration}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-irctc-dark-gray">Distance:</span>
                  <span>{train.distance}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-irctc-dark-gray">Runs on:</span>
                  <span>{train.daysOfOperation.join(', ')}</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <Compass className="h-4 w-4 text-irctc-blue" />
                Route Information
              </h4>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-irctc-dark-gray">From:</span>
                  <span>{train.from.name} ({train.from.code})</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-irctc-dark-gray">To:</span>
                  <span>{train.to.name} ({train.to.code})</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              asChild
              className="bg-irctc-blue hover:bg-irctc-dark-blue transition-all duration-300"
            >
              <Link 
                to={`/trains/${train.id}/book`} 
                state={{ train, date }}
              >
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainCard;
