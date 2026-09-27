"use client";

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
 * Lead submission actions (M1) — client-side.
 *
 * DEPLOYMENT CONSTRAINT: the site is deployed to GitHub Pages, which serves
 * static files only, so Next.js server actions cannot run there. For M1 the
 * actions are intentionally behavior-identical to the previous server actions:
 * zod validation + acknowledgement only. No lead data is persisted anywhere.
 *
 * MILESTONE 4: replace the bodies below with a POST to the server-side
 * boundary (n8n webhook / lead endpoint) and move all validation there.
 * Until then, treat these messages as acknowledgement-only — do not copy the
 * "received" wording into customer-facing guarantees of storage.
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
    message: "Message received. We reply to every message — usually within one business day.",
  };
}
