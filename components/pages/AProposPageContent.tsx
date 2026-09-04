"use client";

import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import FounderSection from "@/components/sections/FounderSection";
import { getDivisions } from "@/data/divisions";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function AProposPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const divisions = getDivisions(locale);
  const p = dictionary.pages.aPropos;

  return (
    <>
      <FounderSection />

      <section className="bg-canvas pb-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl font-semibold text-ink">{p.valuesTitle}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {p.values.map((value) => (
              <li key={value.name} className="rounded-lg border border-subtle px-4 py-3">
                <p className="font-medium text-ink">{value.name}</p>
                <p className="mt-1 text-ink-muted">{value.description}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xl font-semibold text-ink">{p.commitmentsTitle}</h2>
          <ol className="mt-4 space-y-3">
            {p.commitments.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm text-ink-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-krisalys-blue-deep/20 text-xs font-semibold text-krisalys-blue">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-xl font-semibold text-ink">{p.groupTitle}</h2>
          <p className="mt-4 text-ink-muted">{p.groupIntro}</p>
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
                  {division.status === "active" ? dictionary.common.statusActive : dictionary.common.statusUpcoming}
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
