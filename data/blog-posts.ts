import { BlogPost } from "@/types";
import type { Locale } from "@/types";

// Phase 11 : les articles utilisant "écran LED" comme terme générique par
// défaut ont été repositionnés pour clarifier qu'il s'agit d'un des deux
// piliers (film LED transparent / écran LED transparent), jamais d'un
// catalogue générique. Un nouvel article dédié au film a été ajouté pour
// rééquilibrer l'autorité thématique entre les deux technologies. Chaque
// article renvoie vers sa page pilier via `relatedLink` plutôt que de
// dupliquer le contenu commercial.
const blogPostsFr: BlogPost[] = [
  {
    slug: "pourquoi-installer-ecran-led-facade",
    title: "Pourquoi installer un écran LED transparent sur une façade vitrée ?",
    excerpt: "Comment un écran LED transparent permet de transformer une façade vitrée en support de communication.",
    category: "Innovation",
    publishedAt: "2026-06-01",
    readingTime: "4 min",
    content: [
      "Une façade vitrée est le premier point de contact visuel entre une entreprise et son public. La rendre communicante permet de capter l'attention sans dépendre uniquement de supports numériques distants.",
      "L'écran LED transparent est l'une des deux technologies étudiées par KRISALYS pour ce type de projet — l'autre étant le film LED transparent, appliqué directement sur un vitrage existant. Le choix entre les deux dépend de la surface, de l'environnement et des objectifs du projet.",
      "Cette transformation reste un projet technique qui nécessite une étude préalable du bâtiment, afin d'assurer un rendu cohérent avec son architecture.",
    ],
    relatedLink: { href: "/ecrans-led-transparents", label: "Découvrir l'écran LED transparent" },
  },
  {
    slug: "avantages-ecrans-led-transparents",
    title: "Les avantages des écrans LED transparents",
    excerpt: "Comprendre ce que permettent réellement les écrans LED transparents, sans promesses excessives.",
    category: "Technologie",
    publishedAt: "2026-06-08",
    readingTime: "5 min",
    content: [
      "Les écrans LED transparents permettent de diffuser du contenu visuel directement sur une surface vitrée, sans obstruer complètement la vue entre l'intérieur et l'extérieur.",
      "Le niveau de transparence varie selon les produits : il est important de le vérifier avec un interlocuteur technique avant toute décision, plutôt que de se fier à des visuels génériques.",
      "Cette solution est particulièrement adaptée aux bâtiments dont la façade vitrée constitue déjà un atout architectural à préserver.",
    ],
    relatedLink: { href: "/ecrans-led-transparents", label: "Découvrir l'écran LED transparent" },
  },
  {
    slug: "moderniser-agence-bancaire",
    title: "Comment moderniser une agence bancaire ?",
    excerpt: "Les leviers de modernisation visuelle accessibles à une agence bancaire sans travaux lourds.",
    category: "Marketing",
    publishedAt: "2026-06-15",
    readingTime: "4 min",
    content: [
      "L'image d'une agence bancaire repose en grande partie sur son accueil visuel : vitrine, hall, signalétique.",
      "L'affichage dynamique permet de communiquer sur de nouveaux produits sans réimpression de supports, tout en conservant une image institutionnelle maîtrisée. Selon la configuration de la vitrine, un film ou un écran LED transparent peut être étudié.",
      "Une étude de façade reste la première étape avant d'envisager une transformation de ce type.",
    ],
    relatedLink: { href: "/configurateur", label: "Configurer mon projet" },
  },
  {
    slug: "film-led-transparent-comment-ca-fonctionne",
    title: "Film LED transparent : comment ça fonctionne ?",
    excerpt: "Le principe du film LED transparent, ses cas d'usage et ce qui déterminera la configuration de votre projet.",
    category: "Technologie",
    publishedAt: "2026-06-22",
    readingTime: "4 min",
    content: [
      "Le film LED transparent est une solution fine, appliquée directement sur un vitrage déjà en place, sans en modifier la structure. Il diffuse du contenu visuel tout en conservant une part de transparence, selon le produit et la configuration retenue.",
      "Son principal intérêt est de s'adapter à une surface vitrée existante — vitrine, façade, hall — sans travaux lourds, y compris dans le cadre d'une rénovation.",
      "Le niveau de transparence, la distance de vision et l'environnement (intérieur ou extérieur) sont autant de critères qui déterminent la configuration adaptée à chaque projet. Aucune configuration n'est universelle : elle dépend de l'analyse du bâtiment concerné.",
    ],
    relatedLink: { href: "/film-led-transparent", label: "Découvrir le film LED transparent" },
  },
];

const blogPostsEn: BlogPost[] = [
  {
    slug: "pourquoi-installer-ecran-led-facade",
    title: "Why install a transparent LED screen on a glazed facade?",
    excerpt: "How a transparent LED screen can turn a glazed facade into a communication medium.",
    category: "Innovation",
    publishedAt: "2026-06-01",
    readingTime: "4 min",
    content: [
      "A glazed facade is the first visual point of contact between a business and its public. Making it communicative captures attention without relying solely on distant digital channels.",
      "The transparent LED screen is one of the two technologies KRISALYS studies for this type of project — the other being transparent LED film, applied directly onto existing glazing. The choice between the two depends on the surface, the environment and the project's objectives.",
      "This transformation remains a technical project, however, requiring a prior assessment of the building to ensure a result consistent with its architecture.",
    ],
    relatedLink: { href: "/ecrans-led-transparents", label: "Discover the transparent LED screen" },
  },
  {
    slug: "avantages-ecrans-led-transparents",
    title: "The advantages of transparent LED screens",
    excerpt: "Understanding what transparent LED screens can really do, without overpromising.",
    category: "Technology",
    publishedAt: "2026-06-08",
    readingTime: "5 min",
    content: [
      "Transparent LED screens display visual content directly on a glazed surface, without completely obstructing the view between inside and outside.",
      "The transparency level varies by product: it's important to confirm it with a technical contact before any decision, rather than relying on generic visuals.",
      "This solution is particularly well suited to buildings whose glazed facade is already an architectural asset worth preserving.",
    ],
    relatedLink: { href: "/ecrans-led-transparents", label: "Discover the transparent LED screen" },
  },
  {
    slug: "moderniser-agence-bancaire",
    title: "How to modernize a bank branch",
    excerpt: "Visual modernization options available to a bank branch without major construction work.",
    category: "Marketing",
    publishedAt: "2026-06-15",
    readingTime: "4 min",
    content: [
      "A bank branch's image relies heavily on its visual welcome: storefront, lobby, signage.",
      "Dynamic display lets you communicate about new products without reprinting materials, while keeping a controlled institutional image. Depending on the storefront's configuration, either a transparent LED film or screen can be studied.",
      "A facade assessment remains the first step before considering this kind of transformation.",
    ],
    relatedLink: { href: "/configurateur", label: "Configure my project" },
  },
  {
    slug: "film-led-transparent-comment-ca-fonctionne",
    title: "Transparent LED film: how does it work?",
    excerpt: "The principle behind transparent LED film, its use cases, and what determines your project's configuration.",
    category: "Technology",
    publishedAt: "2026-06-22",
    readingTime: "4 min",
    content: [
      "Transparent LED film is a thin solution applied directly onto glazing already in place, without altering its structure. It displays visual content while preserving a degree of transparency, depending on the product and configuration chosen.",
      "Its main advantage is adapting to an existing glazed surface — storefront, facade, lobby — without major construction work, including as part of a renovation.",
      "Transparency level, viewing distance and environment (indoor or outdoor) are all criteria that determine the configuration suited to each project. No configuration is universal: it depends on the assessment of the building concerned.",
    ],
    relatedLink: { href: "/film-led-transparent", label: "Discover transparent LED film" },
  },
];

export function getBlogPosts(locale: Locale = "fr"): BlogPost[] {
  return locale === "en" ? blogPostsEn : blogPostsFr;
}

export function getBlogPostBySlug(slug: string, locale: Locale = "fr"): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

export const blogPosts = blogPostsFr;
