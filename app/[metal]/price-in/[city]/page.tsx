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
import { getSiteUrl } from '@/utils/siteUrl';
import Link from 'next/link';
import { Info, HelpCircle } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';
import { getPeopleAlsoAskQuestions } from '@/utils/peopleAlsoAsk';
import FAQSchema from '@/components/FAQSchema';
import InlineMarkdown from '@/components/InlineMarkdown';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
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

// City-specific gold FAQs
const GOLD_CITY_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  mumbai: [
    {
      question: 'Why are gold prices in Mumbai often lower than other cities?',
      answer: 'Mumbai often acts as a benchmark city because trading depth, dealer competition, and wholesale connectivity are stronger than in many smaller markets. Even so, buyers should compare the final invoice and not assume every store will match the lowest visible rate.',
    },
    {
      question: 'Where can I buy gold in Mumbai?',
      answer: 'Zaveri Bazaar is the best-known traditional market, while branded chains, banks, and certified online sellers are additional options. The safest approach is to verify BIS hallmarking, purity, making charges, and buyback terms before you pay.',
    },
    {
      question: 'What is the best time to buy gold in Mumbai?',
      answer: 'There is no perfect day to buy gold in Mumbai. What helps more is checking the live benchmark, avoiding rushed festival-period purchases when possible, and comparing full-bill quotes across sellers before deciding.',
    },
  ],
  delhi: [
    {
      question: 'How do gold prices in Delhi compare to Mumbai?',
      answer: 'Delhi and Mumbai usually stay close on benchmark rates, but retail quotes can still diverge because of neighbourhood competition, making-charge policy, and seller premium. Compare the full estimate, not just the headline gold rate.',
    },
    {
      question: 'Where are the best places to buy gold in Delhi?',
      answer: 'Chandni Chowk, Karol Bagh, and established branded showrooms are all common buying options in Delhi. Before choosing any seller, ask for BIS hallmark details, purity, making charges, GST, and written invoice breakup.',
    },
  ],
};

const CITY_PROFILES: Record<string, string> = {
  mumbai: 'Mumbai is one of India\'s most influential bullion and commodities hubs, with deep trading networks, strong wholesale activity, and high price visibility.',
  delhi: 'Delhi combines old-market trading corridors with large organised retail demand, so quoted rates and final selling prices can vary across neighbourhoods and dealer types.',
  bangalore: 'Bangalore has a broad mix of jewellery buyers, investment-minded households, and digitally aware consumers, which makes it a useful city for comparing retail and investment demand.',
  kolkata: 'Kolkata has long-established jewellery and bullion networks, and local dealer relationships still play a meaningful role in how rates are quoted to retail buyers.',
  chennai:
    'Chennai is a major South Indian retail metals market with strong consumer demand, active branded outlets, and clear seasonality in buying activity.',
  hyderabad:
    'Hyderabad has dense retail corridors and active local competition, so quote styles, premiums, and margin structures can vary meaningfully across neighbourhoods and seller types.',
  pune: 'Pune benefits from its proximity to larger western India trading centres while maintaining its own active retail market for jewellery and investment products.',
  ahmedabad: 'Ahmedabad has a steady retail precious-metals market and a strong culture of comparing dealer quotes before buying, which can keep pricing competitive.',
  jaipur: 'Jaipur has a strong jewellery tradition and a tourist-facing retail base, so craftsmanship, design style, and dealer positioning often affect final billed prices.',
  surat: 'Surat is closely connected to wider trading and manufacturing networks, so commodity sentiment and business demand can influence how local rates are discussed and quoted.',
};

function getMetalPurposeLine(metal: MetalType): string {
  switch (metal) {
    case 'gold':
      return 'Gold buyers usually care about purity, jewellery pricing, coins or bars, and how today’s quoted rate turns into a final bill.';
    case 'silver':
      return 'Silver buyers often compare affordability, bulk purchase economics, industrial-demand volatility, and local resale convenience.';
    case 'copper':
      return 'Copper prices are more useful as a market indicator for businesses, contractors, and commodity followers than as a retail buying signal.';
    case 'platinum':
      return 'Platinum buyers usually compare it with gold for jewellery, premium design choices, and niche investment interest.';
    case 'palladium':
      return 'Palladium is usually followed for industrial and precious-metals context rather than mainstream retail buying.';
  }
}

function getMetalBuyingChecklist(metal: MetalType, cityName: string): string[] {
  switch (metal) {
    case 'gold':
      return [
        `Confirm whether the quote in ${cityName} is for 24K, 22K, or 18K before comparing it elsewhere.`,
        'Ask for making charges, GST, and hallmark details separately from the metal rate.',
        'Compare the final invoice, not just the displayed board price.',
      ];
    case 'silver':
      return [
        'Check whether the rate is per gram or per kilogram before comparing dealers.',
        'For jewellery or utensils, separate fabrication costs from metal value.',
        'If buying in larger quantity, consider storage and resale practicality too.',
      ];
    case 'copper':
      return [
        'Treat the published copper rate as a market reference, not as a retail quote.',
        'If copper is being sourced for business use, compare grade, delivery, and taxes together.',
        'Use trend data for planning context rather than day-trading assumptions.',
      ];
    case 'platinum':
      return [
        'Check purity, weight unit, and total billed amount before comparing platinum offers.',
        'If buying jewellery, ask how fabrication affects the final price.',
        'Use live rates as context, but verify the actual retail quote directly.',
      ];
    case 'palladium':
      return [
        'Verify exactly how the seller is quoting palladium and in what unit.',
        'Expect thinner retail availability than gold or silver in many cities.',
        'Compare the total cost and liquidity implications before buying.',
      ];
  }
}

function getCityInsight(city: string, cityName: string, metal: MetalType): string {
  const cityProfile =
    CITY_PROFILES[city.toLowerCase()] ||
    `${cityName} has its own mix of local demand, dealer competition, transport costs, and pricing practices that can make final quotes differ slightly from national benchmarks.`;

  switch (metal) {
    case 'gold':
      return `${cityProfile} On gold pages, the most important distinction is between the benchmark rate and the final jewellery or bullion invoice after purity, making charges, and GST are added.`;
    case 'silver':
      return `${cityProfile} Silver buyers in ${cityName} should pay attention to unit size, fabrication or utensil charges, and whether the quote is meant for bullion, jewellery, or industrial-use quantities.`;
    case 'copper':
      return `${cityProfile} Copper pricing in ${cityName} is usually more useful as a business and commodity reference point than as a consumer retail signal, because grade, delivery terms, and quantity matter heavily.`;
    case 'platinum':
      return `${cityProfile} Platinum demand in ${cityName} is thinner than gold or silver, so price comparison should focus on purity, availability, and the full retail quote rather than the headline benchmark alone.`;
    case 'palladium':
      return `${cityProfile} Palladium is typically followed for industrial and precious-metals context, so liquidity, quote transparency, and actual seller availability matter more than on mainstream jewellery metals.`;
  }
}

function getCityFAQs(city: string, cityName: string, metal: MetalType): Array<{ question: string; answer: string }> {
  if (metal === 'gold') {
    return GOLD_CITY_FAQS[city.toLowerCase()] || [];
  }

  switch (metal) {
    case 'silver':
      return [
        {
          question: `How should I compare silver prices in ${cityName}?`,
          answer: `Start by confirming whether the quote in ${cityName} is per gram, per 10 grams, or per kilogram. Then separate fabrication, GST, and product-specific charges from the benchmark silver rate before comparing dealers.`,
        },
        {
          question: `Why can the final silver bill in ${cityName} differ from the live rate?`,
          answer: `The live silver rate is only the metal benchmark. Your final bill in ${cityName} may also include fabrication charges, wastage, GST, packaging, and the seller's premium depending on whether you are buying jewellery, utensils, or bullion.`,
        },
      ];
    case 'copper':
      return [
        {
          question: `What does the copper price in ${cityName} page represent?`,
          answer: `This page gives a benchmark copper reference for ${cityName}. Actual business quotes can differ based on grade, quantity, delivery terms, taxes, and whether the transaction is retail, wholesale, or industrial.`,
        },
        {
          question: `Why is copper pricing in ${cityName} not the same as a retail shelf price?`,
          answer: `Copper is commonly quoted within broader supply contracts rather than as a simple consumer metal purchase. In ${cityName}, transport, grade certification, and supplier margins can materially affect the final payable rate.`,
        },
      ];
    case 'platinum':
      return [
        {
          question: `How should I evaluate platinum prices in ${cityName}?`,
          answer: `Use the live platinum benchmark in ${cityName} as a starting point, then confirm purity, unit weight, GST, and fabrication charges with the seller. Retail platinum availability can be narrower than gold, so final quotes may vary more.`,
        },
        {
          question: `Why can platinum jewellery prices in ${cityName} vary between stores?`,
          answer: `Stores in ${cityName} may use different purity standards, design premiums, and making-charge structures for platinum products. Comparing the full invoice is more useful than comparing only the displayed metal rate.`,
        },
      ];
    case 'palladium':
      return [
        {
          question: `Is palladium widely available for retail buying in ${cityName}?`,
          answer: `Retail palladium availability in ${cityName} is usually more limited than gold or silver. Before making a decision, confirm seller credibility, quote format, and resale options rather than relying only on the benchmark rate.`,
        },
        {
          question: `How should I use the palladium rate shown for ${cityName}?`,
          answer: `Treat it as a market reference for industrial and precious-metals tracking. If you receive an actual offer in ${cityName}, compare the benchmark with the quoted unit, taxes, availability, and liquidity conditions.`,
        },
      ];
  }
}

/** One visible FAQ block: city-specific + PAA, deduped by question text. */
function mergeFaqListsUniqueByQuestion(
  ...lists: Array<Array<{ question: string; answer: string }>>
): Array<{ question: string; answer: string }> {
  const seen = new Set<string>();
  const out: Array<{ question: string; answer: string }> = [];
  for (const list of lists) {
    for (const faq of list) {
      const key = faq.question.replace(/\s+/g, ' ').trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(faq);
    }
  }
  return out;
}

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
    const baseUrl = getSiteUrl();
    
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
    const baseUrl = getSiteUrl();
    
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

  const structuredDataUnit =
    metalType === 'gold' || metalType === 'platinum' || metalType === 'palladium'
      ? '10g'
      : '1kg';

  // Generate structured data
  const structuredData = data
    ? generateStructuredData({
        metal: metalType,
        price: getMetalPrice(data, metalType),
        unit: structuredDataUnit,
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
        baseUrl: getSiteUrl(),
      })
    : null;

  const cityInsight = getCityInsight(city, cityName, metalType);
  const cityFAQs = getCityFAQs(city, cityName, metalType);
  const peopleAlsoAsk = getPeopleAlsoAskQuestions(metalType);
  const visibleFaqs = mergeFaqListsUniqueByQuestion(cityFAQs, peopleAlsoAsk);
  const schemaFaqs = [...cityFAQs, ...peopleAlsoAsk];

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
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Use this page to see the current {metal} rate in {cityName}, compare it with other cities, and understand why prices vary by location. All rates are indicative; confirm with local dealers before buying.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {getMetalPurposeLine(metalType)}
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
                itemsPerPage={
                  metalType === 'copper'
                    ? 15
                    : metalType === 'palladium' || metalType === 'platinum'
                      ? 10
                      : undefined
                }
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
          {data && priceHistoryData.length > 0 && (
            <div className="mb-8">
              <ChartSection
                goldData={metalType === 'gold' ? data.goldTrend : undefined}
                silverData={metalType === 'silver' ? data.silverTrend : undefined}
                copperData={metalType === 'copper' ? data.copperTrend : undefined}
                title={`${metal.charAt(0).toUpperCase() + metal.slice(1)} Price Trends`}
                subtitle={`Historical price movement for ${metal.charAt(0).toUpperCase() + metal.slice(1)} in ${cityName}`}
                disableMockData={metalType === 'platinum' || metalType === 'palladium'}
              />
            </div>
          )}

          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              How to Use This {metal.charAt(0).toUpperCase() + metal.slice(1)} Page in {cityName}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Start with the live rate and visible timestamp, then compare the history section to understand whether today&apos;s move looks ordinary or unusually sharp. That helps you avoid reacting to a single number without context.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  If you are buying locally in {cityName}, use this page as a benchmark before you ask for a final quote. For physical purchases, the real decision should be based on the full bill and product details, not on the benchmark rate alone.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
                  Quick checklist
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  {getMetalBuyingChecklist(metalType, cityName).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

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
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In {cityName}, the benchmark {metal} rate is only one part of the real decision. Depending on the metal, the final usable quote may be shaped by fabrication, availability, quantity, supplier type, and how competitive the local market is on that day. Checking the history on this page helps you separate normal movement from a genuinely unusual shift.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                On approval-quality publisher pages, the useful part is not merely saying that cities differ. It is explaining how that difference shows up in real life. In practice, the benchmark metal rate may vary only modestly, while the effective out-of-pocket cost changes more because of shop policy, fabrication, urgency, local competition, and product mix.
              </p>
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

          {/* Combined FAQs */}
          {visibleFaqs.length > 0 && (
            <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Frequently Asked Questions About {metal.charAt(0).toUpperCase() + metal.slice(1)} in {cityName}
                </h2>
              </div>
              <div className="space-y-4">
                {visibleFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      <InlineMarkdown text={faq.answer} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Schema */}
          <FAQSchema faqs={schemaFaqs} metal={metalType} city={city} />

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
