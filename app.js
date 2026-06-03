// Liste des fichiers .md à charger
const markdownFiles = [
    'docs/CLAUDE.md',
    'docs/ia-design/design-system.md',
    'README.md',
    'CONTRIBUTING.md'
];

let currentFile = null;
let fileContents = {};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initFileList();
    initTabs();
    initButtons();
});

// Initialiser la liste de fichiers
function initFileList() {
    const fileList = document.getElementById('fileList');
    const fileSelect = document.getElementById('fileSelect');
    
    markdownFiles.forEach(file => {
        // Sidebar
        const li = document.createElement('li');
        li.textContent = file.split('/').pop();
        li.dataset.file = file;
        li.addEventListener('click', () => loadFile(file, li));
        fileList.appendChild(li);
        
        // Dropdown
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file;
        fileSelect.appendChild(option);
    });
    
    fileSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            const li = document.querySelector(`li[data-file="${e.target.value}"]`);
            loadFile(e.target.value, li);
        }
    });
}

// Charger un fichier
async function loadFile(file, liElement) {
    try {
        // Highlight actif
        document.querySelectorAll('#fileList li').forEach(li => li.classList.remove('active'));
        if (liElement) liElement.classList.add('active');
        
        // Charger le contenu
        const response = await fetch(file);
        if (!response.ok) throw new Error('Fichier non trouvé');
        
        const content = await response.text();
        fileContents[file] = content;
        currentFile = file;
        
        // Afficher le rendu Markdown
        renderMarkdown(content);
        
    } catch (error) {
        console.error('Erreur de chargement:', error);
        document.getElementById('markdownContent').innerHTML = `
            <div class="empty-state">
                <h2>❌ Erreur</h2>
                <p>Impossible de charger le fichier : ${file}</p>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Rendu Markdown
function renderMarkdown(content) {
    const rendered = marked.parse(content);
    const contentDiv = document.getElementById('markdownContent');
    const sourceDiv = document.getElementById('sourceContent');
    
    contentDiv.innerHTML = rendered;
    sourceDiv.classList.add('hidden');
    
    // Surlignage syntaxique
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

// Afficher le source
function showSource() {
    if (!currentFile || !fileContents[currentFile]) return;
    
    const contentDiv = document.getElementById('markdownContent');
    const sourceDiv = document.getElementById('sourceContent');
    const sourceCode = document.getElementById('sourceCode');
    
    contentDiv.classList.add('hidden');
    sourceDiv.classList.remove('hidden');
    sourceCode.textContent = fileContents[currentFile];
}

// Initialiser les onglets
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Initialiser les boutons
function initButtons() {
    // Bouton rendu
    document.getElementById('renderBtn').addEventListener('click', () => {
        if (currentFile && fileContents[currentFile]) {
            renderMarkdown(fileContents[currentFile]);
        }
    });
    
    // Bouton source
    document.getElementById('sourceBtn').addEventListener('click', showSource);
    
    // Bouton lire tous les .md
    document.getElementById('readAllBtn').addEventListener('click', async () => {
        await readAllFiles();
    });
    
    // Bouton résumer
    document.getElementById('summarizeBtn').addEventListener('click', () => {
        generateProjectSummary();
    });
    
    // Bouton design tokens
    document.getElementById('extractDesignBtn').addEventListener('click', () => {
        extractDesignTokens();
    });
    
    // Bouton générer résumé
    document.getElementById('generateSummaryBtn').addEventListener('click', () => {
        generateProjectSummary();
    });
    
    // Chat
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Lire tous les fichiers
async function readAllFiles() {
    const viewer = document.getElementById('viewer');
    viewer.classList.add('active');
    
    let allContent = '# 📚 Tous les fichiers Markdown\n\n';
    
    for (const file of markdownFiles) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                fileContents[file] = content;
                allContent += `## ${file}\n\n${content}\n\n---\n\n`;
            }
        } catch (error) {
            allContent += `## ${file}\n\n*_Fichier non trouvé_*\n\n`;
        }
    }
    
    renderMarkdown(allContent);
}

// Générer résumé du projet
function generateProjectSummary() {
    const summary = `
# 📋 Résumé du Projet - Exploration IA Design

## 🎯 Objectif
Ce projet explore la création d'un **Design System** avec des composants réutilisables, 
des tokens de design et des patterns d'interface.

## 📁 Structure
- **docs/** : Documentation du projet
- **docs/ia-design/** : Design System et tokens
- **src/** : Source code (si présent)

## 🎨 Design System
Le design system inclut :
- Palette de couleurs
- Typographie
- Espacement
- Composants UI

## 🚀 Prochaines étapes
1. Extraire tous les design tokens
2. Créer les composants de base
3. Documenter les patterns d'utilisation
4. Générer une interface de démonstration

## 💡 Fonctionnalités de l'Agent IA
- ✅ Lecture automatique des fichiers .md
- ✅ Rendu Markdown avec syntax highlighting
- ✅ Extraction de design tokens
- ✅ Résumé du projet
- ✅ Chat interactif
    `;
    
    document.getElementById('summaryContent').innerHTML = marked.parse(summary);
}

// Extraire design tokens
function extractDesignTokens() {
    // Ceci est un exemple - tu peux le personnaliser pour lire les vrais tokens
    const tokens = `
# 🎨 Design Tokens Extraits

## Couleurs
| Nom | Valeur | Usage |
|-----|--------|-------|
| Primary | #6366f1 | Boutons, accents |
| Background | #0f172a | Fond principal |
| Text | #f1f5f9 | Texte principal |

## Typography
| Nom | Valeur | Usage |
|-----|--------|-------|
| Font Family | -apple-system, sans-serif | Par défaut |
| H1 | 2rem | Titres principaux |
| H2 | 1.5rem | Titres secondaires |

## Spacing
| Nom | Valeur | Usage |
|-----|--------|-------|
| xs | 4px | Micro-espacement |
| sm | 8px | Petit espacement |
| md | 16px | Espacement standard |
| lg | 24px | Grand espacement |
    `;
    
    document.getElementById('summaryContent').innerHTML = marked.parse(tokens);
    
    // Basculer vers l'onglet summary
    document.querySelector('.tab[data-tab="summary"]').click();
}

// Envoyer message chat
function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Ajouter message utilisateur
    const userMsg = `
        <div class="message user">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <p>${escapeHtml(question)}</p>
            </div>
        </div>
    `;
    messages.insertAdjacentHTML('beforeend', userMsg);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // Réponse simulée (à remplacer par ton API IA)
    setTimeout(() => {
        const response = getAIResponse(question);
        const assistantMsg = `
            <div class="message assistant">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', assistantMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 500);
}

// Réponse IA simulée
function getAIResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('design') || q.includes('token')) {
        return 'Je peux extraire les design tokens de ton projet. Clique sur "Extraire Design Tokens" dans les actions rapides !';
    }
    
    if (q.includes('projet') || q.includes('objectif')) {
        return 'Ce projet explore la création d\'un Design System avec composants, tokens et patterns. Clique sur le bouton "Résumer le projet" pour plus de détails.';
    }
    
    if (q.includes('composant')) {
        return 'Les composants sont définis dans docs/ia-design/design-system.md. Sélectionne ce fichier pour les voir.';
    }
    
    return 'Je peux t\'aider à lire et analyser tes fichiers .md. Essaie les actions rapides ou sélectionne un fichier dans la sidebar !';
}

// Échapper HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}