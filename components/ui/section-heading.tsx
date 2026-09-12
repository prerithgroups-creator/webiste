import * as React from "react";
import { cn } from "cn";

export type SectionHeadingProps = {
  /** Small uppercase accent label shown above the title, e.g. "Our Work". */
  eyebrow?: string;
  /** Main heading text. */
  title: React.ReactNode;
  /** Supporting copy shown below the title. */
  subtitle?: React.ReactNode;
  /** Text alignment. Defaults to "left". */
  align?: "left" | "center";
  className?: string;
};

/**
 * Reusable section intro: eyebrow label + bold heading + supporting
 * subtitle. Used at the top of most homepage/section blocks.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export { SectionHeading };
