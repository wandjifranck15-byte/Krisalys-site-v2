"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getProjects } from "@/data/projects";
import { Sparkles } from "lucide-react";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Aucun faux témoignage n'est affiché. En attendant de vrais avis
// clients, cette section met en avant des études de cas et simulations,
// explicitement présentées comme telles.
export default function TestimonialsPlaceholder() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const projects = getProjects(locale);

  return (
    <section className="bg-canvas py-24">
      <Container>
        <SectionHeading
          eyebrow={dictionary.pages.home.proofsEyebrow}
          title={dictionary.pages.home.proofsTitle}
          description={dictionary.pages.home.proofsDescription}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.slug}>
              <Sparkles className="h-6 w-6 text-krisalys-blue-deep" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-krisalys-orange-dark">
                {dictionary.common.simulationLabel}
              </p>
              <h3 className="mt-2 text-base font-semibold text-ink">{project.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{project.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
