"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { IKImage } from "@/components/ik-image";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  title: string;
};

/**
 * Drag-to-reveal before/after comparison. Uses Pointer Events so the same
 * handlers work for mouse, touch, and pen input. The "before" image is
 * clipped with `clip-path` (rather than resized) so it never distorts while
 * dragging. Arrow keys nudge the divider for keyboard accessibility.
 */
export function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePosition(event.clientX);
  };
  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-2xl bg-muted select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* Base layer: "after" image, always fully visible */}
      <IKImage
        src={afterImage}
        alt={`${title} — after`}
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="pointer-events-none object-cover"
      />
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
        After
      </span>

      {/* Clipped layer: "before" image, revealed as the divider moves right */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <IKImage
          src={beforeImage}
          alt={`${title} — before`}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
          Before
        </span>
      </div>

      {/* Draggable divider handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
        className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 cursor-ew-resize items-center justify-center bg-white/80 focus-visible:outline-none"
        style={{ left: `${position}%` }}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10">
          <MoveHorizontal className="size-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
