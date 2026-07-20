import { Project, ExternalReference } from "@/types";

// IMPORTANT : Ces projets sont des simulations/rendus internes destinés à
// illustrer le rendu visuel des solutions. Aucun n'est présenté comme une
// installation réelle achevée tant que isSimulation === true. Ne jamais
// modifier ce statut sans confirmation qu'il s'agit d'une réalisation
// effective de KRISALYS.
export const projects: Project[] = [
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

// Références internationales : exemples de technologies existantes,
// explicitement non réalisées par KRISALYS. Ne jamais laisser penser
// le contraire dans l'affichage de cette liste.
export const externalReferences: ExternalReference[] = [
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
