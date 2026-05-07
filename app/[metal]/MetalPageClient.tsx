/**
 * Single-metal page client: /gold, /silver, /copper, /platinum, /palladium
 * Renders full price view for one metal with city selector (no tabs).
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import CitySelector from '@/components/CitySelector';
import type { MetalsApiResponse } from '@/app/api/metals/route';
import { getAvailableSilverCities } from '@/utils/silverFetcher';
import { formatCityName } from '@/utils/conversions';
import type { MetalType } from '@/components/MetalTabs';
import CombinedGoldPriceSection from '@/components/CombinedGoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import PriceHistoryTable from '@/components/PriceHistoryTable';
import TrendingCities from '@/components/TrendingCities';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import FAQSchema from '@/components/FAQSchema';
import FAQSection from '@/components/FAQSection';
import { getPeopleAlsoAskQuestions } from '@/utils/peopleAlsoAsk';
import { generateAggregateOfferSchema } from '@/utils/seo';
import LastUpdated from '@/components/LastUpdated';
import RelatedSearches from '@/components/RelatedSearches';
import TrendingKeywords from '@/components/TrendingKeywords';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AlertCircle } from 'lucide-react';
import { GUIDE_PAGES } from '@/utils/contentCatalog';

const ChartSection = dynamic(() => import('@/components/ChartSection'), {
  loading: () => (
    <div className="content-card p-6 sm:p-8 animate-pulse" style={{ minHeight: '400px' }}>
      <div className="h-72 sm:h-96 bg-slate-100 dark:bg-slate-800 rounded-xl" />
    </div>
  ),
  ssr: false,
});

const FALLBACK_CITIES = ['mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat'];

interface GoldTrendPoint {
  date: string;
  price: number;
}

interface MetalsData extends MetalsApiResponse {
  goldTrend18k?: GoldTrendPoint[];
  goldTrend22k?: GoldTrendPoint[];
  goldTrend24k?: GoldTrendPoint[];
}

function formatPriceLabel(value: number | null | undefined): string | null {
  if (value == null || Number.isNaN(value)) {
    return null;
  }

  return `₹${value.toLocaleString('en-IN')}`;
}

function getPrimaryPrice(data: MetalsData | null, metal: MetalType): number | null {
  if (!data) return null;

  switch (metal) {
    case 'gold':
      return data.gold_10g ?? null;
    case 'silver':
      return data.silver_1kg ?? null;
    case 'copper':
      return data.copper_1kg ?? null;
    case 'platinum':
      return data.platinum_10g ?? data.platinum ?? null;
    case 'palladium':
      return data.palladium_10g ?? data.palladium ?? null;
  }
}

function getPrimaryTrendData(data: MetalsData | null, metal: MetalType): GoldTrendPoint[] {
  if (!data) return [];

  switch (metal) {
    case 'gold':
      return data.goldTrend24k ?? data.goldTrend ?? [];
    case 'silver':
      return data.silverTrend ?? [];
    case 'copper':
      return data.copperTrend ?? [];
    case 'platinum':
    case 'palladium':
      return [];
  }
}

function getTrendSummary(points: GoldTrendPoint[]): string | null {
  if (!points || points.length < 2) {
    return null;
  }

  const latest = points[points.length - 1];
  const weekReference = points[Math.max(0, points.length - 7)];
  const monthReference = points[0];

  if (!latest || !weekReference || !monthReference) {
    return null;
  }

  const weekDirection = latest.price >= weekReference.price ? 'above' : 'below';
  const monthDirection = latest.price >= monthReference.price ? 'above' : 'below';

  return `The latest recorded rate is ${weekDirection} the recent 7-day reference and ${monthDirection} the oldest visible point in this history set, which helps separate a short-term move from a broader trend.`;
}

function getSourceLabel(metal: MetalType): string {
  switch (metal) {
    case 'gold':
    case 'silver':
      return 'Angel One city-level feeds';
    case 'copper':
      return 'established financial market data feeds';
    case 'platinum':
    case 'palladium':
      return 'commodity pricing feeds aggregated through our metal data providers';
  }
}

interface MetalPageClientProps {
  metal: MetalType;
  initialCity?: string;
  initialData?: MetalsData | null;
}

export default function MetalPageClient({ metal, initialCity, initialData }: MetalPageClientProps) {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity?.toLowerCase() || 'mumbai');
  const [data, setData] = useState<MetalsData | null>(initialData ?? null);
  const [previousData, setPreviousData] = useState<MetalsData | null>(null);
  const [isLoading, setIsLoading] = useState(initialData == null);
  const [error, setError] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<string[]>(FALLBACK_CITIES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [multiCityPrices, setMultiCityPrices] = useState<Array<{ city: string; price: number }>>([]);

  const fetchData = useCallback(async (city: string, isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/metals?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Failed to fetch metal prices');
      const result: MetalsData = await res.json();
      if (isRefresh) {
        setData((prev) => {
          setPreviousData(prev);
          return result;
        });
      } else {
        setData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (data?.city?.toLowerCase() === selectedCity) {
      return;
    }

    fetchData(selectedCity);
  }, [data?.city, selectedCity, fetchData]);

  useEffect(() => {
    if (initialCity) setSelectedCity(initialCity.toLowerCase());
  }, [initialCity]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setIsLoading(false);
      setError(null);
    }
  }, [initialData]);

  useEffect(() => {
    getAvailableSilverCities().then((cities) => {
      if (cities?.length) {
        const slugs = cities.map((c: { slug?: string; city?: string } | string) => (typeof c === 'string' ? c : c.slug || c.city || '')).filter(Boolean);
        if (slugs.length) setAvailableCities(slugs);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!data || !metal) return;
    const price = metal === 'gold' ? data.gold_10g : metal === 'silver' ? data.silver_1kg : metal === 'copper' ? data.copper_1kg : metal === 'platinum' ? data.platinum_10g : data.palladium_10g;
    if (price && price > 0) {
      const top = FALLBACK_CITIES.slice(0, 5).filter((c) => c !== (data.city || selectedCity));
      Promise.all(top.map(async (city) => {
        try {
          const r = await fetch(`/api/metals/${city}`);
          if (!r.ok) return null;
          const d = await r.json();
          const p = metal === 'gold' ? d.gold_10g : metal === 'silver' ? d.silver_1kg : metal === 'copper' ? d.copper_1kg : metal === 'platinum' ? d.platinum_10g : d.palladium_10g;
          return p > 0 ? { city, price: p } : null;
        } catch { return null; }
      })).then((results) => {
        const valid = results.filter((r): r is { city: string; price: number } => r !== null);
        if (valid.length >= 1) setMultiCityPrices([{ city: data.city || selectedCity, price }, ...valid]);
      });
    }
  }, [data, metal, selectedCity]);

  const generateFAQs = useCallback(() => {
    const cityName = data?.city ? data.city.charAt(0).toUpperCase() + data.city.slice(1) : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
    const priceKey = metal === 'gold' ? 'gold_10g' : metal === 'silver' ? 'silver_1kg' : metal === 'copper' ? 'copper_1kg' : metal === 'platinum' ? 'platinum_10g' : 'palladium_10g';
    const priceValue = data?.[priceKey as keyof MetalsData];
    const isValidPrice = typeof priceValue === 'number' && !isNaN(priceValue);
    const unit = metal === 'gold' || metal === 'platinum' || metal === 'palladium' ? '10 grams' : 'kilogram';
    const base = [
      { question: `What is the current ${metal} price in ${cityName}?`, answer: isValidPrice ? `The current ${metal} price in ${cityName} is ₹${(priceValue as number).toLocaleString('en-IN')} per ${unit}.` : `Check the current ${metal} price in ${cityName} above.` },
      { question: `How often are ${metal} prices updated?`, answer: `${metal.charAt(0).toUpperCase() + metal.slice(1)} prices on MetalView are updated in real-time.` },
      { question: `What factors affect ${metal} prices in India?`, answer: `International rates, USD/INR, import duties, demand, and government policies.` },
    ];
    if (metal === 'gold') {
      base.push({ question: 'What is the difference between 24K, 22K, and 18K gold?', answer: '24K is 99.9% pure; 22K is 91.6% (common for jewelry in India); 18K is 75% pure.' });
      base.push({ question: 'Is gold a good investment?', answer: 'Gold can be a hedge against inflation. Consider your goals and consult a financial advisor.' });
    }
    return base;
  }, [data, metal, selectedCity]);

  const formattedGoldPrices = useMemo(() => {
    if (!data || metal !== 'gold') return null;
    const g = (v: number | null | undefined) => v != null && typeof v === 'number' && !isNaN(v) ? v.toLocaleString('en-IN') : null;
    return { gold24k: g(data.gold_1g), gold22k: g(data.gold_22k_1g), gold18k: g(data.gold_18k_1g) };
  }, [data, metal]);

  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);
  const currentCityName = formatCityName(data?.city || selectedCity);
  const primaryPrice = getPrimaryPrice(data, metal);
  const primaryPriceLabel = formatPriceLabel(primaryPrice);
  const primaryUnit =
    metal === 'gold' || metal === 'platinum' || metal === 'palladium' ? '10 grams' : 'kilogram';
  const trendSummary = getTrendSummary(getPrimaryTrendData(data, metal));
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${metalName} Prices`, href: `/${metal}` },
  ];

  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main id="main-content" className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full" role="main">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{metalName} Price Today in India – Live Rates</h1>

        <section className="mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-700/80" aria-labelledby="market-overview">
          <h2 id="market-overview" className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">{metalName} – Market Overview</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Real-time {metalName.toLowerCase()} pricing across Indian cities</p>
          {data?.updated_at && <LastUpdated date={data.updated_at} className="mt-1" />}
        </section>

        {/* SEO content block - single metal */}
        <section className="mb-8 content-card p-6 sm:p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{metalName} Price Today in India – Live Rates &amp; Market Insights</h2>
            <div className="text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
              {metal === 'gold' && formattedGoldPrices?.gold24k && (
                <p>The <strong>price of gold in India today</strong> is <strong>₹{formattedGoldPrices.gold24k} per gram</strong> (24K), <strong>₹{formattedGoldPrices.gold22k} per gram</strong> (22K), and <strong>₹{formattedGoldPrices.gold18k} per gram</strong> (18K).</p>
              )}
              {metal === 'silver' && data?.silver_1kg != null && (
                <p>The <strong>silver price in India today</strong> is <strong>₹{data.silver_1kg.toLocaleString('en-IN')} per kilogram</strong>.</p>
              )}
              {metal === 'copper' && data?.copper_1kg != null && (
                <p>The <strong>copper price in India today</strong> is <strong>₹{data.copper_1kg.toLocaleString('en-IN')} per kilogram</strong>.</p>
              )}
              {metal === 'platinum' && data?.platinum_10g != null && (
                <p>The <strong>platinum price in India today</strong> is <strong>₹{data.platinum_10g.toLocaleString('en-IN')} per 10 grams</strong>.</p>
              )}
              {metal === 'palladium' && data?.palladium_10g != null && (
                <p>The <strong>palladium price in India today</strong> is <strong>₹{data.palladium_10g.toLocaleString('en-IN')} per 10 grams</strong>.</p>
              )}
              <p>MetalView provides accurate <strong>{metalName.toLowerCase()} prices in India</strong> across major cities. Prices are updated in real-time from trusted sources.</p>
              {metal === 'gold' && (
                <p>Learn more in our <Link href="/24k-vs-22k-vs-18k-gold" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">24K vs 22K vs 18K gold guide</Link> and <Link href="/gold-price-guide" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">gold price guide</Link>.</p>
              )}
              {metal === 'silver' && (
                <p>Read our <Link href="/silver-investment-guide" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">silver investment guide</Link> for context on rates and trends.</p>
              )}
              {(metal === 'copper' || metal === 'platinum' || metal === 'palladium') && (
                <p>For more on metal prices and investment, see our <Link href="/guides" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Guides &amp; Resources</Link>.</p>
              )}
            </div>
          </div>
        </section>

        <section className="mb-8 content-card p-6 sm:p-8">
          <h2 className="section-title mb-4">What Today&apos;s {metalName} Rate Means in {currentCityName}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Current benchmark</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {primaryPriceLabel
                  ? `${metalName} is currently quoted around ${primaryPriceLabel} per ${primaryUnit} for ${currentCityName}. Use that as a benchmark before comparing any dealer or platform quote.`
                  : `Use the live rate shown on this page as your benchmark before comparing quotes in ${currentCityName}.`}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Trend context</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {trendSummary ?? `The history table and chart help you judge whether today&apos;s ${metalName.toLowerCase()} move looks routine or unusually sharp before you act on the headline number.`}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Decision use</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Use this hub page when you want a national benchmark plus city-switching convenience. For final decision support, compare the matching city route, purity or unit, and the full billed quote.
              </p>
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">{error}</p>
              <button onClick={() => fetchData(selectedCity, true)} disabled={isRefreshing} className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline">Try again</button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <CitySelector cities={availableCities} selectedCity={selectedCity} onCityChange={setSelectedCity} />
        </div>

        {isLoading && !data && (
          <div className="space-y-6" style={{ minHeight: '400px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="content-card p-6 animate-pulse h-40" />
              ))}
            </div>
          </div>
        )}

        {data ? (
          <div>
            {metal === 'gold' ? (
              <div>
                <section aria-labelledby="gold-prices" className="mb-6">
                  <h2 id="gold-prices" className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Gold Prices</h2>
                  {data.city && <p className="text-sm text-slate-600 dark:text-slate-400">in {formatCityName(data.city)}</p>}
                  <CombinedGoldPriceSection
                    gold24k_10g={data.gold_10g ?? null}
                    gold22k_10g={data.gold_22k_10g ?? null}
                    gold18k_10g={data.gold_18k_10g ?? null}
                    gold24k_1g={data.gold_1g ?? null}
                    gold22k_1g={data.gold_22k_1g ?? null}
                    gold18k_1g={data.gold_18k_1g ?? null}
                    gold24k_difference={data.gold_24k_difference ?? null}
                    gold22k_difference={data.gold_22k_difference ?? null}
                    gold18k_difference={data.gold_18k_difference ?? null}
                    gold24k_percentage={data.gold_24k_percentage ?? null}
                    gold22k_percentage={data.gold_22k_percentage ?? null}
                    gold18k_percentage={data.gold_18k_percentage ?? null}
                  />
                </section>
                {data.gold_10g ? (
                  <section className="mb-8">
                    <GoldWeightPrices
                      goldPrice10g={data.gold_10g}
                      goldPrice1g={data.gold_1g ?? data.gold_10g / 10}
                      gold22kPrice10g={data.gold_22k_10g}
                      gold22kPrice1g={data.gold_22k_1g}
                      gold18kPrice10g={data.gold_18k_10g}
                      gold18kPrice1g={data.gold_18k_1g}
                    />
                  </section>
                ) : null}
              </div>
            ) : null}

            {metal === 'silver' && data.silver_1kg != null && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Silver Prices</h2>
                {data.city && <p className="text-sm text-slate-600 dark:text-slate-400">in {formatCityName(data.city)}</p>}
                <SilverPriceSection price1kg={data.silver_1kg} price1g={data.silver_1g} previousPrice1kg={previousData?.silver_1kg ?? null} percentageChange={data.silverPercentageChange ?? null} />
              </section>
            )}

            {metal === 'copper' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Copper Prices</h2>
                {data.city && <p className="text-sm text-slate-600 dark:text-slate-400">in {formatCityName(data.city)}</p>}
                {data.copper_1kg != null ? (
                  <CopperPriceSection price1kg={data.copper_1kg} price100g={data.copper_100g ?? null} percentageChange={data.copperPercentageChange ?? null} />
                ) : (
                  <div className="content-card p-6 text-center text-slate-600 dark:text-slate-400">Copper price data is temporarily unavailable. Please try again later.</div>
                )}
              </section>
            )}

            {metal === 'platinum' && (
              <div>
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Platinum Prices</h2>
                  {data.city && <p className="text-sm text-slate-600 dark:text-slate-400">in {formatCityName(data.city)}</p>}
                  <PlatinumPriceSection price1g={data.platinum_1g ?? data.platinum ?? null} price10g={data.platinum_10g ?? null} previousPrice1g={previousData?.platinum_1g ?? previousData?.platinum ?? null} previousPrice10g={previousData?.platinum_10g ?? null} percentageChange={data.platinumPercentageChange ?? null} variationType={data.platinumVariationType} variation={data.platinumVariation} />
                </section>
                <section className="mb-12">
                  <ChartSection
                    platinumData={data.platinum_10g || data.platinum ? [{ date: '1', price: data.platinum_10g || data.platinum || 0 }, { date: '2', price: (data.platinum_10g || data.platinum || 0) * 0.99 }, { date: '3', price: (data.platinum_10g || data.platinum || 0) * 1.01 }] : undefined}
                    subtitle="Platinum price movement"
                  />
                </section>
              </div>
            )}

            {metal === 'palladium' && data.palladium_10g != null && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Palladium Prices</h2>
                {data.city && <p className="text-sm text-slate-600 dark:text-slate-400">in {formatCityName(data.city)}</p>}
                <PalladiumPriceSection price1g={data.palladium_1g ?? null} price10g={data.palladium_10g ?? null} previousPrice1g={previousData?.palladium_1g ?? null} previousPrice10g={previousData?.palladium_10g ?? null} percentageChange={data.palladiumPercentageChange ?? null} variationType={data.palladiumVariationType} variation={data.palladiumVariation} />
              </section>
            )}

            <section className="mb-8">
              <h2 className="sr-only">{metalName} Price History</h2>
              <PriceHistoryTable
                data={metal === 'gold' ? data.goldTrend24k : metal === 'silver' ? data.silverTrend : data.copperTrend}
                title={`${metalName} Price History`}
                metalName={metalName}
                itemsPerPage={
                  metal === 'copper' ? 15 : metal === 'palladium' || metal === 'platinum' ? 10 : undefined
                }
                showCaratSelector={metal === 'gold'}
                caratData={metal === 'gold' ? ({ '24k': data.goldTrend24k, '22k': data.goldTrend22k, '18k': data.goldTrend18k }) : undefined}
              />
            </section>

            <section className="mb-8">
              <ChartSection
                goldData={metal === 'gold' && data.goldTrend24k ? data.goldTrend24k.map((p) => ({ date: p.date, price: p.price })) : undefined}
                silverData={metal === 'silver' && data.silverTrend ? data.silverTrend.map((p) => ({ date: p.date, price: p.price })) : undefined}
                copperData={metal === 'copper' && data.copperTrend ? data.copperTrend.map((p) => ({ date: p.date, price: p.price })) : undefined}
                subtitle={`Historical trends for ${metalName}`}
                disableMockData={metal === 'platinum' || metal === 'palladium'}
              />
            </section>

            <TrendingKeywords limit={12} />

            {data.trendingCities?.length ? (
              <section className="mb-8">
                <TrendingCities cities={data.trendingCities} selectedCity={selectedCity} onCityClick={setSelectedCity} />
              </section>
            ) : null}

            <section className="mb-8 content-card p-6 sm:p-8">
              <h2 className="section-title mb-4">{metalName} Prices in Other Cities</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Compare across major Indian cities.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {FALLBACK_CITIES.filter((c) => c !== selectedCity).slice(0, 12).map((otherCity) => (
                  <Link key={otherCity} href={`/${metal}/price-in/${otherCity}`} className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-700/50 text-center transition-colors">
                    {formatCityName(otherCity)}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-8 content-card p-6 sm:p-8">
              <h2 className="section-title mb-4">Other Metal Prices</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">View live prices for other metals.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(['gold', 'silver', 'copper', 'platinum', 'palladium'] as MetalType[]).filter((m) => m !== metal).map((m) => (
                  <Link key={m} href={`/${m}`} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-center text-slate-700 dark:text-slate-300 hover:bg-amber-50/80 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-700/50 transition-colors">
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-8 content-card p-6 sm:p-8">
              <h2 className="section-title mb-4">Explore {metalName} by Intent</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Move between live rates, city pages, and editorial explainers depending on whether you are comparing a quote, researching a purchase, or tracking the broader market.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/cities" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Browse all city pages</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Use the city index when you want to compare local benchmarks before opening a metal-specific page.</p>
                </Link>
                <Link href="/guides" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Open the guides hub</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Jump into deeper explainers on purity, taxes, investment use cases, and city differences.</p>
                </Link>
                {GUIDE_PAGES.filter((page) => page.metal === metal || page.metals?.includes(metal)).slice(0, 2).map((page) => (
                  <Link key={page.href} href={page.href} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">{page.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{page.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-8 content-card p-6 sm:p-8">
              <h2 className="section-title mb-4">Why This Page Exists</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Publisher purpose</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    This is a benchmark page meant to help readers interpret {metalName.toLowerCase()} rates in India with city context, trend history, and supporting explainers.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Human review signals</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We pair live price data with guides, FAQs, methodology notes, and a visible contact route so readers can understand how the benchmark should be used.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 p-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Trust pages</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Review our <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Editorial Policy</Link>, <Link href="/methodology" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Methodology</Link>, and <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Contact</Link> page for more detail.
                  </p>
                </div>
              </div>
            </section>

            <RelatedSearches metal={metal} city={data?.city || selectedCity} />
            <section className="mb-8">
              <FAQSection
                title={`Frequently Asked Questions About ${metalName}`}
                faqs={generateFAQs()}
              />
            </section>
            <YouMayAlsoLike currentMetal={metal} currentCity={data?.city || selectedCity} pageType="metal-hub" />

            <section className="mb-8 content-card p-6 sm:p-8">
              <h2 className="section-title mb-4">How MetalView Sources {metalName} Prices</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Primary source</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {metalName} prices on this page are pulled from {getSourceLabel(metal)} and normalized for MetalView&apos;s city and history views.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Update cadence</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We refresh benchmark data regularly and show a visible last-updated timestamp so readers can judge freshness before relying on a quoted rate.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">What to verify</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Always confirm purity, unit size, taxes, fabrication or making charges, and availability with the seller. See our <Link href="/about" className="text-amber-600 dark:text-amber-400 hover:underline">About</Link> page for methodology.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">For deeper explainers on purity, investment use cases, and city-wise comparisons, browse <Link href="/guides" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Guides &amp; Resources</Link>.</p>
            </section>
          </div>
        ) : null}
      </main>
      <Footer />

      <StructuredData
        gold24k_10g={data?.gold_10g ?? null}
        gold22k_10g={data?.gold_22k_10g ?? null}
        silver_1kg={data?.silver_1kg ?? null}
        copper_1kg={data?.copper_1kg ?? null}
        platinum_10g={data?.platinum_10g ?? null}
        palladium_10g={data?.palladium_10g ?? null}
        location={data?.city || selectedCity}
        lastUpdated={data?.updated_at}
        metalType={metal}
        pageType="metal-hub"
      />
      <FAQSchema faqs={[...generateFAQs(), ...getPeopleAlsoAskQuestions(metal)]} metal={metal} city={data?.city || selectedCity} />
      {multiCityPrices.length > 1 && (() => {
        const unit = metal === 'gold' || metal === 'platinum' || metal === 'palladium' ? '10g' : '1kg';
        const schema = generateAggregateOfferSchema(multiCityPrices, metal, unit);
        if (Object.keys(schema).length > 0) {
          return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
        }
        return null;
      })()}
    </div>
  );
}
