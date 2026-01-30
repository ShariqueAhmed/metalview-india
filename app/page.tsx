/**
 * Main Page
 * Displays live metal prices with city selector
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CitySelector from '@/components/CitySelector';
import PriceGrid from '@/components/PriceGrid';
import ChartSection from '@/components/ChartSection';
import MetalTabs, { MetalType } from '@/components/MetalTabs';
import MetalCard from '@/components/MetalCard';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import TrendingCities from '@/components/TrendingCities';
import Footer from '@/components/Footer';
import { AlertCircle, RefreshCw, Coins, DollarSign, Zap, Gem } from 'lucide-react';

interface GoldTrendPoint {
  date: string;
  price: number;
}

interface MetalsData {
  city: string;
  gold_10g: number | null;
  gold_22k_10g: number | null;
  gold_1g: number | null;
  gold_22k_1g: number | null;
  silver_1kg: number | null;
  copper: number | null;
  platinum: number | null;
  updated_at: string;
  cached: boolean;
  error?: string;
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[];
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
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Live prices temporarily unavailable. Please refresh in a moment.';
      setError(errorMessage);
      console.error('Error fetching metal prices:', err);
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

  const handleCityChange = useCallback((city: string) => {
    setSelectedCity(city);
    fetchData(city);
  }, [fetchData]);

  const handleRefresh = useCallback(() => {
    fetchData(selectedCity, true);
  }, [selectedCity, fetchData]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {/* City Selector */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Select Location
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose your city to view local prices
            </p>
          </div>
          <CitySelector
            cities={availableCities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
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
            <div className="mb-12">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-12 bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-600 rounded-full shadow-lg"></div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                      Gold Prices
                      {data?.city && (
                        <span className="text-2xl font-semibold text-amber-600 dark:text-amber-400 ml-3">
                          in {data.city}
                        </span>
                      )}
                    </h2>
                    {data?.updated_at && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
                <div className="ml-6 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    View real-time gold prices for 24K (pure gold) and 22K (jewelry grade) in different weights. 
                    Prices are updated live from market data.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetalCard
                  name="Gold (24K)"
                  price={data?.gold_1g || null}
                  unit="1g"
                  icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  previousPrice={previousData?.gold_1g || null}
                />
                <MetalCard
                  name="Gold (24K)"
                  price={data?.gold_10g || null}
                  unit="10g"
                  icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  previousPrice={previousData?.gold_10g || null}
                />
                {data?.gold_22k_1g && (
                  <MetalCard
                    name="Gold (22K)"
                    price={data.gold_22k_1g}
                    unit="1g"
                    icon={<Coins className="w-5 h-5 text-amber-500 dark:text-amber-500" />}
                    previousPrice={previousData?.gold_22k_1g || null}
                  />
                )}
                {data?.gold_22k_10g && (
                  <MetalCard
                    name="Gold (22K)"
                    price={data.gold_22k_10g}
                    unit="10g"
                    icon={<Coins className="w-5 h-5 text-amber-500 dark:text-amber-500" />}
                    previousPrice={previousData?.gold_22k_10g || null}
                  />
                )}
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
          </>
        )}

        {selectedMetal === 'silver' && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Silver Prices
                {data?.city && (
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                    in {data.city}
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetalCard
                  name="Silver"
                  price={data?.silver_1kg || null}
                  unit="1kg"
                  icon={<DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                  previousPrice={previousData?.silver_1kg || null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                silverData={
                  data?.silver_1kg
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
          </>
        )}

        {selectedMetal === 'copper' && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Copper Prices
                {data?.city && (
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                    in {data.city}
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetalCard
                  name="Copper"
                  price={data?.copper || null}
                  unit="kg"
                  icon={<Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  previousPrice={previousData?.copper || null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                goldData={
                  data?.copper
                    ? [
                        { date: 'Day 1', price: data.copper },
                        { date: 'Day 2', price: data.copper * 0.99 },
                        { date: 'Day 3', price: data.copper * 1.01 },
                        { date: 'Day 4', price: data.copper * 0.98 },
                        { date: 'Day 5', price: data.copper * 1.02 },
                        { date: 'Day 6', price: data.copper * 0.99 },
                        { date: 'Day 7', price: data.copper },
                      ]
                    : undefined
                }
              />
            </div>
          </>
        )}

        {selectedMetal === 'platinum' && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Platinum Prices
                {data?.city && (
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                    in {data.city}
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetalCard
                  name="Platinum"
                  price={data?.platinum || null}
                  unit="gram"
                  icon={<Gem className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  previousPrice={previousData?.platinum || null}
                />
              </div>
            </div>
            <div className="mb-12">
              <ChartSection
                goldData={
                  data?.platinum
                    ? [
                        { date: 'Day 1', price: data.platinum },
                        { date: 'Day 2', price: data.platinum * 0.99 },
                        { date: 'Day 3', price: data.platinum * 1.01 },
                        { date: 'Day 4', price: data.platinum * 0.98 },
                        { date: 'Day 5', price: data.platinum * 1.02 },
                        { date: 'Day 6', price: data.platinum * 0.99 },
                        { date: 'Day 7', price: data.platinum },
                      ]
                    : undefined
                }
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
