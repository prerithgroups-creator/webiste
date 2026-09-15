import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroConstructionGraphic } from "@/components/hero-construction-graphic";
import { IKImage } from "@/components/ik-image";
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
              alt="Prerith Groups"
              width={200}
              height={60}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <h1 className="max-w-xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building <span className="text-accent">landmarks</span>, on
              time, every time.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
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

          {/* Right: abstract architectural/crane illustration, fading in from behind the branding */}
          <div className="hidden lg:block">
            <HeroConstructionGraphic />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Residential projects banner                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Text: stacks above the image on mobile via DOM order + grid-cols-1 */}
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-accent">Residential</span> Projects
            </h2>
            <p className="max-w-md text-base text-muted-foreground sm:text-lg">
              Thoughtfully designed apartments and gated communities built
              for comfortable living — from foundation to finishing, with
              premium landscaping and lasting quality.
            </p>
            <Button
              size="lg"
              className="rounded-2xl bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
              render={<Link href="/portfolio" />}
              nativeButton={false}
            >
              View Projects
            </Button>
          </div>

          {/* Image: already fades to white on its left edge, so it blends
              seamlessly into this section's white background with no visible
              border. */}
          <div className="relative aspect-[3/2] w-full lg:aspect-[16/11]">
            <IKImage
              src="/Designer.png"
              alt="Modern residential apartments in the city"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-right"
            />
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


