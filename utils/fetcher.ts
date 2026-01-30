/**
 * Exchange rate fetcher utilities
 */

export interface ExchangeRateResponse {
  success: boolean;
  base: string;
  date: string;
  rates: {
    INR: number;
  };
}

/**
 * Fetch USD to INR exchange rate (Free, no API key required)
 */
export async function fetchUsdInrRate(): Promise<number> {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=INR';
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.statusText}`);
    }

    const data: ExchangeRateResponse = await response.json();
    
    if (!data.success || !data.rates.INR) {
      throw new Error('Failed to fetch USD to INR rate');
    }

    return data.rates.INR;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    // Fallback to approximate rate if API fails
    return 83.0; // Approximate fallback
  }
}
