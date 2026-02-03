/**
 * Chart Section Component
 * Displays price trends using Recharts
 */

'use client';

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
  goldData?: Array<{ date: string; price: number }>;
  silverData?: Array<{ date: string; price: number }>;
  copperData?: Array<{ date: string; price: number }>;
  platinumData?: Array<{ date: string; price: number }>;
  title?: string;
  subtitle?: string;
}

// Generate mock historical data (7 days)
function generateMockData(basePrice: number, days: number = 7) {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const price = basePrice * (1 + variation);

    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
    });
  }

  return data;
}

export default function ChartSection({ 
  goldData, 
  silverData, 
  copperData,
  platinumData,
  title,
  subtitle 
}: ChartSectionProps) {
  // Determine which metal data to use
  const hasCopper = copperData && copperData.length > 0;
  const hasPlatinum = platinumData && platinumData.length > 0;
  const hasGold = goldData && goldData.length > 0;
  const hasSilver = silverData && silverData.length > 0;

  // Use provided data or generate mock data (only if not metal-specific)
  const goldChartData = (hasCopper || hasPlatinum) ? [] : (goldData || (goldData === undefined ? generateMockData(65000, 7) : []));
  const silverChartData = (hasCopper || hasPlatinum) ? [] : (silverData || (silverData === undefined ? generateMockData(85000, 7) : []));
  const copperChartData = copperData || [];
  const platinumChartData = platinumData || [];

  if (goldChartData.length === 0 && silverChartData.length === 0 && copperChartData.length === 0 && platinumChartData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 card-shadow">
        <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400">
          Chart data will appear once prices are loaded.
        </div>
      </div>
    );
  }

  // Combine data for chart
  let chartData;
  if (hasCopper) {
    // For copper, show only copper data
    chartData = copperChartData.map((item) => ({
      date: item.date,
      copper: item.price,
    }));
  } else if (hasPlatinum) {
    // For platinum, show only platinum data
    chartData = platinumChartData.map((item) => ({
      date: item.date,
      platinum: item.price,
    }));
  } else {
    // For gold/silver, combine both
    chartData = goldChartData.map((item, index) => ({
      date: item.date,
      gold: item.price,
      silver: silverChartData[index]?.price || 0,
    }));
  }

  // Determine chart title and subtitle
  const chartTitle = title || (hasCopper || hasPlatinum ? 'Price Trends (Last 30 Days)' : 'Price Trends (Last 7 Days)');
  const chartSubtitle = subtitle || (hasCopper 
    ? 'Historical price movement for Copper'
    : hasPlatinum
    ? 'Historical price movement for Platinum'
    : 'Historical price movement for Gold and Silver');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6 card-shadow">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1 sm:mb-2">
          {chartTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {chartSubtitle}
        </p>
      </div>

      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-700" />
            <XAxis
              dataKey="date"
              className="text-slate-600 dark:text-slate-400 text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              className="text-slate-600 dark:text-slate-400 text-xs"
              tick={{ fill: 'currentColor' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#111827',
              }}
              formatter={(value: number) => formatIndianCurrency(value)}
            />
            <Legend />
            {hasCopper && (
              <Line
                type="monotone"
                dataKey="copper"
                stroke="#b45309"
                strokeWidth={2}
                name="Copper (₹/1kg)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {hasPlatinum && (
              <Line
                type="monotone"
                dataKey="platinum"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Platinum (₹/10g)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {!hasCopper && !hasPlatinum && goldChartData.length > 0 && (
              <Line
                type="monotone"
                dataKey="gold"
                stroke="#d97706"
                strokeWidth={2}
                name="Gold (₹/10g)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {!hasCopper && !hasPlatinum && silverChartData.length > 0 && (
              <Line
                type="monotone"
                dataKey="silver"
                stroke="#6b7280"
                strokeWidth={2}
                name="Silver (₹/1kg)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
        * Chart shows approximate trends. Historical data builds up over time.
      </p>
    </div>
  );
}
