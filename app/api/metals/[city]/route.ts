/**
 * API Route: /api/metals/[city]
 * Fetches metal prices for a specific city
 * Uses in-memory caching with 10-minute TTL
 */

import { NextResponse } from 'next/server';
import { GoldTrendPoint } from '@/utils/growwFetcher';
import { fetchAngelOneGoldPrices, fetchAngelOneGoldHistory, getGoldCityList } from '@/utils/angeloneGoldFetcher';
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
  gold_18k_1g?: number | null;
  gold_18k_10g?: number | null;
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
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[];
  goldTrend18k?: GoldTrendPoint[];
  goldTrend22k?: GoldTrendPoint[];
  goldTrend24k?: GoldTrendPoint[];
  percentageChange24k?: number | null;
  percentageChange22k?: number | null;
  silverTrend?: SilverTrendPoint[];
  silverPercentageChange?: number | null;
  copperTrend?: CopperTrendPoint[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _request: Request,
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

    // Fetch today's gold prices from AngelOne API (for 18k, 22k, 24k)
    let angelOneGoldData;
    try {
      angelOneGoldData = await fetchAngelOneGoldPrices(city);
    } catch (error) {
      console.error('Error fetching AngelOne gold prices:', error);
      throw error; // Gold is required, throw if failed
    }

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

    // Fetch gold price history from AngelOne API for all carats
    let goldTrend: GoldTrendPoint[] | undefined = undefined;
    let goldTrend18k: GoldTrendPoint[] | undefined = undefined;
    let goldTrend22k: GoldTrendPoint[] | undefined = undefined;
    let goldTrend24k: GoldTrendPoint[] | undefined = undefined;
    
    try {
      // Fetch all carat histories in parallel
      const [trend18k, trend22k, trend24k] = await Promise.allSettled([
        fetchAngelOneGoldHistory(city, '18k'),
        fetchAngelOneGoldHistory(city, '22k'),
        fetchAngelOneGoldHistory(city, '24k'),
      ]);

      // Process 18k history
      if (trend18k.status === 'fulfilled') {
        goldTrend18k = trend18k.value;
        if (goldTrend18k.length > 0 && angelOneGoldData?.gold_18k_10g) {
          const todayDate = new Date().toISOString().split('T')[0] || '';
          const todayInHistory = goldTrend18k.find((item) => item.date === todayDate);
          if (!todayInHistory) {
            goldTrend18k.push({ date: todayDate, price: angelOneGoldData.gold_18k_10g });
            goldTrend18k.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          }
        }
      }

      // Process 22k history
      if (trend22k.status === 'fulfilled') {
        goldTrend22k = trend22k.value;
        if (goldTrend22k.length > 0 && angelOneGoldData?.gold_22k_10g) {
          const todayDate = new Date().toISOString().split('T')[0] || '';
          const todayInHistory = goldTrend22k.find((item) => item.date === todayDate);
          if (!todayInHistory) {
            goldTrend22k.push({ date: todayDate, price: angelOneGoldData.gold_22k_10g });
            goldTrend22k.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          }
        }
      }

      // Process 24k history (default)
      if (trend24k.status === 'fulfilled') {
        goldTrend24k = trend24k.value;
        goldTrend = goldTrend24k; // Keep for backward compatibility
        if (goldTrend24k.length > 0 && angelOneGoldData?.gold_24k_10g) {
          const todayDate = new Date().toISOString().split('T')[0] || '';
          const todayInHistory = goldTrend24k.find((item) => item.date === todayDate);
          if (!todayInHistory) {
            goldTrend24k.push({ date: todayDate, price: angelOneGoldData.gold_24k_10g });
            goldTrend24k.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          }
        }
      }
      
      if (goldTrend24k && goldTrend24k.length > 0) {
        console.log(`Using AngelOne gold history: 24k=${goldTrend24k.length}, 22k=${goldTrend22k?.length || 0}, 18k=${goldTrend18k?.length || 0} points`);
      }
    } catch (error) {
      console.error('Error fetching gold history from AngelOne:', error);
      // Fallback to historical storage if API fails
      const historicalData = getHistoricalPrices(30);
      if (historicalData.length > 0) {
        goldTrend = historicalData.map((item) => ({
          date: item.date,
          price: item.gold_10g,
        }));
        goldTrend24k = goldTrend; // Use same data for 24k
        console.log(`Using historical storage data as fallback: ${goldTrend.length} points`);
      }
    }

    // Store current price in historical storage as backup
    if (angelOneGoldData?.gold_24k_10g) {
      storePrice(angelOneGoldData.gold_24k_10g);
    }

    // Calculate percentage changes from historical data (if available)
    let percentageChange24k: number | null = null;
    let percentageChange22k: number | null = null;
    if (goldTrend && goldTrend.length >= 2 && angelOneGoldData?.gold_24k_10g) {
      const previousPrice = goldTrend[goldTrend.length - 2]?.price;
      if (previousPrice && previousPrice > 0) {
        percentageChange24k = ((angelOneGoldData.gold_24k_10g - previousPrice) / previousPrice) * 100;
      }
    }
    if (goldTrend && goldTrend.length >= 2 && angelOneGoldData?.gold_22k_10g) {
      const previousPrice = goldTrend[goldTrend.length - 2]?.price;
      if (previousPrice && previousPrice > 0) {
        // Approximate 22k change from 24k change
        percentageChange22k = percentageChange24k !== null ? percentageChange24k : null;
      }
    }

    // Fetch gold cities from AngelOne API
    let goldCities: string[] = [];
    try {
      goldCities = await getGoldCityList();
      if (goldCities.length === 0) {
        throw new Error('No cities returned from API');
      }
    } catch (error) {
      console.error('Error fetching gold cities, using fallback:', error);
      // Fallback to hardcoded list if API fails
      goldCities = [
        'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 'pune',
        'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore',
        'thane', 'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad'
      ];
    }

    const responseData: MetalsApiResponse = {
      city: angelOneGoldData?.city || city,
      gold_10g: angelOneGoldData?.gold_24k_10g || null,
      gold_22k_10g: angelOneGoldData?.gold_22k_10g || null,
      gold_1g: angelOneGoldData?.gold_24k_1g || null,
      gold_22k_1g: angelOneGoldData?.gold_22k_1g || null,
      gold_18k_1g: angelOneGoldData?.gold_18k_1g || null,
      gold_18k_10g: angelOneGoldData?.gold_18k_10g || null,
      gold_18k_difference: angelOneGoldData?.gold_18k_difference || null,
      gold_22k_difference: angelOneGoldData?.gold_22k_difference || null,
      gold_24k_difference: angelOneGoldData?.gold_24k_difference || null,
      gold_18k_percentage: angelOneGoldData?.gold_18k_percentage || null,
      gold_22k_percentage: angelOneGoldData?.gold_22k_percentage || null,
      gold_24k_percentage: angelOneGoldData?.gold_24k_percentage || null,
      silver_1kg: silverData.silver_1kg || null,
      silver_10g: silverData.silver_10g || null,
      silver_1g: silverData.silver_1g || null,
      copper: copperData.copper_1kg || null,
      copper_1kg: copperData.copper_1kg || null,
      copper_100g: copperData.copper_100g || null,
      copper_10g: copperData.copper_10g || null,
      copper_1g: copperData.copper_1g || null,
      copperPercentageChange: copperData.percentageChange || null,
      copperTrend: copperData.copperTrend,
      platinum: ebullionData?.platinum?.rate || null,
      platinum_1g: ebullionData?.platinum?.rate || null,
      platinum_10g: ebullionData?.platinum?.rate ? ebullionData.platinum.rate * 10 : null,
      platinumPercentageChange: ebullionData?.platinum?.rate && ebullionData.platinum.variation
        ? (parseFloat(ebullionData.platinum.variation) / (ebullionData.platinum.rate - parseFloat(ebullionData.platinum.variation))) * 100
        : null,
      platinumVariationType: ebullionData?.platinum?.variationType,
      platinumVariation: ebullionData?.platinum?.variation,
      palladium: ebullionData?.palladium?.rate || null,
      palladium_10g: ebullionData?.palladium?.rate || null,
      palladium_1g: ebullionData?.palladium?.rate ? ebullionData.palladium.rate / 10 : null,
      palladiumPercentageChange: ebullionData?.palladium?.rate && ebullionData.palladium.variation
        ? (parseFloat(ebullionData.palladium.variation) / (ebullionData.palladium.rate - parseFloat(ebullionData.palladium.variation))) * 100
        : null,
      palladiumVariationType: ebullionData?.palladium?.variationType,
      palladiumVariation: ebullionData?.palladium?.variation,
      updated_at: angelOneGoldData?.updated_at || new Date().toISOString(),
      cached: false,
      trendingCities: goldCities,
      goldTrend: goldTrend,
      goldTrend18k: goldTrend18k,
      goldTrend22k: goldTrend22k,
      goldTrend24k: goldTrend24k,
      percentageChange24k: percentageChange24k,
      percentageChange22k: percentageChange22k,
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
