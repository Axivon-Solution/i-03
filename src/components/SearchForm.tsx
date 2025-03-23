
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getStations, stations } from '@/lib/data';
import { Station } from '@/lib/types';

interface SearchFormProps {
  className?: string;
  compact?: boolean;
}

const SearchForm = ({ className, compact = false }: SearchFormProps) => {
  const navigate = useNavigate();
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromResults, setFromResults] = useState<Station[]>([]);
  const [toResults, setToResults] = useState<Station[]>([]);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedFrom, setSelectedFrom] = useState<Station | null>(null);
  const [selectedTo, setSelectedTo] = useState<Station | null>(null);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFromResults(getStations(fromQuery));
  }, [fromQuery]);

  useEffect(() => {
    setToResults(getStations(toQuery));
  }, [toQuery]);

  const handleSearch = () => {
    if (!selectedFrom || !selectedTo) return;
    
    navigate('/trains', { 
      state: { 
        from: selectedFrom.code, 
        to: selectedTo.code, 
        date 
      } 
    });
  };

  const handleFromSelect = (station: Station) => {
    setSelectedFrom(station);
    setFromQuery(station.name);
    setFromOpen(false);
    setTimeout(() => toInputRef.current?.focus(), 100);
  };

  const handleToSelect = (station: Station) => {
    setSelectedTo(station);
    setToQuery(station.name);
    setToOpen(false);
  };

  const handleSwap = () => {
    const tempFrom = selectedFrom;
    const tempFromQuery = fromQuery;
    
    setSelectedFrom(selectedTo);
    setFromQuery(toQuery);
    
    setSelectedTo(tempFrom);
    setToQuery(tempFromQuery);
  };

  return (
    <div className={cn(
      "p-6 rounded-2xl glass-card shadow-lg w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className={`grid ${compact ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-10 gap-4 md:gap-6'}`}>
        {/* From Station */}
        <div className={compact ? '' : 'md:col-span-3'}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-irctc-dark-gray flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              From
            </label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    ref={fromInputRef}
                    value={fromQuery}
                    onChange={(e) => setFromQuery(e.target.value)}
                    onFocus={() => setFromOpen(true)}
                    placeholder="From Station"
                    className="w-full bg-white focus:ring-1 focus:ring-irctc-blue"
                  />
                  {selectedFrom && (
                    <div className="absolute top-1 right-3 text-xs text-irctc-dark-gray">
                      {selectedFrom.code}
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align={compact ? "center" : "start"}>
                <Command>
                  <CommandInput 
                    placeholder="Search stations..." 
                    value={fromQuery}
                    onValueChange={setFromQuery}
                  />
                  <CommandEmpty>No stations found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {fromResults.map((station) => (
                      <CommandItem
                        key={station.code}
                        value={station.name}
                        onSelect={() => handleFromSelect(station)}
                      >
                        <div className="flex flex-col">
                          <span>{station.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            {station.code} • {station.city}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Swap Button */}
        {!compact && (
          <div className="hidden md:flex items-center justify-center">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={handleSwap}
              className="h-10 w-10 rounded-full bg-irctc-light-blue/20 hover:bg-irctc-light-blue/40 text-irctc-blue transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* To Station */}
        <div className={compact ? '' : 'md:col-span-3'}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-irctc-dark-gray flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              To
            </label>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    ref={toInputRef}
                    value={toQuery}
                    onChange={(e) => setToQuery(e.target.value)}
                    onFocus={() => setToOpen(true)}
                    placeholder="To Station"
                    className="w-full bg-white focus:ring-1 focus:ring-irctc-blue"
                  />
                  {selectedTo && (
                    <div className="absolute top-1 right-3 text-xs text-irctc-dark-gray">
                      {selectedTo.code}
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align={compact ? "center" : "start"}>
                <Command>
                  <CommandInput 
                    placeholder="Search stations..." 
                    value={toQuery}
                    onValueChange={setToQuery}
                  />
                  <CommandEmpty>No stations found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {toResults.map((station) => (
                      <CommandItem
                        key={station.code}
                        value={station.name}
                        onSelect={() => handleToSelect(station)}
                      >
                        <div className="flex flex-col">
                          <span>{station.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            {station.code} • {station.city}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Date Picker */}
        <div className={compact ? '' : 'md:col-span-2'}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-irctc-dark-gray flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white focus:ring-1 focus:ring-irctc-blue"
                >
                  {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align={compact ? "center" : "start"}>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Button */}
        <div className={compact ? '' : 'md:col-span-2'}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">
              Action
            </label>
            <Button 
              onClick={handleSearch}
              disabled={!selectedFrom || !selectedTo} 
              className="w-full h-10 bg-irctc-blue hover:bg-irctc-dark-blue transition-all duration-300"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Trains
            </Button>
          </div>
        </div>
      </div>

      {compact && (
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSwap}
            className="text-irctc-blue hover:text-irctc-dark-blue hover:bg-irctc-light-blue/20"
          >
            Swap Stations
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
