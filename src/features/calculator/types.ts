/**
 * Shared domain types for the solar calculator (Milestone 3).
 * Pure types only — no Zod, no React.
 */

export type RegionKey = "luzon" | "visayas" | "mindanao";

export type DaytimeUsage = "low" | "medium" | "high";

export type Goal = "savings" | "backup" | "both";

export type PropertyRole = "owner" | "renter" | "property_manager" | "undecided";

export type RoofType = "long_span_gi" | "tile" | "concrete_deck" | "other";
