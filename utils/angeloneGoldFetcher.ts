/**
 * AngelOne Gold API Fetcher
 * Fetches today's gold prices for 18k, 22k, and 24k from AngelOne API
 */

export interface AngelOneGoldResponse {
  success: boolean;
  data: {
    city: string;
    grams: number;
    carat: string;
    price: string; // API returns price as string
    difference?: string;
    percentage?: string;
  };
}

export interface AngelOneGoldData {
  gold_18k_1g: number | null;
  gold_22k_1g: number | null;
  gold_24k_1g: number | null;
  gold_18k_10g: number | null;
  gold_22k_10g: number | null;
  gold_24k_10g: number | null;
  gold_18k_difference?: string | null;
  gold_22k_difference?: string | null;
  gold_24k_difference?: string | null;
  gold_18k_percentage?: string | null;
  gold_22k_percentage?: string | null;
  gold_24k_percentage?: string | null;
  city: string;
  updated_at: string;
}

export interface GoldTrendPoint {
  date: string;
  price: number;
}

export interface AngelOneGoldHistoryResponse {
  success: boolean;
  data: Array<{
    date: string; // e.g., "4 February 2026"
    rate: string; // Price per gram as string
    change: string; // e.g., "+0.71" or "-3.29"
  }>;
}

/**
 * Normalizes city name for AngelOne API
 * Converts common city formats to API-expected format
 */
function normalizeCityName(city: string): string {
  // Convert to title case (first letter uppercase, rest lowercase)
  const normalized = city
    .toLowerCase()
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Handle special cases
  const cityMap: Record<string, string> = {
    'navi mumbai': 'Mumbai',
    'noida': 'Delhi',
    'gurgaon': 'Delhi',
    'gurugram': 'Delhi',
    'bangalore': 'Bangalore',
    'bengaluru': 'Bangalore',
    'calcutta': 'Kolkata',
    'madras': 'Chennai',
  };
  
  return cityMap[normalized.toLowerCase()] || normalized;
}

/**
 * Fetches gold price for a specific carat from AngelOne API
 * Returns both price and difference
 */
async function fetchGoldPriceByCarat(
  city: string,
  carat: '18k' | '22k' | '24k'
): Promise<{ price: number | null; difference: string | null; percentage: string | null }> {
  try {
    const normalizedCity = normalizeCityName(city);
    const url = `https://kp-hl-httpapi-prod.angelone.in/goldcalculator?city=${encodeURIComponent(normalizedCity)}&carat=${carat}&grams=1`;

    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-GB,en;q=0.5',
        'origin': 'https://www.angelone.in',
        'priority': 'u=1, i',
        'referer': 'https://www.angelone.in/',
        'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Brave";v="144"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error(`AngelOne API error for ${carat} gold: ${response.status} ${response.statusText}`);
      return { price: null, difference: null, percentage: null };
    }

    const data: AngelOneGoldResponse = await response.json();
    
    if (!data || !data.success || !data.data || !data.data.price) {
      console.error(`Invalid response structure from AngelOne API for ${carat} gold:`, data);
      return { price: null, difference: null, percentage: null };
    }

    const price = parseFloat(data.data.price);
    if (isNaN(price)) {
      console.error(`Invalid price value from AngelOne API for ${carat} gold:`, data.data.price);
      return { price: null, difference: null, percentage: null };
    }

    const roundedPrice = Math.round(price * 100) / 100; // Round to 2 decimal places
    // Get difference value (e.g., "+154.48" or "-50.25")
    // The difference is per gram, so we keep it as is
    const difference = (data.data.difference && typeof data.data.difference === 'string' && data.data.difference.trim()) 
      ? data.data.difference.trim() 
      : null;
    
    // Get percentage change (e.g., "+1.33%" or "-0.50%")
    const percentage = (data.data.percentage && typeof data.data.percentage === 'string' && data.data.percentage.trim()) 
      ? data.data.percentage.trim() 
      : null;

    if (difference || percentage) {
      console.log(`Fetched ${carat} gold: price=${roundedPrice}, difference=${difference}, percentage=${percentage}`);
    }

    return { price: roundedPrice, difference, percentage };
  } catch (error) {
    console.error(`Error fetching ${carat} gold price from AngelOne:`, error);
    return { price: null, difference: null, percentage: null };
  }
}

/**
 * Fetches all gold prices (18k, 22k, 24k) from AngelOne API
 * @param city - City name (e.g., 'mumbai', 'delhi')
 * @returns Gold price data for all carats
 */
export async function fetchAngelOneGoldPrices(
  city: string = 'mumbai'
): Promise<AngelOneGoldData> {
  try {
    // Fetch all three carats in parallel
    const [gold18k, gold22k, gold24k] = await Promise.allSettled([
      fetchGoldPriceByCarat(city, '18k'),
      fetchGoldPriceByCarat(city, '22k'),
      fetchGoldPriceByCarat(city, '24k'),
    ]);

    const gold18kData = gold18k.status === 'fulfilled' ? gold18k.value : { price: null, difference: null, percentage: null };
    const gold22kData = gold22k.status === 'fulfilled' ? gold22k.value : { price: null, difference: null, percentage: null };
    const gold24kData = gold24k.status === 'fulfilled' ? gold24k.value : { price: null, difference: null, percentage: null };

    const gold_18k_1g = gold18kData.price;
    const gold_22k_1g = gold22kData.price;
    const gold_24k_1g = gold24kData.price;

    // Calculate 10g prices
    const gold_18k_10g = gold_18k_1g ? Math.round(gold_18k_1g * 10 * 100) / 100 : null;
    const gold_22k_10g = gold_22k_1g ? Math.round(gold_22k_1g * 10 * 100) / 100 : null;
    const gold_24k_10g = gold_24k_1g ? Math.round(gold_24k_1g * 10 * 100) / 100 : null;

    const result = {
      gold_18k_1g,
      gold_22k_1g,
      gold_24k_1g,
      gold_18k_10g,
      gold_22k_10g,
      gold_24k_10g,
      gold_18k_difference: gold18kData.difference,
      gold_22k_difference: gold22kData.difference,
      gold_24k_difference: gold24kData.difference,
      gold_18k_percentage: gold18kData.percentage,
      gold_22k_percentage: gold22kData.percentage,
      gold_24k_percentage: gold24kData.percentage,
      city: normalizeCityName(city),
      updated_at: new Date().toISOString(),
    };
    
    console.log(`Returning gold data: 18k_diff=${result.gold_18k_difference}, 22k_diff=${result.gold_22k_difference}, 24k_diff=${result.gold_24k_difference}`);
    return result;
  } catch (error) {
    console.error('Error fetching AngelOne gold prices:', error);
    return {
      gold_18k_1g: null,
      gold_22k_1g: null,
      gold_24k_1g: null,
      gold_18k_10g: null,
      gold_22k_10g: null,
      gold_24k_10g: null,
      gold_18k_difference: null,
      gold_22k_difference: null,
      gold_24k_difference: null,
      gold_18k_percentage: null,
      gold_22k_percentage: null,
      gold_24k_percentage: null,
      city: city,
      updated_at: new Date().toISOString(),
    };
  }
}

/**
 * Converts date from "4 February 2026" format to "YYYY-MM-DD" format
 */
function parseHistoryDate(dateStr: string): string | null {
  try {
    // Parse date like "4 February 2026" to ISO format
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split('T')[0] || null;
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return null;
  }
}

/**
 * Fetches gold price history from AngelOne API
 * @param city - City name (e.g., 'mumbai', 'delhi')
 * @param carat - Carat type ('18k', '22k', '24k'). Defaults to '24k'
 * @returns Array of historical gold price points (per 10g)
 */
export async function fetchAngelOneGoldHistory(
  city: string = 'mumbai',
  carat: '18k' | '22k' | '24k' = '24k'
): Promise<GoldTrendPoint[]> {
  try {
    const normalizedCity = normalizeCityName(city);
    const url = `https://kp-hl-httpapi-prod.angelone.in/goldhistory?city=${encodeURIComponent(normalizedCity)}&carat=${carat}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Brave";v="144"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'Referer': 'https://www.angelone.in/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      console.error(`AngelOne gold history API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: AngelOneGoldHistoryResponse = await response.json();
    
    if (!data || !data.success || !Array.isArray(data.data)) {
      console.error('Invalid response structure from AngelOne gold history API:', data);
      return [];
    }

    // Process historical data
    const goldTrend: GoldTrendPoint[] = data.data
      .map((item) => {
        const date = parseHistoryDate(item.date);
        const ratePerGram = parseFloat(item.rate);
        
        if (!date || isNaN(ratePerGram) || ratePerGram <= 0) {
          return null;
        }

        // Convert from per gram to per 10g
        const pricePer10g = Math.round(ratePerGram * 10 * 100) / 100;

        return {
          date,
          price: pricePer10g,
        };
      })
      .filter((item): item is GoldTrendPoint => item !== null)
      .sort((a, b) => {
        // Sort by date (oldest first)
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });

    console.log(`Fetched ${goldTrend.length} gold history points for ${carat} from AngelOne`);
    return goldTrend;
  } catch (error) {
    console.error('Error fetching AngelOne gold history:', error);
    return [];
  }
}

/**
 * Interface for Gold City from AngelOne API
 */
export interface GoldCity {
  symbol: string;
  city: string;
}

export interface GoldCityListResponse {
  success: boolean;
  data: GoldCity[];
}

// Cache for gold city list (cache for 1 hour)
let goldCityListCache: { data: string[]; timestamp: number } | null = null;
const GOLD_CITY_LIST_CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Converts city name to slug (lowercase, spaces replaced with hyphens)
 */
function cityToSlug(city: string): string {
  return city
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetches the list of available cities for gold prices from AngelOne API
 * @returns Array of city slugs (lowercase, hyphenated)
 */
export async function getGoldCityList(): Promise<string[]> {
  // Check cache first
  if (goldCityListCache && Date.now() - goldCityListCache.timestamp < GOLD_CITY_LIST_CACHE_TTL) {
    return goldCityListCache.data;
  }

  try {
    const url = 'https://kp-hl-httpapi-prod.angelone.in/cities';

    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-GB,en;q=0.5',
        'origin': 'https://www.angelone.in',
        'priority': 'u=1, i',
        'referer': 'https://www.angelone.in/',
        'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Brave";v="144"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Gold city list API request failed: ${response.status} ${response.statusText}`);
    }

    const data: GoldCityListResponse = await response.json();

    if (!data || !data.success || !data.data || data.data.length === 0) {
      throw new Error('Invalid response structure from Gold city list API');
    }

    // Extract unique city names and convert to slugs
    const citySet = new Set<string>();
    data.data.forEach((item) => {
      if (item.city && item.city.trim()) {
        const slug = cityToSlug(item.city);
        // Filter out generic names like "Gujarat", "Karnataka", etc.
        if (slug && !['gujarat', 'karnataka', 'haryana', 'punjab', 'rajasthan', 'maharashtra', 'tamil-nadu', 'west-bengal', 'uttar-pradesh', 'madhya-pradesh'].includes(slug)) {
          citySet.add(slug);
        }
      }
    });

    const cityList = Array.from(citySet).sort();

    // Update cache
    goldCityListCache = {
      data: cityList,
      timestamp: Date.now(),
    };

    console.log(`Fetched ${cityList.length} gold cities from AngelOne`);
    return cityList;
  } catch (error) {
    console.error('Error fetching gold city list:', error);
    
    // Return fallback city list if API fails
    const fallbackCities = [
      'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 'pune',
      'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore',
      'thane', 'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad'
    ];
    
    console.log('Using fallback gold city list');
    return fallbackCities;
  }
}
