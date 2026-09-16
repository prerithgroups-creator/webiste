"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "cn";
import { IKImage } from "@/components/ik-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatProjectDuration } from "@/lib/utils";
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
  const isOngoing = project.status === "Ongoing";
  const badgeLabel = isOngoing
    ? `In progress${
        typeof project.progressPercent === "number" ? ` · ${project.progressPercent}%` : ""
      }`
    : formatProjectDuration(project.startDate, project.completionDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/portfolio/${project.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl">
      <Card className="rounded-2xl border-none shadow-md shadow-primary/5 ring-1 ring-border transition-shadow hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-muted">
          <IKImage
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <Badge
            className={cn(
              "absolute left-3 top-3 gap-1",
              isOngoing
                ? "bg-accent text-accent-foreground"
                : "bg-white/95 text-emerald-700 ring-1 ring-emerald-600/15"
            )}
          >
            {isOngoing ? <Loader2 className="size-3 animate-spin" /> : <CheckCircle2 className="size-3" />}
            {badgeLabel}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <CardDescription>
            {project.category} · {project.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
      </Link>
    </motion.div>
  );
}
