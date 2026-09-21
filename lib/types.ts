/**
 * Canonical `Project` type — the single source of truth for the shape of a
 * construction project used across the whole site (cards, listing pages,
 * project detail pages, etc).
 *
 * TODO(CMS): once Sanity is connected, this type should stay in sync with
 * the Sanity schema (or be generated from it). `data/projects.ts` will swap
 * its mock array for real GROQ queries, but every field below should still
 * be present on the documents returned from Sanity so consuming components
 * don't need to change.
 */

export type ProjectCategory = "Residential" | "Commercial" | "Renovation";

export type ProjectStatus = "Completed" | "Ongoing";

export type Project = {
  /** Stable unique identifier (e.g. a Sanity document `_id` later on). */
  id: string;
  /** URL-friendly identifier used for routing, e.g. "skyline-corporate-tower". */
  slug: string;
  /** Display name of the project. */
  title: string;
  category: ProjectCategory;
  /** City / region the project is located in. */
  location: string;
  /** Year the project is associated with (typically the completion year). */
  year: number;
  /** Longer description used on project detail / listing pages. */
  description: string;
  /** Optional quote from the client, shown on the project detail page. */
  clientTestimonial?: string;
  /** Optional YouTube link for a video version of the client testimonial. */
  testimonialVideoUrl?: string;
  /** Optional YouTube link showcasing the project (walkthrough, drone footage, etc). */
  videoUrl?: string;
  /** ISO date string — when construction began. */
  startDate: string;
  /**
   * ISO date string — when construction was (or, for "Ongoing" projects, is
   * expected to be) completed.
   */
  completionDate: string;
  /** Primary hero/cover image URL. */
  coverImage: string;
  /** Additional gallery images for the project detail page. */
  gallery: string[];
  /**
   * "Before" photo used in before/after comparison sections. Only
   * meaningful (and only rendered) for "Renovation" category projects.
   */
  beforeImage?: string;
  /**
   * "After" photo used in before/after comparison sections. Only
   * meaningful (and only rendered) for "Renovation" category projects.
   */
  afterImage?: string;
  /** Built-up area in square feet, if available. */
  sizeSqft?: number;
  /** Contract value as a display-ready string, e.g. "₹42 Cr". */
  value?: string;
  status: ProjectStatus;
  /** Only meaningful when `status` is "Ongoing". 0-100. */
  progressPercent?: number;
};

/** A person on the About page's team grid. */
export type TeamMember = {
  /** Stable unique identifier (e.g. a Sanity document `_id` later on). */
  id: string;
  name: string;
  /** Job title / position, e.g. "Site Engineer". */
  role: string;
  /** Display-ready experience label, e.g. "12 years". */
  experience: string;
  /** Optional headshot photo URL. */
  photo?: string;
};
