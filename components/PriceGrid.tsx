/**
 * Price Grid Component
 * Displays grid of metal price cards
 */

'use client';

import { Award, DollarSign, Zap, Gem } from 'lucide-react';
import MetalCard from './MetalCard';

interface PriceGridProps {
  data: {
    gold_10g: number | null;
    silver_1kg: number | null;
    copper: number | null;
    platinum: number | null;
  } | null;
  previousData?: {
    gold_10g: number | null;
    silver_1kg: number | null;
    copper: number | null;
    platinum: number | null;
  } | null;
  isLoading?: boolean;
}

export default function PriceGrid({ data, previousData, isLoading }: PriceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetalCard
        name="Gold"
        price={data?.gold_10g || null}
        unit="10g"
        icon={<Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        previousPrice={previousData?.gold_10g || null}
      />
      <MetalCard
        name="Silver"
        price={data?.silver_1kg || null}
        unit="1kg"
        icon={<DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
        previousPrice={previousData?.silver_1kg || null}
      />
      <MetalCard
        name="Copper"
        price={data?.copper || null}
        unit="kg"
        icon={<Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        previousPrice={previousData?.copper || null}
      />
      <MetalCard
        name="Platinum"
        price={data?.platinum || null}
        unit="gram"
        icon={<Gem className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        previousPrice={previousData?.platinum || null}
      />
    </div>
  );
}
