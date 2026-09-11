# KRISALYS — Phase 7 : Audit de /maintenance
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## A. État actuel de /maintenance

Page simple : hero (eyebrow/titre/description) + grille de 6 cartes (`getMaintenanceOfferings(locale)`, `data/maintenance.ts`) + un CTA générique. C'est un **mélange des trois natures** que tu évoques : commerciale (positionnement "KRISALYS reste à vos côtés"), informative (liste de prestations), et légèrement support (assistance technique) — sans être clairement structurée autour d'aucune des trois.

## B. Architecture actuelle
Hero → grille 6 cartes à plat (aucune hiérarchie ni catégorisation visuelle entre maintenance/support/formation) → CTA unique.

## C. Problèmes identifiés
1. **Aucune distinction maintenance/support/garantie** (Étape 3) : les 6 cartes mélangent maintenance préventive, maintenance corrective, assistance technique (support), mise à jour de contenu, formation et "accompagnement" (catch-all vague) sur un pied d'égalité visuel, sans regroupement conceptuel.
2. **"Garantie" n'est jamais mentionnée** — ni pour l'inventer (bon point), ni pour clarifier qu'elle est distincte de la maintenance (point manquant, à corriger selon toi).
3. **Petite incohérence avec `data/faq.ts`** : la FAQ "après-vente" renvoie vers `/maintenance` en disant *"Voir la page Maintenance & Support pour le détail des offres"* — mais la page actuelle ne présente pas d'"offres" au sens de forfaits/formules, seulement une liste plate de prestations. Le mot "offres" suggère une structure commerciale (packages) qui n'existe pas.
4. **Aucun lien vers `/notre-methode`** actuellement (la Phase 6 a bien ajouté un lien `/notre-methode → /maintenance`, mais pas l'inverse).
5. **Aucun lien vers les pages piliers** (`/film-led-transparent`, `/ecrans-led-transparents`).

## D. Capacités actuellement établies (à ne pas dépasser)
Maintenance préventive (contrôles réguliers), maintenance corrective ("selon les délais convenus **dans le contrat de suivi**" — formulation déjà prudente, renvoie à un contrat à définir, pas une promesse universelle), assistance technique (point de contact dédié), mise à jour de contenu, formation des équipes client, accompagnement dans la durée. **Rien au-delà** : aucune mention de 24/7, SLA, astreinte, hotline, stock de pièces, délai d'intervention chiffré, certification, couverture géographique — confirmé par recherche ciblée, la page est déjà prudente sur ce plan.

## E. Promesses à supprimer ou reformuler
- Le mot "offres" dans `data/faq.ts` (renvoi vers `/maintenance`) — à reformuler pour ne pas suggérer des forfaits qui n'existent pas (ex. "pour le détail de notre accompagnement" plutôt que "des offres").
- Aucune autre promesse à supprimer sur `/maintenance` elle-même — le contenu existant est déjà honnête, le travail est surtout un manque de structure/clarté, pas un excès de promesses.

## F. Distinction maintenance / support / SAV / garantie
Recommandation : structurer visuellement la page autour de 3 blocs (pas 6 cartes à plat) :
- **Maintenance** (préventive + corrective) — garder le vocabulaire du contrat de suivi, sans détail chiffré.
- **Support / assistance** (assistance technique + diagnostic) — reformulé pour insister sur l'orientation vers l'intervention appropriée (cohérent avec ta proposition D "Support et diagnostic"), sans jamais dire "24/7" ou "hotline".
- **Accompagnement de la solution** (mise à jour de contenu + formation) — regroupés car tous deux liés à l'usage quotidien de la solution par le client, pas à une panne.
**Garantie** : je recommande une phrase courte et honnête expliquant qu'elle relève des conditions contractuelles définies projet par projet (pas une section détaillée, faute de données établies) — pour éviter le silence total qui pourrait laisser une ambiguïté, sans rien inventer.

## G. Ce qui doit être conservé
Les 6 prestations existantes (contenu factuel, déjà prudent), le principe "selon les délais convenus dans le contrat de suivi" (formulation déjà conforme à l'Étape 4 — "selon les conditions d'accompagnement retenues"), l'architecture bilingue `getMaintenanceOfferings(locale)`.

## H. Ce qui doit être supprimé
Rien à supprimer côté contenu factuel. Seul le mot "offres" dans la FAQ (point E) mérite un ajustement.

## I. Ce qui doit être reformulé
- Regroupement visuel des 6 prestations en 3 blocs thématiques (maintenance/support/accompagnement) plutôt qu'une grille plate — pas une réécriture du contenu, une réorganisation.
- Ajout d'une phrase courte sur la garantie (point F).
- Le hero pourrait mentionner explicitement "film LED transparent" et "écran LED transparent" pour le champ lexical SEO (actuellement absent).

## J. Architecture recommandée

Je recommande une version allégée de ta proposition (Étape 5), fusionnant C+D+E en un seul bloc à 3 groupes plutôt que 3 sections séparées C/D/E — pour éviter d'étirer artificiellement une page dont le contenu réel reste volontairement modeste (6 prestations, pas un catalogue de services étendu) :

| # | Section | Contenu |
|---|---|---|
| A | Hero | H1 + proposition de valeur (mentionnant les deux technologies) + CTA |
| B | Pourquoi l'accompagnement compte | Une solution LED reste un système à faire vivre dans la durée — reformulation courte, pas une nouvelle promesse |
| C | Ce que couvre notre accompagnement | Les 6 prestations existantes, regroupées en 3 blocs (Maintenance / Support & diagnostic / Accompagnement de la solution) — **F. "Selon le projet"** intégré comme phrase de clôture de ce bloc plutôt que section séparée : "Les modalités précises sont définies selon la solution installée et le contrat retenu." |
| D | Garantie | Phrase courte et honnête (point F) |
| E | CTA final | "Demander un accompagnement" + lien secondaire vers `/notre-methode` |

## K. Parcours utilisateur recommandé
```
/notre-methode (dernière étape "Maintenance et accompagnement") → /maintenance (approfondissement)
/film-led-transparent, /ecrans-led-transparents (section H "Accompagnement KRISALYS") → /maintenance (déjà en place, Phase 4)
/maintenance → /notre-methode (nouveau lien retour, Étape 6) et /contact (CTA)
```

## L. CTA recommandés
CTA final unique mais reformulé : "Demander un accompagnement" (`/contact`) — plus précis que l'actuel "Échanger avec un conseiller" qui est correct mais générique. Lien secondaire texte vers `/notre-methode` ("Voir l'ensemble de notre méthode").

## M. Maillage interne recommandé
**Manquant, à ajouter** : lien vers `/notre-methode` (retour), liens vers les deux pages piliers (optionnel, faible priorité — la maintenance ne diffère pas techniquement entre les deux technologies selon les données disponibles, donc un lien n'est pas indispensable). **Déjà présent, à conserver** : pages piliers et `/notre-methode` pointent déjà vers `/maintenance`.

## N. SEO recommandé
Title/description actuels déjà corrects mais génériques ("Maintenance & Support"). Champ lexical à intégrer naturellement : maintenance écran LED transparent, maintenance film LED transparent, support, diagnostic, installation, mise en service, accompagnement — actuellement absent du texte visible. H1 : même limitation que les pages précédentes (`SectionHeading` rend un `<h2>`) — **à corriger dans cette phase si tu valides**, comme pour `/realisations` et `/notre-methode`.

## O. I18N à prévoir
Vocabulaire à harmoniser selon ta liste (Étape 13) : remplacer "Assistance technique" par un intitulé cohérent avec "Support" partout, "Mise à jour des contenus" à conserver tel quel (pas de synonyme nécessaire), parité FR/EN à revérifier après toute modification (435 clés actuellement, 0 écart).

## P. Traitement recommandé de data/maintenance.ts
**Conserver et enrichir sur place** plutôt que restructurer profondément — les 6 entrées restent utilisées uniquement ici (confirmé, aucun autre composant ne consomme `getMaintenanceOfferings`). Je recommande d'ajouter un champ optionnel `group: "maintenance" | "support" | "accompagniment"` à chaque entrée (même principe que `MethodStepCategory` en Phase 6) pour permettre le regroupement visuel en 3 blocs (point F/J) sans dupliquer le texte — cohérent avec l'architecture déjà choisie en Phase 6.

## Q. Fichiers qui seraient modifiés
`data/maintenance.ts` (ajout du champ `group`), `types/index.ts` (`MaintenanceOffering` + nouvelles clés dictionnaire), `components/pages/MaintenancePageContent.tsx` (H1, regroupement visuel, section garantie, maillage), `lib/i18n/dictionaries/{fr,en}.ts` (nouvelles clés : H1, garantie, CTA reformulé), `data/faq.ts` (reformulation du mot "offres").

## R. Fichiers qui doivent rester intacts
`lib/configurator/*`, homepage, pages piliers (structure — seul un lien optionnel pourrait s'ajouter, faible priorité, à ta discrétion), `/notre-methode` et `/realisations` (déjà verrouillées), navigation globale.

## S. Points nécessitant ton arbitrage stratégique
1. **Regroupement en 3 blocs** (maintenance/support/accompagnement) plutôt que les 6 cartes actuelles à plat — d'accord avec ce principe ?
2. **Ajout d'une section "Garantie"** courte et honnête (renvoyant aux conditions contractuelles, sans rien détailler) — souhaites-tu vraiment l'introduire, ou préfères-tu qu'elle reste absente tant qu'aucune politique de garantie n'est définie ? Je n'ai pas de moyen de savoir si KRISALYS a déjà une politique de garantie non documentée sur le site.
3. **H1 à corriger sur cette page aussi** — même traitement que les phases précédentes, à confirmer.
4. **Reformulation du mot "offres" dans `data/faq.ts`** — cette phase touche un fichier hors du périmètre strict "/maintenance" à proprement parler ; confirmes-tu que je peux le faire (changement d'un mot, pas une refonte de la FAQ) ?
5. **Lien optionnel maintenance ↔ pages piliers** — à ajouter ou à laisser de côté (faible valeur ajoutée à mon avis, mais je te laisse trancher) ?

**J'attends ton "OK" et tes arbitrages sur ces 5 points avant tout codage.**
