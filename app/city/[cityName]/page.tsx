import { Metadata } from 'next';
import CityGoldPage from '@/components/CityGoldPage';

interface CityPageProps {
  params: {
    cityName: string;
  };
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = decodeURIComponent(params.cityName);
  const formattedCity = cityName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Gold Price in ${formattedCity} Today | 24K & 22K Gold Rate`,
    description: `Get live gold prices in ${formattedCity}. Check today's 24K and 22K gold rate per gram. Real-time gold price updates with historical trends for ${formattedCity}.`,
    keywords: [
      `gold price in ${formattedCity.toLowerCase()}`,
      `gold rate ${formattedCity.toLowerCase()}`,
      `gold price ${formattedCity.toLowerCase()} today`,
      `24k gold price ${formattedCity.toLowerCase()}`,
      `22k gold price ${formattedCity.toLowerCase()}`,
      `gold rate today ${formattedCity.toLowerCase()}`,
    ],
    openGraph: {
      title: `Gold Price in ${formattedCity} Today | MetalView`,
      description: `Live gold prices in ${formattedCity}. Check today's gold rate per gram.`,
      url: `https://metalview.in/city/${params.cityName}`,
    },
    alternates: {
      canonical: `https://metalview.in/city/${params.cityName}`,
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const cityName = decodeURIComponent(params.cityName);
  return <CityGoldPage cityName={cityName} />;
}
