/**
 * TrendingKeywords Component
 * Displays trending search keywords for better keyword targeting and user engagement
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Flame } from 'lucide-react';

interface TrendingKeyword {
  label: string;
  href: string;
  category: 'metal' | 'city' | 'guide' | 'comparison' | 'trend';
}

// Trending keywords based on popular searches for metal prices in India
const trendingKeywords: TrendingKeyword[] = [
  // Gold keywords
  { label: 'gold price today', href: '/', category: 'trend' },
  { label: '24k gold price', href: '/gold/price-in/mumbai', category: 'metal' },
  { label: '22k gold price', href: '/gold/price-in/mumbai', category: 'metal' },
  { label: 'gold rate mumbai', href: '/gold/price-in/mumbai', category: 'city' },
  { label: 'gold rate delhi', href: '/gold/price-in/delhi', category: 'city' },
  { label: 'gold price bangalore', href: '/gold/price-in/bangalore', category: 'city' },
  { label: 'gold investment guide', href: '/gold-price-guide', category: 'guide' },
  { label: 'gold vs silver', href: '/gold-vs-silver-investment', category: 'comparison' },
  
  // Silver keywords
  { label: 'silver price today', href: '/', category: 'trend' },
  { label: 'silver rate mumbai', href: '/silver/price-in/mumbai', category: 'city' },
  { label: 'silver price per kg', href: '/silver/price-in/mumbai', category: 'metal' },
  { label: 'silver investment', href: '/silver-investment-guide', category: 'guide' },
  
  // Copper keywords
  { label: 'copper price india', href: '/copper/price-in/mumbai', category: 'trend' },
  { label: 'copper rate today', href: '/copper/price-in/mumbai', category: 'trend' },
  { label: 'copper price per kg', href: '/copper/price-in/mumbai', category: 'metal' },
  
  // Platinum keywords
  { label: 'platinum price today', href: '/platinum/price-in/mumbai', category: 'trend' },
  { label: 'platinum rate mumbai', href: '/platinum/price-in/mumbai', category: 'city' },
  
  // Guide and comparison keywords
  { label: 'best cities to buy gold', href: '/best-cities-to-buy-gold', category: 'guide' },
  { label: '24k vs 22k gold', href: '/24k-vs-22k-vs-18k-gold', category: 'comparison' },
  { label: 'gold price trends 2025', href: '/gold-price-trends-2025', category: 'trend' },
  { label: 'gold rate kolkata', href: '/gold/price-in/kolkata', category: 'city' },
  { label: 'gold rate chennai', href: '/gold/price-in/chennai', category: 'city' },
  { label: 'gold rate hyderabad', href: '/gold/price-in/hyderabad', category: 'city' },
];

interface TrendingKeywordsProps {
  className?: string;
  limit?: number;
}

export default function TrendingKeywords({ 
  className = '',
  limit = 12 
}: TrendingKeywordsProps) {
  // Shuffle keywords only once on mount to prevent constant re-renders
  const [displayedKeywords, setDisplayedKeywords] = useState<TrendingKeyword[]>([]);

  useEffect(() => {
    // Shuffle and limit keywords for variety (only once on mount)
    const shuffled = [...trendingKeywords]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
    setDisplayedKeywords(shuffled);
  }, [limit]);

  if (displayedKeywords.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="trending-keywords" 
      className={`mb-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8 card-shadow ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-600 flex items-center justify-center border-2 border-amber-300 dark:border-amber-700 flex-shrink-0 shadow-md">
          <Flame className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h2 id="trending-keywords" className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            Trending Searches
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Popular searches for metal prices in India
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {displayedKeywords.map((keyword, index) => (
          <Link
            key={`${keyword.href}-${index}`}
            href={keyword.href}
            className="group px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-900 dark:hover:text-amber-200 transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <span className="relative">
              {keyword.label}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800">
        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span>Based on popular searches and user interest</span>
        </p>
      </div>
    </section>
  );
}
