/**
 * City Selector Component
 * Dropdown to select city for metal prices
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Search, X } from 'lucide-react';
import { formatCityName } from '@/utils/conversions';

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const POPULAR_CITIES = [
  'mumbai',
  'delhi',
  'bangalore',
  'kolkata',
  'chennai',
  'hyderabad',
  'pune',
  'ahmedabad',
  'jaipur',
  'surat',
];

export default function CitySelector({
  cities,
  selectedCity,
  onCityChange,
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCities = filteredCities.filter((city) =>
    POPULAR_CITIES.includes(city.toLowerCase())
  );
  const otherCities = filteredCities.filter(
    (city) => !POPULAR_CITIES.includes(city.toLowerCase())
  );

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-800 rounded-xl hover:border-amber-300 dark:hover:border-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="p-1.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCityName(selectedCity)}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-amber-600 dark:text-amber-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed sm:absolute top-full left-0 right-0 sm:right-auto mt-3 sm:w-96 w-[calc(100vw-2rem)] max-h-[70vh] sm:max-h-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-2 border-amber-200/50 dark:border-amber-800/50 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mx-4 sm:mx-0">
          {/* Search Input */}
          <div className="p-4 border-b border-amber-100 dark:border-amber-900/50 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
              <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 text-sm bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cities List */}
          <div className="overflow-y-auto max-h-80">
            {popularCities.length > 0 && (
              <div className="py-2">
                <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Popular Cities
                </div>
                {popularCities.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 rounded-lg mx-2 my-1 transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold shadow-md'
                          : 'hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                      {formatCityName(city)}
                      {isSelected && (
                        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {otherCities.length > 0 && (
              <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  All Cities
                </div>
                {otherCities.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 rounded-lg mx-2 my-1 transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold shadow-md'
                          : 'hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                      {formatCityName(city)}
                      {isSelected && (
                        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {filteredCities.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
