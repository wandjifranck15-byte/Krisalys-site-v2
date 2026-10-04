"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ButtonLink } from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { getMaintenanceOfferingsByGroup } from "@/data/maintenance";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Phase 7 : les 6 prestations existantes (data/maintenance.ts) sont
// regroupées en 3 blocs (Maintenance / Support & assistance /
// Accompagnement de la solution) au lieu d'une grille plate — aucune
// prestation ajoutée ou supprimée. Vrai <h1> propre à cette page (même
// correction ciblée que /realisations et /notre-methode).
export default function MaintenancePageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const groups = getMaintenanceOfferingsByGroup(locale);
  const m = dictionary.pages.maintenance;

  const groupList = [
    { title: m.groupMaintenanceTitle, offerings: groups.maintenance },
    { title: m.groupSupportTitle, offerings: groups.support },
    { title: m.groupAccompanimentTitle, offerings: groups.accompaniment },
  ];

  return (
    <>
      <section className="bg-canvas py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            {m.eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{m.eyebrow}</p>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{m.title}</h1>
            <p className="mt-4 text-lg text-ink-muted">{m.description}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle shadow-glow">
              <Image
                src="/images/visuals/film-led-technicien-application.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {m.whySectionTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{m.whySectionBody}</p>
        </Container>
      </section>

      <section className="bg-canvas py-16">
        <Container>
          {groupList.map((group) => (
            <div key={group.title} className="mb-12 last:mb-0">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
                {group.title}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.offerings.map((offering, i) => (
                  <FadeIn key={offering.title} delay={i * 0.08}>
                    <Card className="h-full">
                      <DynamicIcon name={offering.icon} className="h-8 w-8 text-krisalys-blue-deep" />
                      <h3 className="mt-4 text-lg font-semibold text-ink">{offering.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted">{offering.description}</p>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">{m.projectNote}</p>
          <p className="mt-3 max-w-2xl text-xs text-ink-muted">{m.warrantyNote}</p>
        </Container>
      </section>

      <section className="bg-surface-soft py-16">
        <Container className="max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {m.afterInstallTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{m.afterInstallBody}</p>
          <Link href="/notre-methode" className="mt-4 inline-block text-sm font-medium text-krisalys-blue-deep hover:underline">
            {m.afterInstallCta}
          </Link>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-krisalys-black py-24">
        <div className="absolute inset-0 bg-gradient-brand-radial" />
        <Container className="relative flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">{m.ctaTitle}</h2>
          <ButtonLink href="/contact" size="lg">{m.ctaLabel}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
