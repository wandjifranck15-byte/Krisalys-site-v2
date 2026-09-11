import type { Technology, Locale } from "@/types";

// Architecture cible validée : KRISALYS présente deux technologies piliers
// (film LED transparent, écran LED transparent), pas un catalogue de
// familles. Les anciennes catégories (intérieur/extérieur/façades/
// affichage dynamique — voir data/solutions.ts, conservé pour compatibilité
// et pour la page /nos-solutions) sont ici reformulées comme des VARIANTES
// de configuration à l'intérieur de chaque technologie, jamais comme des
// offres indépendantes. Le pitch/densité de pixels n'est jamais présenté
// comme une gamme figée (voir `criteria`) : aucune valeur chiffrée n'est
// affirmée sans étude technique. Bilingue via getTechnologies(locale).
const technologiesFr: Technology[] = [
  {
    slug: "film-led-transparent",
    name: "Film LED transparent",
    eyebrow: "Technologie 01",
    shortDescription: "Un film LED appliqué directement sur une surface vitrée existante, sans en modifier la structure.",
    description: "Le film LED transparent est une solution fine, appliquée sur un vitrage déjà en place, qui permet de diffuser du contenu visuel tout en conservant la transparence et la fonction architecturale de la surface. Il s'adresse en priorité aux bâtiments dont la façade ou la vitrine vitrée existe déjà et doit être préservée.",
    howItWorks: [
      "Le film est appliqué sur la face intérieure ou extérieure du vitrage existant, sans remplacement de la structure vitrée",
      "Il diffuse du contenu visuel piloté à distance, comme un système d'affichage classique",
      "Son niveau de transparence dépend du produit retenu et de la configuration validée avec vous lors de l'étude",
    ],
    whyUseIt: [
      "Ne nécessite pas de remplacer le vitrage existant",
      "Préserve la transparence et la lumière naturelle selon la configuration retenue",
      "S'adapte à une surface vitrée déjà en place, y compris dans le cadre d'une rénovation",
    ],
    criteria: [
      "Type et état du vitrage existant",
      "Niveau de transparence recherché",
      "Distance de vision depuis laquelle le contenu sera regardé",
      "Exposition intérieure ou extérieure",
      "Luminosité ambiante du site",
      "Type de contenu à diffuser",
    ],
    constraints: [
      "La compatibilité avec le vitrage existant doit être validée techniquement avant toute décision",
      "Les performances précises (luminosité, durée de vie, transparence exacte) dépendent du produit retenu et seront confirmées lors de l'étude technique — aucune valeur n'est affirmée à ce stade",
      "Le pitch (densité de pixels) le plus adapté dépend de la distance de vision et du contenu prévu : il est déterminé projet par projet, jamais imposé depuis un catalogue figé",
    ],
    recommendedFor: ["banques", "hotels", "concessionnaires-automobiles", "centres-commerciaux", "immeubles-de-bureaux"],
    variants: [
      {
        title: "Application intérieure",
        description: "Sur un vitrage intérieur (hall, accueil, espace de vente), le film permet une communication institutionnelle ou commerciale sans modifier la signalétique existante.",
      },
      {
        title: "Application extérieure",
        description: "Sur une façade ou une vitrine donnant sur rue, le film valorise la visibilité du bâtiment tout en conservant son caractère architectural vitré.",
      },
    ],
    icon: "ScanLine",
    ctaLabel: "Étudier mon projet de film LED transparent",
  },
  {
    slug: "ecran-led-transparent",
    name: "Écran LED transparent",
    eyebrow: "Technologie 02",
    shortDescription: "Un écran LED conçu pour rester en grande partie transparent, intégré à une surface vitrée.",
    description: "L'écran LED transparent est une structure autonome, généralement en grille ou en maille, positionnée sur ou à proximité d'une surface vitrée. Il est conçu autour d'une structure LED transparente adaptée à la configuration de la surface et du projet, avec un niveau de vue au travers selon la configuration retenue.",
    howItWorks: [
      "L'écran est installé sur la surface vitrée ou en complément de celle-ci, selon la configuration du bâtiment",
      "Sa structure en grille/maille laisse passer une partie de la lumière et de la vue, contrairement à un écran LED plein",
      "Le contenu est géré et actualisé à distance, comme pour tout système d'affichage dynamique",
    ],
    whyUseIt: [
      "Conçu autour d'une structure LED transparente, pour les projets dont la configuration de surface le justifie",
      "S'intègre à une façade vitrée existante ou à un projet de rénovation architecturale",
      "Peut être configuré pour différents niveaux de transparence selon le projet",
    ],
    criteria: [
      "Dimensions de la surface à équiper",
      "Distance de vision",
      "Niveau de transparence recherché",
      "Exposition intérieure ou extérieure",
      "Luminosité ambiante du site",
      "Contraintes architecturales et électriques du bâtiment",
    ],
    constraints: [
      "Une étude architecturale préalable du bâtiment est nécessaire avant toute installation",
      "Les performances précises (luminosité, durée de vie, transparence exacte) dépendent du produit retenu et seront confirmées lors de l'étude technique — aucune valeur n'est affirmée à ce stade",
      "Le pitch (densité de pixels) le plus adapté dépend de la distance de vision et du contenu prévu : il est déterminé projet par projet, jamais imposé depuis un catalogue figé",
    ],
    recommendedFor: ["immeubles-de-bureaux", "centres-commerciaux", "promoteurs-immobiliers", "hotels", "pharmacies", "supermarches"],
    variants: [
      {
        title: "Intégration à une façade existante",
        description: "Positionné sur une façade vitrée déjà en place, l'écran devient un support de communication à l'échelle du bâtiment sans le dénaturer.",
      },
      {
        title: "Gestion de contenu multi-sites",
        description: "Pour les réseaux de plusieurs bâtiments, le contenu peut être programmé et actualisé à distance de façon centralisée.",
      },
    ],
    icon: "Layers",
    ctaLabel: "Étudier mon projet d'écran LED transparent",
  },
];

const technologiesEn: Technology[] = [
  {
    slug: "film-led-transparent",
    name: "Transparent LED Film",
    eyebrow: "Technology 01",
    shortDescription: "An LED film applied directly onto an existing glazed surface, without altering its structure.",
    description: "Transparent LED film is a thin solution applied to glazing already in place, displaying visual content while preserving the surface's transparency and architectural function. It is primarily suited to buildings whose glazed facade or storefront already exists and must be preserved.",
    howItWorks: [
      "The film is applied to the inner or outer face of the existing glazing, with no replacement of the glazed structure",
      "It displays visual content managed remotely, like a standard display system",
      "Its transparency level depends on the product chosen and the configuration validated with you during the assessment",
    ],
    whyUseIt: [
      "Does not require replacing the existing glazing",
      "Preserves transparency and natural light depending on the configuration chosen",
      "Adapts to a glazed surface already in place, including as part of a renovation",
    ],
    criteria: [
      "Type and condition of the existing glazing",
      "Desired transparency level",
      "Viewing distance from which content will be seen",
      "Indoor or outdoor exposure",
      "Ambient lighting at the site",
      "Type of content to be displayed",
    ],
    constraints: [
      "Compatibility with the existing glazing must be technically validated before any decision",
      "Precise performance (brightness, lifespan, exact transparency) depends on the product chosen and will be confirmed during the technical assessment — no value is stated at this stage",
      "The most suitable pitch (pixel density) depends on viewing distance and intended content: it is determined project by project, never imposed from a fixed catalog",
    ],
    recommendedFor: ["banques", "hotels", "concessionnaires-automobiles", "centres-commerciaux", "immeubles-de-bureaux"],
    variants: [
      {
        title: "Indoor application",
        description: "On indoor glazing (lobby, reception, retail space), the film enables institutional or commercial communication without altering existing signage.",
      },
      {
        title: "Outdoor application",
        description: "On a street-facing facade or storefront, the film enhances the building's visibility while preserving its glazed architectural character.",
      },
    ],
    icon: "ScanLine",
    ctaLabel: "Study my transparent LED film project",
  },
  {
    slug: "ecran-led-transparent",
    name: "Transparent LED Screen",
    eyebrow: "Technology 02",
    shortDescription: "An LED screen designed to remain largely transparent, integrated into a glazed surface.",
    description: "A transparent LED screen is a standalone structure, usually a grid or mesh, positioned on or near a glazed surface. It is designed around a transparent LED structure suited to the surface's configuration and the project, preserving a level of see-through visibility depending on the configuration chosen.",
    howItWorks: [
      "The screen is installed on the glazed surface or alongside it, depending on the building's configuration",
      "Its grid/mesh structure lets some light and view through, unlike a solid LED screen",
      "Content is managed and updated remotely, as with any dynamic display system",
    ],
    whyUseIt: [
      "Designed around a transparent LED structure, for projects whose surface configuration calls for it",
      "Integrates with an existing glazed facade or an architectural renovation project",
      "Can be configured for different transparency levels depending on the project",
    ],
    criteria: [
      "Dimensions of the surface to be equipped",
      "Viewing distance",
      "Desired transparency level",
      "Indoor or outdoor exposure",
      "Ambient lighting at the site",
      "The building's architectural and electrical constraints",
    ],
    constraints: [
      "A prior architectural assessment of the building is required before any installation",
      "Precise performance (brightness, lifespan, exact transparency) depends on the product chosen and will be confirmed during the technical assessment — no value is stated at this stage",
      "The most suitable pitch (pixel density) depends on viewing distance and intended content: it is determined project by project, never imposed from a fixed catalog",
    ],
    recommendedFor: ["immeubles-de-bureaux", "centres-commerciaux", "promoteurs-immobiliers", "hotels", "pharmacies", "supermarches"],
    variants: [
      {
        title: "Integration into an existing facade",
        description: "Positioned on an already-existing glazed facade, the screen becomes a building-scale communication medium without altering its character.",
      },
      {
        title: "Multi-site content management",
        description: "For networks of several buildings, content can be scheduled and updated remotely from a central point.",
      },
    ],
    icon: "Layers",
    ctaLabel: "Study my transparent LED screen project",
  },
];

export function getTechnologies(locale: Locale = "fr"): Technology[] {
  return locale === "en" ? technologiesEn : technologiesFr;
}

export function getTechnologyBySlug(slug: string, locale: Locale = "fr"): Technology | undefined {
  return getTechnologies(locale).find((t) => t.slug === slug);
}

export const technologies = technologiesFr;
