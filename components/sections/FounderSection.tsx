import { UserRound } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/utils";

const steps: { label: string; active?: boolean }[] = [
  { label: "Création de KRISALYS" },
  { label: "Développement de la méthode" },
  { label: "Premières simulations photoréalistes" },
  { label: "Déploiement des projets", active: true },
];

export default function FounderSection() {
  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-5xl">
        {/* Pourquoi KRISALYS existe */}
        <FadeIn>
          <SectionHeading eyebrow="À propos" title="Pourquoi KRISALYS existe" />
          <p className="mt-6 max-w-3xl text-ink-muted">
            À Douala comme ailleurs, un bâtiment qui ne communique rien perd, jour après jour, une
            bataille silencieuse : celle de l&apos;attention. Beaucoup d&apos;entreprises investissent
            dans leurs produits, leurs équipes, leur qualité de service — et laissent leur façade
            parler pour rien.
          </p>
          <p className="mt-4 max-w-3xl text-ink-muted">
            KRISALYS est né de ce constat : une technologie d&apos;affichage n&apos;a de valeur que si
            elle sert un objectif précis de communication et de performance commerciale. C&apos;est
            cette conviction, et non l&apos;inverse, qui a structuré la création de l&apos;entreprise.
          </p>
        </FadeIn>

        {/* Transition + photo + citation */}
        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
          <FadeIn delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] rounded-2xl border border-krisalys-blue-deep/20 bg-krisalys-gray-light">
              <div className="absolute inset-0 flex items-center justify-center">
                <UserRound className="h-16 w-16 text-ink-muted" strokeWidth={1} />
              </div>
              {/* Repères d'angle premium */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-krisalys-blue-deep/30" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-krisalys-blue-deep/30" />
            </div>
            <p className="mx-auto mt-3 max-w-[280px] text-center text-xs text-ink-muted">Photo à venir</p>
            <p className="mx-auto mt-1 max-w-[280px] text-center text-xs tracking-widest text-ink-muted">
              FONDATEUR — DIRECTION GÉNÉRALE
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-ink-muted">
              Cette exigence structure aujourd&apos;hui la méthode de travail de KRISALYS : aucune
              installation ne commence par un produit. Elle commence par une question — que doit dire
              votre bâtiment, et à qui ?
            </p>
            <p className="mt-4 text-ink-muted">
              Cette approche est portée par <strong className="text-ink">Franck Wandji</strong>,
              fondateur et directeur général de KRISALYS, qui a construit l&apos;entreprise autour
              d&apos;un principe simple : proposer des solutions adaptées à chaque bâtiment, plutôt que
              vendre des produits standardisés.
            </p>

            <blockquote className="mt-8 border-l-2 border-krisalys-gold/50 pl-5 text-lg italic text-ink">
              « La technologie attire le regard. La communication crée la valeur. »
            </blockquote>

            <div className="mt-6 border-t border-subtle pt-4">
              <p className="font-semibold text-ink">Franck Wandji</p>
              <p className="text-sm text-ink-muted">Fondateur &amp; Directeur Général</p>
              <p className="text-sm text-ink-muted">{siteConfig.legalName}</p>
            </div>
          </FadeIn>
        </div>

        {/* Où en est notre méthode — stepper sans dates */}
        <FadeIn delay={0.1} className="mt-16">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            Où en est notre méthode
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-4">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <span
                  className={
                    step.active
                      ? "h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-krisalys-blue-deep"
                      : "h-2.5 w-2.5 shrink-0 rounded-full bg-krisalys-blue"
                  }
                />
                <span className="text-sm text-ink-muted">{step.label}</span>
                {i < steps.length - 1 && (
                  <span className="hidden text-ink-muted md:mx-2 md:inline">—</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Encadré entreprise */}
        <FadeIn delay={0.15} className="mt-16">
          <div className="rounded-2xl border border-subtle bg-surface shadow-sm p-6 sm:max-w-sm">
            <p className="font-semibold text-ink">{siteConfig.legalName}</p>
            <p className="text-sm text-ink-muted">
              {siteConfig.address.locality}, {siteConfig.address.country}
            </p>
            <div className="mt-3 space-y-1 text-sm text-ink-muted">
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
              <p>krisalysglobal.com</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
