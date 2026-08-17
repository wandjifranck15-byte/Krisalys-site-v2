import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/utils";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Bonjour KRISALYS, je souhaite obtenir une simulation de mon bâtiment."
  );
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter KRISALYS sur WhatsApp"
      // Couleur #25D366 = vert officiel de la marque WhatsApp (exception volontaire à la règle
      // "aucune couleur codée en dur" : ce n'est pas une couleur KRISALYS, donc elle ne doit pas
      // devenir un token de la palette de marque — voir Standards/Code-Style.md).
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-7 w-7 text-white" />
      <span className="absolute right-16 hidden whitespace-nowrap rounded-lg bg-krisalys-black px-3 py-1.5 text-xs text-white group-hover:block">
        Discuter sur WhatsApp
      </span>
    </a>
  );
}
