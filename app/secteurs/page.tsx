import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import SectorCard from "@/components/sections/SectorCard";
import { sectors } from "@/data/sectors";
import { getSolutionBySlug } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions LED par secteur d'activité",
  description:
    "Hôtels, banques, centres commerciaux, pharmacies, cliniques... Découvrez les solutions d'affichage LED adaptées à votre secteur d'activité au Cameroun.",
};

export default function SecteursPage() {
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading
            eyebrow="Secteurs d'activité"
            title="Des solutions adaptées à votre métier"
            description="Chaque secteur a ses propres contraintes de visibilité et de communication. Voici comment KRISALYS y répond concrètement."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </Container>
      </section>

      {sectors.map((sector, i) => {
        const solution = getSolutionBySlug(sector.recommendedSolutionSlug);
        return (
          <section
            key={sector.slug}
            id={sector.slug}
            className={`scroll-mt-24 py-16 ${i % 2 === 0 ? "bg-surface-soft" : "bg-canvas"}`}
          >
            <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div>
                <DynamicIcon name={sector.icon} className="h-9 w-9 text-krisalys-blue" />
                <h2 className="mt-3 text-xl font-bold text-ink">{sector.name}</h2>
                {solution && (
                  <p className="mt-2 text-sm text-krisalys-blue-deep">
                    Solution recommandée : {solution.name}
                  </p>
                )}
                <ButtonLink href="/contact" size="md" className="mt-6">
                  {sector.ctaLabel}
                </ButtonLink>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                  Problématiques
                </h3>
                <ul className="mt-3 space-y-2">
                  {sector.problems.map((p) => (
                    <li key={p} className="text-sm text-ink-muted">• {p}</li>
                  ))}
                </ul>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                  Bénéfices
                </h3>
                <ul className="mt-3 space-y-2">
                  {sector.benefits.map((b) => (
                    <li key={b} className="text-sm text-ink-muted">• {b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                  Exemples d&apos;utilisation
                </h3>
                <ul className="mt-3 space-y-2">
                  {sector.useCases.map((u) => (
                    <li key={u} className="text-sm text-ink-muted">• {u}</li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
