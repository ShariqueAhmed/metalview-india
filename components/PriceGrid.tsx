'use client';

import { Coins, Zap, Package } from 'lucide-react';
import MetalCard from './MetalCard';

interface MetalsData {
  gold_10g: number | null;
  gold_1g?: number | null;
  gold_22k_10g?: number | null;
  gold_22k_1g?: number | null;
  silver_1kg: number | null;
  copper_ton: number | null;
  aluminium_ton: number | null;
  zinc_ton: number | null;
  usd_inr: number | null;
  updated_at: string;
}

interface PriceGridProps {
  data: MetalsData | null;
  previousData?: MetalsData | null;
  isLoading: boolean;
  showOnly?: 'gold' | 'silver' | 'copper' | 'aluminium' | 'zinc';
}

export default function PriceGrid({ data, previousData, isLoading, showOnly }: PriceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border-2 p-6 bg-gray-100 dark:bg-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const cards = [];

  // Show only the selected metal, or all if showOnly is not specified
  if (!showOnly || showOnly === 'gold') {
    // Gold 24K - Show both 1gm and 10gm in a grid
    cards.push(
      <div key="gold-24k" className="md:col-span-2">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            Gold (24K)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetalCard
            name="Gold (24K)"
            price={data.gold_10g}
            unit="10 grams"
            icon={<Coins className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
            color="gold"
            previousPrice={previousData?.gold_10g}
          />
          {data.gold_1g && (
            <MetalCard
              name="Gold (24K)"
              price={data.gold_1g}
              unit="1 gram"
              icon={<Coins className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
              color="gold"
              previousPrice={previousData?.gold_1g || undefined}
            />
          )}
        </div>
      </div>
    );
    
    // Gold 22K - Show both 1gm and 10gm in a grid
    if (data.gold_22k_10g) {
      cards.push(
        <div key="gold-22k" className="md:col-span-2">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Gold (22K)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetalCard
              name="Gold (22K)"
              price={data.gold_22k_10g}
              unit="10 grams"
              icon={<Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
              color="gold"
              previousPrice={previousData?.gold_22k_10g || undefined}
            />
            {data.gold_22k_1g && (
              <MetalCard
                name="Gold (22K)"
                price={data.gold_22k_1g}
                unit="1 gram"
                icon={<Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
                color="gold"
                previousPrice={previousData?.gold_22k_1g || undefined}
              />
            )}
          </div>
        </div>
      );
    }
  }

  if (!showOnly || showOnly === 'silver') {
    cards.push(
      <MetalCard
        key="silver"
        name="Silver"
        price={data.silver_1kg}
        unit="1 kilogram"
        icon={<Coins className="w-6 h-6 text-gray-600 dark:text-gray-400" />}
        color="silver"
        previousPrice={previousData?.silver_1kg}
        unavailable={data.silver_1kg === null}
      />
    );
  }

  if (!showOnly || showOnly === 'copper') {
    cards.push(
      <MetalCard
        key="copper"
        name="Copper"
        price={data.copper_ton}
        unit="metric ton"
        icon={<Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />}
        color="copper"
        previousPrice={previousData?.copper_ton}
        unavailable={data.copper_ton === null}
      />
    );
  }

  if (!showOnly || showOnly === 'aluminium') {
    cards.push(
      <MetalCard
        key="aluminium"
        name="Aluminium"
        price={data.aluminium_ton}
        unit="metric ton"
        icon={<Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        color="aluminium"
        previousPrice={previousData?.aluminium_ton}
        unavailable={data.aluminium_ton === null}
      />
    );
  }

  if (!showOnly || showOnly === 'zinc') {
    cards.push(
      <MetalCard
        key="zinc"
        name="Zinc"
        price={data.zinc_ton}
        unit="metric ton"
        icon={<Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
        color="zinc"
        previousPrice={previousData?.zinc_ton}
        unavailable={data.zinc_ton === null}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards}
    </div>
  );
}
