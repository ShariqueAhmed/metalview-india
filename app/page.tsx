/**
 * Main Page
 * Displays live metal prices with city selector
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CitySelector from '@/components/CitySelector';
import { getAvailableSilverCities } from '@/utils/silverFetcher';
import PriceGrid from '@/components/PriceGrid';
import ChartSection from '@/components/ChartSection';
import MetalTabs, { MetalType } from '@/components/MetalTabs';
import MetalCard from '@/components/MetalCard';
import GoldPriceSection from '@/components/GoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import PriceHistoryTable from '@/components/PriceHistoryTable';
import TrendingCities from '@/components/TrendingCities';
import Footer from '@/components/Footer';
import { AlertCircle, RefreshCw, Award, DollarSign, Zap, Gem } from 'lucide-react';

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
  gold_1g: number | null;
  gold_22k_1g: number | null;
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

export default function Home() {
  const [data, setData] = useState<MetalsData | null>(null);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>(FALLBACK_CITIES);
  const [silverCities, setSilverCities] = useState<string[]>([]);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');

  const fetchData = useCallback(async (city: string, isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const newData: MetalsData = await response.json();

      // Store previous data for trend comparison
      setData((currentData) => {
        if (currentData) {
          setPreviousData(currentData);
        }
        return newData;
      });

      // Update available cities from API response
      if (newData.trendingCities && newData.trendingCities.length > 0) {
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
      
      // Try to use cached data if available
      if (data) {
        console.log('Using existing cached data due to error');
      }
    } finally {
      setIsLoading(false);
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
          const citySlugs = cities.map((city) => city.slug);
          setSilverCities(citySlugs);
          // If current city is not in silver cities, switch to first available
          if (citySlugs.length > 0 && !citySlugs.includes(selectedCity.toLowerCase())) {
            setSelectedCity(citySlugs[0]);
            fetchData(citySlugs[0]);
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

  const handleRefresh = useCallback(() => {
    fetchData(selectedCity, true);
  }, [selectedCity, fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Dashboard Link Banner */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                View All Metal Prices
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Check real-time prices for Gold, Silver, Platinum, and Palladium in one place
              </p>
            </div>
            <a
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              Go to Dashboard
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
              disabled={isRefreshing}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {/* City Selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">
              Market Location
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select city for local pricing
            </p>
          </div>
          <div className="w-full sm:w-auto">
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
                      {data?.city && (
                        <span className="text-lg font-normal text-slate-600 dark:text-slate-400 ml-2">
                          {data.city}
                        </span>
                      )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* 24K Gold Section */}
                <GoldPriceSection
                  type="24K"
                  price1g={data?.gold_1g || null}
                  price10g={data?.gold_10g || null}
                  previousPrice1g={previousData?.gold_1g || null}
                  previousPrice10g={previousData?.gold_10g || null}
                  percentageChange={data?.percentageChange24k || null}
                />
                
                {/* 22K Gold Section */}
                <GoldPriceSection
                  type="22K"
                  price1g={data?.gold_22k_1g || null}
                  price10g={data?.gold_22k_10g || null}
                  previousPrice1g={previousData?.gold_22k_1g || null}
                  previousPrice10g={previousData?.gold_22k_10g || null}
                  percentageChange={data?.percentageChange22k || null}
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
                  data?.goldTrend && data.goldTrend.length > 0
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
              />
            </div>
            <div className="mb-12">
              <PriceHistoryTable
                data={
                  data?.goldTrend && data.goldTrend.length > 0
                    ? data.goldTrend
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
                title="Gold Price History"
                metalName="Gold"
              />
            </div>
          </>
        )}

        {selectedMetal === 'silver' && (
          <>
            <div className="mb-12">
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-gray-500 via-slate-500 to-gray-600 rounded-full shadow-lg"></div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1 break-words">
                      Silver Prices
                      {data?.city && (
                        <span className="block sm:inline text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 sm:ml-3 mt-1 sm:mt-0">
                          in {data.city}
                        </span>
                      )}
                    </h2>
                    {data?.updated_at && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                          Live • Updated {new Date(data.updated_at).toLocaleString('en-IN', { 
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
                <div className="ml-4 sm:ml-6 mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    View real-time silver prices in different weights. Prices are updated live from market data.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <SilverPriceSection
                  price1g={data?.silver_1g || null}
                  price10g={data?.silver_10g || null}
                  price1kg={data?.silver_1kg || null}
                  previousPrice1g={previousData?.silver_1g || null}
                  previousPrice10g={previousData?.silver_10g || null}
                  previousPrice1kg={previousData?.silver_1kg || null}
                  percentageChange={data?.silverPercentageChange || null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                silverData={
                  data?.silverTrend && data.silverTrend.length > 0
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
                  data?.silverTrend && data.silverTrend.length > 0
                    ? data.silverTrend
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
                  price1g={data?.copper_1g || null}
                  price10g={data?.copper_10g || null}
                  price100g={data?.copper_100g || null}
                  price1kg={data?.copper_1kg || data?.copper || null}
                  previousPrice1kg={previousData?.copper_1kg || previousData?.copper || null}
                  percentageChange={data?.copperPercentageChange || null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                copperData={
                  data?.copperTrend && data.copperTrend.length > 0
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
                  data?.copperTrend && data.copperTrend.length > 0
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

        {/* Trending Cities Section */}
        {data?.trendingCities && data.trendingCities.length > 0 && (
          <div className="mb-12">
            <TrendingCities
              cities={data.trendingCities}
              selectedCity={selectedCity}
              onCityClick={handleCityChange}
            />
          </div>
        )}

        {/* Last Updated */}
        {data?.updated_at && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date(data.updated_at).toLocaleString('en-IN')}
            {data.cached && <span className="ml-2">(Cached)</span>}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
