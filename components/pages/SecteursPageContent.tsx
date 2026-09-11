"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import SectorCard from "@/components/sections/SectorCard";
import { getSectors } from "@/data/sectors";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Phase 8 : le secteur donne le contexte, jamais la technologie.
// `recommendedSolutionSlug` (ancien catalogue à 5 familles) a été retiré
// du modèle Sector — aucun `getSolutionBySlug()` dans ce parcours.
// La note sur les technologies est volontairement IDENTIQUE pour les 12
// secteurs (dictionary.pages.secteurs.technologiesNote) : aucune donnée
// ne permet d'affirmer qu'un secteur "privilégie" une technologie plutôt
// que l'autre — ne pas en inventer.
export default function SecteursPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const sectors = getSectors(locale);
  const p = dictionary.pages.secteurs;

  return (
    <>
      <section className="bg-canvas py-20">
        <Container className="max-w-3xl">
          {p.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{p.eyebrow}</p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{p.title}</h1>
          <p className="mt-4 text-lg text-ink-muted">{p.description}</p>
        </Container>

        <Container className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} viewLabel={dictionary.common.viewSectorLabel} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.introTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{p.introBody}</p>
        </Container>
      </section>

      {sectors.map((sector, i) => (
        <section
          key={sector.slug}
          id={sector.slug}
          className={`scroll-mt-24 py-16 ${i % 2 === 0 ? "bg-canvas" : "bg-surface-soft"}`}
        >
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <DynamicIcon name={sector.icon} className="h-9 w-9 text-krisalys-blue" />
              <h3 className="mt-3 text-xl font-bold text-ink">{sector.name}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
                {p.technologiesNoteLabel}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{p.technologiesNote}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="md">{sector.ctaLabel}</ButtonLink>
                <ButtonLink href="/configurateur" variant="secondary" size="md">{p.ctaConfigureLabel}</ButtonLink>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                {dictionary.common.problemsLabel}
              </h4>
              <ul className="mt-3 space-y-2">
                {sector.problems.map((prob) => (
                  <li key={prob} className="text-sm text-ink-muted">• {prob}</li>
                ))}
              </ul>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                {dictionary.common.benefitsLabel}
              </h4>
              <ul className="mt-3 space-y-2">
                {sector.benefits.map((b) => (
                  <li key={b} className="text-sm text-ink-muted">• {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                {dictionary.common.useCasesLabel}
              </h4>
              <ul className="mt-3 space-y-2">
                {sector.useCases.map((u) => (
                  <li key={u} className="text-sm text-ink-muted">• {u}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-canvas py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.processTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{p.processBody}</p>
          <Link href="/notre-methode" className="mt-4 inline-block text-sm font-medium text-krisalys-blue-deep hover:underline">
            {p.processCta}
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
