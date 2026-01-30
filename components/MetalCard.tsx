'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';
import React, { useEffect, useState, useRef } from 'react';

interface MetalCardProps {
  name: string;
  price: number | null;
  unit: string;
  icon?: React.ReactNode;
  color?: 'gold' | 'silver' | 'copper' | 'aluminium' | 'zinc';
  previousPrice?: number | null;
  unavailable?: boolean;
}

export default function MetalCard({
  name,
  price,
  unit,
  icon,
  color = 'gold',
  previousPrice,
  unavailable = false,
}: MetalCardProps) {
  const [displayPrice, setDisplayPrice] = useState(price || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPriceRef = useRef(price || 0);

  // Handle unavailable data
  if (unavailable || price === null) {
    return (
      <div
        className={`rounded-xl border-2 p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
          color === 'gold'
            ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800'
            : color === 'silver'
            ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200 dark:border-gray-700'
            : color === 'copper'
            ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800'
            : color === 'aluminium'
            ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800'
            : 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800'
        } dark:bg-opacity-10 opacity-75`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm opacity-50">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                per {unit}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-400 dark:text-gray-500">
            —
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Free data unavailable
          </p>
        </div>
      </div>
    );
  }

  // Update display price immediately if price changes and we don't have a previous value
  useEffect(() => {
    if (prevPriceRef.current === 0 && price && price > 0) {
      setDisplayPrice(price);
      prevPriceRef.current = price;
    }
  }, [price]);

  useEffect(() => {
    if (price === null) return;
    
    // Animate price change from previous to new price
    if (prevPriceRef.current === price) {
      setDisplayPrice(price);
      return; // No animation needed if price hasn't changed
    }
    
    setIsAnimating(true);
    const duration = 800;
    const steps = 40;
    const startPrice = prevPriceRef.current;
    const priceDiff = price - startPrice;
    const increment = priceDiff / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplayPrice(price);
        setIsAnimating(false);
        prevPriceRef.current = price;
        clearInterval(timer);
      } else {
        setDisplayPrice(startPrice + increment * step);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [price]);

  const getPriceChange = () => {
    if (!previousPrice || price === null) return null;
    const change = price - previousPrice;
    const percentChange = ((change / previousPrice) * 100).toFixed(2);
    return { change, percentChange };
  };

  const priceChange = getPriceChange();
  const isPositive = priceChange && priceChange.change > 0;
  const isNegative = priceChange && priceChange.change < 0;

  const colorClasses = {
    gold: 'bg-white dark:bg-gray-900 border-amber-200/60 dark:border-amber-800/60',
    silver: 'bg-white dark:bg-gray-900 border-gray-200/60 dark:border-gray-800/60',
    copper: 'bg-white dark:bg-gray-900 border-orange-200/60 dark:border-orange-800/60',
    aluminium: 'bg-white dark:bg-gray-900 border-blue-200/60 dark:border-blue-800/60',
    zinc: 'bg-white dark:bg-gray-900 border-indigo-200/60 dark:border-indigo-800/60',
  };

  return (
    <div
      className={`rounded-lg border p-5 shadow-sm hover:shadow-md transition-all duration-200 ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200/60 dark:border-gray-700/60">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              per {unit}
            </p>
          </div>
        </div>
        
        {priceChange && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                : isNegative
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200/60 dark:border-red-800/60'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : isNegative ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span>{Math.abs(parseFloat(priceChange.percentChange))}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p
          className={`text-2xl font-semibold text-gray-900 dark:text-white transition-all ${
            isAnimating ? 'scale-105' : ''
          }`}
        >
          {formatIndianCurrency(displayPrice)}
        </p>
      </div>
    </div>
  );
}
