export { cn } from "cn";

/**
 * ---------------------------------------------------------------------
 * Project date helpers
 * ---------------------------------------------------------------------
 * These work on the ISO date strings defined on the `Project` type (see
 * lib/types.ts) and don't care whether the data came from the local mock
 * file in data/projects.ts or, later, from Sanity — TODO(CMS): once Sanity
 * is connected, keep its date fields as ISO strings so these keep working.
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Number of whole days between a project's start and completion date. */
export function getProjectDuration(startDate: string, completionDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(completionDate).getTime();
  return Math.round((end - start) / MS_PER_DAY);
}

/** Friendly duration label, e.g. "Completed in 128 days". */
export function formatProjectDuration(startDate: string, completionDate: string): string {
  const days = getProjectDuration(startDate, completionDate);
  return `Completed in ${days} day${days === 1 ? "" : "s"}`;
}

/**
 * Converts a pasted YouTube URL (watch/short/youtu.be/embed link) into an
 * embeddable `https://www.youtube.com/embed/<id>` URL, or `null` if the
 * input isn't a recognizable YouTube URL. Used for the video-testimonial
 * and project-showcase-video fields, which editors can just paste any
 * normal YouTube link into.
 */
export function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}
