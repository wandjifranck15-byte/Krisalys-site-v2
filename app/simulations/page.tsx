import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/sections/ProjectCard";
import Configurator from "@/components/sections/Configurator";
import CTASection from "@/components/sections/CTASection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Simulations de façades LED",
  description:
    "Découvrez des simulations de projets et estimez, grâce à notre configurateur, le type de solution LED adapté à votre bâtiment.",
};

export default function SimulationsPage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Simulations"
            title="Projetez-vous avant de décider"
            description="Chaque simulation ci-dessous est un rendu réalisé par KRISALYS à partir d'un bâtiment réel, clairement identifié comme une simulation."
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
            eyebrow="Configurateur"
            title="Obtenez une première orientation pour votre projet"
            description="Renseignez quelques informations sur votre bâtiment pour recevoir une estimation indicative du type de solution recommandé."
            light
          />
          <div className="mt-12">
            <Configurator />
          </div>
        </Container>
      </section>

      <CTASection ctaLabel="Envoyer une photo de mon bâtiment" />
    </>
  );
}
