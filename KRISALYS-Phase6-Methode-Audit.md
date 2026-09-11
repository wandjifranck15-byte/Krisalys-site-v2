# KRISALYS — Phase 6 : Audit de /notre-methode
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## A. État actuel de /notre-methode

Un seul composant (`MethodePageContent.tsx`) : un hero (eyebrow/titre/description) puis `HowItWorks` (composant partagé, timeline verticale) alimenté par `getMethodSteps(locale)` (`data/method-steps.ts`, 8 étapes), puis un `CTASection` générique. Metadata SEO déjà bilingues (`seo.notreMethode`).

## B. Architecture actuelle

Hero → Timeline 8 étapes → CTA. Pas de section "ce que KRISALYS analyse", pas de distinction analyse/recommandation/conception, pas de lien vers le configurateur ni vers les pages piliers.

## C. Problèmes identifiés — LE PLUS IMPORTANT

**`data/method-steps.ts` (les 8 étapes réellement affichées sur cette page) est resté un contenu générique pré-repositionnement, jamais mis à jour depuis les Phases 1-2.** Les 8 étapes actuelles : *Découverte → Analyse → Simulation → Conseils → Proposition → Installation → Formation → Maintenance*. Aucune ne mentionne : surface vitrée, film LED transparent, écran LED transparent, ni la distinction technologie/configuration. L'étape "Analyse" existe mais reste générique ("exposition, structure de la façade, visibilité") sans lien explicite vers un choix technologique. L'étape "Conseils" fusionne recommandation technologique ET budget en une seule phrase, sans jamais distinguer analyse/recommandation/conception comme demandé à l'Étape 3.

**Autre problème structurel : trois processus différents coexistent sur le site, non harmonisés :**
1. `data/method-steps.ts` (8 étapes, ci-dessus) — utilisé sur `/notre-methode` (intégral) et sur la homepage (`slice(0,5)`, via `HomeMethodAndFaq.tsx`).
2. `dictionary.pilier.accompanimentSteps` (7 étapes : Étude/Recommandation/Conception/Fourniture/Installation/Mise en service/Maintenance) — utilisé sur les deux pages piliers (Phase 4, `TechnologyMethodSummary.tsx`).
3. `dictionary.pages.realisations.designSteps` (6 étapes : Surface/Analyse/Technologie/Configuration/Intégration/Mise en service) — utilisé sur `/realisations` (Phase 5).

**Un visiteur qui consulte successivement la homepage, une page pilier, `/realisations` et `/notre-methode` voit quatre présentations différentes du même processus KRISALYS**, avec des découpages, des noms d'étapes et des nombres d'étapes différents. C'est exactement la question posée à l'Étape 1 ("existe-t-il déjà plusieurs versions du même processus ?") — réponse : oui, trois versions, aucune harmonisée avec les deux autres, et **aucune des trois n'est pleinement alignée avec la distinction analyse/recommandation/conception demandée**.

## D. Doublons avec les autres pages

- Homepage (`slice(0,5)` de `method-steps.ts`) : doublon partiel avec `/notre-methode` (mêmes 5 premières étapes, contenu identique).
- Pages piliers (`accompanimentSteps`) : processus différent mais conceptuellement redondant.
- `/realisations` (`designSteps`) : processus encore différent, également redondant.

## E. Contradictions éventuelles

- `/notre-methode` étape "Conseils" mentionne "le type de solution le plus adapté à votre bâtiment **et à votre budget**" — introduit le budget comme critère de recommandation technologique, ce qui contredit légèrement le principe validé en Phase 3 ("le prix n'intervient jamais dans le choix de la technologie, uniquement dans l'estimation").
- Aucune des 3 listes ne nomme explicitement "Film LED transparent" ou "Écran LED transparent" comme un résultat possible de l'étape recommandation — seule `designSteps` (Réalisations) a une étape "Technologie" isolée, mais sans détailler le principe des deux piliers.

## F. Risques commerciaux / crédibilité

Aucune capacité fictive trouvée (pas de mention de laboratoire, bureau d'études certifié, ingénieurs internes, certifications, etc.) — le contenu reste prudent sur ce plan. Aucune formulation "jeune entreprise"/"lancement"/"à venir" trouvée sur cette page spécifiquement — propre de ce point de vue. Le risque principal est la **confusion du parcours** (pas la malhonnêteté) : le visiteur ne comprend pas clairement où s'arrête l'analyse commerciale et où commence la validation technique (Étape 6 de ta demande), et le mot "étude" n'est jamais défini précisément.

## G. Ce qui doit être conservé

- L'architecture technique : `getMethodSteps(locale)`, composant `HowItWorks` réutilisable, structure bilingue.
- Les étapes commercialement solides et déjà honnêtes : Découverte, Proposition (devis sans engagement), Installation (équipe encadrée, planning communiqué), Maintenance.
- Le principe de timeline visuelle (déjà bien reçu structurellement).

## H. Ce qui doit être supprimé

- Rien à supprimer purement — le contenu actuel n'est pas mensonger, juste désaligné et dupliqué trois fois avec des variantes.
- La duplication elle-même (3 listes différentes) devrait disparaître au profit d'une seule source de vérité, réutilisée avec un niveau de détail variable selon la page (résumé sur pages piliers/réalisations, détail complet sur `/notre-methode`).

## I. Ce qui doit être reformulé

- Réécrire `data/method-steps.ts` pour intégrer explicitement la distinction analyse → recommandation → configuration → conception, avec mention des deux technologies piliers à l'étape recommandation.
- Retirer la mention du budget de l'étape recommandation (la déplacer vers l'étape "Proposition"/devis, où elle a sa place légitime).
- Nommer précisément ce qui est analysé (surface, environnement, usage, contraintes, objectif — Étape 8.D de ta demande) plutôt que la formule vague actuelle.

## J. Architecture recommandée

Je recommande une version proche de ta piste (Étape 8), avec un ajustement : **fusionner C et D** plutôt que les garder séparées, pour éviter de répéter deux fois "ce qui est analysé" (une fois en préambule, une fois dans la timeline détaillée) :

| # | Section | Contenu |
|---|---|---|
| A | Hero | H1 + proposition de valeur + CTA vers `/configurateur` et `/contact` |
| B | Pourquoi une méthode | Chaque surface/projet a ses contraintes — l'analyse précède toujours la recommandation (principe déjà validé Phase 3, reformulé ici) |
| C | Les grandes étapes (timeline enrichie) | Fusion de C+D : chaque étape détaille CE qui est fait ET ce qui est concrètement analysé/déterminé à ce moment — 6-7 étapes réécrites, une seule source de vérité |
| D | De l'analyse à la solution | Paragraphe dédié expliquant explicitement analyse → recommandation (film ou écran) → configuration (pitch, dimensions) → conception (intégration architecturale) — la distinction stratégique de l'Étape 3, actuellement absente |
| E | Après l'installation | Maintenance/assistance/suivi, avec lien vers `/maintenance` (page déjà existante et détaillée — éviter la duplication de contenu, juste un résumé + lien) |
| F | CTA final | Deux CTA distincts et clairement différenciés : "Utiliser le configurateur" (première orientation) et "Demander une étude technique" (validation approfondie) — matérialise la distinction Étape 4 |

## K. Parcours utilisateur recommandé

```
Découverte du positionnement (Hero/pages piliers)
→ /notre-methode : comprendre COMMENT KRISALYS transforme un besoin en solution
→ /configurateur : première orientation basée sur les infos du visiteur
→ /contact : demande d'étude technique approfondie si nécessaire
→ (suivi) /maintenance : accompagnement après installation
```
Ce parcours confirme que `/notre-methode` et `/configurateur` ne se recouvrent pas : la première **explique** le processus, la seconde **l'exécute partiellement** (orientation automatisée). Actuellement, rien sur `/notre-methode` ne renvoie vers `/configurateur` — à corriger (voir maillage, M).

## L. CTA recommandés
- Hero : "Utiliser le configurateur" (`/configurateur`) + lien secondaire "Étudier mon projet" (`/contact`).
- CTA final : reprendre les deux mêmes, reformulés comme un vrai choix ("Vous savez déjà ce que vous voulez configurer ?" / "Vous préférez qu'on étudie votre projet directement ?").

## M. Maillage interne recommandé

**Manquant actuellement, à ajouter** : lien vers `/configurateur` (aucun aujourd'hui), liens vers `/film-led-transparent` et `/ecrans-led-transparents` (pour matérialiser "recommandation = Film ou Écran"), lien vers `/maintenance` (section finale). **Déjà présent, à conserver** : les pages piliers et `/realisations` pointent déjà vers `/notre-methode`.

## N. SEO recommandé

Title/description actuels ("Découvrez les 8 étapes...") devront être ajustés si le nombre d'étapes change (voir point J, 6-7 étapes probables). Champ lexical à intégrer : analyse, recommandation, configuration, conception, film LED transparent, écran LED transparent, surface vitrée — actuellement absent du texte visible de cette page. H1 : à vérifier — `SectionHeading` rend un `<h2>` ici aussi (même limitation que `/realisations` avant correction Phase 5) ; **à corriger dans cette phase si tu valides**, comme pour `/realisations`.

## O. I18N à prévoir

Toute réécriture de `data/method-steps.ts` doit maintenir la parité FR/EN déjà en place (`getMethodSteps(locale)`). Vocabulaire à harmoniser strictement selon ta liste (Étape 9) : "recommandation" pas "conseil", "configuration" pas "paramétrage", etc. — à vérifier aussi dans les 2 autres listes si on les fait converger (points P/R).

## P. Fichiers qui seraient modifiés
`data/method-steps.ts` (réécriture des étapes), `components/pages/MethodePageContent.tsx` (nouvelle structure, H1, nouveaux liens), `types/index.ts` + dictionnaires (nouvelles clés section "de l'analyse à la solution", CTA différenciés), potentiellement `components/pages/HomeMethodAndFaq.tsx` (impact mécanique si `method-steps.ts` change, à vérifier — mais **la homepage elle-même reste non modifiée**, conforme à ta consigne, seul le contenu qu'elle affiche change par ricochet).

## Q. Fichiers qui doivent rester intacts
`lib/configurator/*` (aucune dépendance identifiée), `app/page.tsx` et toute structure de la homepage, `data/maintenance.ts` (page déjà correcte, juste liée), pages piliers et `/realisations` (déjà verrouillées, seul leur contenu de lien vers `/notre-methode` reste valide sans modification).

## R. Points nécessitant ton arbitrage stratégique

1. **Harmonisation des 3 listes de processus** (point C) : dois-je aussi retoucher `dictionary.pilier.accompanimentSteps` (pages piliers) et `dictionary.pages.realisations.designSteps` (Réalisations) pour qu'elles soient des *résumés cohérents* de la même liste maître (`data/method-steps.ts` réécrite), ou seulement corriger `/notre-methode` dans cette phase et traiter l'harmonisation plus tard ? Je recommande de les aligner maintenant (même vocabulaire, même nombre d'étapes conceptuelles) pour éviter de recréer la même incohérence trois pages plus tard — mais c'est une extension de périmètre à valider explicitement, vu ta consigne "ne refactore pas inutilement les pages déjà verrouillées".
2. **Répercussion sur la homepage** (point Q) : la homepage affichera automatiquement les nouvelles étapes réécrites (puisqu'elle consomme `getMethodSteps(locale).slice(0,5)`) sans qu'aucun fichier homepage ne soit touché. Est-ce acceptable, ou préfères-tu que je fige une copie séparée pour ne rien changer visuellement sur la homepage avant sa phase dédiée ?
3. **Nombre final d'étapes** : je recommande 6-7 étapes fusionnant clairement Analyse/Recommandation/Configuration/Conception (actuellement éclatées différemment selon les 3 listes) — d'accord avec cette fusion, ou préfères-tu garder 8 étapes distinctes ?
4. **H1 à corriger sur cette page aussi** (point N) — même traitement que `/realisations` en Phase 5, à confirmer.
5. **Retrait du mot "budget" de l'étape recommandation** (point E) — confirmé aligné avec Phase 3, mais je te le signale car ça modifie une phrase déjà existante avant cette phase.

**J'attends ton "OK" et tes arbitrages sur ces 5 points avant tout codage.**
