"use client";

import Container from "@/components/ui/Container";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ConditionsPageContent() {
  const dictionary = useDictionary();
  const l = dictionary.pages.legal;
  const t = l.terms;

  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{t.title}</h1>
        <p className="mt-2 text-xs text-ink-muted">{l.lastUpdated}</p>
        <p className="mt-6 text-sm text-ink-muted">{t.intro}</p>

        {t.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="mt-10 text-lg font-semibold text-ink">{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-3 text-sm text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </Container>
    </section>
  );
}
