"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import Configurator from "@/components/sections/Configurator";
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
          <SectionHeading
            eyebrow={p.configuratorEyebrow}
            title={p.configuratorTitle}
            description={p.configuratorDescription}
          />
          <div className="mt-12">
            <Configurator />
          </div>
        </Container>
      </section>

      <CTASection ctaLabel={p.ctaLabel} />
    </>
  );
}
