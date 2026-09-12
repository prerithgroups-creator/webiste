import type { Metadata } from "next";
import Link from "next/link";
import { Compass, HardHat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center bg-primary px-6 py-24 text-primary-foreground sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
          <HardHat className="size-4 text-accent" />
          Prerith Groups
        </span>
        <p className="font-heading text-7xl font-extrabold tracking-tight text-accent sm:text-8xl">
          404
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          This page hasn&apos;t been built yet.
        </h1>
        <p className="max-w-md text-primary-foreground/80">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get
          you back on site.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            size="lg"
            className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Back to Home
          </Button>
          <Button
            render={<Link href="/portfolio" />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-2xl border-white/20 bg-transparent text-primary-foreground hover:bg-white/10"
          >
            <Compass className="size-4" />
            View Projects
          </Button>
        </div>
      </Container>
    </div>
  );
}
