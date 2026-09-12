import Link from "next/link";
import { CheckCircle2, Loader2, MapPin } from "lucide-react";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { IKImage } from "@/components/ik-image";
import { formatProjectDuration } from "@/lib/utils";
import type { Project } from "@/lib/types";

type PortfolioProjectCardProps = {
  project: Project;
};

/**
 * Portfolio-listing card: cover image, category tag, title, location, and a
 * duration/progress badge. Links through to the (future) project detail
 * page at /portfolio/[slug].
 *
 * Image delivery is handled by the shared `IKImage` component (ImageKit
 * with a next/image fallback) — see components/ik-image.tsx.
 */
export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  const isOngoing = project.status === "Ongoing";
  const durationLabel = isOngoing
    ? `Ongoing${
        typeof project.progressPercent === "number" ? ` · ${project.progressPercent}%` : ""
      }`
    : formatProjectDuration(project.startDate, project.completionDate);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full overflow-hidden rounded-2xl bg-white shadow-md shadow-primary/5 ring-1 ring-border transition-shadow hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <IKImage
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          {durationLabel}
        </Badge>
        <Badge variant="secondary" className="absolute right-3 top-3">
          {project.category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {project.location}
        </p>
      </div>
    </Link>
  );
}
