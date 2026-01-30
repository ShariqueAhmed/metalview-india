'use client';

import { Coins, Zap, Package } from 'lucide-react';

export type MetalType = 'gold' | 'silver' | 'copper' | 'aluminium' | 'zinc';

interface MetalTabsProps {
  selectedMetal: MetalType;
  onMetalChange: (metal: MetalType) => void;
  hasGoldData: boolean;
  hasSilverData: boolean;
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
    color: 'yellow',
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: <Coins className="w-5 h-5" />,
    color: 'gray',
  },
  {
    id: 'copper',
    name: 'Copper',
    icon: <Zap className="w-5 h-5" />,
    color: 'orange',
  },
  {
    id: 'aluminium',
    name: 'Aluminium',
    icon: <Package className="w-5 h-5" />,
    color: 'blue',
  },
  {
    id: 'zinc',
    name: 'Zinc',
    icon: <Package className="w-5 h-5" />,
    color: 'indigo',
  },
];

export default function MetalTabs({
  selectedMetal,
  onMetalChange,
  hasGoldData,
  hasSilverData,
}: MetalTabsProps) {
  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = 'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95';
    
    if (isActive) {
      switch (color) {
        case 'yellow':
          return `${baseClasses} bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30 ring-2 ring-yellow-400/20`;
        case 'gray':
          return `${baseClasses} bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30 ring-2 ring-gray-400/20`;
        case 'orange':
          return `${baseClasses} bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/20`;
        case 'blue':
          return `${baseClasses} bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/20`;
        case 'indigo':
          return `${baseClasses} bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/20`;
        default:
          return `${baseClasses} bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30 ring-2 ring-gray-400/20`;
      }
    } else {
      return `${baseClasses} bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 p-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {metalOptions.map((metal) => {
          const isActive = selectedMetal === metal.id;
          const isDisabled = 
            (metal.id === 'gold' && !hasGoldData) ||
            (metal.id === 'silver' && !hasSilverData) ||
            (metal.id !== 'gold' && metal.id !== 'silver'); // Copper, Aluminium, Zinc not available
          
          return (
            <button
              key={metal.id}
              onClick={() => !isDisabled && onMetalChange(metal.id)}
              disabled={isDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : isDisabled
                  ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200/60 dark:border-gray-700/60'
              }`}
              title={
                isDisabled
                  ? metal.id === 'gold' || metal.id === 'silver'
                    ? 'Data not available'
                    : 'Coming soon'
                  : `View ${metal.name} prices`
              }
            >
              <span className={isActive ? 'text-white dark:text-gray-900' : 'text-gray-600 dark:text-gray-400'}>
                {metal.icon}
              </span>
              <span>{metal.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
