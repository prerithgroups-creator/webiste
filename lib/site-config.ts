/**
 * Single source of truth for site-wide SEO/metadata + business identity
 * details. Consumed by app/layout.tsx (metadataBase, default Metadata,
 * LocalBusiness JSON-LD), sitemap.ts, robots.ts, and components/footer.tsx —
 * keep this in sync with the real company details before going live.
 */

/**
 * Public base URL of the site. Falls back to localhost for local dev/build
 * previews. Set NEXT_PUBLIC_SITE_URL in production so absolute URLs
 * (Open Graph images, canonical links, sitemap entries) resolve correctly.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "Prerith Groups";

export const SITE_DESCRIPTION =
  "Prerith Groups builds landmark residential, commercial, and renovation projects across India — delivered with precision and always on schedule.";

// TODO: replace with real contact/social details once available (kept in
// sync with components/footer.tsx).
export const BUSINESS = {
  legalName: "Prerith Groups",
  telephone: "+91-98765-43210",
  telephoneDisplay: "+91 98765 43210",
  email: "hello@prerithgroups.com",
  streetAddress: "12th Floor, Prestige Towers",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  addressCountry: "IN",
  areaServed: "India",
  logo: `${SITE_URL}/logo.png`,
  sameAs: [] as string[],
};
