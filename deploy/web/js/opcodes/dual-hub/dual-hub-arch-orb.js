// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · ARCH-ORB · 0x0B · ARQUÉTIPO · 528Hz · KOBLLUX · ◑
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_ARCH_ORB() {
  'use strict';
  const OPCODE = '0x0B';
  const HZ = 528;
  const GEO = 'ICOSAEDRO';
  const ARQUETIPO = 'KOBLLUX';
  const EVENTO = 'kobllux:dual:archorb:carregado';

  // ---- fuseIframeIntoOrb / arch persistence ----
  (function () {
    function $ (q, r) { return (r || document).querySelector(q); }
    function baseName(file) { return String(file || '').replace(/\.html$/i, '').toLowerCase(); }

    function fuseIframeIntoOrb() {
      const wrap = $('#orbWrap'); const frame = $('#arch-frame');
      if (!wrap || !frame) return;
      if (frame.parentElement && frame.parentElement.classList && frame.parentElement.classList.contains('orb-slot')) return;
      const slot = document.createElement('div'); slot.className = 'orb-slot';
      wrap.appendChild(slot); slot.appendChild(frame);
    }

    function currentSelectBase() {
      const sel = $('#arch-select'); if (!sel) return '';
      const opt = sel.options[sel.selectedIndex];
      return baseName(opt && opt.value);
    }

    function applyArch(base) {
      const sel = $('#arch-select'), frame = $('#arch-frame'), fade = $('#arch-fadeCover');
      if (!sel || !frame) return;
      let idx = -1;
      for (let i = 0; i < sel.options.length; i++) { if (baseName(sel.options[i].value) === base) { idx = i; break; } }
      if (idx >= 0) {
        sel.selectedIndex = idx;
        if (fade) fade.classList.add('show');
        frame.src = './archetypes/' + sel.options[idx].value;
        try { if (typeof window.applyArchOverlay === 'function') window.applyArchOverlay(base); } catch (_) {}
        try { if (typeof window.speakArchetype === 'function') window.speakArchetype(base); } catch (_) {}
        try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
        setTimeout(function () { if (fade) fade.classList.remove('show'); }, 240);
      }
    }

    function saveArch(base) {
      if (!base) return;
      try { localStorage.setItem('uno:arch', base); } catch (_) {}
      try {
        if (window.S && window.S.state) {
          window.S.state.archetype = base;
          if (typeof window.saveState === 'function') window.saveState(window.S.state);
        }
      } catch (_) {}
    }

    function bindArchPersistence() {
      const sel = $('#arch-select'), prev = $('#arch-prev'), next = $('#arch-next');
      function persist() { const b = currentSelectBase(); if (b) saveArch(b); }
      if (sel) sel.addEventListener('change', persist, { passive: true });
      if (prev) prev.addEventListener('click', function () { setTimeout(persist, 0); }, { passive: true });
      if (next) next.addEventListener('click', function () { setTimeout(persist, 0); }, { passive: true });
      window.addEventListener('message', function (ev) {
        const d = ev && ev.data || {};
        if (d && d.type === 'archReady' && d.name) saveArch(baseName(d.name));
      });
    }

    function bootWithSavedArch() {
      let saved = (localStorage.getItem('uno:arch') || localStorage.getItem('infodose:arch') || '').replace(/\.html$/i, '');
      saved = baseName(saved);
      if (saved) { const cur = currentSelectBase(); if (cur !== saved) applyArch(saved); }
      else saveArch(currentSelectBase());
    }

    function start() { fuseIframeIntoOrb(); bindArchPersistence(); bootWithSavedArch(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  })();

  // ---- Bloom toggle ----
  (function () {
    const _bState = (localStorage.getItem('dual.ui.bloom') === '1');
    function sendBloom(enabled) {
      try {
        const fr = document.getElementById('arch-frame');
        if (fr && fr.contentWindow) fr.contentWindow.postMessage({ type: 'bloomToggle', enabled: !!enabled }, '*');
        document.documentElement.style.setProperty('--arch-overlay-intensity', enabled ? '0.45' : '0.35');
      } catch (_) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => sendBloom(_bState)); else sendBloom(_bState);
    window._dual_bloom_state = _bState;
    window._dual_bloom_send = sendBloom;
  })();

  // ---- Arch chips (3D layers in ORB panel) ----
  (function () {
    const COLORS = { atlas: '#409EFF', nova: '#FF52B1', vitalis: '#34D399', pulse: '#00BFFF', artemis: '#FFC300', serena: '#B684FF', kaos: '#FF4D6D', genus: '#22C55E', lumine: '#FFD54F', rhea: '#00D1B2', solus: '#6495ED', aion: '#8B5CF6' };
    const PRESET = name => ({ name, color: COLORS[name] || '#88a', count: (name === 'nova' || name === 'pulse' || name === 'lumine') ? 340 : 260, orbitRadius: (name === 'nova' || name === 'serena' || name === 'lumine') ? 0.76 : 0.68, spin: (name === 'nova' || name === 'pulse') ? 0.7 : 0.56, size: 0.010, glow: 0.42 });
    const ACTIVE = new Set();

    function sendLayers() {
      const fr = document.getElementById('arch-frame');
      if (!fr || !fr.contentWindow) return;
      fr.contentWindow.postMessage({ type: 'atomConfigLayers', layers: Array.from(ACTIVE).map(n => PRESET(n)) }, '*');
    }

    function chipEl(name) {
      const b = document.createElement('button');
      b.className = 'arch-chip'; b.textContent = name[0].toUpperCase() + name.slice(1);
      b.style.borderColor = 'rgba(255,255,255,.18)'; b.style.background = 'rgba(255,255,255,.06)';
      b.onclick = () => { if (ACTIVE.has(name)) ACTIVE.delete(name); else ACTIVE.add(name); b.classList.toggle('on', ACTIVE.has(name)); sendLayers(); };
      return b;
    }

    function ensureStyles() {
      if (document.getElementById('archChip3DStyles')) return;
      const st = document.createElement('style'); st.id = 'archChip3DStyles';
      st.textContent = '.arch-chip-wrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px}.arch-chip{appearance:none;border:1px solid var(--ring,rgba(255,255,255,.18));background:var(--glass,rgba(255,255,255,.06));color:var(--txt,#eaf2ff);padding:8px 10px;border-radius:999px;font-size:12px;letter-spacing:.2px;cursor:pointer}.arch-chip.on{background:rgba(57,255,182,.18);border-color:rgba(57,255,182,.45)}.arch-chip-title{font-size:12px;color:var(--muted,#a6b0c0);margin:6px 0 6px;font-weight:800}';
      document.head.appendChild(st);
    }

    function injectInLSPanel() {
      ensureStyles();
      const panel = document.getElementById('lsPanel') || document.querySelector('#lsModal .ls-panel');
      if (!panel || document.getElementById('archChip3DSection')) return;
      const sec = document.createElement('div'); sec.id = 'archChip3DSection'; sec.className = 'preset'; sec.style.marginTop = '10px';
      sec.innerHTML = '<div class="arch-chip-title">Arquétipos (camadas no ORB · 3D)</div>';
      const wrap = document.createElement('div'); wrap.className = 'arch-chip-wrap';
      ['atlas','nova','vitalis','pulse','artemis','serena','kaos','genus','lumine','rhea','solus','aion'].forEach(n => wrap.appendChild(chipEl(n)));
      sec.appendChild(wrap);
      const bloomWrap = document.createElement('div');
      bloomWrap.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px';
      const lbl = document.createElement('div'); lbl.textContent = 'Bloom Nébula'; lbl.className = 'arch-chip-title'; lbl.style.cssText = 'margin:0;font-size:12px';
      const toggle = document.createElement('button'); toggle.id = 'toggleBloomBtn'; toggle.className = 'arch-chip'; toggle.style.minWidth = '92px';
      const state = (localStorage.getItem('dual.ui.bloom') === '1') || !!window._dual_bloom_state;
      if (state) toggle.classList.add('on');
      toggle.textContent = state ? 'Bloom: ON' : 'Bloom: OFF';
      toggle.onclick = function () {
        const now = !toggle.classList.contains('on');
        toggle.classList.toggle('on', now); toggle.textContent = now ? 'Bloom: ON' : 'Bloom: OFF';
        try { localStorage.setItem('dual.ui.bloom', now ? '1' : '0'); } catch (_) {}
        if (window._dual_bloom_send) window._dual_bloom_send(now);
        try { const f = document.getElementById('arch-frame'); if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'bloomToggle', enabled: !!now }, '*'); } catch (_) {}
      };
      sec.insertBefore(bloomWrap, sec.firstChild);
      bloomWrap.appendChild(lbl); bloomWrap.appendChild(toggle);
      const hdr = panel.querySelector('.ls-hdr');
      if (hdr && hdr.parentNode) hdr.parentNode.insertBefore(sec, hdr.nextSibling);
      try {
        const sel = document.getElementById('arch-select');
        const cur = (sel && sel.value || 'atlas.html').replace(/.*\//, '').replace(/\.html$/i, '');
        const archNames = ['atlas','nova','vitalis','pulse','artemis','serena','kaos','genus','lumine','rhea','solus','aion'];
        const btn = wrap.querySelector('button.arch-chip:nth-child(' + (archNames.indexOf(cur) + 1) + ')');
        if (cur && btn) { ACTIVE.add(cur); btn.classList.add('on'); sendLayers(); }
      } catch (_) {}
    }

    function bindLSButton() {
      const btn = document.getElementById('btnLS');
      if (btn && !btn.dataset._chipsHook) { btn.dataset._chipsHook = '1'; btn.addEventListener('click', () => setTimeout(injectInLSPanel, 80), { passive: true }); }
      else setTimeout(injectInLSPanel, 120);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindLSButton); else bindLSButton();
    document.addEventListener('ls:disabled-changed', () => setTimeout(injectInLSPanel, 60));
  })();

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.ARCHORB = { HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-arch-orb', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.ARCHORB }));
})();
