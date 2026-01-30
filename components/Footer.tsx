/**
 * Footer Component
 * Displays disclaimer and data source information
 */

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            SuperMetal
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <strong className="text-gray-700 dark:text-gray-300">Disclaimer:</strong> Prices are
            indicative, derived from market data sources, and for informational purposes only. We
            do not guarantee the accuracy of prices. Please verify with local dealers before making
            any purchase decisions.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            Data Source: Groww.in | Not financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}
