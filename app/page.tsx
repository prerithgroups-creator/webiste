import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectPreviewCard } from "@/components/project-preview-card";
import { getProjects } from "@/lib/sanity";

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
            <Image src="/logo-symbol-white.png" alt="" width={16} height={20} className="h-4 w-auto" />
            Prerith Groups
          </span>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Building landmarks,{" "}
            <span className="text-accent">on time, every time.</span>
          </h1>
          <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Prerith Groups delivers landmark commercial, residential, and
            renovation projects across India — engineered for precision and
            delivered on schedule, every time.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90"
              render={<Link href="/portfolio" />}
              nativeButton={false}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl border-white/20 bg-transparent text-primary-foreground hover:bg-white/10"
              render={<Link href="/contact" />}
              nativeButton={false}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sample projects                                                   */}
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
            A selection of recent work from across our portfolio.
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
