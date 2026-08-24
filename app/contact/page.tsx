import type { Metadata } from "next";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez KRISALYS à Douala pour demander une simulation gratuite de votre façade ou obtenir des informations sur nos solutions LED.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
