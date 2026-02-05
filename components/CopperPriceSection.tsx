/**
 * Copper Price Section Component
 * Displays copper prices for 1g, 10g, 100g, and 1kg in a single card
 */

'use client';

import { memo } from 'react';
import { Zap } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CopperPriceSectionProps {
  price100g: number | null;
  price1kg: number | null;
  previousPrice1kg?: number | null;
  percentageChange?: number | null;
}

function CopperPriceSection({
  price100g,
  price1kg,
  previousPrice1kg,
  percentageChange,
}: CopperPriceSectionProps) {
  const getCardBg = () => {
    return 'bg-white dark:bg-slate-900';
  };

  const getIconBg = () => {
    return 'bg-orange-600 dark:bg-orange-500';
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
    } else if (previousPrice1kg && price1kg && previousPrice1kg !== 0) {
      return ((price1kg - previousPrice1kg) / previousPrice1kg) * 100;
    }
    return null;
  };

  const change = getPercentageChange();
  
  // Show percentage change even if it's 0 (not null)
  const shouldShowChange = change !== null && change !== undefined;

  if (price100g === null && price1kg === null) {
    return (
      <div className={`${getCardBg()} rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow opacity-60`}>
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-2.5 sm:p-3 lg:p-3.5 rounded-md flex-shrink-0`}>
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Copper
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <p className="text-2xl font-bold text-slate-400">—</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Data unavailable</p>
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
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                Copper
              </h3>
              <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-0.5">
                MCX futures pricing
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getTrendIndicator()}
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
          {/* 100g Price */}
          {price100g !== null && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  100 grams
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                  {formatIndianCurrency(price100g)}
                </p>
              </div>
            </div>
          )}

          {/* 1kg Price */}
          {price1kg !== null && (
            <div className={`flex items-center justify-between ${price100g !== null ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : ''}`}>
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

export default memo(CopperPriceSection, (prevProps, nextProps) => {
  return (
    prevProps.price100g === nextProps.price100g &&
    prevProps.price1kg === nextProps.price1kg &&
    prevProps.previousPrice1kg === nextProps.previousPrice1kg &&
    prevProps.percentageChange === nextProps.percentageChange
  );
});
