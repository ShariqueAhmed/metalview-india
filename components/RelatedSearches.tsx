/**
 * RelatedSearches Component
 * Displays related search suggestions for better internal linking and user engagement
 */

'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { formatCityName } from '@/utils/conversions';

interface RelatedSearchesProps {
  metal: string;
  city?: string;
  className?: string;
}

// Related searches organized by metal type
const relatedSearches: Record<string, Array<{ 
  label: string; 
  href: string;
  type: 'carat' | 'city' | 'guide' | 'comparison' | 'trend';
}>> = {
  gold: [
    { label: '24K Gold Price', href: '/gold/price-in/mumbai', type: 'carat' },
    { label: '22K Gold Price', href: '/gold/price-in/mumbai', type: 'carat' },
    { label: '18K Gold Price', href: '/gold/price-in/mumbai', type: 'carat' },
    { label: 'Gold Price Today', href: '/', type: 'trend' },
    { label: 'Gold Rate Mumbai', href: '/gold/price-in/mumbai', type: 'city' },
    { label: 'Gold Investment Guide', href: '/gold-price-guide', type: 'guide' },
    { label: '24K vs 22K vs 18K Gold', href: '/24k-vs-22k-vs-18k-gold', type: 'comparison' },
    { label: 'Best Cities to Buy Gold', href: '/best-cities-to-buy-gold', type: 'guide' },
    { label: 'Gold Price Trends 2025', href: '/gold-price-trends-2025', type: 'trend' },
    { label: 'Gold vs Silver Investment', href: '/gold-vs-silver-investment', type: 'comparison' },
  ],
  silver: [
    { label: 'Silver Price Today', href: '/', type: 'trend' },
    { label: 'Silver Rate Mumbai', href: '/silver/price-in/mumbai', type: 'city' },
    { label: 'Silver Price per kg', href: '/silver/price-in/mumbai', type: 'trend' },
    { label: 'Silver Investment Guide', href: '/silver-investment-guide', type: 'guide' },
    { label: 'Silver Price Trends', href: '/', type: 'trend' },
    { label: 'Gold vs Silver Investment', href: '/gold-vs-silver-investment', type: 'comparison' },
    { label: 'Silver Price in Delhi', href: '/silver/price-in/delhi', type: 'city' },
    { label: 'Silver Price in Bangalore', href: '/silver/price-in/bangalore', type: 'city' },
  ],
  copper: [
    { label: 'Copper Price Today', href: '/', type: 'trend' },
    { label: 'Copper Rate per kg', href: '/copper/price-in/mumbai', type: 'trend' },
    { label: 'Copper Price Guide', href: '/copper-price-guide', type: 'guide' },
    { label: 'Copper Price Trends', href: '/', type: 'trend' },
    { label: 'Copper Price in Mumbai', href: '/copper/price-in/mumbai', type: 'city' },
    { label: 'Copper Price in Delhi', href: '/copper/price-in/delhi', type: 'city' },
  ],
  platinum: [
    { label: 'Platinum Price Today', href: '/', type: 'trend' },
    { label: 'Platinum Rate per 10g', href: '/platinum/price-in/mumbai', type: 'trend' },
    { label: 'Platinum Investment Guide', href: '/platinum-investment-guide', type: 'guide' },
    { label: 'Platinum Price in Mumbai', href: '/platinum/price-in/mumbai', type: 'city' },
    { label: 'Platinum Price Trends', href: '/', type: 'trend' },
    { label: 'Platinum vs Gold', href: '/', type: 'comparison' },
  ],
  palladium: [
    { label: 'Palladium Price Today', href: '/', type: 'trend' },
    { label: 'Palladium Rate per 10g', href: '/palladium/price-in/mumbai', type: 'trend' },
    { label: 'Palladium Investment Guide', href: '/palladium-investment-guide', type: 'guide' },
    { label: 'Palladium Price in Mumbai', href: '/palladium/price-in/mumbai', type: 'city' },
    { label: 'Palladium Price Trends', href: '/', type: 'trend' },
  ],
};

export default function RelatedSearches({ 
  metal, 
  city,
  className = '' 
}: RelatedSearchesProps) {
  const metalKey = metal.toLowerCase();
  const searches = relatedSearches[metalKey] || relatedSearches.gold || [];

  // If city is provided, customize some links to use that city
  const customizedSearches = city && searches
    ? searches.map((search) => {
        // Replace generic city references with current city
        if (search.type === 'city' && search.href.includes('/mumbai')) {
          return {
            ...search,
            href: search.href.replace('/mumbai', `/${city}`),
            label: search.label.replace('Mumbai', formatCityName(city)),
          };
        }
        return search;
      })
    : searches;

  // Limit to 8 searches for better UX
  const displayedSearches = customizedSearches.slice(0, 8);

  if (displayedSearches.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="related-searches" 
      className={`mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 flex-shrink-0">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h2 id="related-searches" className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Related Searches
        </h2>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Explore related {metal} price information and guides
      </p>
      <div className="flex flex-wrap gap-2.5">
        {displayedSearches.map((search, index) => (
          <Link
            key={`${search.href}-${index}`}
            href={search.href}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-200 flex items-center gap-1.5"
          >
            <span>{search.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
