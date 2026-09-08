"use server";

import { bookSiteSurveySchema, contactSchema } from "@/features/leads/schemas";

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors: Record<string, string> };

function toFieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/**
 * Lead actions (M1).
 *
 * NOTE: validation + acknowledgement only. Persisting leads, consent
 * timestamps, rate limiting, and CRM/n8n handoff land in Milestone 4.
 * Logs are redacted by design (no full names/addresses on the console).
 */
export async function submitSiteSurvey(input: unknown): Promise<ActionResult> {
  const parsed = bookSiteSurveySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  console.info("lead:site-survey received (not persisted until M4)", {
    city: parsed.data.city,
    interest: parsed.data.interest,
  });
  return {
    ok: true,
    message:
      "Thanks — your survey request is in. A Sora engineer will reach out within one business day to confirm the details.",
  };
}

export async function submitContact(input: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  console.info("lead:contact received (not persisted until M4)", {
    hasEmail: Boolean(parsed.data.email),
  });
  return {
    ok: true,
    message:
      "Message received. We reply to every message — usually within one business day.",
  };
}
