/**
 * YouMayAlsoLike Component
 * Displays personalized content recommendations for better engagement
 * Uses smart internal linking algorithm for optimized recommendations
 */

'use client';

import Link from 'next/link';
import { Sparkles, TrendingUp, BookOpen, MapPin, BarChart3, Award } from 'lucide-react';
import { getRelatedPages, type CurrentPage } from '@/utils/internalLinking';

interface Recommendation {
  title: string;
  href: string;
  description: string;
  type: 'metal' | 'city' | 'guide' | 'comparison' | 'trend';
  icon?: React.ComponentType<any>;
}

interface YouMayAlsoLikeProps {
  currentMetal?: string;
  currentCity?: string;
  pageType?: 'home' | 'metal-city' | 'city' | 'guide' | 'comparison' | 'trend';
  className?: string;
}

// Icon mapping for page types
const getIconForType = (type: string) => {
  switch (type) {
    case 'guide':
      return BookOpen;
    case 'comparison':
      return BarChart3;
    case 'trend':
      return TrendingUp;
    case 'city':
    case 'metal-city':
      return MapPin;
    case 'blog':
      return BookOpen;
    default:
      return Award;
  }
};

export default function YouMayAlsoLike({
  currentMetal,
  currentCity,
  pageType = 'home',
  className = '',
}: YouMayAlsoLikeProps) {
  // Use smart internal linking algorithm
  const currentPage: CurrentPage = {
    metal: currentMetal,
    city: currentCity,
    type: pageType,
  };

  const relatedPages = getRelatedPages(currentPage);

  // Convert to Recommendation format and limit to 3
  const displayedRecommendations: Recommendation[] = relatedPages
    .slice(0, 3)
    .map((page) => {
      // Map page types to Recommendation types
      let recType: 'metal' | 'city' | 'guide' | 'comparison' | 'trend' = 'guide';
      if (page.type === 'metal-city') {
        recType = 'metal';
      } else if (page.type === 'city') {
        recType = 'city';
      } else if (page.type === 'guide' || page.type === 'comparison' || page.type === 'trend') {
        recType = page.type;
      }
      
      return {
        title: page.title,
        href: page.href,
        description: page.description || '',
        type: recType,
        icon: getIconForType(page.type),
      };
    });

  if (displayedRecommendations.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="you-may-also-like"
      className={`mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center border-2 border-purple-200 dark:border-purple-800 flex-shrink-0">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
        </div>
        <h2 id="you-may-also-like" className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedRecommendations.map((rec, index) => {
          const Icon = rec.icon || BookOpen;
          return (
            <Link
              key={`${rec.href}-${index}`}
              href={rec.href}
              className="group p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-300 dark:hover:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 card-shadow hover:card-shadow-hover"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center flex-shrink-0 group-hover:from-amber-200 group-hover:to-yellow-200 dark:group-hover:from-amber-900/50 dark:group-hover:to-yellow-900/50 transition-colors">
                  <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1 line-clamp-2">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {rec.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
