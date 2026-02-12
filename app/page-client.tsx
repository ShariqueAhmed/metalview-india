/**
 * Main Page Client Component
 * Handles all client-side logic for the home page
 */

'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import CitySelector from '@/components/CitySelector';
import { getAvailableSilverCities } from '@/utils/silverFetcher';
import { formatCityName } from '@/utils/conversions';

// Dynamic import for ChartSection (heavy component with Recharts)
// Enhanced skeleton with fixed dimensions to prevent layout shift
const ChartSection = dynamic(() => import('@/components/ChartSection'), {
  loading: () => (
    <div 
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow animate-pulse"
      style={{ minHeight: '400px' }}
    >
      <div className="mb-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="h-72 sm:h-96 bg-slate-100 dark:bg-slate-800 rounded-lg" style={{ minHeight: '288px' }}></div>
    </div>
  ),
  ssr: false, // Charts don't need SSR
});
import MetalTabs, { MetalType } from '@/components/MetalTabs';
import CombinedGoldPriceSection from '@/components/CombinedGoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import PriceHistoryTable from '@/components/PriceHistoryTable';
import TrendingCities from '@/components/TrendingCities';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { AdSenseResponsive } from '@/components/AdSense';
import FAQSchema from '@/components/FAQSchema';
import FAQSection from '@/components/FAQSection';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import { getPeopleAlsoAskQuestions } from '@/utils/peopleAlsoAsk';
import { generateAggregateOfferSchema } from '@/utils/seo';
import LastUpdated from '@/components/LastUpdated';
import RelatedSearches from '@/components/RelatedSearches';
import TrendingKeywords from '@/components/TrendingKeywords';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface GoldTrendPoint {
  date: string;
  price: number;
}

// Removed unused interfaces: SilverTrendPoint, CopperTrendPoint

interface MetalsData {
  city: string;
  gold_10g: number | null;
  gold_22k_10g: number | null;
  gold_18k_10g?: number | null;
  gold_1g: number | null;
  gold_22k_1g: number | null;
  gold_18k_1g?: number | null;
  gold_18k_difference?: string | null;
  gold_22k_difference?: string | null;
  gold_24k_difference?: string | null;
  gold_18k_percentage?: string | null;
  gold_22k_percentage?: string | null;
  gold_24k_percentage?: string | null;
  goldTrend18k?: GoldTrendPoint[];
  goldTrend22k?: GoldTrendPoint[];
  goldTrend24k?: GoldTrendPoint[];
  silver_1kg: number | null;
  silver_10g?: number | null;
  silver_1g?: number | null;
  silverTrend?: GoldTrendPoint[];
  silverPercentageChange?: number | null;
  copper: number | null;
  copper_1kg?: number | null;
  copper_100g?: number | null;
  copper_10g?: number | null;
  copper_1g?: number | null;
  copperPercentageChange?: number | null;
  copperTrend?: GoldTrendPoint[];
  platinum: number | null;
  platinum_1g?: number | null;
  platinum_10g?: number | null;
  platinumPercentageChange?: number | null;
  platinumVariationType?: 'up' | 'down';
  platinumVariation?: string;
  palladium: number | null;
  palladium_1g?: number | null;
  palladium_10g?: number | null;
  palladiumPercentageChange?: number | null;
  palladiumVariationType?: 'up' | 'down';
  palladiumVariation?: string;
  updated_at: string;
  cached: boolean;
  trendingCities?: string[];
}

const FALLBACK_CITIES = [
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
];

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<string>('mumbai');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');
  const [data, setData] = useState<MetalsData | null>(null);
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<string[]>(FALLBACK_CITIES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [multiCityPrices, setMultiCityPrices] = useState<Array<{ city: string; price: number }>>([]);

  // Get initial values from URL params
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const metalParam = searchParams.get('metal');
    
    if (cityParam) {
      setSelectedCity(cityParam.toLowerCase());
    }
    
    if (metalParam && ['gold', 'silver', 'copper', 'platinum', 'palladium'].includes(metalParam)) {
      setSelectedMetal(metalParam as MetalType);
    }
  }, [searchParams]);

  const fetchData = useCallback(async (city: string, isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(`/api/metals?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch metal prices');
      }
      const result: MetalsData = await response.json();
      
      if (isRefresh) {
        setPreviousData(data);
      }
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching metal prices:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [data]);

  useEffect(() => {
    fetchData(selectedCity);
  }, [selectedCity, fetchData]);

  // Reset showFullContent when metal changes
  useEffect(() => {
    setShowFullContent(false);
  }, [selectedMetal]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await getAvailableSilverCities();
        if (cities && cities.length > 0) {
          // Extract city slugs from SilverCity objects (they have {city, slug, symbol} structure)
          const citySlugs = cities
            .map((cityObj) => {
              // cityObj is a SilverCity object with {city, slug, symbol}
              return typeof cityObj === 'string' ? cityObj : (cityObj.slug || cityObj.city || '');
            })
            .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
          
          if (citySlugs.length > 0) {
            setAvailableCities(citySlugs);
          }
        }
      } catch (err) {
        console.error('Error loading cities:', err);
      }
    };
    loadCities();
  }, []);

  // Fetch prices for top cities to generate AggregateOffer schema
  useEffect(() => {
    const fetchMultiCityPrices = async () => {
      if (!data || !selectedMetal) return;

      const topCities = FALLBACK_CITIES.slice(0, 5); // Top 5 cities
      const cityPrices: Array<{ city: string; price: number }> = [];

      // Add current city price
      const currentPrice = selectedMetal === 'gold' 
        ? data.gold_10g 
        : selectedMetal === 'silver' 
        ? data.silver_1kg 
        : selectedMetal === 'copper' 
        ? data.copper_1kg 
        : selectedMetal === 'platinum' 
        ? data.platinum_10g 
        : data.palladium_10g;

      if (currentPrice) {
        cityPrices.push({
          city: data.city || selectedCity,
          price: currentPrice,
        });

        // Fetch prices for other top cities
        const otherCities = topCities.filter((c) => c !== (data.city || selectedCity));
        
        try {
          const pricePromises = otherCities.map(async (city) => {
            try {
              const response = await fetch(`/api/metals/${city}`);
              if (response.ok) {
                const cityData = await response.json();
                const price = selectedMetal === 'gold' 
                  ? cityData.gold_10g 
                  : selectedMetal === 'silver' 
                  ? cityData.silver_1kg 
                  : selectedMetal === 'copper' 
                  ? cityData.copper_1kg 
                  : selectedMetal === 'platinum' 
                  ? cityData.platinum_10g 
                  : cityData.palladium_10g;
                
                if (price && price > 0) {
                  return { city, price };
                }
              }
            } catch (err) {
              console.error(`Error fetching price for ${city}:`, err);
            }
            return null;
          });

          const results = await Promise.all(pricePromises);
          const validPrices = results.filter((r): r is { city: string; price: number } => r !== null);
          cityPrices.push(...validPrices);
        } catch (err) {
          console.error('Error fetching multi-city prices:', err);
        }
      }

      if (cityPrices.length > 1) {
        setMultiCityPrices(cityPrices);
      }
    };

    fetchMultiCityPrices();
  }, [data, selectedMetal, selectedCity]);

  const generateFAQs = () => {
    const cityName = data?.city ? data.city.charAt(0).toUpperCase() + data.city.slice(1) : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
    const baseFAQs = [
      {
        question: `What is the current ${selectedMetal} price in ${cityName}?`,
        answer: data?.[selectedMetal === 'gold' ? 'gold_10g' : selectedMetal === 'silver' ? 'silver_1kg' : selectedMetal === 'copper' ? 'copper_1kg' : selectedMetal === 'platinum' ? 'platinum_10g' : 'palladium_10g']
          ? `The current ${selectedMetal} price in ${cityName} is ₹${data[selectedMetal === 'gold' ? 'gold_10g' : selectedMetal === 'silver' ? 'silver_1kg' : selectedMetal === 'copper' ? 'copper_1kg' : selectedMetal === 'platinum' ? 'platinum_10g' : 'palladium_10g']?.toLocaleString('en-IN')} per ${selectedMetal === 'gold' || selectedMetal === 'platinum' || selectedMetal === 'palladium' ? '10 grams' : selectedMetal === 'silver' ? 'kilogram' : 'kilogram'}. Prices are updated in real-time from trusted sources.`
          : `Check the current ${selectedMetal} price in ${cityName} above. Prices are updated in real-time and may vary throughout the day based on market conditions.`,
      },
      {
        question: `How often are ${selectedMetal} prices updated?`,
        answer: `${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} prices on MetalView are updated in real-time throughout the day. We source data from trusted financial platforms to ensure accuracy and timeliness.`,
      },
      {
        question: `What factors affect ${selectedMetal} prices in India?`,
        answer: `${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} prices in India are influenced by international market rates, currency exchange rates (USD/INR), import duties, local demand and supply, seasonal factors, and government policies.`,
      },
    ];

    return [
      ...baseFAQs,
      ...(selectedMetal === 'gold' ? [
        {
          question: 'What is the difference between 24K, 22K, and 18K gold?',
          answer: '24K gold is 99.9% pure gold, the purest form. 22K gold is 91.6% pure (commonly used for jewelry in India). 18K gold is 75% pure (used in international jewelry). Higher purity means higher price per gram.',
        },
        {
          question: 'Is gold a good investment?',
          answer: 'Gold is considered a safe-haven asset and can be a good hedge against inflation. However, investment decisions should be based on your financial goals, risk tolerance, and market conditions. Consult with a financial advisor before making investment decisions.',
        },
      ] : []),
    ];
  };

  const handleRefresh = useCallback(() => {
    fetchData(selectedCity, true);
  }, [selectedCity, fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full" role="main" aria-label="Metal prices content">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={(() => {
            const items = [{ label: 'Home', href: '/' }];
            if (selectedMetal && selectedMetal !== 'gold') {
              items.push({ 
                label: `${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} Prices`, 
                href: `/?metal=${selectedMetal}` 
              });
            }
            if (data?.city && data.city !== 'mumbai') {
              items.push({ 
                label: `${data.city.charAt(0).toUpperCase() + data.city.slice(1)}`, 
                href: `/?metal=${selectedMetal}&city=${data.city}` 
              });
            }
            return items;
          })()}
        />
        
        {/* Main Page Heading - h1 for SEO */}
        <h1 className="sr-only">Live Metal Prices in India - Gold, Silver, Copper, Platinum, and Palladium</h1>
        
        {/* Market Overview */}
        <section aria-labelledby="market-overview" className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 id="market-overview" className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1.5">
              Market Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Real-time pricing for Gold, Silver, Platinum, and Palladium
            </p>
            {data?.updated_at && (
              <LastUpdated date={data.updated_at} className="mt-1" />
            )}
          </div>
        </section>

        {/* SEO Content Section - Dynamic based on selected metal */}
        <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {(() => {
              // Gold content
              if (selectedMetal === 'gold') {
                return (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                      Gold Price Today in India - Live Rates & Market Insights
                    </h2>
                    <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                      <p>
                        {data?.gold_1g != null && data?.gold_22k_1g != null && data?.gold_18k_1g != null && 
                         typeof data.gold_1g === 'number' && typeof data.gold_22k_1g === 'number' && typeof data.gold_18k_1g === 'number' ? (
                          <>
                            The <strong>price of gold in India today</strong> is <strong>₹{data.gold_1g.toLocaleString('en-IN')} per gram</strong> for <strong>24 karat gold (24K gold, also called 999 gold)</strong>, <strong>₹{data.gold_22k_1g.toLocaleString('en-IN')} per gram</strong> for <strong>22 karat gold (22K gold)</strong>, and <strong>₹{data.gold_18k_1g.toLocaleString('en-IN')} per gram</strong> for <strong>18 karat gold (18K gold)</strong>.
                          </>
                        ) : (
                          <>
                            Get <strong>live gold prices today</strong> updated every 10 minutes from trusted sources. MetalView provides accurate <strong>gold prices in India</strong> across major cities including Mumbai, Delhi, Bangalore, Kolkata, and Chennai, helping you make informed investment and purchase decisions.
                          </>
                        )}
                      </p>
                      
                      {showFullContent && (
                        <>
                          <p>
                            <strong>Gold prices in India</strong> are influenced by multiple factors including international market rates, currency exchange fluctuations (USD/INR), import duties, local demand during festivals and wedding seasons, and government policies. Our platform tracks <strong>24K gold price</strong>, <strong>22K gold price</strong>, and <strong>18K gold price</strong> per gram and per 10 grams, giving you comprehensive pricing information for both investment and jewelry purposes.
                          </p>
                          <p>
                            Understanding <strong>gold price trends</strong> helps you identify the best time to buy or sell, compare rates across different cities, and make data-driven decisions. With historical price trends, city-wise comparisons, and regular updates, MetalView is your comprehensive resource for all gold pricing information in India.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                );
              }
              
              // Silver content
              if (selectedMetal === 'silver') {
                return (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                      Silver Price Today in India - Live Rates & Market Insights
                    </h2>
                    <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                      <p>
                        {data?.silver_1kg != null && typeof data.silver_1kg === 'number' ? (
                          <>
                            The <strong>silver price in India today</strong> is <strong>₹{data.silver_1kg.toLocaleString('en-IN')} per kilogram</strong>.
                          </>
                        ) : (
                          <>
                            Get <strong>live silver prices today</strong> and <strong>real-time silver rates</strong> updated every 10 minutes from trusted sources. MetalView provides accurate <strong>silver prices in India</strong> across major cities including Mumbai, Delhi, Bangalore, Kolkata, and Chennai, helping you make informed investment and purchase decisions.
                          </>
                        )}
                      </p>
                      
                      {showFullContent && (
                        <>
                          <p>
                            <strong>Silver prices in India</strong> are quoted per kilogram and reflect both industrial demand and investment interest. Silver is widely used in electronics, solar panels, jewelry, and as an investment asset. The <strong>silver price per kg</strong> fluctuates based on international market rates, currency exchange rates, import duties, and local demand.
                          </p>
                          <p>
                            Understanding <strong>silver price trends</strong> helps you identify the best time to buy or sell, compare rates across different cities, and make data-driven investment decisions. With historical price trends, city-wise comparisons, and regular updates, MetalView is your comprehensive resource for all silver pricing information in India.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                );
              }
              
              // Copper content
              if (selectedMetal === 'copper') {
                return (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                      Copper Price Today in India - Live Rates & Market Insights
                    </h2>
                    <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                      <p>
                        {data?.copper_1kg != null && typeof data.copper_1kg === 'number' ? (
                          <>
                            The <strong>copper price in India today</strong> is <strong>₹{data.copper_1kg.toLocaleString('en-IN')} per kilogram</strong>.
                          </>
                        ) : (
                          <>
                            Get <strong>live copper prices today</strong> and <strong>real-time copper rates</strong> updated every 10 minutes from trusted sources. MetalView provides accurate <strong>copper prices in India</strong> across major cities including Mumbai, Delhi, Bangalore, Kolkata, and Chennai, helping you make informed investment and purchase decisions.
                          </>
                        )}
                      </p>
                      
                      {showFullContent && (
                        <>
                          <p>
                            <strong>Copper prices in India</strong> are quoted per kilogram and are primarily driven by industrial demand. Copper is essential in construction, electrical wiring, electronics, and renewable energy systems. The <strong>copper price per kg</strong> fluctuates based on global supply and demand, economic growth indicators, and currency exchange rates.
                          </p>
                          <p>
                            Understanding <strong>copper price trends</strong> helps you identify the best time to buy or sell, compare rates across different cities, and make data-driven investment decisions. With historical price trends, city-wise comparisons, and regular updates, MetalView is your comprehensive resource for all copper pricing information in India.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                );
              }
              
              // Platinum content
              if (selectedMetal === 'platinum') {
                return (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                      Platinum Price Today in India - Live Rates & Market Insights
                    </h2>
                    <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                      <p>
                        {data?.platinum_10g != null && typeof data.platinum_10g === 'number' ? (
                          <>
                            The <strong>platinum price in India today</strong> is <strong>₹{data.platinum_10g.toLocaleString('en-IN')} per 10 grams</strong>{data?.platinum_1g != null && typeof data.platinum_1g === 'number' ? (
                              <>. That's <strong>₹{data.platinum_1g.toLocaleString('en-IN')} per gram</strong>.</>
                            ) : '.'}
                          </>
                        ) : (
                          <>
                            Get <strong>live platinum prices today</strong> and <strong>real-time platinum rates</strong> updated every 10 minutes from trusted sources. MetalView provides accurate <strong>platinum prices in India</strong> across major cities including Mumbai, Delhi, Bangalore, Kolkata, and Chennai, helping you make informed investment and purchase decisions.
                          </>
                        )}
                      </p>
                      
                      {showFullContent && (
                        <>
                          <p>
                            <strong>Platinum prices in India</strong> are quoted per 10 grams and reflect both industrial demand and investment interest. Platinum is used in automotive catalysts, jewelry, electronics, and as an investment asset. The <strong>platinum price per 10g</strong> fluctuates based on international market rates, currency exchange rates, import duties, and industrial demand.
                          </p>
                          <p>
                            Understanding <strong>platinum price trends</strong> helps you identify the best time to buy or sell, compare rates across different cities, and make data-driven investment decisions. With historical price trends, city-wise comparisons, and regular updates, MetalView is your comprehensive resource for all platinum pricing information in India.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                );
              }
              
              // Palladium content
              if (selectedMetal === 'palladium') {
                return (
                  <>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                      Palladium Price Today in India - Live Rates & Market Insights
                    </h2>
                    <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                      <p>
                        {data?.palladium_10g != null && typeof data.palladium_10g === 'number' ? (
                          <>
                            The <strong>palladium price in India today</strong> is <strong>₹{data.palladium_10g.toLocaleString('en-IN')} per 10 grams</strong>{data?.palladium_1g != null && typeof data.palladium_1g === 'number' ? (
                              <>. That's <strong>₹{data.palladium_1g.toLocaleString('en-IN')} per gram</strong>.</>
                            ) : '.'}
                          </>
                        ) : (
                          <>
                            Get <strong>live palladium prices today</strong> and <strong>real-time palladium rates</strong> updated every 10 minutes from trusted sources. MetalView provides accurate <strong>palladium prices in India</strong> across major cities including Mumbai, Delhi, Bangalore, Kolkata, and Chennai, helping you make informed investment and purchase decisions.
                          </>
                        )}
                      </p>
                      
                      {showFullContent && (
                        <>
                          <p>
                            <strong>Palladium prices in India</strong> are quoted per 10 grams and reflect both industrial demand and investment interest. Palladium is primarily used in automotive catalytic converters, electronics, jewelry, and as an investment asset. The <strong>palladium price per 10g</strong> fluctuates based on international market rates, currency exchange rates, import duties, and industrial demand, particularly from the automotive sector.
                          </p>
                          <p>
                            Understanding <strong>palladium price trends</strong> helps you identify the best time to buy or sell, compare rates across different cities, and make data-driven investment decisions. With historical price trends, city-wise comparisons, and regular updates, MetalView is your comprehensive resource for all palladium pricing information in India.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                );
              }
              
              // Default fallback
              return null;
            })()}
            
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              aria-expanded={showFullContent}
              aria-label={showFullContent ? 'Show less content' : 'Show more content'}
            >
              {showFullContent ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </section>

        {/* AdSense Ad - After SEO Content */}
        <div className="mb-8 flex justify-center">
          <AdSenseResponsive className="min-h-[100px] max-w-full" />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">{error}</p>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* City Selector */}
        <div className="mb-6">
          <CitySelector
            cities={availableCities}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        {/* Metal Tabs */}
        <MetalTabs
          selectedMetal={selectedMetal}
          onMetalChange={setSelectedMetal}
          hasGoldData={!!data?.gold_10g}
          hasSilverData={!!data?.silver_1kg}
          hasCopperData={!!data?.copper_1kg}
          hasPlatinumData={!!data?.platinum}
          hasPalladiumData={!!data?.palladium}
        />

        {/* AdSense Ad - After Metal Tabs */}
        {data && (
          <div className="mb-6 flex justify-center">
            <AdSenseResponsive className="min-h-[100px] max-w-full" />
          </div>
        )}

        {/* Loading State - Enhanced skeleton to prevent layout shift */}
        {isLoading && !data && (
          <div className="space-y-6" style={{ minHeight: '600px' }}>
            {/* Price cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 card-shadow animate-pulse"
                  style={{ minHeight: '200px' }}
                >
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            {/* Chart skeleton */}
            <div
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow animate-pulse"
              style={{ minHeight: '400px' }}
            >
              <div className="mb-6">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
              <div className="h-72 sm:h-96 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
            </div>
          </div>
        )}

        {/* Metal-Specific Content */}
        {data && (
          <>
            {selectedMetal === 'gold' && (
              <>
                <section aria-labelledby="gold-prices" className="mb-6" style={{ minHeight: '300px' }}>
                  <div className="mb-6">
                    <h2 id="gold-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                      Gold Prices
                    </h2>
                    {data.city && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                      </p>
                    )}
                  </div>
                  <CombinedGoldPriceSection
                    gold24k_10g={data.gold_10g ?? null}
                    gold22k_10g={data.gold_22k_10g ?? null}
                    gold18k_10g={data.gold_18k_10g ?? null}
                    gold24k_1g={data.gold_1g ?? null}
                    gold22k_1g={data.gold_22k_1g ?? null}
                    gold18k_1g={data.gold_18k_1g ?? null}
                    gold24k_difference={data.gold_24k_difference ?? null}
                    gold22k_difference={data.gold_22k_difference ?? null}
                    gold18k_difference={data.gold_18k_difference ?? null}
                    gold24k_percentage={data.gold_24k_percentage ?? null}
                    gold22k_percentage={data.gold_22k_percentage ?? null}
                    gold18k_percentage={data.gold_18k_percentage ?? null}
                  />
                </section>
                
                {/* Gold Prices by Weight */}
                {data.gold_10g && (
                  <section aria-labelledby="gold-weight-prices" className="mb-8">
                    <GoldWeightPrices 
                      goldPrice10g={data.gold_10g}
                      goldPrice1g={data.gold_1g || (data.gold_10g ? data.gold_10g / 10 : undefined)}
                      gold22kPrice10g={data.gold_22k_10g || undefined}
                      gold22kPrice1g={data.gold_22k_1g || undefined}
                      gold18kPrice10g={data.gold_18k_10g || undefined}
                      gold18kPrice1g={data.gold_18k_1g || undefined}
                    />
                  </section>
                )}
              </>
            )}

            {selectedMetal === 'silver' && data?.silver_1kg && (
              <section aria-labelledby="silver-prices" className="mb-12" style={{ minHeight: '250px' }}>
                <div className="mb-6">
                  <h2 id="silver-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                    Silver Prices
                  </h2>
                  {data.city && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SilverPriceSection
                    price1kg={data.silver_1kg}
                    previousPrice1kg={previousData?.silver_1kg || null}
                    percentageChange={data.silverPercentageChange || null}
                  />
                </div>
              </section>
            )}

            {selectedMetal === 'copper' && data?.copper_1kg && (
              <section aria-labelledby="copper-prices" className="mb-12" style={{ minHeight: '250px' }}>
                <div className="mb-6">
                  <h2 id="copper-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                    Copper Prices
                  </h2>
                  {data.city && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CopperPriceSection
                    price1kg={data.copper_1kg}
                    price100g={data.copper_100g || null}
                    percentageChange={data.copperPercentageChange || null}
                  />
                </div>
              </section>
            )}

            {selectedMetal === 'platinum' && (
              <>
                <section aria-labelledby="platinum-prices" className="mb-12" style={{ minHeight: '250px' }}>
                  <div className="mb-6">
                    <h2 id="platinum-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                      Platinum Prices
                    </h2>
                    {data.city && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PlatinumPriceSection
                      price1g={data?.platinum_1g ?? data?.platinum ?? null}
                      price10g={data?.platinum_10g ?? null}
                      previousPrice1g={previousData?.platinum_1g ?? previousData?.platinum ?? null}
                      previousPrice10g={previousData?.platinum_10g ?? null}
                      percentageChange={data?.platinumPercentageChange || null}
                      variationType={data?.platinumVariationType}
                      variation={data?.platinumVariation}
                    />
                  </div>
                </section>
                <section aria-labelledby="platinum-trends" className="mb-12">
                  <h2 id="platinum-trends" className="sr-only">
                    Platinum Price Trends
                  </h2>
                  <ChartSection
                    goldData={undefined}
                    silverData={undefined}
                    copperData={undefined}
                    platinumData={
                      data?.platinum_10g || data?.platinum
                        ? [
                            { date: 'Day 1', price: data.platinum_10g || data.platinum || 0 },
                            { date: 'Day 2', price: (data.platinum_10g || data.platinum || 0) * 0.99 },
                            { date: 'Day 3', price: (data.platinum_10g || data.platinum || 0) * 1.01 },
                            { date: 'Day 4', price: (data.platinum_10g || data.platinum || 0) * 0.98 },
                            { date: 'Day 5', price: (data.platinum_10g || data.platinum || 0) * 1.02 },
                            { date: 'Day 6', price: (data.platinum_10g || data.platinum || 0) * 0.99 },
                            { date: 'Day 7', price: data.platinum_10g || data.platinum || 0 },
                          ]
                        : undefined
                    }
                    subtitle="Historical price movement for Platinum"
                  />
                </section>
                <section aria-labelledby="platinum-history" className="mb-12">
                  <h2 id="platinum-history" className="sr-only">
                    Platinum Price History
                  </h2>
                  <PriceHistoryTable
                    data={
                      data?.platinum_10g || data?.platinum
                        ? [
                            { date: new Date().toISOString(), price: data.platinum_10g || data.platinum || 0 },
                            { date: new Date(Date.now() - 86400000).toISOString(), price: (data.platinum_10g || data.platinum || 0) * 0.99 },
                            { date: new Date(Date.now() - 172800000).toISOString(), price: (data.platinum_10g || data.platinum || 0) * 1.01 },
                          ]
                        : undefined
                    }
                    title="Platinum Price History"
                    metalName="Platinum"
                  />
                </section>
              </>
            )}

            {selectedMetal === 'palladium' && data?.palladium_10g && (
              <section aria-labelledby="palladium-prices" className="mb-12">
                <div className="mb-6">
                  <h2 id="palladium-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                    Palladium Prices
                  </h2>
                  {data.city && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PalladiumPriceSection
                    price1g={data.palladium_1g || null}
                    price10g={data.palladium_10g || null}
                    previousPrice1g={previousData?.palladium_1g || null}
                    previousPrice10g={previousData?.palladium_10g || null}
                    percentageChange={data.palladiumPercentageChange || null}
                    variationType={data.palladiumVariationType}
                    variation={data.palladiumVariation}
                  />
                </div>
              </section>
            )}

            {/* Price History Table */}
            {data && (
              <section aria-labelledby="price-history" className="mb-8">
                <h2 id="price-history" className="sr-only">
                  {selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} Price History
                </h2>
                <PriceHistoryTable
                  data={(() => {
                    if (selectedMetal === 'gold' && data.goldTrend24k) return data.goldTrend24k;
                    if (selectedMetal === 'silver' && data.silverTrend) return data.silverTrend;
                    if (selectedMetal === 'copper' && data.copperTrend) return data.copperTrend;
                    return undefined;
                  })()}
                  title={`${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} Price History`}
                  metalName={selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)}
                  itemsPerPage={selectedMetal === 'copper' ? 15 : undefined}
                  showCaratSelector={selectedMetal === 'gold'}
                  caratData={
                    selectedMetal === 'gold'
                      ? {
                          '24k': data.goldTrend24k,
                          '22k': data.goldTrend22k,
                          '18k': data.goldTrend18k,
                        }
                      : undefined
                  }
                />
              </section>
            )}

            {/* AdSense Ad - After Price History */}
            {data && (
              <div className="mb-8 flex justify-center">
                <AdSenseResponsive className="min-h-[100px] max-w-full" />
              </div>
            )}

            {/* Historical Trends Chart */}
            {data && (
              <section aria-labelledby="price-trends" className="mb-8">
                <h2 id="price-trends" className="sr-only">
                  Historical Price Trends for {selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)}
                </h2>
                <ChartSection
                  goldData={
                    selectedMetal === 'gold' && data.goldTrend24k
                      ? data.goldTrend24k.map((point) => ({ date: point.date, price: point.price }))
                      : undefined
                  }
                  silverData={
                    selectedMetal === 'silver' && data.silverTrend
                      ? data.silverTrend.map((point) => ({ date: point.date, price: point.price }))
                      : undefined
                  }
                  copperData={
                    selectedMetal === 'copper' && data.copperTrend
                      ? data.copperTrend.map((point) => ({ date: point.date, price: point.price }))
                      : undefined
                  }
                  subtitle={`Historical price trends for ${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)}`}
                />
              </section>
            )}

            {/* Trending Keywords Section */}
            <TrendingKeywords limit={12} />

            {/* Trending Cities */}
            {data.trendingCities && data.trendingCities.length > 0 && (
              <section aria-labelledby="trending-cities" className="mb-8">
                <h2 id="trending-cities" className="sr-only">
                  Trending Cities for Metal Prices
                </h2>
                <TrendingCities
                  cities={data.trendingCities}
                  selectedCity={selectedCity}
                  onCityClick={setSelectedCity}
                />
              </section>
            )}

            {/* Related Cities Section */}
            <section aria-labelledby="related-cities" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
              <h2 id="related-cities" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
                {selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} Prices in Other Cities
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Compare {selectedMetal} prices across major Indian cities. Prices may vary based on local demand, transportation costs, and regional market conditions.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {FALLBACK_CITIES.filter((c) => c !== selectedCity).slice(0, 12).map((otherCity) => (
                  <Link
                    key={otherCity}
                    href={`/${selectedMetal}/price-in/${otherCity}`}
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
                Other Metal Prices in {data?.city ? formatCityName(data.city) : formatCityName(selectedCity)}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Explore prices for other precious and industrial metals. All prices are updated in real-time.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(['gold', 'silver', 'copper', 'platinum', 'palladium'] as MetalType[])
                  .filter((m) => m !== selectedMetal)
                  .map((otherMetal) => {
                    const getMetalStyles = (metal: MetalType) => {
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
                        key={otherMetal}
                        href={`/?metal=${otherMetal}&city=${selectedCity}`}
                        className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 text-center ${getMetalStyles(otherMetal)}`}
                      >
                        {otherMetal.charAt(0).toUpperCase() + otherMetal.slice(1)}
                      </Link>
                    );
                  })}
              </div>
            </section>
          </>
        )}

        {/* Related Searches Section */}
        <RelatedSearches 
          metal={selectedMetal} 
          city={data?.city || selectedCity} 
        />

        {/* People Also Ask Section */}
        <section aria-labelledby="people-also-ask" className="mb-8">
          <h2 id="people-also-ask" className="sr-only">
            People Also Ask
          </h2>
          <PeopleAlsoAsk
            questions={getPeopleAlsoAskQuestions(selectedMetal)}
            title="People Also Ask"
          />
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-section" className="mb-8">
          <h2 id="faq-section" className="sr-only">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={generateFAQs()} />
        </section>

        {/* You May Also Like Section */}
        <YouMayAlsoLike
          currentMetal={selectedMetal}
          currentCity={data?.city || selectedCity}
          pageType="home"
        />

        {/* AdSense Ad - Before Footer */}
        <div className="mb-8 flex justify-center">
          <AdSenseResponsive className="min-h-[100px] max-w-full" />
        </div>
      </main>

      <Footer />

      {/* Structured Data */}
      <StructuredData
        gold24k_10g={data?.gold_10g || null}
        gold22k_10g={data?.gold_22k_10g || null}
        silver_1kg={data?.silver_1kg || null}
        copper_1kg={data?.copper_1kg || null}
        platinum_10g={data?.platinum_10g || null}
        palladium_10g={data?.palladium_10g || null}
        location={data?.city || selectedCity}
        lastUpdated={data?.updated_at}
        metalType={selectedMetal}
      />

      {/* FAQ Schema - Includes both regular FAQs and People Also Ask */}
      <FAQSchema
        faqs={[
          ...generateFAQs(),
          ...getPeopleAlsoAskQuestions(selectedMetal),
        ]}
        metal={selectedMetal}
        city={data?.city || selectedCity}
      />

      {/* AggregateOffer Schema for Multi-City Prices */}
      {multiCityPrices.length > 1 && (() => {
        const unit = selectedMetal === 'gold' || selectedMetal === 'platinum' || selectedMetal === 'palladium' 
          ? '10g' 
          : selectedMetal === 'silver' 
          ? '1kg' 
          : '1kg';
        
        const aggregateSchema = generateAggregateOfferSchema(multiCityPrices, selectedMetal, unit);
        
        if (Object.keys(aggregateSchema).length > 0) {
          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }}
            />
          );
        }
        return null;
      })()}
    </div>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {/* Enhanced skeleton loader to prevent layout shift */}
          <div className="space-y-6" style={{ minHeight: '600px' }}>
            {/* Header skeleton */}
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse"></div>
            </div>
            {/* Price cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 card-shadow animate-pulse"
                  style={{ minHeight: '200px' }}
                >
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
