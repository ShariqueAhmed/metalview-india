/**
 * Metal Card Component
 * Displays individual metal price with icon and trend indicator
 */

'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';

interface MetalCardProps {
  name: string;
  price: number | null;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral' | null;
  previousPrice?: number | null;
  percentageChange?: number | null;
}

export default function MetalCard({
  name,
  price,
  unit,
  icon,
  trend,
  previousPrice,
  percentageChange,
}: MetalCardProps) {
  const getTrendIndicator = () => {
    if (!trend && previousPrice && price) {
      if (price > previousPrice) trend = 'up';
      else if (price < previousPrice) trend = 'down';
      else trend = 'neutral';
    }

    if (trend === 'up') {
      return (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">↑</span>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">↓</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Minus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
      );
    }
  };

  if (price === null) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm opacity-60">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                per {unit}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-400">—</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Data unavailable
          </p>
        </div>
      </div>
    );
  }

  const is24K = name.includes('24K');
  const is22K = name.includes('22K');
  
  // Different gradient backgrounds based on metal type
  const getCardGradient = () => {
    if (is24K) {
      return 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-amber-950/30';
    } else if (is22K) {
      return 'bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-amber-950/20';
    }
    return 'bg-white dark:bg-gray-900';
  };

  const getIconBg = () => {
    if (is24K) {
      return 'bg-gradient-to-br from-amber-500 to-yellow-600 dark:from-amber-600 dark:to-yellow-700';
    } else if (is22K) {
      return 'bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600';
    }
    return 'bg-amber-50 dark:bg-amber-900/20';
  };

  return (
    <div className={`${getCardGradient()} rounded-xl sm:rounded-2xl border-2 border-amber-200/60 dark:border-amber-800/60 p-4 sm:p-6 lg:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02] relative overflow-hidden group active:scale-[0.98]`}>
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-transparent dark:from-amber-800/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`${getIconBg()} p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
              <div className="text-white">
                {icon}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight truncate">
                {name}
              </h3>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 sm:mt-1.5 uppercase tracking-wide">
                per {unit}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getTrendIndicator()}
          </div>
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-amber-200/50 dark:border-amber-800/50">
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 break-words">
            {formatIndianCurrency(price)}
          </p>
          {((percentageChange !== null && percentageChange !== undefined) || (previousPrice && price)) && (
            <div className="flex items-center gap-2">
              {(() => {
                const change = percentageChange !== null && percentageChange !== undefined 
                  ? percentageChange 
                  : previousPrice !== null && previousPrice !== undefined && price !== null && price !== undefined && previousPrice !== 0
                    ? ((price - previousPrice) / previousPrice) * 100 
                    : 0;
                
                if (change > 0) {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold">
                      <span>↑</span>
                      +{Math.abs(change).toFixed(2)}%
                    </span>
                  );
                } else if (change < 0) {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold">
                      <span>↓</span>
                      {change.toFixed(2)}%
                    </span>
                  );
                } else {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-semibold">
                      <span>→</span>
                      0.00%
                    </span>
                  );
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
