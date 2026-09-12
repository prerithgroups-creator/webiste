"use client";

/**
 * Sanity Studio is a full client-side SPA. Loading it via next/dynamic with
 * ssr disabled keeps the (fairly heavy) `sanity` package and its plugins
 * entirely out of the server/RSC build graph — importing it directly in a
 * Server Component page can break Next's server bundling for some of
 * Sanity's dependencies (e.g. `swr`).
 */
import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export function StudioClient() {
  return <NextStudio config={config} />;
}
