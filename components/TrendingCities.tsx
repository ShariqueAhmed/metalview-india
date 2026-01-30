'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface TrendingCitiesProps {
  cities?: string[];
  onCityClick?: (city: string) => void;
  selectedCity?: string;
}

export default function TrendingCities({ cities, onCityClick, selectedCity }: TrendingCitiesProps) {
  if (!cities || cities.length === 0) {
    return null;
  }

  // Format city names (capitalize first letter)
  const formatCityName = (city: string) => {
    return city
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCityClick = (city: string) => {
    if (onCityClick) {
      onCityClick(city);
    }
  };

  const isSelected = (city: string) => {
    if (!selectedCity) return false;
    return city.toLowerCase() === selectedCity.toLowerCase() ||
           city.toLowerCase().replace(/\s+/g, '-') === selectedCity.toLowerCase() ||
           city.toLowerCase().replace(/-/g, ' ') === selectedCity.toLowerCase();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 p-6">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Trending Cities
        </h2>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Popular cities for gold rates
      </p>

      <div className="flex flex-wrap gap-2">
        {cities.slice(0, 30).map((city, index) => {
          const selected = isSelected(city);
          const citySlug = city.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={index} className="flex gap-1">
              <button
                onClick={() => handleCityClick(city)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  selected
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={`Click to view gold rates in ${formatCityName(city)}`}
              >
                {formatCityName(city)}
              </button>
              <Link
                href={`/city/${citySlug}`}
                className="px-2 py-1.5 rounded-md text-xs font-medium border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                title={`View dedicated page for ${formatCityName(city)}`}
              >
                →
              </Link>
            </div>
          );
        })}
      </div>

      {cities.length > 30 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Showing top 30 of {cities.length} trending cities
        </p>
      )}
    </div>
  );
}
