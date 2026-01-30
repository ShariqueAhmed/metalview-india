'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PriceGrid from '@/components/PriceGrid';
import ChartSection from '@/components/ChartSection';
import TrendingCities from '@/components/TrendingCities';
import CitySelector from '@/components/CitySelector';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import GoldPriceSection from '@/components/GoldPriceSection';
import MetalTabs, { MetalType } from '@/components/MetalTabs';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface MetalsData {
  gold_10g: number | null;
  gold_1g?: number | null; // Price per 1 gram (base price from API)
  gold_22k_10g?: number | null;
  gold_22k_1g?: number | null;
  silver_1kg: number | null;
  copper_ton: number | null;
  aluminium_ton: number | null;
  zinc_ton: number | null;
  usd_inr: number | null;
  updated_at: string;
  cached?: boolean;
  source?: string;
  error?: string;
  trendingCities?: string[];
  city?: string;
  location?: string;
  goldTrend?: any; // Historical trend data
}

export default function Home() {
  const [data, setData] = useState<MetalsData | null>(null);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('delhi');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');

  const fetchData = async (isManualRefresh = false, city?: string) => {
    const cityToFetch = city || selectedCity;
    
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(`/api/metals?city=${encodeURIComponent(cityToFetch)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const newData: MetalsData = await response.json();
      
      // Store previous data for comparison
      if (data) {
        setPreviousData(data);
      }
      
      setData(newData);
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
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    fetchData(false, city);
  };

  // Format location to title case (e.g., "delhi" -> "Delhi", "navi mumbai" -> "Navi Mumbai")
  const formatLocation = (location: string): string => {
    return location
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      fetchData(false, selectedCity);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <>
      <StructuredData
        gold24k_1g={data?.gold_1g}
        gold24k_10g={data?.gold_10g}
        gold22k_1g={data?.gold_22k_1g}
        gold22k_10g={data?.gold_22k_10g}
        location={data?.location}
        lastUpdated={data?.updated_at}
      />
      <div className="min-h-screen flex flex-col">
        <Header lastUpdated={data?.updated_at} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/60 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {error}
              </p>
            </div>
            <button
              onClick={() => fetchData(true)}
              disabled={isRefreshing}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            </button>
          </div>
        )}

        {/* City Selector */}
        <div className="mb-6">
          {data?.trendingCities && data.trendingCities.length > 0 ? (
            <CitySelector
              cities={data.trendingCities}
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
              currentLocation={data.location}
            />
          ) : (
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 inline-block">
              Loading cities...
            </div>
          )}
        </div>

        {/* Metal Tabs */}
        <MetalTabs
          selectedMetal={selectedMetal}
          onMetalChange={setSelectedMetal}
          hasGoldData={!!data?.gold_10g}
          hasSilverData={!!data?.silver_1kg}
        />

        {/* Gold Section */}
        {selectedMetal === 'gold' && (
          <>
            {/* Gold Price Section - Enhanced */}
            <div className="mb-12">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ) : (
                <GoldPriceSection
                  gold24k_10g={data?.gold_10g || null}
                  gold24k_1g={data?.gold_1g || undefined}
                  gold22k_10g={data?.gold_22k_10g || undefined}
                  gold22k_1g={data?.gold_22k_1g || undefined}
                  previousGold24k_10g={previousData?.gold_10g || undefined}
                  previousGold24k_1g={previousData?.gold_1g || undefined}
                  previousGold22k_10g={previousData?.gold_22k_10g || undefined}
                  previousGold22k_1g={previousData?.gold_22k_1g || undefined}
                  location={data?.location}
                  lastUpdated={data?.updated_at}
                />
              )}
            </div>

            {/* Gold Weight Prices Section */}
            {data?.gold_10g && (
              <div className="mb-12">
                <GoldWeightPrices 
                  goldPrice10g={data.gold_10g} 
                  goldPrice1g={data.gold_1g || undefined}
                  gold22kPrice10g={data.gold_22k_10g || undefined}
                  gold22kPrice1g={data.gold_22k_1g || undefined}
                />
              </div>
            )}

            {/* Charts Section - Gold */}
            <div className="mb-12">
              <ChartSection
                goldPrice={data?.gold_10g || undefined}
                silverPrice={undefined}
                goldTrend={data?.goldTrend}
                location={data?.location}
              />
            </div>
          </>
        )}

        {/* Silver Section */}
        {selectedMetal === 'silver' && (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Silver Prices
                </h2>
                {data?.location && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Location: <span className="font-medium text-gray-900 dark:text-white">{formatLocation(data.location)}</span>
                  </p>
                )}
              </div>
              <PriceGrid
                data={data}
                previousData={previousData}
                isLoading={isLoading}
                showOnly="silver"
              />
            </div>

            {/* Charts Section - Silver */}
            <div className="mb-12">
              <ChartSection
                goldPrice={undefined}
                silverPrice={data?.silver_1kg || undefined}
              />
            </div>
          </>
        )}

        {/* Copper, Aluminium, Zinc Sections */}
        {selectedMetal === 'copper' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Copper Prices
              </h2>
            </div>
            <PriceGrid
              data={data}
              previousData={previousData}
              isLoading={isLoading}
              showOnly="copper"
            />
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300">
                ⚠️ Copper prices are not available from the current data source. This feature will be available soon.
              </p>
            </div>
          </div>
        )}

        {selectedMetal === 'aluminium' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Aluminium Prices
              </h2>
            </div>
            <PriceGrid
              data={data}
              previousData={previousData}
              isLoading={isLoading}
              showOnly="aluminium"
            />
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300">
                ⚠️ Aluminium prices are not available from the current data source. This feature will be available soon.
              </p>
            </div>
          </div>
        )}

        {selectedMetal === 'zinc' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Zinc Prices
              </h2>
            </div>
            <PriceGrid
              data={data}
              previousData={previousData}
              isLoading={isLoading}
              showOnly="zinc"
            />
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300">
                ⚠️ Zinc prices are not available from the current data source. This feature will be available soon.
              </p>
            </div>
          </div>
        )}

        {/* Trending Cities Section - Show for all metals */}
        {data?.trendingCities && data.trendingCities.length > 0 && (
          <div className="mb-12">
            <TrendingCities 
              cities={data.trendingCities} 
              onCityClick={handleCityChange}
              selectedCity={selectedCity}
            />
          </div>
        )}
      </main>

        <Footer />
      </div>
    </>
  );
}
