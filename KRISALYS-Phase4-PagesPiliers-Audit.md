# KRISALYS — Phase 4 : Pages piliers commerciales — Audit & proposition
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## 1. Audit des deux pages actuelles

Les deux pages (`/film-led-transparent`, `/ecrans-led-transparents`) partagent un seul composant : `components/pages/TechnologyPageContent.tsx`, alimenté par `data/technologies.ts` (2 entrées bilingues, créées en Phase 1). Structure actuelle (5 blocs) :
1. En-tête (eyebrow "Technologie 01/02" + nom + description + icône + CTA unique vers `/contact`)
2. Comment ça fonctionne / Pourquoi cette solution (2 colonnes)
3. Critères de configuration + Points à valider
4. Variantes (contextes d'installation — contenu hérité de l'ancien catalogue, Phase 1)
5. Applications (secteurs liés, CTA vers `/secteurs`) + bande finale "vous hésitez ?" vers `/configurateur`

**Aucun texte n'y présente KRISALYS comme nouvelle/en développement** — confirmé par recherche globale ciblée (voir section 11).

## 2. Éléments à supprimer
Rien à supprimer sur ces deux pages spécifiquement — pas de contenu problématique identifié qui nécessiterait une suppression pure.

## 3. Éléments à conserver
- Le contenu factuel de `data/technologies.ts` (howItWorks, whyUseIt, criteria, constraints) — déjà prudent, aucune caractéristique inventée, déjà validé en Phase 1.
- Le principe "variantes" pour l'ancien contenu intérieur/extérieur/façades — déjà conforme à "ne pas transformer en catalogue".
- Le lien vers `/secteurs` et `/configurateur`.
- L'architecture bilingue `getTechnologyBySlug(slug, locale)` — inchangée.

## 4. Éléments à réécrire / enrichir

Comparé à la structure demandée (A→I), il manque une progression narrative claire. La page actuelle est plus "fiche" que "page de vente". Points à retravailler :
- **Hero** : actuellement un simple titre+description+CTA unique. Manque un vrai sous-titre orienté bénéfice et un **second CTA** ("Configurer ma solution" en plus d'"Étudier mon projet" — actuellement un seul CTA).
- **"Le principe"** : la description existe mais n'est pas isolée comme section pédagogique dédiée — actuellement fondue dans le hero.
- **Section "Comment KRISALYS étudie le projet"** : existe déjà (bloc "criteria"), à garder mais à repositionner plus tôt dans la progression narrative (actuellement en 3e position, pourrait suivre directement "pourquoi l'utiliser").
- **Accompagnement KRISALYS (étude → recommandation → conception → fourniture → installation → mise en service → maintenance)** : **n'existe pas actuellement** sur ces pages — c'est un ajout réel, pas une réécriture. Contenu déjà validé ailleurs (page `/notre-methode`), à résumer ici sans dupliquer intégralement.
- **CTA final dédié** : actuellement la page se termine par le bloc générique "vous hésitez ?" (Phase 2) — pas un vrai CTA final "Demander une étude technique" propre à la page.
- **Maillage interne incomplet** : la page ne lie actuellement ni vers `/realisations` ni vers `/notre-methode` — à ajouter (point 10 de ta demande).

## 5. Nouvelle architecture détaillée de chaque page

Structure commune aux deux pages (même composant, contenu différent) :

| # | Section | Contenu | Nouveau/modifié |
|---|---|---|---|
| A | **Hero** | Titre orienté bénéfice + sous-titre (surface vitrée, affichage numérique, transparence selon config, étude personnalisée) + 2 CTA ("Étudier mon projet" → `/contact`, "Configurer ma solution" → `/configurateur`) | Modifié (2e CTA ajouté) |
| B | **Le principe** | Explication simple, sans jargon (reprend `description` existant, isolé visuellement) | Modifié (repositionné) |
| C | **Pourquoi l'utiliser sur une surface vitrée** | Bénéfices réels, sans superlatif (reprend `whyUseIt`) | Conservé |
| D | **Comment KRISALYS étudie le projet** | Critères (reprend `criteria`), avec la phrase explicite "le choix du produit et du pitch intervient après l'analyse du projet" | Conservé + phrase ajoutée |
| E | **Applications** | Secteurs pertinents (reprend `recommendedFor` + `getSectorBySlug`), avec la nuance "chaque projet est étudié individuellement" | Conservé |
| F | **Configuration** | Reprend `variants`, reformulé pour insister sur "plusieurs configurations existent, le choix dépend du projet" — **jamais de tableau P4/P5/P6.25** | Conservé, reformulation légère |
| G | **Points à valider** | Reprend `constraints` | Conservé |
| H | **Accompagnement KRISALYS** | Étude → recommandation → conception → fourniture → installation → mise en service → maintenance, résumé court + lien vers `/notre-methode` et `/maintenance` | **Nouveau** |
| I | **CTA final** | "Demander une étude technique" / "Étudier mon projet" + lien secondaire vers `/realisations` | **Nouveau** (remplace le bloc générique "vous hésitez") |

**Le bloc "vous hésitez entre les deux technologies ?"** (Phase 2, vers le configurateur) : je propose de le **conserver mais le repositionner juste avant le CTA final I**, plutôt que de le supprimer — il reste utile pour les visiteurs indécis, sans dupliquer le rôle de `/nos-solutions`.

## 6. Composants à créer/modifier
- `components/pages/TechnologyPageContent.tsx` — restructuré (nouvelles sections, réordonnancement, second CTA hero).
- **Nouveau petit composant partagé** `components/pages/TechnologyMethodSummary.tsx` (section H), pour éviter de dupliquer le contenu de `/notre-methode` en dur — il affichera une version courte des mêmes étapes, avec lien "voir le détail" vers `/notre-methode`.
- `data/technologies.ts` — pas de changement structurel du type, mais possible enrichissement du texte du `description`/`shortDescription` si tu valides un sous-titre hero plus long (à field-mapper, voir section 9).

## 7. Données utilisées
`getTechnologyBySlug(slug, locale)` (inchangé), `getSectorBySlug` (inchangé), `getMethodSteps(locale).slice(0, X)` pour le résumé de méthode (réutilise les données déjà traduites de Phase 3-adjacent, pas de duplication). Aucune nouvelle donnée technique fournisseur nécessaire — rien à ajouter dans `data/products.ts`.

## 8. CTA prévus
- Hero : "Étudier mon projet" (→ `/contact`) + "Configurer ma solution" (→ `/configurateur`)
- Bloc hésitation (repositionné) : "Utiliser le configurateur" (déjà existant, dictionnaire Phase 1)
- CTA final : "Demander une étude technique" (→ `/contact`) + lien secondaire "Voir nos réalisations" (→ `/realisations`)
Tous cohérents avec le configurateur Phase 3, aucun nouveau CTA générique inventé.

## 9. Stratégie i18n
Toutes les nouvelles chaînes (section H accompagnement, CTA final, sous-titre hero le cas échéant) passeront par `dictionary.pilier.*` (namespace déjà existant, Phase 1) — extension, pas de nouveau namespace. Parité FR/EN vérifiée par le même script de comparaison utilisé aux phases précédentes avant de considérer la phase terminée.

## 10. Stratégie SEO
Metadata actuelles (`seo.filmLedTransparent`/`seo.ecransLedTransparents`, Phase 1) déjà orientées "film LED transparent Cameroun"/"écran LED transparent Cameroun" — je propose de les enrichir légèrement avec "surfaces vitrées"/"façades vitrées" dans la description (actuellement absent), sans toucher au title ni au canonical (déjà corrects depuis la Phase SEO). Maillage interne renforcé mécaniquement par l'ajout des liens vers `/realisations` et `/notre-methode` (section H/I) — bénéfique pour ces deux pages également.

## 11. Vérification "KRISALYS nouvelle/en développement"
**Sur les deux pages piliers elles-mêmes : rien trouvé.** Recherche globale complémentaire (hors périmètre strict, mais je te le signale car ta règle 1 énonce un principe général) : j'ai trouvé 3 occurrences réelles ailleurs sur le site — `dictionary.pages.home.proofsDescription` ("KRISALYS étant en phase de lancement commercial...", section Preuves de la homepage), `dictionary.pages.realisations.description` (même formulation), et `dictionary.founder.photoComingSoon` ("Photo à venir", page À propos). **Je ne les touche pas dans cette phase** (hors périmètre explicite, "ne lance aucune autre refonte hors périmètre") — mais je recommande une Phase 5 dédiée à ce nettoyage, vu que c'est exactement la règle que tu viens d'énoncer.

## 12. Fichiers qui seront modifiés
`components/pages/TechnologyPageContent.tsx`, nouveau `components/pages/TechnologyMethodSummary.tsx`, `types/index.ts` (extension `dictionary.pilier`), `lib/i18n/dictionaries/{fr,en}.ts` (nouvelles clés section H/I + éventuel enrichissement description SEO).

## 13. Fichiers qui ne seront PAS modifiés
`data/technologies.ts` (sauf validation d'un enrichissement optionnel — voir section 9, à confirmer), navigation, `/nos-solutions`, configurateur Phase 3 (aucune incompatibilité identifiée), HubSpot, formulaire Contact, pages légales, thème global, homepage, `/realisations`, `/a-propos` (malgré les formulations trouvées en section 11 — hors périmètre).

---

## Point à confirmer avant codage
Dois-je enrichir `description`/`shortDescription` dans `data/technologies.ts` pour un sous-titre hero plus développé (bénéfice + mention étude), ou préfères-tu que je compose ce sous-titre séparément dans le dictionnaire sans toucher au texte déjà validé en Phase 1 ? Je recommande la seconde option (moins de risque de dérive par rapport au contenu déjà validé).

**J'attends ton "OK" avant toute modification de fichier.**
