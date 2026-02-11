'use client';

import { useRouter } from 'next/navigation';
import CitySelector from '@/components/CitySelector';

interface CityNavigationClientProps {
  cities: string[];
  selectedCity: string;
  metal: string;
}

export default function CityNavigationClient({
  cities,
  selectedCity,
  metal,
}: CityNavigationClientProps) {
  const router = useRouter();

  const handleCityChange = (newCity: string) => {
    router.push(`/${metal}/price-in/${newCity}`);
  };

  return (
    <CitySelector
      cities={cities}
      selectedCity={selectedCity}
      onCityChange={handleCityChange}
    />
  );
}
