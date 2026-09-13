"use client";

import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function MentionsLegalesPageContent() {
  const dictionary = useDictionary();
  const l = dictionary.pages.legal;
  const m = l.mentions;

  const identity: [string, string][] = [
    [m.denomination, siteConfig.legalName],
    [m.formeJuridique, m.formeJuridiqueValue],
    [m.capitalSocial, "3 000 000 FCFA"],
    [m.siegeSocial, `${siteConfig.address.locality}, ${siteConfig.address.country}`],
    [m.rccm, "CM-DLA-01-2026-B13-00515"],
    [m.niu, "M072618889671X"],
    [m.gerant, "Wandji Nkouamo Franck Hoffman"],
    [m.activite, m.activiteValue],
    [m.contact, `${siteConfig.email} — ${siteConfig.phone}`],
    [m.site, siteConfig.url],
  ];

  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{m.title}</h1>
        <p className="mt-2 text-xs text-ink-muted">{l.lastUpdated}</p>

        <h2 className="mt-8 text-lg font-semibold text-ink">{m.editorHeading}</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {identity.map(([label, value]) => (
            <div key={label} className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="font-medium text-ink sm:w-48 sm:flex-shrink-0">{label} :</dt>
              <dd className="text-ink-muted">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 text-lg font-semibold text-ink">{m.hostingHeading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{m.hostingBody}</p>

        <h2 className="mt-10 text-lg font-semibold text-ink">{m.ipHeading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{m.ipBody}</p>

        <h2 className="mt-10 text-lg font-semibold text-ink">{m.liabilityHeading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{m.liabilityBody}</p>

        <h2 className="mt-10 text-lg font-semibold text-ink">{m.lawHeading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{m.lawBody}</p>

        <h2 className="mt-10 text-lg font-semibold text-ink">{m.contactHeading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{m.contactBody}</p>
      </Container>
    </section>
  );
}
