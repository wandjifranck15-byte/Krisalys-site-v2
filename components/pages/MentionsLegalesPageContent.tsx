"use client";

import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function MentionsLegalesPageContent() {
  const dictionary = useDictionary();
  const l = dictionary.pages.legal;

  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{l.mentionsTitle}</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-muted">
          <p><strong className="text-ink">{l.denomination} :</strong> {siteConfig.legalName}</p>
          <p><strong className="text-ink">{l.formeJuridique} :</strong> {l.formeJuridiqueValue}</p>
          <p><strong className="text-ink">{l.capitalSocial} :</strong> 3 000 000 FCFA</p>
          <p><strong className="text-ink">{l.siegeSocial} :</strong> {siteConfig.address.locality}, {siteConfig.address.country}</p>
          <p><strong className="text-ink">{l.rccm} :</strong> CM-DLA-01-2026-B13-00515</p>
          <p><strong className="text-ink">{l.niu} :</strong> M072618889671X</p>
          <p><strong className="text-ink">{l.gerant} :</strong> Wandji Nkouamo Franck Hoffman</p>
          <p><strong className="text-ink">{l.contact} :</strong> {siteConfig.email} — {siteConfig.phone}</p>
          <p><strong className="text-ink">{l.site} :</strong> {siteConfig.url}</p>
        </div>
      </Container>
    </section>
  );
}
