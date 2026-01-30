'use client';

import { MapPin, ChevronDown, Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  currentLocation?: string;
}

// Popular cities to show first
const POPULAR_CITIES = ['delhi', 'mumbai', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 'pune', 'ahmedabad'];

export default function CitySelector({
  cities,
  selectedCity,
  onCityChange,
  currentLocation,
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Format city name for display
  const formatCityName = (city: string) => {
    return city
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort cities: popular first, then selected, then alphabetically
  const sortedCities = [...filteredCities].sort((a, b) => {
    const aPopular = POPULAR_CITIES.includes(a.toLowerCase());
    const bPopular = POPULAR_CITIES.includes(b.toLowerCase());
    if (aPopular && !bPopular) return -1;
    if (!aPopular && bPopular) return 1;
    if (a === selectedCity) return -1;
    if (b === selectedCity) return 1;
    return a.localeCompare(b);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchQuery('');
  };

  const displayedLocation = currentLocation ? formatCityName(currentLocation) : formatCityName(selectedCity);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span>{displayedLocation}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 overflow-hidden">
          {/* Search Header */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'} found
            </p>
          </div>

          {/* Cities List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {sortedCities.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p className="text-sm">No cities found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="py-1">
                {/* Popular Cities Section */}
                {searchQuery === '' && (
                  <>
                    {sortedCities
                      .filter((city) => POPULAR_CITIES.includes(city.toLowerCase()))
                      .map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                            selectedCity.toLowerCase() === city.toLowerCase()
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold border-l-4 border-blue-500'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 ${selectedCity.toLowerCase() === city.toLowerCase() ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span>{formatCityName(city)}</span>
                          {selectedCity.toLowerCase() === city.toLowerCase() && (
                            <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">Selected</span>
                          )}
                        </button>
                      ))}
                    {sortedCities.some((city) => POPULAR_CITIES.includes(city.toLowerCase())) && (
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    )}
                  </>
                )}

                {/* All Cities */}
                {sortedCities
                  .filter((city) => searchQuery !== '' || !POPULAR_CITIES.includes(city.toLowerCase()))
                  .map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        selectedCity.toLowerCase() === city.toLowerCase()
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold border-l-3 border-blue-500'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${selectedCity.toLowerCase() === city.toLowerCase() ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span>{formatCityName(city)}</span>
                      {selectedCity.toLowerCase() === city.toLowerCase() && (
                        <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">Selected</span>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
