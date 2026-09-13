"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import FadeIn from "@/components/animations/FadeIn";
import ConfiguratorWizard from "@/components/configurator/ConfiguratorWizard";
import CTASection from "@/components/sections/CTASection";
import { getProjects } from "@/data/projects";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function SimulationsPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const projects = getProjects(locale);
  const p = dictionary.pages.simulations;
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} as="h1" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <FadeIn key={project.slug} delay={Math.min(i, 5) * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
          {/* Phase 11 : maillage léger vers les deux pages piliers — permet
              au visiteur qui explore une simulation de comprendre les
              technologies disponibles, sans transformer la page en catalogue. */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/film-led-transparent" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
              {dictionary.nav.labels["/film-led-transparent"]}
            </Link>
            <Link href="/ecrans-led-transparents" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
              {dictionary.nav.labels["/ecrans-led-transparents"]}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-20">
        <Container>
          <SectionHeading
            eyebrow={p.configuratorEyebrow}
            title={p.configuratorTitle}
            description={p.configuratorDescription}
          />
          <div className="mt-12">
            <ConfiguratorWizard />
          </div>
        </Container>
      </section>

      <CTASection ctaLabel={p.ctaLabel} />
    </>
  );
}
