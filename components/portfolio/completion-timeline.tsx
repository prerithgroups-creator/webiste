"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Building2, CheckCircle2, HardHat, KeyRound, PaintRoller } from "lucide-react";
import { cn } from "cn";

const STAGES = [
  { label: "Foundation", icon: HardHat },
  { label: "Structure", icon: Building2 },
  { label: "Finishing", icon: PaintRoller },
  { label: "Handover", icon: KeyRound },
];

type CompletionTimelineProps = {
  /** Total number of days between start and completion. */
  totalDays: number;
  /** 0-100. 100 for completed projects, current progress for ongoing ones. */
  progressPercent: number;
  isOngoing: boolean;
};

/**
 * Signature animated timeline: 4 stage nodes connected by a line that fills
 * in as the section scrolls into view, plus a day-counter that animates up
 * to `totalDays` and a matching progress bar. Triggers once, the first time
 * the section becomes visible (`useInView` with `once: true`).
 */
export function CompletionTimeline({
  totalDays,
  progressPercent,
  isOngoing,
}: CompletionTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, totalDays, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, totalDays]);

  return (
    <div ref={sectionRef}>
      {/* Stage nodes + connecting progress line */}
      <div className="relative flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-6">
        {/* Desktop: horizontal line spanning icon centers (size-12 => 24px inset) */}
        <div className="absolute top-6 right-6 left-6 hidden h-0.5 bg-border sm:block">
          <div
            className="h-full origin-left bg-accent transition-transform duration-[1600ms] ease-out"
            style={{ transform: isInView ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>
        {/* Mobile: vertical line spanning icon centers */}
        <div className="absolute top-6 bottom-6 left-6 block w-0.5 bg-border sm:hidden">
          <div
            className="w-full origin-top bg-accent transition-transform duration-[1600ms] ease-out"
            style={{ transform: isInView ? "scaleY(1)" : "scaleY(0)" }}
          />
        </div>

        {STAGES.map((stage, index) => (
          <div
            key={stage.label}
            className="relative z-10 flex items-center gap-4 transition-all duration-500 sm:flex-1 sm:flex-col sm:items-center sm:gap-3 sm:text-center"
            style={{
              transitionDelay: isInView ? `${index * 250}ms` : "0ms",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors duration-500",
                isInView ? "border-accent text-accent" : "border-border text-muted-foreground"
              )}
              style={{ transitionDelay: isInView ? `${150 + index * 250}ms` : "0ms" }}
            >
              <stage.icon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-foreground sm:text-base">
              {stage.label}
            </span>
          </div>
        ))}
      </div>

      {/* Day counter + progress bar */}
      <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:items-center">
        <div>
          <p className="font-heading text-5xl font-extrabold tabular-nums text-primary sm:text-6xl">
            {count}
            <span className="ml-2 text-xl font-semibold text-muted-foreground sm:text-2xl">
              days
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Total construction time</p>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span className={cn(!isOngoing && "flex items-center gap-1.5 text-emerald-700")}>
              {!isOngoing && <CheckCircle2 className="size-4" />}
              {isOngoing ? "In progress" : "Completed"}
            </span>
            <span className="tabular-nums">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-[1400ms] ease-out",
                isOngoing ? "bg-accent" : "bg-emerald-600"
              )}
              style={{ width: isInView ? `${progressPercent}%` : "0%", transitionDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
