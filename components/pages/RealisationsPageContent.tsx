"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { getProjects, getExternalReferences } from "@/data/projects";
import { getDesignSteps } from "@/data/method-steps";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Phase 5 : page repositionnée autour de la distinction explicite
// simulation / concept / réalisation (voir dictionary.pages.realisations.
// distinctionNote), avec un vrai <h1> propre à cette page (SectionHeading
// rend systématiquement un <h2> — correction ciblée ici uniquement, pas
// de changement global du composant partagé).
// Phase 6 : la section "Notre capacité de conception" dérive désormais de
// la source de vérité unique du processus (data/method-steps.ts,
// getDesignSteps) — plus de liste dupliquée dans le dictionnaire.
export default function RealisationsPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const projects = getProjects(locale);
  const externalReferences = getExternalReferences(locale);
  const designSteps = getDesignSteps(locale);
  const p = dictionary.pages.realisations;

  return (
    <>
      <section className="bg-canvas py-20">
        <Container className="max-w-3xl">
          {p.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{p.eyebrow}</p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{p.title}</h1>
          <p className="mt-4 text-lg text-ink-muted">{p.description}</p>
          <p className="mt-4 text-sm text-ink-muted">{p.distinctionNote}</p>
        </Container>

        <Container className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-20">
        <Container>
          <SectionHeading eyebrow={p.designEyebrow} title={p.designTitle} description={p.designDescription} />
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {designSteps.map((step, i) => (
              <span key={step.step} className="flex items-center gap-2">
                <span className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm text-ink-muted">
                  {step.title}
                </span>
                {i < designSteps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/contact">{p.designCta}</ButtonLink>
            <Link href="/notre-methode" className="inline-flex items-center text-sm font-medium text-krisalys-blue-deep hover:underline">
              {dictionary.pilier.accompanimentCta}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.intlEyebrow} title={p.intlTitle} />
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-krisalys-blue-deep/30 bg-krisalys-blue-deep/10 p-4 text-sm text-krisalys-blue-deep">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>{p.intlDisclaimer}</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {externalReferences.map((ref) => (
              <div key={ref.title} className="rounded-2xl border border-subtle bg-surface p-6">
                <h3 className="text-base font-semibold text-ink">{ref.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{ref.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
                  {ref.sourceLabel}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
