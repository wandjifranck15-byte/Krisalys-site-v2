"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo KRISALYS — source de vérité visuelle unique du site.
 *
 * Deux variantes, dérivées du même fichier officiel (voir 01-Branding.md du KOS) :
 * - "mark"   : le "K" seul (public/images/brand_mark_k.png) — utilisé en mobile compact.
 * - "full"   : le "K" + le mot "KRISALYS" (public/images/brand_logo_full.png) — desktop / footer.
 *
 * L'animation d'apparition (~500ms, halo bleu/orange subtil) suit la règle de marque validée dans
 * la Partie 7 du Master Prompt KOS : elle ne se joue qu'une fois, au montage, jamais en boucle.
 */
export default function Logo({
  variant = "full",
  withGlow = true,
  className,
  priority = false,
}: {
  variant?: "full" | "mark";
  withGlow?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const isFull = variant === "full";

  return (
    <Link
      href="/"
      aria-label="KRISALYS — retour à l'accueil"
      className={cn("relative inline-flex items-center", className)}
    >
      {withGlow && (
        <span
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-full bg-gradient-logo-glow opacity-0 animate-logo-halo"
        />
      )}
      <Image
        src={isFull ? "/images/brand_logo_full.png" : "/images/brand_mark_k.png"}
        alt="KRISALYS — Écrans LED &amp; solutions visuelles"
        width={isFull ? 220 : 40}
        height={isFull ? 86 : 39}
        priority={priority}
        className="h-auto w-auto opacity-0 animate-logo-reveal"
        style={{ height: isFull ? "2.25rem" : "2rem", width: "auto" }}
      />
    </Link>
  );
}
