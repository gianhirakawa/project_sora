/**
 * Analytics events (M3-T8).
 *
 * GA4-safe helper: forwards to `window.gtag` when present (added later by
 * the GA4 script tag), otherwise queues into `dataLayer`. No-op server-side.
 * Events must never contain PII (no name/email/mobile/bill amount — use
 * coarse buckets if you need a numeric dimension).
 */

type GtagFn = (...args: unknown[]) => void;

interface AnalyticsWindow {
  gtag?: GtagFn;
  dataLayer?: Record<string, unknown>[];
}

function getAnalyticsWindow(): AnalyticsWindow | null {
  if (typeof window === "undefined") return null;
  return window as unknown as AnalyticsWindow;
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): void {
  const w = getAnalyticsWindow();
  if (!w) return;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
    return;
  }
  w.dataLayer ??= [];
  w.dataLayer.push({ event: name, ...params });
}
