// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · APPS · 0x03 · EXPANDIR · 639Hz · VITALIS · ▢
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_APPS() {
  'use strict';
  const OPCODE = '0x03';
  const HZ = 639;
  const GEO = 'TETRAEDRO';
  const ARQUETIPO = 'VITALIS';
  const EVENTO = 'kobllux:dual:apps:carregado';

  const LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
    raw: (k) => localStorage.getItem(k) || ''
  };

  // SVG icons embutidos
  function svgIcon(name) {
    const common = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f5f7ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const m = {
      atlas:   `<svg ${common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/><path d="M5 8c3 2 11 2 14 0M5 16c3-2 11-2 14 0"/></svg>`,
      nova:    `<svg ${common}><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="3"/></svg>`,
      vitalis: `<svg ${common}><path d="M3 12h4l2-5 4 10 2-5h6"/><path d="M13 3l-2 4 3 1-2 4"/></svg>`,
      pulse:   `<svg ${common}><path d="M2 12h3l2-4 3 8 2-4h8"/><path d="M20 8v-3M20 19v-3"/></svg>`,
      artemis: `<svg ${common}><path d="M3 12h12"/><path d="M13 6l6 6-6 6"/><circle cx="12" cy="12" r="9"/></svg>`,
      serena:  `<svg ${common}><path d="M12 21s-6-3.5-6-8a4 4 0 0 1 6-3 4 4 0 0 1 6 3c0 4.5-6 8-6 8z"/></svg>`,
      kaos:    `<svg ${common}><path d="M4 4l7 7-7 7"/><path d="M20 4l-7 7 7 7"/></svg>`,
      genus:   `<svg ${common}><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M7 7l5-3 5 3M17 17l-5 3-5-3"/></svg>`,
      lumine:  `<svg ${common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
      rhea:    `<svg ${common}><path d="M12 3v6"/><circle cx="12" cy="9" r="4"/><path d="M12 13v2l-2 2M12 15l2 2M12 17v3"/></svg>`,
      solus:   `<svg ${common}><path d="M12 3v6M12 15v6"/><circle cx="12" cy="12" r="3"/><path d="M19 5l-3 3M5 19l3-3M5 5l3 3M19 19l-3-3"/></svg>`,
      aion:    `<svg ${common}><path d="M7 12c0-2.2 1.8-4 4-4 1.2 0 2.3.5 3 1.3M17 12c0 2.2-1.8 4-4 4-1.2 0-2.3-.5-3-1.3"/><path d="M3 12h4M17 12h4"/></svg>`,
      local:   `<svg ${common}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M8 8h8M8 16h5"/></svg>`
    };
    const raw = m[name] || m['atlas'];
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(raw);
  }

  const RAW = { apps: [] };
  let showOnlyLocal = false;
  let favoriteKeys = [];
  try { favoriteKeys = JSON.parse(localStorage.getItem('infodose:favApps') || '[]') || []; } catch (_) { favoriteKeys = []; }

  function toggleFav(key) {
    const idx = favoriteKeys.indexOf(key);
    if (idx >= 0) favoriteKeys.splice(idx, 1); else favoriteKeys.push(key);
    localStorage.setItem('infodose:favApps', JSON.stringify(favoriteKeys));
    renderApps();
  }
  function isFav(key) { return favoriteKeys.includes(key); }

  const appsWrap = document.getElementById('appsWrap');
  const appsCount = document.getElementById('appsCount');

  function normalize(list) {
    return (list || []).map(x => ({
      key: x.key || x.url || x.title || Math.random().toString(36).slice(2),
      title: x.title || x.key || 'App',
      desc: x.desc || '',
      url: String(x.url || ''),
      icon: x.icon || '',
      tags: Array.isArray(x.tags) ? x.tags : []
    }));
  }

  function locals() {
    let arr = [];
    try { arr = JSON.parse(LS.raw('infodose:locals:v1') || '[]'); } catch (_) {}
    return arr.map(l => ({ key: 'local:' + l.id, title: l.name || 'Local', desc: 'HTML local', url: 'local:' + l.id, icon: 'local', tags: ['local'] }));
  }
  function getLocal(id) {
    let arr = [];
    try { arr = JSON.parse(LS.raw('infodose:locals:v1') || '[]'); } catch (_) {}
    return arr.find(x => x.id === id) || null;
  }
  function blobURL(local) {
    const blob = new Blob([local.html || ''], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
  }

  function updateHomeStatus() {
    try {
      const total = normalize(RAW.apps).concat(locals()).length;
      const localCount = locals().length;
      const txtApps = showOnlyLocal ? (localCount + ' local' + (localCount === 1 ? '' : 's')) : (total + ' app' + (total === 1 ? '' : 's'));
      const elApps = document.getElementById('homeAppsStatus');
      if (elApps) elApps.textContent = txtApps;
    } catch (_) {}
    try {
      const sess = document.querySelectorAll('#stackWrap .session').length;
      const elStack = document.getElementById('homeStackStatus');
      if (elStack) elStack.textContent = sess + ' sessão' + (sess === 1 ? '' : 's');
    } catch (_) {}
    try {
      const name = (localStorage.getItem('infodose:userName') || '').trim();
      const theme = LS.get('uno:theme', 'medium');
      const themeLabel = { default: 'padrão', medium: 'cinza', custom: 'personalizado' }[theme] || theme;
      const elUser = document.getElementById('homeUserStatus');
      if (elUser) elUser.textContent = (name || 'Usuário') + ' · ' + themeLabel;
    } catch (_) {}
    try {
      const sel = document.getElementById('arch-select');
      let archName = '';
      if (sel && sel.options.length > 0) {
        const opt = sel.options[sel.selectedIndex] || null;
        if (opt) archName = opt.textContent.replace(/\.html$/i, '');
      }
      const elArch = document.getElementById('homeArchStatus');
      if (elArch) elArch.textContent = archName || 'Nenhum';
    } catch (_) {}
  }

  function appIconFor(a) {
    if (!a.icon) return svgIcon('atlas');
    if (/^(atlas|nova|vitalis|pulse|artemis|serena|kaos|genus|lumine|rhea|solus|aion|local)$/.test(a.icon)) return svgIcon(a.icon);
    return a.icon;
  }

  function cardApp(a) {
    const el = document.createElement('div');
    el.className = 'app-card fx-trans fx-lift';
    const fav = document.createElement('button');
    fav.className = 'fav-btn';
    const favImg = document.createElement('img');
    favImg.alt = 'Favorito'; favImg.src = 'icons/star.svg';
    fav.appendChild(favImg);
    if (isFav(a.key)) fav.classList.add('fav');
    fav.onclick = (e) => { e.stopPropagation(); toggleFav(a.key); };
    el.appendChild(fav);
    const ic = document.createElement('div');
    ic.className = 'app-icon';
    const img = document.createElement('img');
    img.alt = ''; img.width = 24; img.height = 24; img.src = appIconFor(a);
    ic.appendChild(img);
    const meta = document.createElement('div');
    meta.style.flex = '1';
    const fullTitle = String(a.title || a.key || '').trim();
    const words = fullTitle.split(/\s+/);
    const truncated = words.slice(0, 2).join(' ');
    const displayTitle = words.length > 2 ? truncated + '…' : truncated;
    const t = document.createElement('div');
    t.className = 'app-title';
    t.textContent = displayTitle || fullTitle;
    t.title = fullTitle;
    const d = document.createElement('div');
    d.className = 'mut'; d.textContent = a.desc || a.url;
    const open = document.createElement('button');
    open.className = 'btn fx-trans fx-press ring'; open.textContent = 'Abrir';
    const rip = document.createElement('span');
    rip.className = 'ripple'; open.appendChild(rip);
    if (typeof window.addRipple === 'function') window.addRipple(open);
    open.onclick = () => { if (typeof window.openApp === 'function') window.openApp(a); };
    meta.appendChild(t); meta.appendChild(d); meta.appendChild(open);
    el.appendChild(ic); el.appendChild(meta);
    return el;
  }

  function renderApps() {
    if (!appsWrap) return;
    const searchEl = document.getElementById('appSearch');
    const sortEl = document.getElementById('appSort');
    const q = searchEl ? (searchEl.value || '').toLowerCase() : '';
    const mode = sortEl ? sortEl.value : 'az';
    let L = normalize(RAW.apps).concat(locals());
    if (showOnlyLocal) L = L.filter(a => String(a.url || '').startsWith('local:'));
    if (q) L = L.filter(a => (a.title + ' ' + a.desc + ' ' + a.key + ' ' + a.url + ' ' + (a.tags || []).join(' ')).toLowerCase().includes(q));
    L.sort((a, b) => {
      const favA = isFav(a.key); const favB = isFav(b.key);
      if (favA !== favB) return favB - favA;
      const dir = mode === 'za' ? -1 : 1;
      return dir * String(a.title || '').localeCompare(b.title || '');
    });
    const grouped = {};
    L.forEach(a => {
      let gName = '';
      if (a.title && a.title.includes('·')) { const parts = a.title.split('·'); gName = (parts[1] || '').trim(); }
      if (!gName) gName = 'Outros';
      if (!grouped[gName]) grouped[gName] = [];
      grouped[gName].push(a);
    });
    appsWrap.innerHTML = '';
    const groupNames = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    let total = 0;
    groupNames.forEach(gName => {
      const container = document.createElement('div');
      container.className = 'apps-group';
      const header = document.createElement('h3');
      header.textContent = gName;
      header.style.cssText = 'margin:16px 4px 8px;font-size:15px;font-weight:800;color:var(--mut)';
      const grid = document.createElement('div');
      grid.className = 'grid';
      grouped[gName].forEach(app => { grid.appendChild(cardApp(app)); total++; });
      container.appendChild(header); container.appendChild(grid);
      appsWrap.appendChild(container);
    });
    if (appsCount) appsCount.textContent = total + ' apps';
    try { if (typeof window.applyIcons === 'function') window.applyIcons(); } catch (_) {}
    if (typeof window.maybeSendAppsToRevo === 'function') window.maybeSendAppsToRevo();
    try { updateHomeStatus(); } catch (_) {}
  }

  // Load embedded apps
  (function loadEmbeddedApps() {
    try {
      const el = document.getElementById('APPS_JSON');
      if (el) {
        const raw = JSON.parse(el.textContent || '{}');
        RAW.apps = Array.isArray(raw.apps) ? raw.apps : (Array.isArray(raw) ? raw : []);
      }
    } catch (_) { RAW.apps = []; }
    renderApps();
    try { if (typeof window.ensureDefaultGroups === 'function') window.ensureDefaultGroups(); } catch (e) { console.warn('Falha ao criar grupos padrão', e); }
    try {
      const iframe = document.getElementById('revoEmbed');
      if (iframe) {
        const apps = RAW && Array.isArray(RAW.apps) ? RAW.apps : [];
        const send = () => { if (iframe.contentWindow) iframe.contentWindow.postMessage({ type: 'apps', apps }, '*'); };
        setTimeout(send, 100);
        iframe.addEventListener('load', send, { once: true });
      }
    } catch (e) { console.warn('Falha ao postMessage apps:', e); }
  })();

  // Local file import/export
  const btnImport = document.getElementById('btnImport');
  const fileLocal = document.getElementById('fileLocal');
  if (btnImport && fileLocal) {
    btnImport.onclick = async () => {
      const fs = Array.from(fileLocal.files || []);
      if (!fs.length) return;
      const tasks = fs.map(f => new Promise(res => {
        const r = new FileReader();
        r.onload = () => {
          const content = String(r.result || '');
          if (/\.json$/i.test(f.name)) {
            try {
              const obj = JSON.parse(content);
              RAW.apps = Array.isArray(obj.apps) ? obj.apps : (Array.isArray(obj) ? obj : []);
              renderApps();
              if (typeof window.toast === 'function') window.toast('apps.json local carregado', 'ok');
            } catch (err) { if (typeof window.toast === 'function') window.toast('Erro ao ler apps.json', 'err'); }
            res(null);
          } else {
            res({ id: 'l_' + Math.random().toString(36).slice(2), name: f.name.replace(/\.(html?|txt)$/i, ''), html: content, ts: Date.now() });
          }
        };
        r.readAsText(f);
      }));
      const list = (await Promise.all(tasks)).filter(Boolean);
      const cur = JSON.parse(LS.raw('infodose:locals:v1') || '[]');
      list.forEach(x => cur.unshift(x));
      localStorage.setItem('infodose:locals:v1', JSON.stringify(cur));
      renderApps();
      if (list.length && typeof window.toast === 'function') window.toast('HTMLs locais adicionados', 'ok');
    };
  }
  const btnExport = document.getElementById('btnExport');
  if (btnExport) {
    btnExport.onclick = () => {
      const data = { v: 1, when: Date.now(), items: JSON.parse(LS.raw('infodose:locals:v1') || '[]') };
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      a.download = 'locals_pack.json'; a.click();
    };
  }
  const btnClear = document.getElementById('btnClear');
  if (btnClear) {
    btnClear.onclick = () => {
      if (confirm('Limpar HTMLs locais salvos?')) {
        localStorage.removeItem('infodose:locals:v1');
        renderApps();
        if (typeof window.toast === 'function') window.toast('Locais limpos', 'warn');
      }
    };
  }
  try {
    const btnToggleLocal = document.getElementById('btnToggleLocal');
    if (btnToggleLocal) {
      btnToggleLocal.onclick = () => {
        showOnlyLocal = !showOnlyLocal;
        if (btnToggleLocal.firstChild) btnToggleLocal.firstChild.nodeValue = showOnlyLocal ? 'Mostrar Todos' : 'Mostrar Locais';
        renderApps();
      };
    }
  } catch (e) { console.warn('Falha ao associar btnToggleLocal:', e); }

  window.svgIcon = svgIcon;
  window.RAW = RAW;
  window.toggleFav = toggleFav;
  window.isFav = isFav;
  window.normalize = normalize;
  window.locals = locals;
  window.getLocal = getLocal;
  window.blobURL = blobURL;
  window.updateHomeStatus = updateHomeStatus;
  window.appIconFor = appIconFor;
  window.cardApp = cardApp;
  window.renderApps = renderApps;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.APPS = { svgIcon, RAW, renderApps, updateHomeStatus, cardApp, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-apps', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.APPS }));
})();
