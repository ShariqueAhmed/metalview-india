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
  percentageChange24k?: number | null; // Percentage change for 24K gold
  percentageChange22k?: number | null; // Percentage change for 22K gold
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
      percentageChange?: {
        TWENTY_FOUR?: number;
        TWENTY_TWO?: number;
      };
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
  goldTrend?: Array<{
    date: string;
    price?: {
      date?: string;
      firstDayPrice?: {
        TWENTY_FOUR: number;
        TWENTY_TWO: number;
      };
      lastDayPrice?: {
        TWENTY_FOUR: number;
        TWENTY_TWO: number;
      };
      highest?: {
        TWENTY_FOUR: number;
        TWENTY_TWO: number;
      };
      lowest?: {
        TWENTY_FOUR: number;
        TWENTY_TWO: number;
      };
    };
  }> | Array<{
    date: string;
    price: number;
    city?: string;
  }> | {
    [city: string]: Array<{
      date: string;
      price?: {
        date?: string;
        lastDayPrice?: {
          TWENTY_FOUR: number;
          TWENTY_TWO: number;
        };
      };
    }> | {
      [date: string]: number;
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

    // Extract percentage change from API response
    // Handle both null and numeric values (0 is a valid percentage change)
    // If value is null or undefined, set to null; otherwise use the numeric value
    const percentageChange24k = (cityData.percentageChange?.TWENTY_FOUR !== undefined && 
                                 cityData.percentageChange?.TWENTY_FOUR !== null)
      ? cityData.percentageChange.TWENTY_FOUR 
      : null;
    const percentageChange22k = (cityData.percentageChange?.TWENTY_TWO !== undefined && 
                                 cityData.percentageChange?.TWENTY_TWO !== null)
      ? cityData.percentageChange.TWENTY_TWO 
      : ((cityData.percentageChange?.TWENTY_FOUR !== undefined && 
          cityData.percentageChange?.TWENTY_FOUR !== null)
          ? cityData.percentageChange.TWENTY_FOUR 
          : null);

    // Silver, Copper, Platinum - these may not be available in Groww API
    // For now, set to null (can be extended when API provides this data)
    const silver_1kg = data.silverRate?.[city]?.price || null;
    const copper = data.copperRate?.[city]?.price || null;
    const platinum = data.platinumRate?.[city]?.price || null;

    // Extract trending cities from API response
    const trendingCities = data.trendingCities || [];

    // Extract gold trend data
    let goldTrend: GoldTrendPoint[] | undefined = undefined;
    
    // Check if goldTrend is a simple array of {date, price} objects first
    if (data.goldTrend && Array.isArray(data.goldTrend) && data.goldTrend.length > 0) {
      const firstItem = data.goldTrend[0];
      // Check if it's already in the simple format: {date, price}
      if (firstItem && typeof firstItem === 'object' && 'date' in firstItem && 'price' in firstItem && typeof firstItem.price === 'number') {
        // Simple array format: [{date, price}, ...] - use directly
        goldTrend = data.goldTrend
          .map((item: any) => ({
            date: item.date,
            price: item.price, // Assume already in correct format (per 10g)
          }))
          .filter((item: any) => item.date && item.price !== undefined && item.price !== null)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      // If it has nested price object, it will be processed in the next condition
    }
    
    // If not processed yet, try other formats
    if (!goldTrend) {
      if (data.goldTrendData && Array.isArray(data.goldTrendData)) {
        // If API returns goldTrendData array format
        goldTrend = data.goldTrendData
          .filter((item) => !item.city || item.city.toLowerCase() === city.toLowerCase())
          .map((item) => ({
            date: item.date,
            price: item.price * 10, // Convert 1g to 10g if needed
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (data.goldTrend && Array.isArray(data.goldTrend)) {
        // API returns array of monthly trend objects with nested price structure
        goldTrend = data.goldTrend
          .map((trendItem: any) => {
            try {
              // Extract date and price from trend structure
              if (trendItem && trendItem.price) {
                // Try lastDayPrice first (most recent price in the month)
                let price: number | null = null;
                let date: string | null = trendItem.date || trendItem.price?.date || null;
                
                // Check for lastDayPrice (preferred - most recent)
                if (trendItem.price.lastDayPrice) {
                  price = trendItem.price.lastDayPrice.TWENTY_FOUR || trendItem.price.lastDayPrice.TWENTY_TWO || null;
                  date = trendItem.price.date || trendItem.date || date;
                } 
                // Fallback to firstDayPrice
                else if (trendItem.price.firstDayPrice) {
                  price = trendItem.price.firstDayPrice.TWENTY_FOUR || trendItem.price.firstDayPrice.TWENTY_TWO || null;
                  date = trendItem.price.date || trendItem.date || date;
                }
                // Fallback to highest price
                else if (trendItem.price.highest) {
                  price = trendItem.price.highest.TWENTY_FOUR || trendItem.price.highest.TWENTY_TWO || null;
                  date = trendItem.price.date || trendItem.date || date;
                }
                // Fallback to lowest price
                else if (trendItem.price.lowest) {
                  price = trendItem.price.lowest.TWENTY_FOUR || trendItem.price.lowest.TWENTY_TWO || null;
                  date = trendItem.price.date || trendItem.date || date;
                }
                
                if (date && price !== null && price !== undefined && !isNaN(price)) {
                  // Convert date format if needed (YYYY-MM to YYYY-MM-01)
                  let normalizedDate = date;
                  if (typeof date === 'string') {
                    if (date.match(/^\d{4}-\d{2}$/)) {
                      // YYYY-MM format - use first day of month
                      normalizedDate = `${date}-01`;
                    } else if (date.includes('T')) {
                      // ISO format - extract date part
                      normalizedDate = date.split('T')[0];
                    }
                  }
                  
                  return {
                    date: normalizedDate,
                    price: Math.round(price * 10 * 100) / 100, // Convert 1g to 10g and round to 2 decimals
                  };
                }
              }
            } catch (error) {
              console.error('Error processing goldTrend item:', error, trendItem);
            }
            return null;
          })
          .filter((item: any): item is GoldTrendPoint => item !== null && item !== undefined && item.date && item.price !== undefined)
          .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB; // Oldest first for proper trend calculation
          });
        
        // Log for debugging
        if (goldTrend && goldTrend.length > 0) {
          console.log(`Extracted ${goldTrend.length} gold trend points from API`);
        } else {
          console.warn('No gold trend data extracted from API response. goldTrend structure:', 
            data.goldTrend ? (Array.isArray(data.goldTrend) ? `Array[${data.goldTrend.length}]` : 'Object') : 'undefined');
        }
      }
    }
    
    // If still not processed, try object format
    if (!goldTrend && data.goldTrend && typeof data.goldTrend === 'object' && !Array.isArray(data.goldTrend)) {
      // If API returns object format with city key
      const cityTrend: any = data.goldTrend[city];
      if (cityTrend) {
        if (Array.isArray(cityTrend)) {
          goldTrend = cityTrend
            .map((item: any) => {
              if (item.price && item.price.lastDayPrice) {
                const lastDayPrice = item.price.lastDayPrice.TWENTY_FOUR || item.price.lastDayPrice.TWENTY_TWO;
                return {
                  date: item.date || item.price.date,
                  price: lastDayPrice * 10,
                };
              }
              return null;
            })
            .filter((item: any): item is GoldTrendPoint => item !== null);
        } else if (typeof cityTrend === 'object') {
          goldTrend = Object.entries(cityTrend)
            .map(([date, price]: [string, any]) => ({
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
      percentageChange24k: percentageChange24k,
      percentageChange22k: percentageChange22k,
    };
  } catch (error) {
    console.error('Groww API error:', error);
    throw error;
  }
}
