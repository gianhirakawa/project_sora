/**
 * Number/currency formatting for customer-facing copy.
 * Ranges use an en dash with a thin space on each side.
 */

export function formatPhp(n: number): string {
  return `₱${Math.round(n).toLocaleString("en-PH")}`;
}

export function formatPhpRange(r: readonly [number, number]): string {
  return `${formatPhp(r[0])} – ${formatPhp(r[1])}`;
}

export function formatNumber(n: number, digits = 0): string {
  return n.toLocaleString("en-PH", { maximumFractionDigits: digits });
}

/** "1.5 – 4 kWp", "3 – 8 panels", etc. */
export function formatUnitRange(
  r: readonly [number, number],
  unit: string,
  digits = 1,
): string {
  const fmt = (n: number) => formatNumber(n, digits);
  return `${fmt(r[0])} – ${fmt(r[1])} ${unit}`;
}
