"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function Hero() {
  const dictionary = useDictionary();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-krisalys-black">
      {/* Fond : à remplacer par une vidéo réelle de façade LED (voir README > Médias) */}
      <div className="absolute inset-0 bg-gradient-brand-radial" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.4)_0%,rgba(10,10,10,0.85)_100%)]" />
      {/* Touche de profondeur dorée discrète (Partie 7 du Master Prompt KOS : "reflets, dégradés,
          glow subtil, lumière diffuse" — jamais de néon agressif) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-krisalys-gold/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(17,93,178,0.18) 0px, rgba(17,93,178,0.18) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <Container className="relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Logo variant="lockup" asLink={false} priority className="mb-10" />
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
