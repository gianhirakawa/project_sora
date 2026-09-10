"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACTIVE_ASSUMPTION_SET } from "@/features/calculator/assumptions";
import {
  calculateSolarEstimate,
  type CalculatorResult,
} from "@/features/calculator/calculator";

const A = ACTIVE_ASSUMPTION_SET;

/**
 * Bill ranges shown as quick-pick chips (v2 hero quick-calc).
 * Removes the "I don't know my bill" drop-off.
 */
const CHIPS: ReadonlyArray<{ bill: number; label: string }> = [
  { bill: 4000, label: "₱3k–5k" },
  { bill: 8000, label: "₱6k–10k" },
  { bill: 14000, label: "₱12k–16k" },
  { bill: 22000, label: "₱20k+" },
];

const MIN_BILL = 500;

const pesoK = (n: number) =>
  n >= 1000
    ? `₱${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : `₱${Math.round(n)}`;

const kwp = (n: number) => n.toFixed(1).replace(/\.0$/, "");

/**
 * The mini model is deliberately rough. It reuses the SAME domain pipeline
 * as the full calculator (features/calculator) so homepage numbers never
 * contradict /calculate — with national-average assumptions:
 * visayas PSH (5.0 ≈ PH average), typical (medium) daytime usage, savings
 * goal. The site survey is what refines this to real numbers.
 */
function estimate(bill: number): CalculatorResult {
  return calculateSolarEstimate({
    monthlyBillPhp: bill,
    region: "visayas",
    daytimeUsage: "medium",
    goal: "savings",
  });
}

/**
 * Motion hooks — port of the v2 draft's count-up (`animateTo`) with the
 * site-wide reduced-motion contract (instant values, no rAF work).
 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Eases a number from 0 up to `target` (700ms, ease-out cubic) and restarts
 * on every target change — the range-chip "count-up" from the v2 draft.
 */
function useAnimatedNumber(target: number, duration = 700): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);

  return value;
}

/**
 * The three big result stats. Every figure counts up from zero whenever the
 * estimate changes (chip click or live typing), matching the v2 draft.
 */
function EstimateStats({ result }: { result: CalculatorResult }) {
  const kwMin = useAnimatedNumber(result.systemKwp[0]);
  const kwMax = useAnimatedNumber(result.systemKwp[1]);
  const saveLo = useAnimatedNumber(result.monthlySavingsPhp[0]);
  const saveHi = useAnimatedNumber(result.monthlySavingsPhp[1]);
  const pbLo = useAnimatedNumber(result.paybackYears[0]);
  const pbHi = useAnimatedNumber(result.paybackYears[1]);

  return (
    <div className="grid gap-4 p-5 sm:grid-cols-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-paper/60">
          Indicative size
        </p>
        <p className="tnum mt-1 font-display text-2xl font-extrabold text-sun">
          {kwp(kwMin)}–{kwp(kwMax)} kW
        </p>
        <p className="mt-0.5 text-xs text-paper/60">
          {result.panelCount[0]}–{result.panelCount[1]} panels
        </p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-paper/60">
          Monthly savings
        </p>
        <p className="tnum mt-1 font-display text-2xl font-extrabold">
          {pesoK(saveLo)} – {pesoK(saveHi)}
        </p>
        <p className="mt-0.5 text-xs text-paper/60">range, before survey</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-paper/60">
          Simple payback
        </p>
        <p className="tnum mt-1 font-display text-2xl font-extrabold">
          {pbLo.toFixed(1)}–{pbHi.toFixed(1)}
        </p>
        <p className="mt-0.5 text-xs text-paper/60">years, indicative</p>
      </div>
    </div>
  );
}

/**
 * Inline "instant indicative estimate" card in the hero jumbotron (v2).
 *
 * The form keeps `id="quick-calc"` on purpose: the StickyCta component
 * watches this element and slides the mobile CTA bar in once the hero is
 * out of view (same trigger as the reference design).
 */
export function HeroEstimator() {
  const [bill, setBill] = useState("");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [activeChip, setActiveChip] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAssump, setShowAssump] = useState(false);

  const applyBill = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    const next = digits ? Number(digits).toLocaleString("en-PH") : "";
    setBill(next);
    // Live-update once a result is on screen (matches reference behavior).
    if (result) submit(next ? Number(digits) : undefined);
  };

  const submit = (raw?: number) => {
    const value = raw ?? (bill ? Number(bill.replace(/[^\d]/g, "")) : 0);
    if (!value || value < MIN_BILL) {
      setError(
        "Enter a monthly bill of at least ₱500 to see an indicative estimate.",
      );
      return;
    }
    setError(null);
    setResult(estimate(value));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const onChip = (chipBill: number) => {
    setBill(chipBill.toLocaleString("en-PH"));
    setActiveChip(chipBill);
    setError(null);
    setResult(estimate(chipBill));
  };

  return (
    <form
      id="quick-calc"
      noValidate
      onSubmit={onSubmit}
      className="relative z-20 -mt-8 mx-2 rounded-2xl border border-line bg-white p-5 shadow-float sm:mx-6 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="block h-[3px] w-8 rounded-full bg-sunrise"
        />
        <p className="font-display text-sm font-bold uppercase tracking-wide text-ink-soft">
          Instant indicative estimate
        </p>
      </div>

      <label
        htmlFor="hero-bill"
        className="mt-3 block font-display text-base font-bold"
      >
        What&apos;s your average monthly electric bill?
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-bold text-ink-soft"
          >
            ₱
          </span>
          <input
            id="hero-bill"
            name="bill"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="8,450"
            value={bill}
            onChange={(e) => {
              applyBill(e.target.value);
              setActiveChip(null);
            }}
            className="tnum min-h-13 w-full rounded-full border-2 border-line bg-paper pl-10 pr-4 font-display text-lg font-bold text-ink placeholder:font-normal placeholder:text-ink-soft/50 focus:border-sun focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
          />
        </div>
        <button
          type="submit"
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-semibold text-paper transition hover:bg-dusk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          Estimate
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* quick-pick chips */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-soft">
          Or pick a range:
        </span>
        {CHIPS.map((c) => (
          <button
            key={c.bill}
            type="button"
            data-bill={c.bill}
            onClick={() => onChip(c.bill)}
            className={`chip rounded-full border px-3 py-1 text-xs font-semibold transition hover:border-sun hover:text-ink focus-visible:outline-2 focus-visible:outline-sun ${
              activeChip === c.bill
                ? "border-sun bg-paper text-ink"
                : "border-line bg-paper text-ink-soft"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Result card. The wrapper is always mounted and animates
          grid-template-rows 0fr → 1fr, so the card expands fluidly (fast,
          ~300ms) instead of popping in. Reduced-motion is neutralized by
          the global transition-duration override in globals.css. */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          result ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
      {result && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-ink text-paper">
          <div aria-hidden="true" className="h-[3px] w-full bg-sunrise" />
          <EstimateStats result={result} />

          <div className="flex flex-col gap-2 border-t border-paper/10 p-5 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-paper/60">
              Indicative only — not an engineering-final or guaranteed figure.{" "}
              <button
                type="button"
                onClick={() => setShowAssump((v) => !v)}
                aria-expanded={showAssump}
                className="font-semibold text-sun underline underline-offset-4"
              >
                {showAssump ? "Hide assumptions" : "See assumptions"}
              </button>
            </p>
            <Link
              href="/calculate"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-sun px-5 font-display text-sm font-semibold text-ink shadow-[0_2px_0_0_rgb(250_246_238)] transition hover:bg-sun-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
            >
              Refine this in the full calculator →
            </Link>
          </div>

          {showAssump && (
            <p className="border-t border-paper/10 px-5 py-4 text-xs leading-relaxed text-paper/60">
              Rough model used on this page: a reference tariff of ₱
              {A.tariffPhpPerKwh}/kWh, {A.peakSunHoursByRegion.visayas} peak
              sun-hours per day (island average), about{" "}
              {Math.round(A.selfConsumptionByDaytime.medium * 100)}% of solar
              output used in your own home with the rest credited under
              net-metering (₱{A.exportCreditPhpPerKwh}/kWh), and an installed
              cost of {pesoK(A.installedCostPerKwpRange[0])}–
              {pesoK(A.installedCostPerKwpRange[1])} per kW. Your real numbers
              depend on your utility rate, roof, shading, and when you
              actually use power — the free site survey is what turns this
              into a firm proposal.
            </p>
          )}
        </div>
      )}
        </div>
      </div>

      <p
        className={`mt-3 text-xs ${error ? "text-ember" : "text-ink-soft"}`}
        role={error ? "alert" : undefined}
      >
        {error ??
          "Indicative only — the free site survey turns this into a firm proposal."}
      </p>
    </form>
  );
}
