/**
 * Platinum Price Section Component
 * Displays platinum prices for 1g and 10g in a single card
 */

'use client';

import { memo } from 'react';

import { Gem } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PlatinumPriceSectionProps {
  price1g: number | null;
  price10g: number | null;
  previousPrice1g?: number | null;
  previousPrice10g?: number | null;
  percentageChange?: number | null;
  variationType?: 'up' | 'down';
  variation?: string;
}

function PlatinumPriceSection({
  price1g,
  price10g,
  previousPrice1g,
  percentageChange,
  variationType,
  variation,
}: PlatinumPriceSectionProps) {
  const getCardBg = () => {
    return 'bg-white dark:bg-slate-900';
  };

  const getTrendIndicator = () => {
    let trend: 'up' | 'down' | 'neutral' | null = null;
    
    if (variationType) {
      trend = variationType;
    } else if (percentageChange !== null && percentageChange !== undefined) {
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
    // Prioritize percentageChange from API response if it's not 0
    if (percentageChange !== null && percentageChange !== undefined && Math.abs(percentageChange) > 0.001) {
      return percentageChange;
    }
    
    // Calculate from variation if available (variation is for 1g, so use price1g)
    // Variation represents the absolute change amount
    // If variationType is 'up': currentPrice = previousPrice + variation
    // If variationType is 'down': currentPrice = previousPrice - variation
    if (variation && price1g) {
      const variationNum = Math.abs(parseFloat(variation));
      if (variationNum > 0) {
        // Calculate previous price based on variation type
        const previousPrice = variationType === 'up' 
          ? price1g - variationNum 
          : price1g + variationNum;
        
        if (previousPrice > 0) {
          const calculatedPercentage = (variationNum / previousPrice) * 100;
          return variationType === 'up' ? calculatedPercentage : -calculatedPercentage;
        }
      }
    }
    
    // Fallback to comparing with previous price
    if (previousPrice1g && price1g && previousPrice1g !== price1g) {
      return ((price1g - previousPrice1g) / previousPrice1g) * 100;
    }
    
    return null;
  };

  const percentageChangeValue = getPercentageChange();
  const trend = getTrendIndicator();

  return (
    <div className={`${getCardBg()} rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow hover:card-shadow-hover transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center border border-blue-200 dark:border-blue-800`}>
            <Gem className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Platinum
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pure Platinum Prices
            </p>
          </div>
        </div>
        {trend}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="overflow-hidden min-w-0">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            1 Gram
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 break-words overflow-hidden">
            {price1g ? formatIndianCurrency(price1g) : '—'}
          </div>
        </div>
        <div className="overflow-hidden min-w-0">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            10 Grams
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 break-words overflow-hidden">
            {price10g ? formatIndianCurrency(price10g) : '—'}
          </div>
        </div>
      </div>

      {/* Price Change Section - Show when variation or percentageChange is available */}
      {(variation || percentageChangeValue !== null) && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Price Change
            </span>
            <div className="flex items-center gap-2">
              {variation && (
                <span className={`text-sm font-semibold ${
                  variationType === 'up' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : variationType === 'down'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {variationType === 'up' ? '+' : variationType === 'down' ? '-' : ''}
                  {formatIndianCurrency(Math.abs(parseFloat(variation)))}
                </span>
              )}
              {percentageChangeValue !== null && (
                <span className={`text-sm font-semibold ${
                  percentageChangeValue > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : percentageChangeValue < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  ({percentageChangeValue > 0 ? '+' : ''}
                  {percentageChangeValue.toFixed(2)}%)
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(PlatinumPriceSection, (prevProps, nextProps) => {
  return (
    prevProps.price1g === nextProps.price1g &&
    prevProps.price10g === nextProps.price10g &&
    prevProps.previousPrice1g === nextProps.previousPrice1g &&
    prevProps.previousPrice10g === nextProps.previousPrice10g &&
    prevProps.percentageChange === nextProps.percentageChange &&
    prevProps.variation === nextProps.variation &&
    prevProps.variationType === nextProps.variationType
  );
});
