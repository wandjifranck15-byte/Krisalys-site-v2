"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import CTASection from "@/components/sections/CTASection";
import { getProjects, getExternalReferences } from "@/data/projects";
import { AlertCircle } from "lucide-react";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function RealisationsPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const projects = getProjects(locale);
  const externalReferences = getExternalReferences(locale);
  const p = dictionary.pages.realisations;

  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-20">
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
