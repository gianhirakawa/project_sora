import { describe, expect, it } from "vitest";
import { CITY_OPTIONS, OTHER_CITY_KEY } from "./cities";
import { calculatorInputSchema } from "./schema";

describe("calculatorInputSchema", () => {
  const valid = {
    monthlyBillPhp: 8000,
    city: "cebu",
    propertyRole: "owner",
    roofType: "long_span_gi",
    goal: "savings",
    daytimeUsage: "medium",
  };

  it("accepts a minimal bill-first input", () => {
    expect(calculatorInputSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional monthlyKwh and acUnits", () => {
    expect(
      calculatorInputSchema.safeParse({
        ...valid,
        monthlyKwh: 600,
        acUnits: 2,
      }).success,
    ).toBe(true);
  });

  it("rejects bills below the sane minimum", () => {
    expect(calculatorInputSchema.safeParse({ ...valid, monthlyBillPhp: 100 })
      .success).toBe(false);
  });

  it("rejects absurdly high bills", () => {
    expect(
      calculatorInputSchema.safeParse({ ...valid, monthlyBillPhp: 999_999 })
        .success,
    ).toBe(false);
  });

  it("rejects unknown cities", () => {
    expect(calculatorInputSchema.safeParse({ ...valid, city: "atlantis" })
      .success).toBe(false);
  });

  it("accepts the 'other' city fallback", () => {
    expect(
      calculatorInputSchema.safeParse({ ...valid, city: OTHER_CITY_KEY })
        .success,
    ).toBe(true);
  });

  it("accepts renter and property-manager roles (renter edge case)", () => {
    for (const propertyRole of ["renter", "property_manager", "undecided"]) {
      expect(
        calculatorInputSchema.safeParse({ ...valid, propertyRole }).success,
      ).toBe(true);
    }
  });

  it("accepts unusual roof type 'other'", () => {
    expect(
      calculatorInputSchema.safeParse({ ...valid, roofType: "other" }).success,
    ).toBe(true);
  });

  it("requires the qualification fields", () => {
    for (const key of [
      "propertyRole",
      "roofType",
      "goal",
      "daytimeUsage",
    ] as const) {
      expect(
        calculatorInputSchema.safeParse(
          Object.fromEntries(
            Object.entries(valid).filter(([k]) => k !== key),
          ),
        ).success,
      ).toBe(false);
    }
  });

  it("every curated city has a region and DUTY", () => {
    for (const city of CITY_OPTIONS) {
      expect(city.region).toMatch(/luzon|visayas|mindanao/);
      expect(city.duty.length).toBeGreaterThan(0);
    }
  });
});
