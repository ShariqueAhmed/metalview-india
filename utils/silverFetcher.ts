/**
 * Silver Price Fetcher
 * Handles API calls to AngelOne API for silver price data
 */

export interface SilverTrendPoint {
  date: string;
  price: number;
  differenceAmount?: number;
  differencePercentage?: number;
}

export interface SilverApiResponse {
  success: boolean;
  data: {
    gram: number;
    history: Array<{
      date: string;
      price: string;
      differenceAmount: string;
      differencePercentage: string;
    }>;
  };
}

export interface SilverCalculatorResponse {
  success: boolean;
  data: {
    silver: {
      today: number;
      yesterday: number;
      differenceAmount: number;
      differencePercentage: number;
      date: string;
    };
  };
}

export interface SilverCity {
  city: string;
  slug: string;
  symbol: string;
}

export interface SilverCityListResponse {
  success: boolean;
  count: number;
  data: SilverCity[];
}

// Cache for city list (cache for 1 hour)
let cityListCache: { data: Map<string, string>; timestamp: number } | null = null;
const CITY_LIST_CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetches the list of available cities for silver prices
 * @returns Map of city slug to symbol
 */
async function getSilverCityList(): Promise<Map<string, string>> {
  // Check cache first
  if (cityListCache && Date.now() - cityListCache.timestamp < CITY_LIST_CACHE_TTL) {
    return cityListCache.data;
  }

  try {
    const url = 'https://kp-hl-httpapi-prod.angelone.in/silverCityList';

    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.angelone.in',
        'pragma': 'no-cache',
        'referer': 'https://www.angelone.in/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Silver city list API request failed: ${response.status} ${response.statusText}`);
    }

    const data: SilverCityListResponse = await response.json();

    if (!data || !data.success || !data.data || data.data.length === 0) {
      throw new Error('Invalid response structure from Silver city list API');
    }

    // Create a map of city slug to symbol
    const cityMap = new Map<string, string>();
    data.data.forEach((city) => {
      // Map both slug and city name (lowercase) to symbol
      cityMap.set(city.slug.toLowerCase(), city.symbol);
      cityMap.set(city.city.toLowerCase(), city.symbol);
    });

    // Update cache
    cityListCache = {
      data: cityMap,
      timestamp: Date.now(),
    };

    return cityMap;
  } catch (error) {
    console.error('Error fetching silver city list:', error);
    
    // Return fallback city map if API fails
    const fallbackMap = new Map<string, string>([
      ['mumbai', 'XAG-MUMB'],
      ['delhi', 'XAG-DELH'],
      ['bangalore', 'XAG-BANG'],
      ['kolkata', 'XAG-KOLK'],
      ['chennai', 'XAG-CHEN'],
      ['hyderabad', 'XAG-HYDE'],
      ['pune', 'XAG-PUNE'],
      ['ahmedabad', 'XAG-AHME'],
      ['jaipur', 'XAG-JAIP'],
    ]);
    
    return fallbackMap;
  }
}

export interface SilverData {
  silver_1kg: number | null; // Price per kg (calculated from 10g)
  silver_10g: number | null; // Price per 10g
  silver_1g: number | null; // Price per 1g (calculated)
  updated_at: string;
  silverTrend?: SilverTrendPoint[];
  percentageChange?: number | null;
}

/**
 * Gets the list of available cities for silver prices
 * @returns Array of city objects with name, slug, and symbol
 */
export async function getAvailableSilverCities(): Promise<SilverCity[]> {
  try {
    const url = 'https://kp-hl-httpapi-prod.angelone.in/silverCityList';

    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.angelone.in',
        'pragma': 'no-cache',
        'referer': 'https://www.angelone.in/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Silver city list API request failed: ${response.status} ${response.statusText}`);
    }

    const data: SilverCityListResponse = await response.json();

    if (!data || !data.success || !data.data || data.data.length === 0) {
      throw new Error('Invalid response structure from Silver city list API');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching silver city list:', error);
    // Return empty array on error
    return [];
  }
}

/**
 * Fetches silver prices from AngelOne API
 * @param city - City name (e.g., 'mumbai', 'delhi') - maps to symbol
 * @returns Normalized silver price data
 */
export async function fetchSilverPrices(
  city: string = 'mumbai'
): Promise<SilverData> {
  try {
    // Get city list from API
    const cityMap = await getSilverCityList();
    
    // Normalize city name (handle variations like "mumbai", "Mumbai", "MUMBAI", etc.)
    const normalizedCity = city.toLowerCase().trim();
    
    // Try to find symbol for the city
    let symbol = cityMap.get(normalizedCity);
    
    // If not found, try with common variations
    if (!symbol) {
      // Try with spaces replaced by hyphens or removed
      const variations = [
        normalizedCity.replace(/\s+/g, '-'),
        normalizedCity.replace(/\s+/g, ''),
        normalizedCity.replace(/-/g, ' '),
      ];
      
      for (const variation of variations) {
        symbol = cityMap.get(variation);
        if (symbol) break;
      }
    }
    
    // Default to Mumbai if city not found
    if (!symbol) {
      console.warn(`City "${city}" not found in silver city list, defaulting to Mumbai`);
      symbol = 'XAG-MUMB';
    }

    // Fetch today's price from calculator API
    const calculatorUrl = `https://kp-hl-httpapi-prod.angelone.in/silverCalculator?symbol=${symbol}`;
    const calculatorResponse = await fetch(calculatorUrl, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.angelone.in',
        'pragma': 'no-cache',
        'referer': 'https://www.angelone.in/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!calculatorResponse.ok) {
      throw new Error(`Silver calculator API request failed: ${calculatorResponse.status} ${calculatorResponse.statusText}`);
    }

    const calculatorData: SilverCalculatorResponse = await calculatorResponse.json();

    if (!calculatorData || !calculatorData.success || !calculatorData.data || !calculatorData.data.silver) {
      throw new Error('Invalid response structure from Silver calculator API');
    }

    // Get today's price (per gram)
    const todayPricePerGram = calculatorData.data.silver.today;
    const percentageChange = calculatorData.data.silver.differencePercentage;

    // Calculate prices for different units
    const silver_1g = todayPricePerGram;
    const silver_10g = todayPricePerGram * 10;
    const silver_1kg = todayPricePerGram * 1000;

    // Fetch historical data from history API
    const historyUrl = `https://kp-hl-httpapi-prod.angelone.in/silverhistory?symbol=${symbol}&gram=10`;

    const response = await fetch(historyUrl, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.angelone.in',
        'pragma': 'no-cache',
        'referer': 'https://www.angelone.in/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`Silver API request failed: ${response.status} ${response.statusText}`);
    }

    const data: SilverApiResponse = await response.json();

    // Process historical data (prices are for 10g in history API)
    // Note: We already have today's price from calculator API, but we'll use history for trend
    let silverTrend: SilverTrendPoint[] = [];
    
    if (data && data.success && data.data && data.data.history && data.data.history.length > 0) {
      // Process historical data
      silverTrend = data.data.history
      .map((item) => {
        // Parse date from format "3rd Feb, 2026" to ISO format
        const dateStr = item.date;
        let parsedDate: Date;
        
        try {
          // Try to parse the date
          // Format: "3rd Feb, 2026" or "1st Jan, 2026"
          const dateMatch = dateStr?.match(/(\d+)(st|nd|rd|th)\s+(\w+),\s+(\d+)/);
          if (dateMatch && dateMatch[1] && dateMatch[3] && dateMatch[4]) {
            const day = parseInt(dateMatch[1]);
            const monthName = dateMatch[3];
            const year = parseInt(dateMatch[4]);
            
            const monthMap: { [key: string]: number } = {
              'Jan': 0, 'January': 0,
              'Feb': 1, 'February': 1,
              'Mar': 2, 'March': 2,
              'Apr': 3, 'April': 3,
              'May': 4,
              'Jun': 5, 'June': 5,
              'Jul': 6, 'July': 6,
              'Aug': 7, 'August': 7,
              'Sep': 8, 'September': 8,
              'Oct': 9, 'October': 9,
              'Nov': 10, 'November': 10,
              'Dec': 11, 'December': 11,
            };
            
            const month = monthMap[monthName];
            if (month !== undefined) {
              parsedDate = new Date(year, month, day);
            } else {
              // Try native Date parsing as fallback
              parsedDate = new Date(dateStr);
            }
          } else {
            // Try native Date parsing as fallback
            parsedDate = new Date(dateStr);
          }
          
          // Validate the parsed date
          if (isNaN(parsedDate.getTime())) {
            console.warn('Invalid date parsed:', dateStr);
            parsedDate = new Date(); // Use today as fallback
          }
        } catch (e) {
          console.warn('Error parsing date:', dateStr, e);
          parsedDate = new Date(); // Use today as fallback
        }

        const isoString = parsedDate.toISOString();
        const dateSplit = isoString.split('T');
        const dateValue: string = dateSplit[0] || '';
        
        return {
          date: dateValue, // YYYY-MM-DD format
          price: parseFloat(item.price),
          differenceAmount: parseFloat(item.differenceAmount),
          differencePercentage: parseFloat(item.differencePercentage),
        };
      })
      .filter((item) => !isNaN(item.price) && item.price > 0)
      .sort((a, b) => {
        // Sort by date (oldest first)
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
    } else {
      console.warn('Silver history API returned no data, using only today\'s price');
    }

    // Add today's price to the trend if not already present
    const todayIso = new Date().toISOString();
    const todaySplit = todayIso.split('T');
    const todayDate: string = todaySplit[0] || '';
    const todayInTrend = silverTrend.find((item) => item.date === todayDate);
    
    if (!todayInTrend) {
      // Add today's price to trend
      silverTrend.push({
        date: todayDate,
        price: silver_10g, // Price for 10g
        differenceAmount: calculatorData.data.silver.differenceAmount * 10, // Convert to 10g
        differencePercentage: percentageChange,
      });
      
      // Sort by date
      silverTrend.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
    }

    return {
      silver_1kg: Math.round(silver_1kg * 100) / 100,
      silver_10g: Math.round(silver_10g * 100) / 100,
      silver_1g: Math.round(silver_1g * 100) / 100,
      updated_at: new Date().toISOString(),
      silverTrend: silverTrend.length > 0 ? silverTrend : undefined,
      percentageChange: !isNaN(percentageChange) ? percentageChange : null,
    };
  } catch (error) {
    console.error('Silver API error:', error);
    throw error;
  }
}
