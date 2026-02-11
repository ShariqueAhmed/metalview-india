'use client';

import { useRouter } from 'next/navigation';
import CitySelector from '@/components/CitySelector';

interface CityNavigationClientProps {
  cities: string[];
  selectedCity: string;
}

export default function CityNavigationClient({
  cities,
  selectedCity,
}: CityNavigationClientProps) {
  const router = useRouter();

  const handleCityChange = (newCity: string) => {
    router.push(`/city/${newCity}`);
  };

  return (
    <CitySelector
      cities={cities}
      selectedCity={selectedCity}
      onCityChange={handleCityChange}
    />
  );
}
