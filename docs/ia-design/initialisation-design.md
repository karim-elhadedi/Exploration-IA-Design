# Initialisation Design : Cultures Régionales de France

**Date** : 2026-06-10  
**Projet** : Site de l'État sur les cultures régionales de France  
**Design System** : DSFR v1.14  

---

## 1. Fondamentaux de Design

### Design System : DSFR v1.14
Le projet s'appuie intégralement sur le **Système de Design de l'État (DSFR)**, qui fournit :
- ✅ Composants réutilisables et accessibles
- ✅ Tokens de design (couleurs, typographie, espacement)
- ✅ Modèles de pages
- ✅ Pictogrammes institutionnels

**Ressources DSFR :**
- [Composants](https://www.figma.com/design/hmfdZF1QGqIGV9hZOOU1aD/DSFR---Composants---v1.14--Community-?node-id=1116-58277)
- [Modèles](https://www.figma.com/design/PzTfq1o4h0E5Cudv1FIdQV/DSFR---Mod%C3%A8les---V1.14--Community-?node-id=1-84)
- [Pictogrammes](https://www.figma.com/design/Rg1zIcS5RawUqGOC8thgax/DSFR---Pictogrammes---V1.14--Community-?node-id=90-1966)
- [Fondamentaux](https://www.figma.com/design/jXLzKp9flzNIHhlk2Rml71/DSFR---Fondamentaux---v1.14--Community-?node-id=1-139)

### Principes de Conception Appliqués
1. **Fidélité au design system** — Jamais inventer un composant, toujours réutiliser.
2. **Accessibilité d'abord** — WCAG 2.1 AA à minima.
3. **Sobriété visuelle** — Pas de surcharge, hiérarchie claire.
4. **Éco-conception** — Minimalisme, performance, réduction de charge.
5. **Cohérence institutionnelle** — Branding État homogène.

---

## 2. Palette & Tokens

### Couleurs DSFR Appliquées

| Rôle | Token DSFR | Utilisation |
|---|---|---|
| **Principal** | `--color-decisions-border-raised-grey` | Éléments interactifs clés, CTAs |
| **Accent région** | `--color-decisions-border-action-high-blue-france` | Différenciation par région (variant par région) |
| **Texte principal** | `--color-text-default-grey` | Corps de texte |
| **Texte secondaire** | `--color-text-muted-grey` | Métadonnées, labels |
| **Succès** | `--color-decisions-border-success-green` | Confirmations |
| **Alerte** | `--color-decisions-border-warning-orange` | Avertissements |
| **Erreur** | `--color-decisions-border-error-red` | Erreurs |
| **Fond** | `--color-background-default-grey` | Surfaces neutres |

### Variantes par Région
Chaque région aura une **teinte accentuelle secondaire** pour différenciation visuelle légère :
- **Bretagne** : Bleu-gris (maritime)
- **Pays Basque** : Rouge/Vert (traditionnel)
- **Normandie** : Bleu clair (côtier)
- **Landes** : Vert-marron (forestier)
- *Autres* : À définir

*(Toujours rester dans la palette DSFR, pas d'ajouts externes)*

### Typographie DSFR

| Élément | Typo DSFR | Utilisation |
|---|---|---|
| **Titres H1** | `--font-size-heading-lg` | Titres de pages, sections majeures |
| **Titres H2** | `--font-size-heading-md` | Sections secondaires |
| **Titres H3** | `--font-size-heading-sm` | Sous-sections |
| **Body** | `--font-size-body-md` | Texte courant |
| **Label** | `--font-size-label-md` | Labels, métadonnées |

**Famille** : Font DSFR définie (Marianne ou Raleway selon configuration).

---

## 3. Mise en Page (Layout)

### Grille & Espacements
- **Grille** : 12 colonnes (responsive : 4 cols mobile, 8 cols tablet, 12 cols desktop)
- **Espacement** : Multiples de 8px (token DSFR : `--spacing-`)
  - `--spacing-1` = 4px (minimal)
  - `--spacing-2` = 8px (standard)
  - `--spacing-3` = 16px (section)
  - `--spacing-4` = 24px (major)

### Breakpoints Responsive
```
Mobile    : < 576px (4 cols)
Tablet    : 576px - 992px (8 cols)
Desktop   : ≥ 992px (12 cols)
```

### Zones d'Interface (Header / Main / Footer)

```
┌─────────────────────────────┐
│        DSFR Header          │  (Logo, Nav principale, Search)
├─────────────────────────────┤
│                             │
│      CONTENU PRINCIPAL      │  (Grille 12 cols, responsive)
│                             │
├─────────────────────────────┤
│        DSFR Footer          │  (Legal, liens secondaires)
└─────────────────────────────┘
```

---

## 4. Composants DSFR Utilisés

### Navigation & Structure

| Composant | Rôle | Comportement |
|---|---|---|
| **Header DSFR** | Banneau supérieur institutionnel | Logo + Nav principale + Langue |
| **Navigation locale** | Menu horizontal sous header | Navigation par région + thème |
| **Breadcrumb** | Fil d'Ariane | Contexte de localisation |
| **Footer DSFR** | Pied de page institutionnel | Liens légaux + contact |

### Contenu & Présentation

| Composant | Rôle | Variantes |
|---|---|---|
| **Card** | Préview région, événement, article | Avec image, badge, CTA |
| **Badge** | Étiquettes de catégorie | Thème, région, type d'événement |
| **Callout / Alert** | Informations destacadas | Info, success, warning, error |
| **Tabs** | Contenu par onglets | Pour sections (Histoire, Traditions, etc.) |
| **Accordion** | Contenu replié/déroulé | FAQ, détails secondaires |

### Interactivité

| Composant | Rôle | Utilisation |
|---|---|---|
| **Button** | CTA primaire/secondaire | Exploration, partage, contact |
| **Input / Search** | Recherche et filtrage | Moteur de recherche principal |
| **Select / Dropdown** | Filtres | Par région, par thème |
| **Modal / Dialog** | Lightbox, confirmations | Partage, inscription |

### Data & Listes

| Composant | Rôle | Adaptation |
|---|---|---|
| **Table** | Événements, ressources | Responsive (card view mobile) |
| **List** | Contenus énumérés | Histoire, traditions, artisanat |
| **Pagination** | Navigation multi-pages | Si contenu > 1 page |

---

## 5. Pages Prioritaires & Layouts

### Page 1 : Accueil

**Sections :**
1. **Hero DSFR** — Titre + intro courte + CTA
2. **Card Grid (3-4 cols)** — Régions principales (preview cards)
3. **Callout** — "Explorez les cultures régionales"
4. **Recommended Events** — 3-4 événements prochains
5. **CTA secondaire** — Vers recherche/filtrage

**Composants clés** :
- `Header DSFR` + Navigation locale
- `Button` pour CTAs (Découvrir, Filtrer)
- `Card` pour régions
- `Table` ou `List` pour événements

---

### Page 2 : Fiche Région (ex: Bretagne)

**Structure (Tabs ou Sections) :**

```
[Région]: Bretagne

1. INTRODUCTION
   ├── Headline + Intro (150 mots)
   └── Image héro

2. HISTOIRE
   ├── Contenu structuré (Timeline / Texte)
   └── Pictogramme associé (si disponible DSFR)

3. TRADITIONS
   ├── List ou Accordion (pratiques principales)
   └── Images/visuels (si copyright OK)

4. LANGUE
   ├── Caractéristiques linguistiques
   └── Phrases typiques (avec audio ?)

5. GASTRONOMIE
   ├── Card Grid (plats typiques)
   └── Liens ressources (restaurants, recettes)

6. ARTISANAT
   ├── Showcase des métiers
   └── Liens artisans/boutiques

7. ÉVÉNEMENTS
   ├── Calendrier / List des événements régionaux
   └── Liens de détail

8. RESSOURCES UTILES
   ├── Table ou List
   └── Liens, contacts, musées, offices de tourisme
```

**Composants clés** :
- `Tabs` ou `Accordion` pour sections
- `Card` pour showcase (gastronomie, artisanat)
- `Callout` pour points clés / anecdotes
- `Table` pour ressources
- `Button` pour CTAs (partager, contacter)

---

### Page 3 : Événements (Calendrier)

**Sections :**
1. **Titre + Intro** — "Événements régionaux"
2. **Filtres** — Select (Région) + Select (Thème) + Date range
3. **Calendrier ou List** — Événements filtrés
4. **Event Card / Modal** — Détail au clic

**Composants clés** :
- `Select` pour filtres
- `Table` ou List Vue pour affichage
- `Modal` pour détails événement
- `Button` pour actions (ajouter calendrier, plus infos)

---

### Page 4 : Recherche & Filtrage

**Sections :**
1. **Search Bar DSFR** — Moteur de recherche principal
2. **Advanced Filters** — Région + Thème + Type de contenu
3. **Results Grid** — Cartes de résultats
4. **Pagination** — Si > 20 résultats

**Composants clés** :
- `Input Search` DSFR
- `Select` pour chaque filtre
- `Card` pour résultats
- `Button` pour "Affiner recherche"

---

### Page 5 : Contact & Feedback

**Sections :**
1. **Titre + Intro** — "Nous contactez / Donnez votre avis"
2. **Form DSFR** — Champs nécessaires (nom, email, message, sujet)
3. **Validation** — Messages d'erreur/succès
4. **Ressources utiles** — Autres moyens de contact

**Composants clés** :
- `Input` pour texte
- `Textarea` pour message
- `Select` pour sujet
- `Button` pour Submit
- `Alert` pour messages de confirmation

---

## 6. États & Interactions

### États Visuels

| État | Application | Apparence DSFR |
|---|---|---|
| **Default** | État normal | Couleur standard |
| **Hover** | Au survol | Fond légèrement assombri + underline |
| **Active** | Élément sélectionné | Couleur + bold ou border |
| **Disabled** | Indisponible | Grisé + cursor not-allowed |
| **Loading** | Chargement | Spinner DSFR |
| **Error** | Erreur de saisie | Border rouge + message d'erreur |
| **Success** | Validation | Checkmark + message vert |

### Animations
- **Transition** : Smooth (0.2s-0.3s) sur hover/focus.
- **Pas d'excès** : Éco-conception oblige, animations sobres.

---

## 7. Accessibilité (WCAG 2.1 AA)

### Checklist Obligatoire

- ✅ **Contraste** : Ratio 4.5:1 minimum pour textes / 3:1 pour composants
- ✅ **Navigation clavier** : Tous les éléments accessibles au clavier
- ✅ **Focus visible** : Indicateur de focus clair et visible
- ✅ **Alt-texts** : Descriptions pour toutes images
- ✅ **Sémantique HTML** : Balises appropriées (h1-h6, nav, main, footer, etc.)
- ✅ **Aria labels** : Si contenu non visible (icônes, boutons sans texte)
- ✅ **Formulaires** : Labels explicites, messages d'erreur clairs
- ✅ **Lecteur d'écran** : Contenu logique et lisible

### Tests
- Vérification avec lecteur d'écran (NVDA/JAWS).
- Audit automatisé (axe DevTools, Lighthouse).
- Test navigation clavier (Tab/Shift+Tab/Enter).

---

## 8. Éco-Conception

### Principes Appliqués

| Principe | Application |
|---|---|
| **Performance** | Lazy-loading images, minification JS/CSS, cache |
| **Images optimisées** | Formats WebP, dimensions appropriées |
| **Réduction de poids** | Pas de ressources inutiles |
| **Sobriété visuelle** | Pas d'animations gourmandes |
| **Accessibilité** | Réduction effort cognitif, navigation simple |

### Métriques
- Lighthouse Performance > 90
- Transfert initial < 2MB
- First Contentful Paint < 1.5s

---

## 9. Variantes de Design par Région

### Stratégie de Personnalisation
**Base identique** + **accent color par région**.

```
Bretagne       → Bleu-gris maritime
Pays Basque    → Rouge/Vert traditionnel
Normandie      → Bleu clair côtier
Landes         → Vert-marron forestier
Autres régions → À déterminer
```

**Appliqué à** :
- Bordures des cards régionales
- Badges de catégorie
- Éléments d'accentuation (underline de titre, etc.)
- Pictogrammes ou icônes (si variant DSFR disponible)

**Contrainte** : Tous les accents doivent passer les tests de contraste WCAG AA.

---

## 10. Design System Adapté au Projet

### Nomenclature des Composants

```
ds-header
ds-nav-local
ds-card-region
ds-card-event
ds-tabs-section
ds-form-filter
ds-button-primary
ds-button-secondary
ds-alert-info
ds-badge-theme
ds-badge-region
```

### Étapes de Mise en Place

1. **Créer fichier Figma** de composition du projet.
2. **Importer composants DSFR** (depuis fichiers de référence).
3. **Adapter variants** (couleurs par région, tailles).
4. **Créer templates** pour chaque page.
5. **Valider accessibilité** sur tous les états.

---

## 11. Handoff Design → Dev

### Documentation à Fournir

- ✅ Figma file avec tous les layouts et composants
- ✅ Specs détaillées (dimensions, espacements, typos)
- ✅ Listes de tokens appliqués
- ✅ Conventions de nommage
- ✅ États d'interaction détaillés
- ✅ Accessibility checklist

### Format de Livrable

```
/design
  ├── figma-links.md           (Liens DSFR + projet)
  ├── components-used.md       (Liste complète)
  ├── color-palette.md         (Tokens appliqués)
  ├── spacing-system.md        (Grille, esp.)
  ├── typography.md            (Typos, sizes)
  └── page-specs/
      ├── homepage.md
      ├── region-page.md
      ├── events.md
      ├── search.md
      └── contact.md
```

---

## 12. Prochaines Étapes

1. ✅ Valider ce cadrage design.
2. 🔄 Créer fichier Figma avec layouts.
3. 🔄 Composer pages avec composants DSFR.
4. 🔄 Valider accessibilité (audit WCAG).
5. ⏭ Générer spec document pour développeurs.

---

**Document généré par IA — À valider avec équipe design**
