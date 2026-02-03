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
    <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-8 sm:mb-12 card-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0 shadow-md">
          <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Gold Prices by Weight
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            24 Karat & 22 Karat Gold prices for different weights
          </p>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {weightOptions.map((option) => {
          const price24k = calculatePrice(option.weight, false);
          const price22k = basePrice1g_22k ? calculatePrice(option.weight, true) : null;
          const isTola = option.weight === 12;

          return (
            <div
              key={option.weight}
              className={`rounded-lg border-2 p-4 ${
                isTola
                  ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isTola && (
                    <span className="flex items-center justify-center w-7 h-7 bg-amber-500 dark:bg-amber-400 rounded-full text-white text-xs font-bold flex-shrink-0 shadow-md">
                      ⭐
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-base ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'}`}>
                        {option.label}
                      </span>
                      {isTola && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-[10px] font-semibold rounded-full border border-amber-200 dark:border-amber-800">
                          Traditional
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                      {option.unit}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900/50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">24K</span>
                  </div>
                  <span className={`font-bold text-base ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'}`}>
                    {formatIndianCurrency(price24k)}
                  </span>
                </div>
                
                {basePrice1g_22k && (
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-slate-500 rounded-full"></span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">22K</span>
                    </div>
                    <span className={`font-bold text-base ${isTola ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-50'}`}>
                      {formatIndianCurrency(price22k!)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-b-2 border-amber-200 dark:border-amber-800">
              <th className="px-4 lg:px-6 py-3.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-4 lg:px-6 py-3.5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 bg-amber-500 rounded-full ring-2 ring-amber-200 dark:ring-amber-800"></span>
                  <span>24K Gold Price</span>
                </span>
              </th>
              {basePrice1g_22k && (
                <th className="px-4 lg:px-6 py-3.5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 bg-slate-500 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"></span>
                    <span>22K Gold Price</span>
                  </span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
            {weightOptions.map((option, index) => {
              const price24k = calculatePrice(option.weight, false);
              const price22k = basePrice1g_22k ? calculatePrice(option.weight, true) : null;
              const isTola = option.weight === 12;
              const isEven = index % 2 === 0;

              return (
                <tr
                  key={option.weight}
                  className={`transition-all ${
                    isTola
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-l-4 border-amber-400 dark:border-amber-600'
                      : isEven
                      ? 'bg-slate-50/50 dark:bg-slate-800/30'
                      : 'bg-white dark:bg-slate-900'
                  } hover:bg-amber-50/50 dark:hover:bg-amber-950/20`}
                >
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      {isTola && (
                        <span className="flex items-center justify-center w-7 h-7 bg-amber-500 dark:bg-amber-400 rounded-full text-white text-xs font-bold flex-shrink-0 shadow-md">
                          ⭐
                        </span>
                      )}
                      <div>
                        <span className={`font-semibold text-base ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'}`}>
                          {option.label}
                        </span>
                        {isTola && (
                          <span className="ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-800">
                            Traditional
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{option.unit}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right">
                    <span className={`font-bold text-base ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'}`}>
                      {formatIndianCurrency(price24k)}
                    </span>
                  </td>
                  {basePrice1g_22k && (
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right">
                      <span className={`font-bold text-base ${isTola ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-50'}`}>
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

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
          * 24K gold is 99.9% pure. 22K gold is 91.6% pure (ideal for jewelry). Prices may vary based on location.
        </p>
      </div>
    </div>
  );
}
