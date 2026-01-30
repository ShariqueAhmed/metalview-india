import { NextResponse } from 'next/server';
import { fetchGrowwGoldPrices } from '@/utils/growwScraper';
import SimpleCache from '@/utils/cache';
import { storePrice } from '@/utils/historicalStorage';

// In-memory cache with 10-minute TTL
// Using a Map to store city-specific caches
const cityCaches = new Map<string, SimpleCache<any>>();

function getCityCache(city: string): SimpleCache<any> {
  if (!cityCaches.has(city)) {
    cityCaches.set(city, new SimpleCache<any>(10));
  }
  return cityCaches.get(city)!;
}

export interface MetalsApiResponse {
  gold_10g: number; // 24k gold per 10 grams
  gold_1g?: number; // 24k gold per 1 gram (base price from API)
  gold_22k_10g?: number; // 22k gold per 10 grams
  gold_22k_1g?: number; // 22k gold per 1 gram
  silver_1kg: number | null;
  copper_ton: number | null;
  aluminium_ton: number | null;
  zinc_ton: number | null;
  updated_at: string;
  cached?: boolean;
  source?: string;
  trendingCities?: string[];
  city?: string;
  location?: string;
  goldTrend?: any; // Historical trend data from API
}

export async function GET(request: Request) {
  // Get city parameter from query string
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'delhi';
  
  try {
    // Get city-specific cache
    const cache = getCityCache(city);
    
    // Check cache first
    const cachedData = cache.get();
    if (cache.isValid() && cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
      });
    }

    // Fetch gold prices from Groww.in (only data source)
    let growwData;
    try {
      growwData = await fetchGrowwGoldPrices(city);
      console.log(`Successfully fetched gold price from Groww for ${city}:`, `1gm: ₹${growwData.gold_24k_1g}, 10gm: ₹${growwData.gold_24k_10g}`);
    } catch (error) {
      console.error('Groww scraper failed:', error);
      throw error;
    }
    
    // API returns 1gm prices, we calculate 10gm for display
    const gold_10g = growwData.gold_24k_10g; // Calculated: 1gm price × 10
    const gold_1g = growwData.gold_24k_1g; // Base 1gm price from API
    const gold_22k_10g = growwData.gold_22k_10g; // 22k gold per 10 grams
    const gold_22k_1g = growwData.gold_22k_1g; // 22k gold per 1 gram

    // Silver and industrial metals are not available from Groww
    // Set them to null as per requirements
    const silver_1kg = null;
    const copper_ton = null;
    const aluminium_ton = null;
    const zinc_ton = null;

    const responseData: MetalsApiResponse = {
      gold_10g: Math.round(gold_10g * 100) / 100,
      gold_1g: Math.round(gold_1g * 100) / 100, // Base 1gm price from API
      gold_22k_10g: Math.round(gold_22k_10g * 100) / 100,
      gold_22k_1g: Math.round(gold_22k_1g * 100) / 100,
      silver_1kg: null,
      copper_ton: null,
      aluminium_ton: null,
      zinc_ton: null,
      updated_at: new Date().toISOString(),
      source: 'groww',
      trendingCities: growwData.trendingCities || [],
      city: city,
      location: growwData.location,
      goldTrend: growwData.goldTrend,
    };

    // Store historical data for charts
    storePrice(responseData.gold_10g);

    // Update cache
    cache.set(responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching metal prices:', errorMessage);
    console.error('Full error:', error);
    
    // Return cached data if available, even if expired
    const cityCache = getCityCache(city);
    const cachedData = cityCache.get();
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        error: 'Live prices temporarily unavailable. Using cached data.',
      });
    }

    // No cache available, return error with details (in development)
    return NextResponse.json(
      {
        error: 'Live prices temporarily unavailable. Please refresh in a moment.',
        errorDetails: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        gold_10g: null,
        silver_1kg: null,
        copper_ton: null,
        aluminium_ton: null,
        zinc_ton: null,
        updated_at: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
