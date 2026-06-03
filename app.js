// Minimal, focused behavior: central prompt, recent list, slide-over tokens, concise outputs
const markdownFiles = [
  'docs/CLAUDE.md',
  'docs/ia-design/design-system.md',
  'README.md'
];

document.addEventListener('DOMContentLoaded', ()=> {
  initRecent();
  bindUI();
  preloadAssets();
});

function initRecent(){
  const recent = ['Créer landing page', 'Extraire tokens', 'Préparer handoff', 'Vérifier contrastes'];
  const ul = document.getElementById('recentList');
  recent.forEach(r=>{
    const li = document.createElement('li');
    li.textContent = r;
    li.addEventListener('click', ()=> {
      document.getElementById('prompt').value = r;
      triggerAction(r);
    });
    ul.appendChild(li);
  });
}

function bindUI(){
  document.getElementById('analyzeBtn').addEventListener('click', ()=> {
    document.getElementById('prompt').value = 'Analyse le design system et extrais les tokens principaux';
    triggerAction('analyze');
  });
  document.getElementById('generateBtn').addEventListener('click', ()=> {
    document.getElementById('prompt').value = 'Génère une page d\'accueil à partir des tokens et composants';
    triggerAction('generate');
  });
  document.getElementById('plus').addEventListener('click', ()=> {
    openPanel('quick-actions', 'Actions rapides');
  });
  document.getElementById('closePanel')?.addEventListener('click', ()=> closePanel());
  document.getElementById('prompt').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if(val) triggerAction(val);
    }
  });
}

async function preloadAssets(){
  // load tokens and components if available (optional)
  try{
    const [t,c] = await Promise.all([
      fetch('design-tokens.json').then(r=> r.ok ? r.json(): null).catch(()=>null),
      fetch('components-manifest.json').then(r=> r.ok ? r.json(): null).catch(()=>null)
    ]);
    window.AGENT_TOKENS = t;
    window.AGENT_COMPONENTS = c;
  }catch(e){
    console.warn('assets preloading failed', e);
  }
}

function openPanel(kind, title){
  const panel = document.getElementById('panel');
  panel.classList.remove('hidden');
  panel.setAttribute('aria-hidden','false');
  document.getElementById('panelTitle').textContent = title;
  const body = document.getElementById('panelBody');
  body.innerHTML = '';

  if(kind === 'quick-actions'){
    body.innerHTML = `<p style="color:#6b7280;margin-bottom:12px">Actions rapides pour automatiser ton design workflow</p>
      <button class="cta" onclick="triggerAction('analyze')">Analyser le DS</button>
      <button class="cta ghost" style="margin-left:8px" onclick="triggerAction('generate')">Générer page</button>
      <div style="height:12px"></div>
      <button class="cta ghost" onclick="triggerAction('handoff')">Préparer handoff</button>`;
    return;
  }

  if(kind === 'tokens') {
    const t = window.AGENT_TOKENS;
    if(!t) return body.innerHTML = '<p style="color:#6b7280">Aucun token trouvé</p>';
    const rows = Object.entries(t.colors||{}).map(([k,v]) => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div style="width:28px;height:20px;background:${v};border-radius:6px;border:1px solid rgba(0,0,0,0.06)"></div><div style="flex:1">${k}</div><code style="color:#6b7280">${v}</code></div>`).join('');
    body.innerHTML = `<h4>Couleurs</h4>${rows}`;
    return;
  }

  // default: show components
  const comps = (window.AGENT_COMPONENTS && window.AGENT_COMPONENTS.components) || [];
  if(comps.length === 0) body.innerHTML = '<p style="color:#6b7280">Aucun composant détecté</p>';
  else {
    body.innerHTML = comps.map(c => `<div style="padding:10px;border-radius:8px;background:#fff;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center"><div style="font-weight:600;color:#0b1220">${c.name}</div><div style="font-size:12px;color:#6b7280">${c.type}</div></div>`).join('');
  }
}

function closePanel(){
  const panel = document.getElementById('panel');
  panel.classList.add('hidden');
  panel.setAttribute('aria-hidden','true');
}

function renderResult(title, bodyHtml){
  const results = document.getElementById('results');
  results.classList.remove('hidden');
  results.innerHTML = `<div class="card"><strong>${title}</strong><div style="margin-top:8px;color:#374151">${bodyHtml}</div></div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}

async function triggerAction(input){
  // normalize common actions
  const q = (input||'').toLowerCase();
  if(q.includes('analy') || q.includes('token')){
    // local extraction if tokens loaded
    if(window.AGENT_TOKENS){
      const t = window.AGENT_TOKENS;
      const summary = Object.entries(t.colors||{}).slice(0,6).map(([k,v])=>`<div style="display:flex;justify-content:space-between"><span>${k}</span><code style="color:#6b7280">${v}</code></div>`).join('');
      renderResult('Design tokens (extrait)', summary + `<div style="margin-top:12px"><button class="cta ghost" onclick="openPanel('tokens','Tokens')">Voir tous les tokens</button></div>`);
      return;
    }
    renderResult('Analyse', 'Aucun fichier tokens local. Clique sur "Analyser mon design system" pour extraire les tokens depuis Figma/Docs.');
    return;
  }

  if(q.includes('gener') || q.includes('page') || q.includes('landing')){
    // create a simple HD-ready UI snippet using tokens if available
    const tokens = window.AGENT_TOKENS ? window.AGENT_TOKENS.colors : null;
    const primary = tokens?.primary || '#ff7900';
    const html = `
      <div style="padding:12px;border-radius:8px;background:linear-gradient(180deg,rgba(255,121,0,0.06),transparent);">
        <div style="font-weight:700;margin-bottom:6px">Landing prototype</div>
        <div style="color:#374151">Hero with title, subtitle and CTA using primary color</div>
        <div style="margin-top:10px"><pre style="background:#fff;padding:12px;border-radius:8px;color:#111"><code>&lt;button style="background:${primary};color:#fff;padding:10px 14px;border-radius:999px"&gt;Call to action&lt;/button&gt;</code></pre></div>
      </div>`;
    renderResult('Prototype généré', html + `<div style="margin-top:12px"><button class="cta" onclick="copySnippet()">Copier le snippet</button></div>`);
    return;
  }

  if(q.includes('handoff')){
    renderResult('Handoff', 'Génération du paquet handoff : liste composants + tokens + guide rapide (telechargeable). (Prototype local — connecte l’API pour générer le ZIP).');
    return;
  }

  // default: echo short answer and suggest quick actions
  renderResult('Réponse rapide', `<div>${escapeHtml(input)}</div><div style="margin-top:12px;display:flex;gap:8px"><button class="cta" onclick="triggerAction('analyze')">Analyser</button><button class="cta ghost" onclick="triggerAction('generate')">Générer</button></div>`);
}

function copySnippet(){
  // copy simplified snippet to clipboard
  const txt = '<button class="btn-primary">Call to action</button>';
  navigator.clipboard.writeText(txt).then(()=> alert('Snippet copié'));
}

function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}