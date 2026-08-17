import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
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

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
