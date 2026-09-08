import type { DaytimeUsage, RegionKey } from "./types";

/**
 * Versioned assumption record for calculator results.
 *
 * Every calculator result must be reproducible from exactly one of these
 * records. Per CALCULATOR.md: do not hard-code regulatory claims into
 * calculator logic — net-metering / tariff behavior lives here as data.
 *
 * Values are indicative reference figures, flagged for business sign-off.
 * To change behavior, add a new versioned set and point ACTIVE_ASSUMPTION_SET
 * at it — never edit a version in place.
 */
export interface SolarAssumptionSet {
  version: string;
  effectiveFrom: string;
  /** Reference residential tariff (PHP/kWh). Real bills vary widely. */
  tariffPhpPerKwh: number;
  /** Site-average peak sun hours by island region (peak sun hours/day). */
  peakSunHoursByRegion: Record<RegionKey, number>;
  /** Fallback peak sun hours for unmapped locations. */
  peakSunHours: number;
  /** Fraction of nameplate output lost (inverter, soiling, heat, wiring). */
  systemLossFraction: number;
  /** Baseline fraction of generation self-consumed on site, by daytime usage. */
  selfConsumptionByDaytime: Record<DaytimeUsage, number>;
  /** Additional self-consumption per daytime AC unit. */
  selfConsumptionAcBonus: number;
  /** Hard cap on self-consumption fraction. */
  selfConsumptionMax: number;
  /**
   * Credit for exported energy under net-metering deferral (PHP/kWh).
   * Conservative: ~90% of tariff.
   */
  exportCreditPhpPerKwh: number;
  /** Configured panel wattage used for panel-count estimates. */
  panelWattage: number;
  /** Roof footprint per installed panel (m²), including spacing. */
  roofAreaPerPanelSqm: number;
  /** Indicative installed cost per kWp (PHP), [low, high]. */
  installedCostPerKwpRange: readonly [number, number];
  /** System sizing bounds (kWp). */
  minSystemKwp: number;
  maxSystemKwp: number;
  /** Horizon for the long-term savings scenario (years, no escalation). */
  longTermYears: number;
  /** Battery backup sizing: essential load (kW) and target outage hours. */
  essentialLoadKw: number;
  backupHours: number;
  /** Inverter/DoD derate applied when sizing battery capacity (kWh). */
  batteryDerate: number;
}

export const ASSUMPTION_SET_V1: SolarAssumptionSet = {
  version: "sora-v1",
  effectiveFrom: "2025-06",
  tariffPhpPerKwh: 15.0,
  peakSunHoursByRegion: { luzon: 4.8, visayas: 5.0, mindanao: 5.2 },
  peakSunHours: 4.8,
  systemLossFraction: 0.25,
  selfConsumptionByDaytime: { low: 0.3, medium: 0.4, high: 0.55 },
  selfConsumptionAcBonus: 0.05,
  selfConsumptionMax: 0.75,
  exportCreditPhpPerKwh: 13.5,
  panelWattage: 550,
  roofAreaPerPanelSqm: 6,
  installedCostPerKwpRange: [95_000, 135_000],
  minSystemKwp: 1,
  maxSystemKwp: 15,
  longTermYears: 25,
  essentialLoadKw: 1,
  backupHours: 6,
  batteryDerate: 1.25,
};

/** The one set the live calculator currently uses. */
export const ACTIVE_ASSUMPTION_SET: SolarAssumptionSet = ASSUMPTION_SET_V1;
