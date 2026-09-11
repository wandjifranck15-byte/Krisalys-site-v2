# KRISALYS — Phase 8 : Audit de /secteurs
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## A. État actuel de /secteurs

Un seul composant (`SecteursPageContent.tsx`) : une grille de 12 cartes (`SectorCard.tsx`) puis 12 sections détaillées (une par secteur, ancrées `#slug`), chacune avec problématiques/bénéfices/cas d'usage + **une seule "solution recommandée"** affichée. Aucun `<h1>` réel (même limitation que les pages avant leur phase respective). Metadata SEO déjà bilingues mais génériques.

## B. Architecture actuelle
Hero → grille de 12 cartes → 12 blocs détaillés à plat (pas de regroupement) → CTA générique.

## C. Inventaire des secteurs

| Secteur | `recommendedSolutionSlug` (ancien catalogue) |
|---|---|
| Hôtels | transparent |
| Banques | transparent |
| Centres commerciaux | exterieur |
| Pharmacies | dynamique |
| Restaurants | exterieur |
| Supermarchés | dynamique |
| Concessionnaires automobiles | transparent |
| Cliniques | interieur |
| Immeubles de bureaux | facades |
| Promoteurs immobiliers | facades |
| Universités | interieur |
| Églises | dynamique |

Les 12 secteurs restent commercialement pertinents pour le marché camerounais visé (aucun à supprimer pour manque de pertinence) — le problème n'est pas leur liste, c'est leur traitement technique.

## D. Analyse de recommendedSolutionSlug

**Confirmé : c'est exactement le résidu de l'ancien modèle que la Phase 8 cherche à éliminer.** Chaque secteur pointe vers UNE seule entrée de l'ancien catalogue à 5 familles (`data/solutions.ts` : transparent/exterieur/interieur/facades/dynamique — familles sorties de la présentation principale depuis la Phase 1, mais **jamais retirées de `/secteurs`**, qui était le seul usage légitime identifié et volontairement préservé en Phase 5). Ce n'est ni une préférence, ni un cas d'usage : c'est littéralement une prescription technique automatique — le pattern "Banques → écran X" que le cahier des charges interdit explicitement.

**Usage confirmé (recherche globale)** : `recommendedSolutionSlug` n'est utilisé QUE dans `SecteursPageContent.tsx`. `data/solutions.ts`/`getSolutionBySlug` a un second usage réel : `SolutionsOverview.tsx` (homepage) — **qui reste hors périmètre de cette phase** (consigne "ne pas modifier la homepage"). Conséquence importante : `data/solutions.ts` ne peut pas être supprimé dans cette phase même si `/secteurs` cesse de l'utiliser, puisque la homepage en dépend encore.

## E. Résidus de l'ancien modèle
Uniquement `sector.recommendedSolutionSlug` et son usage dans `SecteursPageContent.tsx`. Aucun autre texte de la page ne mentionne les anciennes familles ("écran extérieur", "façade LED", etc.) — les descriptions (`problems`/`benefits`/`useCases`) sont déjà neutres et ne nomment aucune technologie.

## F. Problèmes identifiés
1. Le point D ci-dessus (le plus important).
2. Absence de `<h1>` réel.
3. 12 blocs détaillés strictement identiques en structure, sans hiérarchie ni regroupement — potentiellement long à parcourir sans apporter de repères.
4. CTA unique par secteur ("Demander une simulation pour...") — pas de second niveau (configurateur, technologie) comme demandé à l'Étape 7.
5. Aucun lien vers `/film-led-transparent`, `/ecrans-led-transparents`, `/realisations` ou `/simulations` depuis les secteurs.

## G. Risques commerciaux
Un visiteur qui explore un secteur puis va sur `/film-led-transparent` peut lire une prescription différente de ce que la fiche secteur suggérait implicitement — incohérence silencieuse entre deux pages du site, pas une erreur visible mais un flou stratégique.

## H. Risques de crédibilité
Aucune donnée inventée (chiffres, clients, normes) trouvée sur cette page — le risque est structurel (rigidité de la prescription), pas un mensonge factuel.

## I. Ce qui doit être conservé
Les 12 secteurs eux-mêmes (noms, icônes, `problems`/`benefits`/`useCases` — contenu déjà honnête et spécifique), l'architecture bilingue `getSectors(locale)`, le CTA de demande de simulation par secteur (à enrichir, pas à remplacer), `data/solutions.ts` (encore utilisé par la homepage, intouchable ici).

## J. Ce qui doit être supprimé
Le champ `recommendedSolutionSlug` en tant que **prescription unique et automatique** — remplacé (voir O) par une formulation qui présente les technologies pertinentes sans figer un choix.

## K. Ce qui doit être reformulé
Chaque bloc secteur doit intégrer une phrase du type Étape 6 ("selon la surface, l'environnement et les objectifs...") plutôt qu'un simple "Solution recommandée : X".

## L. Nombre de secteurs recommandé
**Conserver les 12** — justification : couverture commerciale déjà pertinente pour le marché visé (aucun secteur redondant ni hors-sujet identifié), et le problème de cette page n'est pas sa largeur mais son traitement technique du lien secteur→technologie. Réduire le nombre n'apporterait aucun bénéfice de clarté ; ce qui manque est un regroupement de présentation, pas une réduction de contenu.

## M. Architecture recommandée

Version allégée par rapport à ta proposition (Étape 11), sans ajouter de section E séparée ("Comment choisir") pour éviter d'étirer la page — cette explication peut vivre en une phrase dans le hero/intro plutôt qu'en section dédiée :

| # | Section | Contenu |
|---|---|---|
| A | Hero | H1 + proposition de valeur incluant explicitement "le secteur oriente, l'analyse du projet détermine la solution" + CTA |
| B | Grille secteurs | Inchangée (12 cartes) |
| C | Détail par secteur | Structure actuelle conservée (contexte/besoins/usages), **remplacement de la ligne "solution recommandée" par le nouveau modèle (N)**, CTA à deux niveaux (P) |
| D | CTA final | Configurateur + étude de projet |

## N. Modèle de fiche secteur recommandé

Remplacer la ligne unique "Solution recommandée : X" par un court paragraphe contextuel, généré depuis une donnée structurée plutôt qu'un texte figé par secteur (pour rester maintenable) :
```
technologyContext: "les-deux" | "film-privilegie" | "ecran-privilegie"
```
— un enum à 3 valeurs (pas une slug de solution unique), utilisé uniquement pour choisir **la formulation contextuelle**, jamais pour afficher un nom de produit comme une prescription fermée. Exemple de rendu : *"Selon la surface et le projet, un film LED transparent ou un écran LED transparent peut être étudié pour ce secteur."* — la même structure de phrase pour tous, avec seulement l'emphase qui varie légèrement si un secteur a une tendance dominante (ex. showroom automobile → vitrine existante → film davantage évoqué en premier, sans exclure l'écran). **Point à trancher avec toi (voir V)** : dois-je vraiment garder une nuance par secteur, ou une formulation strictement identique partout est-elle préférable pour ne prendre aucun risque de sur-affirmation ?

## O. Relation secteur → technologie
`secteur → contexte/besoin → analyse du projet → technologie` (jamais l'inverse). Techniquement : `recommendedSolutionSlug: string` (ancien) → `technologyContext: "les-deux" | "film-privilegie" | "ecran-privilegie"` (nouveau, texte généré côté composant via dictionnaire, pas une donnée figée par secteur affichant un nom de produit).

## P. CTA recommandés
Deux niveaux par secteur, cohérents avec l'Étape 7 :
- CTA principal : "Demander une simulation pour [secteur]" (existant, conservé)
- CTA secondaire (texte, discret) : "Configurer une solution" → `/configurateur`

## Q. Maillage interne recommandé
**Contextuel, pas systématique** (conforme à l'Étape 8) : ajouter un lien vers `/configurateur` sur les 12 secteurs (cohérent partout, pas de sur-lien). Ne pas ajouter de lien vers les pages piliers sur chaque secteur (éviterait le "24 liens artificiels" que l'étape 8 met en garde) — sauf si tu préfères que je le fasse quand même pour un ou deux secteurs emblématiques (ex. concessionnaires automobiles → showroom → `/film-led-transparent`, où le lien est réellement informatif). **Réalisations/simulations** : aucun secteur n'a de simulation dédiée dans `data/projects.ts` à l'exception de 3 projets déjà génériques (banque, showroom auto, centre commercial) — je recommande de ne PAS créer de lien secteur→réalisation pour les 9 secteurs sans contenu correspondant, conforme à l'Étape 9 ("ne fabrique pas de lien si aucun contenu pertinent n'existe").

## R. SEO recommandé
Title/description actuels déjà corrects mais génériques. H1 manquant — à corriger (même traitement que les phases précédentes). Champ lexical à renforcer : "solutions LED transparentes", "film LED transparent", "écran LED transparent" — actuellement quasi absents du texte visible de cette page (contrairement aux pages piliers/méthode/maintenance déjà enrichies).

## S. I18N à prévoir
Nouvelles clés pour le H1, l'intro contextuelle, les 3 formulations de `technologyContext`, le CTA secondaire configurateur — à vérifier en parité stricte (445 clés actuellement, 0 écart).

## T. Fichiers qui seraient modifiés
`types/index.ts` (`Sector.recommendedSolutionSlug` → `Sector.technologyContext`), `data/sectors.ts` (migration des 12 entrées × 2 langues), `components/pages/SecteursPageContent.tsx` (H1, nouveau rendu contextuel, CTA secondaire), `lib/i18n/dictionaries/{fr,en}.ts` (nouvelles clés).

## U. Fichiers qui doivent rester intacts
`data/solutions.ts` et `getSolutionBySlug` (toujours utilisés par la homepage), `SolutionsOverview.tsx`, `lib/configurator/*`, homepage, pages piliers, `/notre-methode`, `/maintenance`, `/realisations`, navigation globale.

## V. Points nécessitant ton arbitrage stratégique
1. **Migration de `recommendedSolutionSlug` vers `technologyContext`** (point N/O) — c'est une vraie migration structurelle comme en Phase 5, à valider explicitement.
2. **Nuance par secteur ou formulation strictement identique partout ?** (fin du point N) — je n'ai pas de donnée fournisseur ou commerciale suffisante pour affirmer qu'un secteur "privilégie" une technologie plutôt que l'autre ; je recommande la prudence (formulation identique partout, sans nuance de "privilégié"), sauf si tu as une information commerciale que je n'ai pas.
3. **Lien vers les pages piliers** : contextuel pour 1-2 secteurs emblématiques seulement, ou aucun lien du tout ? Je penche pour aucun lien systématique (Q), mais c'est ton arbitrage.
4. **H1 à corriger sur cette page aussi** — même traitement que les phases précédentes, à confirmer.

**J'attends ton "OK" et tes arbitrages sur ces 4 points avant tout codage.**
