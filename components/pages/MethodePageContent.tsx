"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HowItWorks from "@/components/sections/HowItWorks";
import { ButtonLink } from "@/components/ui/Button";
import { getMethodSteps } from "@/data/method-steps";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Phase 6 : page de référence pour le processus KRISALYS. Consomme la
// source de vérité unique (data/method-steps.ts) — plus de liste dupliquée.
// Vrai <h1> propre à cette page (même correction que /realisations,
// Phase 5 : SectionHeading rend systématiquement un <h2>).
export default function MethodePageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const m = dictionary.pages.methode;

  return (
    <>
      <section className="bg-canvas py-20">
        <Container className="max-w-3xl">
          {m.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{m.eyebrow}</p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{m.title}</h1>
          <p className="mt-4 text-lg text-ink-muted">{m.description}</p>
        </Container>
      </section>

      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {m.whySectionTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{m.whySectionBody}</p>
        </Container>
      </section>

      <HowItWorks steps={getMethodSteps(locale)} eyebrow={m.stepsEyebrow} title={m.stepsTitle} />

      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {m.analysisToSolutionTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{m.analysisToSolutionBody}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/film-led-transparent" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
              {dictionary.nav.labels["/film-led-transparent"]}
            </Link>
            <Link href="/ecrans-led-transparents" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
              {dictionary.nav.labels["/ecrans-led-transparents"]}
            </Link>
            <Link href="/configurateur" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
              {m.ctaConfigureLabel}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {m.afterInstallTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{m.afterInstallBody}</p>
          <Link href="/maintenance" className="mt-4 inline-block text-sm font-medium text-krisalys-blue-deep hover:underline">
            {m.afterInstallCta}
          </Link>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-krisalys-black py-24">
        <div className="absolute inset-0 bg-gradient-brand-radial" />
        <Container className="relative flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">{m.ctaTitle}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonLink href="/configurateur" size="lg">{m.ctaConfigureLabel}</ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">{m.ctaStudyLabel}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
