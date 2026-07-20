import { NavItem } from "@/types";

// Navigation principale — architecture en méga-menu, évolutive.
// Ajouter une future division du groupe (voir data/divisions.ts) n'impose
// aucune modification de ce fichier : le méga-menu "Groupe" se construit
// automatiquement à partir de data/divisions.ts.
export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Nos solutions",
    href: "/nos-solutions",
    children: [
      { label: "Écrans LED transparents", href: "/nos-solutions#transparent" },
      { label: "Écrans LED extérieurs", href: "/nos-solutions#exterieur" },
      { label: "Écrans LED intérieurs", href: "/nos-solutions#interieur" },
      { label: "Façades numériques", href: "/nos-solutions#facades" },
      { label: "Affichage dynamique", href: "/nos-solutions#dynamique" },
    ],
  },
  { label: "Secteurs d'activité", href: "/secteurs" },
  { label: "Simulations", href: "/simulations" },
  { label: "Configurateur", href: "/configurateur" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Notre méthode", href: "/notre-methode" },
  { label: "Maintenance & Support", href: "/maintenance" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: NavItem[] = [
  { label: "Nos solutions", href: "/nos-solutions" },
  { label: "Secteurs d'activité", href: "/secteurs" },
  { label: "Simulations", href: "/simulations" },
  { label: "Configurateur", href: "/configurateur" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Notre méthode", href: "/notre-methode" },
  { label: "Maintenance & Support", href: "/maintenance" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions" },
];
