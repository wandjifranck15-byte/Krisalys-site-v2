import type { Metadata } from "next";
import MethodePageContent from "@/components/pages/MethodePageContent";

export const metadata: Metadata = {
  title: "Notre méthode",
  description:
    "Découvrez les 8 étapes de la méthode KRISALYS, de la découverte de votre projet à la maintenance après installation.",
};

export default function NotreMethodePage() {
  return <MethodePageContent />;
}
