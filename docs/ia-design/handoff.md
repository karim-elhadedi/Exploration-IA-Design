# Handoff Design → Développement

**Projet** : Cultures Régionales de France  
**Système de Design** : DSFR v1.14  
**Date** : 2026-06-10  

---

## 1. Vue d'Ensemble

Ce document guide les **développeurs** sur la implémentation des interfaces conçues pour ce projet.

### Prérequis
- Connaissance HTML5 sémantique
- Expérience CSS/SCSS
- Familiarité avec DSFR
- Setup local (Node.js, npm/yarn)

### Ressources Clés
- ✅ Figma Design File (privé, à partager)
- ✅ DSFR Documentation : https://www.systeme-de-design.gouv.fr/
- ✅ DSFR Figma : https://www.figma.com/design/hmfdZF1QGqIGV9hZOOU1aD/DSFR---Composants
- ✅ Ce document handoff

---

## 2. Architecture Projet

### Structure de Dossiers

```
projet-cultures-regionales/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── regions/
│       │   ├── events/
│       │   └── illustrations/
│       └── icons/
│
├── src/
│   ├── components/          (Composants réutilisables)
│   │   ├── Header.html
│   │   ├── Navigation.html
│   │   ├── Card.html
│   │   ├── Tabs.html
│   │   ├── Form.html
│   │   ├── Footer.html
│   │   └── ...
│   │
│   ├── pages/               (Pages complètes)
│   │   ├── index.html       (Accueil)
│   │   ├── regions/
│   │   │   ├── bretagne.html
│   │   │   ├── pays-basque.html
│   │   │   └── ...
│   │   ├── events.html
│   │   ├── search.html
│   │   ├── contact.html
│   │   └── 404.html
│   │
│   ├── styles/              (CSS/SCSS)
│   │   ├── main.css         (DSFR import + overwrites)
│   │   ├── tokens.css       (Variables CSS projet)
│   │   ├── regions.css      (Variantes par région)
│   │   └── utils.css        (Classes utilitaires)
│   │
│   ├── scripts/             (JavaScript)
│   │   ├── main.js          (Init globale)
│   │   ├── search.js        (Moteur recherche)
│   │   ├── filters.js       (Filtrage avancé)
│   │   ├── events.js        (Gestion calendrier)
│   │   ├── form.js          (Validation formulaire)
│   │   └── accessibility.js (A11y enhancements)
│   │
│   ├── data/                (Contenus)
│   │   ├── regions.json     (Infos régions)
│   │   ├── events.json      (Événements)
│   │   ├── artisans.json    (Artisans/ressources)
│   │   └── themes.json      (Thèmes)
│   │
│   └── includes/            (Partials template)
│       ├── meta.html        (Head meta)
│       ├── header.html      (Header common)
│       └── footer.html      (Footer common)
│
├── dist/                    (Build output)
│
├── package.json
├── .env.example
├── README.md
└── INSTALLATION.md
```

---

## 3. Implémentation des Pages

### Page 1 : Accueil (`index.html`)

**Sections** :
1. Header DSFR + Nav locale
2. Hero (H1 + intro + CTA)
3. Regions Grid (3 cards DSFR)
4. Upcoming Events (list/table)
5. CTA Exploration (Button + badges)
6. Footer DSFR

**Structure HTML** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cultures Régionales de France - Site de l'État</title>
  <link href="/css/main.css" rel="stylesheet">
</head>
<body>
  {% include 'header.html' %}
  {% include 'nav-local.html' %}

  <main role="main" class="fr-container">
    <!-- Hero -->
    <section class="fr-mb-5w">
      <h1>Découvrez les Cultures Régionales de France</h1>
      <p class="fr-lead">Explorez le patrimoine riche et diversifié des régions françaises.</p>
      <button class="fr-btn" onclick="scrollToRegions()">Commencer l'exploration</button>
    </section>

    <!-- Regions Grid -->
    <section class="fr-mb-5w" id="regions">
      <h2>Les Régions</h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <!-- Cards générées dynamiquement via JS ou template -->
        {% for region in regions %}
          <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
            {% include 'card-region.html', region=region %}
          </div>
        {% endfor %}
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="fr-mb-5w">
      <h2>Événements À Venir</h2>
      <div class="fr-table fr-table--bordered">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Événement</th>
              <th>Région</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {% for event in upcomingEvents %}
              <tr>
                <td>{{ event.date | formatDate }}</td>
                <td>{{ event.title }}</td>
                <td><span class="fr-badge">{{ event.region }}</span></td>
                <td><a href="/events/{{ event.id }}">Voir</a></td>
              </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  {% include 'footer.html' %}

  <script src="/js/main.js"></script>
</body>
</html>
```

**CSS** :
```css
/* Accueil spécifique */
.hero-section {
  padding: var(--spacing-5) 0;
  text-align: center;
}

.hero-section h1 {
  font-size: var(--font-size-heading-lg);
  margin-bottom: var(--spacing-3);
}

.hero-section p {
  font-size: var(--font-size-body-md);
  max-width: 600px;
  margin: 0 auto var(--spacing-4);
}
```

---

### Page 2 : Fiche Région (`regions/[region].html`)

**Sections** :
1. Hero Image + Titre
2. Tabs DSFR (Histoire, Traditions, Langue, Gastronomie, Artisanat, Événements, Ressources)
3. Contenu par tab
4. Navigation entre régions (précédent/suivant)
5. Footer + Contact CTA

**Structure HTML** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>{{ region.name }} - Cultures Régionales de France</title>
  <meta name="description" content="{{ region.description }}">
</head>
<body>
  {% include 'header.html' %}
  {% include 'nav-local.html' %}

  <main role="main" class="fr-container">
    <!-- Hero -->
    <section class="region-hero fr-mb-5w">
      <img src="/images/regions/{{ region.id }}/hero.jpg" alt="{{ region.name }}">
      <h1>{{ region.name }}</h1>
      <p class="fr-lead">{{ region.shortDescription }}</p>
    </section>

    <!-- Tabs -->
    <div class="fr-tabs">
      <ul class="fr-tabs__list" role="tablist">
        <li role="presentation">
          <button id="tab-histoire" class="fr-tabs__tab" role="tab" aria-selected="true" aria-controls="tabpanel-histoire">
            Histoire
          </button>
        </li>
        <li role="presentation">
          <button id="tab-traditions" class="fr-tabs__tab" role="tab" aria-selected="false" aria-controls="tabpanel-traditions">
            Traditions
          </button>
        </li>
        <!-- Autres tabs -->
      </ul>

      <!-- Tab: Histoire -->
      <div id="tabpanel-histoire" class="fr-tabs__panel" role="tabpanel">
        <h2>Histoire de {{ region.name }}</h2>
        <p>{{ region.history }}</p>
        {% if region.timeline %}
          <div class="timeline">
            {% for event in region.timeline %}
              <div class="timeline-event">
                <span class="timeline-year">{{ event.year }}</span>
                <p>{{ event.description }}</p>
              </div>
            {% endfor %}
          </div>
        {% endif %}
      </div>

      <!-- Tab: Gastronomie -->
      <div id="tabpanel-gastronomie" class="fr-tabs__panel" role="tabpanel">
        <h2>Gastronomie</h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          {% for dish in region.dishes %}
            <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
              {% include 'card-dish.html', dish=dish %}
            </div>
          {% endfor %}
        </div>
      </div>

      <!-- Autres tabs similaires -->
    </div>

    <!-- Navigation Régions -->
    <nav class="region-nav fr-mt-5w">
      {% if previousRegion %}
        <a href="/regions/{{ previousRegion.id }}" class="fr-btn fr-btn--secondary">
          ← {{ previousRegion.name }}
        </a>
      {% endif %}
      {% if nextRegion %}
        <a href="/regions/{{ nextRegion.id }}" class="fr-btn">
          {{ nextRegion.name }} →
        </a>
      {% endif %}
    </nav>
  </main>

  {% include 'footer.html' %}
  <script src="/js/main.js"></script>
</body>
</html>
```

---

### Page 3 : Événements (`events.html`)

**Sections** :
1. Titre + Intro
2. Filtres (Région, Thème, Date range)
3. Calendrier ou List Vue
4. Event Details Modal

**HTML Structure** :
```html
<main class="fr-container">
  <h1>Événements Régionaux</h1>

  <!-- Filters -->
  <form class="fr-form-group fr-mb-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
        <select class="fr-select" id="filter-region" onchange="filterEvents()">
          <option value="">Toutes régions</option>
          {% for region in regions %}
            <option value="{{ region.id }}">{{ region.name }}</option>
          {% endfor %}
        </select>
      </div>
      <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
        <select class="fr-select" id="filter-theme" onchange="filterEvents()">
          <option value="">Tous thèmes</option>
          <option value="festival">Festival</option>
          <option value="exposition">Exposition</option>
          <option value="marche">Marché</option>
        </select>
      </div>
    </div>
  </form>

  <!-- Events List -->
  <div class="events-list" id="events-container">
    {% for event in events %}
      <article class="event-card fr-mb-3w">
        <h3>{{ event.title }}</h3>
        <p class="event-date">📅 {{ event.date | formatDate }}</p>
        <p class="event-location">📍 {{ event.location }}</p>
        <div class="event-tags">
          <span class="fr-badge">{{ event.region }}</span>
          <span class="fr-badge fr-badge--info">{{ event.theme }}</span>
        </div>
        <button class="fr-btn fr-btn--secondary fr-mt-2w" onclick="openEventModal({{ event.id }})">
          Détails
        </button>
      </article>
    {% endfor %}
  </div>
</main>
```

---

### Page 4 : Recherche (`search.html`)

**HTML Structure** :
```html
<main class="fr-container">
  <h1>Recherche Avancée</h1>

  <form class="search-form fr-mb-5w" id="search-form">
    <!-- Search Input -->
    <div class="fr-form-group fr-mb-3w">
      <label class="fr-label" for="search-query">Votre recherche</label>
      <input class="fr-input" id="search-query" type="search" placeholder="Région, thème, événement...">
    </div>

    <!-- Filters -->
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
        <label class="fr-label" for="filter-type">Type de contenu</label>
        <select class="fr-select" id="filter-type">
          <option value="">Tous</option>
          <option value="region">Région</option>
          <option value="event">Événement</option>
          <option value="dish">Plat</option>
          <option value="artisan">Artisan</option>
        </select>
      </div>
    </div>

    <button class="fr-btn" type="submit">Rechercher</button>
  </form>

  <!-- Results -->
  <section id="results-container">
    <h2>Résultats (<span id="results-count">0</span>)</h2>
    <div class="results-grid" id="results"></div>
  </section>
</main>
```

---

### Page 5 : Contact (`contact.html`)

**HTML Structure** :
```html
<main class="fr-container">
  <section class="fr-mb-5w">
    <h1>Nous Contacter</h1>
    <p>Envoyez-nous votre avis, vos questions ou vos suggestions.</p>

    <form class="contact-form fr-form-group" id="contact-form" novalidate>
      <!-- Name -->
      <div class="fr-form-group">
        <label class="fr-label" for="name">
          Nom
          <span class="fr-badge fr-badge--sm">Requis</span>
        </label>
        <input class="fr-input" id="name" name="name" type="text" required>
        <p class="fr-error-text" id="error-name" style="display:none;"></p>
      </div>

      <!-- Email -->
      <div class="fr-form-group">
        <label class="fr-label" for="email">
          Email
          <span class="fr-badge fr-badge--sm">Requis</span>
        </label>
        <input class="fr-input" id="email" name="email" type="email" required>
        <p class="fr-error-text" id="error-email" style="display:none;"></p>
      </div>

      <!-- Subject -->
      <div class="fr-form-group">
        <label class="fr-label" for="subject">
          Sujet
          <span class="fr-badge fr-badge--sm">Requis</span>
        </label>
        <select class="fr-select" id="subject" name="subject" required>
          <option value="">-- Sélectionner --</option>
          <option value="question">Question</option>
          <option value="suggestion">Suggestion</option>
          <option value="error">Signaler une erreur</option>
          <option value="feedback">Feedback général</option>
        </select>
      </div>

      <!-- Message -->
      <div class="fr-form-group">
        <label class="fr-label" for="message">
          Message
          <span class="fr-badge fr-badge--sm">Requis</span>
        </label>
        <textarea class="fr-textarea" id="message" name="message" rows="6" required></textarea>
      </div>

      <!-- Submit -->
      <button class="fr-btn" type="submit">Envoyer</button>
    </form>

    <!-- Success Message -->
    <div class="fr-alert fr-alert--success fr-mt-3w" id="success-message" style="display:none;">
      ✅ Merci ! Votre message a été envoyé avec succès.
    </div>
  </section>
</main>

<script src="/js/form.js"></script>
```

---

## 4. Composants Réutilisables

### Card Région

**Fichier** : `src/components/card-region.html`

```html
<div class="fr-card">
  <div class="fr-card__body">
    <h3 class="fr-card__title">{{ region.name }}</h3>
    <p class="fr-card__desc">{{ region.description }}</p>
    <p class="fr-card__start">
      <a href="/regions/{{ region.id }}" class="fr-btn">Découvrir</a>
    </p>
  </div>
  <div class="fr-card__img">
    <img src="/images/regions/{{ region.id }}/thumb.jpg" alt="{{ region.name }}">
  </div>
</div>
```

### Card Événement

```html
<article class="fr-card">
  <div class="fr-card__body">
    <span class="fr-badge">{{ event.theme }}</span>
    <h3 class="fr-card__title">{{ event.title }}</h3>
    <p class="event-meta">
      📅 {{ event.date | formatDate }}<br>
      📍 {{ event.location }}
    </p>
    <p class="fr-card__start">
      <a href="/events/{{ event.id }}" class="fr-btn">Détails</a>
    </p>
  </div>
</article>
```

---

## 5. CSS & Tokens

### Variables CSS (tokens.css)

```css
:root {
  /* Couleurs */
  --color-primary: #0063CB;
  --color-accent: #28A745;
  --color-text: #161616;
  --color-text-alt: #666;
  --color-bg: #F5F5F5;
  --color-white: #FFFFFF;
  --color-error: #E4334F;

  /* Typographie */
  --font-size-heading-lg: 2.25rem;
  --font-size-heading-md: 1.75rem;
  --font-size-heading-sm: 1.25rem;
  --font-size-body: 1rem;
  --font-family: 'Marianne', sans-serif;

  /* Espacements */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
}

/* Variantes par région */
[data-region="bretagne"] {
  --color-accent-region: #0063CB;
}

[data-region="pays-basque"] {
  --color-accent-region: #DC143C;
}

[data-region="normandie"] {
  --color-accent-region: #87CEEB;
}

[data-region="landes"] {
  --color-accent-region: #556B2F;
}
```

### Main Styles (main.css)

```css
@import 'tokens.css';
@import 'https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/dsfr.min.css';

/* Global */
body {
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-white);
}

h1 { font-size: var(--font-size-heading-lg); }
h2 { font-size: var(--font-size-heading-md); }
h3 { font-size: var(--font-size-heading-sm); }

/* Utility */
.fr-mb-3w { margin-bottom: var(--spacing-4); }
.fr-mb-5w { margin-bottom: var(--spacing-5); }
.fr-mt-2w { margin-top: var(--spacing-3); }
.fr-mt-3w { margin-top: var(--spacing-4); }

/* Responsive Grid */
@media (max-width: 576px) {
  .fr-col-12 { width: 100%; }
}

@media (min-width: 576px) and (max-width: 992px) {
  .fr-col-md-6 { width: 50%; }
}

@media (min-width: 992px) {
  .fr-col-lg-4 { width: 33.333%; }
}
```

---

## 6. JavaScript Essentiels

### Main.js

```javascript
// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSearch();
  initFilters();
  initAccessibility();
});

// Navigation
function initNavigation() {
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
    tab.addEventListener('keydown', handleTabKeydown);
  });
}

// Search
function initSearch() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', performSearch);
  }
}

// Filters
function initFilters() {
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
}

// Accessibility
function initAccessibility() {
  // Focus visible
  document.addEventListener('keydown', () => {
    document.body.classList.add('keyboard-nav');
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}
```

### Form.js

```javascript
// Validation formulaire
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = validateForm();
    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    // Submit
    const formData = new FormData(contactForm);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        showSuccess();
        contactForm.reset();
      } else {
        showError('Erreur lors de l\'envoi');
      }
    } catch (err) {
      showError('Erreur serveur');
    }
  });
}

function validateForm() {
  const errors = [];
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name) errors.push('Nom requis');
  if (!email || !isValidEmail(email)) errors.push('Email valide requis');
  if (!message) errors.push('Message requis');

  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccess() {
  document.getElementById('success-message').style.display = 'block';
}

function showError(msg) {
  // Affiche erreur
}
```

---

## 7. Data & CMS

### Données Régions (data/regions.json)

```json
[
  {
    "id": "bretagne",
    "name": "Bretagne",
    "slug": "bretagne",
    "description": "La riche culture bretonne mêle histoire celtique...",
    "shortDescription": "Culture celtique, traditions et gastronomie",
    "history": "La Bretagne, ancien royaume celtique...",
    "language": {
      "name": "Breton",
      "description": "Langue celtique parlée en Bretagne...",
      "phrases": [
        { "fr": "Bonjour", "local": "Demat", "pronunciation": "DEH-mat" }
      ]
    },
    "traditions": [
      "Fest Noz (danse traditionnelle)",
      "Coiffes bretonnes",
      "Pardons (pèlerinages)"
    ],
    "dishes": [
      {
        "name": "Crêpes Bretonnes",
        "description": "Crêpes sucrées ou salées...",
        "image": "/images/regions/bretagne/crepes.jpg"
      }
    ],
    "events": ["event-id-1", "event-id-2"],
    "resources": [
      {
        "type": "museum",
        "name": "Musée de Bretagne",
        "url": "https://..."
      }
    ]
  }
]
```

---

## 8. Performance & Accessibilité

### Performance Checklist
- ✅ Images optimisées (WebP, lazy-load)
- ✅ CSS minified
- ✅ JS bundled/minified
- ✅ Cache headers configurés
- ✅ Lighthouse score > 90

### Accessibility Checklist
- ✅ WCAG 2.1 AA compliance
- ✅ Navigation clavier complète
- ✅ Focus indicateurs visibles
- ✅ Alt-texts sur images
- ✅ Aria labels si nécessaire
- ✅ Contraste 4.5:1+ texte/bg
- ✅ Testée avec lecteur d'écran

### Tests
```bash
# Lighthouse
npm run lighthouse

# Accessibility audit
npm run a11y-audit

# Keyboard navigation
# Manual test: Tab, Shift+Tab, Enter, Esc, Arrows

# Screen reader test
# NVDA (Windows) ou VoiceOver (Mac)
```

---

## 9. Déploiement

### Setup Production
1. Build assets
2. Deploy sur serveur .gouv.fr
3. Configure SSL/TLS
4. Setup CDN si applicable
5. Monitor performance

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on: [push to main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm run test
      - run: npm run a11y-audit
      - deploy to production
```

---

## 10. Maintenance & Support

### Monitoring
- ✅ Error tracking (Sentry, etc.)
- ✅ Performance monitoring
- ✅ User feedback tracking
- ✅ Analytics

### Regular Tasks
- Update DSFR version quarterly
- Audit accessibilité (6 mois)
- Test navigateurs (6 mois)
- Security updates (as needed)
- Content review (ongoing)

---

## 11. Contacts & Ressources

**Points de Contact** :
- Design Lead : [email]
- Dev Lead : [email]
- Product Owner : [email]
- Accessibility Champion : [email]

**Ressources** :
- DSFR Docs : https://www.systeme-de-design.gouv.fr/
- W3C WCAG : https://www.w3.org/WAI/WCAG21/quickref/
- GitHub Repo : [link]
- Figma File : [link]

---

**Document généré par IA — À mettre à jour avec feedback équipe dev**
