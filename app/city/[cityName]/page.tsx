/**
 * City-Specific Overview Page
 * Shows all metal prices for a specific city
 * SEO-optimized page at /city/[cityName]
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CombinedGoldPriceSection from '@/components/CombinedGoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import ChartSection from '@/components/ChartSection';
import { formatCityName } from '@/utils/conversions';
import Link from 'next/link';
import { ChevronRight, TrendingUp, MapPin } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';

interface CityPageProps {
  params: {
    cityName: string;
  };
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

// City-specific market insights
const CITY_INSIGHTS: Record<string, string> = {
  mumbai: 'Mumbai is India\'s largest gold trading hub, with Zaveri Bazaar being one of the most prominent gold markets. Prices here often set the benchmark for other cities due to high trading volumes and direct import connections.',
  delhi: 'Delhi\'s gold market is influenced by both local demand and proximity to major trading centers. The city sees significant jewelry purchases during wedding seasons, affecting local prices.',
  bangalore: 'Bangalore\'s tech-savvy population drives demand for investment-grade gold. The city has a growing market for digital gold and gold ETFs.',
  kolkata: 'Kolkata has a rich tradition of gold trading, with Bowbazar being a historic gold market. The city maintains competitive prices due to established dealer networks.',
  chennai: 'Chennai\'s gold market is known for traditional jewelry designs. The city has strong cultural ties to gold, especially during festivals and weddings.',
  hyderabad: 'Hyderabad\'s Charminar area is famous for gold jewelry. The city sees high demand during local festivals and wedding seasons.',
  pune: 'Pune\'s gold market benefits from its proximity to Mumbai. The city has a growing middle-class population driving gold investment demand.',
  ahmedabad: 'Ahmedabad has a strong gold trading tradition, with Manek Chowk being a well-known market. The city sees consistent demand throughout the year.',
  jaipur: 'Jaipur is famous for its traditional gold jewelry designs. The city\'s gold market is influenced by both local demand and tourism.',
  surat: 'Surat is a major diamond and gold trading center. The city has strong connections to international markets, affecting local gold prices.',
};

<<<<<<< HEAD
// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = 'force-dynamic';
export const revalidate = 600; // Revalidate every 10 minutes
=======
// Generate static params for top cities
export async function generateStaticParams() {
  return TOP_CITIES.map((city) => ({
    cityName: city,
  }));
}
>>>>>>> 9ba5bde115d7431593c49b73b5e9ab53b5b4bad2

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { cityName } = params;
  if (!cityName || typeof cityName !== 'string') {
    return {
      title: 'City Metal Prices | MetalView India',
      description: 'Get live metal prices for cities in India',
    };
  }
  const city = formatCityName(cityName);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  return {
    title: `Live Metal Prices in ${city} - Gold, Silver, Copper, Platinum | MetalView India`,
    description: `Get live metal prices in ${city}, India. Check today's gold, silver, copper, platinum, and palladium rates. Real-time updates with historical trends and market insights.`,
    keywords: [
      `metal prices in ${city.toLowerCase()}`,
      `gold price in ${city.toLowerCase()}`,
      `silver price in ${city.toLowerCase()}`,
      `copper price in ${city.toLowerCase()}`,
      `platinum price in ${city.toLowerCase()}`,
      `${city.toLowerCase()} metal rates`,
      `live prices ${city.toLowerCase()}`,
    ],
    openGraph: {
      title: `Live Metal Prices in ${city} | MetalView India`,
      description: `Get live metal prices in ${city}, India. Check today's rates for all metals.`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'MetalView India',
      url: `${baseUrl}/city/${cityName}`,
      images: [
        {
          url: `${baseUrl}/api/og?city=${cityName}`,
          width: 1200,
          height: 630,
          alt: `Metal prices in ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Live Metal Prices in ${city} | MetalView India`,
      description: `Get live metal prices in ${city}, India.`,
      images: [`${baseUrl}/api/og?city=${cityName}`],
    },
    alternates: {
      canonical: `${baseUrl}/city/${cityName}`,
    },
  };
}

export default async function CityOverviewPage({ params }: CityPageProps) {
  const { cityName } = params;

  if (!cityName || typeof cityName !== 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Invalid City
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The requested city page could not be found.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const city = formatCityName(cityName);

  // Fetch data server-side
  let data = null;
  try {
<<<<<<< HEAD
    // Use relative URL for server-side fetch (works in both dev and production)
    const apiUrl = `/api/metals?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
=======
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/metals?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
      cache: 'no-store',
>>>>>>> 9ba5bde115d7431593c49b73b5e9ab53b5b4bad2
    });

    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const cityInsight = CITY_INSIGHTS[cityName.toLowerCase()] || `Metal prices in ${city} are influenced by local market demand, transportation costs, and regional economic factors.`;

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Metal Prices in ${city}`,
    description: `Live metal prices in ${city}, India. Check today's rates for Gold, Silver, Copper, Platinum, and Palladium.`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in'}/city/${cityName}`,
    mainEntity: {
      '@type': 'City',
      name: city,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in'}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: city,
          item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in'}/city/${cityName}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/city/${cityName}`}
              className="text-slate-900 dark:text-slate-50 font-medium"
            >
              {city}
            </Link>
          </nav>

          {/* SEO Content Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 flex-shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Live Metal Prices in {city}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Real-time prices for Gold, Silver, Copper, Platinum, and Palladium
                </p>
              </div>
            </div>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex justify-end">
            <CityNavigationClient
              cities={TOP_CITIES}
              selectedCity={cityName}
            />
          </div>

          {/* Gold Prices Section */}
<<<<<<< HEAD
          {data && (data.gold_10g || data.gold_1g) && (
=======
          {data?.gold_10g && (
>>>>>>> 9ba5bde115d7431593c49b73b5e9ab53b5b4bad2
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Gold Prices
                </h2>
              </div>
              <CombinedGoldPriceSection
                gold24k_10g={data.gold_10g}
                gold22k_10g={data.gold_22k_10g}
                gold18k_10g={data.gold_18k_10g}
                gold24k_1g={data.gold_1g}
                gold22k_1g={data.gold_22k_1g}
                gold18k_1g={data.gold_18k_1g}
                gold24k_difference={data.gold_24k_difference}
                gold22k_difference={data.gold_22k_difference}
                gold18k_difference={data.gold_18k_difference}
                gold24k_percentage={data.gold_24k_percentage}
                gold22k_percentage={data.gold_22k_percentage}
                gold18k_percentage={data.gold_18k_percentage}
              />
              {data.gold_10g && (
                <div className="mt-6">
                  <GoldWeightPrices
                    goldPrice10g={data.gold_10g}
                    goldPrice1g={data.gold_1g}
                    gold22kPrice10g={data.gold_22k_10g}
                    gold22kPrice1g={data.gold_22k_1g}
                    gold18kPrice10g={data.gold_18k_10g}
                    gold18kPrice1g={data.gold_18k_1g}
                  />
                </div>
              )}
            </div>
          )}

          {/* Silver Prices Section */}
          {data?.silver_1kg && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Silver Prices
                </h2>
              </div>
              <SilverPriceSection
                price1kg={data.silver_1kg}
                percentageChange={data.silverPercentageChange}
              />
            </div>
          )}

          {/* Copper Prices Section */}
          {data?.copper_1kg && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Copper Prices
                </h2>
              </div>
              <CopperPriceSection
                price1kg={data.copper_1kg}
                price100g={data.copper_100g}
                percentageChange={data.copperPercentageChange}
              />
            </div>
          )}

          {/* Platinum Prices Section */}
          {data?.platinum_10g && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Platinum Prices
                </h2>
              </div>
              <PlatinumPriceSection
                price1g={data.platinum_1g}
                price10g={data.platinum_10g}
                percentageChange={data.platinumPercentageChange}
                variationType={data.platinumVariationType}
                variation={data.platinumVariation}
              />
            </div>
          )}

          {/* Palladium Prices Section */}
          {data?.palladium_10g && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Palladium Prices
                </h2>
              </div>
              <PalladiumPriceSection
                price1g={data.palladium_1g}
                price10g={data.palladium_10g}
                percentageChange={data.palladiumPercentageChange}
                variationType={data.palladiumVariationType}
                variation={data.palladiumVariation}
              />
            </div>
          )}

          {/* Historical Trends Chart */}
          {data && (
            <div className="mb-8">
              <ChartSection
                goldData={data.goldTrend}
                silverData={data.silverTrend}
                copperData={data.copperTrend}
              />
            </div>
          )}

          {/* City Market Insights */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Market Insights for {city}
            </h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-slate-600 dark:text-slate-400 mb-4">{cityInsight}</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Key Factors Affecting Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Local demand and supply dynamics</li>
                <li>Transportation and logistics costs</li>
                <li>Dealer margins and making charges</li>
                <li>Local taxes and government policies</li>
                <li>Regional economic conditions</li>
                <li>Proximity to major trading hubs</li>
              </ul>
            </div>
          </div>

          {/* Quick Links to Metal-Specific Pages */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              View Metal-Specific Prices
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <Link
                href={`/gold/price-in/${cityName}`}
                className="px-4 py-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg text-sm font-semibold text-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-center"
              >
                Gold
              </Link>
              <Link
                href={`/silver/price-in/${cityName}`}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
              >
                Silver
              </Link>
              <Link
                href={`/copper/price-in/${cityName}`}
                className="px-4 py-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg text-sm font-semibold text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-center"
              >
                Copper
              </Link>
              <Link
                href={`/platinum/price-in/${cityName}`}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Platinum
              </Link>
              <Link
                href={`/palladium/price-in/${cityName}`}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Palladium
              </Link>
            </div>
          </div>

          {/* Related Cities Section */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Metal Prices in Other Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOP_CITIES.filter((c) => c !== cityName).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/city/${otherCity}`}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
