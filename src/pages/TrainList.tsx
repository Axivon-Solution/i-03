
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Filter, Loader2, RefreshCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger 
} from '@/components/ui/sheet';
import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import TrainCard from '@/components/TrainCard';
import AnimatedRoute from '@/components/AnimatedRoute';
import { searchTrains } from '@/lib/data';
import { Train, SeatType } from '@/lib/types';

const TrainList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState<Train[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: new Date(),
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    trainTypes: {
      rajdhani: false,
      shatabdi: false,
      duronto: false,
      tejas: false,
      vande: false,
    },
    departureTime: {
      morning: false, // 4:00 - 11:59
      afternoon: false, // 12:00 - 16:59
      evening: false, // 17:00 - 20:59
      night: false, // 21:00 - 3:59
    },
    availability: {
      sleeper: false,
      ac3Tier: false,
      ac2Tier: false,
      acFirstClass: false,
    }
  });

  useEffect(() => {
    if (location.state) {
      const { from, to, date } = location.state;
      setSearchParams({
        from,
        to,
        date: new Date(date),
      });
      
      fetchTrains(from, to, new Date(date));
    } else {
      setLoading(false);
    }
  }, [location.state]);

  const fetchTrains = (from: string, to: string, date: Date) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = searchTrains(from, to, date);
      setTrains(results);
      setFilteredTrains(results);
      setLoading(false);
      
      toast.success(`Found ${results.length} trains for your journey`, {
        description: `${from} to ${to} on ${date.toLocaleDateString()}`,
      });
    }, 1500);
  };

  const applyFilters = () => {
    let filtered = [...trains];
    
    // Filter by train type
    if (Object.values(filters.trainTypes).some(value => value)) {
      filtered = filtered.filter(train => {
        const name = train.name.toLowerCase();
        if (filters.trainTypes.rajdhani && name.includes('rajdhani')) return true;
        if (filters.trainTypes.shatabdi && name.includes('shatabdi')) return true;
        if (filters.trainTypes.duronto && name.includes('duronto')) return true;
        if (filters.trainTypes.tejas && name.includes('tejas')) return true;
        if (filters.trainTypes.vande && name.includes('vande')) return true;
        return !Object.values(filters.trainTypes).some(value => value);
      });
    }
    
    // Filter by departure time
    if (Object.values(filters.departureTime).some(value => value)) {
      filtered = filtered.filter(train => {
        const hour = parseInt(train.departureTime.split(':')[0]);
        if (filters.departureTime.morning && hour >= 4 && hour < 12) return true;
        if (filters.departureTime.afternoon && hour >= 12 && hour < 17) return true;
        if (filters.departureTime.evening && hour >= 17 && hour < 21) return true;
        if (filters.departureTime.night && (hour >= 21 || hour < 4)) return true;
        return !Object.values(filters.departureTime).some(value => value);
      });
    }
    
    // Filter by seat availability
    if (Object.values(filters.availability).some(value => value)) {
      filtered = filtered.filter(train => {
        if (filters.availability.sleeper && train.availability.sleeper > 0) return true;
        if (filters.availability.ac3Tier && train.availability.ac3Tier > 0) return true;
        if (filters.availability.ac2Tier && train.availability.ac2Tier > 0) return true;
        if (filters.availability.acFirstClass && train.availability.acFirstClass > 0) return true;
        return !Object.values(filters.availability).some(value => value);
      });
    }
    
    setFilteredTrains(filtered);
  };

  const resetFilters = () => {
    setFilters({
      trainTypes: {
        rajdhani: false,
        shatabdi: false,
        duronto: false,
        tejas: false,
        vande: false,
      },
      departureTime: {
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
      },
      availability: {
        sleeper: false,
        ac3Tier: false,
        ac2Tier: false,
        acFirstClass: false,
      }
    });
    setFilteredTrains(trains);
  };

  // Update filter state
  const updateFilter = (
    category: 'trainTypes' | 'departureTime' | 'availability',
    key: string,
    value: boolean
  ) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedRoute>
            <div className="mb-8">
              <SearchForm compact className="mb-8" />
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-irctc-blue animate-spin mb-4" />
                <p className="text-lg font-medium text-irctc-dark-gray">
                  Searching for trains...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Filters - Desktop */}
                <div className="hidden md:block bg-white rounded-xl p-6 shadow-sm h-fit">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-irctc-blue hover:text-irctc-dark-blue hover:bg-irctc-light-blue/20"
                    >
                      <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                      Reset
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Train Types */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Train Types</h4>
                      <div className="space-y-2">
                        {Object.entries(filters.trainTypes).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`train-${key}`}
                              checked={value}
                              onCheckedChange={(checked) => 
                                updateFilter('trainTypes', key, checked === true)
                              }
                            />
                            <label
                              htmlFor={`train-${key}`}
                              className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {key} Express
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Departure Time */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Departure Time</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="time-morning"
                            checked={filters.departureTime.morning}
                            onCheckedChange={(checked) => 
                              updateFilter('departureTime', 'morning', checked === true)
                            }
                          />
                          <label
                            htmlFor="time-morning"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Morning (4:00 - 11:59)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="time-afternoon"
                            checked={filters.departureTime.afternoon}
                            onCheckedChange={(checked) => 
                              updateFilter('departureTime', 'afternoon', checked === true)
                            }
                          />
                          <label
                            htmlFor="time-afternoon"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Afternoon (12:00 - 16:59)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="time-evening"
                            checked={filters.departureTime.evening}
                            onCheckedChange={(checked) => 
                              updateFilter('departureTime', 'evening', checked === true)
                            }
                          />
                          <label
                            htmlFor="time-evening"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Evening (17:00 - 20:59)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="time-night"
                            checked={filters.departureTime.night}
                            onCheckedChange={(checked) => 
                              updateFilter('departureTime', 'night', checked === true)
                            }
                          />
                          <label
                            htmlFor="time-night"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Night (21:00 - 3:59)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Seat Availability */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Seat Availability</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="seats-sleeper"
                            checked={filters.availability.sleeper}
                            onCheckedChange={(checked) => 
                              updateFilter('availability', 'sleeper', checked === true)
                            }
                          />
                          <label
                            htmlFor="seats-sleeper"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sleeper (SL)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="seats-ac3tier"
                            checked={filters.availability.ac3Tier}
                            onCheckedChange={(checked) => 
                              updateFilter('availability', 'ac3Tier', checked === true)
                            }
                          />
                          <label
                            htmlFor="seats-ac3tier"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            AC 3 Tier (3A)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="seats-ac2tier"
                            checked={filters.availability.ac2Tier}
                            onCheckedChange={(checked) => 
                              updateFilter('availability', 'ac2Tier', checked === true)
                            }
                          />
                          <label
                            htmlFor="seats-ac2tier"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            AC 2 Tier (2A)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="seats-acfirstclass"
                            checked={filters.availability.acFirstClass}
                            onCheckedChange={(checked) => 
                              updateFilter('availability', 'acFirstClass', checked === true)
                            }
                          />
                          <label
                            htmlFor="seats-acfirstclass"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            AC First Class (1A)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={applyFilters}
                        className="w-full bg-irctc-blue hover:bg-irctc-dark-blue"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Filters */}
                <div className="md:hidden mb-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                        <span className="ml-auto bg-gray-100 text-irctc-dark-gray text-xs py-0.5 px-2 rounded-full">
                          {Object.values(filters.trainTypes).filter(Boolean).length +
                            Object.values(filters.departureTime).filter(Boolean).length +
                            Object.values(filters.availability).filter(Boolean).length}
                        </span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh]">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6 overflow-y-auto py-4">
                        {/* Train Types */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Train Types</h4>
                          <div className="space-y-2">
                            {Object.entries(filters.trainTypes).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-train-${key}`}
                                  checked={value}
                                  onCheckedChange={(checked) => 
                                    updateFilter('trainTypes', key, checked === true)
                                  }
                                />
                                <label
                                  htmlFor={`mobile-train-${key}`}
                                  className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {key} Express
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Departure Time */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Departure Time</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-time-morning"
                                checked={filters.departureTime.morning}
                                onCheckedChange={(checked) => 
                                  updateFilter('departureTime', 'morning', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-time-morning"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Morning (4:00 - 11:59)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-time-afternoon"
                                checked={filters.departureTime.afternoon}
                                onCheckedChange={(checked) => 
                                  updateFilter('departureTime', 'afternoon', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-time-afternoon"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Afternoon (12:00 - 16:59)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-time-evening"
                                checked={filters.departureTime.evening}
                                onCheckedChange={(checked) => 
                                  updateFilter('departureTime', 'evening', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-time-evening"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Evening (17:00 - 20:59)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-time-night"
                                checked={filters.departureTime.night}
                                onCheckedChange={(checked) => 
                                  updateFilter('departureTime', 'night', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-time-night"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Night (21:00 - 3:59)
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Seat Availability */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Seat Availability</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-seats-sleeper"
                                checked={filters.availability.sleeper}
                                onCheckedChange={(checked) => 
                                  updateFilter('availability', 'sleeper', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-seats-sleeper"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Sleeper (SL)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-seats-ac3tier"
                                checked={filters.availability.ac3Tier}
                                onCheckedChange={(checked) => 
                                  updateFilter('availability', 'ac3Tier', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-seats-ac3tier"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                AC 3 Tier (3A)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-seats-ac2tier"
                                checked={filters.availability.ac2Tier}
                                onCheckedChange={(checked) => 
                                  updateFilter('availability', 'ac2Tier', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-seats-ac2tier"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                AC 2 Tier (2A)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="mobile-seats-acfirstclass"
                                checked={filters.availability.acFirstClass}
                                onCheckedChange={(checked) => 
                                  updateFilter('availability', 'acFirstClass', checked === true)
                                }
                              />
                              <label
                                htmlFor="mobile-seats-acfirstclass"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                AC First Class (1A)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <SheetFooter className="flex-row gap-3 sm:gap-3">
                        <Button
                          variant="outline"
                          onClick={resetFilters}
                          className="flex-1"
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={() => {
                            applyFilters();
                          }}
                          className="flex-1 bg-irctc-blue hover:bg-irctc-dark-blue"
                        >
                          Apply Filters
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
                
                {/* Train Results */}
                <div className="md:col-span-3">
                  {trains.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <h3 className="text-xl font-semibold mb-4">No Trains Found</h3>
                      <p className="text-irctc-dark-gray mb-6">
                        We couldn't find any trains for the selected route and date.
                        Please try different search parameters.
                      </p>
                      <Button
                        onClick={() => navigate('/')}
                        className="bg-irctc-blue hover:bg-irctc-dark-blue"
                      >
                        Back to Search
                      </Button>
                    </div>
                  ) : filteredTrains.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <h3 className="text-xl font-semibold mb-4">No Matching Trains</h3>
                      <p className="text-irctc-dark-gray mb-6">
                        No trains match your current filters. Please try adjusting your filter criteria.
                      </p>
                      <Button onClick={resetFilters} className="bg-irctc-blue hover:bg-irctc-dark-blue">
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-irctc-dark-gray">
                          Showing <span className="font-medium">{filteredTrains.length}</span> of{' '}
                          <span className="font-medium">{trains.length}</span> trains
                        </p>
                        <div className="flex gap-2">
                          {/* Applied filters */}
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(filters.trainTypes).map(([key, value]) => 
                              value ? (
                                <Button
                                  key={`filter-${key}`}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-full bg-irctc-light-blue/20 text-irctc-blue border-irctc-light-blue"
                                  onClick={() => updateFilter('trainTypes', key, false)}
                                >
                                  {key}
                                  <X className="ml-1 h-3 w-3" />
                                </Button>
                              ) : null
                            )}
                            {Object.entries(filters.departureTime).map(([key, value]) => 
                              value ? (
                                <Button
                                  key={`filter-${key}`}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-full bg-irctc-light-blue/20 text-irctc-blue border-irctc-light-blue"
                                  onClick={() => updateFilter('departureTime', key, false)}
                                >
                                  {key}
                                  <X className="ml-1 h-3 w-3" />
                                </Button>
                              ) : null
                            )}
                            {Object.entries(filters.availability).map(([key, value]) => 
                              value ? (
                                <Button
                                  key={`filter-${key}`}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 rounded-full bg-irctc-light-blue/20 text-irctc-blue border-irctc-light-blue"
                                  onClick={() => updateFilter('availability', key, false)}
                                >
                                  {key}
                                  <X className="ml-1 h-3 w-3" />
                                </Button>
                              ) : null
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {filteredTrains.map((train) => (
                        <TrainCard 
                          key={train.id} 
                          train={train} 
                          date={searchParams.date} 
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </AnimatedRoute>
        </div>
      </div>
    </div>
  );
};

export default TrainList;
