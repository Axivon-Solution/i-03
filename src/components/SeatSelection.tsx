
import { useState } from 'react';
import { Check, Coffee, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { SeatType } from '@/lib/types';

interface SeatSelectionProps {
  trainId: string;
  availableClasses: {
    type: SeatType;
    label: string;
    price: number;
    available: number;
  }[];
  onSeatClassSelect: (seatType: SeatType) => void;
  selectedSeatClass: SeatType | null;
}

const SeatSelection = ({
  trainId,
  availableClasses,
  onSeatClassSelect,
  selectedSeatClass,
}: SeatSelectionProps) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Select Class</h2>
      
      <RadioGroup
        value={selectedSeatClass || ''}
        onValueChange={(value) => onSeatClassSelect(value as SeatType)}
      >
        <div className="space-y-4">
          {availableClasses.map((seatClass) => (
            <div
              key={seatClass.type}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-irctc-blue ${
                selectedSeatClass === seatClass.type
                  ? 'border-irctc-blue bg-irctc-light-blue/10'
                  : 'border-gray-200'
              }`}
              onClick={() => onSeatClassSelect(seatClass.type)}
            >
              <div className="flex items-start md:items-center justify-between flex-col md:flex-row">
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value={seatClass.type}
                    id={`seat-${seatClass.type}`}
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor={`seat-${seatClass.type}`}
                      className="font-medium text-base flex items-center"
                    >
                      {seatClass.label}
                      {seatClass.type === 'ac3Tier' && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Coffee className="ml-2 h-4 w-4 text-amber-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                Free meals included with this class
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </Label>
                    <p className="text-sm text-irctc-dark-gray mt-1">
                      {seatClass.available} seats available
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs ml-1">Fast booking</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs ml-1">
                          {seatClass.type.includes('ac') ? 'Air conditioned' : 'Non-AC'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 ml-8 md:ml-0">
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold">₹{seatClass.price}</span>
                    <span className="text-xs text-irctc-dark-gray ml-1">per seat</span>
                  </div>
                  {seatClass.type !== 'sleeper' && (
                    <div className="text-xs text-green-600 mt-1">
                      Convenience & refreshments
                    </div>
                  )}
                </div>
              </div>
              
              {/* Highlight if selected */}
              {selectedSeatClass === seatClass.type && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <div className="bg-irctc-blue text-white text-xs px-2 py-0.5 rounded-full">
                    Selected
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
      
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start">
        <Info className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          Prices and seat availability are dynamic and may change. Lock in your
          fare by proceeding to the next step. Selected fare includes all applicable
          taxes and convenience fees.
        </p>
      </div>
    </div>
  );
};

export default SeatSelection;
