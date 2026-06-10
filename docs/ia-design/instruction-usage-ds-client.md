# Guide d'Utilisation du DSFR pour le Projet

**Projet** : Cultures Régionales de France  
**Version DSFR** : v1.14  
**Date** : 2026-06-10  

---

## 1. Introduction

Ce document guide **designers et développeurs** dans l'utilisation correcte du Système de Design de l'État (DSFR) pour ce projet.

### Principes Non-Négociables
- **Jamais inventer un composant** — Si une variante DSFR existe, l'utiliser.
- **Toujours utiliser les tokens** — Pas de valeurs en dur (hex, px directs).
- **Respecter la sémantique** — Les composants DSFR portent une intention.
- **Valider l'accessibilité** — Chaque utilisation doit être WCAG 2.1 AA.

---

## 2. Composants DSFR Obligatoires

### Structure Globale

#### Header DSFR
**Rôle** : Banneau institutionnel supérieur  
**Contenu** :
- Logo République + Logo projet (optionnel)
- Slogan/Titre institutionnel
- Navigation principale (optionnel selon config)
- Sélecteur de langue (FR/EN si applicable)

**À faire** :
```html
<header class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <p class="fr-logo">République Française</p>
          <h1 class="fr-header__title">Cultures Régionales de France</h1>
        </div>
      </div>
    </div>
  </div>
</header>
```

**À ne pas faire** :
- ❌ Modifier les proportions du logo
- ❌ Ajouter des couleurs non-DSFR
- ❌ Placer du contenu hors zone délimitée

---

#### Navigation Locale
**Rôle** : Navigation spécifique au projet (régions, thèmes)  
**Utiliser** : Composant `nav.fr-nav` DSFR

**Contenu** :
```
Régions → Dropdown ou Tabs
  ├── Bretagne
  ├── Pays Basque
  ├── Landes
  └── Normandie

Thèmes → Dropdown ou Tabs
  ├── Gastronomie
  ├── Traditions
  ├── Artisanat
  └── Événements

Ressources → Dropdown
  ├── Agenda
  ├── Filtrage avancé
  └── Contact
```

---

#### Footer DSFR
**Rôle** : Pied de page institutionnel  
**Contenu obligatoire** :
- Mentions légales
- Politique de confidentialité
- Accessibilité
- Plan du site
- Réseaux sociaux (optionnel)
- Contact

**À faire** :
```html
<footer class="fr-footer" role="contentinfo">
  <div class="fr-container">
    <div class="fr-footer__top">
      <!-- Navigation secondaire -->
    </div>
    <div class="fr-footer__bottom">
      <p class="fr-footer__bottom-copy">© 2026 République Française</p>
    </div>
  </div>
</footer>
```

---

### Composants Contenus

#### Card (Cartes)
**Variantes DSFR disponibles** :
- `fr-card` (standard)
- `fr-card--lg` (large)
- `fr-card--sm` (petit)
- Avec image (`.fr-card__image`)
- Avec badge (`.fr-badge`)
- Avec description

**Utilisation pour ce projet** :
1. **Carte région** — Image + titre + intro courte + CTA "Découvrir"
2. **Carte événement** — Date + titre + lieu + thème (badge)
3. **Carte artisan/ressource** — Image + nom + description courte

**Spécifications** :
```
Région card:
- Hauteur : 300-350px
- Image : 1.5:1 ratio ou carré
- Titre : H3 (font-size-heading-sm)
- Description : Body MD (max 100 chars)
- CTA Button : Button primary DSFR

Événement card:
- Hauteur : 250px
- Badge thème : Badge DSFR (couleur par thème)
- Titre : H4
- Métadonnées : Label MD (date + lieu)

Artisan card:
- Hauteur : 280px
- Image : Carré ou portrait
- Nom : H4 Bold
- Spécialité : Label MD
```

**Code exemple** :
```html
<div class="fr-card">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">Bretagne</h3>
      <p class="fr-card__desc">Découvrez la riche culture bretonne...</p>
    </div>
    <p class="fr-card__start">
      <a href="/regions/bretagne" class="fr-btn">Découvrir</a>
    </p>
  </div>
  <div class="fr-card__img">
    <img src="..." alt="Côtes de Bretagne">
  </div>
</div>
```

---

#### Tabs (Onglets)
**Rôle** : Organiser contenu par thème dans une fiche région  
**Utiliser** : Composant `fr-tabs` DSFR

**Structure** :
```
[Histoire] [Traditions] [Langue] [Gastronomie] [Artisanat] [Événements] [Ressources]
```

**Spécifications** :
- Tabs alignés en haut
- Panel affiché par défaut (Histoire)
- Contenu responsive (scroll horizontal mobile)
- Accessible au clavier (Arrow keys)

**Code exemple** :
```html
<div class="fr-tabs">
  <ul class="fr-tabs__list" role="tablist">
    <li role="presentation">
      <button id="tabpanel-histoire" class="fr-tabs__tab" role="tab" aria-selected="true" aria-controls="tabpanel-histoire">
        Histoire
      </button>
    </li>
    <!-- autres onglets -->
  </ul>
  <div id="tabpanel-histoire" class="fr-tabs__panel" role="tabpanel">
    <!-- Contenu -->
  </div>
</div>
```

---

#### Accordion (Accordéons)
**Rôle** : Contenu replié/déroulé (FAQ, détails secondaires)  
**Utiliser** : Composant `fr-accordion` DSFR

**Cas d'usage** :
- FAQ
- Points d'intérêt par région
- Questions/réponses sur artisanat

**Spécifications** :
- Titre clair et concis
- Icône chevron (DSFR)
- Animation fluide ouverture/fermeture
- Plusieurs accordéons peuvent être ouverts

---

#### Buttons (Boutons)
**Variantes DSFR** :
- `fr-btn` (primaire)
- `fr-btn--secondary` (secondaire)
- `fr-btn--tertiary` (tertiaire)
- `fr-btn--sm` (petit)
- `fr-btn--lg` (grand)
- `fr-btn--icon-left` / `--icon-right` (avec icône)

**Utilisation pour ce projet** :

| Contexte | Type | Texte | Icône |
|---|---|---|---|
| Découvrir région | Primary | "Découvrir" | ➜ |
| Partager | Secondary | "Partager" | 🔗 |
| Filtrer | Secondary | "Appliquer filtres" | ⚙ |
| Contact | Primary | "Nous contacter" | ✉ |
| Retour | Tertiary | "Retour" | ← |
| Charger plus | Secondary | "Voir plus" | ↓ |

**Code exemple** :
```html
<a href="/regions/bretagne" class="fr-btn">
  Découvrir la Bretagne
</a>

<button class="fr-btn fr-btn--secondary fr-btn--icon-left">
  <span class="fr-icon-share"></span> Partager
</button>
```

---

#### Search (Recherche)
**Composant** : `fr-search-box` ou `fr-input` + `fr-btn`

**Spécifications** :
- Input avec placeholder "Rechercher par région, thème..."
- Bouton "Rechercher" aligné à droite
- Icône loupe (DSFR icon)
- Responsive (fullwidth mobile)
- Enter key pour soumettre

**Code exemple** :
```html
<form class="fr-search-box fr-mb-3w" role="search">
  <label class="fr-label" for="search-input">Rechercher</label>
  <input class="fr-input" id="search-input" name="q" placeholder="Région, thème, événement...">
  <button class="fr-btn" type="submit">Rechercher</button>
</form>
```

---

#### Select (Sélecteurs)
**Composant** : `fr-select`

**Utilisation** :
- Filtre par région
- Filtre par thème
- Filtre par type d'événement
- Tri (pertinence, date, A-Z)

**Spécifications** :
- Label visible et explicite
- Options logiquement ordonnées
- Optionnel : groupe d'options (optgroup)

**Code exemple** :
```html
<div class="fr-form-group">
  <label class="fr-label" for="select-region">Région</label>
  <select class="fr-select" id="select-region" name="region">
    <option value="">-- Sélectionner --</option>
    <option value="bretagne">Bretagne</option>
    <option value="pays-basque">Pays Basque</option>
    <!-- ... -->
  </select>
</div>
```

---

#### Alert / Callout
**Composants** :
- `fr-alert` (info, succès, avertissement, erreur)
- `fr-callout` (mise en avant)

**Utilisation** :
- Confirmations (formulaire envoyé)
- Erreurs (recherche sans résultats)
- Avertissements (événement annulé)
- Mise en avant (anecdote, témoignage)

**Code exemple** :
```html
<div class="fr-alert fr-alert--success">
  <p>Votre message a été envoyé avec succès !</p>
</div>

<div class="fr-alert fr-alert--info">
  <p>Consultez nos <a href="#">événements à venir</a>.</p>
</div>
```

---

#### Badge (Badges)
**Composant** : `fr-badge`

**Utilisation** :
- Thème de contenu (Gastronomie, Traditions, etc.)
- Région (Bretagne, Pays Basque, etc.)
- Statut (À venir, Annulé, etc.)
- Type d'événement (Festival, Exposition, Marché, etc.)

**Code exemple** :
```html
<span class="fr-badge">Gastronomie</span>
<span class="fr-badge fr-badge--info">Bretagne</span>
<span class="fr-badge fr-badge--success">Confirmé</span>
```

---

#### Table (Tableaux)
**Composant** : `fr-table`

**Utilisation** :
- Ressources utiles (musées, offices de tourisme)
- Événements (liste calendrier)
- Artisans/producteurs (annuaire)

**Spécifications** :
- En-têtes explicites (th)
- Responsive : scroll horizontal mobile (optionnel card view)
- Tri accessible (si applicable)
- Pagination (si > 20 lignes)

**Code exemple** :
```html
<div class="fr-table fr-table--bordered">
  <table>
    <thead>
      <tr>
        <th>Lieu</th>
        <th>Type</th>
        <th>Tél/Site</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Musée de Bretagne</td>
        <td>Musée</td>
        <td><a href="#">www.musee-bretagne.fr</a></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### Composants Formulaire

#### Input Text / Textarea
**Composants** : `fr-input` / `fr-textarea`

**Utilisation** :
- Formulaire de contact (nom, email, message)
- Recherche
- Filtres de texte

**Spécifications** :
- Label associé (for/id)
- Placeholder explicite
- Message d'erreur si validation échoue
- Message d'aide si nécessaire (hint)

---

#### Form Validation
**Règles DSFR** :
- ✅ Label obligatoire (avec *) si champ requis
- ✅ Message d'erreur clair et actionnable
- ✅ Couleur rouge (error token) pour erreurs
- ✅ Icône d'erreur (si applicable)
- ✅ Pas de validation par couleur seule

**Code exemple** :
```html
<div class="fr-form-group">
  <label class="fr-label" for="email">
    Email
    <span class="fr-badge fr-badge--sm">Requis</span>
  </label>
  <input class="fr-input fr-input--error" id="email" name="email" type="email" required>
  <p class="fr-error-text">Veuillez entrer une adresse email valide.</p>
</div>
```

---

## 3. Tokens DSFR Appliqués au Projet

### Couleurs

```css
/* Primaire institutionnel */
--color-decisions-border-raised-grey: #666 (textes, éléments clés)

/* Accents régions (variantes) */
--color-decisions-border-action-high-blue-france: #0063CB (Bretagne/défaut)
--color-decisions-border-success-green: #28A745 (Landes)
--color-decisions-border-warning-orange: #FF9F1C (événements)
--color-decisions-border-error-red: #E4334F (erreurs)

/* Textes */
--color-text-default-grey: #161616 (corps)
--color-text-muted-grey: #666 (secondaire)
--color-text-label-grey: #3A3A3A (labels)

/* Fonds */
--color-background-default-grey: #F5F5F5 (surface)
--color-background-alt-grey: #FFFFFF (blanc)
```

### Typographie

```css
/* Titres */
--font-size-heading-lg: 2.25rem (H1 page)
--font-size-heading-md: 1.75rem (H2 sections)
--font-size-heading-sm: 1.25rem (H3 sous-sections, cards)

/* Corps */
--font-size-body-md: 1rem (texte courant)
--font-size-body-sm: 0.875rem (texte secondaire)

/* Labels */
--font-size-label-md: 0.875rem (labels, meta)

/* Family */
--font-family-base: 'Marianne' ou 'Raleway' (DSFR)
--font-weight-regular: 400
--font-weight-bold: 700
```

### Espacement

```css
--spacing-1: 4px (minimal)
--spacing-2: 8px (standard)
--spacing-3: 16px (section)
--spacing-4: 24px (major)
--spacing-5: 32px (large)
--spacing-6: 48px (extra large)
--spacing-8: 64px (page break)
```

---

## 4. Patterns Récurrents du Projet

### Pattern : Card Grid Régions
**Où** : Accueil, page thème  
**Composants** : Cards DSFR + Grid  
**Spécifications** :
```
Desktop: 3 colonnes (4 cols de grille)
Tablet:  2 colonnes
Mobile:  1 colonne
Espacement: spacing-3 entre cards
```

---

### Pattern : Fiche Région
**Où** : Pages région  
**Composants** : Tabs DSFR + Conteneurs sémantiques  
**Spécifications** :
```
Hero (image + titre)
└─ Tabs (Histoire, Traditions, Langue, Gastronomie, Artisanat, Événements, Ressources)
   └─ Contenu adapté par tab
      (Cards, Lists, Tables, Accordions, etc.)
```

---

### Pattern : Recherche & Filtrage
**Où** : Page dédiée, header optionnel  
**Composants** : Search Box + Selects + Card Grid  
**Spécifications** :
```
Search bar (fullwidth mobile)
└─ Filtres (Région, Thème, Type, Tri)
   └─ Résultats (Card Grid responsive)
      └─ Pagination (si > 20)
```

---

### Pattern : Formulaire de Contact
**Où** : Page contact  
**Composants** : Form DSFR + Inputs + Buttons  
**Spécifications** :
```
Titre + Intro
└─ Form
   ├─ Nom (required)
   ├─ Email (required)
   ├─ Sujet (Select required)
   ├─ Message (Textarea required)
   └─ Bouton Submit (primary)
      └─ Message de confirmation (Alert success)
```

---

## 5. Checklist d'Utilisation DSFR

### Avant de Designer
- ✅ Vérifier le composant existe dans DSFR v1.14
- ✅ Utiliser la variante correcte
- ✅ Vérifier l'accessibilité du composant (WCAG inscrite)
- ✅ Appliquer les tokens (pas de hardcoded values)

### Avant de Coder
- ✅ Utiliser les classes DSFR exactement (fr-btn, fr-card, etc.)
- ✅ Pas de CSS custom (sauf adapté via tokens)
- ✅ Respecter la sémantique HTML (nav, main, h1-h6, etc.)
- ✅ Aria labels et roles si nécessaire

### Avant de Livrer
- ✅ Audit accessibilité (axe DevTools, NVDA/JAWS)
- ✅ Tests navigateur (Chrome, Firefox, Safari, Edge)
- ✅ Tests mobile (iPhone, Android)
- ✅ Tests clavier (Tab, Enter, Esc, Arrow keys)
- ✅ Valider contraste (WCAG AA minimum)

---

## 6. Ressources & Liens

### Documentation DSFR
- **Composants** : https://www.figma.com/design/hmfdZF1QGqIGV9hZOOU1aD/DSFR---Composants
- **Modèles** : https://www.figma.com/design/PzTfq1o4h0E5Cudv1FIdQV/DSFR---Mod%C3%A8les
- **Pictogrammes** : https://www.figma.com/design/Rg1zIcS5RawUqGOC8thgax/DSFR---Pictogrammes
- **Fondamentaux** : https://www.figma.com/design/jXLzKp9flzNIHhlk2Rml71/DSFR---Fondamentaux

### Vérification
- **Contraste** : https://webaim.org/resources/contrastchecker/
- **Accessibilité** : https://www.w3.org/WAI/WCAG21/quickref/
- **DSFR Documentation officielle** : https://www.systeme-de-design.gouv.fr/

---

**Document généré par IA — À mettre à jour avec expérience projet**
