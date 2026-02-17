'use client';

import { useState, useEffect } from 'react';
import CombinedGoldPriceSection from '@/components/CombinedGoldPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import { Loader2, RefreshCw } from 'lucide-react';

interface GoldData {
  gold_10g: number | null;
  gold_22k_10g?: number | null;
  gold_18k_10g?: number | null;
  gold_1g?: number | null;
  gold_22k_1g?: number | null;
  gold_18k_1g?: number | null;
  gold_24k_difference?: string | null;
  gold_22k_difference?: string | null;
  gold_18k_difference?: string | null;
  gold_24k_percentage?: string | null;
  gold_22k_percentage?: string | null;
  gold_18k_percentage?: string | null;
}

interface GoldPriceCityBlockProps {
  city: string;
  initialData: GoldData | null;
}

export function GoldPriceCityBlock({ city, initialData }: GoldPriceCityBlockProps) {
  const [data, setData] = useState<GoldData | null>(initialData);
  const [loading, setLoading] = useState(!initialData?.gold_10g);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData?.gold_10g) {
      setData(initialData);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/metals?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load gold price');
        return res.json();
      })
      .then((json: GoldData) => {
        if (!cancelled && json?.gold_10g != null) {
          setData(json);
          setError(null);
        } else if (!cancelled) {
          setError('Gold price is temporarily unavailable.');
        }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError('Unable to load gold price. Please try again.');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [city, initialData?.gold_10g]);

  if (loading) {
    return (
      <div className="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 min-h-[200px]">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" aria-hidden />
        <p className="text-slate-600 dark:text-slate-400">Loading gold price for {city}...</p>
      </div>
    );
  }

  if (error || !data?.gold_10g) {
    return (
      <div className="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 min-h-[200px]">
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-center">
          {error || 'Gold price is temporarily unavailable.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setError(null);
            fetch(`/api/metals?city=${encodeURIComponent(city)}`)
              .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed'))))
              .then((json: GoldData) => {
                if (json?.gold_10g != null) {
                  setData(json);
                  setError(null);
                } else setError('Gold price is temporarily unavailable.');
              })
              .catch(() => setError('Unable to load gold price. Please try again.'))
              .finally(() => setLoading(false));
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <CombinedGoldPriceSection
          gold24k_10g={data.gold_10g}
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
      </div>
      <div className="mb-8">
        <GoldWeightPrices
          goldPrice10g={data.gold_10g}
          goldPrice1g={data.gold_1g ?? null}
          gold22kPrice10g={data.gold_22k_10g ?? null}
          gold22kPrice1g={data.gold_22k_1g ?? null}
          gold18kPrice10g={data.gold_18k_10g ?? null}
          gold18kPrice1g={data.gold_18k_1g ?? null}
        />
      </div>
    </>
  );
}
