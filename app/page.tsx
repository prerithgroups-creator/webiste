import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectPreviewCard } from "@/components/project-preview-card";
import { getProjects } from "@/lib/sanity";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-28">
        <Container className="flex max-w-4xl flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/logo-symbol-white.png"
              alt=""
              width={36}
              height={44}
              className="h-9 w-auto sm:h-10"
            />
            <p className="text-base font-bold tracking-[0.3em] text-white uppercase sm:text-lg">
              Prerith Groups
            </p>
          </div>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Building landmarks,{" "}
            <span className="text-accent">on time, every time.</span>
          </h1>
          <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Prerith Groups delivers landmark commercial, residential, and
            renovation projects across India — engineered for precision and
            delivered on schedule, every time.
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
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
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sample projects                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16 sm:py-20">
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

