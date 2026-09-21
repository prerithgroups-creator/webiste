import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/nav-links";
import { BUSINESS } from "@/lib/site-config";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";

// Derived from the shared BUSINESS config (lib/site-config.ts) so contact
// details and the LocalBusiness JSON-LD in app/layout.tsx never drift apart.
const CONTACT = {
  phone: BUSINESS.telephoneDisplay,
  phoneHref: BUSINESS.telephone,
  email: BUSINESS.email,
  address: `${BUSINESS.streetAddress}, ${BUSINESS.addressLocality} ${BUSINESS.postalCode}`,
};

// TODO: replace "#" with real social profile URLs.
const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Company blurb */}
          <div className="max-w-sm">
            <span className="flex items-center">
              <Image src="/logo-white.png" alt="Prerith Groups" width={200} height={60} className="h-12 w-auto" />
            </span>
            <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
              Prerith Groups delivers landmark commercial, residential, and
              industrial projects — built with precision and always on
              schedule.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`tel:${CONTACT.phoneHref.replace(/\s+/g, "")}`} className="hover:text-accent">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>© {year} Prerith Groups. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
