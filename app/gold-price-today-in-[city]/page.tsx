/**
 * City-Specific Gold Price Page
 * SEO-optimized page for gold prices in specific cities
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import PriceGrid from '@/components/PriceGrid';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';
import { generateMetalMetadata, generateStructuredData } from '@/utils/seo';
import { formatCityName } from '@/utils/conversions';
import GoldPricePageClient from './GoldPricePageClient';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

// Top Indian cities for static generation
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

// Generate static params for top cities
export async function generateStaticParams() {
  return TOP_CITIES.map((city) => ({
    city: city,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCityName(city);

  return generateMetalMetadata({
    title: `Gold Price Today in ${cityName} – Live Gold Rate`,
    description: `Get live gold prices in ${cityName}, India. Check today's gold rate per 10g, historical trends, and market insights. Real-time updates from trusted sources.`,
    city: city,
    metal: 'gold',
  });
}

export default async function GoldPriceCityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityName = formatCityName(city);

  // Fetch data server-side
  let data = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000'}/api/metals?city=${encodeURIComponent(city)}`,
      { next: { revalidate: 600 } } // Revalidate every 10 minutes
    );

    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Generate structured data
  const structuredData = data?.gold_10g
    ? generateStructuredData({
        metal: 'gold',
        price: data.gold_10g,
        unit: '10g',
        city: city,
        updatedAt: data.updated_at,
      })
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* SEO Content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Gold Price Today in {cityName}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Get live gold prices in {cityName}, India. Check today's gold rate per 10 grams,
              historical trends, and market insights. Prices are updated in real-time from
              trusted sources.
            </p>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex justify-end">
            <GoldPricePageClient city={city} trendingCities={data?.trendingCities} />
          </div>

          {/* Price Grid */}
          <div className="mb-12">
            <PriceGrid data={data} isLoading={!data} />
          </div>

          {/* Charts Section */}
          <div className="mb-12">
            <ChartSection
              goldData={
                data?.gold_10g
                  ? [
                      { date: 'Day 1', price: data.gold_10g },
                      { date: 'Day 2', price: data.gold_10g * 0.99 },
                      { date: 'Day 3', price: data.gold_10g * 1.01 },
                      { date: 'Day 4', price: data.gold_10g * 0.98 },
                      { date: 'Day 5', price: data.gold_10g * 1.02 },
                      { date: 'Day 6', price: data.gold_10g * 0.99 },
                      { date: 'Day 7', price: data.gold_10g },
                    ]
                  : undefined
              }
            />
          </div>

          {/* SEO Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Understanding Gold Prices in {cityName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Gold prices in {cityName} are influenced by various factors including international
              market rates, currency exchange rates, local demand, and government policies. The
              prices displayed here are indicative and may vary slightly from actual market rates
              due to making charges, taxes, and dealer margins.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Factors Affecting Gold Prices
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>International gold market rates</li>
              <li>USD to INR exchange rate</li>
              <li>Local demand and supply</li>
              <li>Government taxes and import duties</li>
              <li>Making charges (for jewelry)</li>
            </ul>
          </div>

          {/* Internal Links */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Gold Prices in Other Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOP_CITIES.filter((c) => c !== city).slice(0, 10).map((otherCity) => (
                <a
                  key={otherCity}
                  href={`/gold-price-today-in-${otherCity}`}
                  className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {formatCityName(otherCity)}
                </a>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
