"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { IKImage } from "@/components/ik-image";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Responsive gallery grid that opens the shared `GalleryLightbox` on click.
 * Owns only the "which index is open" state — all lightbox behavior
 * (keyboard nav, prev/next, close) lives in the reusable component.
 */
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxImages = images.map((src, index) => ({
    src,
    alt: `${title} — photo ${index + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open photo ${index + 1} of ${images.length}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary"
          >
            <IKImage
              src={src}
              alt={`${title} — photo ${index + 1}`}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <Maximize2 className="size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </button>
        ))}
      </div>

      <GalleryLightbox
        images={lightboxImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
