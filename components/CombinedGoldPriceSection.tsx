/**
 * Combined Gold Price Section Component
 * Displays 24K, 22K, and 18K gold prices in a single compact section
 */

'use client';

import { memo } from 'react';
import { Award } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CombinedGoldPriceSectionProps {
  gold24k_10g: number | null;
  gold22k_10g: number | null;
  gold18k_10g: number | null;
  gold24k_1g?: number | null;
  gold22k_1g?: number | null;
  gold18k_1g?: number | null;
  gold24k_difference?: string | null;
  gold22k_difference?: string | null;
  gold18k_difference?: string | null;
  gold24k_percentage?: string | null;
  gold22k_percentage?: string | null;
  gold18k_percentage?: string | null;
}

function CombinedGoldPriceSection({
  gold24k_10g,
  gold22k_10g,
  gold18k_10g,
  gold24k_1g,
  gold22k_1g,
  gold18k_1g,
  gold24k_difference,
  gold22k_difference,
  gold18k_difference,
  gold24k_percentage,
  gold22k_percentage,
  gold18k_percentage,
}: CombinedGoldPriceSectionProps) {
  
  const getTrendIndicator = (difference: string | null | undefined, percentage: string | null | undefined) => {
    const value = difference || percentage;
    if (!value) return null;
    
    if (value.startsWith('+')) {
      return (
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 rounded" role="img" aria-label="Price increased">
          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        </div>
      );
    } else if (value.startsWith('-')) {
      return (
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 dark:bg-red-950/30 rounded" role="img" aria-label="Price decreased">
          <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" aria-hidden="true" />
        </div>
      );
    }
    return null;
  };

  const getPriceChangeDisplay = (difference: string | null | undefined, percentage: string | null | undefined) => {
    if (percentage) {
      return (
        <span className={`text-xs font-semibold ${percentage.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : percentage.startsWith('-') ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
          {percentage}
        </span>
      );
    }
    if (difference) {
      const absValue = difference.startsWith('+') || difference.startsWith('-') ? difference.substring(1) : difference;
      return (
        <span className={`text-xs font-semibold ${difference.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : difference.startsWith('-') ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
          ₹{absValue}/g
        </span>
      );
    }
    return null;
  };

  const goldData = [
    {
      carat: '24K',
      label: '24K (Purest)',
      price10g: gold24k_10g,
      price1g: gold24k_1g || (gold24k_10g ? gold24k_10g / 10 : null),
      difference: gold24k_difference,
      percentage: gold24k_percentage,
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-900 dark:text-amber-100',
      iconBg: 'bg-slate-900 dark:bg-slate-50',
    },
    {
      carat: '22K',
      label: '22K (Jewelry)',
      price10g: gold22k_10g,
      price1g: gold22k_1g || (gold22k_10g ? gold22k_10g / 10 : null),
      difference: gold22k_difference,
      percentage: gold22k_percentage,
      bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-800',
      borderColor: 'border-slate-200 dark:border-slate-700',
      textColor: 'text-slate-900 dark:text-slate-50',
      iconBg: 'bg-slate-700 dark:bg-slate-300',
    },
    {
      carat: '18K',
      label: '18K (Jewelry)',
      price10g: gold18k_10g,
      price1g: gold18k_1g || (gold18k_10g ? gold18k_10g / 10 : null),
      difference: gold18k_difference,
      percentage: gold18k_percentage,
      bgColor: 'bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-slate-900',
      borderColor: 'border-slate-300 dark:border-slate-600',
      textColor: 'text-slate-800 dark:text-slate-200',
      iconBg: 'bg-slate-600 dark:bg-slate-400',
    },
  ];

  const hasAnyData = gold24k_10g !== null || gold22k_10g !== null || gold18k_10g !== null;

  if (!hasAnyData) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 card-shadow opacity-60">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
            <Award className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Gold Prices
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Data unavailable</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-4 sm:p-5 card-shadow hover:card-shadow-hover transition-all duration-200 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 dark:bg-amber-800/10 rounded-full -mr-16 -mt-16"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0 shadow-md">
            <Award className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 tracking-tight">
              Gold Prices
            </h3>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              24K, 22K & 18K Gold rates per gram
            </p>
          </div>
        </div>

        {/* Gold Prices Table */}
        <div className="space-y-2.5">
          {goldData.map((gold) => (
            <div
              key={gold.carat}
              className={`${gold.bgColor} rounded-lg border-2 ${gold.borderColor} p-3 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`${gold.iconBg} p-1.5 rounded-lg flex-shrink-0`}>
                    <Award className="w-3.5 h-3.5 text-white dark:text-slate-900" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${gold.textColor} tracking-tight`}>
                      {gold.label}
                    </h4>
                  </div>
                </div>
                {getTrendIndicator(gold.difference, gold.percentage)}
              </div>

              {gold.price10g !== null ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* 1g Price */}
                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-md p-2 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                      1g
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${gold.textColor} tracking-tight break-words overflow-hidden`}>
                      {formatIndianCurrency(gold.price1g || gold.price10g / 10)}
                    </p>
                  </div>

                  {/* 10g Price */}
                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-md p-2 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                      10g
                    </p>
                    <p className={`text-base sm:text-lg font-bold ${gold.textColor} tracking-tight break-words overflow-hidden`}>
                      {formatIndianCurrency(gold.price10g)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500">—</p>
                </div>
              )}

              {/* Price Change - Compact */}
              {(gold.difference || gold.percentage) && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Change
                    </span>
                    {getPriceChangeDisplay(gold.difference, gold.percentage)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CombinedGoldPriceSection, (prevProps, nextProps) => {
  return (
    prevProps.gold24k_10g === nextProps.gold24k_10g &&
    prevProps.gold22k_10g === nextProps.gold22k_10g &&
    prevProps.gold18k_10g === nextProps.gold18k_10g &&
    prevProps.gold24k_difference === nextProps.gold24k_difference &&
    prevProps.gold22k_difference === nextProps.gold22k_difference &&
    prevProps.gold18k_difference === nextProps.gold18k_difference &&
    prevProps.gold24k_percentage === nextProps.gold24k_percentage &&
    prevProps.gold22k_percentage === nextProps.gold22k_percentage &&
    prevProps.gold18k_percentage === nextProps.gold18k_percentage
  );
});
