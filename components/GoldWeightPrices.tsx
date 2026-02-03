/**
 * Gold Weight Prices Component
 * Displays gold prices for different weights (1gm, 10gm, 12gm/Tola, etc.)
 */

'use client';

import { Award } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';

interface GoldWeightPricesProps {
  goldPrice10g: number | null;
  goldPrice1g?: number | null; // Optional: if provided, use this for more accurate calculations
  gold22kPrice10g?: number | null;
  gold22kPrice1g?: number | null;
}

interface WeightOption {
  weight: number;
  label: string;
  unit: string;
  description?: string;
}

const weightOptions: WeightOption[] = [
  { weight: 1, label: '1 gram', unit: '1gm' },
  { weight: 10, label: '10 grams', unit: '10gm' },
  { weight: 12, label: '1 Tola', unit: '12gm', description: 'Traditional unit' },
  { weight: 25, label: '25 grams', unit: '25gm' },
  { weight: 50, label: '50 grams', unit: '50gm' },
  { weight: 75, label: '75 grams', unit: '75gm' },
  { weight: 100, label: '100 grams', unit: '100gm' },
];

export default function GoldWeightPrices({ 
  goldPrice10g, 
  goldPrice1g,
  gold22kPrice10g,
  gold22kPrice1g 
}: GoldWeightPricesProps) {
  if (!goldPrice10g || goldPrice10g === 0) {
    return null;
  }

  // Use 1gm price if available, otherwise calculate from 10gm
  const basePrice1g_24k = goldPrice1g || goldPrice10g / 10;
  const basePrice1g_22k = gold22kPrice1g || (gold22kPrice10g ? gold22kPrice10g / 10 : null);

  const calculatePrice = (weight: number, is22k: boolean = false): number => {
    const basePrice = is22k && basePrice1g_22k ? basePrice1g_22k : basePrice1g_24k;
    return basePrice * weight;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 mb-8 sm:mb-12">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center border border-amber-200 dark:border-amber-800 flex-shrink-0">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Gold Prices by Weight
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            24 Karat & 22 Karat Gold prices for different weights
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="hidden sm:inline">24K Gold Price</span>
                  <span className="sm:hidden">24K</span>
                </span>
              </th>
              {basePrice1g_22k && (
                <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="hidden sm:inline">22K Gold Price</span>
                    <span className="sm:hidden">22K</span>
                  </span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {weightOptions.map((option, index) => {
              const price24k = calculatePrice(option.weight, false);
              const price22k = basePrice1g_22k ? calculatePrice(option.weight, true) : null;
              const isTola = option.weight === 12;
              const isEven = index % 2 === 0;

              return (
                <tr
                  key={option.weight}
                  className={`transition-colors ${
                    isTola
                      ? 'bg-amber-50 dark:bg-amber-900/20'
                      : isEven
                      ? 'bg-gray-50/50 dark:bg-gray-800/30'
                      : 'bg-white dark:bg-gray-900'
                  } hover:bg-gray-100 dark:hover:bg-gray-800/50`}
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {isTola && (
                        <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 dark:bg-yellow-400 rounded-full text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
                          ⭐
                        </span>
                      )}
                      <span className={`font-medium text-sm sm:text-base ${isTola ? 'text-yellow-900 dark:text-yellow-100' : 'text-gray-900 dark:text-white'}`}>
                        {option.label}
                      </span>
                      {isTola && (
                        <span className="px-1.5 sm:px-2 py-0.5 bg-yellow-100 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200 text-[10px] sm:text-xs font-medium rounded-full">
                          Traditional
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{option.unit}</span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                    <span className={`font-semibold text-sm sm:text-base ${isTola ? 'text-yellow-800 dark:text-yellow-200 sm:text-lg' : 'text-gray-900 dark:text-white'}`}>
                      {formatIndianCurrency(price24k)}
                    </span>
                  </td>
                  {basePrice1g_22k && (
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                      <span className={`font-semibold text-sm sm:text-base ${isTola ? 'text-amber-800 dark:text-amber-200 sm:text-lg' : 'text-gray-900 dark:text-white'}`}>
                        {formatIndianCurrency(price22k!)}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        * 24K gold is 99.9% pure. 22K gold is 91.6% pure (ideal for jewelry). Prices may vary based on location.
      </p>
    </div>
  );
}
