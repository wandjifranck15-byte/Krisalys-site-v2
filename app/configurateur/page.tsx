import type { Metadata } from "next";
import ConfigurateurPageContent from "@/components/pages/ConfigurateurPageContent";

export const metadata: Metadata = {
  title: "Configurateur de projet",
  description:
    "Renseignez les caractéristiques de votre bâtiment et obtenez une première orientation sur la solution LED la plus adaptée à votre projet.",
};

export default function ConfigurateurPage() {
  return <ConfigurateurPageContent />;
}
