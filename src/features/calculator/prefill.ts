import { z } from "zod";
import { getCityOption } from "./cities";
import { GOALS } from "./schema";
import type { PropertyRole } from "./types";

/**
 * M3-T7: encode a compact calculator snapshot into the site-survey URL so
 * the booking form can prefill. The full versioned snapshot (assumption
 * version + all inputs) is persisted server-side in M4.
 */
export interface SurveyPrefillValues {
  monthlyBillPhp: number;
  monthlyKwh?: number;
  cityKey: string;
  duty: string;
  propertyRole: string;
  roofType: string;
  goal: string;
  systemKwp: readonly [number, number];
  panelCount: readonly [number, number];
}

export function buildSurveyPrefillUrl(v: SurveyPrefillValues): string {
  const city = getCityOption(v.cityKey);
  const params = new URLSearchParams({
    estimate: "1",
    bill: String(Math.round(v.monthlyBillPhp)),
    size: `${v.systemKwp[0]}–${v.systemKwp[1]}`,
    panels: `${v.panelCount[0]}–${v.panelCount[1]}`,
    goal: v.goal,
    city: city.label,
    duty: v.duty,
    role: v.propertyRole,
    roof: v.roofType,
  });
  if (v.monthlyKwh) params.set("kwh", String(v.monthlyKwh));
  return `/book-site-survey?${params.toString()}`;
}

/**
 * Server-side validation for the query string produced by
 * `buildSurveyPrefillUrl`. Strict: unknown params are ignored so the URL
 * can never carry arbitrary content into form fields.
 */
export const surveyPrefillSchema = z
  .object({
    estimate: z.literal("1").optional(),
    bill: z.coerce.number().int().min(1).optional(),
    kwh: z.coerce.number().int().min(1).optional(),
    size: z.string().max(30).optional(),
    panels: z.string().max(30).optional(),
    goal: z.enum(["savings", "backup", "both"]).optional(),
    city: z.string().max(80).optional(),
    duty: z.string().max(60).optional(),
    role: z.enum(["owner", "renter", "property_manager", "undecided"]).optional(),
    roof: z.enum(["long_span_gi", "tile", "concrete_deck", "other"]).optional(),
  })
  .strict();

export type SurveyPrefillParams = z.infer<typeof surveyPrefillSchema>;

export type SurveyInterest = "grid_tied" | "hybrid_battery";

/** What the booking form can prefill (client-safe, no PII). */
export interface SurveyFormPrefill {
  city: string;
  propertyRole: PropertyRole;
  interest: SurveyInterest;
  notes: string;
}

/** Map validated URL params to booking-form initial values. */
export function toFormPrefill(p: SurveyPrefillParams): SurveyFormPrefill {
  const parts: string[] = [];
  if (p.bill) parts.push(`bill ₱${p.bill.toLocaleString("en-PH")}/mo`);
  if (p.kwh) parts.push(`~${p.kwh} kWh/mo`);
  if (p.size) parts.push(`system ${p.size} kWp`);
  if (p.panels) parts.push(`${p.panels} panels`);
  if (p.goal) {
    const goalLabels: Record<(typeof GOALS)[number], string> = {
      savings: "lowering the electric bill",
      backup: "backup during brownouts",
      both: "savings + backup",
    };
    parts.push(`goal: ${goalLabels[p.goal]}`);
  }
  if (p.roof) parts.push(`roof: ${p.roof.replace(/_/g, " ")}`);
  if (p.duty && p.duty !== "Not sure") parts.push(`DUTY: ${p.duty}`);

  const notes = parts.length
    ? `Calculator estimate (indicative): ${parts.join("; ")}. Final sizing from site survey.`
    : "";

  return {
    city: p.city ?? "",
    propertyRole: p.role ?? "undecided",
    interest: p.goal === "savings" ? "grid_tied" : "hybrid_battery",
    notes,
  };
}
