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
          <p><strong className="text-white">Raison sociale :</strong> {siteConfig.legalName}</p>
          <p><strong className="text-white">Siège :</strong> {siteConfig.address.locality}, {siteConfig.address.country}</p>
          <p><strong className="text-white">Contact :</strong> {siteConfig.email} — {siteConfig.phone}</p>
          <p>
            Contenu à finaliser avec les informations d&apos;immatriculation officielles (RCCM, numéro
            contribuable) une fois la formalisation juridique de KRISALYS SARL U achevée.
          </p>
        </div>
      </Container>
    </section>
  );
}
