"use client";

import { UserRound } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// "Franck Wandji" est un nom propre, volontairement identique en FR/EN.
const FOUNDER_NAME = "Franck Wandji";

export default function FounderSection() {
  const dictionary = useDictionary();
  const f = dictionary.founder;
  const [before, after] = f.paragraph4.split("{name}");

  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-5xl">
        <FadeIn>
          <SectionHeading eyebrow={f.eyebrow} title={f.title} />
          <p className="mt-6 max-w-3xl text-ink-muted">{f.paragraph1}</p>
          <p className="mt-4 max-w-3xl text-ink-muted">{f.paragraph2}</p>
        </FadeIn>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
          <FadeIn delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] rounded-2xl border border-krisalys-blue-deep/20 bg-krisalys-gray-light">
              <div className="absolute inset-0 flex items-center justify-center">
                <UserRound className="h-16 w-16 text-ink-muted" strokeWidth={1} />
              </div>
              <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-krisalys-blue-deep/30" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-krisalys-blue-deep/30" />
            </div>
            <p className="mx-auto mt-3 max-w-[280px] text-center text-xs text-ink-muted">{f.photoComingSoon}</p>
            <p className="mx-auto mt-1 max-w-[280px] text-center text-xs tracking-widest text-ink-muted">
              {f.roleLabel}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-ink-muted">{f.paragraph3}</p>
            <p className="mt-4 text-ink-muted">
              {before}<strong className="text-ink">{FOUNDER_NAME}</strong>{after}
            </p>

            <blockquote className="mt-8 border-l-2 border-krisalys-gold/50 pl-5 text-lg italic text-ink">
              {f.quote}
            </blockquote>

            <div className="mt-6 border-t border-subtle pt-4">
              <p className="font-semibold text-ink">{FOUNDER_NAME}</p>
              <p className="text-sm text-ink-muted">{f.founderRole}</p>
              <p className="text-sm text-ink-muted">{siteConfig.legalName}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-16">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {f.methodStatusTitle}
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-4">
            {f.steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={
                    i === f.steps.length - 1
                      ? "h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-krisalys-blue-deep"
                      : "h-2.5 w-2.5 shrink-0 rounded-full bg-krisalys-blue"
                  }
                />
                <span className="text-sm text-ink-muted">{label}</span>
                {i < f.steps.length - 1 && (
                  <span className="hidden text-ink-muted md:mx-2 md:inline">—</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

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
