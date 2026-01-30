'use client';

import { Coins, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import MetalCard from './MetalCard';

interface GoldPriceSectionProps {
  gold24k_10g: number | null;
  gold24k_1g?: number | null;
  gold22k_10g?: number | null;
  gold22k_1g?: number | null;
  previousGold24k_10g?: number | null;
  previousGold24k_1g?: number | null;
  previousGold22k_10g?: number | null;
  previousGold22k_1g?: number | null;
  location?: string;
  lastUpdated?: string;
}

export default function GoldPriceSection({
  gold24k_10g,
  gold24k_1g,
  gold22k_10g,
  gold22k_1g,
  previousGold24k_10g,
  previousGold24k_1g,
  previousGold22k_10g,
  previousGold22k_1g,
  location,
  lastUpdated,
}: GoldPriceSectionProps) {
  if (!gold24k_10g) {
    return null;
  }

  const calculateChange = (current: number | null, previous: number | null) => {
    if (!current || !previous) return null;
    const change = current - previous;
    const percentChange = ((change / previous) * 100).toFixed(2);
    return { change, percentChange, isPositive: change > 0 };
  };

  const change24k_10g = calculateChange(gold24k_10g, previousGold24k_10g || null);
  const change24k_1g = calculateChange(gold24k_1g || null, previousGold24k_1g || null);
  const change22k_10g = calculateChange(gold22k_10g || null, previousGold22k_10g || null);
  const change22k_1g = calculateChange(gold22k_1g || null, previousGold22k_1g || null);

  const formatDate = (timestamp?: string) => {
    if (!timestamp) {
      const today = new Date();
      return today.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      const today = new Date();
      return today.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Premium Header Section */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-amber-200/60 dark:border-amber-800/60 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 flex items-center justify-center shadow-sm">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {location
                  ? `Gold price in ${location
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}`
                  : 'Gold Prices'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {formatDate(lastUpdated)}
                </span>
                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Live rates
                </span>
              </div>
            </div>
          </div>
          
          {/* Info Tooltip */}
          <div className="group relative">
            <button className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:bg-white dark:hover:bg-gray-800 transition-colors">
              <Info className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors" />
            </button>
            <div className="absolute right-0 top-12 w-72 p-4 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-gray-700">
              <p className="font-semibold mb-2 text-gray-100">Gold Purity Guide</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-amber-400">24K:</span>
                  <span>Pure gold (99.9%) - Best for investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-amber-400">22K:</span>
                  <span>91.6% gold - Ideal for jewelry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 24K & 22K Gold Sections in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 24K Gold Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 overflow-hidden">
          <div className="bg-amber-600 dark:bg-amber-700 px-4 py-2.5 border-b border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">24 Karat Gold</h3>
                <p className="text-xs text-amber-100 mt-0.5">99.9% Pure - Best for Investment</p>
              </div>
              {change24k_10g && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                  change24k_10g.isPositive
                    ? 'bg-emerald-500/20 text-emerald-100'
                    : 'bg-red-500/20 text-red-100'
                }`}>
                  {change24k_10g.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-semibold">
                    {change24k_10g.isPositive ? '+' : ''}{change24k_10g.percentChange}%
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4">
            {gold24k_1g && (
              <MetalCard
                name="24K Gold"
                price={gold24k_1g}
                unit="1 gram"
                icon={<Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                color="gold"
                previousPrice={previousGold24k_1g || undefined}
              />
            )}
          </div>
        </div>

        {/* 22K Gold Section */}
        {gold22k_10g && (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 overflow-hidden">
            <div className="bg-amber-700 dark:bg-amber-800 px-4 py-2.5 border-b border-amber-600/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">22 Karat Gold</h3>
                  <p className="text-xs text-amber-100 mt-0.5">91.6% Pure - Ideal for Jewelry</p>
                </div>
                {change22k_10g && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                    change22k_10g.isPositive
                      ? 'bg-emerald-500/20 text-emerald-100'
                      : 'bg-red-500/20 text-red-100'
                  }`}>
                    {change22k_10g.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-semibold">
                      {change22k_10g.isPositive ? '+' : ''}{change22k_10g.percentChange}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4">
              {gold22k_1g && (
                <MetalCard
                  name="22K Gold"
                  price={gold22k_1g}
                  unit="1 gram"
                  icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  color="gold"
                  previousPrice={previousGold22k_1g || undefined}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Understanding Gold Purity Section */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/60 dark:border-amber-800/60 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Understanding Gold Purity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-amber-600 dark:bg-amber-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">24K</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">24 Karat Gold (Pure Gold)</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    Contains 99.9% pure gold with minimal alloys. The purest form of gold, making it soft and malleable. 
                    <span className="font-medium text-gray-900 dark:text-white"> Best suited for investment purposes</span> and bullion coins.
                  </p>
                </div>
              </div>
              <div className="h-px bg-amber-200/60 dark:bg-amber-800/60"></div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-amber-700 dark:bg-amber-800 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">22K</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">22 Karat Gold (Jewelry Grade)</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    Contains 91.6% pure gold mixed with 8.4% other metals (usually copper, silver, or zinc). 
                    More durable and stronger than 24K gold. 
                    <span className="font-medium text-gray-900 dark:text-white"> Ideal for making jewelry</span> that needs to withstand daily wear.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
