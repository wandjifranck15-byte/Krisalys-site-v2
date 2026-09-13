"use client";

import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  // "h1" uniquement pour le titre principal d'une page (une seule fois par
  // page) — défaut "h2" inchangé pour ne pas casser la hiérarchie des
  // sections qui utilisent déjà ce composant ailleurs sur la page (Phase 11).
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <FadeIn className={cn("max-w-3xl", align === "center" && "mx-auto")}>
      <div className={cn(align === "center" && "text-center")}>
        {eyebrow && (
          <p
            className={cn(
              "mb-3 text-sm font-semibold uppercase tracking-widest",
              light ? "text-krisalys-blue" : "text-accent"
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl",
            light ? "text-white" : "text-ink"
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className={cn("mt-4 text-lg", light ? "text-krisalys-gray-light" : "text-ink-muted")}>
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
