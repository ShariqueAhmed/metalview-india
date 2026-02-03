/**
 * Silver Price Section Component
 * Displays silver prices for 1g, 10g, and 1kg in a single card
 */

'use client';

import { DollarSign } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SilverPriceSectionProps {
  price1g: number | null;
  price10g: number | null;
  price1kg: number | null;
  previousPrice1g?: number | null;
  previousPrice10g?: number | null;
  previousPrice1kg?: number | null;
  percentageChange?: number | null;
}

export default function SilverPriceSection({
  price1g,
  price10g,
  price1kg,
  previousPrice1g,
  previousPrice10g,
  previousPrice1kg,
  percentageChange,
}: SilverPriceSectionProps) {
  const getCardBg = () => {
    return 'bg-white dark:bg-slate-900';
  };

  const getIconBg = () => {
    return 'bg-slate-700 dark:bg-slate-300';
  };

  const getTrendIndicator = () => {
    let trend: 'up' | 'down' | 'neutral' | null = null;
    
    if (percentageChange !== null && percentageChange !== undefined) {
      if (percentageChange > 0) trend = 'up';
      else if (percentageChange < 0) trend = 'down';
      else trend = 'neutral';
    } else if (previousPrice1g && price1g) {
      if (price1g > previousPrice1g) trend = 'up';
      else if (price1g < previousPrice1g) trend = 'down';
      else trend = 'neutral';
    }

    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-950/30 rounded">
          <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
          <Minus className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </div>
      );
    }
  };

  const getPercentageChange = () => {
    // Prioritize percentageChange from API response
    if (percentageChange !== null && percentageChange !== undefined) {
      return percentageChange;
    } else if (previousPrice1g && price1g && previousPrice1g !== 0) {
      return ((price1g - previousPrice1g) / previousPrice1g) * 100;
    }
    return null;
  };

  const change = getPercentageChange();
  
  // Show percentage change even if it's 0 (not null)
  const shouldShowChange = change !== null && change !== undefined;

  if (price1g === null && price10g === null && price1kg === null) {
    return (
      <div className={`${getCardBg()} rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow opacity-60`}>
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0`}>
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight">
                Silver
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <p className="text-2xl font-bold text-gray-400">—</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getCardBg()} rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow hover:card-shadow-hover transition-shadow duration-200`}>
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-2.5 rounded-md flex-shrink-0`}>
              <DollarSign className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                Silver
              </h3>
              <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-0.5">
                Live silver pricing
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getTrendIndicator()}
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
          {/* 1g Price */}
          {price1g !== null && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  1 gram
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                  {formatIndianCurrency(price1g)}
                </p>
              </div>
            </div>
          )}

          {/* 10g Price */}
          {price10g !== null && (
            <div className={`flex items-center justify-between ${price1g !== null ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : ''}`}>
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  10 grams
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                  {formatIndianCurrency(price10g)}
                </p>
              </div>
            </div>
          )}

          {/* 1kg Price */}
          {price1kg !== null && (
            <div className={`flex items-center justify-between ${(price1g !== null || price10g !== null) ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : ''}`}>
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  1 kilogram
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                  {formatIndianCurrency(price1kg)}
                </p>
              </div>
            </div>
          )}

          {/* Percentage Change */}
          {shouldShowChange && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Change (24h)
              </span>
              {change > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded text-xs font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{Math.abs(change).toFixed(2)}%
                </span>
              ) : change < 0 ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded text-xs font-medium">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {change.toFixed(2)}%
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">
                  <Minus className="w-3.5 h-3.5" />
                  0.00%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
