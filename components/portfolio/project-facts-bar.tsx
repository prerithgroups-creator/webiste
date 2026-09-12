import { Calendar, CheckCircle2, Clock, MapPin, Ruler } from "lucide-react";
import { cn } from "cn";
import type { Project } from "@/lib/types";
import { getProjectDuration } from "@/lib/utils";

type ProjectFactsBarProps = {
  project: Project;
};

/**
 * Row of key project facts (location, year, size, status) plus a prominent
 * duration/progress highlight. Rendered inside a card wrapper by the parent
 * page so this component only owns the fact layout itself.
 */
export function ProjectFactsBar({ project }: ProjectFactsBarProps) {
  const isOngoing = project.status === "Ongoing";
  const days = getProjectDuration(project.startDate, project.completionDate);

  const facts = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year", value: String(project.year) },
    ...(project.sizeSqft
      ? [
          {
            icon: Ruler,
            label: "Size",
            value: `${project.sizeSqft.toLocaleString("en-IN")} sq.ft`,
          },
        ]
      : []),
    { icon: CheckCircle2, label: "Status", value: project.status },
  ];

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap gap-x-8 gap-y-5">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <fact.icon className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {fact.label}
              </p>
              <p className="text-sm font-semibold text-foreground">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center gap-3 rounded-xl px-5 py-3",
          isOngoing ? "bg-accent/10" : "bg-emerald-600/10"
        )}
      >
        {isOngoing ? (
          <Clock className="size-5 text-accent" />
        ) : (
          <CheckCircle2 className="size-5 text-emerald-700" />
        )}
        <p
          className={cn(
            "text-sm font-semibold whitespace-nowrap",
            isOngoing ? "text-accent" : "text-emerald-700"
          )}
        >
          {isOngoing
            ? `${project.progressPercent ?? 0}% complete`
            : `Completed in ${days} days`}
        </p>
      </div>
    </div>
  );
}
