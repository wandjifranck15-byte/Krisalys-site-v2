"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import TechnologyMethodSummary from "@/components/pages/TechnologyMethodSummary";
import FadeIn from "@/components/animations/FadeIn";
import { getTechnologyBySlug } from "@/data/technologies";
import { getSectorBySlug } from "@/data/sectors";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Structure A→I validée (Phase 4) :
// A Hero (2 CTA) · B Principe · C Pourquoi · D Comment KRISALYS étudie le
// projet · E Applications · F Configuration (variantes, jamais un
// catalogue de pitches) · G Points à valider · H Accompagnement KRISALYS ·
// bloc configurateur (Phase 2, repositionné juste avant) · I CTA final.
export default function TechnologyPageContent({ slug }: { slug: string }) {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const tech = getTechnologyBySlug(slug, locale);
  const p = dictionary.pilier;

  if (!tech) return null;

  const heroSubtitle = slug === "film-led-transparent" ? p.filmHeroSubtitle : p.ecranHeroSubtitle;

  return (
    <>
      {/* A — Hero, texte + visuel réel, deux CTA */}
      <section className="overflow-hidden bg-canvas py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <DynamicIcon name={tech.icon} className="h-10 w-10 text-krisalys-blue-deep" />
            <SectionHeading eyebrow={tech.eyebrow} title={tech.name} description={heroSubtitle} as="h1" />
            <div className="mt-6 flex flex-wrap gap-4">
              <ButtonLink href="/contact">{tech.ctaLabel}</ButtonLink>
              <ButtonLink href="/configurateur" variant="secondary">{p.ctaConfigure}</ButtonLink>
            </div>
          </div>
          <FadeIn delay={0.1} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-subtle shadow-glow">
              <Image
                src={tech.heroImage.src}
                width={tech.heroImage.width}
                height={tech.heroImage.height}
                alt={tech.heroImage.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-krisalys-black/30 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* B — Le principe + Comment ça fonctionne (étapes réelles de
          data/technologies.ts, déjà validées mais jamais affichées jusqu'ici)
          + visuels réels, dans la même bande pour ne pas casser l'alternance
          de fond des sections suivantes. Jamais de valeur chiffrée affirmée
          sur les images — un schéma de principe reste explicitement légendé
          comme tel (voir schemaImage). */}
      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.sectionPrinciple}
          </h2>
          <p className="mt-4 text-ink-muted">{tech.description}</p>
        </Container>
        <Container className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.sectionHowItWorks}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <ol className="space-y-6">
              {tech.howItWorks.map((step: string, i: number) => (
                <FadeIn key={step} delay={i * 0.08}>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink-muted">{step}</p>
                  </li>
                </FadeIn>
              ))}
            </ol>
            <div className="grid grid-cols-2 gap-4">
              {tech.schemaImage && (
                <FadeIn className="col-span-2">
                  <figure className="overflow-hidden rounded-2xl border border-subtle bg-surface">
                    <Image
                      src={tech.schemaImage.src}
                      width={tech.schemaImage.width}
                      height={tech.schemaImage.height}
                      alt={tech.schemaImage.alt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full"
                    />
                    <figcaption className="border-t border-subtle px-4 py-3 text-xs text-ink-muted">
                      {tech.schemaImage.caption}
                    </figcaption>
                  </figure>
                </FadeIn>
              )}
              {tech.galleryImages?.map((img, i) => (
                <FadeIn key={img.src} delay={0.1 + i * 0.08} className={tech.schemaImage ? undefined : "col-span-2 sm:col-span-1"}>
                  <div className="overflow-hidden rounded-2xl border border-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <Image
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      alt={img.alt}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* C — Pourquoi cette solution / D — Comment KRISALYS étudie le projet */}
      <section className="bg-canvas py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
              {p.sectionWhyUseIt}
            </h2>
            <ul className="mt-4 space-y-2">
              {tech.whyUseIt.map((item: string) => (
                <li key={item} className="text-sm text-ink-muted">• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
              {p.sectionCriteria}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{p.criteriaIntro}</p>
            <ul className="mt-4 space-y-2">
              {tech.criteria.map((item: string) => (
                <li key={item} className="text-sm text-ink-muted">• {item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* E — Applications */}
      <section className="bg-surface-soft py-16">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.sectionApplications}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{p.applicationsNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {tech.recommendedFor.map((sectorSlug: string) => {
              const sector = getSectorBySlug(sectorSlug, locale);
              if (!sector) return null;
              return (
                <Link
                  key={sectorSlug}
                  href={`/secteurs#${sectorSlug}`}
                  className="rounded-full border border-subtle bg-surface px-4 py-2 text-sm text-ink-muted transition-colors hover:border-krisalys-blue-deep/40 hover:text-krisalys-blue-deep"
                >
                  {sector.name}
                </Link>
              );
            })}
          </div>
          <ButtonLink href="/secteurs" variant="secondary" className="mt-6">
            {p.applicationsCta}
          </ButtonLink>
        </Container>
      </section>

      {/* F — Configuration (variantes, jamais un catalogue de pitches) */}
      <section className="bg-canvas py-16">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.sectionVariants}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{p.configurationNote}</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tech.variants.map((variant:{ title: string; description: string}, i: number) => (
              <FadeIn key={variant.title} delay={Math.min(i, 5) * 0.08}>
                <div className="rounded-2xl border border-subtle bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-krisalys-blue-deep/40 hover:shadow-glow">
                  <h3 className="text-base font-semibold text-ink">{variant.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{variant.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* G — Points à valider */}
      <section className="bg-surface-soft py-16">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {p.sectionConstraints}
          </h2>
          <ul className="mt-4 space-y-2">
            {tech.constraints.map((item: string) => (
              <li key={item} className="text-sm text-ink-muted">• {item}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* H — Accompagnement KRISALYS (maillage vers /notre-methode, /maintenance) */}
      <section className="bg-canvas py-16">
        <Container>
          <TechnologyMethodSummary />
        </Container>
      </section>

      {/* Bloc configurateur (Phase 2), repositionné juste avant le CTA final */}
      <CTASection title={p.hesitationTitle} ctaLabel={p.hesitationCta} ctaHref="/configurateur" />

      {/* I — CTA final (maillage vers /realisations) */}
      <section className="bg-surface-soft py-16">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-ink">{p.finalCtaTitle}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact">{p.finalCtaStudy}</ButtonLink>
            <ButtonLink href="/realisations" variant="secondary">{p.finalCtaRealisations}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
