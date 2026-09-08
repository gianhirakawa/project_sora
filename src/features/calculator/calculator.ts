import { ACTIVE_ASSUMPTION_SET, type SolarAssumptionSet } from "./assumptions";
import type { DaytimeUsage, Goal, RegionKey } from "./types";

/**
 * Pure calculator domain functions (Milestone 3).
 *
 * Pipeline (per CALCULATOR.md):
 *   monthly bill -> estimated consumption -> candidate solar size range
 *   -> production estimate -> self-consumed + exported energy
 *   -> savings range -> indicative cost range -> payback range
 *
 * All functions are pure and deterministic: same input + same assumption set
 * always yields the same numbers. No dates, no I/O, no global state.
 */

export interface CalculatorInput {
  /** Average monthly electric bill in PHP (required, bill-first). */
  monthlyBillPhp: number;
  /** Monthly consumption in kWh, if known. Overrides bill-derived estimate. */
  monthlyKwh?: number;
  /** Island region (drives peak sun hours). */
  region: RegionKey;
  /** Daytime usage level (drives self-consumption). */
  daytimeUsage: DaytimeUsage;
  /** Number of daytime-running AC units (optional, default 0). */
  acUnits?: number;
  /** Customer goal — battery estimate appears when backup is wanted. */
  goal: Goal;
}

export interface BatteryEstimate {
  /** Recommended battery capacity in usable kWh (rounded up). */
  capacityKwh: number;
  /** The essential load this is sized for (kW). */
  essentialLoadKw: number;
  /** Target outage coverage (hours). */
  backupHours: number;
}

export interface CalculatorResult {
  assumptionsVersion: string;
  /** Estimated monthly consumption (kWh). */
  monthlyKwh: number;
  /** Recommended system size range (kWp), rounded up to 0.5 steps. */
  systemKwp: readonly [number, number];
  /** Estimated panel count for the size range. */
  panelCount: readonly [number, number];
  /** Approximate roof footprint for the size range (m²). */
  roofAreaSqm: readonly [number, number];
  /** Expected annual generation for the size range (kWh). */
  annualGenerationKwh: readonly [number, number];
  /** Estimated monthly savings range (PHP). */
  monthlySavingsPhp: readonly [number, number];
  /** Estimated annual savings range (PHP). */
  annualSavingsPhp: readonly [number, number];
  /**
   * Simple payback range (years) for the full-offset (upper) system size,
   * [best case, worst case] across the installed-cost range.
   */
  paybackYears: readonly [number, number];
  /** Long-term savings scenario (no escalation). */
  longTermSavingsPhp: { years: number; range: readonly [number, number] };
  /** Effective self-consumption fraction used (for the assumptions display). */
  selfConsumptionFraction: number;
  /** Battery backup estimate — present when goal includes backup. */
  battery?: BatteryEstimate;
}

const DAYS_PER_YEAR = 365;
/** Round up to the nearest 0.5 step (epsilon guards float noise). */
const roundUpHalf = (x: number) => Math.ceil(x * 2 - 1e-9) / 2;

export function peakSunHoursFor(a: SolarAssumptionSet, region: RegionKey): number {
  return a.peakSunHoursByRegion[region] ?? a.peakSunHours;
}

/** Bill-first: derive consumption from the bill unless the customer knows it. */
export function estimateMonthlyKwh(
  input: Pick<CalculatorInput, "monthlyBillPhp" | "monthlyKwh">,
  a: SolarAssumptionSet,
): number {
  if (input.monthlyKwh && input.monthlyKwh > 0) return input.monthlyKwh;
  return input.monthlyBillPhp / a.tariffPhpPerKwh;
}

/** Self-consumption fraction: daytime-usage baseline + daytime AC bonus, capped. */
export function selfConsumptionFraction(
  input: Pick<CalculatorInput, "daytimeUsage" | "acUnits">,
  a: SolarAssumptionSet,
): number {
  const base = a.selfConsumptionByDaytime[input.daytimeUsage];
  const bonus = (input.acUnits ?? 0) * a.selfConsumptionAcBonus;
  return Math.min(a.selfConsumptionMax, base + bonus);
}

/** Annual specific yield: kWh generated per installed kWp per year. */
export function annualKwhPerKwp(a: SolarAssumptionSet, region: RegionKey): number {
  return peakSunHoursFor(a, region) * DAYS_PER_YEAR * (1 - a.systemLossFraction);
}

/** Monthly generation (kWh) for a given system size. */
export function monthlyGenerationKwh(
  kwp: number,
  a: SolarAssumptionSet,
  region: RegionKey,
): number {
  return (kwp * annualKwhPerKwp(a, region)) / 12;
}

/**
 * Recommended size range (kWp):
 * - upper = full bill offset (capped at maxSystemKwp)
 * - lower = ~30% offset floor, never below minSystemKwp
 * Both rounded up to 0.5 kWp steps.
 */
export function systemSizeRange(
  monthlyKwh: number,
  a: SolarAssumptionSet,
  region: RegionKey,
): readonly [number, number] {
  const perKwp = annualKwhPerKwp(a, region) / 12;
  const fullOffsetKwp = monthlyKwh / perKwp;
  const upper = Math.min(a.maxSystemKwp, roundUpHalf(fullOffsetKwp));
  const lower = Math.max(a.minSystemKwp, roundUpHalf(0.3 * fullOffsetKwp));
  return [lower, upper];
}

/** Panel count for a system size (rounded up to whole panels). */
export function panelCountFor(kwp: number, a: SolarAssumptionSet): number {
  return Math.ceil((kwp * 1000) / a.panelWattage);
}

/** Approximate roof footprint (m²) for a panel count. */
export function roofAreaSqmFor(panels: number, a: SolarAssumptionSet): number {
  return panels * a.roofAreaPerPanelSqm;
}

/** Monthly savings (PHP): self-consumed at tariff + exported at deferral credit. */
export function monthlySavingsPhp(
  kwp: number,
  a: SolarAssumptionSet,
  region: RegionKey,
  scf: number,
): number {
  const gen = monthlyGenerationKwh(kwp, a, region);
  return (
    gen * scf * a.tariffPhpPerKwh + gen * (1 - scf) * a.exportCreditPhpPerKwh
  );
}

/** Indicative installed cost range (PHP) for a system size. */
export function costRangePhp(
  kwp: number,
  a: SolarAssumptionSet,
): readonly [number, number] {
  return [
    kwp * a.installedCostPerKwpRange[0],
    kwp * a.installedCostPerKwpRange[1],
  ];
}

/** Simple payback (years) for a size, [best, worst] across the cost range. */
export function paybackYears(
  kwp: number,
  a: SolarAssumptionSet,
  region: RegionKey,
  scf: number,
): readonly [number, number] {
  const annual = monthlySavingsPhp(kwp, a, region, scf) * 12;
  const [costLow, costHigh] = costRangePhp(kwp, a);
  if (annual <= 0) return [0, 0];
  return [costLow / annual, costHigh / annual];
}

/** Battery estimate for essential-load backup (independent of system size). */
export function batteryEstimate(
  a: SolarAssumptionSet,
): BatteryEstimate {
  return {
    capacityKwh: Math.ceil(a.essentialLoadKw * a.backupHours * a.batteryDerate),
    essentialLoadKw: a.essentialLoadKw,
    backupHours: a.backupHours,
  };
}

/** Full pipeline — the single entry point used by the UI. */
export function calculateSolarEstimate(
  input: CalculatorInput,
  a: SolarAssumptionSet = ACTIVE_ASSUMPTION_SET,
): CalculatorResult {
  const monthlyKwh = estimateMonthlyKwh(input, a);
  const scf = selfConsumptionFraction(input, a);
  const [kwpLow, kwpHigh] = systemSizeRange(monthlyKwh, a, input.region);

  const panelCount: readonly [number, number] = [
    panelCountFor(kwpLow, a),
    panelCountFor(kwpHigh, a),
  ];
  const roofAreaSqm: readonly [number, number] = [
    roofAreaSqmFor(panelCount[0], a),
    roofAreaSqmFor(panelCount[1], a),
  ];
  const annualGenerationKwh: readonly [number, number] = [
    kwpLow * annualKwhPerKwp(a, input.region),
    kwpHigh * annualKwhPerKwp(a, input.region),
  ];
  const monthlySavings: readonly [number, number] = [
    monthlySavingsPhp(kwpLow, a, input.region, scf),
    monthlySavingsPhp(kwpHigh, a, input.region, scf),
  ];
  const annualSavings: readonly [number, number] = [
    monthlySavings[0] * 12,
    monthlySavings[1] * 12,
  ];

  // Payback is quoted for the full-offset (upper) size, [best, worst] cost.
  const payback: readonly [number, number] = paybackYears(
    kwpHigh,
    a,
    input.region,
    scf,
  );

  const longTermSavingsPhp = {
    years: a.longTermYears,
    range: [
      annualSavings[0] * a.longTermYears,
      annualSavings[1] * a.longTermYears,
    ] as const,
  };

  return {
    assumptionsVersion: a.version,
    monthlyKwh,
    systemKwp: [kwpLow, kwpHigh],
    panelCount,
    roofAreaSqm,
    annualGenerationKwh,
    monthlySavingsPhp: monthlySavings,
    annualSavingsPhp: annualSavings,
    paybackYears: payback,
    longTermSavingsPhp,
    selfConsumptionFraction: scf,
    battery:
      input.goal === "backup" || input.goal === "both"
        ? batteryEstimate(a)
        : undefined,
  };
}
