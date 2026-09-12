import type { Metadata } from "next";
import { Building2, Hammer, HardHat, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const TITLE = "Our Services";
const DESCRIPTION =
  "Residential, commercial, and renovation construction services delivered by Prerith Groups — from planning through handover.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICES = [
  {
    icon: Building2,
    title: "Commercial Construction",
    description:
      "Office towers, business parks, and retail developments built with fast-track delivery schedules and smart-building integration.",
  },
  {
    icon: HardHat,
    title: "Residential Construction",
    description:
      "Apartments, villas, and gated communities designed for comfortable living, from foundation to finishing.",
  },
  {
    icon: Hammer,
    title: "Renovation & Restoration",
    description:
      "Sensitive structural and façade restoration of heritage and existing buildings, modernizing systems while preserving character.",
  },
  {
    icon: Wrench,
    title: "Project Management",
    description:
      "End-to-end planning, contractor coordination, and quality oversight to keep every project on time and on budget.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Services
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            What We Do
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            From ground-up construction to heritage restoration, Prerith
            Groups delivers projects of every scale across India.
          </p>
        </Container>
      </section>

      <section className="px-6 py-16">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Built for every project type"
            subtitle="Whatever the scope, our teams bring the same standard of precision and reliability."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                  <service.icon className="size-5 text-primary" />
                </div>
                <h2 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
