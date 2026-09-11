# KRISALYS — Phase 9 : Audit complet de la homepage
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## A. État actuel de la homepage
7 sections : Hero → WhyKrisalys → SolutionsOverview → Projection (BeforeAfterSlider) → Méthode+FAQ (`HomeMethodAndFaq`) → Preuves (`TestimonialsPlaceholder`) → CTA final. Déjà courte (pas de secteurs, pas de maintenance dédiée) — la longueur n'est pas le problème principal.

## B. Structure actuelle section par section
1. **Hero** — déjà réécrit en Phase 2, aligné avec le nouveau positionnement.
2. **WhyKrisalys** — 4 arguments déjà réécrits en Phase 2 (Étude/Solution sur mesure/Conception/Accompagnement).
3. **SolutionsOverview** — ⚠️ **affiche encore les 5 anciennes familles** (`data/solutions.ts`).
4. **Projection** — slider avant/après, générique, aucune référence à l'ancien modèle.
5. **Méthode+FAQ** — déjà migré Phase 6 vers `getMethodSummary(locale, 5)`, propre.
6. **Preuves** — 3 simulations (`data/projects.ts`, déjà migré Phase 5), badge "Simulation" honnête.
7. **CTA final** — générique (`CTASection` sans props).

## C. Ce qui fonctionne
Hero (H1, sous-titre, CTA primaire/secondaire/tertiaire déjà cohérents), WhyKrisalys (terminologie proche du modèle validé), Méthode+FAQ (déjà sur la bonne source de vérité), Preuves (déjà honnête, déjà sur les bonnes données migrées).

## D. Ce qui ne fonctionne plus — LE PLUS IMPORTANT
**`SolutionsOverview.tsx` est le seul point du site où l'ancien catalogue à 5 familles est encore visible en production**, juste après un Hero qui présente pourtant correctement les deux technologies piliers. Un visiteur voit : Hero (positionnement neuf et clair) → **puis immédiatement 5 cartes "Écrans LED transparents / extérieurs / intérieurs / Façades numériques / Affichage dynamique"** — la contradiction la plus visible de tout le site.

## E. Résidus de l'ancien modèle
Uniquement `SolutionsOverview.tsx` et sa dépendance à `data/solutions.ts`/`getSolutions()`. Aucun autre résidu trouvé (Hero, WhyKrisalys, Méthode, Preuves, CTA sont propres).

## F. Analyse de data/solutions.ts
- **A. Ce qui l'utilise encore** : uniquement `SolutionsOverview.tsx` (confirmé — `/secteurs` en a été détaché en Phase 8, `/nos-solutions` utilise déjà `data/technologies.ts` depuis la Phase 2).
- **B. Ce qui peut être remplacé** : entièrement, par `getTechnologies(locale)` (2 entrées piliers, déjà utilisées ailleurs sur le site).
- **C. `SolutionsOverview.tsx` doit être refactoré** : oui — même donnée, même position dans la page, contenu remplacé.
- **D. `data/solutions.ts` pourra être supprimé après migration** : oui, sans perte — son contenu (variantes intérieur/extérieur/façades/dynamique) est déjà préservé dans `data/technologies.ts` (`variants`) depuis la Phase 1.
- **E. Données à conserver ailleurs** : aucune, tout est déjà dupliqué proprement dans `technologies.ts`.

## G. Sections à conserver
Hero, WhyKrisalys, Méthode+FAQ, Preuves, CTA final — toutes déjà alignées ou nécessitant seulement un ajustement mineur.

## H. Sections à supprimer
Aucune section entière à supprimer. Le "Projection" (slider avant/après) reste utile pour la projection visuelle (Étape 21-G), à conserver tel quel.

## I. Sections à fusionner
Aucune fusion nécessaire — la structure actuelle en 7 blocs est déjà proche de l'esprit "porte d'entrée courte" demandé.

## J. Sections à créer
**Aucune obligatoire.** Deux ajouts optionnels à arbitrer (voir AD) : un bloc "Configurateur" plus visible qu'un simple lien Hero, et une bande "Applications" courte (secteurs). Je ne recommande PAS d'ajouter une section Maintenance dédiée : le 4e argument de WhyKrisalys ("Accompagnement dans la durée") remplit déjà ce rôle en une phrase, une section séparée dupliquerait sans apporter de valeur.

## K. Architecture homepage recommandée (ordre exact)
```
1. Hero (inchangé)
2. WhyKrisalys (inchangé, terminologie à vérifier — voir K note)
3. SolutionsOverview → devient "Les deux technologies" (getTechnologies, PAS getSolutions)
4. Projection (inchangé)
5. Méthode + FAQ (inchangé)
6. Preuves (inchangé)
7. CTA final (reformulation légère recommandée)
```
**Note terminologie (WhyKrisalys)** : l'item 1 dit "Étude de votre surface" — le vocabulaire canonique établi en Phase 6 est "Analyse". Écart mineur, à corriger par cohérence si tu valides (pas obligatoire, juste un affinage).

## L. H1 recommandé + variantes
Le H1 actuel est déjà bon et cohérent avec les pages piliers : **"Transformez vos vitrines et façades vitrées en surfaces numériques."** Je ne recommande pas de le changer — c'est un H1 qui exprime déjà le résultat, pas la technologie. Variantes possibles si tu veux tester : (a) *"Vos surfaces vitrées peuvent devenir des supports numériques."* (plus court, même sens) ; (b) *"Transformez une surface vitrée en support de communication numérique."* (insiste sur "communication"). Aucune n'est clairement supérieure à l'actuelle — je recommande de la garder.

## M. Proposition de Hero
Inchangé — déjà conforme (H1 + sous-titre + CTA principal "Demander une simulation gratuite" + CTA secondaire "Découvrir nos solutions" + lien tertiaire configurateur).

## N. CTA principal et secondaire
Déjà cohérents. Seul le CTA final (bas de page) reste générique — je recommande de le rendre spécifique : *"Étudier mon projet"* (`/contact`) en principal, conserver un lien secondaire vers `/configurateur`.

## O. Rôle des deux technologies
`SolutionsOverview` doit devenir la vitrine des 2 piliers (pas 5 familles), chaque carte renvoyant vers sa page pilier respective (`/film-led-transparent`, `/ecrans-led-transparents`) — pas vers `/nos-solutions#slug` comme actuellement.

## P. Rôle des secteurs
**Actuellement absent de la homepage** (aucune section secteurs n'existe dans `app/page.tsx` aujourd'hui). Je ne recommande pas d'en ajouter une : la homepage reste volontairement courte, et `/secteurs` est déjà atteignable depuis la navigation. **Point à arbitrer** si tu penses qu'une bande courte ("Pour qui ?") aiderait la projection.

## Q. Rôle des simulations/réalisations
Déjà bien traité (`TestimonialsPlaceholder`, badge "Simulation" honnête, 3 projets déjà migrés Phase 5). Aucun changement nécessaire.

## R. Rôle du configurateur
**Actuellement sous-exposé** : un seul lien discret dans le Hero. Je recommande un CTA plus visible quelque part dans le parcours (voir AD) sans dupliquer `/configurateur`.

## S. Rôle de la méthode
Déjà correct — résumé de 5 étapes via `getMethodSummary(locale, 5)`, lien implicite via le composant `HowItWorks` (pas de CTA "voir plus" actuellement visible sur cette section précise — à vérifier si un lien vers `/notre-methode` manque ici).

## T. Rôle de la maintenance
Voir J — couvert implicitement par WhyKrisalys, pas de section dédiée recommandée.

## U. Rôle de la FAQ
Déjà correct : 5 questions courtes, pas une deuxième FAQ complète.

## V. Stratégie de conversion
Parcours actuel déjà cohérent : Comprendre (Hero+WhyKrisalys) → Explorer (Technologies) → Se projeter (Projection+Preuves) → Agir (Méthode/FAQ puis CTA). Le seul maillon faible est le manque de visibilité du configurateur en milieu de parcours.

## W. Maillage interne
À corriger : `SolutionsOverview` doit pointer vers les pages piliers (pas `/nos-solutions#slug`). À vérifier/ajouter : lien "voir notre méthode" depuis la section Méthode de la homepage (actuellement absent, seul `/notre-methode` texte existe ailleurs sur le site).

## X. SEO
Metadata actuelles (`seo.home`) déjà bonnes, mentionnent film LED transparent/surfaces vitrées. JSON-LD (`app/layout.tsx`) utilise déjà `siteConfig.description` (cohérent). Aucun changement structurel nécessaire — le remplacement de `SolutionsOverview` améliore aussi la cohérence sémantique on-page (les vrais mots-clés piliers remplaceront les anciens).

## Y. I18N
445+ clés déjà en parité stricte (vérifié phases précédentes). Nouvelles clés nécessaires uniquement pour le contenu de `SolutionsOverview` réécrit (déjà existantes en réalité : `dictionary.pages.home.solutionsEyebrow/Title/Description` existent déjà et peuvent être conservées telles quelles, seule la donnée sous-jacente change).

## Z. Fichiers à modifier
`components/sections/SolutionsOverview.tsx` (migration vers `getTechnologies`), possiblement `data/faq.ts`/`WhyKrisalys` (terminologie mineure si tu valides), `lib/i18n/dictionaries/{fr,en}.ts` (si CTA final reformulé), `app/page.tsx` (si ajout configurateur/secteurs validé).

## AA. Fichiers à conserver
`Hero.tsx`, `data/technologies.ts`, `data/method-steps.ts`, `data/projects.ts`, `HomeMethodAndFaq.tsx`, `TestimonialsPlaceholder.tsx`, `lib/configurator/*`, toute la navigation.

## AB. Fichiers à supprimer éventuellement
**`data/solutions.ts`** — supprimable une fois `SolutionsOverview.tsx` migré, à condition de revérifier qu'aucun autre fichier ne l'importe encore au moment de l'implémentation (rapide grep de confirmation avant suppression effective).

## AC. Risques de régression
Faible : le changement principal (`SolutionsOverview`) est un remplacement de source de données sur un composant déjà isolé, pas une réécriture de la structure de page. Risque résiduel : si `data/solutions.ts` est supprimé prématurément sans revérifier tous ses imports, un import cassé romprait le build — à vérifier avant suppression.

## AD. Points nécessitant ton arbitrage stratégique
1. **Migration de `SolutionsOverview.tsx` vers les 2 technologies piliers + suppression de `data/solutions.ts`** — la recommandation centrale de cet audit, à valider explicitement.
2. **Ajout d'un bloc "Configurateur" plus visible** (section courte dédiée) ou simple renforcement du lien existant dans le Hero — laquelle des deux options ?
3. **Section "Secteurs"/"Pour qui ?"** : ajouter une bande courte, ou laisser la homepage sans cette section (mon inclination) ?
4. **Reformulation du CTA final** (générique aujourd'hui) — d'accord avec "Étudier mon projet" en principal ?
5. **Terminologie "Étude" → "Analyse"** dans le 1er argument de WhyKrisalys — ajustement mineur, à faire ou à laisser tel quel ?

**J'attends ton "OK" et tes arbitrages sur ces 5 points avant tout codage.**
