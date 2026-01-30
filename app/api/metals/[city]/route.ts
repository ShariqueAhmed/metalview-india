/**
 * API Route: /api/metals/[city]
 * Fetches metal prices for a specific city
 * Uses in-memory caching with 10-minute TTL
 */

import { NextResponse } from 'next/server';
import { fetchGrowwMetalPrices, GoldTrendPoint } from '@/utils/growwFetcher';
import { getCityCache } from '@/utils/cache';

export interface MetalsApiResponse {
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
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[];
}

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

    // Fetch fresh data from Groww API
    const growwData = await fetchGrowwMetalPrices(city);

      const responseData: MetalsApiResponse = {
        city: growwData.city || city,
        gold_10g: growwData.gold_10g,
        gold_22k_10g: growwData.gold_22k_10g,
        gold_1g: growwData.gold_1g,
        gold_22k_1g: growwData.gold_22k_1g,
        silver_1kg: growwData.silver_1kg,
        copper: growwData.copper,
        platinum: growwData.platinum,
        updated_at: growwData.updated_at,
        cached: false,
        trendingCities: growwData.trendingCities || [],
        goldTrend: growwData.goldTrend,
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
