"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// Comparateur avant/après — deux visuels réels et distincts (une façade
// vitrée classique / une façade équipée d'un écran LED transparent),
// illustrant le potentiel de transformation sans prétendre qu'il s'agit
// du même bâtiment ni d'une réalisation KRISALYS précise (voir
// dictionary.pages.home.projectionDescription, déjà formulé au
// conditionnel — "imaginez", "comparez" — jamais comme un fait).
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
      <div className="absolute inset-0">
        <Image
          src="/images/visuals/ecran-led-facade-architecture.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
          priority={false}
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-krisalys-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          {resolvedAfterLabel}
        </span>
      </div>

      {/* Avant (recouvrement, même cadrage que l'image "après" via clip-path
          plutôt qu'un conteneur rétréci — évite tout décalage/redimensionnement
          de l'image pendant le glissement) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src="/images/visuals/facade-vitree-avant-led.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-krisalys-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
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
