/**
 * Search Console Widget Component
 * Displays Google Search Console performance metrics
 * Shows clicks, impressions, CTR, position, top queries, and top pages
 */

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Search, Eye, MousePointerClick, BarChart3, ExternalLink, AlertCircle } from 'lucide-react';

interface SearchConsoleData {
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  dateRange: {
    start: string;
    end: string;
  };
}

interface SearchConsoleWidgetProps {
  days?: number;
  className?: string;
}

export default function SearchConsoleWidget({ days = 28, className = '' }: SearchConsoleWidgetProps) {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSearchConsoleData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/search-console?days=${days}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
          if (result.message) {
            setMessage(result.message);
          }
        } else {
          setError(result.error || 'Failed to fetch Search Console data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSearchConsoleData();
  }, [days]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(2)}%`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-slate-900 rounded-xl border-2 border-red-200 dark:border-red-800 p-6 sm:p-8 card-shadow ${className}`}>
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
          <h3 className="text-lg font-semibold">Error Loading Search Console Data</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Search Console Performance
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {formatDate(data.dateRange.start)} - {formatDate(data.dateRange.end)}
            </p>
          </div>
        </div>
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
        >
          View in Search Console
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      {/* Setup Message */}
      {message && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Setup Required</p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Total Clicks */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <MousePointerClick className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Total Clicks
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {formatNumber(data.totalClicks)}
          </p>
        </div>

        {/* Total Impressions */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wide">
              Impressions
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {formatNumber(data.totalImpressions)}
          </p>
        </div>

        {/* Average CTR */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
              Avg CTR
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {formatPercentage(data.averageCTR)}
          </p>
        </div>

        {/* Average Position */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide">
              Avg Position
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {data.averagePosition > 0 ? data.averagePosition.toFixed(1) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Top Queries */}
      {data.topQueries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            Top Queries
          </h3>
          <div className="space-y-2">
            {data.topQueries.map((query, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-50 truncate">{query.query}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-600 dark:text-slate-400">
                    <span>{formatNumber(query.clicks)} clicks</span>
                    <span>{formatNumber(query.impressions)} impressions</span>
                    <span>{formatPercentage(query.ctr)} CTR</span>
                    <span>Pos. {query.position.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Pages */}
      {data.topPages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            Top Pages
          </h3>
          <div className="space-y-2">
            {data.topPages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-50 truncate">{page.page}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-600 dark:text-slate-400">
                    <span>{formatNumber(page.clicks)} clicks</span>
                    <span>{formatNumber(page.impressions)} impressions</span>
                    <span>{formatPercentage(page.ctr)} CTR</span>
                    <span>Pos. {page.position.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.topQueries.length === 0 && data.topPages.length === 0 && (
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" aria-hidden="true" />
          <p className="text-slate-600 dark:text-slate-400">
            No search data available. Data will appear once Search Console API is configured and your site starts receiving search traffic.
          </p>
        </div>
      )}
    </div>
  );
}
