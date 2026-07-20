# KRISALYS — Site web officiel

Site web de KRISALYS (écrans LED & solutions visuelles), construit avec Next.js 15,
TypeScript, Tailwind CSS et Framer Motion. Ce projet correspond au [Document de
Conception](#document-de-conception-associé) validé pour KRISALYS LED, avec une
architecture prévue pour devenir à terme le portail du groupe KRISALYS.

---

## 1. Installation

Prérequis : Node.js 18.17 ou supérieur.

```bash
npm install
cp .env.example .env
npm run dev
```

Le site est alors accessible sur `http://localhost:3000`.

## 2. Scripts disponibles

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Construit le site pour la production |
| `npm run start` | Démarre le serveur de production (après `build`) |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run format` | Reformate le code avec Prettier |

## 3. Structure du projet

```
app/                  Routes (App Router) : une page = un dossier
  api/contact/        Endpoint du formulaire de contact
  blog/[slug]/        Page d'article dynamique
components/
  ui/                 Composants génériques (Button, Card, Container...)
  layout/             Navbar, Footer, WhatsAppButton, BackToTop
  sections/           Sections de page (Hero, Configurator, CameroonMap...)
  forms/              Formulaires (ContactForm)
  animations/         Wrapper Framer Motion (FadeIn)
data/                 Contenu structuré : solutions, secteurs, projets, FAQ,
                      méthode, maintenance, villes, divisions, navigation, blog
lib/
  i18n/               Dictionnaires et configuration d'internationalisation
  validations/        Schémas Zod (contact, configurateur)
  utils.ts            Fonctions utilitaires + configuration du site (siteConfig)
types/                Types TypeScript partagés
public/images/        Emplacement des médias réels (voir section 6)
```

**Principe clé : le dossier `data/` est le point d'évolutivité du site.**
Ajouter un secteur, une solution, une ville, une division du groupe ou un
article de blog se fait en ajoutant une entrée dans le fichier correspondant
— jamais en dupliquant du code ou en créant une nouvelle page.

## 4. Pages livrées

Accueil · Nos solutions · Secteurs d'activité · Simulations · Configurateur ·
Réalisations · Notre méthode · Maintenance & Support · À propos · FAQ · Blog
(+ articles) · Contact · Mentions légales · Confidentialité · Conditions
d'utilisation · 404.

## 5. Fonctionnalités spécifiques

### Configurateur de projet (`/configurateur` et sur `/simulations`)
Formulaire (type de bâtiment, ville, largeur, hauteur, intérieur/extérieur,
objectif) qui renvoie une **estimation indicative fondée sur des règles
explicites** (voir `components/sections/Configurator.tsx`). Le résultat
affiche systématiquement un avertissement : il ne s'agit pas d'un devis.
Aucune IA, aucun calcul de prix — uniquement une orientation.

### Carte du Cameroun (`/contact`)
`components/sections/CameroonMap.tsx` affiche une illustration stylisée
(non géographiquement précise) des villes couvertes, définies dans
`data/cities.ts`. Douala est actif ; Yaoundé, Kribi, Bafoussam, Garoua et
Bamenda sont listés en "à venir". Activer une ville = changer son `status`
dans `data/cities.ts`, sans toucher au composant.

Pour une carte géographiquement précise en production, remplacer ce
composant par une intégration Mapbox GL JS ou Leaflet avec un GeoJSON réel
du Cameroun — l'architecture de données (`data/cities.ts`) est déjà prête
pour alimenter une telle carte.

### Formulaire de contact
Validé avec React Hook Form + Zod (`lib/validations/contact.ts`), envoyé à
`app/api/contact/route.ts`. **Cet endpoint valide et journalise la demande
mais n'envoie pas encore d'email réel.** Pour activer l'envoi :
1. Créer un compte sur un service transactionnel (ex. Resend, Postmark).
2. Renseigner `RESEND_API_KEY` et `CONTACT_EMAIL_TO` dans `.env`.
3. Compléter `app/api/contact/route.ts` avec l'appel au service choisi.

## 6. Médias (images et vidéos)

**Mise à jour du 19 juillet 2026 :** le logo officiel KRISALYS est désormais intégré
(`components/ui/Logo.tsx`, utilisé par `Navbar` et `Footer`, favicon et image Open Graph — voir
`public/images/README.md` pour le détail des fichiers). Tout le reste ci-dessous reste vrai : aucune
autre image ou vidéo réelle n'est encore intégrée.

Aucune image ou vidéo réelle n'est intégrée dans cette V1 : les emplacements
prévus (Hero, comparateur avant/après, fiches solutions, projets) affichent
des blocs de couleur clairement légendés en attendant les visuels définitifs
de KRISALYS. Pour les intégrer :

1. Déposer les fichiers dans `public/images/` (ou `public/videos/`).
2. Remplacer les blocs signalés par un commentaire `// à remplacer` dans
   `components/sections/Hero.tsx`, `BeforeAfterSlider.tsx`, `ProjectCard.tsx`
   et `app/nos-solutions/page.tsx` par des composants `next/image` ou
   `<video>` pointant vers ces fichiers.
3. Renseigner un texte alternatif descriptif sur chaque image (déjà prévu
   dans la structure des composants).

Aucune image n'a été générée ou empruntée à des tiers pour cette livraison,
conformément au principe d'honnêteté du cahier des charges (pas de fausses
réalisations).

## 7. Internationalisation

Le site est livré en français uniquement, mais architecturé pour l'ajout de
langues sans réécriture :
- Les textes d'interface récurrents (navigation, boutons, formulaires) sont
  déjà externalisés dans `lib/i18n/dictionaries/fr.ts` et `en.ts` (ce dernier
  étant un squelette à traduire).
- Le contenu métier (solutions, secteurs, FAQ...) est déjà externalisé dans
  `data/`, donc traduisible sans toucher aux composants.

Pour activer réellement l'anglais : compléter `en.ts`, ajouter `"en"` à
`locales` dans `lib/i18n/config.ts`, puis introduire un routing par segment
`app/[locale]/...` (nous recommandons `next-intl` pour gérer le routing et
la négociation de langue).

## 8. Espace d'administration (non développé dans cette V1)

Le projet est conçu pour accueillir un futur back-office sans réécriture :
tout le contenu éditorial (solutions, secteurs, projets, FAQ, articles de
blog, méthode, maintenance) est déjà isolé dans des fichiers `data/*.ts`
fortement typés (`types/index.ts`). Migrer ce contenu vers une base de
données (ex. PostgreSQL + Prisma, ou un headless CMS comme Sanity/Strapi)
reviendrait à remplacer la source de ces fichiers par des requêtes, sans
modifier les composants qui les consomment. Le futur tableau de bord devra
permettre : ajout de réalisations, publication d'articles, modification des
textes, gestion des demandes de simulation (actuellement journalisées dans
`app/api/contact/route.ts`) et gestion des médias.

## 9. SEO

- Métadonnées par page (title, description) via `export const metadata` /
  `generateMetadata`.
- Sitemap (`app/sitemap.ts`) et robots.txt (`app/robots.ts`) générés
  automatiquement.
- Données structurées `Organization` (Schema.org) injectées dans
  `app/layout.tsx`.
- Mots-clés de référencement local (Douala, Cameroun) intégrés dans les
  métadonnées globales et dans le contenu des pages Secteurs et Solutions.
- Un seul `<h1>` par page, hiérarchie de titres respectée.

## 10. Performance & accessibilité

- Images prévues via `next/image` (lazy loading natif).
- Animations désactivées automatiquement si `prefers-reduced-motion` est
  activé (voir `app/globals.css`).
- Contrastes conformes WCAG AA sur fond noir (texte blanc / gris clair).
- Navigation clavier et focus visibles sur tous les éléments interactifs
  (boutons, liens, champs de formulaire).
- En-têtes de sécurité de base définis dans `next.config.mjs`.

## 11. Déploiement sur Vercel

1. Pousser ce projet sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), importer le dépôt.
3. Renseigner les variables d'environnement du fichier `.env.example`
   dans les paramètres du projet Vercel.
4. Déployer — aucune configuration supplémentaire n'est nécessaire, le
   projet est un Next.js standard.

## 12. Évolutivité vers le groupe KRISALYS

`data/divisions.ts` liste déjà KRISALYS LED (actif) et les divisions futures
(Hair, Display, Energy, Industrie) en statut "à venir". Ajouter une division
réellement opérationnelle ne modifie que ce fichier ; la page À propos et,
à terme, un méga-menu de groupe, peuvent se brancher directement dessus.

## 13. Dépendances installées mais pas encore mobilisées

`swiper` est installée conformément au stack technique demandé, mais aucun
carrousel n'était nécessaire dans cette V1 (les grilles de projets et de
solutions suffisaient). Elle est prête à être utilisée pour un futur
carrousel de projets ou de témoignages sur la page Réalisations ou Accueil.

## Document de Conception associé

Ce projet met en œuvre le document *KRISALYS — Document de Conception
(Design & Architecture Review)* livré précédemment : palette bleu électrique
/ orange / noir profond, ton éditorial honnête (aucun faux témoignage, aucune
réalisation non vérifiée présentée comme telle), et parcours utilisateur
centré sur la demande de simulation gratuite.
