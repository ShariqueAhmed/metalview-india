/**
 * Metal Tabs Component
 * Tabbed interface for switching between different metals
 */

'use client';

import { Award, DollarSign, Zap, Gem } from 'lucide-react';

export type MetalType = 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium';

interface MetalTabsProps {
  selectedMetal: MetalType;
  onMetalChange: (metal: MetalType) => void;
  hasGoldData: boolean;
  hasSilverData: boolean;
  hasCopperData: boolean;
  hasPlatinumData: boolean;
  hasPalladiumData: boolean;
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
  {
    id: 'palladium',
    name: 'Palladium',
    icon: <Gem className="w-5 h-5" />,
    color: 'purple',
  },
];

export default function MetalTabs({
  selectedMetal,
  onMetalChange,
  hasGoldData,
  hasSilverData,
  hasCopperData,
  hasPlatinumData,
  hasPalladiumData,
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
      case 'palladium':
        return hasPalladiumData;
      default:
        return false;
    }
  };

  return (
    <div className="mb-8" role="tablist" aria-label="Metal type selection">
      {/* Desktop: Horizontal tabs */}
      <div className="hidden sm:flex items-center gap-1 border-b border-slate-200 dark:border-slate-800">
        {metalOptions.map((metal) => {
          const isActive = selectedMetal === metal.id;
          const hasData = getDataAvailability(metal.id);

          return (
            <button
              key={metal.id}
              onClick={() => hasData && onMetalChange(metal.id)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && hasData) {
                  e.preventDefault();
                  onMetalChange(metal.id);
                }
              }}
              disabled={!hasData}
              aria-label={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
              aria-pressed={isActive}
              aria-disabled={!hasData}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              className={`
                relative flex items-center gap-2.5 px-5 py-3 font-medium text-sm transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2
                ${isActive
                  ? 'text-slate-900 dark:text-slate-50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                }
                ${!hasData ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
              title={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
            >
              <span className={`
                ${isActive ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}
                transition-colors duration-200
              `}>
                {metal.icon}
              </span>
              <span>{metal.name}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-slate-50" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile: Scrollable horizontal tabs */}
      <div className="sm:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {metalOptions.map((metal) => {
            const isActive = selectedMetal === metal.id;
            const hasData = getDataAvailability(metal.id);

            return (
              <button
                key={metal.id}
                onClick={() => hasData && onMetalChange(metal.id)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && hasData) {
                    e.preventDefault();
                    onMetalChange(metal.id);
                  }
                }}
                disabled={!hasData}
                aria-label={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
                aria-pressed={isActive}
                aria-disabled={!hasData}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap
                  transition-all duration-200 min-w-[100px] justify-center
                  focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2
                  ${isActive
                    ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:bg-slate-200 dark:active:bg-slate-700'
                  }
                  ${!hasData ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
                title={!hasData ? `${metal.name} data not available` : `View ${metal.name} prices`}
              >
                <span className={`
                  ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-400'}
                  transition-colors duration-200
                `}>
                  {metal.icon}
                </span>
                <span>{metal.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
