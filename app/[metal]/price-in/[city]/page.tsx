/**
 * Comprehensive City-Specific Metal Price Page
 * SEO-optimized page for metal prices in specific cities
 * Supports: gold, silver, copper, platinum, palladium
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
import PriceHistoryTable from '@/components/PriceHistoryTable';
import ChartSection from '@/components/ChartSection';
import { generateMetalMetadata, generateStructuredData } from '@/utils/seo';
import { formatCityName } from '@/utils/conversions';
import Link from 'next/link';
import { ChevronRight, Info, HelpCircle } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';

interface CityPageProps {
  params: Promise<{
    metal: string;
    city: string;
  }>;
}

type MetalType = 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium';

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
  ],
};

// Force dynamic rendering to avoid build-time fetch issues
// Note: generateStaticParams removed to allow fully dynamic rendering
// Pages will be generated on-demand to avoid build-time fetch timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 600; // Revalidate every 10 minutes

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { metal, city } = resolvedParams;
  if (!metal || !city || typeof metal !== 'string' || typeof city !== 'string') {
    return {
      title: 'Metal Price | MetalView India',
      description: 'Get live metal prices in India',
    };
  }
  const cityName = formatCityName(city);
  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);

  return generateMetalMetadata({
    title: `${metalName} Price Today in ${cityName} – Live ${metalName} Rate`,
    description: `Get live ${metal} prices in ${cityName}, India. Check today's ${metal} rate, historical trends, and market insights. Real-time updates from trusted sources.`,
    city: city,
    metal: metal as MetalType,
  });
}

export default async function MetalPriceCityPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const { metal, city } = resolvedParams;
  
  // Validate params
  if (!metal || !city || typeof metal !== 'string' || typeof city !== 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Invalid Page
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The requested page could not be found.
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
  
  const cityName = formatCityName(city);
  const metalType = metal as MetalType;
  
  // Validate metal type
  if (!['gold', 'silver', 'copper', 'platinum', 'palladium'].includes(metalType)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Invalid Metal Type
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The metal type "{metal}" is not supported.
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

  // Fetch data server-side
  let data = null;
  try {
    // Use relative URL for server-side fetch (works in both dev and production)
    const apiUrl = `/api/metals?city=${encodeURIComponent(city)}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Generate structured data
  const structuredData = data
    ? generateStructuredData({
        metal: metalType,
        price: getMetalPrice(data, metalType),
        unit: metalType === 'gold' ? '10g' : metalType === 'silver' ? '1kg' : '1kg',
        city: city,
        updatedAt: data.updated_at || new Date().toISOString(),
      })
    : null;

  const cityInsight = CITY_INSIGHTS[city.toLowerCase()] || `Gold prices in ${cityName} are influenced by local market demand, transportation costs, and regional economic factors.`;
  const cityFAQs = CITY_FAQS[city.toLowerCase()] || [];

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
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
              href={`/${metal}/price-in/${city}`}
              className="text-slate-900 dark:text-slate-50 font-medium"
            >
              {metal.charAt(0).toUpperCase() + metal.slice(1)} Price in {cityName}
            </Link>
          </nav>

          {/* SEO Content Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {metal.charAt(0).toUpperCase() + metal.slice(1)} Price Today in {cityName}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Get live {metal} prices in {cityName}, India. Check today's {metal} rate, historical
              trends, and market insights. Prices are updated in real-time from trusted sources.
            </p>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex justify-end">
            <CityNavigationClient
              cities={TOP_CITIES}
              selectedCity={city}
              metal={metal}
            />
          </div>

          {/* Main Price Section */}
          <div className="mb-8">
            {metalType === 'gold' && data?.gold_10g && (
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
            )}
            {metalType === 'silver' && data?.silver_1kg && (
              <SilverPriceSection
                price1kg={data.silver_1kg}
                percentageChange={data.silverPercentageChange}
              />
            )}
            {metalType === 'copper' && data?.copper_1kg && (
              <CopperPriceSection
                price1kg={data.copper_1kg}
                price100g={data.copper_100g}
                percentageChange={data.copperPercentageChange}
              />
            )}
            {metalType === 'platinum' && data?.platinum_10g && (
              <PlatinumPriceSection
                price1g={data.platinum_1g}
                price10g={data.platinum_10g}
                percentageChange={data.platinumPercentageChange}
                variationType={data.platinumVariationType}
                variation={data.platinumVariation}
              />
            )}
            {metalType === 'palladium' && data?.palladium_10g && (
              <PalladiumPriceSection
                price1g={data.palladium_1g}
                price10g={data.palladium_10g}
                percentageChange={data.palladiumPercentageChange}
                variationType={data.palladiumVariationType}
                variation={data.palladiumVariation}
              />
            )}
          </div>

          {/* Gold Prices by Weight (only for gold) */}
          {metalType === 'gold' && data?.gold_10g && (
            <div className="mb-8">
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

          {/* Price History Table */}
          {data && (
            <div className="mb-8">
              <PriceHistoryTable
                data={getPriceHistoryData(data, metalType)}
                title={`${metal.charAt(0).toUpperCase() + metal.slice(1)} Price History`}
                metalName={metal.charAt(0).toUpperCase() + metal.slice(1)}
                showCaratSelector={metalType === 'gold'}
                caratData={
                  metalType === 'gold'
                    ? {
                        '24k': data.goldTrend24k || data.goldTrend,
                        '22k': data.goldTrend22k,
                        '18k': data.goldTrend18k,
                      }
                    : undefined
                }
              />
            </div>
          )}

          {/* Historical Trends Chart */}
          {data && (
            <div className="mb-8">
              <ChartSection
                goldData={metalType === 'gold' ? data.goldTrend : undefined}
                silverData={metalType === 'silver' ? data.silverTrend : undefined}
                copperData={metalType === 'copper' ? data.copperTrend : undefined}
              />
            </div>
          )}

          {/* Why Prices Differ in [City] Section */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Why {metal.charAt(0).toUpperCase() + metal.slice(1)} Prices Differ in {cityName}
              </h2>
            </div>
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
              <p className="text-slate-600 dark:text-slate-400">
                Prices displayed are indicative and may vary slightly from actual market rates due
                to making charges, taxes, and dealer margins. Always verify with local dealers
                before making purchase decisions.
              </p>
            </div>
          </div>

          {/* City-Specific FAQs */}
          {cityFAQs.length > 0 && (
            <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Frequently Asked Questions - {cityName}
                </h2>
              </div>
              <div className="space-y-4">
                {cityFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Cities Section */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              {metal.charAt(0).toUpperCase() + metal.slice(1)} Prices in Other Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOP_CITIES.filter((c) => c !== city).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/${metal}/price-in/${otherCity}`}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
          </div>

          {/* Related Metals Section */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Other Metal Prices in {cityName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(['gold', 'silver', 'copper', 'platinum', 'palladium'] as MetalType[])
                .filter((m) => m !== metalType)
                .map((otherMetal) => (
                  <Link
                    key={otherMetal}
                    href={`/${otherMetal}/price-in/${city}`}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {otherMetal.charAt(0).toUpperCase() + otherMetal.slice(1)}
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

// Helper function to get metal price from data
function getMetalPrice(data: any, metal: MetalType): number {
  switch (metal) {
    case 'gold':
      return data.gold_10g || 0;
    case 'silver':
      return data.silver_1kg || 0;
    case 'copper':
      return data.copper_1kg || 0;
    case 'platinum':
      return data.platinum_10g || 0;
    case 'palladium':
      return data.palladium_10g || 0;
    default:
      return 0;
  }
}

// Helper function to get price history data
function getPriceHistoryData(data: any, metal: MetalType): Array<{ date: string; price: number }> {
  switch (metal) {
    case 'gold':
      return data.goldTrend || data.goldTrend24k || [];
    case 'silver':
      return data.silverTrend || [];
    case 'copper':
      return data.copperTrend || [];
    case 'platinum':
    case 'palladium':
      // These metals may not have trend data yet
      return [];
    default:
      return [];
  }
}
