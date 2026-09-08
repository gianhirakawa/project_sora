import { z } from "zod";

/**
 * Lead form schemas (M1).
 * Server actions in Milestone 1 validate with these schemas.
 * Persistence, consent timestamps, and rate limiting land in Milestone 4.
 */

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9+()\s-]{7,20}$/, "Enter a valid mobile number");

export const emailSchema = z.string().trim().email().optional().or(z.literal(""));

export const bookSiteSurveySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: phoneSchema,
  email: emailSchema,
  city: z.string().trim().min(2, "Please enter your city or municipality").max(80),
  propertyRole: z.enum(["owner", "renter", "property_manager", "undecided"], {
    required_error: "Please choose the option that fits you",
  }),
  interest: z.enum(["grid_tied", "hybrid_battery", "off_grid", "not_sure"]),
  notes: z.string().trim().max(1000).optional(),
});

export type BookSiteSurveyInput = z.infer<typeof bookSiteSurveySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: phoneSchema,
  email: emailSchema,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<string, string>>;
