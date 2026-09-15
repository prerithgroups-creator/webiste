import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroConstructionGraphic } from "@/components/hero-construction-graphic";
import { ProjectPreviewCard } from "@/components/project-preview-card";
import { getProjects } from "@/lib/sanity";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white px-6 py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left: brand + copy + CTAs */}
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <Image
              src="/logo.png"
              alt="Prerith Group"
              width={200}
              height={60}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <p className="text-sm font-bold tracking-[0.35em] text-muted-foreground uppercase">
              Prerith Group
            </p>
            <h1 className="max-w-xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building <span className="text-accent">landmarks</span>, on
              time, every time.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              Prerith Group delivers landmark commercial, residential, and
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

          {/* Right: abstract architectural/crane illustration, fading in from behind the branding */}
          <div className="hidden lg:block">
            <HeroConstructionGraphic />
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


