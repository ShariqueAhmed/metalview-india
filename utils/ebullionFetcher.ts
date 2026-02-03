/**
 * Ebullion API Fetcher
 * Fetches all metal prices from ebullion.in API
 */

export interface MetalPriceData {
  rate: number;
  sellRate: number;
  buyRate: number;
  variationType: 'up' | 'down';
  variation: string;
}

export interface AllMetalPrices {
  gold: MetalPriceData;
  silver: MetalPriceData;
  platinum: MetalPriceData;
  palladium: MetalPriceData;
}

export interface EbullionApiResponse {
  data: AllMetalPrices;
}

/**
 * Fetches all metal prices from Ebullion API
 */
export async function fetchAllMetalPrices(): Promise<AllMetalPrices> {
  try {
    const response = await fetch('https://api.ebullion.in/price/getallmetaltickerfeed', {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.ebullion.in',
        'pragma': 'no-cache',
        'referer': 'https://www.ebullion.in/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Ebullion API error: ${response.status}`);
    }

    const result: EbullionApiResponse = await response.json();
    
    if (!result.data) {
      throw new Error('Invalid response format from Ebullion API');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching all metal prices from Ebullion:', error);
    throw error;
  }
}
