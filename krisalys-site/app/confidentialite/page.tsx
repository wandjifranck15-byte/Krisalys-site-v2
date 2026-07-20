import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <section className="bg-krisalys-black py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-white">Politique de confidentialité</h1>
        <div className="mt-6 space-y-4 text-sm text-krisalys-gray-light">
          <p>
            Les informations transmises via le formulaire de contact (nom, entreprise, téléphone,
            email, ville, type de bâtiment, message) sont utilisées uniquement pour traiter votre
            demande de simulation et vous recontacter.
          </p>
          <p>
            Ces informations ne sont ni vendues ni transmises à des tiers à des fins commerciales.
          </p>
          <p>
            Contenu à compléter avec la politique définitive de gestion des données personnelles
            avant mise en production.
          </p>
        </div>
      </Container>
    </section>
  );
}
