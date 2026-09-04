import { Project, ExternalReference } from "@/types";
import type { Locale } from "@/types";

// IMPORTANT : Ces projets sont des simulations/rendus internes destinés à
// illustrer le rendu visuel des solutions. Aucun n'est présenté comme une
// installation réelle achevée tant que isSimulation === true. Ne jamais
// modifier ce statut sans confirmation qu'il s'agit d'une réalisation
// effective de KRISALYS. "city" (Douala) est un nom propre, non traduit.
const projectsFr: Project[] = [
  {
    slug: "simulation-agence-bancaire-douala",
    title: "Simulation — Agence bancaire, Douala",
    sectorSlug: "banques",
    buildingType: "Agence bancaire",
    city: "Douala",
    objective: "Moderniser la vitrine tout en conservant la transparence de la façade",
    solutionSlug: "transparent",
    isSimulation: true,
    description: "Projection visuelle réalisée à partir d'une photo de façade, illustrant l'intégration d'un écran LED transparent sur la vitrine principale.",
  },
  {
    slug: "simulation-showroom-automobile",
    title: "Simulation — Showroom automobile",
    sectorSlug: "concessionnaires-automobiles",
    buildingType: "Showroom",
    city: "Douala",
    objective: "Mettre en scène les nouveaux modèles exposés en vitrine",
    solutionSlug: "transparent",
    isSimulation: true,
    description: "Rendu illustrant l'intégration d'un affichage transparent sur la façade vitrée d'un showroom automobile.",
  },
  {
    slug: "simulation-centre-commercial",
    title: "Simulation — Façade de centre commercial",
    sectorSlug: "centres-commerciaux",
    buildingType: "Centre commercial",
    city: "Douala",
    objective: "Renforcer la visibilité depuis l'axe principal",
    solutionSlug: "exterieur",
    isSimulation: true,
    description: "Projection d'un écran LED extérieur en façade principale, pensée pour la visibilité depuis la voie de circulation.",
  },
];

const projectsEn: Project[] = [
  {
    slug: "simulation-agence-bancaire-douala",
    title: "Simulation — Bank branch, Douala",
    sectorSlug: "banques",
    buildingType: "Bank branch",
    city: "Douala",
    objective: "Modernize the storefront while preserving the facade's transparency",
    solutionSlug: "transparent",
    isSimulation: true,
    description: "A visual projection produced from a facade photo, illustrating the integration of a transparent LED screen on the main storefront.",
  },
  {
    slug: "simulation-showroom-automobile",
    title: "Simulation — Car showroom",
    sectorSlug: "concessionnaires-automobiles",
    buildingType: "Showroom",
    city: "Douala",
    objective: "Showcase the new models displayed in the showroom window",
    solutionSlug: "transparent",
    isSimulation: true,
    description: "A rendering illustrating the integration of a transparent display on the glazed facade of a car showroom.",
  },
  {
    slug: "simulation-centre-commercial",
    title: "Simulation — Shopping mall facade",
    sectorSlug: "centres-commerciaux",
    buildingType: "Shopping mall",
    city: "Douala",
    objective: "Strengthen visibility from the main road",
    solutionSlug: "exterieur",
    isSimulation: true,
    description: "A projection of an outdoor LED screen on the main facade, designed for visibility from the road.",
  },
];

export function getProjects(locale: Locale = "fr"): Project[] {
  return locale === "en" ? projectsEn : projectsFr;
}

export const projects = projectsFr;

// Références internationales : exemples de technologies existantes,
// explicitement non réalisées par KRISALYS. Ne jamais laisser penser
// le contraire dans l'affichage de cette liste.
const externalReferencesFr: ExternalReference[] = [
  {
    title: "Façades LED transparentes en environnement urbain dense",
    country: "Exemples internationaux",
    description: "Illustration du type de rendu que permettent les technologies d'écrans LED transparents sur des façades vitrées à grande échelle.",
    sourceLabel: "Exemple de technologie existante — non réalisé par KRISALYS",
  },
  {
    title: "Affichage dynamique multi-sites en réseau de distribution",
    country: "Exemples internationaux",
    description: "Illustration d'un usage type de la gestion de contenu à distance sur plusieurs points de vente.",
    sourceLabel: "Exemple de technologie existante — non réalisé par KRISALYS",
  },
];

const externalReferencesEn: ExternalReference[] = [
  {
    title: "Transparent LED facades in dense urban environments",
    country: "International examples",
    description: "An illustration of the kind of rendering that transparent LED screen technologies enable on large-scale glazed facades.",
    sourceLabel: "Example of existing technology — not carried out by KRISALYS",
  },
  {
    title: "Multi-site dynamic display across a distribution network",
    country: "International examples",
    description: "An illustration of a typical use of remote content management across several retail locations.",
    sourceLabel: "Example of existing technology — not carried out by KRISALYS",
  },
];

export function getExternalReferences(locale: Locale = "fr"): ExternalReference[] {
  return locale === "en" ? externalReferencesEn : externalReferencesFr;
}

export const externalReferences = externalReferencesFr;
