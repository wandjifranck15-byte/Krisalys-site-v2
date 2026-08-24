import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import FounderSection from "@/components/sections/FounderSection";
import { divisions } from "@/data/divisions";

export const metadata: Metadata = {
  title: "À propos de KRISALYS",
  description:
    "KRISALYS est une entreprise technologique camerounaise dont la mission est de transformer les bâtiments africains grâce aux technologies visuelles modernes.",
};

const values = [
  { name: "Transparence", description: "Nous disposons ce que la technologie peut faire — et ce qu'elle ne peut pas encore faire." },
  { name: "Conseil avant vente", description: "Chaque recommandation part d'une étude réelle de votre bâtiment, jamais d'un catalogue." },
  { name: "Fiabilité", description: "Un projet est planifié, suivi, et maintenu — pas seulement installé." },
  { name: "Exigence technique", description: "Chaque simulation respecte l'architecture réelle de votre bâtiment, sans effet trompeur." },
  { name: "Vision long terme", description: "Nous construisons des relations qui durent au-delà de l'installation." },
  { name: "Impact mesurable", description: "La technologie n'a de sens que si elle sert un objectif commercial concret." },
];

const commitments = [
  "Étude personnalisée de votre bâtiment, de son exposition et de vos objectifs de communication",
  "Simulation photoréaliste avant toute décision d'investissement",
  "Conseil objectif, basé sur votre cas réel — jamais sur le produit le plus cher",
  "Devis clair, sans coût caché ni ligne ambiguë",
  "Installation planifiée, avec un calendrier communiqué avant le début des travaux",
  "Accompagnement à la mise en service et formation de vos équipes",
  "Maintenance et suivi technique après installation",
];

export default function AProposPage() {
  return (
    <>
      <FounderSection />

      <section className="bg-canvas pb-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl font-semibold text-ink">Ce qui guide chaque projet</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {values.map((value) => (
              <li key={value.name} className="rounded-lg border border-subtle px-4 py-3">
                <p className="font-medium text-ink">{value.name}</p>
                <p className="mt-1 text-ink-muted">{value.description}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xl font-semibold text-ink">Nos engagements</h2>
          <ol className="mt-4 space-y-3">
            {commitments.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm text-ink-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-krisalys-blue-deep/20 text-xs font-semibold text-krisalys-blue">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-xl font-semibold text-ink">Le groupe KRISALYS, une ambition progressive</h2>
          <p className="mt-4 text-ink-muted">
            KRISALYS LED constitue aujourd&apos;hui l&apos;activité active du groupe. D&apos;autres
            divisions sont envisagées à mesure que les conditions le permettront, sans précipitation :
          </p>
          <ul className="mt-4 space-y-2">
            {divisions.map((division) => (
              <li key={division.slug} className="flex items-center justify-between rounded-lg border border-subtle px-4 py-3">
                <div>
                  <p className="font-medium text-ink">{division.name}</p>
                  <p className="text-xs text-ink-muted">{division.tagline}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    division.status === "active" ? "bg-krisalys-blue/20 text-krisalys-blue" : "bg-surface/10 text-ink-muted"
                  }`}
                >
                  {division.status === "active" ? "Actif" : "À venir"}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
