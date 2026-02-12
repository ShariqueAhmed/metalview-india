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
import { getCityLatitude, getCityLongitude } from '@/utils/cityCoordinates';
import Link from 'next/link';
import { TrendingUp, MapPin, Store, MapPin as LocationIcon } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';

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

// Popular markets and dealers by city
const CITY_MARKETS: Record<string, Array<{ name: string; description: string; type: 'market' | 'area' | 'dealer' }>> = {
  mumbai: [
    { name: 'Zaveri Bazaar', description: 'One of India\'s largest and most prominent gold markets, known for competitive prices and high trading volumes', type: 'market' },
    { name: 'Bharat Diamond Bourse', description: 'Major trading hub for gold and diamonds with international connections', type: 'market' },
    { name: 'Opera House', description: 'Popular area for gold jewelry shopping with numerous certified dealers', type: 'area' },
  ],
  delhi: [
    { name: 'Chandni Chowk', description: 'Historic gold market with traditional jewelry shops and competitive prices', type: 'market' },
    { name: 'Karol Bagh', description: 'Popular shopping area with numerous gold jewelry stores and certified dealers', type: 'area' },
    { name: 'Dariba Kalan', description: 'Famous silver and gold market in Old Delhi with traditional designs', type: 'market' },
  ],
  bangalore: [
    { name: 'Commercial Street', description: 'Popular shopping area with multiple gold jewelry stores and modern designs', type: 'area' },
    { name: 'Jayanagar', description: 'Residential area with established gold dealers and competitive pricing', type: 'area' },
    { name: 'MG Road', description: 'Main commercial area with certified jewelers and branded stores', type: 'area' },
  ],
  kolkata: [
    { name: 'Bowbazar', description: 'Historic gold market with traditional jewelry designs and competitive prices', type: 'market' },
    { name: 'Bara Bazaar', description: 'One of the oldest markets in Kolkata, known for gold trading', type: 'market' },
    { name: 'New Market', description: 'Popular shopping area with multiple gold jewelry stores', type: 'area' },
  ],
  chennai: [
    { name: 'T. Nagar', description: 'Major shopping district with numerous gold jewelry stores and traditional designs', type: 'area' },
    { name: 'Mount Road', description: 'Commercial area with certified jewelers and modern gold designs', type: 'area' },
    { name: 'Mylapore', description: 'Traditional area known for gold jewelry during festivals', type: 'area' },
  ],
  hyderabad: [
    { name: 'Charminar', description: 'Famous area for gold jewelry with traditional designs and competitive prices', type: 'area' },
    { name: 'Abids', description: 'Popular shopping area with multiple gold jewelry stores', type: 'area' },
    { name: 'Banjara Hills', description: 'Upscale area with branded gold jewelry stores', type: 'area' },
  ],
  pune: [
    { name: 'Tulsi Baug', description: 'Traditional market area with gold jewelry stores and competitive pricing', type: 'market' },
    { name: 'FC Road', description: 'Popular shopping street with modern gold jewelry stores', type: 'area' },
    { name: 'Camp Area', description: 'Commercial area with certified jewelers', type: 'area' },
  ],
  ahmedabad: [
    { name: 'Manek Chowk', description: 'Famous gold market with traditional jewelry and competitive prices', type: 'market' },
    { name: 'Law Garden', description: 'Popular area with gold jewelry stores', type: 'area' },
    { name: 'CG Road', description: 'Commercial area with modern gold jewelry stores', type: 'area' },
  ],
  jaipur: [
    { name: 'Johari Bazaar', description: 'Famous for traditional gold jewelry designs and competitive prices', type: 'market' },
    { name: 'Tripolia Bazaar', description: 'Historic market known for gold and silver jewelry', type: 'market' },
    { name: 'MI Road', description: 'Main commercial area with gold jewelry stores', type: 'area' },
  ],
  surat: [
    { name: 'Varachha Road', description: 'Major diamond and gold trading area with competitive prices', type: 'area' },
    { name: 'Mahidharpura', description: 'Historic gold market with traditional designs', type: 'market' },
    { name: 'Adajan', description: 'Residential area with established gold dealers', type: 'area' },
  ],
};

// City-specific FAQs
const CITY_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  mumbai: [
    {
      question: 'Why are gold prices in Mumbai often lower than other cities?',
      answer: 'Mumbai is India\'s largest gold trading hub with direct import connections and high trading volumes. This results in lower dealer margins and more competitive prices compared to smaller cities.',
    },
    {
      question: 'Where can I buy gold in Mumbai?',
      answer: 'Zaveri Bazaar in Mumbai is one of India\'s most prominent gold markets. You can also purchase from certified dealers, banks, and online platforms. Always verify the purity and get proper documentation.',
    },
    {
      question: 'What is the best time to buy gold in Mumbai?',
      answer: 'Gold prices fluctuate daily. Generally, prices may be lower during off-peak seasons (non-festival periods). However, timing the market is difficult, so consider your investment goals and buy when you need it.',
    },
    {
      question: 'How do I verify gold purity in Mumbai?',
      answer: 'Always check for BIS (Bureau of Indian Standards) hallmark on gold jewelry. Certified dealers provide purity certificates. You can also get gold tested at BIS-approved testing centers.',
    },
  ],
  delhi: [
    {
      question: 'How do gold prices in Delhi compare to Mumbai?',
      answer: 'Delhi prices are typically slightly higher than Mumbai due to transportation costs and local market dynamics. However, the difference is usually minimal (₹50-200 per 10g).',
    },
    {
      question: 'Where are the best places to buy gold in Delhi?',
      answer: 'Chandni Chowk and Karol Bagh are popular gold markets in Delhi. You can also purchase from certified jewelers, banks, and online platforms. Always verify purity certificates.',
    },
    {
      question: 'What factors affect gold prices in Delhi?',
      answer: 'Gold prices in Delhi are influenced by international rates, local demand (especially during wedding seasons), dealer margins, making charges, and local taxes.',
    },
  ],
  bangalore: [
    {
      question: 'Is gold a good investment in Bangalore?',
      answer: 'Gold can be a good investment for diversification. Bangalore\'s tech-savvy population often prefers digital gold, gold ETFs, or sovereign gold bonds for investment purposes, while physical gold is popular for jewelry.',
    },
    {
      question: 'Where can I buy gold in Bangalore?',
      answer: 'Commercial Street, Jayanagar, and MG Road have numerous gold jewelry stores. You can also purchase from certified dealers, banks, and online platforms. Always verify purity.',
    },
  ],
  kolkata: [
    {
      question: 'What makes Kolkata\'s gold market unique?',
      answer: 'Kolkata has a rich tradition of gold trading with historic markets like Bowbazar. The city maintains competitive prices due to established dealer networks and traditional jewelry designs.',
    },
    {
      question: 'Where are the best gold markets in Kolkata?',
      answer: 'Bowbazar and Bara Bazaar are famous gold markets in Kolkata. These areas have numerous dealers offering competitive prices and traditional designs.',
    },
  ],
  chennai: [
    {
      question: 'What is special about Chennai\'s gold market?',
      answer: 'Chennai\'s gold market is known for traditional jewelry designs and strong cultural ties to gold, especially during festivals and weddings. T. Nagar is a major shopping area for gold.',
    },
    {
      question: 'When is the best time to buy gold in Chennai?',
      answer: 'Gold prices fluctuate daily. However, demand is typically higher during festival seasons (Pongal, Diwali) and wedding seasons, which may affect local prices.',
    },
  ],
  hyderabad: [
    {
      question: 'Where can I find the best gold prices in Hyderabad?',
      answer: 'Charminar area is famous for gold jewelry with competitive prices. You can also check Abids and Banjara Hills for various options. Always compare prices and verify purity.',
    },
    {
      question: 'What affects gold prices in Hyderabad?',
      answer: 'Gold prices in Hyderabad are influenced by international rates, local demand during festivals and weddings, dealer margins, and transportation costs.',
    },
  ],
  pune: [
    {
      question: 'How do gold prices in Pune compare to Mumbai?',
      answer: 'Pune prices are typically slightly higher than Mumbai due to transportation costs, but the difference is usually minimal. The city benefits from proximity to Mumbai\'s trading hub.',
    },
    {
      question: 'Where can I buy gold in Pune?',
      answer: 'Tulsi Baug, FC Road, and Camp area have numerous gold jewelry stores. You can also purchase from certified dealers and banks. Always verify purity certificates.',
    },
  ],
  ahmedabad: [
    {
      question: 'What is Manek Chowk known for?',
      answer: 'Manek Chowk is a famous gold market in Ahmedabad known for traditional jewelry and competitive prices. It\'s one of the oldest and most trusted markets in the city.',
    },
    {
      question: 'How do I ensure I\'m buying genuine gold in Ahmedabad?',
      answer: 'Always check for BIS hallmark, buy from certified dealers, and get proper documentation. Manek Chowk has many established dealers with good reputations.',
    },
  ],
  jaipur: [
    {
      question: 'What makes Jaipur\'s gold market special?',
      answer: 'Jaipur is famous for traditional gold jewelry designs. Johari Bazaar is a historic market known for intricate designs and competitive prices, attracting both locals and tourists.',
    },
    {
      question: 'Where should I buy gold in Jaipur?',
      answer: 'Johari Bazaar and Tripolia Bazaar are famous gold markets in Jaipur. These areas have numerous dealers offering traditional designs and competitive prices.',
    },
  ],
  surat: [
    {
      question: 'Why is Surat important for gold trading?',
      answer: 'Surat is a major diamond and gold trading center with strong connections to international markets. This affects local gold prices and makes it a significant trading hub.',
    },
    {
      question: 'Where can I buy gold in Surat?',
      answer: 'Varachha Road and Mahidharpura are major gold trading areas in Surat. The city has numerous dealers with competitive prices due to its trading hub status.',
    },
  ],
};

// Generate static params for top cities
export async function generateStaticParams() {
  return TOP_CITIES.map((city) => ({
    cityName: city,
  }));
}

// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = 'force-dynamic';
export const revalidate = 600; // Revalidate every 10 minutes

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
    // Use relative URL for server-side fetch (works in both dev and production)
    const apiUrl = `/api/metals?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });

    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const cityInsight = CITY_INSIGHTS[cityName.toLowerCase()] || `Metal prices in ${city} are influenced by local market demand, transportation costs, and regional economic factors.`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const cityLatitude = getCityLatitude(cityName);
  const cityLongitude = getCityLongitude(cityName);

  // Generate LocalBusiness schema for city pages
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `MetalView - ${city} Metal Prices`,
    description: `Live metal prices in ${city}, India. Real-time pricing for Gold, Silver, Copper, Platinum, and Palladium.`,
    url: `${baseUrl}/city/${cityName}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'IN',
    },
    ...(cityLatitude && cityLongitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: cityLatitude,
            longitude: cityLongitude,
          },
        }
      : {}),
    areaServed: {
      '@type': 'City',
      name: city,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
  };

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Metal Prices in ${city}`,
    description: `Live metal prices in ${city}, India. Check today's rates for Gold, Silver, Copper, Platinum, and Palladium.`,
    url: `${baseUrl}/city/${cityName}`,
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
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: city,
          item: `${baseUrl}/city/${cityName}`,
        },
      ],
    },
  };

  return (
    <>
      {/* WebPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* LocalBusiness structured data for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cities', href: '/cities' },
              { label: city, href: `/city/${cityName}` },
            ]}
          />

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
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                  Real-time prices for Gold, Silver, Copper, Platinum, and Palladium
                </p>
                {data?.updated_at && (
                  <LastUpdated date={data.updated_at} />
                )}
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
          {data && (data.gold_10g || data.gold_1g) && (
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
                price1g={data.platinum_1g ?? data.platinum ?? null}
                price10g={data.platinum_10g ?? null}
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

          {/* Popular Markets and Dealers */}
          {(() => {
            const cityMarkets = CITY_MARKETS[cityName.toLowerCase()];
            return cityMarkets && cityMarkets.length > 0 && (
              <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                    <Store className="w-5 h-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Popular Markets & Dealers in {city}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cityMarkets.map((market, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <LocationIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                          {market.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mb-2">
                          {market.type === 'market' ? 'Market' : market.type === 'area' ? 'Area' : 'Dealer'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {market.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            );
          })()}

          {/* City-Specific FAQs */}
          {(() => {
            const cityFaqs = CITY_FAQS[cityName.toLowerCase()];
            return cityFaqs && cityFaqs.length > 0 && (
              <>
                <FAQSection
                  faqs={cityFaqs}
                title={`Frequently Asked Questions about Gold Prices in ${city}`}
              />
              <FAQSchema
                faqs={cityFaqs}
                metal="gold"
                city={cityName}
              />
            </>
            );
          })()}

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
          <section aria-labelledby="related-cities" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="related-cities" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Metal Prices in Other Cities
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Compare metal prices across major Indian cities. Prices may vary based on local demand, transportation costs, and regional market conditions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TOP_CITIES.filter((c) => c !== cityName).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/city/${otherCity}`}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-200 text-center"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
          </section>

          {/* Related Metals Section */}
          <section aria-labelledby="other-metals" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="other-metals" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              All Metal Prices in {cityName}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Explore prices for all precious and industrial metals in {cityName}. All prices are updated in real-time.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {['gold', 'silver', 'copper', 'platinum', 'palladium'].map((metal) => {
                const getMetalStyles = (metal: string) => {
                  switch (metal) {
                    case 'gold':
                      return 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-700';
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
                    key={metal}
                    href={`/${metal}/price-in/${cityName.toLowerCase()}`}
                    className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 text-center ${getMetalStyles(metal)}`}
                  >
                    {metal.charAt(0).toUpperCase() + metal.slice(1)}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* You May Also Like Section */}
          <YouMayAlsoLike
            currentCity={cityName}
            pageType="city"
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
