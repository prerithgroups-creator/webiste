"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { PortfolioProjectCard } from "@/components/portfolio-project-card";
import type { Project, ProjectCategory } from "@/lib/types";

const ALL = "All" as const;

const CATEGORY_FILTERS: Array<ProjectCategory | typeof ALL> = [
  ALL,
  "Residential",
  "Commercial",
  "Renovation",
];

type PortfolioBrowserProps = {
  projects: Project[];
};

/**
 * Client-side filter bar + animated grid for the portfolio listing page.
 * All filtering happens instantly in the browser against the mock data
 * passed down from `app/portfolio/page.tsx` — no network round-trip
 * needed, so it will keep working unchanged once that page fetches from
 * Sanity instead of `data/projects.ts`.
 */
export function PortfolioBrowser({ projects }: PortfolioBrowserProps) {
  const [category, setCategory] = useState<ProjectCategory | typeof ALL>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [location, setLocation] = useState<string>(ALL);

  const years = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.year)));
    return unique.sort((a, b) => b - a).map(String);
  }, [projects]);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.location)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (category !== ALL && project.category !== category) return false;
      if (year !== ALL && String(project.year) !== year) return false;
      if (location !== ALL && project.location !== location) return false;
      return true;
    });
  }, [projects, category, year, location]);

  function resetFilters() {
    setCategory(ALL);
    setYear(ALL);
    setLocation(ALL);
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 rounded-2xl bg-secondary p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((option) => (
            <FilterPill
              key={option}
              label={option}
              active={category === option}
              onClick={() => setCategory(option)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          <FilterGroup label="Year">
            <FilterPill label={ALL} active={year === ALL} onClick={() => setYear(ALL)} size="sm" />
            {years.map((y) => (
              <FilterPill key={y} label={y} active={year === y} onClick={() => setYear(y)} size="sm" />
            ))}
          </FilterGroup>

          <FilterGroup label="Location">
            <FilterPill
              label={ALL}
              active={location === ALL}
              onClick={() => setLocation(ALL)}
              size="sm"
            />
            {locations.map((loc) => (
              <FilterPill
                key={loc}
                label={loc}
                active={location === loc}
                onClick={() => setLocation(loc)}
                size="sm"
              />
            ))}
          </FilterGroup>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} project
        {projects.length === 1 ? "" : "s"}
      </p>

      {/* Grid */}
      <motion.div layout className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PortfolioProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl bg-secondary px-6 py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              No projects match your filters
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different category, year, or location.
            </p>
          </div>
          <Button onClick={resetFilters} variant="outline" className="rounded-2xl">
            Reset filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}:
      </span>
      {children}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  size = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  size?: "default" | "sm";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border font-medium whitespace-nowrap transition-colors",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-white text-muted-foreground hover:border-accent/50 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
