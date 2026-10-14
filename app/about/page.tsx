import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IKImage } from "@/components/ik-image";
import { getTeamMembers } from "@/lib/sanity";

const TITLE = "About Us";
const DESCRIPTION =
  "Prerith Groups is a construction and development company delivering landmark residential, commercial, and renovation projects across India.";

export const revalidate = 60;

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

export default async function AboutPage() {
  const team = await getTeamMembers();

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

      <section className="bg-secondary px-6 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Our Story
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built on Experience. Driven by Quality. Trusted by Customers.
          </h2>

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              My journey in the construction industry began with RNS
              Infrastructure Ltd., where I started my career working on
              infrastructure projects. Those early years gave me a strong
              foundation in construction, project execution, and the
              importance of delivering work with responsibility and
              discipline.
            </p>
            <p>
              Around 2012, I took the next step in my career by joining
              Sobha Ltd., one of India&apos;s leading real estate companies.
              Over the next 12+ years, I had the opportunity to be
              associated with and contribute to several prestigious
              projects, including Sobha City, Sobha Dream Acres, 1 Sobha
              Mall, Metercube, and other major developments.
            </p>
            <p>
              My years at Sobha were more than just a career — they were a
              learning journey. I gained valuable experience in quality
              management, project execution, planning, coordination,
              customer expectations, and timely delivery. Working alongside
              experienced professionals and building a network of industry
              contacts helped me understand what it truly takes to build
              projects that stand the test of time.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground">
              From Experience to Entrepreneurship
            </h3>
            <p>
              After more than a decade of learning and experience, I decided
              to take the next step and build something of my own. That
              vision led to Prerith Groups — Construction &amp; Interiors.
            </p>
            <p>
              We started with a simple philosophy: bring professional
              construction standards, quality workmanship, transparency,
              and timely execution to every project, regardless of its
              size. Since our beginning, we have successfully completed
              residential and commercial projects, earning the trust and
              satisfaction of our customers through our commitment to
              quality and attention to detail.
            </p>
            <p>
              For us, construction is not just about building walls and
              structures. It is about understanding a customer&apos;s
              vision, converting that vision into reality, and creating
              spaces that people can be proud of.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground">
              Our Vision
            </h3>
            <p>
              Our vision is to take Prerith Groups to the next level and
              make professional construction and interior solutions
              accessible to more people. With our experience in the
              industry and the lessons learned over the years, our goal is
              to deliver:
            </p>
            <ul className="grid list-none grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "Quality construction",
                "Professional project management",
                "Timely completion",
                "Transparent communication",
                "Value for money",
                "Quality interiors and finishing",
                "Customer-focused service",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              We believe that good construction does not always have to
              come at an unreasonable cost. Our aim is to find the right
              balance between quality, durability, aesthetics, and value.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-border sm:p-10">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              Building Your Vision. Delivering With Confidence.
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Every project we take up is an opportunity to earn a
              long-term relationship with our customer. At Prerith Groups
              Construction &amp; Interiors, we bring together years of
              industry experience, professional standards, and a personal
              commitment to every project we undertake.
            </p>
            <p className="mt-4 font-heading text-lg font-semibold text-primary">
              Your vision inspires us. Our experience brings it to life.
              Quality is what we stand for.
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              — Prashanth Shetty, Founder
            </p>
          </div>
        </Container>
      </section>

      {team.length > 0 ? (
        <section className="px-6 py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Our Team"
              title="The people behind every project"
              subtitle="Experienced leaders across architecture, engineering, and project management."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="relative mx-auto size-24 overflow-hidden rounded-full bg-muted">
                    {member.photo ? (
                      <IKImage
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{member.experience} experience</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
