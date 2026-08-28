/**
 * GoldPriceCalculator
 * Interactive calculator that turns a live gold benchmark into an estimated
 * final bill: metal value + making charges + 3% GST. Purely a client-side
 * estimator; all rates are indicative and editable by the user.
 */

'use client';

import { useMemo, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { formatIndianCurrency } from '@/utils/conversions';

type Purity = '24k' | '22k' | '18k';

interface GoldPriceCalculatorProps {
  /** Live per-gram rates (₹) for each purity; any may be null if unavailable. */
  rate24k: number | null;
  rate22k: number | null;
  rate18k: number | null;
  city?: string;
  lastUpdated?: string | null;
}

const PURITY_LABELS: Record<Purity, string> = {
  '24k': '24K (99.9%)',
  '22k': '22K (91.6%)',
  '18k': '18K (75%)',
};

/** Approx 22K/18K from a 24K rate when a live per-purity rate is missing. */
function derivePerGram(rate24k: number | null, purity: Purity): number | null {
  if (rate24k == null || Number.isNaN(rate24k)) return null;
  switch (purity) {
    case '24k':
      return rate24k;
    case '22k':
      return rate24k * 0.916;
    case '18k':
      return rate24k * 0.75;
  }
}

export default function GoldPriceCalculator({
  rate24k,
  rate22k,
  rate18k,
  city,
  lastUpdated,
}: GoldPriceCalculatorProps) {
  const [purity, setPurity] = useState<Purity>('22k');
  const [weight, setWeight] = useState<string>('10');
  const [makingPct, setMakingPct] = useState<string>('10');
  const [applyGst, setApplyGst] = useState<boolean>(true);
  const [rateOverride, setRateOverride] = useState<string>('');

  const livePerGram = useMemo(() => {
    const direct = purity === '24k' ? rate24k : purity === '22k' ? rate22k : rate18k;
    return direct ?? derivePerGram(rate24k, purity);
  }, [purity, rate24k, rate22k, rate18k]);

  const ratePerGram = useMemo(() => {
    const override = parseFloat(rateOverride);
    if (!Number.isNaN(override) && override > 0) return override;
    return livePerGram;
  }, [rateOverride, livePerGram]);

  const result = useMemo(() => {
    const grams = parseFloat(weight);
    const makePctNum = parseFloat(makingPct);
    if (
      ratePerGram == null ||
      Number.isNaN(grams) ||
      grams <= 0
    ) {
      return null;
    }
    const metalValue = ratePerGram * grams;
    const making = metalValue * (Number.isNaN(makePctNum) ? 0 : makePctNum / 100);
    const preTax = metalValue + making;
    const gst = applyGst ? preTax * 0.03 : 0;
    const total = preTax + gst;
    return { grams, metalValue, making, gst, total, ratePerGram };
  }, [weight, makingPct, applyGst, ratePerGram]);

  const usingOverride = (() => {
    const o = parseFloat(rateOverride);
    return !Number.isNaN(o) && o > 0;
  })();

  const inputClass =
    'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900/40';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0">
          <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Gold Price Calculator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Estimate the final bill from the live benchmark{city ? ` (${city} rate)` : ''}
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Purity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(PURITY_LABELS) as Purity[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPurity(p)}
                  aria-pressed={purity === p}
                  className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                    purity === p
                      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{PURITY_LABELS[purity]}</p>
          </div>

          <div>
            <label htmlFor="gpc-weight" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Weight (grams)
            </label>
            <input
              id="gpc-weight"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={inputClass}
              placeholder="e.g. 10"
            />
          </div>

          <div>
            <label htmlFor="gpc-making" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Making charges (% of metal value)
            </label>
            <input
              id="gpc-making"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={makingPct}
              onChange={(e) => setMakingPct(e.target.value)}
              className={inputClass}
              placeholder="e.g. 10"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Typical retail range is 8–25%. Ask your jeweller for the exact figure.
            </p>
          </div>

          <div>
            <label htmlFor="gpc-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Rate per gram (₹) — optional override
            </label>
            <input
              id="gpc-rate"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={rateOverride}
              onChange={(e) => setRateOverride(e.target.value)}
              className={inputClass}
              placeholder={livePerGram != null ? `Live: ${Math.round(livePerGram)}` : 'Enter your dealer rate'}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              {usingOverride
                ? 'Using your custom rate.'
                : livePerGram != null
                  ? `Using the live ${purity.toUpperCase()} benchmark.`
                  : 'No live rate available — enter a rate to calculate.'}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={applyGst}
              onChange={(e) => setApplyGst(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-400"
            />
            Add 3% GST (standard on gold in India)
          </label>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Estimated breakdown</h3>
          {result ? (
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600 dark:text-slate-400">
                  Metal value ({result.grams}g × {formatIndianCurrency(result.ratePerGram)})
                </dt>
                <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(result.metalValue)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600 dark:text-slate-400">Making charges</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(result.making)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600 dark:text-slate-400">GST {applyGst ? '(3%)' : '(off)'}</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(result.gst)}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                <dt className="text-base font-semibold text-slate-900 dark:text-slate-50">Estimated total</dt>
                <dd className="text-base font-bold text-amber-600 dark:text-amber-400">{formatIndianCurrency(result.total)}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Enter a valid weight and a rate to see the estimate.
            </p>
          )}

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 p-3">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This is an indicative estimate. Actual bills vary with wastage, hallmarking, dealer
              premium, and how making charges are quoted (per gram vs percentage). Always confirm the
              final invoice with your jeweller.
            </p>
          </div>
        </div>
      </div>

      {lastUpdated && (
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
          Live benchmark last updated: {new Date(lastUpdated).toLocaleString('en-IN')}
        </p>
      )}
    </div>
  );
}
