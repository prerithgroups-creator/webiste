"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
 * Sticky site header. Transparent (text in white) while at the top of a
 * hero section, and animates to a solid navy bar with a soft shadow once the
 * page scrolls past `SCROLL_THRESHOLD`. On small screens the nav collapses
 * into an animated slide-in drawer.
 */
export function Header() {
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
      {/*
        Positioned `fixed` (not `sticky`) so it overlays the hero completely
        transparent, then fades to a solid navy bar with a shadow once the
        page scrolls past SCROLL_THRESHOLD. Pages/sections that don't start
        with a full-bleed hero should add top padding (>= h-20, i.e. 80px) to
        their first section so content isn't hidden underneath the header.
      */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(31, 58, 95, 0.98)"
            : "rgba(31, 58, 95, 0)",
          boxShadow: isScrolled
            ? "0 10px 30px -12px rgba(15, 27, 46, 0.45)"
            : "0 0 0 rgba(15, 27, 46, 0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm"
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.png"
                alt="Prerith Groups"
                width={160}
                height={48}
                priority
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get a Quote
              </Button>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
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
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col gap-8 bg-primary p-6 shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Image src="/logo-white.png" alt="Prerith Groups" width={140} height={42} className="h-8 w-auto" />
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
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
