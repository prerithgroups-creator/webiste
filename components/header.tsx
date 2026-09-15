"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "cn";
import { NAV_LINKS } from "@/lib/nav-links";

const SCROLL_THRESHOLD = 24;

/**
 * Sticky site header: white background, charcoal nav text, and an orange
 * underline indicator on the active route. Gains a soft shadow once the
 * page scrolls past `SCROLL_THRESHOLD`. On small screens the nav collapses
 * into an animated slide-in drawer.
 */
export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  // Prevent background scroll while the mobile drawer is open.
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close the drawer automatically if the viewport is resized back to desktop.
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsMenuOpen(false);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Close the drawer on Escape for keyboard users.
  React.useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          boxShadow: isScrolled
            ? "0 8px 24px -12px rgba(31, 41, 55, 0.18)"
            : "0 0 0 rgba(31, 41, 55, 0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white"
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Prerith Groups"
                width={160}
                height={48}
                priority
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 text-sm font-medium transition-colors",
                      isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                className="rounded-xl bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
              >
                Get a Quote
              </Button>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="size-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu className="size-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {isMenuOpen ? (
          <React.Fragment>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-foreground/50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col gap-8 bg-white p-6 shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Image src="/logo.png" alt="Prerith Groups" width={140} height={42} className="h-8 w-auto" />
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-auto w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
                )}
              >
                Get a Quote
              </Link>
            </motion.div>
          </React.Fragment>
        ) : null}
      </AnimatePresence>
    </>
  );
}

