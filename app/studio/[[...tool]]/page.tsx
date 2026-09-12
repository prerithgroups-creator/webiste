/**
 * Embedded Sanity Studio, mounted at /studio. This is where content editors
 * log in to add/edit projects — see the "How to add a new project" guide
 * for the non-technical walkthrough.
 *
 * This route is intentionally NOT included in app/sitemap.ts and is
 * excluded from search indexing via a page-level robots meta tag below.
 */
import type { Metadata } from "next";
import { StudioClient } from "@/components/studio-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioClient />;
}
