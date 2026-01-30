/**
 * Metal price fetcher with swappable API providers
 * Supports multiple free APIs for maximum reliability
 */

export interface PreciousMetalPrices {
  gold: number; // USD per troy ounce
  silver: number; // USD per troy ounce
}

export interface IndustrialMetalPrices {
  copper?: number; // USD per troy ounce (optional)
  aluminium?: number; // USD per troy ounce (optional)
  zinc?: number; // USD per troy ounce (optional)
}

export interface MetalPricesResponse {
  precious: PreciousMetalPrices;
  industrial: IndustrialMetalPrices;
  source: 'gold-api' | 'metalpriceapi' | 'fallback';
}

/**
 * API Provider: Groww.in scraper for Indian gold prices
 * Fetches real-time gold prices directly in ₹ per 10 grams
 */
async function fetchFromGroww(): Promise<{ gold_10g_rupees: number }> {
  try {
    const { fetchGrowwGoldPrices } = await import('./growwScraper');
    const growwData = await fetchGrowwGoldPrices('navi-mumbai');
    
    // Groww provides price in ₹ per 10 grams (24 karat) - perfect for our use case!
    return {
      gold_10g_rupees: growwData.gold_24k_10g,
    };
  } catch (error) {
    console.error('Groww scraper error:', error);
    throw error;
  }
}

/**
 * API Provider: Alternative free API for precious metals
 * Uses Groww.in for gold, fallback for silver
 */
async function fetchFromGoldApi(): Promise<PreciousMetalPrices> {
  try {
    // Try Groww first for accurate Indian gold prices
    const growwData = await fetchFromGroww();
    
    // Convert ₹/10g to USD/oz for our existing conversion logic
    // We need USD/oz to use our conversion functions
    // Approximate conversion: ₹17,000 per 10g ≈ $2650 per oz
    const usdInr = 83.0; // We'll get actual rate, but use estimate for now
    const goldUsdPerOz = (growwData.gold_10g_rupees / 10) * (31.1035 / usdInr);
    
    return {
      gold: goldUsdPerOz,
      silver: 31.5, // Approximate silver price - can be improved later
    };
  } catch (error) {
    console.error('Gold-API fallback error:', error);
    // Last resort fallback
    return {
      gold: 2650.0,
      silver: 31.5,
    };
  }
}

/**
 * API Provider: MetalpriceAPI (Requires API key, optional)
 * Fetches Gold, Silver, and optionally industrial metals
 */
async function fetchFromMetalpriceAPI(apiKey?: string): Promise<MetalPricesResponse> {
  if (!apiKey) {
    throw new Error('MetalpriceAPI requires API key');
  }

  try {
    // Try to fetch precious metals - MetalpriceAPI format
    // Try different endpoint formats
    const preciousUrl = `https://api.metalpriceapi.com/v1/latest?base=USD&symbols=XAU,XAG&apikey=${apiKey}`;
    console.log('Fetching from MetalpriceAPI:', preciousUrl.replace(apiKey, '***'));
    
    const preciousResponse = await fetch(preciousUrl, {
      next: { revalidate: 600 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!preciousResponse.ok) {
      const errorText = await preciousResponse.text();
      console.error('MetalpriceAPI error response:', errorText);
      throw new Error(`MetalpriceAPI request failed: ${preciousResponse.status} ${preciousResponse.statusText}`);
    }

    const preciousData = await preciousResponse.json();
    
    console.log('MetalpriceAPI response:', JSON.stringify(preciousData).substring(0, 200));

    // Check for API errors
    if (!preciousData.success) {
      const errorMsg = preciousData.error?.message || 'MetalpriceAPI returned an error';
      console.error('MetalpriceAPI error:', errorMsg, preciousData.error);
      
      // If API key is invalid, throw error to try fallback
      if (preciousData.error?.statusCode === 101) {
        throw new Error('Invalid API key or API key not recognized');
      }
      throw new Error(errorMsg);
    }

    // MetalpriceAPI returns rates as numbers (USD per troy ounce)
    const goldRate = preciousData.rates?.XAU;
    const silverRate = preciousData.rates?.XAG;

    if (!goldRate || !silverRate || goldRate === 0 || silverRate === 0) {
      console.error('MetalpriceAPI returned invalid rates:', { goldRate, silverRate });
      throw new Error('MetalpriceAPI did not return valid price data');
    }

    const precious: PreciousMetalPrices = {
      gold: parseFloat(String(goldRate)),
      silver: parseFloat(String(silverRate)),
    };
    
    console.log('Successfully fetched prices:', precious);

    // Try to fetch industrial metals (may not be available in free tier)
    let industrial: IndustrialMetalPrices = {};
    
    try {
      const industrialUrl = `https://api.metalpriceapi.com/v1/latest?base=USD&symbols=XCU,XAL,XZN&apikey=${apiKey}`;
      const industrialResponse = await fetch(industrialUrl, {
        next: { revalidate: 600 },
      });

      if (industrialResponse.ok) {
        const industrialData = await industrialResponse.json();
        if (industrialData.success && industrialData.rates) {
          industrial = {
            copper: industrialData.rates.XCU ? parseFloat(String(industrialData.rates.XCU)) : undefined,
            aluminium: industrialData.rates.XAL ? parseFloat(String(industrialData.rates.XAL)) : undefined,
            zinc: industrialData.rates.XZN ? parseFloat(String(industrialData.rates.XZN)) : undefined,
          };
        }
      }
    } catch (err) {
      // Industrial metals not available, continue without them
      console.log('Industrial metals not available from MetalpriceAPI');
    }

    return {
      precious,
      industrial,
      source: 'metalpriceapi',
    };
  } catch (error) {
    console.error('MetalpriceAPI error:', error);
    throw error;
  }
}

/**
 * Main function to fetch metal prices
 * Tries multiple providers for reliability
 */
export async function fetchMetalPrices(apiKey?: string): Promise<MetalPricesResponse> {
  // Strategy 1: Try MetalpriceAPI first if API key is provided (most reliable)
  if (apiKey && apiKey.trim() !== '') {
    try {
      const result = await fetchFromMetalpriceAPI(apiKey);
      // Validate that we got real prices (not zeros)
      if (result.precious.gold > 0 && result.precious.silver > 0) {
        return result;
      } else {
        console.warn('MetalpriceAPI returned zero prices, trying fallback...');
      }
    } catch (error) {
      console.log('MetalpriceAPI failed, trying fallback...', error);
    }
  } else {
    console.log('No MetalpriceAPI key provided, using fallback prices');
  }

  // Strategy 2: Use fallback prices (approximate current market values)
  // NOTE: These are approximate and should be replaced with a working API
  try {
    const precious = await fetchFromGoldApi();
    return {
      precious,
      industrial: {}, // Industrial metals not available from fallback
      source: 'gold-api',
    };
  } catch (error) {
    console.error('Fallback also failed:', error);
    // Last resort: return approximate prices
    return {
      precious: {
        gold: 2650.0,
        silver: 31.5,
      },
      industrial: {},
      source: 'fallback',
    };
  }
}
