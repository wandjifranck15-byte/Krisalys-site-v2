"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { getTechnologies } from "@/data/technologies";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Page passerelle : oriente vers les deux pages piliers et le
// configurateur. Ne reproduit PAS leur contenu détaillé (voir
// components/pages/TechnologyPageContent.tsx pour l'approfondissement).
export default function NosSolutionsPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const technologies = getTechnologies(locale);
  const p = dictionary.pages.nosSolutions;
  const pilier = dictionary.pilier;

  return (
    <>
      {/* 1. Introduction générale très courte */}
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} as="h1" />
        </Container>
      </section>

      {/* 2. Les deux technologies, présentation strictement symétrique */}
      <section className="bg-surface-soft py-16">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {technologies.map((tech) => (
            <div key={tech.slug} className="flex flex-col rounded-2xl border border-subtle bg-surface p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
                {p.techLabel} — {tech.eyebrow.replace(/^Technologie |^Technology /, "")}
              </p>
              <DynamicIcon name={tech.icon} className="mt-4 h-9 w-9 text-krisalys-blue-deep" />
              <h2 className="mt-4 text-xl font-bold text-ink">{tech.name}</h2>
              <p className="mt-3 flex-1 text-sm text-ink-muted">{tech.shortDescription}</p>
              <ButtonLink href={tech.slug === "film-led-transparent" ? "/film-led-transparent" : "/ecrans-led-transparents"} variant="secondary" className="mt-6 w-fit">
                {p.cta}
              </ButtonLink>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. Bloc "vous hésitez ?" — réutilise les clés déjà définies pour
          les pages piliers, pas de nouveau texte dupliqué. */}
      <CTASection title={pilier.hesitationTitle} ctaLabel={pilier.hesitationCta} ctaHref="/configurateur" />

      {/* 4. Rien d'autre — pas de secteurs, méthode, maintenance, FAQ ni
          caractéristiques techniques détaillées ici (voir consigne Phase 2). */}
    </>
  );
}
