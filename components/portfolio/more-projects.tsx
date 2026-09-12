import Link from "next/link";
import type { Project } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PortfolioProjectCard } from "@/components/portfolio-project-card";

type MoreProjectsProps = {
  projects: Project[];
  currentSlug: string;
};

/** Shows up to 3 other projects (in dataset order), reusing the same card
 * component as the Portfolio listing page. Renders nothing if there are no
 * other projects to show. */
export function MoreProjects({ projects, currentSlug }: MoreProjectsProps) {
  const others = projects.filter((project) => project.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="bg-secondary/40 px-6 py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Keep Exploring
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              More Projects
            </h2>
          </div>
          <Button
            render={<Link href="/portfolio" />}
            nativeButton={false}
            variant="outline"
            className="rounded-xl"
          >
            View all projects
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <PortfolioProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
