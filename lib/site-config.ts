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

// Kept in sync with components/footer.tsx, components/whatsapp-button.tsx,
// and app/contact/page.tsx — update contact details here only.
export const BUSINESS = {
  legalName: "Prerith Groups",
  telephone: "+91-90086-20555",
  telephoneDisplay: "+91 90086 20555",
  email: "prerith.groups@gmail.com",
  streetAddress: "No.14, Sai Meadows Phase 2, Sarjapur Road",
  addressLocality: "Bangalore",
  addressRegion: "Karnataka",
  postalCode: "562125",
  addressCountry: "IN",
  areaServed: "India",
  logo: `${SITE_URL}/logo.png`,
  // Google Maps link for the office address, used on the Contact page.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Prerith+Groups+No+14+Sai+Meadows+Phase+2+Sarjapur+Road+Bangalore+562125",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61593926266975",
    "https://www.instagram.com/prerithgroups",
    "https://www.linkedin.com/in/prerith-groups-126252436",
    "https://youtube.com/@prerithgroups",
  ] as string[],
};
