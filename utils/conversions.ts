/**
 * Currency and Unit Conversion Utilities
 * Formats prices for Indian market display
 */

/**
 * Format number as Indian currency (₹)
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "₹1,23,456.78")
 */
export function formatIndianCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '—';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with Indian number system (lakhs, crores)
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "1.23 Lakh")
 */
export function formatIndianNumber(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '—';
  }

  if (amount >= 10000000) {
    // Crores
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    // Thousands
    return `₹${(amount / 1000).toFixed(2)} K`;
  }

  return formatIndianCurrency(amount);
}

/**
 * Convert grams to kilograms
 */
export function gramsToKilograms(grams: number): number {
  return grams / 1000;
}

/**
 * Convert kilograms to grams
 */
export function kilogramsToGrams(kg: number): number {
  return kg * 1000;
}

/**
 * Format city name for display (Title Case)
 */
export function formatCityName(city: string | null | undefined): string {
  if (!city) return 'India';
  return city
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
