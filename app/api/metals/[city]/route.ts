/**
 * API Route: /api/metals/[city]
 * Fetches metal prices for a specific city
 * Uses in-memory caching with 10-minute TTL
 */

import { NextResponse } from 'next/server';
import { fetchGrowwMetalPrices, GoldTrendPoint } from '@/utils/growwFetcher';
import { fetchSilverPrices, SilverTrendPoint } from '@/utils/silverFetcher';
import { fetchCopperPrices, CopperTrendPoint } from '@/utils/copperFetcher';
import { fetchAllMetalPrices } from '@/utils/ebullionFetcher';
import { getCityCache } from '@/utils/cache';
import { storePrice, getHistoricalPrices } from '@/utils/historicalStorage';

export interface MetalsApiResponse {
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
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[];
  percentageChange24k?: number | null;
  percentageChange22k?: number | null;
  silverTrend?: SilverTrendPoint[];
  silverPercentageChange?: number | null;
  copperTrend?: CopperTrendPoint[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ city: string }> }
) {
  try {
    const { city: cityParam } = await params;
    const city = cityParam || 'mumbai';

    // Get city-specific cache
    const cache = getCityCache<MetalsApiResponse>(city);

    // Check cache first
    const cachedData = cache.get();
    if (cache.isValid() && cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
      });
    }

    // Fetch fresh data from Groww API (for gold)
    const growwData = await fetchGrowwMetalPrices(city);

    // Fetch silver prices from AngelOne API
    let silverData;
    try {
      silverData = await fetchSilverPrices(city);
    } catch (error) {
      console.error('Error fetching silver prices:', error);
      silverData = {
        silver_1kg: null,
        silver_10g: null,
        silver_1g: null,
        updated_at: new Date().toISOString(),
      };
    }

    // Fetch copper prices from MoneyControl API
    let copperData;
    try {
      copperData = await fetchCopperPrices();
    } catch (error) {
      console.error('Error fetching copper prices:', error);
      copperData = {
        copper_1kg: null,
        copper_100g: null,
        copper_10g: null,
        copper_1g: null,
        updated_at: new Date().toISOString(),
      };
    }

    // Fetch all metal prices from Ebullion API (for platinum)
    let ebullionData;
    try {
      ebullionData = await fetchAllMetalPrices();
    } catch (error) {
      console.error('Error fetching Ebullion metal prices:', error);
      ebullionData = null;
    }

    // Store current price in historical storage for fallback
    if (growwData.gold_10g) {
      storePrice(growwData.gold_10g);
    }

    // Use historical storage as fallback if goldTrend is empty
    let goldTrend: GoldTrendPoint[] | undefined = growwData.goldTrend;
    
    if (!goldTrend || goldTrend.length === 0) {
      // Fallback to historical storage data
      const historicalData = getHistoricalPrices(30);
      if (historicalData.length > 0) {
        goldTrend = historicalData.map((item) => ({
          date: item.date,
          price: item.gold_10g,
        }));
        console.log(`Using historical storage data: ${goldTrend.length} points`);
      } else {
        console.warn('No gold trend data available from API or historical storage');
      }
    } else {
      console.log(`Using API gold trend data: ${goldTrend.length} points`);
    }

    const responseData: MetalsApiResponse = {
      city: growwData.city || city,
      gold_10g: growwData.gold_10g,
      gold_22k_10g: growwData.gold_22k_10g,
      gold_1g: growwData.gold_1g,
      gold_22k_1g: growwData.gold_22k_1g,
      silver_1kg: silverData.silver_1kg || growwData.silver_1kg,
      silver_10g: silverData.silver_10g || null,
      silver_1g: silverData.silver_1g || null,
      copper: copperData.copper_1kg || growwData.copper,
      copper_1kg: copperData.copper_1kg || null,
      copper_100g: copperData.copper_100g || null,
      copper_10g: copperData.copper_10g || null,
      copper_1g: copperData.copper_1g || null,
      copperPercentageChange: copperData.percentageChange || null,
      copperTrend: copperData.copperTrend,
      platinum: ebullionData?.platinum?.rate || growwData.platinum || null,
      platinum_10g: ebullionData?.platinum?.rate || null,
      platinum_1g: ebullionData?.platinum?.rate ? ebullionData.platinum.rate / 10 : null,
      platinumPercentageChange: ebullionData?.platinum?.rate && ebullionData.platinum.variation
        ? (parseFloat(ebullionData.platinum.variation) / (ebullionData.platinum.rate - parseFloat(ebullionData.platinum.variation))) * 100
        : null,
      platinumVariationType: ebullionData?.platinum?.variationType,
      platinumVariation: ebullionData?.platinum?.variation,
      updated_at: growwData.updated_at,
      cached: false,
      trendingCities: growwData.trendingCities || [],
      goldTrend: goldTrend,
      percentageChange24k: growwData.percentageChange24k,
      percentageChange22k: growwData.percentageChange22k,
      silverTrend: silverData.silverTrend,
      silverPercentageChange: silverData.percentageChange,
    };

    // Store in cache
    cache.set(responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching metal prices:', error);

    // Try to return cached data even if expired
    const { city: cityParam } = await params;
    const city = cityParam || 'mumbai';
    const cache = getCityCache<MetalsApiResponse>(city);
    const cachedData = cache.get();

    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        error: 'Live prices temporarily unavailable. Using cached data.',
      });
    }

    // No cache available, return error
    return NextResponse.json(
      {
        error: 'Live prices temporarily unavailable. Please try again later.',
        city: cityParam || 'mumbai',
        gold_10g: null,
        gold_22k_10g: null,
        gold_1g: null,
        gold_22k_1g: null,
        silver_1kg: null,
        copper: null,
        platinum: null,
        updated_at: new Date().toISOString(),
        cached: false,
        trendingCities: [],
      },
      { status: 503 }
    );
  }
}
