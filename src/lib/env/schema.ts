import { z } from "zod";

/**
 * Environment variable schema (Milestone 0).
 *
 * Only the variables that exist today are defined. Add fields as
 * Milestones 4+ introduce Supabase, n8n, and CRM integrations.
 * Secrets must stay server-side; only NEXT_PUBLIC_* values are
 * visible to the client bundle.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

/**
 * Returns validated server environment.
 * Throws once in development if required variables are malformed.
 */
export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  cached = serverEnvSchema.parse(process.env);
  return cached;
}
