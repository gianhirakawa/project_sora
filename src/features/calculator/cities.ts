import type { RegionKey } from "./types";

/**
 * Curated city/province reference list for the calculator.
 *
 * This is updateable reference content (city -> region + typical distribution
 * utility), NOT business logic. The distribution utility itself does not
 * change the math (region drives peak sun hours); it is captured for
 * qualification and net-metering context.
 *
 * Extend this list as service-area content grows (Milestone 5).
 * DUTY names should be verified with ops before launch.
 */
export interface CityOption {
  key: string;
  label: string;
  region: RegionKey;
  duty: string;
}

export const CITY_OPTIONS: readonly CityOption[] = [
  // Luzon — Meralco coverage
  { key: "manila", label: "Manila / NCR", region: "luzon", duty: "Meralco" },
  { key: "quezon-city", label: "Quezon City", region: "luzon", duty: "Meralco" },
  { key: "makati", label: "Makati", region: "luzon", duty: "Meralco" },
  { key: "taguig", label: "Taguig / BGC", region: "luzon", duty: "Meralco" },
  { key: "rizal", label: "Rizal (Cainta, Antipolo…)", region: "luzon", duty: "Meralco" },
  { key: "cavite", label: "Cavite", region: "luzon", duty: "Meralco" },
  { key: "bulacan", label: "Bulacan", region: "luzon", duty: "Meralco / MERLCO / NERLCO" },
  // Luzon — MERLCO
  { key: "pampanga", label: "Pampanga (Angeles, San Fernando…)", region: "luzon", duty: "MERLCO" },
  { key: "pangasinan", label: "Pangasinan", region: "luzon", duty: "MERLCO" },
  // Luzon — NERLCO / LECO
  { key: "bataan", label: "Bataan", region: "luzon", duty: "NERLCO" },
  { key: "laguna", label: "Laguna", region: "luzon", duty: "Laguna Electric (LECO)" },
  // Visayas
  { key: "cebu", label: "Cebu (Mactan, Cebu City…)", region: "visayas", duty: "Visayan Electric (VECO)" },
  { key: "bohol", label: "Bohol", region: "visayas", duty: "Visayan Electric (VECO)" },
  { key: "dumaguete", label: "Dumaguete", region: "visayas", duty: "Visayan Electric (VECO)" },
  { key: "iloilo", label: "Iloilo", region: "visayas", duty: "Iloilo Electric (ILECO)" },
  { key: "bacolod", label: "Bacolod / Negros", region: "visayas", duty: "NEGCO" },
  { key: "tacloban", label: "Tacloban / Leyte", region: "visayas", duty: "SLMC" },
  // Mindanao
  { key: "davao", label: "Davao", region: "mindanao", duty: "Davao Light (DLT)" },
  { key: "zamboanga", label: "Zamboanga", region: "mindanao", duty: "ZEN" },
  { key: "cagayan-de-oro", label: "Cagayan de Oro", region: "mindanao", duty: "COTECO" },
  { key: "surigao", label: "Surigao", region: "mindanao", duty: "COTECO" },
] as const;

export const OTHER_CITY_KEY = "other";

/**
 * Fallback option for cities not in the curated list.
 * Region defaults to Luzon (most common) — the DUTY shown is "Not sure",
 * which is fine: utility does not affect the math, only region (sun hours) does.
 */
export const OTHER_CITY: CityOption = {
  key: OTHER_CITY_KEY,
  label: "Other city / province",
  region: "luzon",
  duty: "Not sure",
};

export function getCityOption(key: string): CityOption {
  return CITY_OPTIONS.find((c) => c.key === key) ?? OTHER_CITY;
}
