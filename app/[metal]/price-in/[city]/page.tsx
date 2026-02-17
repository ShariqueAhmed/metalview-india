/**
 * Comprehensive City-Specific Metal Price Page
 * SEO-optimized page for metal prices in specific cities
 * Supports: gold, silver, copper, platinum, palladium
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import PriceHistoryTable from '@/components/PriceHistoryTable';
import ChartSection from '@/components/ChartSection';
import { generateMetalMetadata, generateStructuredData, generateDatasetSchema } from '@/utils/seo';
import { formatCityName } from '@/utils/conversions';
import Link from 'next/link';
import { Info, HelpCircle } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import { getPeopleAlsoAskQuestions } from '@/utils/peopleAlsoAsk';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { AdSenseResponsive } from '@/components/AdSense';
import { GoldPriceCityBlock } from './GoldPriceCityBlock';

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

// Generate static params for top cities and metals
// Pages will be generated on-demand (ISR) to avoid build-time fetch timeouts
export async function generateStaticParams() {
  const metals: MetalType[] = ['gold', 'silver', 'copper', 'platinum', 'palladium'];
  const params: Array<{ metal: string; city: string }> = [];

  for (const metal of metals) {
    for (const city of TOP_CITIES) {
      params.push({ metal, city });
    }
  }

  return params;
}

// Use ISR (Incremental Static Regeneration) for better performance
export const revalidate = 600; // Revalidate every 10 minutes

// Helper function to get metal price from data
function getMetalPriceForMetadata(data: any, metal: MetalType): { price: number | null; unit: string } {
  if (!data) return { price: null, unit: '' };
  
  switch (metal) {
    case 'gold':
      return { price: data.gold_10g || null, unit: '10g' };
    case 'silver':
      return { price: data.silver_1kg || null, unit: '1kg' };
    case 'copper':
      return { price: data.copper_1kg || data.copper || null, unit: '1kg' };
    case 'platinum':
      return { price: data.platinum_10g || data.platinum || null, unit: '10g' };
    case 'palladium':
      return { price: data.palladium_10g || data.palladium || null, unit: '10g' };
    default:
      return { price: null, unit: '' };
  }
}

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

  // Try to fetch price data for metadata (non-blocking, with timeout)
  let priceData: { price: number | null; unit: string } = { price: null, unit: '' };
  let priceRange: { min: number; max: number } | undefined = undefined;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    // Fetch current city price
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
      priceData = getMetalPriceForMetadata(data, metal as MetalType);
      
      // Fetch prices for top cities to calculate price range
      // Use a subset of top cities for faster metadata generation
      const citiesForRange = TOP_CITIES.slice(0, 5); // Top 5 cities
      const cityPrices: number[] = [];
      
      // Add current city price if available
      if (priceData.price && priceData.price > 0) {
        cityPrices.push(priceData.price);
      }
      
      // Fetch prices for other cities (with timeout to avoid blocking)
      try {
        const rangeController = new AbortController();
        const rangeTimeoutId = setTimeout(() => rangeController.abort(), 3000); // 3 second timeout for range
        
        const rangePromises = citiesForRange
          .filter((c) => c !== city)
          .slice(0, 4) // Limit to 4 additional cities for speed
          .map(async (otherCity) => {
            try {
              const cityResponse = await fetch(`${baseUrl}/api/metals?city=${encodeURIComponent(otherCity)}`, {
                signal: rangeController.signal,
                next: { revalidate: 600 },
                headers: { 'Content-Type': 'application/json' },
              });
              
              if (cityResponse.ok) {
                const cityData = await cityResponse.json();
                const cityPriceData = getMetalPriceForMetadata(cityData, metal as MetalType);
                return cityPriceData.price;
              }
            } catch (err) {
              // Silently fail for individual cities
            }
            return null;
          });
        
        const rangeResults = await Promise.allSettled(rangePromises);
        clearTimeout(rangeTimeoutId);
        
        // Collect valid prices
        rangeResults.forEach((result) => {
          if (result.status === 'fulfilled' && result.value && result.value > 0) {
            cityPrices.push(result.value);
          }
        });
        
        // Calculate price range if we have at least 2 prices
        if (cityPrices.length >= 2) {
          priceRange = {
            min: Math.min(...cityPrices),
            max: Math.max(...cityPrices),
          };
        }
      } catch (rangeError) {
        // Silently fail - will use single price instead
        console.error('Error fetching price range for metadata:', rangeError);
      }
    }
  } catch (error) {
    // Silently fail - metadata will work without price
    console.error('Error fetching price for metadata:', error);
  }

  return generateMetalMetadata({
    title: `${metalName} Price Today in ${cityName} – Live ${metalName} Rate`,
    description: `Get live ${metal} prices in ${cityName}, India. Check today's ${metal} rate, historical trends, and market insights. Real-time updates from trusted sources.`,
    city: city,
    metal: metal as MetalType,
    price: priceData.price || undefined,
    unit: priceData.unit || undefined,
    priceRange: priceRange,
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
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (typeof window === 'undefined' 
        ? process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000'
        : window.location.origin);
    
    const apiUrl = `${baseUrl}/api/metals?city=${encodeURIComponent(city)}`;
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
    // Continue with null data - page will still render
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

  // Generate Dataset schema for historical price data
  const priceHistoryData = data ? getPriceHistoryData(data, metalType) : [];
  const datasetSchema = priceHistoryData.length > 0
    ? generateDatasetSchema({
        metal: metalType,
        city: city,
        dataPoints: priceHistoryData,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 
          (typeof window === 'undefined' 
            ? process.env.VERCEL_URL 
              ? `https://${process.env.VERCEL_URL}`
              : 'http://localhost:3000'
            : typeof window !== 'undefined' ? window.location.origin : 'https://metalview.in'),
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
      {datasetSchema && Object.keys(datasetSchema).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
        />
      )}
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { 
                label: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Prices`, 
                href: `/${metal}/price-in/${city}` 
              },
              { 
                label: `${cityName}`, 
                href: `/${metal}/price-in/${city}` 
              },
            ]}
          />

          {/* SEO Content Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {metal.charAt(0).toUpperCase() + metal.slice(1)} Price Today in {cityName}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              Get live {metal} prices in {cityName}, India. Check today's {metal} rate, historical
              trends, and market insights. Prices are updated in real-time from trusted sources.
            </p>
            {data?.updated_at && (
              <LastUpdated date={data.updated_at} />
            )}
          </div>

          {/* City Selector */}
          <div className="mb-8 flex justify-end">
            <CityNavigationClient
              cities={TOP_CITIES}
              selectedCity={city}
              metal={metal}
            />
          </div>

          {/* AdSense Ad - After Header */}
          <div className="mb-8 flex justify-center">
            <AdSenseResponsive className="min-h-[100px] max-w-full" />
          </div>

          {/* Main Price Section */}
          <div className="mb-8">
            {metalType === 'gold' && (
              <GoldPriceCityBlock city={city} initialData={data} />
            )}
            {metalType === 'silver' && data?.silver_1kg && (
              <SilverPriceSection
                price1kg={data.silver_1kg}
                price1g={data.silver_1g}
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
            {metalType === 'platinum' && (data?.platinum_10g || data?.platinum) && (
              <PlatinumPriceSection
                price1g={data.platinum_1g ?? data.platinum ?? null}
                price10g={data.platinum_10g ?? null}
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

          {/* Price History Table */}
          {data && (
            <div className="mb-8">
              <PriceHistoryTable
                data={getPriceHistoryData(data, metalType)}
                title={`${metal.charAt(0).toUpperCase() + metal.slice(1)} Price History`}
                metalName={metal.charAt(0).toUpperCase() + metal.slice(1)}
                itemsPerPage={metalType === 'copper' ? 15 : undefined}
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

          {/* You May Also Like Section */}
          <YouMayAlsoLike
            currentMetal={metalType}
            currentCity={city}
            pageType="metal-city"
          />

          {/* People Also Ask Section */}
          <section aria-labelledby="people-also-ask" className="mb-8">
            <h2 id="people-also-ask" className="sr-only">
              People Also Ask
            </h2>
            <PeopleAlsoAsk
              questions={getPeopleAlsoAskQuestions(metalType)}
              title="People Also Ask"
            />
          </section>

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

          {/* FAQ Schema for People Also Ask */}
          <FAQSchema
            faqs={[
              ...getPeopleAlsoAskQuestions(metalType),
              ...cityFAQs,
            ]}
            metal={metalType}
            city={city}
          />

          {/* AdSense Ad - Before Related Sections */}
          <div className="mb-8 flex justify-center">
            <AdSenseResponsive className="min-h-[100px] max-w-full" />
          </div>

          {/* Related Cities Section */}
          <section aria-labelledby="related-cities" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="related-cities" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              {metal.charAt(0).toUpperCase() + metal.slice(1)} Prices in Other Cities
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Compare {metal} prices across major Indian cities. Prices may vary based on local demand, transportation costs, and regional market conditions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TOP_CITIES.filter((c) => c !== city).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/${metal}/price-in/${otherCity}`}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-200 text-center"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href={`/${metal}/price-in`}
                className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                View all cities →
              </Link>
            </div>
          </section>

          {/* Related Metals Section */}
          <section aria-labelledby="other-metals" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="other-metals" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Other Metal Prices in {cityName}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Explore prices for other precious and industrial metals in {cityName}. All prices are updated in real-time.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {(['gold', 'silver', 'copper', 'platinum', 'palladium'] as MetalType[])
                .filter((m) => m !== metalType)
                .map((otherMetal) => {
                  const getMetalStyles = (metal: MetalType) => {
                    switch (metal) {
                      case 'gold':
                        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-700';
                      case 'silver':
                        return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600';
                      case 'copper':
                        return 'bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/30 hover:border-orange-400 dark:hover:border-orange-700';
                      case 'platinum':
                        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 hover:border-blue-400 dark:hover:border-blue-700';
                      case 'palladium':
                        return 'bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/30 hover:border-purple-400 dark:hover:border-purple-700';
                      default:
                        return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';
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

          {/* AdSense Ad - Before Footer */}
          <div className="mb-8 flex justify-center">
            <AdSenseResponsive className="min-h-[100px] max-w-full" />
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
