'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatIndianCurrency } from '@/utils/conversions';

interface ChartSectionProps {
  goldPrice?: number;
  silverPrice?: number;
  goldTrend?: any; // goldTrend data from API
  location?: string; // City location to get trend data
}

export default function ChartSection({ goldPrice, silverPrice, goldTrend, location }: ChartSectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Process goldTrend data to create chart data
  const processTrendData = () => {
    if (!goldTrend || !location) return [];

    // Find trend data for the current location
    const locationKey = location.toLowerCase();
    let cityTrendData = goldTrend[locationKey] || 
                       goldTrend[location] ||
                       goldTrend['delhi'] ||
                       goldTrend['mumbai'] ||
                       goldTrend['kolkata'] ||
                       goldTrend['bangalore'] ||
                       goldTrend['chennai'];

    // If still not found, try case-insensitive match
    if (!cityTrendData) {
      const trendKeys = Object.keys(goldTrend);
      const matchingKey = trendKeys.find(k => 
        k.toLowerCase() === locationKey ||
        k.toLowerCase().replace(/\s+/g, ' ') === locationKey ||
        k.toLowerCase().replace(/-/g, ' ') === locationKey
      );
      if (matchingKey) {
        cityTrendData = goldTrend[matchingKey];
      }
    }

    if (!cityTrendData) return [];

    // Get last 7 months of data (or available months)
    const months = Object.keys(cityTrendData)
      .sort()
      .reverse()
      .slice(0, 7)
      .reverse(); // Oldest to newest

    const chartData = months.map((month) => {
      const monthData = cityTrendData[month];
      if (!monthData || !monthData.lastDayPrice) return null;

      // Use lastDayPrice for the month (end of month price)
      const price24k_1g = monthData.lastDayPrice.TWENTY_FOUR;
      const price24k_10g = price24k_1g * 10; // Convert to 10gm

      // Parse date from month string (e.g., "2025-08" -> "Aug 2025")
      const [year, monthNum] = month.split('-');
      const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      
      return {
        date: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        dateObj: date,
        gold: price24k_10g,
        silver: silverPrice || 0,
      };
    }).filter(Boolean) as Array<{ date: string; dateObj: Date; gold: number; silver: number }>;

    // Sort by date
    chartData.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    // Remove dateObj after sorting
    return chartData.map(({ dateObj, ...rest }) => rest);
  };

  const chartData = processTrendData();

  // If no trend data but we have current price, show current price as single point
  let finalChartData = chartData;
  if (chartData.length === 0 && goldPrice) {
    const today = new Date();
    finalChartData = [{
      date: today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      gold: goldPrice,
      silver: silverPrice || 0,
    }];
  } else {
    // Add current price as the latest point if available
    if (goldPrice && chartData.length > 0) {
      const today = new Date();
      finalChartData = [
        ...chartData,
        {
          date: today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          gold: goldPrice,
          silver: silverPrice || 0,
        },
      ];
    }
  }

  // Check if we have multiple data points for proper line chart
  const hasMultiplePoints = finalChartData.length > 1;

  if (!goldPrice) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-6 shadow-md">
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Chart data will appear once prices are loaded
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Price Trends
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Monthly price trends for Gold (Last 7 Months)
        </p>
      </div>

      <div className="w-full h-80">
        {finalChartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            No trend data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={finalChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
              <XAxis
                dataKey="date"
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis
                className="text-gray-600 dark:text-gray-400"
                tick={{ fill: 'currentColor' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, rgba(255, 255, 255, 0.95))',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '8px',
                  color: 'var(--tooltip-text, #111827)',
                }}
                formatter={(value: number) => formatIndianCurrency(value)}
                labelStyle={{
                  color: 'var(--tooltip-text, #111827)',
                }}
              />
              <Legend />
              <Line
                type={hasMultiplePoints ? "monotone" : "linear"}
                dataKey="gold"
                stroke="#d4af37"
                strokeWidth={2}
                name="Gold (₹/10g)"
                dot={true}
                activeDot={{ r: 6 }}
              />
              {silverPrice && (
                <Line
                  type={hasMultiplePoints ? "monotone" : "linear"}
                  dataKey="silver"
                  stroke="#c0c0c0"
                  strokeWidth={2}
                  name="Silver (₹/1kg)"
                  dot={true}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      
      {isLoading && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          Loading historical data...
        </p>
      )}
      {finalChartData.length > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          Showing {finalChartData.length} data point{finalChartData.length !== 1 ? 's' : ''} from monthly trend data. Prices shown are end-of-month values.
        </p>
      )}
    </div>
  );
}
