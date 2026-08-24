import type { Metadata } from "next";
import SimulationsPageContent from "@/components/pages/SimulationsPageContent";

export const metadata: Metadata = {
  title: "Simulations de façades LED",
  description:
    "Découvrez des simulations de projets et estimez, grâce à notre configurateur, le type de solution LED adapté à votre bâtiment.",
};

export default function SimulationsPage() {
  return <SimulationsPageContent />;
}
