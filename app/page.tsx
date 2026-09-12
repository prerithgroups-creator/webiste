import { HardHat, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectPreviewCard } from "@/components/project-preview-card";
import { getProjects } from "@/lib/sanity";

const palette = [
  { name: "Navy", hex: "#1F3A5F", className: "bg-primary" },
  { name: "Orange", hex: "#E07B00", className: "bg-accent" },
  { name: "Fog", hex: "#EEF3F8", className: "bg-secondary" },
  { name: "White", hex: "#FFFFFF", className: "bg-white ring-1 ring-border" },
];

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-primary px-6 py-24 text-primary-foreground sm:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            <HardHat className="size-4 text-accent" />
            Prerith Groups
          </span>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Building landmarks,{" "}
            <span className="text-accent">on time, every time.</span>
          </h1>
          <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Setup confirmed — Next.js, Tailwind CSS, shadcn/ui, and Framer
            Motion are wired up and ready for the Prerith Groups portfolio.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl border-white/20 bg-transparent text-primary-foreground hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Setup check: palette + typography                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-secondary px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Brand system
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Color palette and type scale pulled from the Tailwind theme in{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs ring-1 ring-border">
              app/globals.css
            </code>
            .
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {palette.map((swatch) => (
              <div key={swatch.name} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border">
                <div className={`h-16 w-full rounded-xl ${swatch.className}`} />
                <p className="mt-3 text-sm font-semibold text-foreground">{swatch.name}</p>
                <p className="text-xs text-muted-foreground">{swatch.hex}</p>
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Heading font — Plus Jakarta Sans
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-foreground">
                Precision-built structures
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Body font — Inter
              </p>
              <p className="mt-2 text-base leading-7 text-foreground">
                Clean, readable body copy for project descriptions, timelines,
                and everything in between.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sample projects (mock data — see /data/projects.ts)               */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <Timer className="size-5 text-accent" />
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Featured projects
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Sourced from Sanity once connected, with a local mock-data
            fallback (see{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
              lib/sanity.ts
            </code>
            ).
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectPreviewCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
