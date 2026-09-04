import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const siteConfig = {
  name: "KRISALYS",
  legalName: "KRISALYS SARL U",
  tagline: "Nous transformons les façades en supports de communication.",
  description:
    "KRISALYS conçoit, fournit et installe des solutions de film LED transparent et d'écrans LED pour vitrines et façades vitrées au Cameroun : hôtels, banques, centres commerciaux, concessionnaires automobiles et bien d'autres secteurs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.krisalysglobal.com",
  email: "contact@krisalysglobal.com",
  phone: "+237 682 90 91 62",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237682909162",
  address: {
    locality: "Nyalla Pariso, Douala",
    country: "Cameroun",
  },
};
