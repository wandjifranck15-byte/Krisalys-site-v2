"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/LocaleContext";

/**
 * Logo KRISALYS — source de vérité visuelle unique du site.
 *
 * Trois variantes, dérivées des fichiers officiels (voir 01-Branding.md du KOS) :
 * - "mark"   : le "K" seul (public/images/brand_mark_k.png) — utilisé en mobile compact.
 * - "full"   : le "K" + le mot "KRISALYS" (public/images/brand_logo_full.png) — desktop / footer / header.
 * - "lockup" : logo complet + slogan "ÉCRANS LED & SOLUTIONS VISUELLES" (public/images/brand_logo_lockup.png)
 *              — réservé aux grands formats où le slogan reste lisible (hero de l'accueil). Ne jamais
 *              utiliser en header/footer : le slogan devient illisible en dessous de ~200px de large.
 *
 * L'animation d'apparition (~500ms, halo bleu/orange subtil) suit la règle de marque validée dans
 * la Partie 7 du Master Prompt KOS : elle ne se joue qu'une fois, au montage, jamais en boucle.
 */
export default function Logo({
  variant = "full",
  withGlow = true,
  asLink = true,
  className,
  priority = false,
}: {
  variant?: "full" | "mark" | "lockup";
  withGlow?: boolean;
  /** Si false, affiche le logo sans le lien vers l'accueil (utile quand le logo est déjà sur la page d'accueil, ex. hero). */
  asLink?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const dictionary = useDictionary();
  const src =
    variant === "full"
      ? "/images/brand_logo_full.png"
      : variant === "lockup"
        ? "/images/brand_logo_lockup.png"
        : "/images/brand_mark_k.png";

  const dimensions =
    variant === "full"
      ? { width: 220, height: 86, style: { height: "2.25rem", width: "auto" } }
      : variant === "lockup"
        ? {
            width: 1326,
            height: 1018,
            // Cible ~320px de large en desktop (validé sur la maquette hero), avec un plancher de
            // 180px sur mobile pour rester lisible sans écraser le contenu au-dessus du pli.
            style: { width: "clamp(180px, 40vw, 320px)", height: "auto" },
          }
        : { width: 40, height: 39, style: { height: "2rem", width: "auto" } };

  const image = (
    <span className={cn("relative inline-flex items-center", className)}>
      {withGlow && (
        <span
          aria-hidden
          className={cn(
            "absolute -z-10 rounded-full bg-gradient-logo-glow opacity-0 animate-logo-halo",
            variant === "lockup" ? "-inset-8" : "-inset-3"
          )}
        />
      )}
      <Image
        src={src}
        alt="KRISALYS — Écrans LED & solutions visuelles"
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        sizes={variant === "lockup" ? "(max-width: 768px) 40vw, 320px" : undefined}
        className="h-auto w-auto opacity-0 animate-logo-reveal"
        style={dimensions.style}
      />
    </span>
  );

  if (!asLink) return image;

  return (
    <Link href="/" aria-label={dictionary.common.backToHome} className="relative inline-flex items-center">
      {image}
    </Link>
  );
}
