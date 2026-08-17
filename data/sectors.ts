import { Sector } from "@/types";

// Une entrée par secteur — page /secteurs générée automatiquement à partir
// de ce fichier. Ajouter un secteur ne nécessite aucune modification de code.
export const sectors: Sector[] = [
  {
    slug: "hotels",
    name: "Hôtels",
    icon: "BedDouble",
    problems: [
      "Façade peu visible depuis la rue ou l'axe principal",
      "Difficulté à communiquer sur les offres et événements en temps réel",
    ],
    benefits: [
      "Renforce le standing perçu de l'établissement",
      "Met en avant les offres, événements et services de l'hôtel",
    ],
    useCases: ["Façade d'entrée", "Hall d'accueil", "Signalétique des espaces événementiels"],
    recommendedSolutionSlug: "transparent",
    ctaLabel: "Demander une simulation pour mon hôtel",
  },
  {
    slug: "banques",
    name: "Banques",
    icon: "Landmark",
    problems: [
      "Image perçue comme institutionnelle plutôt que moderne",
      "Communication limitée sur les nouveaux produits en agence",
    ],
    benefits: [
      "Modernise l'image de l'agence sans travaux lourds",
      "Permet une communication produit actualisable à distance",
    ],
    useCases: ["Vitrine d'agence", "Espace d'accueil client", "Zone d'attente"],
    recommendedSolutionSlug: "transparent",
    ctaLabel: "Demander une simulation pour mon agence",
  },
  {
    slug: "centres-commerciaux",
    name: "Centres commerciaux",
    icon: "ShoppingBag",
    problems: [
      "Communication de nombreuses enseignes à coordonner",
      "Besoin de visibilité forte sur un axe très fréquenté",
    ],
    benefits: [
      "Diffuse les informations du centre et des enseignes en un point unique",
      "Renforce l'attractivité de la façade principale",
    ],
    useCases: ["Façade extérieure", "Mange annonces", "Signalétique d'étage"],
    recommendedSolutionSlug: "exterieur",
    ctaLabel: "Demander une simulation pour mon centre",
  },
  {
    slug: "pharmacies",
    name: "Pharmacies",
    icon: "Pill",
    problems: [
      "Visibilité de nuit ou de garde insuffisante",
      "Affichage papier à renouveler manuellement",
    ],
    benefits: [
      "Améliore la visibilité de l'enseigne, y compris de nuit",
      "Permet la mise à jour à distance des informations de garde",
    ],
    useCases: ["Enseigne lumineuse", "Vitrine", "Réseau multi-officines"],
    recommendedSolutionSlug: "dynamique",
    ctaLabel: "Demander une simulation pour ma pharmacie",
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: "UtensilsCrossed",
    problems: [
      "Menu et promotions difficiles à mettre à jour rapidement",
      "Manque de visibilité par rapport aux enseignes voisines",
    ],
    benefits: [
      "Menus et offres modifiables sans réimpression",
      "Ambiance visuelle renforcée en salle",
    ],
    useCases: ["Vitrine", "Menu digital en salle", "Façade"],
    recommendedSolutionSlug: "exterieur",
    ctaLabel: "Demander une simulation pour mon restaurant",
  },
  {
    slug: "supermarches",
    name: "Supermarchés",
    icon: "ShoppingCart",
    problems: [
      "Multiplicité des promotions à communiquer en simultané",
      "Affichage papier coûteux à produire et à changer",
    ],
    benefits: [
      "Diffusion centralisée des promotions sur plusieurs écrans",
      "Réduction du recours à l'affichage imprimé",
    ],
    useCases: ["Façade", "Rayons", "Caisses"],
    recommendedSolutionSlug: "dynamique",
    ctaLabel: "Demander une simulation pour mon magasin",
  },
  {
    slug: "concessionnaires-automobiles",
    name: "Concessionnaires automobiles",
    icon: "Car",
    problems: [
      "Showroom qui ne reflète pas le positionnement premium des véhicules",
      "Difficulté à mettre en scène les nouveaux modèles",
    ],
    benefits: [
      "Vitrine de showroom valorisée par un affichage transparent",
      "Mise en scène dynamique des nouveaux modèles",
    ],
    useCases: ["Vitrine de showroom", "Espace d'exposition intérieur"],
    recommendedSolutionSlug: "transparent",
    ctaLabel: "Demander une simulation pour mon showroom",
  },
  {
    slug: "cliniques",
    name: "Cliniques",
    icon: "HeartPulse",
    problems: [
      "Signalétique d'accueil peu claire pour les patients",
      "Communication institutionnelle limitée dans les espaces d'attente",
    ],
    benefits: [
      "Améliore l'orientation et l'information des patients",
      "Renforce l'image de sérieux de l'établissement",
    ],
    useCases: ["Hall d'accueil", "Salle d'attente", "Signalétique de service"],
    recommendedSolutionSlug: "interieur",
    ctaLabel: "Demander une simulation pour mon établissement",
  },
  {
    slug: "immeubles-de-bureaux",
    name: "Immeubles de bureaux",
    icon: "Building",
    problems: [
      "Façade qui ne reflète pas le standing des entreprises locataires",
      "Absence de signalétique moderne pour les visiteurs",
    ],
    benefits: [
      "Valorise l'immeuble auprès des futurs locataires",
      "Modernise l'accueil des visiteurs",
    ],
    useCases: ["Façade principale", "Hall d'entrée", "Signalétique d'étage"],
    recommendedSolutionSlug: "facades",
    ctaLabel: "Demander une simulation pour mon immeuble",
  },
  {
    slug: "promoteurs-immobiliers",
    name: "Promoteurs immobiliers",
    icon: "Building2",
    problems: [
      "Besoin de communiquer sur un projet avant sa livraison",
      "Différenciation difficile face à la concurrence",
    ],
    benefits: [
      "Met en scène un projet immobilier dès sa commercialisation",
      "Renforce la perception de modernité du programme",
    ],
    useCases: ["Panneau de chantier digitalisé", "Espace de vente", "Showroom du programme"],
    recommendedSolutionSlug: "facades",
    ctaLabel: "Demander une simulation pour mon programme",
  },
  {
    slug: "universites",
    name: "Universités",
    icon: "GraduationCap",
    problems: [
      "Information aux étudiants dispersée sur plusieurs supports papier",
      "Image institutionnelle perçue comme datée",
    ],
    benefits: [
      "Centralise l'information étudiante sur des écrans dédiés",
      "Modernise l'image de l'établissement",
    ],
    useCases: ["Hall d'entrée", "Espaces communs", "Signalétique de campus"],
    recommendedSolutionSlug: "interieur",
    ctaLabel: "Demander une simulation pour mon établissement",
  },
  {
    slug: "eglises",
    name: "Églises",
    icon: "Church",
    problems: [
      "Communication des horaires et événements limitée à l'affichage papier",
      "Difficulté à toucher les visiteurs occasionnels",
    ],
    benefits: [
      "Diffuse horaires et événements de façon claire et actualisable",
      "Renforce la visibilité de la communauté",
    ],
    useCases: ["Façade", "Hall d'entrée", "Panneau d'annonces"],
    recommendedSolutionSlug: "dynamique",
    ctaLabel: "Demander une simulation pour mon lieu de culte",
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
