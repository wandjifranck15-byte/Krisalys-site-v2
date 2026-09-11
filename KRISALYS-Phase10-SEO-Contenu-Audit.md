# KRISALYS — Phase 10 : Audit SEO + Contenu + Blog + FAQ
**Statut : audit uniquement. Aucun fichier n'a été modifié.**

---

## 1. SCORE GLOBAL DU CONTENU : 78/100
Le contenu structurel (pages piliers, méthode, maintenance, secteurs) est déjà solide et honnête après les Phases 1-9. Le score n'est pas plus élevé à cause de deux zones jamais retouchées depuis le repositionnement : **le Blog** et la **FAQ**, restées sur un vocabulaire pré-repositionnement ("écran LED" générique, sans mention structurée des deux piliers).

## 2. SCORE SEO : 72/100
Metadata des pages piliers/méthode/maintenance déjà excellentes. Pénalité : `/blog`, `/faq`, `/simulations` ont des metadata génériques n'exploitant pas le champ lexical des piliers ; aucune donnée structurée FAQPage/Article ; pas de cannibalisation détectée (bon point).

## 3. SCORE COHÉRENCE AVEC LE NOUVEAU POSITIONNEMENT : 74/100
Aucune réintroduction de l'ancien catalogue commercial nulle part (vérifié Phase 9). La pénalité vient uniquement du Blog et de la FAQ, qui parlent encore d'"écrans LED" comme s'il s'agissait d'une seule technologie générique, sans jamais nommer explicitement les deux piliers ni leur différence.

---

## 4. CARTOGRAPHIE DES PAGES

| Route | H1 réel ? | Intention principale | Pilier concerné | CTA principal | Pointe vers | Pointé par |
|---|---|---|---|---|---|---|
| `/` | non (SectionHeading h2) | Positionnement général | Les deux | Demander une simulation | Piliers, `/nos-solutions`, `/configurateur` | Toutes les pages (nav) |
| `/film-led-transparent` | non | Film LED transparent | Film | Étudier mon projet | Secteurs, config, `/notre-methode`, `/maintenance`, `/realisations` | Nav, homepage, `/nos-solutions`, `/notre-methode` |
| `/ecrans-led-transparents` | non | Écran LED transparent | Écran | Étudier mon projet | idem | idem |
| `/nos-solutions` | non | Passerelle 2 technologies | Les deux | Configurateur | 2 piliers, configurateur | Nav |
| `/secteurs` | oui (Phase 8) | Contexte par secteur | Les deux (neutre) | Simulation + configurateur | `/notre-methode`, `/configurateur` | Nav, piliers (implicite) |
| `/realisations` | oui (Phase 5) | Preuve honnête | Les deux | Étudier/configurer | `/notre-methode` | Piliers |
| `/notre-methode` | oui (Phase 6) | Processus | Neutre | Configurateur / étude | 2 piliers, `/configurateur`, `/maintenance` | Piliers, `/maintenance`, `/secteurs` |
| `/maintenance` | oui (Phase 7) | Après-installation | Neutre | Contact | `/notre-methode` | Piliers, `/notre-methode` |
| `/configurateur` | non | Outil d'orientation | Les deux | Soumission formulaire | — | Nav, homepage, piliers, secteurs, méthode |
| `/simulations` | non | Visualisation | Les deux | Configurateur | Configurateur | Nav |
| `/contact` | non | Conversion | — | Formulaire | — | Toutes les pages (CTA) |
| `/blog` + articles | non | Éducation | Faible/aucune | Aucun net | Aucun lien interne vers piliers | Nav |
| `/faq` | non | Objections | Générique | Aucun | `/notre-methode`, `/maintenance` (texte, pas lien HTML) | Nav |

**Absence de `<h1>` réelle** sur : homepage, pages piliers, `/nos-solutions`, `/configurateur`, `/simulations`, `/contact`, `/blog`, `/faq` — `SectionHeading` rend systématiquement un `<h2>`. Ce n'est pas propre à cette phase (déjà signalé au fil des phases précédentes), mais je le consolide ici car l'Étape 2 le redemande explicitement.

## 5. MÉTADONNÉES À MODIFIER

**A. Déjà bonnes** : `home`, `filmLedTransparent`, `ecransLedTransparents`, `nosSolutions`, `secteurs`, `realisations`, `notreMethode`, `maintenance`, `contact`, `aPropos`.

**B. À améliorer** :
| Fichier | Page | Problème | Proposition |
|---|---|---|---|
| `lib/i18n/dictionaries/{fr,en}.ts` | `/blog` | Title/description ne mentionnent ni film ni écran LED transparent | Ex. FR : *"Blog KRISALYS — Film LED transparent, écran LED transparent et intégration"* |
| idem | `/faq` | Description dit "solutions d'écrans LED" (générique, pré-repositionnement) | *"...sur nos solutions de film LED transparent et d'écran LED transparent."* |
| idem | `/simulations` | Title "Simulations de façades LED" ne nomme pas les piliers | *"Simulations film LED transparent & écran LED transparent"* |

**C. À refaire complètement** : aucune — pas de metadata fondamentalement fausse ou trompeuse trouvée.

**D. À laisser inchangées** : `conditions`, `confidentialite`, `mentionsLegales` (pages légales, pas de valeur SEO à optimiser), `aPropos` (intention différente, déjà correcte).

## 6. BLOG

3 articles existants (`data/blog-posts.ts`), tous bilingues, contenu factuel et prudent (aucune donnée inventée) :

| Article | Verdict | Raison |
|---|---|---|
| "Pourquoi installer un écran LED sur une façade ?" | **3. RÉORIENTER** | Titre et contenu emploient "écran LED" comme terme générique — à réorienter vers "façade LED transparente" ou à scinder pour clarifier qu'il s'agit d'un des deux piliers, pas d'un terme générique de catalogue. Risque de cannibalisation légère avec `/ecrans-led-transparents` (même intention de recherche, contenu plus superficiel — la page pilier doit rester la page de référence). |
| "Les avantages des écrans LED transparents" | **2. AMÉLIORER** | Déjà proche du bon sujet (transparence), mais le titre dit "écrans" alors que le contenu pourrait s'appliquer aux deux technologies — clarifier ou ajouter un lien explicite vers les deux pages piliers. |
| "Comment moderniser une agence bancaire ?" | **1. CONSERVER** | Bon sujet sectoriel, cohérent avec le nouveau discours (étude → configuration), pas de terme catalogue problématique. |

**5. Nouveaux articles à envisager** (voir section 10 pour la priorisation) : un article dédié "Film LED transparent : comment ça fonctionne ?" ferait pendant à l'article écran existant et manque clairement aujourd'hui (déséquilibre éditorial : 2-3 articles évoquent l'écran, zéro évoque le film spécifiquement).

## 7. FAQ

**Constat central : la FAQ n'a jamais été retouchée depuis le repositionnement.** Sur 9 questions, aucune ne nomme "film LED transparent" ou "écran LED transparent" — le vocabulaire reste "écran LED" générique partout ("Les écrans résistent-ils...", "durée de vie d'un écran LED", "Combien coûte un projet d'écran LED"). C'est cohérent avec les données déjà honnêtes (rien d'inventé), mais désaligné du nouveau positionnement à deux piliers.

**Questions absentes, importantes** :
- *"Quelle est la différence entre film LED transparent et écran LED transparent ?"* — question la plus attendue et actuellement absente, malgré toute l'architecture construite autour de cette distinction depuis la Phase 1.
- *"Comment savoir si mon projet nécessite un film ou un écran LED transparent ?"* (renvoyant vers configurateur/étude).

**Conserver** : les 9 questions existantes restent factuellement valides (aucune fausse info), simplement à généraliser/reformuler pour couvrir les deux technologies plutôt qu'une seule implicite.
**Redondantes** : aucune détectée.
**Trop génériques** : "Les écrans consomment-ils beaucoup d'électricité ?" et "durée de vie d'un écran LED" — pourraient s'appliquer sans distinction, à condition de généraliser le vocabulaire ("solution LED" plutôt que "écran").
**Risque de catalogue** : léger, sur "Combien coûte un projet d'écran LED ?" — sous-entend qu'écran LED est le produit par défaut.

## 8. MAILLAGE INTERNE

| Source | Destination | Raison | Ancre proposée | Priorité |
|---|---|---|---|---|
| Blog (les 3 articles) | Pages piliers concernées | Actuellement **aucun lien interne** depuis les articles vers les pages piliers — trou de maillage confirmé | "En savoir plus sur le film/écran LED transparent" | **HAUTE** |
| FAQ | Pages piliers | Aucune question ne renvoie vers `/film-led-transparent` ou `/ecrans-led-transparents` | Lien contextuel sur la future question "différence film/écran" | **HAUTE** |
| `/simulations` | Pages piliers | Page orientée technologie mais sans lien direct vers les fiches piliers | "Découvrir le film/écran LED transparent" | MOYENNE |
| `/blog` (index) | `/configurateur` | Aucun CTA de conversion depuis le blog actuellement | "Configurer mon projet" | MOYENNE |
| Homepage | `/blog` | Aucun lien vers le blog depuis la homepage actuellement (probablement volontaire, homepage courte) | — | FAIBLE (ne pas forcer) |

## 9. RISQUES DE CANNIBALISATION
**Un seul risque réel, faible** : article de blog "Pourquoi installer un écran LED sur une façade ?" vs `/ecrans-led-transparents` — même intention de recherche approximative. Résolution recommandée : l'article doit clairement se positionner comme un contenu d'introduction/éducation qui renvoie vers la page pilier (page de référence pour la conversion), pas comme une page concurrente. Aucune autre cannibalisation détectée — `/simulations` vs `/realisations` vs `/configurateur` ont des intentions suffisamment distinctes (visualiser / preuve / agir).

## 10. FR / EN — DIVERGENCES
Aucune divergence de sens significative trouvée dans les zones auditées (metadata, FAQ, blog) au-delà de la parité déjà vérifiée clé par clé lors des phases précédentes (452 clés, 0 écart au dernier contrôle). Les traductions du blog et de la FAQ restent fidèles, pas de traduction littérale ayant modifié le positionnement.

## 11. SEO TECHNIQUE
- **Sitemap** : toutes les routes présentes, y compris les articles de blog dynamiques, priorités cohérentes (piliers à 0.9). Rien à signaler.
- **Robots** : simple et correct (`allow: /`), rien à signaler.
- **Canonical** : géré par page via `buildMetadata()` (Phase SEO), cohérent.
- **JSON-LD** : uniquement un schema `Organization` global (layout), aucune référence à l'ancien catalogue. **Absent** : pas de schema `Article` pour les articles de blog, pas de schema `FAQPage` pour `/faq` — opportunités manquées (voir plan de modification, catégorie UTILE).
- **Indexation** : aucune page ne devrait être `noindex` à ce stade — toutes les pages ont un contenu réel et légitime.

## 12. ANCIENNES RÉFÉRENCES
- **Légitimes** (à ne pas toucher) : "affichage dynamique" utilisé génériquement (fonctionnalité, pas catégorie), mentions dans des commentaires de code historiques, références internationales déjà disclaimées.
- **À reformuler** : le vocabulaire "écran LED" générique dans la FAQ et 2 des 3 articles de blog (voir sections 6-7) — pas une "ancienne référence" au sens strict d'un résidu de catalogue, mais un vocabulaire pré-repositionnement qui n'a jamais suivi la mise à jour terminologique des autres pages.
- **À supprimer** : rien.

## 13. PLAN DE MODIFICATION RECOMMANDÉ

**CRITIQUE** : aucun (rien de trompeur ou de contradictoire au point de nuire à la crédibilité).

**IMPORTANT** :
- Réécrire les 9 questions FAQ pour couvrir les deux piliers + ajouter la question "différence film/écran" manquante.
- Ajouter des liens internes blog → pages piliers (les 3 articles).
- Améliorer les metadata `/blog`, `/faq`, `/simulations` (section 5B).

**UTILE** :
- Article dédié "Film LED transparent : comment ça fonctionne ?" pour rééquilibrer l'autorité thématique.
- Schema JSON-LD `FAQPage` sur `/faq`.
- Lien `/simulations` → pages piliers.

**OPTIONNEL** :
- Schema `Article` pour le blog.
- Vrais `<h1>` sur les pages qui n'en ont toujours pas (chantier transversal déjà identifié dans les phases précédentes, jamais traité globalement — seulement page par page à chaque phase concernée).

## 14. FICHIERS QUI DEVRAIENT ÊTRE MODIFIÉS (si tu valides une Phase 11)
`data/faq.ts`, `data/blog-posts.ts` (liens internes + léger ajustement titre/contenu article 1), `lib/i18n/dictionaries/{fr,en}.ts` (metadata blog/faq/simulations), `components/pages/BlogPostContent.tsx` (ajout lien pilier), possiblement `app/faq/page.tsx` (JSON-LD FAQPage).

## 15. FICHIERS QUI NE DOIVENT PAS ÊTRE TOUCHÉS
`lib/configurator/*`, `data/technologies.ts`, `data/sectors.ts`, `data/method-steps.ts`, `data/maintenance.ts`, toutes les pages piliers et pages commerciales (déjà verrouillées et alignées), navigation, thème, homepage.

## 16. ESTIMATION DU RISQUE DE RÉGRESSION
**Faible.** Les modifications recommandées touchent exclusivement du contenu éditorial (FAQ, blog, metadata) sans toucher à l'architecture, aux types, ni au configurateur. Le seul risque technique serait une rupture de parité FR/EN si les nouvelles questions FAQ ne sont pas traduites en miroir exact — à vérifier systématiquement comme lors des phases précédentes.

---

## Limites de cet audit
Vérifications effectuées uniquement par lecture statique du code et des données (pas de rendu réel, pas de crawl SEO réel, pas d'outil d'audit externe). Aucun build/lint n'a été lancé (accès réseau npm toujours bloqué dans cet environnement, comme documenté à chaque phase précédente).

**J'attends ton arbitrage avant toute implémentation (Phase 11 éventuelle).**
