import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const TITLE = "About Us";
const DESCRIPTION =
  "Prerith Groups is a construction and development company delivering landmark residential, commercial, and renovation projects across India.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STATS = [
  { label: "Years in Business", value: "15+" },
  { label: "Projects Delivered", value: "50+" },
  { label: "Cities Served", value: "8" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            About Us
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Building on Trust
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Prerith Groups delivers landmark commercial, residential, and
            renovation projects across India — engineered for precision and
            always on schedule.
          </p>
        </Container>
      </section>

      <section className="px-6 py-16">
        <Container>
          <SectionHeading
            eyebrow="Our Story"
            title="Two decades of building landmarks"
            subtitle="From single residential blocks to Grade-A business parks, our team has grown alongside every client we've built for."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-border"
              >
                <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
