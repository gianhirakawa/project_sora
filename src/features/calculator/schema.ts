import { z } from "zod";

/**
 * Calculator input schema (Milestone 3).
 * Bill-first: the bill is the only number a customer must know.
 * Server-side safe ranges reject absurd input without being annoying.
 */
import { CITY_OPTIONS, OTHER_CITY_KEY } from "./cities";
import {
  type DaytimeUsage,
  type Goal,
  type PropertyRole,
  type RoofType,
} from "./types";

export const calculatorInputSchema = z.object({
  monthlyBillPhp: z
    .number({ invalid_type_error: "Enter a number" })
    .int("Whole pesos is fine")
    .min(500, "Enter your average monthly bill (₱500–₱200,000)")
    .max(200_000, "That looks too high — please double-check"),
  monthlyKwh: z
    .number()
    .int()
    .min(50, "Enter at least 50 kWh")
    .max(10_000, "Enter at most 10,000 kWh")
    .optional(),
  city: z
    .string()
    .min(1, "Please choose your city or province")
    .refine((v) => v === OTHER_CITY_KEY || CITY_OPTIONS.some((c) => c.key === v), {
      message: "Please choose your city or province",
    }),
  propertyRole: z.enum(["owner", "renter", "property_manager", "undecided"], {
    required_error: "Please choose the option that fits you",
  }),
  roofType: z.enum(["long_span_gi", "tile", "concrete_deck", "other"], {
    required_error: "Please choose your roof type",
  }),
  goal: z.enum(["savings", "backup", "both"], {
    required_error: "Please choose your main goal",
  }),
  daytimeUsage: z.enum(["low", "medium", "high"], {
    required_error: "Please choose your daytime usage",
  }),
  acUnits: z.number().int().min(0).max(10).optional(),
});

export type CalculatorInputValues = z.infer<typeof calculatorInputSchema>;

export const DAYTIME_USAGE: readonly DaytimeUsage[] = ["low", "medium", "high"];
export const GOALS: readonly Goal[] = ["savings", "backup", "both"];
export const PROPERTY_ROLES: readonly PropertyRole[] = [
  "owner",
  "renter",
  "property_manager",
  "undecided",
];
export const ROOF_TYPES: readonly RoofType[] = [
  "long_span_gi",
  "tile",
  "concrete_deck",
  "other",
];

export type FieldErrors = Partial<Record<string, string>>;
