import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

/**
 * Sanity Studio config, embedded in this Next.js app at /studio (see
 * app/studio/[[...tool]]/page.tsx). Content editors log in there to add and
 * edit projects — no separate hosting needed.
 */
export default defineConfig({
  basePath: "/studio",
  projectId: projectId ?? "",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
