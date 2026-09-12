import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { PortfolioBrowser } from "@/components/portfolio-browser";

const TITLE = "Our Projects";
const DESCRIPTION =
  "Browse the Prerith Groups portfolio of residential, commercial, and renovation projects across India.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* Page header                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Portfolio
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Our Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            A look at the residential, commercial, and renovation work Prerith
            Groups has delivered across India — filter by category, year, or
            location to explore.
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Filters + grid                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16">
        <Container>
          <PortfolioBrowser projects={projects} />
        </Container>
      </section>
    </div>
  );
}
