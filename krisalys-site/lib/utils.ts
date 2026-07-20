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
    "KRISALYS conçoit des solutions d'écrans LED et de façades numériques pour les entreprises au Cameroun : hôtels, banques, centres commerciaux, concessionnaires et bien d'autres secteurs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.krisalysglobal.com",
  email: "contact@krisalysglobal.com",
  phone: "+237 659 115 853",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237659115853",
  address: {
    locality: "Nyalla Pariso, Douala",
    country: "Cameroun",
  },
};
