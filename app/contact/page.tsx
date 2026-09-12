import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BUSINESS } from "@/lib/site-config";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with Prerith Groups for project inquiries, quotes, or general questions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    value: BUSINESS.telephoneDisplay,
    href: `tel:${BUSINESS.telephone}`,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: `${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.areaServed}`,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Contact
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Have a project in mind? Reach out and our team will get back to
            you.
          </p>
        </Container>
      </section>

      <section className="px-6 py-16">
        <Container>
          <SectionHeading
            eyebrow="Reach Us"
            title="We'd love to hear from you"
            subtitle="Call, email, or visit our office — whichever works best for you."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {CONTACT_CARDS.map((card) => {
              const content = (
                <>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                    <card.icon className="size-5 text-primary" />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">{card.value}</p>
                </>
              );

              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-colors hover:bg-secondary"
                >
                  {content}
                </a>
              ) : (
                <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
