/**
 * Metal Tabs Component
 * Tabbed interface for switching between different metals
 */

'use client';

import { Coins, DollarSign, Zap, Gem } from 'lucide-react';

export type MetalType = 'gold' | 'silver' | 'copper' | 'platinum';

interface MetalTabsProps {
  selectedMetal: MetalType;
  onMetalChange: (metal: MetalType) => void;
  hasGoldData: boolean;
  hasSilverData: boolean;
  hasCopperData: boolean;
  hasPlatinumData: boolean;
}

const metalOptions: Array<{
  id: MetalType;
  name: string;
  icon: React.ReactNode;
  color: string;
}> = [
  {
    id: 'gold',
    name: 'Gold',
    icon: <Coins className="w-5 h-5" />,
    color: 'amber',
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'gray',
  },
  {
    id: 'copper',
    name: 'Copper',
    icon: <Zap className="w-5 h-5" />,
    color: 'orange',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: <Gem className="w-5 h-5" />,
    color: 'blue',
  },
];

export default function MetalTabs({
  selectedMetal,
  onMetalChange,
  hasGoldData,
  hasSilverData,
  hasCopperData,
  hasPlatinumData,
}: MetalTabsProps) {
  const getDataAvailability = (metal: MetalType) => {
    switch (metal) {
      case 'gold':
        return hasGoldData;
      case 'silver':
        return hasSilverData;
      case 'copper':
        return hasCopperData;
      case 'platinum':
        return hasPlatinumData;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border-2 border-amber-100 dark:border-amber-900/50 shadow-xl p-2 sm:p-3 mb-6 sm:mb-10">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {metalOptions.map((metal) => {
          const isActive = selectedMetal === metal.id;
          const hasData = getDataAvailability(metal.id);

          const activeGradient = isActive
            ? metal.color === 'amber'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30'
              : metal.color === 'gray'
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30'
              : metal.color === 'orange'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';

          const iconClasses = isActive
            ? 'text-white'
            : metal.color === 'amber'
            ? 'text-amber-600 dark:text-amber-400'
            : metal.color === 'gray'
            ? 'text-gray-600 dark:text-gray-400'
            : metal.color === 'orange'
            ? 'text-orange-600 dark:text-orange-400'
            : 'text-blue-600 dark:text-blue-400';

          return (
            <button
              key={metal.id}
              onClick={() => onMetalChange(metal.id)}
              className={`
                flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 transform
                ${activeGradient}
                ${!hasData ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
                ${isActive ? 'scale-105 ring-2 ring-offset-1 sm:ring-offset-2 ring-amber-300 dark:ring-amber-700' : ''}
              `}
              disabled={!hasData}
              title={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
            >
              <span className={iconClasses}>{metal.icon}</span>
              <span>{metal.name}</span>
              {!hasData && <span className="text-xs opacity-75">(N/A)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
