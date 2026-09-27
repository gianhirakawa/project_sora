"use client";

import { useSearchParams } from "next/navigation";
import { BookSiteSurveyForm } from "./book-site-survey-form";
import { surveyPrefillSchema, toFormPrefill } from "@/features/calculator/prefill";

/**
 * Reads calculator prefill params from the URL client-side.
 *
 * GitHub Pages serves a static export, so `searchParams` cannot be read in a
 * server component at build time. The query is read from the URL on the
 * client instead. Must be rendered inside a <Suspense> boundary (required for
 * static export of `useSearchParams`).
 */
export function BookSiteSurveyWithPrefill() {
  const searchParams = useSearchParams();
  const parsed = surveyPrefillSchema.safeParse(Object.fromEntries(searchParams));
  const prefill =
    parsed.success && parsed.data.estimate === "1" ? toFormPrefill(parsed.data) : undefined;
  return <BookSiteSurveyForm prefill={prefill} />;
}
