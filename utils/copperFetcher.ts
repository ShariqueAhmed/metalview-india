/**
 * Copper Price Fetcher
 * Handles API calls to MoneyControl API for copper price data
 */

export interface CopperApiResponse {
  code: string;
  message: string;
  data: {
    symbol: string;
    avgPrice: string;
    EXPIRY: string;
    bidQty: string;
    openPrice: string;
    oiBuildup: string;
    prevClose: string;
    optionType: string;
    lastTradeQty: string;
    tradedVol: string;
    lastupdEpoch: string;
    lowPrice: string;
    lastupdTime: string;
    highPrice: string;
    askPrice: string;
    priceUnit: string; // "KGS" - price per kilogram
    lastupd: string;
    instrumentType: string;
    perChange: string; // Percentage change
    lotSize: string;
    change: string; // Absolute change
    openIntChgPerc: string;
    prevOpenInt: string;
    bidPrice: string;
    openInt: string;
    askQty: string;
    exchange: string;
    contractMonth: string;
    tradedValLacs: string;
    strikePrice: string;
    lastPrice: string; // Current price per kg
    openIntChg: string;
  };
}

export interface CopperTrendPoint {
  date: string;
  price: number;
  percentageChange?: number;
}

export interface CopperHistoricalResponse {
  response: number;
  data: {
    [date: string]: {
      tranDate: string;
      dispDate: string;
      oiCurrent: string;
      oiPerChange: string;
      priceCurrent: string; // Price per kg
      perPriceChange: string; // Percentage change
      oiBuildup: string;
    };
  };
}

export interface CopperData {
  copper_1kg: number | null; // Price per kg
  copper_100g: number | null; // Price per 100g (calculated)
  copper_10g: number | null; // Price per 10g (calculated)
  copper_1g: number | null; // Price per 1g (calculated)
  updated_at: string;
  percentageChange?: number | null;
  change?: number | null;
  openPrice?: number | null;
  highPrice?: number | null;
  lowPrice?: number | null;
  prevClose?: number | null;
  copperTrend?: CopperTrendPoint[];
}

/**
 * Fetches copper prices from MoneyControl API
 * @returns Normalized copper price data
 */
export async function fetchCopperPrices(): Promise<CopperData> {
  try {
    // Try multiple expiry dates - MCX futures typically expire on last Thursday of the month
    // We'll try current month and next month expiry dates
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    
    // Common expiry dates to try (last Thursday of month, typically around 27-28)
    const expiryDates = [
      `${year}-${String(month).padStart(2, '0')}-27`, // Current month
      `${year}-${String(month).padStart(2, '0')}-28`, // Current month alternative
      `${year}-${String(month + 1).padStart(2, '0')}-27`, // Next month
      `${year}-${String(month + 1).padStart(2, '0')}-28`, // Next month alternative
    ];
    
    let data: CopperApiResponse | null = null;
    let lastError: Error | null = null;
    
    // Try each expiry date until we get a successful response
    for (const expiryDate of expiryDates) {
      try {
        const url = `https://priceapi.moneycontrol.com/pricefeed/mcx/commodityfutures/COPPER?expiry=${expiryDate}`;
        
        const response = await fetch(url, {
          headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'origin': 'https://www.moneycontrol.com',
            'pragma': 'no-cache',
            'referer': 'https://www.moneycontrol.com/',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
          },
          next: { revalidate: 600 }, // Cache for 10 minutes
        });

        if (!response.ok) {
          continue; // Try next expiry date
        }

        const responseData: CopperApiResponse = await response.json();
        
        if (responseData && responseData.code === '200' && responseData.data && responseData.data.lastPrice) {
          data = responseData;
          break; // Success, exit loop
        }
      } catch (error) {
        lastError = error as Error;
        continue; // Try next expiry date
      }
    }
    
    if (!data) {
      throw lastError || new Error('Could not fetch copper prices from any expiry date');
    }

    // Extract prices (all prices are per kg)
    const copper_1kg = parseFloat(data.data.lastPrice);
    const copper_100g = copper_1kg / 10; // 1kg = 1000g, so 100g = 1kg/10
    const copper_10g = copper_1kg / 100; // 10g = 1kg/100
    const copper_1g = copper_1kg / 1000; // 1g = 1kg/1000

    // Extract percentage change and other metrics
    const percentageChange = parseFloat(data.data.perChange) || null;
    const change = parseFloat(data.data.change) || null;
    const openPrice = parseFloat(data.data.openPrice) || null;
    const highPrice = parseFloat(data.data.highPrice) || null;
    const lowPrice = parseFloat(data.data.lowPrice) || null;
    const prevClose = parseFloat(data.data.prevClose) || null;

    // Fetch historical data
    let copperTrend: CopperTrendPoint[] | undefined = undefined;
    try {
      const historyUrl = 'https://priceapi.moneycontrol.com/technicalCompanyData/commodity/getHistoricalTrend?type=FUTCOM&symbol=COPPER&exchange=MCX&expiry=ALLEXPIRY&deviceType=W';
      
      const historyResponse = await fetch(historyUrl, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'origin': 'https://www.moneycontrol.com',
          'pragma': 'no-cache',
          'referer': 'https://www.moneycontrol.com/',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
        },
        next: { revalidate: 600 }, // Cache for 10 minutes
      });

      if (historyResponse.ok) {
        const historyData: CopperHistoricalResponse = await historyResponse.json();
        
        if (historyData && historyData.response === 200 && historyData.data) {
          // Convert object to array and process
          copperTrend = Object.entries(historyData.data)
            .map(([date, item]) => {
              const price = parseFloat(item.priceCurrent.replace(/,/g, '')); // Remove commas from price
              const perChange = parseFloat(item.perPriceChange);
              
              return {
                date: item.tranDate || date, // Use tranDate if available, otherwise use key
                price: !isNaN(price) ? price : 0,
                percentageChange: !isNaN(perChange) ? perChange : undefined,
              };
            })
            .filter((item) => item.price > 0) // Filter out invalid prices
            .sort((a, b) => {
              // Sort by date (oldest first)
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateA - dateB;
            });
          
          // Add today's price if not already in trend
          const todayDate = new Date().toISOString().split('T')[0];
          const todayInTrend = copperTrend.find((item) => item.date === todayDate);
          
          if (!todayInTrend && copper_1kg) {
            copperTrend.push({
              date: todayDate,
              price: copper_1kg,
              percentageChange: percentageChange || undefined,
            });
            
            // Re-sort after adding today
            copperTrend.sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateA - dateB;
            });
          }
          
          console.log(`Fetched ${copperTrend.length} copper trend points`);
        }
      }
    } catch (error) {
      console.warn('Error fetching copper historical data:', error);
      // Continue without historical data
    }

    return {
      copper_1kg: Math.round(copper_1kg * 100) / 100,
      copper_100g: Math.round(copper_100g * 100) / 100,
      copper_10g: Math.round(copper_10g * 100) / 100,
      copper_1g: Math.round(copper_1g * 100) / 100,
      updated_at: new Date().toISOString(),
      percentageChange: percentageChange !== null && !isNaN(percentageChange) ? percentageChange : null,
      change: change !== null && !isNaN(change) ? change : null,
      openPrice: openPrice !== null && !isNaN(openPrice) ? openPrice : null,
      highPrice: highPrice !== null && !isNaN(highPrice) ? highPrice : null,
      lowPrice: lowPrice !== null && !isNaN(lowPrice) ? lowPrice : null,
      prevClose: prevClose !== null && !isNaN(prevClose) ? prevClose : null,
      copperTrend: copperTrend && copperTrend.length > 0 ? copperTrend : undefined,
    };
  } catch (error) {
    console.error('Copper API error:', error);
    throw error;
  }
}
