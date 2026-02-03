/**
 * Footer Component
 * Displays disclaimer and data source information
 */

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
            MetalView India
          </p>
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
