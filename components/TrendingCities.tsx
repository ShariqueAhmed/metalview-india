/**
 * Trending Cities Component
 * Displays list of trending cities for quick navigation
 */

'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import { formatCityName } from '@/utils/conversions';
import Link from 'next/link';

interface TrendingCitiesProps {
  cities: string[];
  selectedCity?: string;
  onCityClick?: (city: string) => void;
}

export default function TrendingCities({
  cities,
  selectedCity,
  onCityClick,
}: TrendingCitiesProps) {
  if (!cities || cities.length === 0) {
    return null;
  }

  const handleCityClick = (city: string) => {
    if (onCityClick) {
      onCityClick(city);
    }
  };

  // Show top 30 trending cities
  const displayCities = cities.slice(0, 30);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-200 dark:border-blue-800 flex-shrink-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Trending Cities
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Explore live gold rates in popular Indian cities
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {displayCities.map((city, index) => {
          const isSelected =
            selectedCity &&
            (city.toLowerCase() === selectedCity.toLowerCase() ||
              city.toLowerCase().replace(/\s+/g, '-') === selectedCity.toLowerCase());

          return (
            <button
              key={index}
              onClick={() => handleCityClick(city)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 flex items-center gap-1 sm:gap-1.5 active:scale-95 ${
                isSelected
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm'
              }`}
              title={`View gold prices in ${formatCityName(city)}`}
            >
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">{formatCityName(city)}</span>
              {isSelected && <ArrowRight className="w-3 h-3 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {cities.length > 30 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Showing top 30 of {cities.length} trending cities
        </p>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          💡 Click on any city to view live gold prices for that location
        </p>
      </div>
    </div>
  );
}
