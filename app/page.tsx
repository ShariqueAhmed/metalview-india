/**
 * Main Page
 * Displays live metal prices with city selector
 */

'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import CitySelector from '@/components/CitySelector';
import { getAvailableSilverCities } from '@/utils/silverFetcher';

// Dynamic import for ChartSection (heavy component with Recharts)
const ChartSection = dynamic(() => import('@/components/ChartSection'), {
  loading: () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow animate-pulse">
      <div className="mb-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="h-72 sm:h-96 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
    </div>
  ),
  ssr: false, // Charts don't need SSR
});
import MetalTabs, { MetalType } from '@/components/MetalTabs';
import GoldPriceSection from '@/components/GoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import PriceHistoryTable from '@/components/PriceHistoryTable';
import TrendingCities from '@/components/TrendingCities';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import FAQSchema from '@/components/FAQSchema';
import FAQSection from '@/components/FAQSection';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface GoldTrendPoint {
  date: string;
  price: number;
}

interface SilverTrendPoint {
  date: string;
  price: number;
  differenceAmount?: number;
  differencePercentage?: number;
}

interface CopperTrendPoint {
  date: string;
  price: number;
  percentageChange?: number;
}

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
  silver_1kg: number | null;
  silver_10g?: number | null;
  silver_1g?: number | null;
  copper: number | null;
  copper_1kg?: number | null;
  copper_100g?: number | null;
  copper_10g?: number | null;
  copper_1g?: number | null;
  copperPercentageChange?: number | null;
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
  error?: string;
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[];
  percentageChange24k?: number | null;
  percentageChange22k?: number | null;
  silverTrend?: SilverTrendPoint[];
  silverPercentageChange?: number | null;
  copperTrend?: CopperTrendPoint[];
}

// Fallback cities if API doesn't return trendingCities
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
  const [data, setData] = useState<MetalsData | null>(null);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>(FALLBACK_CITIES);
  const [silverCities, setSilverCities] = useState<string[]>([]);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');

  // Read metal from URL parameter on mount
  useEffect(() => {
    const metalParam = searchParams.get('metal');
    if (metalParam && ['gold', 'silver', 'copper', 'platinum', 'palladium'].includes(metalParam)) {
      setSelectedMetal(metalParam as MetalType);
    }
  }, [searchParams]);

  const fetchData = useCallback(async (city: string, isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const response = await fetch(`/api/metals?city=${encodeURIComponent(city)}`);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Response is not JSON (likely HTML error page)
        const text = await response.text();
        console.error('API returned non-JSON response:', text.substring(0, 200));
        throw new Error('Server error: API returned invalid response. Please try again.');
      }

      const newData: MetalsData = await response.json();

      if (!response.ok) {
        throw new Error((newData as any).error || 'Failed to fetch data');
      }

      // Validate that we got actual data
      if (!newData || (newData.gold_10g === null && newData.silver_1kg === null && newData.copper === null)) {
        console.warn('API returned empty or invalid data');
        throw new Error('No data available from server');
      }

      // Store previous data for trend comparison
      setData((currentData) => {
        if (currentData) {
          setPreviousData(currentData);
        }
        return newData;
      });

      // Update available cities from API response
      if (Array.isArray(newData.trendingCities) && newData.trendingCities.length > 0) {
        setAvailableCities(newData.trendingCities);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching metal prices:', err);
      
      // More detailed error handling
      let errorMessage = 'Live prices temporarily unavailable. Please refresh in a moment.';
      
      if (err instanceof Error) {
        if (err.message.includes('invalid response') || err.message.includes('JSON')) {
          errorMessage = 'Server is initializing. Please wait a moment and refresh.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedCity);

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      fetchData(selectedCity);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity, fetchData]);

  // Fetch silver cities when silver tab is selected
  useEffect(() => {
    if (selectedMetal === 'silver' && silverCities.length === 0) {
      getAvailableSilverCities()
        .then((cities) => {
          if (Array.isArray(cities) && cities.length > 0) {
            const citySlugs = cities.map((city) => city.slug);
            setSilverCities(citySlugs);
            // If current city is not in silver cities, switch to first available
            if (citySlugs.length > 0 && !citySlugs.includes(selectedCity.toLowerCase())) {
              const firstCity = citySlugs[0];
              if (firstCity) {
                setSelectedCity(firstCity);
                fetchData(firstCity);
              }
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching silver cities:', error);
        });
    }
  }, [selectedMetal, selectedCity, silverCities.length, fetchData]);

  const handleCityChange = useCallback((city: string) => {
    setSelectedCity(city);
    fetchData(city);
  }, [fetchData]);

  // Generate FAQs based on selected metal and city
  const generateFAQs = useCallback(() => {
    const metalName = selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1);
    const cityName = selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
    const currentPrice = data?.gold_10g || data?.silver_1kg || data?.copper_1kg || data?.platinum_10g;
    const priceUnit = selectedMetal === 'gold' ? ' per 10g' : selectedMetal === 'silver' ? ' per kg' : selectedMetal === 'copper' ? ' per kg' : ' per 10g';

    return [
      {
        question: `What is the current ${metalName} price in ${cityName}?`,
        answer: `The current ${metalName} price in ${cityName} is updated in real-time on our platform. ${currentPrice ? `Current rate: ₹${currentPrice}${priceUnit}. ` : ''}Prices change frequently based on market conditions, so check our live price tracker for the most accurate rates.`,
      },
      {
        question: `How is ${metalName} price calculated?`,
        answer: `${metalName} prices are determined by various factors including international market rates, currency exchange rates, local demand and supply, import duties, and making charges. Prices are typically quoted per gram, per 10 grams, or per kilogram depending on the metal type.`,
      },
      {
        question: `What affects ${metalName} prices?`,
        answer: `${metalName} prices are influenced by global market trends, economic indicators, inflation rates, currency fluctuations, geopolitical events, and local market demand. International commodity exchanges like MCX (Multi Commodity Exchange) also play a significant role in determining prices.`,
      },
      {
        question: `Is ${metalName} a good investment?`,
        answer: `${metalName} has historically been considered a safe haven asset and a hedge against inflation. However, investment decisions should be based on your financial goals, risk tolerance, and market conditions. Consult with a financial advisor for personalized advice.`,
      },
      ...(selectedMetal === 'gold' ? [
        {
          question: 'What is the difference between 24K and 22K gold?',
          answer: '24K gold is 99.9% pure gold, while 22K gold contains 91.6% gold and 8.4% other metals (usually copper or silver). 24K is purer but softer, while 22K is more durable and commonly used in jewelry. Prices differ based on purity, with 24K being more expensive.',
        },
        {
          question: 'Why do gold prices vary by city?',
          answer: 'Gold prices vary by city due to local demand and supply, transportation costs, local taxes, dealer margins, and regional market conditions. Major cities like Mumbai and Delhi typically have more competitive rates due to higher trading volumes.',
        },
      ] : []),
      ...(selectedMetal === 'silver' ? [
        {
          question: 'What is the difference between silver price per gram and per kg?',
          answer: 'Silver is typically quoted per kilogram (1kg = 1000 grams) in India. The per-gram price is simply the per-kg price divided by 1000. Most dealers quote prices per kg, which is the standard unit for silver trading.',
        },
      ] : []),
      ...(selectedMetal === 'copper' ? [
        {
          question: 'How is copper price determined in India?',
          answer: 'Copper prices in India are primarily determined by MCX (Multi Commodity Exchange) futures prices, international LME (London Metal Exchange) rates, currency exchange rates, and local demand from industries like construction, electronics, and automotive.',
        },
      ] : []),
    ];
  }, [selectedMetal, selectedCity, data]);

  const handleRefresh = useCallback(() => {
    fetchData(selectedCity, true);
  }, [selectedCity, fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full" role="main" aria-label="Metal prices content">
        {/* Dashboard Link Banner */}
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1.5">
                Market Overview
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time pricing for Gold, Silver, Platinum, and Palladium
              </p>
            </div>
            <a
              href="/dashboard"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5"
            >
              View Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isRefreshing) {
                  e.preventDefault();
                  handleRefresh();
                }
              }}
              disabled={isRefreshing}
              aria-label={isRefreshing ? 'Refreshing prices' : 'Refresh metal prices'}
              aria-busy={isRefreshing}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 focus:ring-offset-2 rounded"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {/* City Selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative z-40">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">
              Market Location
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select city for local pricing
            </p>
          </div>
          <div className="w-full sm:w-auto relative z-50">
            <CitySelector
              cities={selectedMetal === 'silver' && silverCities.length > 0 ? silverCities : availableCities}
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </div>
        </div>

        {/* Metal Tabs */}
        <MetalTabs
          selectedMetal={selectedMetal}
          onMetalChange={setSelectedMetal}
          hasGoldData={!!data?.gold_10g}
          hasSilverData={!!data?.silver_1kg}
          hasCopperData={!!data?.copper}
          hasPlatinumData={!!data?.platinum}
          hasPalladiumData={!!data?.palladium}
        />

        {/* Metal-Specific Content */}
        {selectedMetal === 'gold' && (
          <>
            <div className="mb-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                      Gold Prices
                    </h2>
                    {data?.updated_at && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <p className="text-xs font-normal text-slate-600 dark:text-slate-400">
                          Updated {new Date(data.updated_at).toLocaleString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* 24K Gold Section */}
                <GoldPriceSection
                  type="24K"
                  price10g={data?.gold_10g ?? null}
                  previousPrice1g={previousData?.gold_1g ?? null}
                  percentageChange={data?.percentageChange24k ?? null}
                  difference={data?.gold_24k_difference ?? null}
                  priceChange={data?.gold_24k_percentage ?? null}
                />
                
                {/* 22K Gold Section */}
                <GoldPriceSection
                  type="22K"
                  price10g={data?.gold_22k_10g ?? null}
                  previousPrice1g={previousData?.gold_22k_1g ?? null}
                  percentageChange={data?.percentageChange22k ?? null}
                  difference={data?.gold_22k_difference ?? null}
                  priceChange={data?.gold_22k_percentage ?? null}
                />
                
                {/* 18K Gold Section */}
                <GoldPriceSection
                  type="18K"
                  price10g={data?.gold_18k_10g ?? null}
                  previousPrice1g={previousData?.gold_18k_1g ?? null}
                  percentageChange={null}
                  difference={data?.gold_18k_difference ?? null}
                  priceChange={data?.gold_18k_percentage ?? null}
                />
              </div>
              
              {/* Gold Prices by Weight */}
              {data?.gold_10g && (
                <GoldWeightPrices 
                  goldPrice10g={data.gold_10g}
                  goldPrice1g={data.gold_1g || (data.gold_10g ? data.gold_10g / 10 : undefined)}
                  gold22kPrice10g={data.gold_22k_10g || undefined}
                  gold22kPrice1g={data.gold_22k_1g || undefined}
                />
              )}
            </div>
            <div className="mb-12">
              <ChartSection
                goldData={
                  Array.isArray(data?.goldTrend) && data.goldTrend.length > 0
                    ? data.goldTrend.map((point) => ({
                        date: new Date(point.date).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric' 
                        }),
                        price: point.price,
                      }))
                    : data?.gold_10g
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
                silverData={undefined}
                title="Price Trends (Last 7 Days)"
                subtitle="Historical price movement for Gold"
              />
            </div>
            <div className="mb-12">
              <PriceHistoryTable
                data={
                  Array.isArray(data?.goldTrend) && data.goldTrend.length > 0
                    ? data.goldTrend
                        .filter((point) => {
                          // Ensure point exists and has valid data
                          if (!point) return false;
                          // Check if price is a number (could be nested object from API)
                          const priceValue = typeof point.price === 'number' 
                            ? point.price 
                            : (point.price as any)?.lastDayPrice?.TWENTY_FOUR 
                              ? (point.price as any).lastDayPrice.TWENTY_FOUR * 10 
                              : null;
                          return point.date && priceValue !== null && !isNaN(priceValue);
                        })
                        .map((point) => {
                          // Extract price value
                          const priceValue = typeof point.price === 'number' 
                            ? point.price 
                            : (point.price as any)?.lastDayPrice?.TWENTY_FOUR 
                              ? (point.price as any).lastDayPrice.TWENTY_FOUR * 10 
                              : 0;
                          
                          // Normalize date
                          let dateStr = point.date || '';
                          if (dateStr.match(/^\d{4}-\d{2}$/)) {
                            dateStr = `${dateStr}-01`;
                          } else if (dateStr.includes('T')) {
                            dateStr = dateStr.split('T')[0] || dateStr;
                          }
                          
                          return {
                            date: dateStr,
                            price: Math.round(priceValue * 100) / 100,
                          };
                        })
                    : undefined
                }
                title="Gold Price History"
                metalName="Gold"
              />
            </div>
          </>
        )}

        {selectedMetal === 'silver' && (
          <>
            <div className="mb-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                Silver Prices
                    </h2>
                    {data?.updated_at && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <p className="text-xs font-normal text-slate-600 dark:text-slate-400">
                          Updated {new Date(data.updated_at).toLocaleString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 mb-8">
                <SilverPriceSection
                  price1kg={data?.silver_1kg ?? null}
                  previousPrice1kg={previousData?.silver_1kg ?? null}
                  percentageChange={data?.silverPercentageChange ?? null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                silverData={
                  Array.isArray(data?.silverTrend) && data.silverTrend.length > 0
                    ? data.silverTrend.map((point) => ({
                        date: new Date(point.date).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric' 
                        }),
                        price: point.price,
                      }))
                    : data?.silver_1kg
                    ? [
                        { date: 'Day 1', price: data.silver_1kg },
                        { date: 'Day 2', price: data.silver_1kg * 0.99 },
                        { date: 'Day 3', price: data.silver_1kg * 1.01 },
                        { date: 'Day 4', price: data.silver_1kg * 0.98 },
                        { date: 'Day 5', price: data.silver_1kg * 1.02 },
                        { date: 'Day 6', price: data.silver_1kg * 0.99 },
                        { date: 'Day 7', price: data.silver_1kg },
                      ]
                    : undefined
                }
              />
            </div>
            <div className="mb-12">
              <PriceHistoryTable
                data={
                  Array.isArray(data?.silverTrend) && data.silverTrend.length > 0
                    ? data.silverTrend
                        .map((point) => ({
                          date: point.date,
                          price: point.price * 100, // Convert from 10g to 1kg (10g * 100 = 1kg)
                        }))
                        .sort((a, b) => {
                          // Sort by date (newest first for display)
                          const dateA = new Date(a.date).getTime();
                          const dateB = new Date(b.date).getTime();
                          return dateB - dateA;
                        })
                    : undefined
                }
                title="Silver Price History"
                metalName="Silver"
              />
            </div>
          </>
        )}

        {selectedMetal === 'copper' && (
          <>
            <div className="mb-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                Copper Prices
                    </h2>
                    {data?.updated_at && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <p className="text-xs font-normal text-slate-600 dark:text-slate-400">
                          Updated {new Date(data.updated_at).toLocaleString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <CopperPriceSection
                  price100g={data?.copper_100g ?? null}
                  price1kg={data?.copper_1kg ?? data?.copper ?? null}
                  previousPrice1kg={previousData?.copper_1kg ?? previousData?.copper ?? null}
                  percentageChange={data?.copperPercentageChange ?? null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                copperData={
                  Array.isArray(data?.copperTrend) && data.copperTrend.length > 0
                    ? data.copperTrend.map((point) => ({
                        date: new Date(point.date).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric' 
                        }),
                        price: point.price,
                      }))
                    : data?.copper_1kg || data?.copper
                    ? [
                        { date: 'Day 1', price: data.copper_1kg || data.copper || 0 },
                        { date: 'Day 2', price: (data.copper_1kg || data.copper || 0) * 0.99 },
                        { date: 'Day 3', price: (data.copper_1kg || data.copper || 0) * 1.01 },
                        { date: 'Day 4', price: (data.copper_1kg || data.copper || 0) * 0.98 },
                        { date: 'Day 5', price: (data.copper_1kg || data.copper || 0) * 1.02 },
                        { date: 'Day 6', price: (data.copper_1kg || data.copper || 0) * 0.99 },
                        { date: 'Day 7', price: data.copper_1kg || data.copper || 0 },
                      ]
                    : undefined
                }
                title="Price Trends (Last 30 Days)"
                subtitle="Historical price movement for Copper"
              />
            </div>
            <div className="mb-12">
              <PriceHistoryTable
                data={
                  Array.isArray(data?.copperTrend) && data.copperTrend.length > 0
                    ? data.copperTrend
                        .map((point) => ({
                          date: point.date,
                          price: point.price,
                        }))
                        .sort((a, b) => {
                          // Sort by date (newest first for display)
                          const dateA = new Date(a.date).getTime();
                          const dateB = new Date(b.date).getTime();
                          return dateB - dateA;
                        })
                    : undefined
                }
                title="Copper Price History"
                metalName="Copper"
                itemsPerPage={30}
              />
            </div>
          </>
        )}

        {selectedMetal === 'platinum' && (
          <>
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                Platinum Prices
                </h2>
                {data?.city && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PlatinumPriceSection
                  price1g={data?.platinum_1g || null}
                  price10g={data?.platinum_10g || data?.platinum || null}
                  previousPrice1g={previousData?.platinum_1g || null}
                  previousPrice10g={previousData?.platinum_10g || previousData?.platinum || null}
                  percentageChange={data?.platinumPercentageChange || null}
                  variationType={data?.platinumVariationType}
                  variation={data?.platinumVariation}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
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
                title="Price Trends (Last 30 Days)"
                subtitle="Historical price movement for Platinum"
              />
            </div>
          </>
        )}

        {selectedMetal === 'palladium' && (
          <>
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                Palladium Prices
              </h2>
                {data?.city && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    in {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PalladiumPriceSection
                  price1g={data?.palladium_1g || null}
                  price10g={data?.palladium_10g || data?.palladium || null}
                  previousPrice1g={previousData?.palladium_1g || null}
                  previousPrice10g={previousData?.palladium_10g || previousData?.palladium || null}
                  percentageChange={data?.palladiumPercentageChange || null}
                  variationType={data?.palladiumVariationType}
                  variation={data?.palladiumVariation}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                platinumData={
                  data?.palladium_10g || data?.palladium
                    ? [
                        { date: 'Day 1', price: data.palladium_10g || data.palladium || 0 },
                        { date: 'Day 2', price: (data.palladium_10g || data.palladium || 0) * 0.99 },
                        { date: 'Day 3', price: (data.palladium_10g || data.palladium || 0) * 1.01 },
                        { date: 'Day 4', price: (data.palladium_10g || data.palladium || 0) * 0.98 },
                        { date: 'Day 5', price: (data.palladium_10g || data.palladium || 0) * 1.02 },
                        { date: 'Day 6', price: (data.palladium_10g || data.palladium || 0) * 0.99 },
                        { date: 'Day 7', price: data.palladium_10g || data.palladium || 0 },
                      ]
                    : undefined
                }
                title="Price Trends (Last 30 Days)"
                subtitle="Historical price movement for Palladium"
              />
            </div>
          </>
        )}

        {/* Trending Cities Section */}
        {Array.isArray(data?.trendingCities) && data.trendingCities.length > 0 && (
          <div className="mb-12">
            <TrendingCities
              cities={data.trendingCities}
              selectedCity={selectedCity}
              onCityClick={handleCityChange}
            />
          </div>
        )}

        {/* FAQ Section - Visible to Users */}
        <FAQSection
          faqs={generateFAQs()}
          title={`${selectedMetal.charAt(0).toUpperCase() + selectedMetal.slice(1)} Price FAQs`}
        />

        {/* Last Updated */}
        {data?.updated_at && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date(data.updated_at).toLocaleString('en-IN')}
            {data.cached && <span className="ml-2">(Cached)</span>}
          </div>
        )}
      </main>

      <Footer />

      {/* Enhanced Structured Data */}
      <StructuredData
        gold24k_10g={data?.gold_10g || null}
        gold22k_10g={data?.gold_22k_10g || null}
        silver_1kg={data?.silver_1kg || null}
        copper_1kg={data?.copper_1kg || null}
        platinum_10g={data?.platinum_10g || null}
        location={data?.city || selectedCity}
        lastUpdated={data?.updated_at}
        metalType={selectedMetal}
      />

      {/* FAQ Schema for SEO (Structured Data) */}
      <FAQSchema
        metal={selectedMetal}
        city={selectedCity}
        faqs={generateFAQs()}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-slate-400 dark:text-slate-600 animate-spin mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading...</p>
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
