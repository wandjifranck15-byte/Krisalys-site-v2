import { Solution } from "@/types";
import type { Locale } from "@/types";

// Contenu des solutions. Toutes les formulations techniques restent
// prudentes (pas d'affirmation absolue sur la transparence, la facilité
// d'installation ou des specs précises), conformément aux principes
// éditoriaux validés pour KRISALYS. Bilingue via getSolutions(locale) —
// pas de fichier dupliqué.
const solutionsFr: Solution[] = [
  {
    slug: "transparent",
    name: "Écrans LED transparents",
    shortDescription: "Affichage dynamique intégré aux surfaces vitrées, sans obstruer la vue.",
    description: "Conçus pour s'intégrer aux façades vitrées, ces écrans permettent de diffuser du contenu visuel tout en conservant une bonne visibilité entre l'intérieur et l'extérieur du bâtiment.",
    benefits: ["Valorise une façade vitrée sans travaux lourds", "Diffuse des messages visibles de jour comme de nuit", "Permet de moderniser l'image du bâtiment"],
    useCases: ["Vitrines de banques et d'agences", "Façades de sièges sociaux", "Showrooms automobiles"],
    technicalNotes: ["Niveau de transparence variable selon le produit et la configuration retenue", "Installation réalisée par une équipe encadrée, avec étude préalable du support vitré"],
    recommendedFor: ["banques", "hotels", "concessionnaires-automobiles", "immeubles-de-bureaux"],
    icon: "ScanLine",
  },
  {
    slug: "exterieur",
    name: "Écrans LED extérieurs",
    shortDescription: "Solutions d'affichage pensées pour une exposition extérieure durable.",
    description: "Destinés aux façades, enseignes et espaces extérieurs, ces écrans sont sélectionnés pour leur résistance aux conditions climatiques locales et leur bonne lisibilité en plein jour.",
    benefits: ["Visibilité renforcée sur rue ou sur axe passant", "Contenu modifiable à distance", "Remplace avantageusement l'affichage papier"],
    useCases: ["Centres commerciaux", "Supermarchés", "Enseignes de restaurants"],
    technicalNotes: ["Le choix du produit dépend de l'exposition (soleil, pluie, poussière) du site concerné", "Une étude technique précède toute recommandation définitive"],
    recommendedFor: ["centres-commerciaux", "supermarches", "restaurants", "pharmacies"],
    icon: "Building2",
  },
  {
    slug: "interieur",
    name: "Écrans LED intérieurs",
    shortDescription: "Affichage haute définition pour halls, accueils et espaces de vente.",
    description: "Adaptés aux espaces intérieurs (accueil, hall, espace de vente), ces écrans permettent de diffuser des contenus informatifs, promotionnels ou institutionnels dans un environnement maîtrisé.",
    benefits: ["Améliore l'expérience d'accueil des visiteurs", "Permet une communication interne et commerciale unifiée", "S'intègre à une signalétique existante"],
    useCases: ["Halls d'hôtels", "Accueils de cliniques", "Agences bancaires"],
    technicalNotes: ["Formats et résolutions adaptés à la distance de lecture de l'espace concerné"],
    recommendedFor: ["hotels", "cliniques", "banques", "universites"],
    icon: "MonitorSmartphone",
  },
  {
    slug: "facades",
    name: "Façades numériques",
    shortDescription: "Transformation de tout ou partie d'une façade en support de communication.",
    description: "Une approche plus globale que l'écran isolé : la façade elle-même devient un support de communication, pensé en cohérence avec l'architecture du bâtiment.",
    benefits: ["Différencie visuellement un bâtiment sur son marché", "Renforce la présence de marque à l'échelle du quartier", "Peut accompagner un projet de rénovation de façade"],
    useCases: ["Sièges sociaux", "Immeubles de bureaux", "Centres commerciaux"],
    technicalNotes: ["Nécessite une étude architecturale préalable du bâtiment concerné"],
    recommendedFor: ["immeubles-de-bureaux", "centres-commerciaux", "promoteurs-immobiliers"],
    icon: "Layers",
  },
  {
    slug: "dynamique",
    name: "Affichage dynamique",
    shortDescription: "Gestion et diffusion de contenus à distance sur un ou plusieurs écrans.",
    description: "Un système de gestion de contenu permettant de programmer, actualiser et diffuser des messages sur un ou plusieurs écrans, sans intervention physique sur site.",
    benefits: ["Mise à jour des contenus à distance", "Programmation de campagnes selon les horaires ou événements", "Gestion centralisée pour les réseaux multi-sites"],
    useCases: ["Réseaux de pharmacies", "Chaînes de supermarchés", "Groupes hôteliers"],
    technicalNotes: ["Compatibilité à valider selon le nombre d'écrans et la connectivité disponible sur site"],
    recommendedFor: ["pharmacies", "supermarches", "hotels", "eglises"],
    icon: "Radio",
  },
];

const solutionsEn: Solution[] = [
  {
    slug: "transparent",
    name: "Transparent LED screens",
    shortDescription: "Dynamic display integrated into glazed surfaces, without obstructing the view.",
    description: "Designed to integrate into glazed facades, these screens display visual content while preserving good visibility between the inside and outside of the building.",
    benefits: ["Enhances a glazed facade without major construction work", "Displays messages visible day and night", "Modernizes the building's image"],
    useCases: ["Bank and branch storefronts", "Head office facades", "Car showrooms"],
    technicalNotes: ["Transparency level varies depending on the product and configuration chosen", "Installation carried out by a supervised team, with a prior assessment of the glazed support"],
    recommendedFor: ["banques", "hotels", "concessionnaires-automobiles", "immeubles-de-bureaux"],
    icon: "ScanLine",
  },
  {
    slug: "exterieur",
    name: "Outdoor LED screens",
    shortDescription: "Display solutions designed for durable outdoor exposure.",
    description: "Intended for facades, signage and outdoor spaces, these screens are selected for their resistance to local climate conditions and their readability in daylight.",
    benefits: ["Enhanced visibility from the street or a busy road", "Content updatable remotely", "A strong alternative to printed signage"],
    useCases: ["Shopping malls", "Supermarkets", "Restaurant signage"],
    technicalNotes: ["Product choice depends on the site's exposure (sun, rain, dust)", "A technical assessment precedes any final recommendation"],
    recommendedFor: ["centres-commerciaux", "supermarches", "restaurants", "pharmacies"],
    icon: "Building2",
  },
  {
    slug: "interieur",
    name: "Indoor LED screens",
    shortDescription: "High-definition display for lobbies, reception areas and retail spaces.",
    description: "Suited to indoor spaces (reception, lobby, retail area), these screens display informational, promotional or institutional content in a controlled environment.",
    benefits: ["Improves the visitor welcome experience", "Enables unified internal and commercial communication", "Integrates with existing signage"],
    useCases: ["Hotel lobbies", "Clinic reception areas", "Bank branches"],
    technicalNotes: ["Formats and resolutions adapted to the viewing distance of the space concerned"],
    recommendedFor: ["hotels", "cliniques", "banques", "universites"],
    icon: "MonitorSmartphone",
  },
  {
    slug: "facades",
    name: "Digital facades",
    shortDescription: "Transformation of all or part of a facade into a communication medium.",
    description: "A more global approach than a standalone screen: the facade itself becomes a communication medium, designed in harmony with the building's architecture.",
    benefits: ["Visually differentiates a building in its market", "Strengthens brand presence at the neighborhood scale", "Can accompany a facade renovation project"],
    useCases: ["Head offices", "Office buildings", "Shopping malls"],
    technicalNotes: ["Requires a prior architectural assessment of the building concerned"],
    recommendedFor: ["immeubles-de-bureaux", "centres-commerciaux", "promoteurs-immobiliers"],
    icon: "Layers",
  },
  {
    slug: "dynamique",
    name: "Dynamic display",
    shortDescription: "Remote content management and distribution across one or more screens.",
    description: "A content management system that schedules, updates and distributes messages across one or more screens, without any physical intervention on site.",
    benefits: ["Remote content updates", "Campaign scheduling by time slot or event", "Centralized management for multi-site networks"],
    useCases: ["Pharmacy networks", "Supermarket chains", "Hotel groups"],
    technicalNotes: ["Compatibility to be confirmed based on the number of screens and on-site connectivity"],
    recommendedFor: ["pharmacies", "supermarches", "hotels", "eglises"],
    icon: "Radio",
  },
];

export function getSolutions(locale: Locale = "fr"): Solution[] {
  return locale === "en" ? solutionsEn : solutionsFr;
}

export function getSolutionBySlug(slug: string, locale: Locale = "fr"): Solution | undefined {
  return getSolutions(locale).find((s) => s.slug === slug);
}

export const solutions = solutionsFr;
