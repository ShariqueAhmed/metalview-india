/**
 * Groww.in API client for gold prices
 * Uses direct API endpoint for clean data fetching
 */

export interface GoldTrendData {
  date: string;
  firstDayPrice: { TWENTY_FOUR: number; TWENTY_TWO: number };
  lastDayPrice: { TWENTY_FOUR: number; TWENTY_TWO: number };
  highest: { TWENTY_FOUR: number; TWENTY_TWO: number };
  lowest: { TWENTY_FOUR: number; TWENTY_TWO: number };
  overAllPerformance: { TWENTY_FOUR: string; TWENTY_TWO: string };
}

export interface GrowwGoldData {
  gold_24k_1g: number; // ₹ per 1 gram (24 karat) - base price from API
  gold_22k_1g: number; // ₹ per 1 gram (22 karat) - base price from API
  gold_24k_10g: number; // ₹ per 10 grams (24 karat) - calculated
  gold_22k_10g: number; // ₹ per 10 grams (22 karat) - calculated
  location?: string;
  date?: string;
  trendingCities?: string[]; // List of trending city names
  goldTrend?: { [city: string]: { [month: string]: GoldTrendData } }; // Historical trend data
}

/**
 * Fetch gold prices from Groww.in API
 * Uses direct API endpoint for cleaner data fetching
 */
export async function fetchGrowwGoldPrices(city: string = 'delhi'): Promise<GrowwGoldData> {
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
        'referer': 'https://groww.in/gold-rates/gold-rate-today-in-navi-mumbai',
      },
    });

    if (!response.ok) {
      throw new Error(`Groww API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.physicalGoldRate) {
      throw new Error('Invalid response structure from Groww API');
    }
    
    const physicalGoldRate = data.physicalGoldRate;
    
    if (!physicalGoldRate || typeof physicalGoldRate !== 'object') {
      throw new Error('Could not find physicalGoldRate in API response');
    }
    
    // Find the city data
    // Try multiple formats: original city name, lowercase, with/without spaces, with/without hyphens
    const cityVariations = [
      city, // Original
      city.replace(/-/g, ' '), // Replace hyphens with spaces
      city.replace(/-/g, ''), // Remove hyphens
      city.replace(/\s+/g, '-'), // Replace spaces with hyphens
      city.toLowerCase(),
      city.replace(/-/g, ' ').toLowerCase(),
      city.replace(/-/g, '').toLowerCase(),
    ];
    
    let cityData = null;
    for (const variation of cityVariations) {
      if (physicalGoldRate[variation]) {
        cityData = physicalGoldRate[variation];
        break;
      }
    }
    
    // If still not found, try case-insensitive match
    if (!cityData) {
      const cityKeys = Object.keys(physicalGoldRate);
      const normalizedCity = city.replace(/-/g, ' ').toLowerCase();
      const matchingKey = cityKeys.find(k => 
        k.toLowerCase() === normalizedCity || 
        k.toLowerCase().replace(/\s+/g, ' ') === normalizedCity ||
        k.toLowerCase().replace(/-/g, ' ') === normalizedCity
      );
      if (matchingKey) {
        cityData = physicalGoldRate[matchingKey];
      }
    }
    
    // Fallback to common cities
    if (!cityData) {
      cityData = physicalGoldRate['delhi'] || 
                 physicalGoldRate['mumbai'] || 
                 physicalGoldRate['kolkata'] || 
                 physicalGoldRate['bangalore'] ||
                 physicalGoldRate['chennai'] ||
                 physicalGoldRate['hyderabad'] ||
                 physicalGoldRate['Navi Mumbai'];
    }
    
    // If still not found, use first available city
    if (!cityData) {
      const cityKeys: string[] = Object.keys(physicalGoldRate);
      const firstCityKey = cityKeys[0];
      if (cityKeys.length > 0 && firstCityKey) {
        cityData = physicalGoldRate[firstCityKey];
      }
    }
    
    if (!cityData || typeof cityData !== 'object') {
      const availableCities = Object.keys(physicalGoldRate).slice(0, 10).join(', ');
      throw new Error(`Could not find city data. Available cities: ${availableCities}`);
    }
    
    // The structure is: cityData.price.TWENTY_FOUR
    const price = cityData.price;
    if (!price) {
      throw new Error('Could not find price in city data');
    }
    
    // API returns prices per 1 gram, not per 10 grams
    const price24k_1g = price.TWENTY_FOUR;
    const price22k_1g = price.TWENTY_TWO;
    
    if (!price24k_1g || price24k_1g === 0) {
      throw new Error('Invalid 24k gold price extracted');
    }
    
    // Calculate 10gm prices (multiply by 10)
    const price24k_10g = price24k_1g * 10;
    const price22k_10g = (price22k_1g || price24k_1g * 0.916) * 10;
    
    // Extract trending cities and gold trend data from the API response
    const trendingCities = data.trendingCities || [];
    const goldTrend = data.goldTrend || {};

    return {
      gold_24k_1g: parseFloat(String(price24k_1g)),
      gold_22k_1g: parseFloat(String(price22k_1g || price24k_1g * 0.916)),
      gold_24k_10g: parseFloat(String(price24k_10g)),
      gold_22k_10g: parseFloat(String(price22k_10g)),
      location: cityData.priceLocation || city,
      date: cityData.date || new Date().toISOString().split('T')[0],
      trendingCities: trendingCities,
      goldTrend: goldTrend,
    };
  } catch (error) {
    console.error('Groww API error:', error);
    throw error;
  }
}
