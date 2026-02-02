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

export default function ChartSection({ goldData, silverData }: ChartSectionProps) {
  // Use provided data or generate mock data
  const goldChartData = goldData || (goldData === undefined ? generateMockData(65000, 7) : []);
  const silverChartData = silverData || (silverData === undefined ? generateMockData(85000, 7) : []);

  if (goldChartData.length === 0 && silverChartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Chart data will appear once prices are loaded.
        </div>
      </div>
    );
  }

  // Combine data for chart
  const chartData = goldChartData.map((item, index) => ({
    date: item.date,
    gold: item.price,
    silver: silverChartData[index]?.price || 0,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Price Trends (Last 7 Days)
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Historical price movement for Gold and Silver
        </p>
      </div>

      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis
              dataKey="date"
              className="text-gray-600 dark:text-gray-400 text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              className="text-gray-600 dark:text-gray-400 text-xs"
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
            {goldChartData.length > 0 && (
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
            {silverChartData.length > 0 && (
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        * Chart shows approximate trends. Historical data builds up over time.
      </p>
    </div>
  );
}
