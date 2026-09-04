import { BlogPost } from "@/types";
import type { Locale } from "@/types";

const blogPostsFr: BlogPost[] = [
  {
    slug: "pourquoi-installer-ecran-led-facade",
    title: "Pourquoi installer un écran LED sur une façade ?",
    excerpt: "Les raisons pour lesquelles de plus en plus d'entreprises transforment leur façade en support de communication.",
    category: "Innovation",
    publishedAt: "2026-06-01",
    readingTime: "4 min",
    content: [
      "Une façade est le premier point de contact visuel entre une entreprise et son public. La rendre communicante permet de capter l'attention sans dépendre uniquement de supports numériques distants.",
      "Contrairement à l'affichage papier, un écran LED permet d'actualiser un message en quelques minutes, ce qui représente un gain de réactivité important pour des opérations commerciales ou institutionnelles.",
      "Cette transformation reste cependant un projet technique qui nécessite une étude préalable du bâtiment, afin d'assurer un rendu cohérent avec son architecture.",
    ],
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
      "L'affichage dynamique permet de communiquer sur de nouveaux produits sans réimpression de supports, tout en conservant une image institutionnelle maîtrisée.",
      "Une étude de façade reste la première étape avant d'envisager une transformation de ce type.",
    ],
  },
];

const blogPostsEn: BlogPost[] = [
  {
    slug: "pourquoi-installer-ecran-led-facade",
    title: "Why install an LED screen on a facade?",
    excerpt: "The reasons why more and more businesses are turning their facade into a communication medium.",
    category: "Innovation",
    publishedAt: "2026-06-01",
    readingTime: "4 min",
    content: [
      "A facade is the first visual point of contact between a business and its public. Making it communicative captures attention without relying solely on distant digital channels.",
      "Unlike printed signage, an LED screen lets you update a message within minutes — a significant responsiveness gain for commercial or institutional operations.",
      "This transformation remains a technical project, however, requiring a prior assessment of the building to ensure a result consistent with its architecture.",
    ],
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
      "Dynamic display lets you communicate about new products without reprinting materials, while keeping a controlled institutional image.",
      "A facade assessment remains the first step before considering this kind of transformation.",
    ],
  },
];

export function getBlogPosts(locale: Locale = "fr"): BlogPost[] {
  return locale === "en" ? blogPostsEn : blogPostsFr;
}

export function getBlogPostBySlug(slug: string, locale: Locale = "fr"): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

export const blogPosts = blogPostsFr;
