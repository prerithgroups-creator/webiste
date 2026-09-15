import { Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IKImage } from "@/components/ik-image";
import { ProjectPreviewCard } from "@/components/project-preview-card";
import { getProjects } from "@/lib/sanity";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero — full-bleed photo background with copy overlaid on top      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-white">
        {/* Background photo, covers the entire section */}
        <div className="absolute inset-0 -z-20">
          <IKImage
            src="/Designer.png"
            alt="Modern residential apartments in the city"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Scrim so the text stays readable over the photo, still letting
            the image's own left-edge fade show through */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/85 to-white/20" />

        <Container className="relative px-6 py-24 sm:py-32 lg:py-40">
          <div className="flex max-w-xl flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building <span className="text-accent">landmarks</span>, on
              time, every time.
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Prerith Groups delivers landmark commercial, residential, and
              renovation projects across India — engineered for precision and
              delivered on schedule, every time.
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                size="lg"
                className="rounded-2xl bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
                render={<Link href="/contact" />}
                nativeButton={false}
              >
                Get a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-foreground/20 bg-white text-foreground hover:bg-secondary"
                render={<Link href="/portfolio" />}
                nativeButton={false}
              >
                Our Projects
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sample projects                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-secondary px-6 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Work"
            title={
              <span className="flex items-center gap-2">
                <Timer className="size-6 text-accent" />
                Featured projects
              </span>
            }
            subtitle="A selection of recent work from across our portfolio."
          />

          {projects.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectPreviewCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted-foreground">
              Projects will appear here as soon as they&apos;re published in
              Sanity Studio.
            </p>
          )}
        </Container>
      </section>
    </div>
  );
}


