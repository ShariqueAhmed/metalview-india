'use client';

import { Coins } from 'lucide-react';
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
  { weight: 8, label: '8 grams', unit: '8gm' },
  { weight: 10, label: '10 grams', unit: '10gm' },
  { weight: 12, label: '1 Tola', unit: '12gm', description: 'Traditional unit' },
  { weight: 25, label: '25 grams', unit: '25gm' },
  { weight: 50, label: '50 grams', unit: '50gm' },
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

  // Use 1gm price if available for more accurate calculations, otherwise calculate from 10gm
  const basePrice1g_24k = goldPrice1g || (goldPrice10g / 10);
  const basePrice1g_22k = gold22kPrice1g || (gold22kPrice10g ? gold22kPrice10g / 10 : null);

  const calculatePrice = (weight: number, is22k: boolean = false): number => {
    const basePrice = is22k && basePrice1g_22k ? basePrice1g_22k : basePrice1g_24k;
    return basePrice * weight;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Gold Prices by Weight
        </h2>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Prices for different gold weights (24K & 22K)
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 dark:from-yellow-600 dark:via-amber-600 dark:to-yellow-600">
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-200 rounded-full"></span>
                  24K Gold Price
                </span>
              </th>
              {basePrice1g_22k && (
                <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                    22K Gold Price
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
                  className={`transition-all duration-200 ${
                    isTola 
                      ? 'bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 shadow-sm' 
                      : isEven
                      ? 'bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {isTola && (
                        <span className="flex items-center justify-center w-6 h-6 bg-yellow-500 dark:bg-yellow-400 rounded-full text-white text-xs font-bold">
                          ⭐
                        </span>
                      )}
                      <span className={`font-semibold ${
                        isTola 
                          ? 'text-yellow-900 dark:text-yellow-100 text-base' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.label}
                      </span>
                      {isTola && (
                        <span className="px-2 py-0.5 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                          Traditional
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {option.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`font-bold ${
                      isTola 
                        ? 'text-yellow-800 dark:text-yellow-200 text-xl' 
                        : 'text-yellow-700 dark:text-yellow-300 text-lg'
                    }`}>
                      {formatIndianCurrency(price24k)}
                    </span>
                  </td>
                  {basePrice1g_22k && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`font-bold ${
                        isTola 
                          ? 'text-amber-800 dark:text-amber-200 text-xl' 
                          : 'text-amber-700 dark:text-amber-300 text-lg'
                      }`}>
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
        * Prices are for 24 karat gold. Prices may vary based on purity and location.
      </p>
    </div>
  );
}
