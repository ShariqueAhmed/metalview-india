/**
 * Chart Section Component
 * Displays price trends using Recharts
 */

'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
  const hasCopper = Array.isArray(copperData) && copperData.length > 0;
  const hasPlatinum = Array.isArray(platinumData) && platinumData.length > 0;
  const hasGold = Array.isArray(goldData) && goldData.length > 0;
  const hasSilver = Array.isArray(silverData) && silverData.length > 0;

  // Use provided data or generate mock data (only if not metal-specific)
  // If silverData is explicitly undefined, don't show silver even if gold is provided
  const shouldShowSilver = silverData !== undefined && hasSilver;
  const goldChartData = (hasCopper || hasPlatinum) ? [] : (goldData || (goldData === undefined && silverData === undefined ? generateMockData(65000, 7) : []));
  const silverChartData = (hasCopper || hasPlatinum || !shouldShowSilver) ? [] : (silverData || (silverData === undefined && goldData === undefined ? generateMockData(85000, 7) : []));
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
    // For gold/silver, show only what's available
    if (hasGold && !shouldShowSilver) {
      // Only gold
      chartData = goldChartData.map((item) => ({
        date: item.date,
        gold: item.price,
      }));
    } else if (hasSilver && !hasGold) {
      // Only silver
      chartData = silverChartData.map((item) => ({
        date: item.date,
        silver: item.price,
      }));
    } else {
      // Both gold and silver
      chartData = goldChartData.map((item, index) => ({
    date: item.date,
    gold: item.price,
    silver: silverChartData[index]?.price || 0,
  }));
    }
  }

  // Determine chart title and subtitle
  const chartTitle = title || (hasCopper || hasPlatinum ? 'Price Trends (Last 30 Days)' : 'Price Trends (Last 7 Days)');
  const chartSubtitle = subtitle || (hasCopper 
    ? 'Historical price movement for Copper'
    : hasPlatinum
    ? 'Historical price movement for Platinum'
    : hasGold && !shouldShowSilver
    ? 'Historical price movement for Gold'
    : hasSilver && !hasGold
    ? 'Historical price movement for Silver'
    : 'Historical price movement for Gold and Silver');

  // Determine if this is a copper chart for special styling
  const isCopperChart = hasCopper;
  const isPlatinumChart = hasPlatinum;

  // Get card styling based on metal type
  const getCardStyle = () => {
    if (isCopperChart) {
      return 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-2 border-orange-200 dark:border-orange-800';
    }
    if (isPlatinumChart) {
      return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800';
    }
    return 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800';
  };

  return (
    <div className={`${getCardStyle()} rounded-xl p-6 sm:p-8 card-shadow hover:card-shadow-hover transition-all duration-200 relative overflow-hidden`}>
      {/* Decorative background element for copper */}
      {isCopperChart && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-200/10 dark:bg-orange-800/10 rounded-full -mr-20 -mt-20"></div>
      )}
      
      <div className="relative">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`text-xl sm:text-2xl font-bold ${isCopperChart ? 'text-orange-900 dark:text-orange-100' : isPlatinumChart ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-slate-50'}`}>
              {chartTitle}
        </h2>
          </div>
          <p className={`text-sm sm:text-base font-medium ${isCopperChart ? 'text-orange-700 dark:text-orange-300' : isPlatinumChart ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>
            {chartSubtitle}
        </p>
      </div>

        {/* Chart Container */}
        <div className="w-full h-72 sm:h-96 bg-white/40 dark:bg-slate-900/40 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
        <ResponsiveContainer width="100%" height="100%">
            {isCopperChart ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="copperGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300/50 dark:stroke-slate-700/50" />
                <XAxis
                  dataKey="date"
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
                  tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                />
                <YAxis
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
                  tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '2px solid #f97316',
                    borderRadius: '12px',
                    color: '#111827',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                  formatter={(value: number) => [
                    formatIndianCurrency(value),
                    'Copper (₹/1kg)'
                  ]}
                  labelStyle={{
                    color: '#f97316',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="copper"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#copperGradient)"
                  name="Copper (₹/1kg)"
                  dot={{ r: 5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#ea580c', strokeWidth: 3, stroke: '#fff' }}
                />
              </AreaChart>
            ) : isPlatinumChart ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="platinumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300/50 dark:stroke-slate-700/50" />
                <XAxis
                  dataKey="date"
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
                  tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                />
                <YAxis
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
                  tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    color: '#111827',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                  formatter={(value: number) => [
                    formatIndianCurrency(value),
                    'Platinum (₹/10g)'
                  ]}
                  labelStyle={{
                    color: '#3b82f6',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="platinum"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#platinumGradient)"
                  name="Platinum (₹/10g)"
                  dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#2563eb', strokeWidth: 3, stroke: '#fff' }}
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-700" />
            <XAxis
              dataKey="date"
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
              tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
            />
            <YAxis
                  className="text-slate-600 dark:text-slate-400 text-xs font-medium"
              tick={{ fill: 'currentColor' }}
                  tickLine={{ stroke: 'currentColor' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                color: '#111827',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
              }}
              formatter={(value: number) => formatIndianCurrency(value)}
            />
            <Legend />
            {goldChartData.length > 0 && (
              <Line
                type="monotone"
                dataKey="gold"
                stroke="#d97706"
                    strokeWidth={3}
                name="Gold (₹/10g)"
                    dot={{ r: 5, fill: '#d97706', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, fill: '#b45309', strokeWidth: 3, stroke: '#fff' }}
              />
            )}
            {silverChartData.length > 0 && (
              <Line
                type="monotone"
                dataKey="silver"
                stroke="#6b7280"
                    strokeWidth={3}
                name="Silver (₹/1kg)"
                    dot={{ r: 5, fill: '#6b7280', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, fill: '#4b5563', strokeWidth: 3, stroke: '#fff' }}
              />
            )}
          </LineChart>
            )}
        </ResponsiveContainer>
      </div>

        <p className={`text-xs sm:text-sm mt-6 text-center font-medium ${isCopperChart ? 'text-orange-600 dark:text-orange-400' : isPlatinumChart ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
        * Chart shows approximate trends. Historical data builds up over time.
      </p>
      </div>
    </div>
  );
}
