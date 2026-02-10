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

  // Ensure cities is an array
  const safeCities = Array.isArray(cities) ? cities : [];
  
  const filteredCities = safeCities.filter((city) =>
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
          }
        }}
        aria-label={`Select city. Currently selected: ${formatCityName(selectedCity)}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-3 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl hover:border-amber-400 dark:hover:border-amber-600 card-shadow hover:card-shadow-hover transition-all duration-200 z-10 relative focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 shadow-md hover:shadow-lg"
      >
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
            {formatCityName(selectedCity)}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-[9998] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div 
            role="listbox"
            aria-label="City selection"
            className="fixed sm:absolute top-auto sm:top-full bottom-4 sm:bottom-auto left-4 sm:left-0 right-4 sm:right-auto sm:w-96 sm:mt-2 max-h-[70vh] sm:max-h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg card-shadow-hover z-[9999] overflow-hidden"
          >
          {/* Search Input */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:border-transparent transition-all"
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onCityChange(city);
                          setIsOpen(false);
                          setSearchTerm('');
                        }
                      }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                      className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2.5 rounded-md mx-1 my-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2 ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onCityChange(city);
                          setIsOpen(false);
                          setSearchTerm('');
                        }
                      }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                      className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2.5 rounded-md mx-1 my-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2 ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
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
        </>
      )}
    </div>
  );
}
