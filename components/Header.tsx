/**
 * Header Component
 * Displays logo, app name, and subtitle
 */

import Link from 'next/link';
import { Coins } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 active:scale-95">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent truncate">
                SuperMetal
              </h1>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400 mt-0.5">
                Live Metal Prices in India
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
