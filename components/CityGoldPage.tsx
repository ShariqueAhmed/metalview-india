'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import GoldPriceSection from '@/components/GoldPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { ArrowLeft } from 'lucide-react';

interface CityGoldPageProps {
  cityName: string;
}

interface MetalsData {
  gold_10g: number | null;
  gold_1g?: number | null;
  gold_22k_10g?: number | null;
  gold_22k_1g?: number | null;
  updated_at: string;
  location?: string;
  goldTrend?: any;
}

export default function CityGoldPage({ cityName }: CityGoldPageProps) {
  const router = useRouter();
  const [data, setData] = useState<MetalsData | null>(null);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/metals?city=${encodeURIComponent(cityName)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const newData: MetalsData = await response.json();
        
        if (data) {
          setPreviousData(data);
        }
        
        setData(newData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  const formatCityName = (city: string) => {
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <StructuredData
        gold24k_1g={data?.gold_1g}
        gold24k_10g={data?.gold_10g}
        gold22k_1g={data?.gold_22k_1g}
        gold22k_10g={data?.gold_22k_10g}
        location={data?.location || cityName}
        lastUpdated={data?.updated_at}
      />
      <div className="min-h-screen flex flex-col">
        <Header lastUpdated={data?.updated_at} />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          {isLoading && (
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/60 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          {data && !isLoading && (
            <>
              <GoldPriceSection
                gold24k_10g={data.gold_10g || null}
                gold24k_1g={data.gold_1g}
                gold22k_10g={data.gold_22k_10g}
                gold22k_1g={data.gold_22k_1g}
                location={data.location || formatCityName(cityName)}
                lastUpdated={data.updated_at}
              />

              {data.gold_10g && (
                <GoldWeightPrices 
                  goldPrice10g={data.gold_10g} 
                  goldPrice1g={data.gold_1g}
                  gold22kPrice10g={data.gold_22k_10g}
                  gold22kPrice1g={data.gold_22k_1g}
                />
              )}

              <ChartSection
                goldPrice={data.gold_10g || undefined}
                goldTrend={data.goldTrend}
                location={data.location || cityName}
              />
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
