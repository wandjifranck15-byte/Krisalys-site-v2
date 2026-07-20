import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import CTASection from "@/components/sections/CTASection";
import { projects, externalReferences } from "@/data/projects";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Réalisations & démonstrations",
  description:
    "Découvrez les démonstrations et simulations réalisées par KRISALYS, ainsi que des exemples internationaux de technologies d'affichage LED.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Démonstrations et simulations KRISALYS"
            description="KRISALYS étant en phase de lancement commercial, cette section présente pour l'instant des simulations réalisées à partir de bâtiments réels."
            light
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-krisalys-charcoal py-20">
        <Container>
          <SectionHeading
            eyebrow="Références internationales"
            title="Exemples de technologies existantes"
            light
          />
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-krisalys-orange/30 bg-krisalys-orange/10 p-4 text-sm text-krisalys-orange">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Les exemples ci-dessous illustrent des technologies existantes dans le monde. Ils ne
              sont pas des réalisations de KRISALYS.
            </span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {externalReferences.map((ref) => (
              <div key={ref.title} className="rounded-2xl border border-white/10 bg-krisalys-anthracite p-6">
                <h3 className="text-base font-semibold text-white">{ref.title}</h3>
                <p className="mt-2 text-sm text-krisalys-gray-light">{ref.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-krisalys-orange">
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
