import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <section className="bg-krisalys-black py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-white">Mentions légales</h1>
        <div className="mt-6 space-y-4 text-sm text-krisalys-gray-light">
          <p><strong className="text-white">Dénomination :</strong> {siteConfig.legalName}</p>
          <p><strong className="text-white">Forme juridique :</strong> Société à responsabilité limitée unipersonnelle (SARL U)</p>
          <p><strong className="text-white">Capital social :</strong> 3 000 000 FCFA</p>
          <p><strong className="text-white">Siège social :</strong> {siteConfig.address.locality}, {siteConfig.address.country}</p>
          <p><strong className="text-white">RCCM :</strong> CM-DLA-01-2026-B13-00515</p>
          <p><strong className="text-white">NIU :</strong> M072618889671X</p>
          <p><strong className="text-white">Gérant :</strong> Wandji Nkouamo Franck Hoffman</p>
          <p><strong className="text-white">Contact :</strong> {siteConfig.email} — {siteConfig.phone}</p>
          <p><strong className="text-white">Site :</strong> {siteConfig.url}</p>
        </div>
      </Container>
    </section>
  );
}
