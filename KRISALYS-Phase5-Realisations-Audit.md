# KRISALYS — Phase 5 : Audit de /realisations
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## A. État actuel de /realisations

Un seul composant : `components/pages/RealisationsPageContent.tsx`, deux sections :
1. **Projets KRISALYS** (`data/projects.ts`, 3 entrées, `getProjects(locale)`) — chaque carte (`ProjectCard.tsx`) affiche un badge "Simulation"/"Réalisation" selon `isSimulation` (actuellement `true` sur les 3 → badge "Simulation" affiché systématiquement, honnête).
2. **Références internationales** (`data/projects.ts`, `getExternalReferences(locale)`, 2 entrées) — avec un disclaimer explicite déjà présent ("exemples de technologies existantes, non réalisés par KRISALYS").
Metadata SEO déjà bilingues (`seo.realisations`), title "Réalisations & démonstrations" (EN: "Case studies & demonstrations"), pas de mot-clé "film LED transparent"/"écran LED transparent" dans la description actuelle.

## B. Problèmes identifiés

1. **Incohérence architecturale majeure** : `ProjectCard.tsx` appelle encore `getSolutionBySlug(project.solutionSlug, locale)` — **l'ancien catalogue à 5 familles** (`data/solutions.ts`, jamais retiré), pas les deux technologies piliers (`data/technologies.ts`). Les 3 projets utilisent `solutionSlug: "transparent"` ou `"exterieur"` — des slugs de l'ancien modèle mental que le reste du site a quitté depuis la Phase 1. C'est exactement "l'ancien modèle mental" que tu demandes de vérifier — confirmé, bien présent ici.
2. **Aucun lien entrant** vers `/realisations` depuis la homepage ni depuis `/secteurs` — seule la page pilier (Phase 4) et la page elle-même s'y réfèrent. Maillage entrant faible.
3. **Aucun H1 réel sur la page** : `SectionHeading` (composant partagé) rend systématiquement un `<h2>`, jamais de `<h1>` — problème SEO présent, mais **site-wide, pas spécifique à cette page** (je le signale, sans le corriger seul ici, car ça dépasserait le périmètre de cette phase si non validé).
4. **Le terme "solution"** affiché sur chaque carte ("Solution : Écrans LED transparents") vient de l'ancien catalogue et peut désigner une famille qui n'existe plus dans la présentation principale du site (ex. "Écrans LED extérieurs") — contradictoire avec le repositionnement déjà acté en Phases 1-2.

## C. Risques commerciaux / crédibilité

- **Aucun risque de mensonge actuel** : le badge "Simulation" fonctionne correctement, le disclaimer international est clair. La page est honnête aujourd'hui.
- **Risque de dilution du positionnement** : en affichant "Solution : Écrans LED extérieurs" (ancien vocabulaire), la page réintroduit silencieusement l'ancien discours catalogue que tout le reste du site a abandonné — un visiteur qui arrive sur `/realisations` après `/film-led-transparent` peut être dérouté.
- **Risque de pauvreté perçue** : seulement 3 cartes + 2 références externes, aucune section n'explique pourquoi le portfolio est volontairement modeste (contrairement à d'autres pages du site qui assument leur honnêteté explicitement, ex. l'ancienne mention supprimée en Phase 4).

## D. Ce qui doit être conservé

- Le mécanisme `isSimulation` et son badge — fonctionne, honnête, ne pas y toucher.
- Le principe des "références internationales" clairement disclaimées — bonne pratique déjà en place.
- Les 3 simulations existantes elles-mêmes (contenu factuel, pas de raison de les retirer).
- L'architecture bilingue `getProjects`/`getExternalReferences(locale)`.

## E. Ce qui doit être supprimé

- L'appel à `getSolutionBySlug` (ancien catalogue) dans `ProjectCard.tsx` — à remplacer par une référence à la technologie pilier réelle (`data/technologies.ts`), ou à retirer si la carte n'apporte pas assez de valeur sans lui.
- Rien côté contenu factuel (pas de simulation à supprimer, elles sont légitimes).

## F. Ce qui doit être reformulé

- Le libellé "Solution" sur chaque carte → devrait pointer vers "Film LED transparent" ou "Écran LED transparent" (les vraies technologies piliers), pas vers une ancienne famille.
- Le titre/description de la page pourraient intégrer le champ lexical demandé (film LED transparent, écran LED transparent, intégration, simulation) — actuellement absent du texte visible.
- Envisager de nommer plus explicitement pourquoi le portfolio est volontairement restreint, sans reprendre une formulation "en développement" (déjà proscrite Phase 4) — plutôt une formulation orientée méthode : "Chaque projet présenté ici est traité avec la même rigueur, qu'il s'agisse d'une simulation ou d'une installation."

## G. Architecture de page recommandée

Je recommande de **ne pas renommer "Réalisations"** (l'URL et le terme restent compréhensibles et neutres pour un visiteur, et renommer casserait un lien déjà posé en Phase 4) mais de **restructurer le contenu autour d'une distinction éditoriale à 3 niveaux plutôt que 2** :

1. **Simulations & scénarios d'intégration** (les 3 cartes actuelles, technologie pilier réelle affichée) — "voici comment nous concevons une intégration"
2. **Notre capacité de conception** — une section courte, nouvelle, qui explique concrètement le processus (lien vers `/notre-methode`, sans dupliquer) : analyse de surface → recommandation → conception → configuration, pour démontrer la compétence sans fausse réalisation.
3. **Références technologiques externes** (section existante, conservée telle quelle, disclaimer déjà bon).

Cette architecture est conçue pour ne PAS nécessiter de refonte quand de vraies réalisations arriveront : il suffira d'ajouter des entrées avec `isSimulation: false` dans `data/projects.ts` — la structure de carte, le badge, et la page n'ont pas besoin de changer.

## H. Stratégie pour l'absence de réalisations réelles

Rendre explicite, une fois, en haut de page, la nature du contenu (déjà en partie fait via le badge, mais pas au niveau du titre de page) — sans jamais utiliser "en attendant"/"bientôt"/"en développement" (proscrit Phase 4). Formulation possible : "Cette page présente des simulations et des exemples d'intégration technologique, clairement identifiés comme tels." — factuelle, pas défensive, pas datée dans le temps (contrairement à "en phase de lancement").

## I. Maillage interne recommandé

- **Entrant** : ajouter un lien vers `/realisations` depuis la section "Preuves" de la homepage (`TestimonialsPlaceholder.tsx`) — actuellement cette section montre 3 projets en dur sans lien "voir toutes les simulations" vers `/realisations`. Ajouter aussi un lien discret depuis `/secteurs` (actuellement aucun).
- **Sortant** (déjà bon) : liens vers `/film-led-transparent`/`/ecrans-led-transparents` (via le libellé technologie corrigé, point F), vers `/configurateur` (déjà via CTA générique), vers `/notre-methode` (nouvelle section G2).

## J. SEO recommandé

- **Title** : conserver la structure actuelle, enrichir légèrement avec "surfaces vitrées" (ex. "Réalisations & simulations — Solutions LED pour surfaces vitrées").
- **H1** : signalé en B3 — je recommande de le traiter dans cette même phase uniquement sur `/realisations` (ajout ciblé, sans toucher `SectionHeading` globalement, pour rester dans le périmètre), via un `<h1>` visuellement identique au style actuel du `<h2>`. **Point à valider avec toi avant de le faire**, car c'est une modification qui dépasse le contenu pur.
- **Champ lexical** à intégrer naturellement dans le texte déjà existant : film LED transparent, écran LED transparent, vitrine, façade vitrée, intégration, simulation — pas de bourrage, réparti sur les 2-3 sections.
- **Canonical/OG** : déjà corrects (Phase SEO antérieure), rien à changer structurellement.

## K. Modifications de fichiers envisagées (à valider, pas encore faites)
`components/sections/ProjectCard.tsx` (remplacer `getSolutionBySlug` par la technologie pilier réelle), `components/pages/RealisationsPageContent.tsx` (nouvelle section "Notre capacité de conception", H1 si validé), `lib/i18n/dictionaries/{fr,en}.ts` (nouvelles clés pour la nouvelle section + reformulations), `data/projects.ts` (champ `technologySlug` à ajouter en remplacement de `solutionSlug`, ou mapping — voir point L), `components/sections/TestimonialsPlaceholder.tsx` (ajout lien "voir toutes les simulations" → `/realisations`), `types/index.ts` (type `Project` à ajuster si `solutionSlug` est remplacé).

## L. Éléments nécessitant ta validation stratégique

1. **`Project.solutionSlug` → `Project.technologySlug`** : je recommande de migrer ce champ vers les 2 technologies piliers (`"film-led-transparent"` / `"ecran-led-transparent"`) plutôt que de le laisser pointer vers l'ancien catalogue à 5 familles. C'est un changement de type + données, pas juste un texte — **ton accord nécessaire**.
2. **Ajout d'un vrai `<h1>`** sur cette page spécifiquement (pas un changement global de `SectionHeading`) — **ton accord nécessaire**, car ça sort légèrement du périmètre "contenu uniquement".
3. **Nouvelle section "Notre capacité de conception"** (point G2) : d'accord avec le principe, ou préfères-tu une formulation/contenu différent ?
4. **Lien depuis la homepage** (`TestimonialsPlaceholder`) vers `/realisations` : à ajouter dans cette phase ou une phase séparée dédiée à la homepage (pour respecter "ne pas modifier hors périmètre") ?

**J'attends ton "OK" et tes arbitrages sur les 4 points ci-dessus avant tout codage.**
