/**
 * Conversion utilities for metal prices
 * 
 * All metals are priced in USD per troy ounce from the API
 * We convert to Indian Rupees and appropriate units
 */

// 1 troy ounce = 31.1035 grams
const TROY_OUNCE_TO_GRAMS = 31.1035;

/**
 * Convert gold price from USD/oz to ₹/10g
 * @param usdPerOunce - Price in USD per troy ounce
 * @param usdInr - USD to INR exchange rate
 * @returns Price in ₹ per 10 grams
 */
export function convertGoldToRupeesPer10g(usdPerOunce: number, usdInr: number): number {
  // Convert to ₹/gram, then multiply by 10
  const rupeesPerGram = (usdPerOunce * usdInr) / TROY_OUNCE_TO_GRAMS;
  return rupeesPerGram * 10;
}

/**
 * Convert silver price from USD/oz to ₹/kg
 * @param usdPerOunce - Price in USD per troy ounce
 * @param usdInr - USD to INR exchange rate
 * @returns Price in ₹ per kilogram
 */
export function convertSilverToRupeesPerKg(usdPerOunce: number, usdInr: number): number {
  // Convert to ₹/gram, then multiply by 1000
  const rupeesPerGram = (usdPerOunce * usdInr) / TROY_OUNCE_TO_GRAMS;
  return rupeesPerGram * 1000;
}

/**
 * Convert industrial metal price from USD/oz to ₹/metric ton
 * @param usdPerOunce - Price in USD per troy ounce
 * @param usdInr - USD to INR exchange rate
 * @returns Price in ₹ per metric ton
 */
export function convertIndustrialMetalToRupeesPerTon(usdPerOunce: number, usdInr: number): number {
  // Convert to ₹/gram, then multiply by 1,000,000 (1 metric ton = 1,000,000 grams)
  const rupeesPerGram = (usdPerOunce * usdInr) / TROY_OUNCE_TO_GRAMS;
  return rupeesPerGram * 1_000_000;
}

/**
 * Format currency with Indian number formatting
 * @param amount - Amount to format
 * @returns Formatted string with ₹ symbol and Indian number format
 */
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format timestamp to readable string
 * @param timestamp - ISO timestamp string
 * @returns Formatted date-time string
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}
