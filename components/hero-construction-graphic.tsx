/**
 * Abstract architectural illustration used on the homepage hero. Built as
 * inline geometry (not a stock photo) so it renders crisply at any size and
 * stays perfectly on-brand (charcoal / gray / orange). A soft mask fades the
 * artwork into the page background on its inner edge, so it reads as
 * "emerging" behind the brand copy rather than a hard-edged image block.
 */
export function HeroConstructionGraphic() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-xl lg:max-w-none"
      style={{
        maskImage: "linear-gradient(to left, black 50%, transparent 95%)",
        WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 95%)",
      }}
    >
      <svg
        viewBox="0 0 480 360"
        className="h-full w-full"
        role="img"
        aria-label="Abstract illustration of buildings under construction with a crane"
      >
        {/* Soft backdrop */}
        <rect x="0" y="0" width="480" height="360" rx="28" fill="#F3F4F6" />

        {/* Skyline blocks */}
        <rect x="60" y="150" width="70" height="180" rx="6" fill="#E5E7EB" />
        <rect x="150" y="100" width="90" height="230" rx="6" fill="#D1D5DB" />
        <rect x="260" y="150" width="70" height="180" rx="6" fill="#E5E7EB" />
        <rect x="345" y="60" width="80" height="270" rx="6" fill="#1F2937" />

        {/* Window grid on the tall charcoal tower */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={360 + col * 20}
              y={80 + row * 35}
              width="12"
              height="20"
              rx="2"
              fill="#F97316"
              opacity={0.85}
            />
          ))
        )}

        {/* Construction framework lines on the mid tower */}
        <g stroke="#9CA3AF" strokeWidth="2">
          <line x1="150" y1="130" x2="240" y2="130" />
          <line x1="150" y1="170" x2="240" y2="170" />
          <line x1="150" y1="210" x2="240" y2="210" />
          <line x1="150" y1="250" x2="240" y2="250" />
          <line x1="150" y1="290" x2="240" y2="290" />
        </g>

        {/* Crane mast + jib */}
        <g stroke="#1F2937" strokeWidth="4" strokeLinecap="round">
          <line x1="120" y1="330" x2="120" y2="40" />
          <line x1="120" y1="40" x2="230" y2="40" />
          <line x1="120" y1="40" x2="75" y2="55" />
          <line x1="120" y1="60" x2="150" y2="40" />
        </g>
        {/* Crane hook cable + orange accent hook */}
        <line x1="215" y1="42" x2="215" y2="90" stroke="#6B7280" strokeWidth="2" />
        <circle cx="215" cy="96" r="7" fill="#F97316" />

        {/* Orange geometric accent line */}
        <line x1="40" y1="330" x2="440" y2="330" stroke="#F97316" strokeWidth="3" />
      </svg>
    </div>
  );
}
