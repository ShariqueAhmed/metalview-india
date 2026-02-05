/**
 * Gold Price Section Component
 * Displays both 1g and 10g prices for 24K or 22K gold in a single card
 */

'use client';

import { memo } from 'react';
import { Award } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface GoldPriceSectionProps {
  type: '24K' | '22K' | '18K';
  price10g: number | null;
  previousPrice1g?: number | null;
  percentageChange?: number | null;
  difference?: string | null; // Price difference from API (e.g., "+154.48" or "-50.25")
  priceChange?: string | null; // Price change percentage from API (e.g., "+1.33%" or "-0.50%")
}

function GoldPriceSection({
  type,
  price10g,
  previousPrice1g,
  percentageChange,
  difference,
  priceChange,
}: GoldPriceSectionProps) {
  const is24K = type === '24K';
  const is22K = type === '22K';
  const is18K = type === '18K';
  
  const getCardBg = () => {
    return 'bg-white dark:bg-slate-900';
  };

  const getIconBg = () => {
    if (is24K) {
      return 'bg-slate-900 dark:bg-slate-50';
    } else if (is22K) {
      return 'bg-slate-700 dark:bg-slate-300';
    } else {
      return 'bg-slate-600 dark:bg-slate-400';
    }
  };

  const getTrendIndicator = () => {
    let trend: 'up' | 'down' | 'neutral' | null = null;
    
    if (percentageChange !== null && percentageChange !== undefined) {
      if (percentageChange > 0) trend = 'up';
      else if (percentageChange < 0) trend = 'down';
      else trend = 'neutral';
    } else if (previousPrice1g && price10g) {
      // Use price10g for trend calculation (since we removed price1g display)
      const previousPrice10g = previousPrice1g * 10;
      if (price10g > previousPrice10g) trend = 'up';
      else if (price10g < previousPrice10g) trend = 'down';
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
    } else if (previousPrice1g && price10g && previousPrice1g !== 0) {
      const previousPrice10g = previousPrice1g * 10;
      return ((price10g - previousPrice10g) / previousPrice10g) * 100;
    }
    return null;
  };

  const change = getPercentageChange();
  
  // Show percentage change even if it's 0 (not null)
  const shouldShowChange = change !== null && change !== undefined;

  if (price10g === null) {
    return (
      <div className={`${getCardBg()} rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow opacity-60`}>
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0`}>
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight">
                Gold ({type})
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-amber-200/50 dark:border-amber-800/50">
          <p className="text-2xl font-bold text-gray-400">—</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data unavailable</p>
        </div>
      </div>
    );
  }

  const getCardGradient = () => {
    if (is24K) {
      return 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800';
    } else if (is22K) {
      return 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700';
    } else {
      return 'bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-slate-300 dark:border-slate-600';
    }
  };

  return (
    <div className={`${getCardBg()} ${is24K || is22K || is18K ? getCardGradient() : ''} rounded-xl border-2 ${is24K ? 'border-amber-200 dark:border-amber-800' : is22K ? 'border-slate-200 dark:border-slate-800' : 'border-slate-300 dark:border-slate-600'} p-6 sm:p-8 card-shadow hover:card-shadow-hover transition-all duration-200 relative overflow-hidden`}>
      {/* Decorative background element */}
      {is24K && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 dark:bg-amber-800/10 rounded-full -mr-16 -mt-16"></div>
      )}
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-3 rounded-xl flex-shrink-0 shadow-md ${is24K ? 'ring-2 ring-amber-200 dark:ring-amber-800' : ''}`}>
              <Award className="w-6 h-6 text-white dark:text-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold ${is24K ? 'text-amber-900 dark:text-amber-100' : is22K ? 'text-slate-900 dark:text-slate-50' : 'text-slate-800 dark:text-slate-200'} tracking-tight`}>
                  Gold {type}
                </h3>
                {is24K && (
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-semibold rounded-full">
                    Purest
                  </span>
                )}
                {is18K && (
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                    Jewelry
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                {is24K ? '99.9% Pure Gold' : is22K ? '91.6% Pure Gold (Jewelry Grade)' : '75% Pure Gold (Jewelry Grade)'}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getTrendIndicator()}
          </div>
        </div>

        {/* Prices Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 1g Price */}
          <div className={`${is24K ? 'bg-white/60 dark:bg-slate-900/60' : is22K ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-slate-100 dark:bg-slate-800/50'} rounded-lg p-4 border ${is24K ? 'border-amber-100 dark:border-amber-800/50' : is22K ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300 dark:border-slate-600'}`}>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              1 Gram
            </p>
            <p className={`text-2xl sm:text-3xl font-bold ${is24K ? 'text-amber-900 dark:text-amber-100' : is22K ? 'text-slate-900 dark:text-slate-50' : 'text-slate-800 dark:text-slate-200'} tracking-tight`}>
              {price10g !== null ? formatIndianCurrency(price10g / 10) : '—'}
            </p>
          </div>

          {/* 10g Price */}
          <div className={`${is24K ? 'bg-white/60 dark:bg-slate-900/60' : is22K ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-slate-100 dark:bg-slate-800/50'} rounded-lg p-4 border ${is24K ? 'border-amber-100 dark:border-amber-800/50' : is22K ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300 dark:border-slate-600'}`}>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              10 Grams
            </p>
            <p className={`text-2xl sm:text-3xl font-bold ${is24K ? 'text-amber-900 dark:text-amber-100' : is22K ? 'text-slate-900 dark:text-slate-50' : 'text-slate-800 dark:text-slate-200'} tracking-tight`}>
              {price10g !== null ? formatIndianCurrency(price10g) : '—'}
            </p>
          </div>
        </div>

        {/* Price Difference, Price Change, and Percentage Change */}
        {(difference || priceChange || shouldShowChange) && (
          <div className={`${is24K ? 'bg-amber-100/50 dark:bg-amber-900/20' : is22K ? 'bg-slate-100 dark:bg-slate-800/50' : 'bg-slate-100 dark:bg-slate-800/50'} rounded-lg p-4 border-t-2 ${is24K ? 'border-amber-200 dark:border-amber-800' : is22K ? 'border-slate-200 dark:border-slate-700' : 'border-slate-300 dark:border-slate-600'}`}>
            <div className="space-y-3">
              {/* Price Difference */}
              {difference && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">
                    Price Difference
                  </p>
                  <div className="flex items-baseline gap-2">
                    {difference.startsWith('+') ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          ₹{difference.substring(1)} per gram
                        </span>
                      </>
                    ) : difference.startsWith('-') ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                          ₹{difference.substring(1)} per gram
                        </span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-xl font-bold text-slate-600 dark:text-slate-400">
                          ₹{difference} per gram
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Price Change (from API) */}
              {priceChange && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">
                    Price Change
                  </p>
                  <div className="flex items-baseline gap-2">
                    {priceChange.startsWith('+') ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          {priceChange}
                        </span>
                      </>
                    ) : priceChange.startsWith('-') ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                          {priceChange}
                        </span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="text-xl font-bold text-slate-600 dark:text-slate-400">
                          {priceChange}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Percentage Change (calculated) */}
              {shouldShowChange && !priceChange && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">
                    24h Change
                  </p>
                  {change > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        +{Math.abs(change).toFixed(2)}%
                      </span>
                    </div>
                  ) : change < 0 ? (
                    <div className="flex items-baseline gap-2">
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        {change.toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <Minus className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <span className="text-xl font-bold text-slate-600 dark:text-slate-400">
                        0.00%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(GoldPriceSection, (prevProps, nextProps) => {
  return (
    prevProps.price10g === nextProps.price10g &&
    prevProps.previousPrice1g === nextProps.previousPrice1g &&
    prevProps.percentageChange === nextProps.percentageChange &&
    prevProps.type === nextProps.type &&
    prevProps.difference === nextProps.difference &&
    prevProps.priceChange === nextProps.priceChange
  );
});
