# Initialisation Projet : Cultures Régionales de France

**Date** : 2026-06-10  
**Projet** : Site de l'État sur les cultures régionales de France  
**Design System** : DSFR (Système de Design de l'État) v1.14  
**Statut** : Phase de cadrage

---

## 1. Contexte & Enjeux

### Qu'est-ce qu'on construit ?
Un **site public institutionnel** (.gouv.fr) destiné à valoriser et faire découvrir les cultures régionales françaises.

### Pourquoi ?
- **Valorisation du patrimoine** : Mettre en lumière la richesse culturelle des régions françaises.
- **Accessibilité de l'information** : Donner accès à des contenus structurés, fiables et attrayants.
- **Utilité publique** : Servir touristes, citoyens et institutions.

### Pour qui ?
1. **Touristes français** — Curieux de découvrir les cultures locales.
2. **Touristes étrangers** — En quête de patrimoine culturel français.
3. **Citoyens français** — Intéressés par leur propre héritage culturel.
4. **Agents publics/institutions** — Souhaitant valoriser les cultures locales.

---

## 2. Périmètre & Contenu

### Régions couvertes (phase 1)
- Bretagne
- Pays Basque
- Landes
- Normandie
- + autres cultures régionales à déterminer

### Contenu par région
Pour chaque culture régionale, couvrir :
- ✅ **Histoire** — Contexte historique et évolution.
- ✅ **Traditions** — Pratiques et coutumes.
- ✅ **Langue** — Caractéristiques linguistiques.
- ✅ **Gastronomie** — Plats typiques et spécialités.
- ✅ **Artisanat** — Métiers et savoirs-faire locaux.
- ✅ **Événements** — Fêtes, festivals, célébrations.
- ✅ **Ressources utiles** — Liens, contacts, informations pratiques.

### Principes de contenu
- **Clarté** : Information structurée, facile à consulter.
- **Fiabilité** : Contenus vérifiés et sourced.
- **Attractivité** : Ton formel + éléments émotionnels (témoignages).
- **Accessibilité** : Adapté à tous les profils de lecteurs.

---

## 3. Structure & Architecture

### Arborescence globale

```
Accueil
├── Vue d'ensemble des cultures régionales
├── Appels à l'action (découvrir, explorer, filtrer)
│
Régions
├── [Région 1] → Fiche détaillée
│   ├── Introduction
│   ├── Histoire
│   ├── Traditions
│   ├── Langue
│   ├── Gastronomie
│   ├── Artisanat
│   ├── Événements (calendrier)
│   └── Ressources utiles
│
├── [Région 2] → Fiche détaillée
│   └── (Idem)
│
Thèmes (navigation transversale)
├── Gastronomie (toutes régions)
├── Artisanat (toutes régions)
├── Traditions (toutes régions)
├── Événements (calendrier centralisé)
│
Fonctionnalités
├── Recherche
├── Filtrage (par région, par thème)
├── Agenda d'événements
├── Moteur de recommandations touristiques
└── Formulaire de contact/feedback
```

### Pages prioritaires (MVP)
1. **Accueil** — Navigation + découverte.
2. **Fiche région** — Contenu détaillé structuré.
3. **Événements** — Calendrier et agenda.
4. **Recherche/filtrage** — Exploration guidée.
5. **Contact** — Formulaire et feedback.

---

## 4. Parcours Utilisateur Principal

### Scénario : "Découvrir une culture régionale"

```
1. Accueil
   ↓
   [Utilisateur cherche → clique sur région OU utilise recherche/filtrage]
   ↓
2. Fiche région (ex: Bretagne)
   ├── Visualise contenu structuré
   ├── Explore thèmes (histoire, gastronomie, etc.)
   ├── Découvre événements liés
   └── Explore recommandations touristiques
   ↓
3. Actions possibles
   ├── Consulter ressources utiles
   ├── Partager/enregistrer
   ├── Consulter autres régions
   └── Envoyer un feedback/contact
```

---

## 5. Fonctionnalités Requises

### MVP (Minimum Viable Product)

| Fonctionnalité | Description | Priorité |
|---|---|---|
| Navigation par région | Accès direct aux fiches régionales | **HAUTE** |
| Navigation par thème | Filtrage transversal (gastronomie, traditions, etc.) | **HAUTE** |
| Recherche texte | Moteur de recherche simple | **MOYENNE** |
| Filtrage avancé | Combinaisons région + thème | **MOYENNE** |
| Calendrier d'événements | Événements listés par date/région | **HAUTE** |
| Recommandations touristiques | Suggestions basées sur profil/intérêts | **MOYENNE** |
| Formulaire de contact/feedback | Capture avis et demandes utilisateurs | **MOYENNE** |

---

## 6. Principes de Conception

### Valeurs fondamentales
- **Simplicité** — Interface épurée, hiérarchie claire.
- **Lisibilité** — Typographie appropriée, contraste suffisant.
- **Accessibilité** — Respect RGAA, navigation au clavier, alt-texts.
- **Cohérence institutionnelle** — Alignement DSFR, branding État.
- **Éco-conception** — Performance, minimalisme, réduction de charge.
- **Ton émotionnel** — Formal + humanité (témoignages, images).

### Ton éditorial
- **Principal** : Formel, institutionnel, fiable.
- **Secondaire** : Témoignages, récits locaux (humanité).
- **Équilibre** : Autorité publique + accessibilité émotionnelle.

---

## 7. Contraintes & Considérations

### Technique
- ✅ Utiliser le DSFR v1.14 (composants, tokens, modèles).
- ✅ Responsive design (mobile-first).
- ✅ Performance web et éco-conception.

### Design
- ✅ Interface sobre et institutionnelle.
- ✅ Hiérarchie visuelle claire.
- ✅ Pas de surcharge visuelle.
- ✅ Accessibilité dès le départ (WCAG 2.1 AA minimum).

### Contenu
- ✅ Contenus vérifiés et sourced.
- ✅ Pas de discrimination régionale.
- ✅ Tonalité cohérente inter-régions.

---

## 8. Livrables Attendus

### Phase 1 : Cadrage & Design
- ✅ `initialisation-projet.md` (ce document)
- ✅ `initialisation-design.md` (spécifications design)
- ✅ `instruction-usage-ds-client.md` (guide DSFR pour le projet)
- ✅ `handoff.md` (documentation technique pour développeurs)

### Phase 2 : Design
- Maquettes haute fidélité (Figma)
- Design system adapté au projet

### Phase 3 : Développement
- Frontend (HTML/CSS/JS)
- Backend (gestion contenu, search, events)
- Déploiement .gouv.fr

---

## 9. Métriques de Succès

| Métrique | Cible |
|---|---|
| Accessibilité | WCAG 2.1 AA minimum (100 %) |
| Performance | Lighthouse score > 90 |
| Satisfaction utilisateur | > 80 % (via feedback form) |
| Engagement | Temps moyen par région > 2 min |
| Navigation | 85 % accèdent à au moins 2 régions |

---

## 10. Prochaines Étapes

1. ✅ **Valider ce cadrage** avec stakeholders.
2. 🔄 **Générer spécifications design** (initialisation-design.md).
3. 🔄 **Explorer DSFR** et adapter composants au contexte.
4. ⏭ **Créer wireframes** des pages prioritaires.
5. ⏭ **Valider accessibilité** (audit RGAA).
6. ⏭ **Démarrer développement**.

---

**Document généré par IA — À valider avec équipe projet**
