/**
 * Package reference data (M1). Single source of truth for the homepage
 * packages section and the /packages page.
 *
 * NOTE: names, sizes, and price bands are illustrative placeholders —
 * confirm real package offerings with the business before launch.
 */
export interface PackageOption {
  name: string;
  size: string;
  price: string;
  fits: string;
  includes: string[];
  highlight: boolean;
}

export const PACKAGE_OPTIONS: readonly PackageOption[] = [
  {
    name: "Sora Small",
    size: "≈ 3 kW · 6–8 panels",
    price: "₱350k – ₱450k",
    fits: "Condos and small homes wanting daytime bill relief",
    includes: [
      "Grid-tied inverter",
      "Net-metering assistance",
      "Standard warranty",
    ],
    highlight: false,
  },
  {
    name: "Sora Family",
    size: "≈ 6 kW · 12–16 panels",
    price: "₱700k – ₱900k",
    fits: "Family houses with AC, laundry, and WFH loads",
    includes: [
      "Grid-tied inverter",
      "Net-metering assistance",
      "Option to add battery later",
    ],
    highlight: true,
  },
  {
    name: "Sora Premium",
    size: "≈ 10 kW+ · 18+ panels",
    price: "₱1.2M+",
    fits: "Large homes and hybrid + battery backup targets",
    includes: [
      "Hybrid inverter + battery ready",
      "Backup-circuit planning",
      "Priority service",
    ],
    highlight: false,
  },
] as const;
