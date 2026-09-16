/**
 * Data-fetching layer for `Project` content. This is the ONLY module the
 * rest of the app should import project data from (replacing the old
 * direct imports of data/projects.ts).
 *
 * Behavior:
 *   - If Sanity env vars are configured (see sanity/env.ts /
 *     isSanityConfigured), queries run against Sanity via GROQ and image
 *     references are resolved to CDN URLs.
 *   - If not configured (e.g. local dev before a Sanity project exists, or
 *     a deploy preview missing env vars), it transparently falls back to
 *     the local mock data in data/projects.ts so the site always renders.
 *
 * Every exported function is async so callers work identically either way.
 */

import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";
import type { Project } from "@/lib/types";
import {
  getProjectBySlug as getMockProjectBySlug,
  getProjects as getMockProjects,
} from "@/data/projects";

const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Read-only, published content only — no token needed for this. If
      // you later want to preview drafts, add a read token here via
      // `token: process.env.SANITY_API_TOKEN` and `perspective: "previewDrafts"`.
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

function urlFor(source: Image | undefined): string {
  if (!source || !builder) return "";
  return builder.image(source).url();
}

// Raw shape of a "project" document as it comes back from Sanity (images
// are still asset references at this point).
type SanityProject = {
  _id: string;
  slug: { current: string };
  title: string;
  category: Project["category"];
  location: string;
  year: number;
  description: string;
  clientTestimonial?: string;
  startDate: string;
  completionDate: string;
  coverImage: Image;
  gallery?: Image[];
  beforeImage?: Image;
  afterImage?: Image;
  sizeSqft?: number;
  value?: string;
  status: Project["status"];
  progressPercent?: number;
};

function toProject(doc: SanityProject): Project {
  return {
    id: doc._id,
    slug: doc.slug.current,
    title: doc.title,
    category: doc.category,
    location: doc.location,
    year: doc.year,
    description: doc.description,
    clientTestimonial: doc.clientTestimonial,
    startDate: doc.startDate,
    completionDate: doc.completionDate,
    coverImage: urlFor(doc.coverImage),
    gallery: (doc.gallery ?? []).map((image) => urlFor(image)),
    beforeImage: doc.beforeImage ? urlFor(doc.beforeImage) : undefined,
    afterImage: doc.afterImage ? urlFor(doc.afterImage) : undefined,
    sizeSqft: doc.sizeSqft,
    value: doc.value,
    status: doc.status,
    progressPercent: doc.progressPercent,
  };
}

const PROJECT_FIELDS = `
  _id,
  slug,
  title,
  category,
  location,
  year,
  description,
  clientTestimonial,
  startDate,
  completionDate,
  coverImage,
  gallery,
  beforeImage,
  afterImage,
  sizeSqft,
  value,
  status,
  progressPercent
`;

export async function getProjects(): Promise<Project[]> {
  if (!client) return getMockProjects();

  const docs = await client.fetch<SanityProject[]>(
    `*[_type == "project"] | order(completionDate desc) { ${PROJECT_FIELDS} }`
  );
  return docs.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!client) return getMockProjectBySlug(slug);

  const doc = await client.fetch<SanityProject | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug }
  );
  return doc ? toProject(doc) : undefined;
}
