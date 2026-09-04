"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// Comparateur avant/après. En attendant les vrais visuels de projets,
// les zones "avant" et "après" sont représentées par des blocs de
// couleur explicitement légendés — à remplacer par de vraies photos
// et simulations dans /public/images (voir README > Médias).
export default function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
}: {
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const dictionary = useDictionary();
  const resolvedBeforeLabel = beforeLabel ?? dictionary.common.beforeLabel;
  const resolvedAfterLabel = afterLabel ?? dictionary.common.afterLabel;
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
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-subtle shadow-sm"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Après (fond) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-krisalys-blue-deep/25 to-krisalys-blue/15">
        <span className="text-sm font-semibold uppercase tracking-widest text-ink/60">
          {resolvedAfterLabel}
        </span>
      </div>

      {/* Avant (recouvrement) */}
      <div
        className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden bg-krisalys-gray-light"
        style={{ width: `${position}%` }}
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-ink-muted">
          {resolvedBeforeLabel}
        </span>
      </div>

      {/* Curseur */}
      <div
        className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 items-center bg-krisalys-blue-deep"
        style={{ left: `${position}%` }}
      >
        <div
          className="flex h-9 w-9 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full bg-krisalys-blue-deep text-white shadow-lg"
          onMouseDown={(e) => e.preventDefault()}
        >
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
