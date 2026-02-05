/**
 * Header Component
 * Displays logo, app name, and subtitle
 */

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link 
            href="/" 
            className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2 rounded-lg"
            aria-label="MetalView India - Home"
          >
            <div className="relative flex-shrink-0" aria-hidden="true">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-50 dark:via-slate-100 dark:to-slate-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-900/20 dark:group-hover:shadow-slate-50/20 group-hover:scale-105">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-slate-50 dark:text-slate-900" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
                MetalView India
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug max-w-md">
                Real-time precious metals pricing & market insights
              </p>
            </div>
          </Link>
          <nav className="flex items-center flex-shrink-0" aria-label="Main navigation">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2"
              aria-label="View all metal prices dashboard"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
