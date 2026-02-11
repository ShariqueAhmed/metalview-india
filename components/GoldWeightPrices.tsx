/**
 * Gold Weight Prices Component
 * Displays gold prices for different weights (1gm, 10gm, 12gm/Tola, etc.)
 */

'use client';

import { useState } from 'react';
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
  const [selectedCarat, setSelectedCarat] = useState<'24k' | '22k' | '18k'>('24k');

  if (!goldPrice10g || goldPrice10g === 0) {
    return null;
  }

  // Use 1gm price if available, otherwise calculate from 10gm
  const basePrice1g_24k = goldPrice1g || goldPrice10g / 10;
  const basePrice1g_22k = gold22kPrice1g || (gold22kPrice10g ? gold22kPrice10g / 10 : null);
  const basePrice1g_18k = gold18kPrice1g || (gold18kPrice10g ? gold18kPrice10g / 10 : null);

  // Determine available carats
  const availableCarats: ('24k' | '22k' | '18k')[] = ['24k'];
  if (basePrice1g_22k) availableCarats.push('22k');
  if (basePrice1g_18k) availableCarats.push('18k');

  // Ensure selected carat is available, fallback to 24k
  const activeCarat = availableCarats.includes(selectedCarat) ? selectedCarat : '24k';

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0 shadow-md">
            <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Gold Prices by Weight
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Gold prices for different weights
            </p>
          </div>
        </div>
        
        {/* Carat Selector Dropdown */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2.5 border border-slate-200 dark:border-slate-700">
          <label htmlFor="carat-selector" className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            Carat:
          </label>
          <select
            id="carat-selector"
            value={activeCarat}
            onChange={(e) => {
              setSelectedCarat(e.target.value as '18k' | '22k' | '24k');
            }}
            className="px-4 py-2 text-sm font-semibold bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm hover:shadow-md cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-right pr-10"
            style={{
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25em 1.25em',
            }}
          >
            <option value="24k">24K (Purest)</option>
            {basePrice1g_22k && <option value="22k">22K (Jewelry)</option>}
            {basePrice1g_18k && <option value="18k">18K (Jewelry)</option>}
          </select>
        </div>
      </div>

      {/* Table View - Mobile & Desktop */}
      <div className="w-full overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 min-w-full">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-b-2 border-amber-200 dark:border-amber-800">
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '40%' }}>
                  Weight
                </th>
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '20%' }}>
                  Unit
                </th>
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" style={{ width: '40%' }}>
                  <span className="inline-flex items-center gap-1 sm:gap-2">
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ring-1 sm:ring-2 ${
                      activeCarat === '24k' 
                        ? 'bg-amber-500 ring-amber-200 dark:ring-amber-800'
                        : activeCarat === '22k'
                        ? 'bg-slate-500 ring-slate-200 dark:ring-slate-700'
                        : 'bg-slate-400 ring-slate-200 dark:ring-slate-700'
                    }`}></span>
                    <span className="whitespace-nowrap">{activeCarat.toUpperCase()}</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
              {weightOptions.map((option, index) => {
                const price = calculatePrice(option.weight, activeCarat);
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
                        {formatIndianCurrency(price)}
                      </span>
                    </td>
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
