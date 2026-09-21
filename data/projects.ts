/**
 * Mock construction project data.
 *
 * This local dataset stands in for Sanity CMS content while the CMS is not
 * yet connected, so every page can be built and previewed against realistic
 * data first. Once Sanity is wired up:
 *   - replace the `projects` array below with a GROQ query (e.g. in a
 *     `lib/sanity.ts` client), keeping the `Project` shape from
 *     `lib/types.ts` in sync with the Sanity schema.
 *   - replace the picsum.photos placeholder URLs with ImageKit-hosted asset
 *     URLs (via the ImageKit URL-endpoint + transformation params) once
 *     ImageKit API keys are added to `.env`.
 *
 * `getProjects()` / `getProjectBySlug()` are the only functions the rest of
 * the app should call — that keeps the CMS swap-in to this one file.
 */

import type { Project } from "@/lib/types";

// TODO(CMS): this array will be replaced by a call to the Sanity client.
export const projects: Project[] = [
  {
    id: "1",
    slug: "skyline-corporate-tower",
    title: "Skyline Corporate Tower",
    category: "Commercial",
    location: "Bengaluru, India",
    year: 2023,
    description:
      "A 28-storey glass-façade office tower delivered ahead of schedule with a fast-track structural steel program and a fully integrated smart-building management system.",
    clientTestimonial:
      "Prerith Groups delivered our flagship tower three weeks early without compromising on finish quality. Exceptional project management from day one.",
    testimonialVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    startDate: "2022-02-01",
    completionDate: "2023-04-15",
    coverImage: "https://picsum.photos/seed/skyline-corporate-tower/1200/800",
    gallery: [
      "https://picsum.photos/seed/skyline-corporate-tower-1/1200/800",
      "https://picsum.photos/seed/skyline-corporate-tower-2/1200/800",
      "https://picsum.photos/seed/skyline-corporate-tower-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/skyline-corporate-tower-before/1200/800",
    afterImage: "https://picsum.photos/seed/skyline-corporate-tower-after/1200/800",
    sizeSqft: 185000,
    value: "₹42 Cr",
    status: "Completed",
  },
  {
    id: "2",
    slug: "riverside-residences",
    title: "Riverside Residences",
    category: "Residential",
    location: "Chennai, India",
    year: 2023,
    description:
      "A 120-unit premium residential complex with landscaped courtyards, a clubhouse, and unobstructed riverfront views.",
    clientTestimonial:
      "From foundation to handover, communication was clear and timelines were honored at every milestone.",
    startDate: "2021-06-01",
    completionDate: "2023-01-20",
    coverImage: "https://picsum.photos/seed/riverside-residences/1200/800",
    gallery: [
      "https://picsum.photos/seed/riverside-residences-1/1200/800",
      "https://picsum.photos/seed/riverside-residences-2/1200/800",
      "https://picsum.photos/seed/riverside-residences-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/riverside-residences-before/1200/800",
    afterImage: "https://picsum.photos/seed/riverside-residences-after/1200/800",
    sizeSqft: 210000,
    value: "₹58 Cr",
    status: "Completed",
  },
  {
    id: "3",
    slug: "heritage-bank-restoration",
    title: "Heritage Bank Restoration",
    category: "Renovation",
    location: "Mumbai, India",
    year: 2022,
    description:
      "A sensitive structural and façade restoration of a 1930s heritage bank building, preserving original stonework while modernizing MEP systems.",
    clientTestimonial:
      "They treated the heritage fabric of the building with real care while still hitting a demanding deadline.",
    startDate: "2021-09-05",
    completionDate: "2022-03-18",
    coverImage: "https://picsum.photos/seed/heritage-bank-restoration/1200/800",
    gallery: [
      "https://picsum.photos/seed/heritage-bank-restoration-1/1200/800",
      "https://picsum.photos/seed/heritage-bank-restoration-2/1200/800",
      "https://picsum.photos/seed/heritage-bank-restoration-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/heritage-bank-restoration-before/1200/800",
    afterImage: "https://picsum.photos/seed/heritage-bank-restoration-after/1200/800",
    sizeSqft: 42000,
    value: "₹9.5 Cr",
    status: "Completed",
  },
  {
    id: "4",
    slug: "cedar-grove-villas",
    title: "Cedar Grove Villas",
    category: "Residential",
    location: "Coimbatore, India",
    year: 2024,
    description:
      "A gated community of 24 independent villas, each with a private garden, built around a shared central park and walking trail.",
    startDate: "2023-01-10",
    completionDate: "2024-02-02",
    coverImage: "https://picsum.photos/seed/cedar-grove-villas/1200/800",
    gallery: [
      "https://picsum.photos/seed/cedar-grove-villas-1/1200/800",
      "https://picsum.photos/seed/cedar-grove-villas-2/1200/800",
      "https://picsum.photos/seed/cedar-grove-villas-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/cedar-grove-villas-before/1200/800",
    afterImage: "https://picsum.photos/seed/cedar-grove-villas-after/1200/800",
    sizeSqft: 96000,
    value: "₹22 Cr",
    status: "Completed",
  },
  {
    id: "5",
    slug: "metro-business-park",
    title: "Metro Business Park",
    category: "Commercial",
    location: "Hyderabad, India",
    year: 2026,
    description:
      "A 3-block Grade-A business park with column-free floor plates, a central atrium, and on-site EV charging infrastructure — currently under construction.",
    startDate: "2025-05-01",
    // Expected/target completion date — this project is still "Ongoing".
    completionDate: "2026-11-30",
    coverImage: "https://picsum.photos/seed/metro-business-park/1200/800",
    gallery: [
      "https://picsum.photos/seed/metro-business-park-1/1200/800",
      "https://picsum.photos/seed/metro-business-park-2/1200/800",
      "https://picsum.photos/seed/metro-business-park-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/metro-business-park-before/1200/800",
    afterImage: "https://picsum.photos/seed/metro-business-park-after/1200/800",
    sizeSqft: 150000,
    value: "₹35 Cr",
    status: "Ongoing",
    progressPercent: 55,
  },
  {
    id: "6",
    slug: "old-mill-boutique-hotel",
    title: "Old Mill Boutique Hotel",
    category: "Renovation",
    location: "Pune, India",
    year: 2024,
    description:
      "Adaptive reuse of a disused cotton mill into a 32-room boutique hotel, retaining the original brick shell and exposed timber trusses.",
    clientTestimonial:
      "They turned a derelict shell into the most talked-about hotel in the city, on budget and on time.",
    startDate: "2023-11-01",
    completionDate: "2024-08-20",
    coverImage: "https://picsum.photos/seed/old-mill-boutique-hotel/1200/800",
    gallery: [
      "https://picsum.photos/seed/old-mill-boutique-hotel-1/1200/800",
      "https://picsum.photos/seed/old-mill-boutique-hotel-2/1200/800",
      "https://picsum.photos/seed/old-mill-boutique-hotel-3/1200/800",
    ],
    beforeImage: "https://picsum.photos/seed/old-mill-boutique-hotel-before/1200/800",
    afterImage: "https://picsum.photos/seed/old-mill-boutique-hotel-after/1200/800",
    sizeSqft: 38000,
    value: "₹14 Cr",
    status: "Completed",
  },
];

// TODO(CMS): replace with `await client.fetch(groqQuery)` once Sanity is connected.
export function getProjects(): Project[] {
  return projects;
}

// TODO(CMS): replace with a GROQ query filtered by slug once Sanity is connected.
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
