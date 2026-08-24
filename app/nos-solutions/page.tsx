import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Nos solutions d'écrans LED et façades numériques",
  description:
    "Découvrez les solutions KRISALYS : écrans LED transparents, extérieurs, intérieurs, façades numériques et affichage dynamique pour votre entreprise au Cameroun.",
};

export default function NosSolutionsPage() {
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading
            eyebrow="Nos solutions"
            title="Une gamme pensée pour chaque type de bâtiment"
            description="Chaque solution est présentée avec ses usages concrets et ses limites techniques réelles, sans promesse excessive."
          />
        </Container>
      </section>

      {solutions.map((solution, i) => (
        <section
          key={solution.slug}
          id={solution.slug}
          className={`scroll-mt-24 py-20 ${i % 2 === 0 ? "bg-surface-soft" : "bg-canvas"}`}
        >
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <DynamicIcon name={solution.icon} className="h-10 w-10 text-krisalys-blue-deep" />
              <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{solution.name}</h2>
              <p className="mt-4 text-ink-muted">{solution.description}</p>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                Avantages
              </h3>
              <ul className="mt-3 space-y-2">
                {solution.benefits.map((b) => (
                  <li key={b} className="text-sm text-ink-muted">• {b}</li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
                Cas d&apos;usage
              </h3>
              <ul className="mt-3 space-y-2">
                {solution.useCases.map((u) => (
                  <li key={u} className="text-sm text-ink-muted">• {u}</li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-ink-muted">
                {solution.technicalNotes.join(" ")}
              </p>

              <ButtonLink href="/contact" className="mt-8">
                Parlons de votre projet
              </ButtonLink>
            </div>

            <div className={`flex aspect-video items-center justify-center rounded-2xl border border-subtle bg-gradient-to-br from-krisalys-blue/15 to-krisalys-blue-deep/10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
                Visuel à intégrer — {solution.name}
              </span>
            </div>
          </Container>
        </section>
      ))}

      <CTASection ctaLabel="Découvrir les solutions adaptées à mon secteur" ctaHref="/secteurs" />
    </>
  );
}
