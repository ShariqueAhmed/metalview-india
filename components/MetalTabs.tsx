/**
 * Metal Tabs Component
 * Tabbed interface for switching between different metals
 */

'use client';

import { Award, DollarSign, Zap, Gem } from 'lucide-react';

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
    icon: <Award className="w-5 h-5" />,
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 mb-6 card-shadow">
      <div className="flex flex-wrap gap-1">
        {metalOptions.map((metal) => {
          const isActive = selectedMetal === metal.id;
          const hasData = getDataAvailability(metal.id);

          const activeClasses = isActive
            ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900'
            : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800';

          return (
            <button
              key={metal.id}
              onClick={() => onMetalChange(metal.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors
                ${activeClasses}
                ${!hasData ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              disabled={!hasData}
              title={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
            >
              <span className={isActive ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}>
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
