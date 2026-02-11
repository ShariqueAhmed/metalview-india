/**
 * Footer Component
 * Displays disclaimer and data source information
 */

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-sm font-medium">
              <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 bg-clip-text text-transparent">Metal</span>
              <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">View</span>
              <span className="text-slate-900 dark:text-slate-50"> India</span>
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">Verified</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300">Disclaimer:</strong> Prices are
            indicative, derived from market data sources, and for informational purposes only. We
            do not guarantee the accuracy of prices. Please verify with local dealers before making
            any purchase decisions.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
            Data Sources: Groww.in, AngelOne | Not financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}
