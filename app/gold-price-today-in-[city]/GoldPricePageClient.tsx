/**
 * Client Component for City Selector in Gold Price Page
 */

'use client';

import { useState, useEffect } from 'react';
import CitySelector from '@/components/CitySelector';
import { useRouter } from 'next/navigation';

interface GoldPricePageClientProps {
  city: string;
  trendingCities?: string[];
}

const FALLBACK_CITIES = [
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

export default function GoldPricePageClient({ city, trendingCities }: GoldPricePageClientProps) {
  const router = useRouter();
  const [availableCities, setAvailableCities] = useState<string[]>(
    trendingCities && trendingCities.length > 0 ? trendingCities : FALLBACK_CITIES
  );

  // Fetch cities from API if not provided
  useEffect(() => {
    if (!trendingCities || trendingCities.length === 0) {
      fetch('/api/metals?city=mumbai')
        .then((res) => res.json())
        .then((data) => {
          if (data.trendingCities && data.trendingCities.length > 0) {
            setAvailableCities(data.trendingCities);
          }
        })
        .catch((err) => {
          console.error('Error fetching cities:', err);
        });
    }
  }, [trendingCities]);

  const handleCityChange = (newCity: string) => {
    router.push(`/gold-price-today-in-${newCity}`);
  };

  return (
    <CitySelector
      cities={availableCities}
      selectedCity={city}
      onCityChange={handleCityChange}
    />
  );
}
