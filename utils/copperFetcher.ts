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

/** Build list of expiry dates to try (MCX: often month-end or last Thu) */
function getExpiryDatesToTry(): string[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const dates: string[] = [];
  for (let m = 0; m <= 2; m++) {
    const d = new Date(year, month + m + 1, 0); // last day of month
    const lastDay = d.getDate();
    const ym = `${year}-${String(month + m + 1).padStart(2, '0')}`;
    dates.push(`${ym}-${String(lastDay).padStart(2, '0')}`);
    if (lastDay >= 27) {
      dates.push(`${ym}-27`);
      dates.push(`${ym}-28`);
    }
  }
  return Array.from(new Set(dates));
}

/**
 * Fetches copper prices from MoneyControl API (live), with fallback from historical trend API
 * @returns Normalized copper price data
 */
export async function fetchCopperPrices(): Promise<CopperData> {
  const expiryDates = getExpiryDatesToTry();

  // 1) Try live price API with multiple expiry dates
  let data: CopperApiResponse | null = null;
  let lastError: Error | null = null;

  // Also try without expiry (some APIs return front-month by default)
  const urlsToTry = [
    ...expiryDates.map((expiry) => `https://priceapi.moneycontrol.com/pricefeed/mcx/commodityfutures/COPPER?expiry=${expiry}`),
    'https://priceapi.moneycontrol.com/pricefeed/mcx/commodityfutures/COPPER',
  ];

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'origin': 'https://www.moneycontrol.com',
          'pragma': 'no-cache',
          'referer': 'https://www.moneycontrol.com/',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        next: { revalidate: 600 },
      });

      if (!response.ok) continue;

      const raw = await response.json();
      const code = raw?.code;
      const ok = code === '200' || code === 200;
      const responseData = raw?.data;
      const priceStr = responseData?.lastPrice ?? responseData?.avgPrice ?? responseData?.bidPrice ?? responseData?.askPrice;
      if (ok && responseData && priceStr && !Number.isNaN(parseFloat(String(priceStr)))) {
        data = raw as CopperApiResponse;
        if (!data.data.lastPrice && priceStr) data.data.lastPrice = String(priceStr);
        break;
      }
    } catch (error) {
      lastError = error as Error;
    }
  }

  // 2) Fallback: get latest price from historical trend API
  let copper_1kg: number;
  let percentageChange: number | null = null;
  let copperTrend: CopperTrendPoint[] | undefined;
  let change: number | null = null;
  let openPrice: number | null = null;
  let highPrice: number | null = null;
  let lowPrice: number | null = null;
  let prevClose: number | null = null;

  if (data?.data?.lastPrice) {
    copper_1kg = parseFloat(data.data.lastPrice);
    percentageChange = parseFloat(data.data.perChange) || null;
    change = parseFloat(data.data.change) || null;
    openPrice = parseFloat(data.data.openPrice) || null;
    highPrice = parseFloat(data.data.highPrice) || null;
    lowPrice = parseFloat(data.data.lowPrice) || null;
    prevClose = parseFloat(data.data.prevClose) || null;
  } else {
    const fallback = await fetchCopperFromHistoricalApi();
    if (fallback) {
      copper_1kg = fallback.price;
      copperTrend = fallback.trend;
      percentageChange = fallback.percentageChange ?? null;
    } else {
      throw lastError || new Error('Could not fetch copper prices from MoneyControl');
    }
  }

  if (typeof copper_1kg !== 'number' || Number.isNaN(copper_1kg) || copper_1kg <= 0) {
    throw lastError || new Error('Invalid copper price from API');
  }

  const copper_100g = copper_1kg / 10;
  const copper_10g = copper_1kg / 100;
  const copper_1g = copper_1kg / 1000;

  // Fetch historical trend if not already from fallback
  if (!copperTrend) {
    const trendResult = await fetchCopperHistoricalTrend(copper_1kg, percentageChange);
    copperTrend = trendResult;
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
}

const MONEYCONTROL_HEADERS = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  'origin': 'https://www.moneycontrol.com',
  'pragma': 'no-cache',
  'referer': 'https://www.moneycontrol.com/',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

/** Fallback: get latest copper price from historical trend API when live API fails */
async function fetchCopperFromHistoricalApi(): Promise<{ price: number; trend?: CopperTrendPoint[]; percentageChange?: number | null } | null> {
  try {
    const historyUrl = 'https://priceapi.moneycontrol.com/technicalCompanyData/commodity/getHistoricalTrend?type=FUTCOM&symbol=COPPER&exchange=MCX&expiry=ALLEXPIRY&deviceType=W';
    const res = await fetch(historyUrl, { headers: MONEYCONTROL_HEADERS, next: { revalidate: 600 } });
    if (!res.ok) return null;
    const json: CopperHistoricalResponse = await res.json();
    if (json?.response !== 200 || !json?.data || typeof json.data !== 'object') return null;
    const entries = Object.entries(json.data)
      .map(([date, item]) => {
        const price = parseFloat(String(item.priceCurrent).replace(/,/g, ''));
        const perChange = parseFloat(String(item.perPriceChange));
        return {
          date: item.tranDate || date,
          price: !isNaN(price) ? price : 0,
          percentageChange: !isNaN(perChange) ? perChange : undefined,
        } as CopperTrendPoint;
      })
      .filter((item) => item.price > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (entries.length === 0) return null;
    const latest = entries[entries.length - 1];
    if (!latest) return null;
    return { price: latest.price, trend: entries, percentageChange: latest.percentageChange ?? null };
  } catch {
    return null;
  }
}

/** Fetch historical trend (for charts). Uses existing copper_1kg to add today if missing. */
async function fetchCopperHistoricalTrend(
  currentPriceKg: number,
  currentPercentageChange: number | null
): Promise<CopperTrendPoint[] | undefined> {
  try {
    const historyUrl = 'https://priceapi.moneycontrol.com/technicalCompanyData/commodity/getHistoricalTrend?type=FUTCOM&symbol=COPPER&exchange=MCX&expiry=ALLEXPIRY&deviceType=W';
    const res = await fetch(historyUrl, { headers: MONEYCONTROL_HEADERS, next: { revalidate: 600 } });
    if (!res.ok) return undefined;
    const json: CopperHistoricalResponse = await res.json();
    if (json?.response !== 200 || !json?.data || typeof json.data !== 'object') return undefined;
    let trend = Object.entries(json.data)
      .map(([date, item]) => {
        const price = parseFloat(String(item.priceCurrent).replace(/,/g, ''));
        const perChange = parseFloat(String(item.perPriceChange));
        return {
          date: item.tranDate || date,
          price: !isNaN(price) ? price : 0,
          percentageChange: !isNaN(perChange) ? perChange : undefined,
        } as CopperTrendPoint;
      })
      .filter((item) => item.price > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const todayStr = new Date().toISOString().split('T')[0] || '';
    if (trend.length > 0 && !trend.some((t) => t.date === todayStr)) {
      trend = [...trend, { date: todayStr, price: currentPriceKg, percentageChange: currentPercentageChange ?? undefined }];
      trend.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return trend.length > 0 ? trend : undefined;
  } catch {
    return undefined;
  }
}
