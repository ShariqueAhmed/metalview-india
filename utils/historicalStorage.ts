/**
 * Historical price storage utility
 * Stores gold prices over time for chart display
 */

interface HistoricalPrice {
  date: string; // ISO date string (YYYY-MM-DD)
  gold_10g: number;
  timestamp: string; // ISO timestamp
}

// In-memory storage for historical prices
// In production, this could be replaced with a database
let historicalData: HistoricalPrice[] = [];

// Maximum number of days to store (30 days)
const MAX_HISTORICAL_DAYS = 30;

// Track if we've initialized sample data
let sampleDataInitialized = false;

/**
 * Generate sample historical data for demonstration
 */
function generateSampleData(currentPrice: number): void {
  if (sampleDataInitialized) return;
  
  const today = new Date();
  const sampleData: HistoricalPrice[] = [];
  
  // Generate data for the last 7 days with slight variations
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const isoString = date.toISOString();
    const splitResult = isoString.split('T');
    const fallbackIso = new Date().toISOString();
    const fallbackSplit = fallbackIso.split('T');
    const dateStr: string = (splitResult[0] ?? fallbackSplit[0] ?? '');
    
    // Generate price with slight random variation (±2%)
    const variation = (Math.random() - 0.5) * 0.04; // ±2%
    const price = currentPrice * (1 + variation);
    
    sampleData.push({
      date: dateStr,
      gold_10g: Math.round(price * 100) / 100,
      timestamp: date.toISOString(),
    });
  }
  
  historicalData = sampleData;
  sampleDataInitialized = true;
}

/**
 * Store a new price point
 */
export function storePrice(gold_10g: number): void {
  const now = new Date();
  const dateSplit = now.toISOString().split('T');
  const date: string = dateSplit[0] || ''; // YYYY-MM-DD
  const timestamp = now.toISOString();

  // Initialize sample data if we don't have enough data points
  if (historicalData.length < 7) {
    generateSampleData(gold_10g);
    // Update today's price with the actual current price
    const todayIndex = historicalData.findIndex((entry) => entry.date === date);
    if (todayIndex >= 0) {
      historicalData[todayIndex] = {
        date,
        gold_10g,
        timestamp,
      };
    } else {
      historicalData.push({
        date,
        gold_10g,
        timestamp,
      });
    }
  } else {
    // Check if we already have data for today
    const todayIndex = historicalData.findIndex(
      (entry) => entry.date === date
    );

    if (todayIndex >= 0) {
      // Update existing entry for today
      historicalData[todayIndex] = {
        date,
        gold_10g,
        timestamp,
      };
    } else {
      // Add new entry
      historicalData.push({
        date,
        gold_10g,
        timestamp,
      });
    }
  }

  // Sort by date (oldest first)
  historicalData.sort((a, b) => a.date.localeCompare(b.date));

  // Keep only last MAX_HISTORICAL_DAYS
  if (historicalData.length > MAX_HISTORICAL_DAYS) {
    historicalData = historicalData.slice(-MAX_HISTORICAL_DAYS);
  }
}

/**
 * Get historical prices for a date range
 */
export function getHistoricalPrices(days: number = 30): HistoricalPrice[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return historicalData.filter(
    (entry) => new Date(entry.date) >= cutoffDate
  );
}

/**
 * Get all historical prices
 */
export function getAllHistoricalPrices(): HistoricalPrice[] {
  return [...historicalData];
}

/**
 * Clear historical data (useful for testing)
 */
export function clearHistoricalData(): void {
  historicalData = [];
}
