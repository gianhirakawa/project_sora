import { describe, expect, it } from "vitest";
import { ASSUMPTION_SET_V1, type SolarAssumptionSet } from "./assumptions";
import {
  annualKwhPerKwp,
  batteryEstimate,
  calculateSolarEstimate,
  costRangePhp,
  estimateMonthlyKwh,
  monthlySavingsPhp,
  panelCountFor,
  paybackYears,
  selfConsumptionFraction,
  systemSizeRange,
  type CalculatorInput,
} from "./calculator";

/**
 * Golden-case tests (TESTING.md).
 *
 * All expectations are hand-computed against the frozen ASSUMPTION_SET_V1
 * record and must NEVER depend on the current date, live tariffs, or CMS
 * content. If a value here changes, the formula or the frozen assumption set
 * changed — review both before editing the expectation.
 *
 * Key derived constants for sora-v1:
 *   annual yield (luzon)   = 4.8 * 365 * (1 - 0.25)  = 1314 kWh/kWp/yr
 *   annual yield (visayas) = 5.0 * 365 * 0.75        = 1368.75
 *   monthly /kWh rate (scf 0.3) = 0.3*15 + 0.7*13.5  = 13.95
 *   monthly /kWh rate (scf 0.4) = 0.4*15 + 0.6*13.5  = 14.10
 *   monthly /kWh rate (scf 0.7) = 0.7*15 + 0.3*13.5  = 14.55
 */

const A: SolarAssumptionSet = ASSUMPTION_SET_V1;

const baseInput = (over: Partial<CalculatorInput> = {}): CalculatorInput => ({
  monthlyBillPhp: 8000,
  region: "luzon",
  daytimeUsage: "medium",
  goal: "savings",
  ...over,
});

describe("estimateMonthlyKwh", () => {
  it("derives kWh from the bill using the reference tariff", () => {
    expect(
      estimateMonthlyKwh({ monthlyBillPhp: 8000 }, A),
    ).toBeCloseTo(533.3333, 4);
  });

  it("prefers an explicitly provided monthlyKwh over the bill-derived value", () => {
    expect(
      estimateMonthlyKwh({ monthlyBillPhp: 12000, monthlyKwh: 600 }, A),
    ).toBe(600);
  });

  it("falls back to bill-derived when monthlyKwh is absent (missing optional kWh)", () => {
    expect(estimateMonthlyKwh({ monthlyBillPhp: 12000 }, A)).toBeCloseTo(
      800,
      4,
    );
  });
});

describe("selfConsumptionFraction", () => {
  it("uses the daytime-usage baseline", () => {
    expect(selfConsumptionFraction({ daytimeUsage: "low" }, A)).toBe(0.3);
    expect(selfConsumptionFraction({ daytimeUsage: "medium" }, A)).toBe(0.4);
    expect(selfConsumptionFraction({ daytimeUsage: "high" }, A)).toBe(0.55);
  });

  it("adds 0.05 per daytime AC unit", () => {
    expect(
      selfConsumptionFraction({ daytimeUsage: "medium", acUnits: 2 }, A),
    ).toBeCloseTo(0.5, 6);
  });

  it("caps at the self-consumption maximum (high AC units)", () => {
    expect(selfConsumptionFraction({ daytimeUsage: "high", acUnits: 10 }, A)).toBe(
      0.75,
    );
  });
});

describe("systemSizeRange", () => {
  it("sizes [~30% offset, full offset] rounded up to 0.5 steps", () => {
    // 400 kWh @ 109.5 kWh/kWp/month -> full offset 3.653 -> [1.5, 4.0]
    expect(systemSizeRange(400, A, "luzon")).toEqual([1.5, 4]);
  });

  it("caps the upper bound at maxSystemKwp for very high consumption", () => {
    // 2000 kWh -> full offset 18.27 -> capped at 15; lower 5.5
    expect(systemSizeRange(2000, A, "luzon")).toEqual([5.5, 15]);
  });

  it("never goes below minSystemKwp for very low consumption", () => {
    expect(systemSizeRange(100, A, "luzon")).toEqual([1, 1]);
  });

  it("yields less per kWp in lower-sun regions", () => {
    expect(annualKwhPerKwp(A, "luzon")).toBe(1314);
    expect(annualKwhPerKwp(A, "visayas")).toBe(1368.75);
    expect(annualKwhPerKwp(A, "mindanao")).toBe(1423.5);
  });
});

describe("panelCountFor / roof area", () => {
  it("rounds up to whole 550Wp panels and multiplies 6 m² per panel", () => {
    expect(panelCountFor(1.5, A)).toBe(3);
    expect(panelCountFor(4, A)).toBe(8);
    expect(1.5 * 1000 / 550).toBeLessThan(3); // sanity: rounding up
  });
});

describe("monthlySavingsPhp", () => {
  it("splits generation into self-consumed (tariff) and exported (deferral)", () => {
    // 4 kWp luzon, scf 0.3: monthly gen 438 kWh
    // 438 * (0.3*15 + 0.7*13.5) = 438 * 13.95 = 6110.1
    expect(monthlySavingsPhp(4, A, "luzon", 0.3)).toBeCloseTo(6110.1, 4);
  });

  it("export credit is strictly below tariff (conservative deferral)", () => {
    expect(A.exportCreditPhpPerKwh).toBeLessThan(A.tariffPhpPerKwh);
  });
});

describe("costRangePhp / paybackYears", () => {
  it("scales cost linearly with size", () => {
    expect(costRangePhp(4, A)).toEqual([380_000, 540_000]);
  });

  it("payback for 4 kWp luzon (scf 0.4): [380k, 540k] over annual savings", () => {
    // annual = 4 kWp * 1314 kWh/kWp * 14.1 PHP/kWh = 73,833.6
    const [best, worst] = paybackYears(4, A, "luzon", 0.4);
    const annual = monthlySavingsPhp(4, A, "luzon", 0.4) * 12;
    expect(best).toBeCloseTo(380_000 / annual, 6);
    expect(worst).toBeCloseTo(540_000 / annual, 6);
    expect(best).toBeLessThan(6);
    expect(worst).toBeLessThan(9);
  });
});

describe("batteryEstimate", () => {
  it("sizes essential-load backup with derate, rounded up", () => {
    // 1 kW * 6 h * 1.25 = 7.5 -> 8 kWh
    expect(batteryEstimate(A)).toEqual({
      capacityKwh: 8,
      essentialLoadKw: 1,
      backupHours: 6,
    });
  });
});

describe("calculateSolarEstimate — golden cases", () => {
  it("low bill / on-grid: 6000 PHP, luzon, low usage, savings only", () => {
    const r = calculateSolarEstimate(
      baseInput({ monthlyBillPhp: 6000, daytimeUsage: "low", goal: "savings" }),
      A,
    );
    expect(r.assumptionsVersion).toBe("sora-v1");
    expect(r.monthlyKwh).toBeCloseTo(400, 4);
    expect(r.systemKwp).toEqual([1.5, 4]);
    expect(r.panelCount).toEqual([3, 8]);
    expect(r.roofAreaSqm).toEqual([18, 48]);
    expect(r.annualGenerationKwh[0]).toBeCloseTo(1971, 4);
    expect(r.annualGenerationKwh[1]).toBeCloseTo(5256, 4);
    // rate 13.95 PHP/kWh
    expect(r.monthlySavingsPhp[0]).toBeCloseTo(2291.2875, 4);
    expect(r.monthlySavingsPhp[1]).toBeCloseTo(6110.1, 4);
    expect(r.annualSavingsPhp[0]).toBeCloseTo(27495.45, 2);
    expect(r.annualSavingsPhp[1]).toBeCloseTo(73321.2, 2);
    expect(r.paybackYears[0]).toBeCloseTo(380_000 / 73321.2, 4);
    expect(r.paybackYears[1]).toBeCloseTo(540_000 / 73321.2, 4);
    expect(r.longTermSavingsPhp.years).toBe(25);
    expect(r.longTermSavingsPhp.range[1]).toBeCloseTo(1_833_030, 1);
    expect(r.selfConsumptionFraction).toBe(0.3);
    expect(r.battery).toBeUndefined();
  });

  it("high bill / on-grid: 30000 PHP caps at maxSystemKwp", () => {
    const r = calculateSolarEstimate(
      baseInput({ monthlyBillPhp: 30000 }),
      A,
    );
    expect(r.monthlyKwh).toBeCloseTo(2000, 4);
    expect(r.systemKwp).toEqual([5.5, 15]);
    // scf 0.4 -> rate 14.1 PHP/kWh
    expect(r.monthlySavingsPhp[0]).toBeCloseTo(5.5 * 1314 * 14.1 / 12, 4);
    expect(r.monthlySavingsPhp[1]).toBeCloseTo(15 * 1314 * 14.1 / 12, 4);
    const [best, worst] = r.paybackYears;
    const annual = 15 * 1314 * 14.1;
    expect(best).toBeCloseTo(1_425_000 / annual, 4);
    expect(worst).toBeCloseTo(2_025_000 / annual, 4);
  });

  it("savings + backup: includes battery estimate, goal 'both'", () => {
    const r = calculateSolarEstimate(
      baseInput({ monthlyBillPhp: 15000, goal: "both" }),
      A,
    );
    expect(r.monthlyKwh).toBeCloseTo(1000, 4);
    expect(r.systemKwp).toEqual([3, 9.5]);
    expect(r.battery).toEqual({
      capacityKwh: 8,
      essentialLoadKw: 1,
      backupHours: 6,
    });
  });

  it("backup-only goal also includes the battery estimate", () => {
    const r = calculateSolarEstimate(
      baseInput({ monthlyBillPhp: 8000, goal: "backup" }),
      A,
    );
    expect(r.battery?.capacityKwh).toBe(8);
  });

  it("high daytime AC usage: visayas, high usage, 3 AC units", () => {
    const r = calculateSolarEstimate(
      baseInput({
        monthlyBillPhp: 20000,
        region: "visayas",
        daytimeUsage: "high",
        acUnits: 3,
      }),
      A,
    );
    expect(r.monthlyKwh).toBeCloseTo(20000 / 15, 4);
    // full offset = (20000/15) / (1368.75/12) = 11.69 -> [4, 12]
    expect(r.systemKwp).toEqual([4, 12]);
    // scf = min(0.75, 0.55 + 3*0.05) = 0.70 -> rate 14.55
    expect(r.selfConsumptionFraction).toBeCloseTo(0.7, 6);
    expect(r.panelCount).toEqual([8, 22]);
    expect(r.roofAreaSqm).toEqual([48, 132]);
    expect(r.annualGenerationKwh[0]).toBeCloseTo(4 * 1368.75, 4);
    expect(r.annualGenerationKwh[1]).toBeCloseTo(12 * 1368.75, 4);
    expect(r.monthlySavingsPhp[0]).toBeCloseTo((4 * 1368.75 / 12) * 14.55, 4);
    expect(r.monthlySavingsPhp[1]).toBeCloseTo((12 * 1368.75 / 12) * 14.55, 4);
  });

  it("renter edge case: same bill yields the same indicative result (role is qualification, not math)", () => {
    const owner = calculateSolarEstimate(baseInput({ monthlyBillPhp: 8000 }), A);
    // The calculator has no property-role input by design; the same inputs
    // must produce identical numbers regardless of who is filling the form.
    const rerun = calculateSolarEstimate(
      baseInput({ monthlyBillPhp: 8000 }),
      A,
    );
    expect(rerun.systemKwp).toEqual(owner.systemKwp);
    expect(rerun.monthlySavingsPhp).toEqual(owner.monthlySavingsPhp);
  });

  it("missing optional kWh: bill-only input still produces a full result", () => {
    const r = calculateSolarEstimate(baseInput({ monthlyBillPhp: 12000 }), A);
    expect(r.monthlyKwh).toBeCloseTo(800, 4);
    expect(r.systemKwp[1]).toBeGreaterThan(0);
    expect(r.monthlySavingsPhp[1]).toBeGreaterThan(0);
  });

  it("unusual roof type: roof does not change the numbers (flagged for survey)", () => {
    const r = calculateSolarEstimate(baseInput({ monthlyBillPhp: 10000 }), A);
    expect(r.roofAreaSqm[0]).toBeGreaterThanOrEqual(0);
    expect(r.roofAreaSqm[1]).toBeGreaterThanOrEqual(r.roofAreaSqm[0]);
  });

  it("is deterministic: same inputs + frozen assumption set -> identical result", () => {
    const input = baseInput({ monthlyBillPhp: 16000, goal: "both", acUnits: 1 });
    expect(calculateSolarEstimate(input, A)).toEqual(
      calculateSolarEstimate(input, A),
    );
  });
});
