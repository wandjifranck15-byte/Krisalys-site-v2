import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function ConditionsPage() {
  return (
    <section className="bg-krisalys-black py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-white">Conditions d&apos;utilisation</h1>
        <div className="mt-6 space-y-4 text-sm text-krisalys-gray-light">
          <p>
            L&apos;utilisation de ce site implique l&apos;acceptation des présentes conditions.
            Les simulations et estimations fournies par le configurateur sont indicatives et ne
            constituent pas un engagement contractuel.
          </p>
          <p>
            Contenu à finaliser avec le conseil juridique de KRISALYS avant mise en production.
          </p>
        </div>
      </Container>
    </section>
  );
}
