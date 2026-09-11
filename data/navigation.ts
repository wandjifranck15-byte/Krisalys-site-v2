import { NavItem } from "@/types";

// Navigation principale — architecture en méga-menu, organisée autour du
// parcours commercial (Solutions → Applications → Votre projet →
// Ressources → Entreprise), et non plus autour d'un catalogue de familles
// d'écrans. Les catégories "Solutions", "Applications", "Votre projet" et
// "Ressources" n'ont pas de page propre : leur libellé vient de
// dictionary.nav.categoryLabels (voir types/index.ts), pas de nav.labels.
export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Solutions",
    href: "/nos-solutions",
    categoryId: "solutions",
    hasOwnPage: true,
    children: [
      { label: "Nos solutions", href: "/nos-solutions" },
      { label: "Film LED transparent", href: "/film-led-transparent" },
      { label: "Écran LED transparent", href: "/ecrans-led-transparents" },
    ],
  },
  {
    label: "Applications",
    href: "/secteurs",
    categoryId: "applications",
    children: [
      { label: "Secteurs d'activité", href: "/secteurs" },
      { label: "Réalisations", href: "/realisations" },
    ],
  },
  {
    label: "Votre projet",
    href: "/simulations",
    categoryId: "votreProjet",
    children: [
      { label: "Simulations", href: "/simulations" },
      { label: "Configurateur", href: "/configurateur" },
      { label: "Notre méthode", href: "/notre-methode" },
    ],
  },
  {
    label: "Ressources",
    href: "/maintenance",
    categoryId: "ressources",
    children: [
      { label: "Maintenance & Support", href: "/maintenance" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "À propos", href: "/a-propos" },
];

// Footer : liste plate (pas de logique de catégorie/dropdown nécessaire
// dans un footer). Les 2 nouvelles pages piliers sont ajoutées à la suite
// de "Nos solutions".
export const footerNav: NavItem[] = [
  { label: "Nos solutions", href: "/nos-solutions" },
  { label: "Film LED transparent", href: "/film-led-transparent" },
  { label: "Écran LED transparent", href: "/ecrans-led-transparents" },
  { label: "Secteurs d'activité", href: "/secteurs" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Simulations", href: "/simulations" },
  { label: "Configurateur", href: "/configurateur" },
  { label: "Notre méthode", href: "/notre-methode" },
  { label: "Maintenance & Support", href: "/maintenance" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions" },
];
