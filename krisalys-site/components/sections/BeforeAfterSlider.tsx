"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

// Comparateur avant/après. En attendant les vrais visuels de projets,
// les zones "avant" et "après" sont représentées par des blocs de
// couleur explicitement légendés — à remplacer par de vraies photos
// et simulations dans /public/images (voir README > Médias).
export default function BeforeAfterSlider({
  beforeLabel = "Avant",
  afterLabel = "Après installation KRISALYS",
}: {
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-white/10"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Après (fond) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-krisalys-blue/30 to-krisalys-orange/20">
        <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
          {afterLabel}
        </span>
      </div>

      {/* Avant (recouvrement) */}
      <div
        className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden bg-krisalys-anthracite"
        style={{ width: `${position}%` }}
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-white/50">
          {beforeLabel}
        </span>
      </div>

      {/* Curseur */}
      <div
        className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 items-center bg-white"
        style={{ left: `${position}%` }}
      >
        <div
          className="flex h-9 w-9 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-krisalys-black shadow-lg"
          onMouseDown={(e) => e.preventDefault()}
        >
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
