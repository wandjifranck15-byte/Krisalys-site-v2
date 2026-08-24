import type { Metadata } from "next";
import FaqPageContent from "@/components/pages/FaqPageContent";

// Page conservée en Server Component afin de garder des métadonnées SEO
// statiques par route (voir README > Internationalisation : les métadonnées
// ne sont pas encore traduites par langue, car cela nécessiterait une
// lecture serveur de la locale — non implémentée dans cette passe).
export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Toutes les réponses aux questions techniques, commerciales et après-vente sur les solutions d'écrans LED KRISALYS.",
};

export default function FAQPage() {
  return <FaqPageContent />;
}
