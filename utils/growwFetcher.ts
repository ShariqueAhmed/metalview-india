/**
 * Groww API Fetcher
 * Handles API calls to Groww.in for metal price data
 * Normalizes units and handles failures gracefully
 */

export interface GoldTrendPoint {
  date: string;
  price: number;
}

export interface GrowwMetalData {
  gold_10g: number | null; // 24K gold per 10g
  gold_22k_10g: number | null; // 22K gold per 10g
  gold_1g: number | null; // 24K gold per 1g
  gold_22k_1g: number | null; // 22K gold per 1g
  silver_1kg: number | null;
  copper: number | null;
  platinum: number | null;
  city?: string;
  updated_at: string;
  trendingCities?: string[];
  goldTrend?: GoldTrendPoint[]; // Historical gold price trend data
}

export interface GrowwApiResponse {
  physicalGoldRate?: {
    [city: string]: {
      price: {
        TWENTY_FOUR: number;
        TWENTY_TWO?: number;
      };
      priceLocation?: string;
      date?: string;
    };
  };
  silverRate?: {
    [city: string]: {
      price: number;
      unit: string;
    };
  };
  copperRate?: {
    [city: string]: {
      price: number;
      unit: string;
    };
  };
  platinumRate?: {
    [city: string]: {
      price: number;
      unit: string;
    };
  };
  trendingCities?: string[];
  goldTrend?: {
    [city: string]: {
      [date: string]: number; // Date as key, price as value
    };
  };
  // Alternative structure: array of trend points
  goldTrendData?: Array<{
    date: string;
    price: number;
    city?: string;
  }>;
}

/**
 * Fetches metal prices from Groww API
 * @param city - City name (e.g., 'mumbai', 'delhi')
 * @returns Normalized metal price data
 */
export async function fetchGrowwMetalPrices(
  city: string = 'mumbai'
): Promise<GrowwMetalData> {
  try {
    const url = 'https://groww.in/v1/api/physicalGold/v1/rates/aggregated_api?=null';

    const response = await fetch(url, {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36',
        'x-app-id': 'growwWeb',
        'x-device-type': 'msite',
        'x-platform': 'web',
        'referer': 'https://groww.in/gold-rates/gold-rate-today-in-mumbai',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`Groww API request failed: ${response.status} ${response.statusText}`);
    }

    const data: GrowwApiResponse = await response.json();

    if (!data || !data.physicalGoldRate) {
      throw new Error('Invalid response structure from Groww API');
    }

    // Normalize city name for matching
    const cityVariations = [
      city,
      city.replace(/-/g, ' '),
      city.replace(/-/g, ''),
      city.replace(/\s+/g, '-'),
      city.toLowerCase(),
      city.replace(/-/g, ' ').toLowerCase(),
    ];

    // Find city data
    let cityData = null;
    for (const variation of cityVariations) {
      if (data.physicalGoldRate[variation]) {
        cityData = data.physicalGoldRate[variation];
        break;
      }
    }

    // Case-insensitive fallback
    if (!cityData) {
      const cityKeys = Object.keys(data.physicalGoldRate);
      const normalizedCity = city.replace(/-/g, ' ').toLowerCase();
      const matchingKey = cityKeys.find(
        (k) => k.toLowerCase() === normalizedCity || k.toLowerCase().replace(/\s+/g, ' ') === normalizedCity
      );
      if (matchingKey) {
        cityData = data.physicalGoldRate[matchingKey];
      }
    }

    // Fallback to common cities
    if (!cityData) {
      cityData =
        data.physicalGoldRate['mumbai'] ||
        data.physicalGoldRate['delhi'] ||
        data.physicalGoldRate['bangalore'] ||
        data.physicalGoldRate['kolkata'] ||
        data.physicalGoldRate['chennai'] ||
        Object.values(data.physicalGoldRate)[0];
    }

    if (!cityData || !cityData.price) {
      throw new Error('Could not find city price data');
    }

    // Extract prices
    const gold24k_1g = cityData.price.TWENTY_FOUR;
    const gold22k_1g = cityData.price.TWENTY_TWO || gold24k_1g * 0.916; // 22K is typically 91.6% of 24K
    const gold_10g = gold24k_1g * 10; // Convert 1g to 10g
    const gold_22k_10g = gold22k_1g * 10; // Convert 1g to 10g

    // Silver, Copper, Platinum - these may not be available in Groww API
    // For now, set to null (can be extended when API provides this data)
    const silver_1kg = data.silverRate?.[city]?.price || null;
    const copper = data.copperRate?.[city]?.price || null;
    const platinum = data.platinumRate?.[city]?.price || null;

    // Extract trending cities from API response
    const trendingCities = data.trendingCities || [];

    // Extract gold trend data
    let goldTrend: GoldTrendPoint[] | undefined = undefined;
    
    if (data.goldTrendData && Array.isArray(data.goldTrendData)) {
      // If API returns array format
      goldTrend = data.goldTrendData
        .filter((item) => !item.city || item.city.toLowerCase() === city.toLowerCase())
        .map((item) => ({
          date: item.date,
          price: item.price * 10, // Convert 1g to 10g if needed
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (data.goldTrend && data.goldTrend[city]) {
      // If API returns object format with city key
      const cityTrend = data.goldTrend[city];
      goldTrend = Object.entries(cityTrend)
        .map(([date, price]) => ({
          date: date,
          price: typeof price === 'number' ? price * 10 : price, // Convert 1g to 10g if needed
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (data.goldTrend) {
      // Try to find city in trend data
      const cityKeys = Object.keys(data.goldTrend);
      const matchingCity = cityKeys.find(
        (k) => k.toLowerCase() === city.toLowerCase() || 
               k.toLowerCase().replace(/\s+/g, '-') === city.toLowerCase()
      );
      
      if (matchingCity && data.goldTrend[matchingCity]) {
        const cityTrend = data.goldTrend[matchingCity];
        if (typeof cityTrend === 'object' && !Array.isArray(cityTrend)) {
          goldTrend = Object.entries(cityTrend)
            .map(([date, price]) => ({
              date: date,
              price: typeof price === 'number' ? price * 10 : price,
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
      }
    }

    return {
      gold_10g: Math.round(gold_10g * 100) / 100,
      gold_22k_10g: Math.round(gold_22k_10g * 100) / 100,
      gold_1g: Math.round(gold24k_1g * 100) / 100,
      gold_22k_1g: Math.round(gold22k_1g * 100) / 100,
      silver_1kg: silver_1kg ? Math.round(silver_1kg * 100) / 100 : null,
      copper: copper ? Math.round(copper * 100) / 100 : null,
      platinum: platinum ? Math.round(platinum * 100) / 100 : null,
      city: cityData.priceLocation || city,
      updated_at: new Date().toISOString(),
      trendingCities: trendingCities,
      goldTrend: goldTrend,
    };
  } catch (error) {
    console.error('Groww API error:', error);
    throw error;
  }
}
