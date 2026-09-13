"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// Error boundary de segment (voir doc Next.js App Router). Couvre les
// erreurs non interceptées sous app/layout.tsx (pages, ConfiguratorWizard,
// etc.) — pour les erreurs dans le layout racine lui-même (Navbar/Footer),
// voir app/global-error.tsx. N'affiche jamais de détail technique brut au
// client : l'erreur réelle part en console (voir useEffect ci-dessous),
// jamais masquée.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dictionary = useDictionary();
  const p = dictionary.pages.error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-canvas">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">{p.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">{p.title}</h1>
        <p className="mt-3 text-ink-muted">{p.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button type="button" onClick={() => reset()}>
            {p.retry}
          </Button>
          <ButtonLink href="/contact" variant="secondary">
            {p.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
