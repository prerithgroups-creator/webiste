"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IKImage } from "@/components/ik-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/types";

type ProjectPreviewCardProps = {
  project: Project;
  /** Stagger index used to offset the reveal animation. */
  index?: number;
};

/**
 * Small reusable card that showcases a single project and prominently
 * highlights how long it took to build (or how far along it is, for
 * "Ongoing" projects) — the core selling point of the Prerith Groups
 * portfolio.
 *
 * Image delivery is handled by the shared `IKImage` component (ImageKit
 * with a next/image fallback) — see components/ik-image.tsx.
 */
export function ProjectPreviewCard({ project, index = 0 }: ProjectPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
      <Card className="h-full flex-col rounded-2xl border-none pt-0! shadow-md shadow-primary/5 ring-1 ring-border transition-shadow hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-secondary">
          <IKImage
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 min-h-14 text-lg">{project.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {project.category} · {project.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
            {project.description}
          </p>
        </CardContent>
      </Card>
      </Link>
    </motion.div>
  );
}
