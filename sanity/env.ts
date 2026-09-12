/**
 * Central place for Sanity connection settings, all sourced from env vars.
 * See .env.example for where to get each value.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Pin to a fixed date so future Sanity API changes can't silently break
// this project. Bump deliberately when you want newer API behavior.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

/**
 * Whether Sanity is configured at all. `lib/sanity.ts` uses this to decide
 * whether to query Sanity or fall back to the local mock data in
 * data/projects.ts — this lets the site run (with mock content) before a
 * Sanity project exists, and again if env vars are ever missing/misconfigured
 * in a given deployment.
 */
export const isSanityConfigured = Boolean(projectId);
