import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Quote } from "lucide-react";
import { IKImage } from "@/components/ik-image";
import { getProjectBySlug, getProjects } from "@/lib/sanity";
import { getProjectDuration } from "@/lib/utils";
import { BUSINESS, SITE_URL } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectFactsBar } from "@/components/portfolio/project-facts-bar";
import { CompletionTimeline } from "@/components/portfolio/completion-timeline";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { MoreProjects } from "@/components/portfolio/more-projects";

// Re-fetch from Sanity at most once per minute instead of caching the
// build-time result forever, so newly published/edited projects (and new
// slugs not present at build time) show up without needing a full redeploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const url = `/portfolio/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: "article",
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const totalDays = getProjectDuration(project.startDate, project.completionDate);
  const isOngoing = project.status === "Ongoing";
  const allProjects = await getProjects();

  // "CreativeWork" structured data for this individual project — the
  // company-level "GeneralContractor" schema lives once in app/layout.tsx.
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.coverImage,
    url: `${SITE_URL}/portfolio/${project.slug}`,
    keywords: project.category,
    dateCreated: project.startDate,
    datePublished: project.completionDate,
    creator: {
      "@type": "Organization",
      name: BUSINESS.legalName,
      url: SITE_URL,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };

  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* ------------------------------------------------------------ */}
      {/* 1. Hero                                                       */}
      {/* ------------------------------------------------------------ */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-primary sm:min-h-[75vh]">
        <IKImage
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10" />

        <Container className="relative z-10 pt-32 pb-20 text-primary-foreground sm:pb-24">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-accent text-accent-foreground">{project.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-primary-foreground/85">
              <MapPin className="size-4" />
              {project.location}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 2. Project facts bar (floats over the hero's bottom edge)      */}
      {/* ------------------------------------------------------------ */}
      <div className="relative z-20 -mt-10 sm:-mt-14">
        <Container>
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-primary/10 ring-1 ring-border sm:p-8">
            <ProjectFactsBar project={project} />
          </div>
        </Container>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* 3. Animated completion timeline                                */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How We Built It"
            title="Completion Timeline"
            subtitle="From groundbreaking to handover — the four stages every Prerith Groups project moves through."
          />
          <div className="mt-14">
            <CompletionTimeline
              totalDays={totalDays}
              progressPercent={isOngoing ? project.progressPercent ?? 0 : 100}
              isOngoing={isOngoing}
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 4. Before / after slider                                       */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-secondary/40 px-6 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Transformation"
            title="Before & After"
            subtitle="Drag the divider to compare the site before construction and the finished result."
          />
          <div className="mt-10">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              title={project.title}
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 5. Gallery grid + lightbox                                     */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Gallery" title="Project Gallery" />
          <div className="mt-10">
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 6. Testimonial + CTA band                                      */}
      {/* ------------------------------------------------------------ */}
      {project.clientTestimonial ? (
        <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
          <Container className="max-w-3xl text-center">
            <Quote className="mx-auto size-10 text-accent" />
            <p className="mt-6 font-heading text-2xl leading-snug font-medium sm:text-3xl">
              &ldquo;{project.clientTestimonial}&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold tracking-wider text-primary-foreground/70 uppercase">
              — Client, {project.title}
            </p>
          </Container>
        </section>
      ) : null}

      <section className="bg-accent px-6 py-16 text-accent-foreground">
        <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 text-accent-foreground/90">
              Let&apos;s talk about how Prerith Groups can bring it to life — on time, every
              time.
            </p>
          </div>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            size="lg"
            className="rounded-xl bg-white text-primary hover:bg-white/90"
          >
            Contact Us
          </Button>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 7. More projects                                               */}
      {/* ------------------------------------------------------------ */}
      <MoreProjects projects={allProjects} currentSlug={project.slug} />
    </div>
  );
}
