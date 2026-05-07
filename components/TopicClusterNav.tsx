/**
 * TopicClusterNav Component
 * Displays topic cluster navigation for better internal linking and topical authority
 */

'use client';

import Link from 'next/link';
import { Network, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { BLOG_PAGES, COMPARISON_PAGES, GUIDE_PAGES, PRIMARY_LINK_CITY_SLUGS, TREND_PAGES } from '@/utils/contentCatalog';
import { formatCityName } from '@/utils/conversions';

interface TopicCluster {
  hub: {
    title: string;
    href: string;
    description: string;
  };
  spokes: Array<{
    title: string;
    href: string;
    type: 'guide' | 'comparison' | 'trend' | 'city' | 'blog';
  }>;
}

interface TopicClusterNavProps {
  cluster: 'gold' | 'silver' | 'investment' | 'all';
  className?: string;
}

function buildTopicClusters(): Record<string, TopicCluster> {
  const goldHub = GUIDE_PAGES.find((page) => page.slug === 'gold-price-guide');
  const silverHub = GUIDE_PAGES.find((page) => page.slug === 'silver-investment-guide');
  const investmentHub = GUIDE_PAGES.find((page) => page.slug === 'investment-guide');

  return {
    gold: {
      hub: {
        title: goldHub?.title ?? 'Gold Price Guide',
        href: goldHub?.href ?? '/gold-price-guide',
        description: goldHub?.description ?? 'Complete guide to gold prices, purity, and investment',
      },
      spokes: [
        ...COMPARISON_PAGES.filter((page) => page.metals?.includes('gold')).map((page) => ({
          title: page.title,
          href: page.href,
          type: 'comparison' as const,
        })),
        ...TREND_PAGES.filter((page) => page.metal === 'gold').map((page) => ({
          title: page.title,
          href: page.href,
          type: 'trend' as const,
        })),
        ...GUIDE_PAGES.filter((page) => page.metal === 'gold' && page.slug !== 'gold-price-guide').map((page) => ({
          title: page.title,
          href: page.href,
          type: 'guide' as const,
        })),
        ...PRIMARY_LINK_CITY_SLUGS.slice(0, 3).map((city) => ({
          title: `Gold Price in ${formatCityName(city)}`,
          href: `/gold/price-in/${city}`,
          type: 'city' as const,
        })),
      ],
    },
    silver: {
      hub: {
        title: silverHub?.title ?? 'Silver Investment Guide',
        href: silverHub?.href ?? '/silver-investment-guide',
        description: silverHub?.description ?? 'Complete guide to silver prices and investment strategies',
      },
      spokes: [
        ...COMPARISON_PAGES.filter((page) => page.metals?.includes('silver')).map((page) => ({
          title: page.title,
          href: page.href,
          type: 'comparison' as const,
        })),
        ...BLOG_PAGES.filter((page) => page.metal === 'silver').slice(0, 1).map((page) => ({
          title: page.title,
          href: page.href,
          type: 'blog' as const,
        })),
        ...PRIMARY_LINK_CITY_SLUGS.slice(0, 3).map((city) => ({
          title: `Silver Price in ${formatCityName(city)}`,
          href: `/silver/price-in/${city}`,
          type: 'city' as const,
        })),
      ],
    },
    investment: {
      hub: {
        title: investmentHub?.title ?? 'Investment Guide',
        href: investmentHub?.href ?? '/investment-guide',
        description: investmentHub?.description ?? 'Complete guide to metal investments and strategies',
      },
      spokes: [
        ...COMPARISON_PAGES.map((page) => ({
          title: page.title,
          href: page.href,
          type: 'comparison' as const,
        })),
        ...TREND_PAGES.map((page) => ({
          title: page.title,
          href: page.href,
          type: 'trend' as const,
        })),
        ...GUIDE_PAGES.filter((page) => page.slug !== 'investment-guide').slice(0, 2).map((page) => ({
          title: page.title,
          href: page.href,
          type: 'guide' as const,
        })),
      ],
    },
  };
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'guide':
      return BookOpen;
    case 'comparison':
      return Network;
    case 'trend':
      return TrendingUp;
    case 'city':
      return DollarSign;
    default:
      return BookOpen;
  }
};

export default function TopicClusterNav({ 
  cluster, 
  className = '' 
}: TopicClusterNavProps) {
  const topicClusters = buildTopicClusters();
  const clustersToShow = cluster === 'all' 
    ? Object.values(topicClusters)
    : topicClusters[cluster] 
      ? [topicClusters[cluster]]
      : [];

  if (clustersToShow.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="topic-clusters" 
      className={`mb-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center border-2 border-blue-300 dark:border-blue-700 flex-shrink-0 shadow-md">
          <Network className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 id="topic-clusters" className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Topic Clusters
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore related content organized by topics
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {clustersToShow.map((topicCluster, clusterIndex) => (
          <div 
            key={clusterIndex}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5"
          >
            {/* Hub */}
            <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <Link
                href={topicCluster.hub.href}
                className="group flex items-start gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 dark:from-amber-600 dark:to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <BookOpen className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {topicCluster.hub.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {topicCluster.hub.description}
                  </p>
                </div>
              </Link>
            </div>

            {/* Spokes */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Related Topics:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topicCluster.spokes.map((spoke, spokeIndex) => {
                  const Icon = getIconForType(spoke.type);
                  return (
                    <Link
                      key={spokeIndex}
                      href={spoke.href}
                      className="group flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex-shrink-0 transition-colors" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors truncate">
                        {spoke.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
