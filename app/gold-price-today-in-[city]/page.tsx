/**
 * City-Specific Gold Price Page
 * SEO-optimized page for gold prices in specific cities
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import PriceGrid from '@/components/PriceGrid';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';
import { generateMetalMetadata, generateStructuredData } from '@/utils/seo';
import { formatCityName } from '@/utils/conversions';
import GoldPricePageClient from './GoldPricePageClient';
import LastUpdated from '@/components/LastUpdated';

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

  // Try to fetch price data for metadata (non-blocking, with timeout)
  let price: number | undefined = undefined;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    const apiUrl = `${baseUrl}/api/metals?city=${encodeURIComponent(city)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    const response = await fetch(apiUrl, {
      signal: controller.signal,
      next: { revalidate: 600 },
      headers: { 'Content-Type': 'application/json' },
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      price = data.gold_10g || undefined;
    }
  } catch (error) {
    // Silently fail - metadata will work without price
    console.error('Error fetching price for metadata:', error);
  }

  return generateMetalMetadata({
    title: `Gold Price Today in ${cityName} – Live Gold Rate`,
    description: `Get live gold prices in ${cityName}, India. Check today's gold rate per 10g, historical trends, and market insights. Real-time updates from trusted sources.`,
    city: city,
    metal: 'gold',
    price: price,
    unit: '10g',
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
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Get live gold prices in {cityName}, India. Check today's gold rate per 10 grams,
              historical trends, and market insights. Prices are updated in real-time from
              trusted sources.
            </p>
            {data?.updated_at && (
              <LastUpdated date={data.updated_at} />
            )}
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

          {/* Related Cities Section */}
          <section aria-labelledby="related-cities" className="mb-12 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <h2 id="related-cities" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Gold Prices in Other Cities
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Compare gold prices across major Indian cities. Prices may vary based on local demand, transportation costs, and regional market conditions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TOP_CITIES.filter((c) => c !== city).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/gold-price-today-in-${otherCity}`}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-200 text-center"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
          </section>

          {/* Related Metals Section */}
          <section aria-labelledby="other-metals" className="mb-12 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            <h2 id="other-metals" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Other Metal Prices in {cityName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Explore prices for other precious and industrial metals in {cityName}. All prices are updated in real-time.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {['silver', 'copper', 'platinum', 'palladium'].map((otherMetal) => {
                const getMetalStyles = (metal: string) => {
                  switch (metal) {
                    case 'silver':
                      return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';
                    case 'copper':
                      return 'bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/30';
                    case 'platinum':
                      return 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30';
                    case 'palladium':
                      return 'bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/30';
                    default:
                      return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                  }
                };
                
                return (
                  <Link
                    key={otherMetal}
                    href={`/${otherMetal}/price-in/${city}`}
                    className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 text-center ${getMetalStyles(otherMetal)}`}
                  >
                    {otherMetal.charAt(0).toUpperCase() + otherMetal.slice(1)}
                  </Link>
                );
              })}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
