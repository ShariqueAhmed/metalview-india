/**
 * Metal Dashboard Component
 * Displays all metal prices in a comprehensive dashboard
 */

'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';

interface MetalPriceData {
  rate: number;
  sellRate: number;
  buyRate: number;
  variationType: 'up' | 'down';
  variation: string;
}

interface AllMetalPrices {
  gold: MetalPriceData;
  silver: MetalPriceData;
  platinum: MetalPriceData;
  palladium: MetalPriceData;
}

interface MetalDashboardProps {
  data: AllMetalPrices;
}

const METAL_INFO = {
  gold: {
    name: 'Gold',
    icon: '🪙',
    color: 'amber',
    unit: 'per 10g',
    link: '/?metal=gold',
  },
  silver: {
    name: 'Silver',
    icon: '🥈',
    color: 'slate',
    unit: 'per 1kg',
    link: '/?metal=silver',
  },
  platinum: {
    name: 'Platinum',
    icon: '💎',
    color: 'blue',
    unit: 'per 10g',
    link: '/?metal=platinum',
  },
  palladium: {
    name: 'Palladium',
    icon: '✨',
    color: 'purple',
    unit: 'per 10g',
    link: '/?metal=palladium',
  },
};

export default function MetalDashboard({ data }: MetalDashboardProps) {
  const getVariationColor = (variationType: 'up' | 'down') => {
    return variationType === 'up' 
      ? 'text-emerald-600 dark:text-emerald-400' 
      : 'text-red-600 dark:text-red-400';
  };

  const getVariationBg = (variationType: 'up' | 'down') => {
    return variationType === 'up'
      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const getTrendIcon = (variationType: 'up' | 'down') => {
    if (variationType === 'up') {
      return <TrendingUp className="w-4 h-4" />;
    } else if (variationType === 'down') {
      return <TrendingDown className="w-4 h-4" />;
    }
    return <Minus className="w-4 h-4" />;
  };

  const metals = Object.entries(data).map(([key, value]) => ({
    key: key as keyof AllMetalPrices,
    data: value,
    info: METAL_INFO[key as keyof typeof METAL_INFO],
  }));

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          All Metal Prices Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Real-time prices for Gold, Silver, Platinum, and Palladium
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metals.map(({ key, data: metalData, info }) => {
          const variationNum = parseFloat(metalData.variation);
          // Calculate percentage change: (variation / previous_price) * 100
          // previous_price = current_rate - variation
          const previousPrice = metalData.rate - variationNum;
          const variationPercent = previousPrice > 0 
            ? ((variationNum / previousPrice) * 100).toFixed(2)
            : '0.00';

          return (
            <Link
              href={info.link}
              key={key}
              className="block bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow hover:card-shadow-hover hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {info.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {info.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Rate */}
              <div className="mb-4">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                  {formatIndianCurrency(metalData.rate)}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Current Rate
                </div>
              </div>

              {/* Variation */}
              <div className={`rounded-md p-3 border ${getVariationBg(metalData.variationType)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metalData.variationType)}
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Change
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getVariationColor(metalData.variationType)}`}>
                      {metalData.variationType === 'up' ? '+' : '-'}
                      {formatIndianCurrency(Math.abs(variationNum))}
                    </div>
                    <div className={`text-xs font-medium ${getVariationColor(metalData.variationType)}`}>
                      {variationPercent}%
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
          Market Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metals.map(({ key, data: metalData, info }) => {
            const variationNum = parseFloat(metalData.variation);
            return (
              <div key={key} className="text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {info.name}
                </div>
                <div className={`text-lg font-semibold ${getVariationColor(metalData.variationType)}`}>
                  {metalData.variationType === 'up' ? '+' : '-'}
                  {formatIndianCurrency(Math.abs(variationNum))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
