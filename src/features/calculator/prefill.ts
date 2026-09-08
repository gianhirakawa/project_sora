import { getCityOption } from "./cities";

/**
 * M3-T7 (data side): encode a compact calculator snapshot into the
 * site-survey URL so the booking form can prefill. The full versioned
 * snapshot (assumption version + all inputs) is persisted server-side in M4.
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
