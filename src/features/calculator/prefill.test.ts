import { describe, expect, it } from "vitest";
import {
  buildSurveyPrefillUrl,
  surveyPrefillSchema,
  toFormPrefill,
} from "./prefill";

describe("surveyPrefillSchema", () => {
  it("accepts a snapshot built by buildSurveyPrefillUrl", () => {
    const url = buildSurveyPrefillUrl({
      monthlyBillPhp: 8000,
      cityKey: "quezon-city",
      duty: "Meralco",
      propertyRole: "owner",
      roofType: "tile",
      goal: "both",
      systemKwp: [2.5, 3.5],
      panelCount: [5, 7],
    });
    const qs = new URL(url, "http://localhost").searchParams;
    const parsed = surveyPrefillSchema.safeParse(Object.fromEntries(qs));
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.estimate).toBe("1");
      expect(parsed.data.bill).toBe(8000);
      expect(parsed.data.city).toBe("Quezon City");
    }
  });

  it("rejects unknown params (strict) so URLs cannot inject content", () => {
    const parsed = surveyPrefillSchema.safeParse({ estimate: "1", evil: "x" });
    expect(parsed.success).toBe(false);
  });

  it("rejects a malformed size string longer than 30 chars", () => {
    const parsed = surveyPrefillSchema.safeParse({
      estimate: "1",
      size: "x".repeat(31),
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects non-numeric bill", () => {
    const parsed = surveyPrefillSchema.safeParse({ estimate: "1", bill: "abc" });
    expect(parsed.success).toBe(false);
  });
});

describe("toFormPrefill", () => {
  const base = {
    estimate: "1" as const,
    bill: 8000,
    size: "2.5–3.5",
    panels: "5–7",
    goal: "both" as const,
    city: "Quezon City",
    duty: "Meralco",
    role: "owner" as const,
    roof: "tile" as const,
  };

  it("prefills city, role, and maps goal -> interest", () => {
    const p = toFormPrefill(base);
    expect(p.city).toBe("Quezon City");
    expect(p.propertyRole).toBe("owner");
    expect(p.interest).toBe("hybrid_battery"); // both -> hybrid
  });

  it("maps savings goal to grid_tied", () => {
    const p = toFormPrefill({ ...base, goal: "savings" });
    expect(p.interest).toBe("grid_tied");
  });

  it("writes a notes summary with the indicative snapshot", () => {
    const p = toFormPrefill(base);
    expect(p.notes).toContain("Calculator estimate (indicative)");
    expect(p.notes).toContain("₱8,000/mo");
    expect(p.notes).toContain("2.5–3.5 kWp");
    expect(p.notes).toContain("Meralco");
    expect(p.notes).not.toContain("evil");
  });

  it("omits 'Not sure' DUTY from notes", () => {
    const p = toFormPrefill({ ...base, duty: "Not sure" });
    expect(p.notes).not.toContain("DUTY");
  });

  it("handles minimal params (estimate only)", () => {
    const p = toFormPrefill({ estimate: "1" });
    expect(p.city).toBe("");
    expect(p.notes).toBe("");
  });
});
