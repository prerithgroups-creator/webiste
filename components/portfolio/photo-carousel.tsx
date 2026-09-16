"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { IKImage } from "@/components/ik-image";

type PhotoCarouselProps = {
  images: string[];
  title: string;
};

/**
 * Minimalist main-photo carousel for non-renovation projects: shows one
 * large photo at a time with premium, understated prev/next arrow buttons
 * floating over the image edges, plus small dot indicators. Used in place
 * of the before/after slider (which only makes sense for renovations).
 */
export function PhotoCarousel({ images, title }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const goTo = (next: number) => {
    setIndex(((next % images.length) + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[16/9]">
        <IKImage
          key={images[index]}
          src={images[index]}
          alt={`${title} — photo ${index + 1}`}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-md backdrop-blur-sm transition hover:bg-white sm:size-12"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-md backdrop-blur-sm transition hover:bg-white sm:size-12"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-accent" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
