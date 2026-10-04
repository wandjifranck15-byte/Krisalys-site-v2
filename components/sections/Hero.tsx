"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// Chargé uniquement côté client (WebGL/canvas) et seulement sur grand écran —
// voir components/three/GlassKMark.tsx. Signature visuelle rare et
// stratégique (un seul emplacement sur tout le site), pas un effet répété.
const GlassKMark = dynamic(() => import("@/components/three/GlassKMark"), { ssr: false });

export default function Hero() {
  const dictionary = useDictionary();
  const sectionRef = useRef<HTMLElement>(null);
  // N'importe (et ne télécharge) le moteur WebGL que sur grand écran : sur
  // mobile, le conteneur est de toute façon masqué en CSS (`lg:block`) —
  // inutile de faire payer ~1 Mo de JS Three.js à un visiteur qui ne le
  // verra jamais (voir contrainte performance Android du brief).
  const [showGlass, setShowGlass] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setShowGlass(mql.matches);
    const onChange = () => setShowGlass(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-krisalys-black">
      {/* Fond : façade vitrée réelle au coucher du soleil (public/images/
          visuals/hero-facade-coucher-soleil.jpg) — tons bleutés à gauche,
          lumière chaude à droite, cadrage recentré sur mobile pour ne pas
          perdre le soleil sur un crop étroit. */}
      <div className="absolute inset-0">
        <Image
          src="/images/visuals/hero-facade-coucher-soleil.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_50%] lg:object-center"
        />
      </div>
      {/* Voile de lisibilité : plus sombre à gauche (zone du texte), plus
          léger à droite (zone du K 3D + lumière du coucher de soleil) sur
          grand écran ; voile uniforme sur mobile, où le texte occupe toute
          la largeur. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(8,9,12,0.88)_0%,rgba(8,9,12,0.62)_42%,rgba(8,9,12,0.3)_70%,rgba(8,9,12,0.18)_100%)] lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.62)_0%,rgba(8,9,12,0.84)_38%,rgba(8,9,12,0.88)_68%,rgba(8,9,12,0.78)_100%)] lg:hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,9,12,0.55)_100%)]" />
      {/* Léger voile de marque (bleu/orange) — très subtil, pour ne pas
          couvrir la photo : renforce la cohérence de palette sans la
          dénaturer (Partie 7 du Master Prompt KOS : "reflets, dégradés,
          glow subtil" — jamais un aplat opaque). */}
      <div className="absolute inset-0 bg-gradient-brand-radial opacity-30 mix-blend-soft-light" />
      {/* Touche de profondeur dorée discrète, en écho à la lumière du
          coucher de soleil de la photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 animate-glow-pulse rounded-full bg-krisalys-gold/20 blur-[100px]"
      />

      {/* Signature K en verre optique — grand écran uniquement, derrière le
          texte (pointer-events-none : ne bloque jamais les CTA). Taille et
          position contenues (pas de inset-y-0 pleine hauteur) pour que le K
          accompagne le Hero sans concurrencer le titre ni les CTA. */}
      {showGlass && (
        <div className="pointer-events-none absolute right-10 top-1/2 hidden h-[55%] w-[30%] max-w-md -translate-y-1/2 lg:block">
          <GlassKMark containerScrollRef={sectionRef} />
        </div>
      )}

      <Container className="relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-krisalys-blue">
            {dictionary.hero.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dictionary.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-krisalys-gray-light">
            {dictionary.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              {dictionary.common.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="/nos-solutions" variant="secondary" size="lg">
              {dictionary.common.ctaSecondary}
            </ButtonLink>
          </div>
          <Link
            href="/configurateur"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-krisalys-gray-light transition-colors hover:text-white"
          >
            {dictionary.hero.configuratorCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-krisalys-gray-light"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
