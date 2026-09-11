# KRISALYS — Refonte stratégique : audit & proposition d'architecture
**Statut : document de travail, en attente de validation. Aucun code n'a été modifié.**

---

## 1. Analyse critique du site actuel

Le site actuel (16 pages) fonctionne bien techniquement (thème clair/sombre, FR/EN complet, HubSpot, SEO de base, configurateur simple) mais son architecture produit est celle d'un **catalogue généraliste à 5 entrées** : Écrans LED transparents, extérieurs, intérieurs, Façades numériques, Affichage dynamique — présentées à plat, sur un pied d'égalité. Rien ne signale au visiteur, dans les 3 premières secondes, que la transparence/le vitrage est le cœur de métier plutôt qu'une option parmi cinq. Le Hero mentionne déjà "vitrines et façades vitrées" (résultat de la Phase 2), mais tout ce qui suit (SolutionsOverview, page `/nos-solutions`, navigation) retombe immédiatement dans la logique catalogue à 5 familles. C'est exactement l'écart que ce cahier des charges demande de corriger — un repositionnement de surface (Hero) sans repositionnement de structure (arborescence, données, configurateur).

Le configurateur actuel (`Configurator.tsx`) demande "intérieur/extérieur" et une largeur, puis recommande parmi 4 issues possibles (dont "écran LED extérieur grand format" — une famille qui doit sortir de l'offre principale). C'est le composant le plus en décalage avec la nouvelle stratégie : il faut le reconstruire autour de la logique demandée (décrire le projet → KRISALYS recommande film ou écran transparent, jamais l'inverse).

## 2. Architecture actuelle

- **16 routes** : `/`, `/nos-solutions` (5 ancres), `/secteurs` (13 secteurs), `/simulations`, `/configurateur`, `/realisations`, `/notre-methode`, `/maintenance`, `/a-propos`, `/blog` + `/blog/[slug]` (3 articles), `/faq`, `/contact`, `/conditions`, `/confidentialite`, `/mentions-legales`.
- **Données** (`/data`) : `solutions.ts` (5 entrées à plat), `sectors.ts` (13 secteurs, chacun lié à `recommendedSolutionSlug`), `projects.ts` (3 simulations + références internationales), `blog-posts.ts` (3 articles), `method-steps.ts`, `maintenance.ts`, `divisions.ts`, `cities.ts` — tous bilingues via `getX(locale)`.
- **i18n** : contexte client (`LocaleContext`) + résolution serveur (`getServerLocale()`) pour les métadonnées, cookie `krisalys-locale`, aucun routing par segment `[locale]` — 284 clés de dictionnaire FR/EN, parité totale.
- **SEO** : `generateMetadata()` par page, localisé, canonical par page (corrigé Phase 4), pas de hreflang (URLs partagées FR/EN), JSON-LD Organization basique.
- **HubSpot** : Contact + Entreprise (si fournie) + Transaction, best-effort, non testé en conditions réelles (pas de token dans cet environnement).
- **Thème** : variables CSS centralisées (`--knb-*`), Jour/Nuit/Système, chrome (Hero/Navbar/Footer/CTASection) volontairement sombre en permanence.

## 3. Architecture cible proposée

Deux familles technologiques devant tout : **Film LED transparent** et **Écran LED transparent**, chacune avec sa propre page pilier SEO+vente. Les anciennes familles (extérieur classique, intérieur classique, façades numériques génériques, affichage dynamique générique) ne disparaissent pas techniquement — elles deviennent des **variantes de configuration** ou des **cas particuliers d'intégration**, plus jamais des entrées de menu ou de catalogue au même niveau que les deux familles phares.

## 4. Nouvelle arborescence complète des pages

```
/                              (homepage repensée — narration commerciale courte)
/film-led-transparent           (page pilier — NOUVELLE)
/ecrans-led-transparents         (page pilier — NOUVELLE)
/solutions-sur-mesure            (page — NOUVELLE, ex "03 — sur mesure")
/secteurs                        (conservée, contenu réorienté surface vitrée)
/secteurs/{slug}                 (À DÉCIDER — voir section 10 : pages dédiées par secteur, futur SEO cluster)
/configurateur                   (conservée, logique reconstruite)
/simulations                     (conservée, réorganisée par technologie)
/realisations                    (conservée, structure prête pour vraies pages projet futures)
/notre-methode                   (conservée telle quelle — déjà alignée)
/maintenance                     (conservée telle quelle — déjà alignée)
/a-propos                        (conservée)
/blog                            (conservée — nouvelle politique éditoriale, voir section 12)
/blog/{slug}                     (conservée)
/faq                             (conservée, FAQ réorganisée par famille technologique)
/contact                         (conservée)
/conditions, /confidentialite, /mentions-legales  (conservées)

SUPPRIMÉES DE LA NAVIGATION (pas du code) :
- ancres "/nos-solutions#exterieur", "#interieur", "#dynamique" en tant qu'entrées de menu déroulant
```

**Point important** : je recommande de **conserver `/nos-solutions`** comme page de transition ("nos technologies en détail", renvoyant vers les deux pages piliers + solutions sur mesure) plutôt que de la supprimer — elle a déjà des backlinks potentiels et un historique SEO. La renommer ou la supprimer perdrait cet historique sans bénéfice clair. À valider avec toi (voir section 10).

## 5. Nouveau parcours utilisateur

```
Découverte (Hero) → Comprendre la transformation (problème/possibilité)
→ Comprendre les 2 technologies (courte présentation + CTA pages piliers)
→ Voir des applications par secteur (courte sélection + CTA /secteurs)
→ Comprendre que KRISALYS recommande, n'impose pas (message anti-catalogue)
→ Se projeter (configurateur, court résumé + CTA /configurateur)
→ Être rassuré (méthode, résumé visuel + CTA /notre-methode)
→ Voir des preuves (simulations, clairement labellisées)
→ Agir (CTA final : étude / simulation)
```

Ce parcours respecte explicitement la contrainte de la section 23 : la homepage ne duplique pas les pages internes, elle donne juste assez pour donner envie d'aller plus loin.

## 6. Nouvelle logique du configurateur

Reconstruction nécessaire (composant + logique de recommandation) :
- **Ce qui disparaît** : le choix binaire "intérieur/extérieur" comme point de départ, et les 4 recommandations actuelles qui pointent vers des familles génériques.
- **Ce qui apparaît** : le client décrit son projet (ville, type de bâtiment, dimensions, surface vitrée, distance de vision, luminosité, objectif, type de contenu, niveau de transparence recherché, contraintes, budget indicatif) ; le moteur de règles recommande **film LED transparent** OU **écran LED transparent**, avec un pitch/densité présenté systématiquement comme *indicatif, sous réserve de validation technique* — jamais une valeur affirmée comme certaine. Quand les critères ne permettent pas de trancher, le configurateur doit pouvoir répondre littéralement "une étude technique est nécessaire pour confirmer la recommandation" plutôt que de forcer une réponse.
- **Risque technique à signaler** : sans données fabricant réelles sur les pitches disponibles (P10/P8/P6.25 ne sont que des exemples fournis par toi, pas des données validées), le moteur de règles ne peut donner qu'une **fourchette qualitative** (ex. "un pitch plus fin est recommandé pour une vision rapprochée"), jamais un chiffre précis — conforme à la consigne de ne rien inventer.

## 7. Nouvelle architecture des solutions (données)

Proposition de structure (`/data/technologies.ts`, nouveau fichier, sans dupliquer `solutions.ts` par langue) :
```
Technology {
  slug: "film-led-transparent" | "ecran-led-transparent"
  name, shortDescription, description (bilingues via getTechnologies(locale))
  howItWorks: string[]        // "comment ça fonctionne"
  whyUseIt: string[]          // "pourquoi l'utiliser"
  criteria: string[]          // critères de choix (distance, luminosité, transparence...)
  constraints: string[]       // contraintes réelles, jamais inventées
  applications: sectorSlug[]  // lien vers /secteurs
  faqSlugs: string[]          // lien vers FAQ filtrée
}
```
`solutions.ts` actuel ne disparaît pas techniquement : les familles "exterieur/interieur/facades/dynamique" migrent vers un statut de **variante technique** référencée depuis les deux technologies piliers (ex. "un écran LED transparent peut aussi être configuré en variante extérieure renforcée"), plutôt que d'être supprimées — cela évite de perdre le contenu déjà rédigé et vérifié (aucune caractéristique inventée) tout en le remettant à sa juste place hiérarchique.

## 8. Nouvelle stratégie SEO

Architecture en cluster autour de deux pages piliers (`/film-led-transparent`, `/ecrans-led-transparents`), chacune reliée à des contenus satellites (blog majoritairement, éventuellement des sections dédiées par secteur/ville). Mots-clés cibles déjà bien identifiés dans ta demande (film LED transparent Cameroun/Douala, écran LED transparent, vitrine/façade LED transparente, etc.) — cohérents avec ce qui est déjà en place depuis la Phase 4 (`app/layout.tsx` contient déjà plusieurs de ces expressions).

## 9. Pages SEO prioritaires à créer

Par ordre de priorité commerciale et SEO combinée :
1. `/film-led-transparent` (page pilier n°1 — plus proche du positionnement central)
2. `/ecrans-led-transparents` (page pilier n°2)
3. 2-3 articles de blog en cluster autour de ces pages (ex. "Film LED transparent : comment ça fonctionne ?", "Film LED transparent ou écran LED transparent ?") — **le blog contient déjà 3 articles proches de ce sujet, à retravailler plutôt qu'à dupliquer**.
4. `/solutions-sur-mesure` (priorité plus faible, complète l'offre sans être un point d'entrée SEO principal)

## 10. Anciennes pages : suppression / fusion / conservation — POINTS À DÉCIDER

Je ne prends aucune décision définitive ici moi-même sur les points suivants, ce sont des choix stratégiques :

- **`/nos-solutions`** : je recommande **conserver** en la transformant en page de transition vers les 2 pages piliers + solutions sur mesure (voir section 4). Alternative : la supprimer et rediriger 301 vers `/film-led-transparent`. **Ton arbitrage nécessaire.**
- **Ancres `#exterieur`, `#interieur`, `#facades`, `#dynamique`** : je recommande de les retirer du menu déroulant mais de garder le contenu réel (rebaptisé "variantes") accessible depuis les pages piliers. **Ton arbitrage nécessaire** si tu préfères une suppression pure et simple du contenu.
- **Pages dédiées par secteur** (`/secteurs/{slug}`) : mentionnées dans ton cahier des charges comme un cluster SEO futur possible, mais **hors périmètre de cette phase** sauf validation explicite — c'est un chantier de contenu important (13 pages) distinct de la refonte de positionnement.

## 11. Redirections nécessaires

**Aucune URL n'a besoin de changer dans le scénario que je recommande** (option "conserver `/nos-solutions`" ci-dessus) : les 2 nouvelles pages piliers s'ajoutent, rien ne se supprime, donc **0 redirection 301 nécessaire**. Si tu choisis l'option "supprimer `/nos-solutions`", il faudra une redirection 301 `/nos-solutions` → `/film-led-transparent` (ou `/ecrans-led-transparents`, à trancher) pour ne pas perdre l'historique SEO déjà accumulé sur cette route depuis le lancement.

## 12. Risques techniques et SEO

- **Risque SEO principal** : aucun, si on suit le scénario "0 suppression d'URL" — c'est un ajout de contenu, pas un changement de structure existante.
- **Risque de dilution du message si mal exécuté** : garder les 5 anciennes familles visibles au même niveau que les 2 nouvelles technologies phares annulerait tout l'effet du repositionnement — c'est pourquoi la hiérarchie (piliers vs variantes) est le point le plus important de cette proposition, pas juste un détail de menu.
- **Risque configurateur** : reconstruire sa logique de recommandation touche un composant déjà connecté à HubSpot indirectement (les données du configurateur ne sont pas envoyées à HubSpot actuellement, donc pas de risque d'intégration cassée ici).
- **Risque de contenu inventé** : le configurateur ET les futures pages piliers devront systématiquement qualifier toute donnée de pitch/performance comme indicative — j'y serai vigilant à l'implémentation.

## 13. Proposition de nouvelle homepage, section par section

| # | Section | Fonction commerciale |
|---|---|---|
| 1 | **Hero** (déjà aligné depuis Phase 2, à peaufiner légèrement) | Comprendre en 3s : spécialiste vitrage + transparence |
| 2 | **Le problème/la possibilité** (courte, intégrée ou juste sous le Hero) | Une surface vitrée sous-exploitée comme support de communication |
| 3 | **Nos deux technologies** (nouvelle version courte de WhyKrisalys/SolutionsOverview fusionnées) | Film LED transparent vs Écran LED transparent, en 2 blocs courts + CTA vers chaque page pilier — **pas** de description technique complète ici |
| 4 | **Applications** (sélection de 4-6 secteurs, pas les 13) | Se projeter sur son propre bâtiment + CTA `/secteurs` |
| 5 | **Notre approche : étude avant recommandation** (ex-WhyKrisalys, conservé) | KRISALYS analyse avant de vendre |
| 6 | **Votre projet** (résumé très court du principe configurateur) | CTA fort vers `/configurateur` |
| 7 | **Notre méthode** (résumé visuel existant, conservé) | Rassurer sur le processus |
| 8 | **Preuves/simulations** (conservé, clairement labellisé) | Crédibilité honnête |
| 9 | **CTA final** (conservé) | Conversion |

Cette proposition **réduit** le nombre de sections consacrées aux solutions (fusion de WhyKrisalys + SolutionsOverview en une seule section courte) plutôt que de l'augmenter — conforme à la section 23 de ta demande ("ne pas transformer la homepage en site entier").

## 14. Proposition de nouvelle navigation

```
Accueil · Film LED transparent · Écrans LED transparents · Secteurs · Configurateur · Réalisations · Notre méthode · Maintenance · À propos · Blog · FAQ · Contact
```
Suppression du méga-menu déroulant "Nos solutions" à 5 ancres (remplacé par 2 entrées directes vers les pages piliers). `/nos-solutions` resterait accessible (lien depuis les pages piliers ou le footer) sans figurer dans le menu principal, si tu valides l'option "conserver" de la section 10.

## 15. Proposition de structure des données produits/solutions

Voir section 7. En résumé : nouveau fichier `data/technologies.ts` (2 entrées piliers), `solutions.ts` conservé mais requalifié en "variantes techniques" référencées depuis les technologies piliers plutôt que présentées de façon autonome.

## 16. Proposition de stratégie FR/EN

Aucun changement d'architecture i18n nécessaire — le pattern `getX(locale)` déjà en place (sans fichiers dupliqués) s'applique directement aux nouvelles pages/données. Le nouveau contenu (pages piliers, configurateur reconstruit, homepage retravaillée) devra être traduit en anglais **au fur et à mesure de l'implémentation**, avec le même contrôle de parité FR/EN systématique appliqué lors des phases précédentes (244 → 284 clés, 0 écart).

## 17. Plan d'implémentation par phases (proposition)

- **Phase 5a** — Validation de cette proposition + arbitrages (sections 10, 4).
- **Phase 5b** — Nouvelle architecture de données (`technologies.ts`) + 2 pages piliers (contenu FR/EN, sans toucher au reste).
- **Phase 5c** — Reconstruction du configurateur (logique de recommandation).
- **Phase 5d** — Refonte de la homepage (structure section 13) + navigation (section 14).
- **Phase 5e** — Réorientation `/secteurs`, `/simulations`, `/faq` autour des 2 technologies piliers.
- **Phase 5f** — SEO (nouvelles pages dans sitemap, metadata, éventuel cluster blog).
- **Phase 5g** — Contrôle statique final FR/EN + rapport, comme pour les phases précédentes.

---

## Ce que je n'ai pas fait
Aucune ligne de code n'a été modifiée. Ce document attend ta validation, en particulier sur les deux points d'arbitrage de la section 10 (sort de `/nos-solutions` et des ancres), avant que je commence l'implémentation phase par phase.
