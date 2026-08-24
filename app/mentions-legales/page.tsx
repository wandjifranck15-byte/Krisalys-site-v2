import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">Mentions légales</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-muted">
          <p><strong className="text-ink">Dénomination :</strong> {siteConfig.legalName}</p>
          <p><strong className="text-ink">Forme juridique :</strong> Société à responsabilité limitée unipersonnelle (SARL U)</p>
          <p><strong className="text-ink">Capital social :</strong> 3 000 000 FCFA</p>
          <p><strong className="text-ink">Siège social :</strong> {siteConfig.address.locality}, {siteConfig.address.country}</p>
          <p><strong className="text-ink">RCCM :</strong> CM-DLA-01-2026-B13-00515</p>
          <p><strong className="text-ink">NIU :</strong> M072618889671X</p>
          <p><strong className="text-ink">Gérant :</strong> Wandji Nkouamo Franck Hoffman</p>
          <p><strong className="text-ink">Contact :</strong> {siteConfig.email} — {siteConfig.phone}</p>
          <p><strong className="text-ink">Site :</strong> {siteConfig.url}</p>
        </div>
      </Container>
    </section>
  );
}
