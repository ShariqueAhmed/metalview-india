/**
 * Silver Price Section Component
 * Displays silver prices for 1g, 10g, and 1kg in a single card
 */

'use client';

import { memo } from 'react';
import { DollarSign } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SilverPriceSectionProps {
  price1kg: number | null;
  price1g?: number | null;
  previousPrice1kg?: number | null;
  percentageChange?: number | null;
}

function SilverPriceSection({
  price1kg,
  price1g,
  previousPrice1kg,
  percentageChange,
}: SilverPriceSectionProps) {
  const perGram = price1g != null && typeof price1g === 'number' && !isNaN(price1g)
    ? price1g
    : price1kg != null && typeof price1kg === 'number' && !isNaN(price1kg)
      ? price1kg / 1000
      : null;
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
    } else if (previousPrice1kg && price1kg) {
      if (price1kg > previousPrice1kg) trend = 'up';
      else if (price1kg < previousPrice1kg) trend = 'down';
      else trend = 'neutral';
    }

    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded" role="img" aria-label="Price increased">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-950/30 rounded" role="img" aria-label="Price decreased">
          <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" aria-hidden="true" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded" role="img" aria-label="Price unchanged">
          <Minus className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
        </div>
      );
    }
  };

  const getPercentageChange = () => {
    // Prioritize percentageChange from API response
    if (percentageChange !== null && percentageChange !== undefined) {
      return percentageChange;
    } else if (previousPrice1kg && price1kg && previousPrice1kg !== 0) {
      return ((price1kg - previousPrice1kg) / previousPrice1kg) * 100;
    }
    return null;
  };

  const change = getPercentageChange();
  
  // Show percentage change even if it's 0 (not null)
  const shouldShowChange = change !== null && change !== undefined;

  if (price1kg === null) {
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

  const getCardGradient = () => {
    return 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className={`${getCardBg()} ${getCardGradient()} rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow hover:card-shadow-hover transition-all duration-200 relative overflow-hidden`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/10 dark:bg-slate-700/10 rounded-full -mr-16 -mt-16"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-slate-700 dark:bg-slate-300 p-3 rounded-xl flex-shrink-0 shadow-md ring-2 ring-slate-200 dark:ring-slate-700">
              <DollarSign className="w-6 h-6 text-white dark:text-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                  Silver
                </h3>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full">
                  Pure
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                99.9% Pure Silver
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getTrendIndicator()}
          </div>
        </div>

        {/* Prices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* 1g Price */}
          {perGram !== null && (
            <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-slate-200 dark:border-slate-700 overflow-hidden min-w-0">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                1 Gram
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight break-words overflow-hidden">
                {formatIndianCurrency(perGram)}
              </p>
            </div>
          )}
          {/* 1kg Price */}
          {price1kg !== null && (
            <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-slate-200 dark:border-slate-700 overflow-hidden min-w-0">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                1 Kilogram
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight break-words overflow-hidden">
                {formatIndianCurrency(price1kg)}
              </p>
            </div>
          )}
        </div>

        {/* Percentage Change - Prominent */}
        {shouldShowChange && (
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4 border-t-2 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">
                  24h Change
                </p>
                {change > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      +{Math.abs(change).toFixed(2)}%
                    </span>
                  </div>
                ) : change < 0 ? (
                  <div className="flex items-baseline gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {change.toFixed(2)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <Minus className="w-5 h-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                    <span className="text-xl font-bold text-slate-600 dark:text-slate-400">
                      0.00%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SilverPriceSection, (prevProps, nextProps) => {
  return (
    prevProps.price1kg === nextProps.price1kg &&
    prevProps.price1g === nextProps.price1g &&
    prevProps.previousPrice1kg === nextProps.previousPrice1kg &&
    prevProps.percentageChange === nextProps.percentageChange
  );
});
