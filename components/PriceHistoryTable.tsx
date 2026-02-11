/**
 * Price History Table Component
 * Displays historical price data in a table format
 */

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';

interface PriceHistoryPoint {
  date: string;
  price: number;
}

interface PriceHistoryTableProps {
  data?: PriceHistoryPoint[];
  title?: string;
  metalName?: string;
  itemsPerPage?: number; // Number of items per page (default: all items, no pagination)
  caratData?: {
    '18k'?: PriceHistoryPoint[];
    '22k'?: PriceHistoryPoint[];
    '24k'?: PriceHistoryPoint[];
  };
  showCaratSelector?: boolean;
}

export default function PriceHistoryTable({
  data,
  title = 'Price History',
  metalName = 'Gold',
  itemsPerPage,
  caratData,
  showCaratSelector = false,
}: PriceHistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarat, setSelectedCarat] = useState<'18k' | '22k' | '24k'>('24k');
  
  // Use carat-specific data if available, otherwise use default data
  const activeData = showCaratSelector && caratData 
    ? caratData[selectedCarat] || []
    : data || [];

  // Reset page when carat changes
  useEffect(() => {
    if (showCaratSelector) {
      setCurrentPage(1);
    }
  }, [selectedCarat, showCaratSelector]);

  if (!Array.isArray(activeData) || activeData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow">
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No historical data available</p>
        </div>
      </div>
    );
  }

  // Normalize dates and calculate price changes
  const normalizedData = activeData
    .filter((point) => point && point.date && typeof point.price === 'number')
    .map((point) => {
    // Handle different date formats
    let normalizedDate: string = point.date || '';
    if (point.date && point.date.includes('T')) {
      const splitResult = point.date.split('T');
      normalizedDate = splitResult[0] || point.date || '';
    } else if (point.date && point.date.match(/^\d{4}-\d{2}$/)) {
      // If it's just YYYY-MM, use the first day of the month
      normalizedDate = `${point.date}-01`;
    }
    
    return {
      ...point,
      date: normalizedDate,
    };
  });

  // Sort by date first (oldest to newest) for proper change calculation
  const sortedByDate = [...normalizedData].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB; // Oldest first for change calculation
  });

  // Calculate price changes (comparing with previous entry)
  const dataWithChanges = sortedByDate.map((point, index) => {
    const previousEntry = index > 0 ? sortedByDate[index - 1] : null;
    const previousPrice = previousEntry?.price ?? null;
    const change = previousPrice !== null ? point.price - previousPrice : null;
    const changePercent = previousPrice !== null && previousPrice !== 0 && change !== null ? ((change / previousPrice) * 100) : null;

    return {
      ...point,
      change,
      changePercent,
      trend: change !== null && change > 0 ? 'up' : change !== null && change < 0 ? 'down' : change === 0 ? 'neutral' : null,
    };
  });

  // Sort by date (newest first) for display
  const sortedData = [...dataWithChanges].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Newest first
  });

  // Calculate pagination
  const totalItems = sortedData.length;
  const itemsPerPageValue = itemsPerPage || totalItems; // If no pagination specified, show all
  const totalPages = Math.ceil(totalItems / itemsPerPageValue);
  const startIndex = (currentPage - 1) * itemsPerPageValue;
  const endIndex = startIndex + itemsPerPageValue;

  // Apply pagination to sorted data
  const displayData = itemsPerPage 
    ? sortedData.slice(startIndex, endIndex)
    : sortedData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 card-shadow hover:card-shadow-hover transition-all duration-200">
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0 shadow-md">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 dark:text-amber-400" />
        </div>
        <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            {title}
          </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Historical {metalName} prices with daily changes
              {itemsPerPage && ` (${totalItems} total records)`}
          </p>
          </div>
        </div>
        {showCaratSelector && caratData && (
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2.5 border border-slate-200 dark:border-slate-700">
            <label htmlFor="carat-selector" className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
              Carat:
            </label>
            <select
              id="carat-selector"
              value={selectedCarat}
              onChange={(e) => {
                setSelectedCarat(e.target.value as '18k' | '22k' | '24k');
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-sm font-semibold bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm hover:shadow-md cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-right pr-10"
              style={{
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25em 1.25em',
              }}
            >
              <option value="24k">24K (Purest)</option>
              <option value="22k">22K (Jewelry)</option>
              <option value="18k">18K (Jewelry)</option>
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse table-fixed" style={{ minWidth: '100%' }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '25%' }} className="hidden sm:table-column" />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b-2 border-slate-300 dark:border-slate-600">
              <th className="px-1.5 sm:px-2 lg:px-3 py-2 text-left text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-1.5 sm:px-2 lg:px-3 py-2 text-right text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-1.5 sm:px-2 lg:px-3 py-2 text-right text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                Change
              </th>
              <th className="px-1.5 sm:px-2 lg:px-3 py-2 text-right text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
            {displayData.map((row, index) => {
              const isEven = index % 2 === 0;
              const isLatest = currentPage === 1 && index === 0;

              return (
                <tr
                  key={index}
                  className={`transition-all duration-200 ${
                    isLatest
                      ? 'bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-emerald-950/20 dark:to-slate-800/50 border-l-4 border-emerald-500 dark:border-emerald-400 shadow-sm'
                      : isEven
                      ? 'bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:shadow-sm'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:shadow-sm'
                  }`}
                >
                  <td className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-2.5 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {isLatest && (
                        <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 flex-shrink-0">
                          New
                        </span>
                      )}
                      <span className={`font-medium text-[11px] sm:text-xs truncate ${
                        isLatest 
                          ? 'text-slate-900 dark:text-slate-50' 
                          : 'text-slate-900 dark:text-slate-50'
                      }`}>
                        <span className="sm:hidden">
                          {new Date(row.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        <span className="hidden sm:inline">
                          {new Date(row.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-2.5 whitespace-nowrap text-right overflow-hidden">
                    <span className={`font-semibold text-[11px] sm:text-xs ${
                      isLatest 
                        ? 'text-slate-900 dark:text-slate-50' 
                        : 'text-slate-900 dark:text-slate-50'
                    }`}>
                      {formatIndianCurrency(row.price)}
                    </span>
                  </td>
                  <td className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-2.5 whitespace-nowrap text-right hidden sm:table-cell overflow-hidden">
                    {row.change !== null ? (
                      <div className="flex items-center justify-end gap-1">
                        {row.trend === 'up' && (
                          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        )}
                        {row.trend === 'down' && (
                          <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400 flex-shrink-0" />
                        )}
                        {row.trend === 'neutral' && (
                          <Minus className="w-3 h-3 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                        )}
                        <span
                          className={`font-medium text-[11px] sm:text-xs ${
                            row.trend === 'up'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : row.trend === 'down'
                              ? 'text-red-600 dark:text-red-400'
                              : row.trend === 'neutral'
                              ? 'text-slate-500 dark:text-slate-400'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {row.change > 0 ? '+' : ''}
                          {formatIndianCurrency(Math.abs(row.change))}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] sm:text-xs">—</span>
                    )}
                  </td>
                  <td className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-2.5 whitespace-nowrap text-right overflow-hidden">
                    {row.changePercent !== null ? (
                      <div className="flex items-center justify-end gap-1">
                        {row.trend === 'up' && (
                          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0 sm:hidden" />
                        )}
                        {row.trend === 'down' && (
                          <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400 flex-shrink-0 sm:hidden" />
                        )}
                      <span
                          className={`font-medium text-[11px] sm:text-xs ${
                          row.trend === 'up'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : row.trend === 'down'
                            ? 'text-red-600 dark:text-red-400'
                            : row.trend === 'neutral'
                              ? 'text-slate-500 dark:text-slate-400'
                              : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {row.changePercent > 0 ? '+' : ''}
                        {row.changePercent.toFixed(2)}%
                      </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] sm:text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {itemsPerPage && totalPages > 1 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span className="hidden sm:inline">Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries</span>
              <span className="sm:hidden">{startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && currentPage > 1) {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
              
              <div className="flex items-center gap-0.5 sm:gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }
                      }}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                      className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:ring-offset-2 shadow-sm hover:shadow-md ${
                        currentPage === pageNum
                          ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900'
                          : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && currentPage < totalPages) {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 shadow-sm hover:shadow-md"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-900 dark:bg-slate-50 rounded"></div>
            <span>Latest price</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>Price increase</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3 text-red-600" />
              <span>Price decrease</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
