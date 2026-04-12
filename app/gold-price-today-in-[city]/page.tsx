/**
 * Legacy gold city route kept only for backward compatibility.
 * Redirects permanently to the stronger canonical gold city page.
 */

import { permanentRedirect } from 'next/navigation';

interface LegacyGoldCityPageProps {
  params: Promise<{
    city: string;
  }>;
}

const TOP_CITIES = [
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
  'lucknow',
  'kanpur',
  'nagpur',
  'indore',
  'thane',
  'bhopal',
  'visakhapatnam',
  'patna',
  'vadodara',
  'ghaziabad',
];

export async function generateStaticParams() {
  return TOP_CITIES.map((city) => ({
    city,
  }));
}

export default async function LegacyGoldPriceCityPage({ params }: LegacyGoldCityPageProps) {
  const { city } = await params;
  permanentRedirect(`/gold/price-in/${city}`);
}
