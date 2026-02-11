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
  gold18kPrice10g?: number | null;
  gold18kPrice1g?: number | null;
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
  gold22kPrice1g,
  gold18kPrice10g,
  gold18kPrice1g
}: GoldWeightPricesProps) {
  if (!goldPrice10g || goldPrice10g === 0) {
    return null;
  }

  // Use 1gm price if available, otherwise calculate from 10gm
  const basePrice1g_24k = goldPrice1g || goldPrice10g / 10;
  const basePrice1g_22k = gold22kPrice1g || (gold22kPrice10g ? gold22kPrice10g / 10 : null);
  const basePrice1g_18k = gold18kPrice1g || (gold18kPrice10g ? gold18kPrice10g / 10 : null);

  const calculatePrice = (weight: number, carat: '24k' | '22k' | '18k' = '24k'): number => {
    let basePrice = basePrice1g_24k;
    if (carat === '22k' && basePrice1g_22k) {
      basePrice = basePrice1g_22k;
    } else if (carat === '18k' && basePrice1g_18k) {
      basePrice = basePrice1g_18k;
    }
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
            24K, 22K & 18K Gold prices for different weights
          </p>
        </div>
      </div>

      {/* Table View - Mobile & Desktop */}
      <div className="w-full overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 min-w-full">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-b-2 border-amber-200 dark:border-amber-800">
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '25%' }}>
                  Weight
                </th>
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '12%' }}>
                  Unit
                </th>
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '21%' }}>
                  <span className="inline-flex items-center gap-1 sm:gap-2">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full ring-1 sm:ring-2 ring-amber-200 dark:ring-amber-800"></span>
                    <span className="whitespace-nowrap">24K</span>
                  </span>
                </th>
                {basePrice1g_22k && (
                  <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '21%' }}>
                    <span className="inline-flex items-center gap-1 sm:gap-2">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-500 rounded-full ring-1 sm:ring-2 ring-slate-200 dark:ring-slate-700"></span>
                      <span className="whitespace-nowrap">22K</span>
                    </span>
                  </th>
                )}
                {basePrice1g_18k && (
                  <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '21%' }}>
                    <span className="inline-flex items-center gap-1 sm:gap-2">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-400 rounded-full ring-1 sm:ring-2 ring-slate-200 dark:ring-slate-700"></span>
                      <span className="whitespace-nowrap">18K</span>
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
              {weightOptions.map((option, index) => {
                const price24k = calculatePrice(option.weight, '24k');
                const price22k = basePrice1g_22k ? calculatePrice(option.weight, '22k') : null;
                const price18k = basePrice1g_18k ? calculatePrice(option.weight, '18k') : null;
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
                    <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3.5">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {isTola && (
                          <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-amber-500 dark:bg-amber-400 rounded-full text-white text-[9px] sm:text-[10px] font-bold flex-shrink-0 shadow-md">
                            ⭐
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                            <span className={`font-semibold text-xs sm:text-sm ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'} break-words`}>
                              {option.label}
                            </span>
                            {isTola && (
                              <span className="px-1 sm:px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-[9px] sm:text-[10px] font-semibold rounded-full border border-amber-200 dark:border-amber-800 whitespace-nowrap">
                                Traditional
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3.5">
                      <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">{option.unit}</span>
                    </td>
                    <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3.5 text-right">
                      <span className={`font-bold text-xs sm:text-sm ${isTola ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-slate-50'} whitespace-nowrap`}>
                        {formatIndianCurrency(price24k)}
                      </span>
                    </td>
                    {basePrice1g_22k && (
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3.5 text-right">
                        <span className={`font-bold text-xs sm:text-sm ${isTola ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-50'} whitespace-nowrap`}>
                          {formatIndianCurrency(price22k!)}
                        </span>
                      </td>
                    )}
                    {basePrice1g_18k && (
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3.5 text-right">
                        <span className={`font-bold text-xs sm:text-sm ${isTola ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-50'} whitespace-nowrap`}>
                          {formatIndianCurrency(price18k!)}
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
          * 24K gold is 99.9% pure. 22K gold is 91.6% pure. 18K gold is 75% pure (jewelry grade). Prices may vary based on location.
      </p>
      </div>
    </div>
  );
}
