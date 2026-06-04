// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · OVERLAY · 0x00 · ORIGEM · 768Hz · KOBLLUX · ○
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_OVERLAY() {
  'use strict';
  const OPCODE = '0x00';
  const HZ = 768;
  const GEO = 'PONTO';
  const ARQUETIPO = 'KOBLLUX';
  const EVENTO = 'kobllux:dual:overlay:carregado';

  const LSget = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  // Inject Blue-1 theme option if missing
  document.addEventListener('DOMContentLoaded', function () {
    try {
      const sel = document.getElementById('themeSelect');
      if (sel && !Array.from(sel.options).some(o => o.value === 'blue1')) {
        const opt = document.createElement('option');
        opt.value = 'blue1'; opt.textContent = 'Blue‑1 (azul)';
        sel.appendChild(opt);
      }
    } catch (_) {}
  });

  // Visual & 3D panel in Brain view
  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('#v-brain .grid');
    if (!grid) return;
    const panel = document.createElement('div');
    panel.className = 'card fx-trans fx-lift';
    panel.style.display = 'block';
    panel.innerHTML = `
      <div style="font-weight:800">Visual & 3D (presets)</div>
      <div style="margin-top:8px;display:grid;gap:10px">
        <label style="display:flex;align-items:center;gap:8px"><span>Preset:</span>
          <select id="visualPreset" class="input ring" style="max-width:260px">
            <option value="blue1">Blue‑1 (shader)</option>
            <option value="strong">Strong</option>
            <option value="cinematic-soft">Cinematic Soft</option>
          </select>
        </label>
        <label style="display:flex;align-items:center;gap:8px"><input id="overlayToggle" type="checkbox" /><span>Overlay de cor por arquétipo</span></label>
        <label style="display:flex;align-items:center;gap:8px"><input id="bloomToggle" type="checkbox" /><span>Bloom fotográfico (post)</span></label>
        <label style="display:flex;align-items:center;gap:8px"><span>Glow/Toon:</span><input id="glowRange" type="range" min="0" max="1" step="0.05" style="flex:1" /><span id="glowVal" class="mut" style="width:42px;text-align:right">0.80</span></label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button id="applyVisual" class="btn prime fx-trans fx-press ring">Aplicar<span class="ripple"></span></button>
          <button id="resetVisual" class="btn fx-trans fx-press ring">Padrão<span class="ripple"></span></button>
        </div>
        <div class="mut" style="font-size:11px">As preferências são salvas no seu navegador e enviadas ao arquétipo ativo.</div>
      </div>`;
    grid.appendChild(panel);

    const selPreset = $('#visualPreset', panel); const chkOverlay = $('#overlayToggle', panel);
    const chkBloom = $('#bloomToggle', panel); const rngGlow = $('#glowRange', panel);
    const spnGlow = $('#glowVal', panel); const btnApply = $('#applyVisual', panel); const btnReset = $('#resetVisual', panel);

    selPreset.value = LSget('arch:visualPreset', 'blue1');
    chkOverlay.checked = !!LSget('arch:overlayOn', false);
    chkBloom.checked = !!LSget('arch:bloomOn', false);
    rngGlow.value = LSget('arch:glowStrength', 0.80);
    spnGlow.textContent = Number(LSget('arch:glowStrength', 0.80)).toFixed(2);
    rngGlow.addEventListener('input', () => { spnGlow.textContent = Number(rngGlow.value).toFixed(2); });

    function saveAndApply() {
      const state = { preset: selPreset.value, overlayOn: !!chkOverlay.checked, bloomOn: !!chkBloom.checked, glow: Number(rngGlow.value) };
      ['arch:visualPreset','arch:overlayOn','arch:bloomOn','arch:glowStrength'].forEach((k, i) => localStorage.setItem(k, JSON.stringify(Object.values(state)[i])));
      try { const sel = document.getElementById('arch-select'); const base = (sel && sel.value ? sel.value : '').replace(/\.html$/i, ''); if (typeof window.applyArchOverlay === 'function') window.applyArchOverlay(base); } catch (_) {}
      if (typeof window.sendVisualSettingsToFrame === 'function') try { window.sendVisualSettingsToFrame(); } catch (_) {}
    }
    btnApply.addEventListener('click', saveAndApply);
    btnReset.addEventListener('click', () => { selPreset.value = 'blue1'; chkOverlay.checked = false; chkBloom.checked = false; rngGlow.value = 0.80; spnGlow.textContent = '0.80'; saveAndApply(); });
  });

  // Patched arch overlays
  const ARCH_OVERLAYS_PATCHED = {
    atlas: 'rgba(64,158,255,0.22)', nova: 'rgba(255,82,177,0.22)', vitalis: 'rgba(87,207,112,0.22)',
    pulse: 'rgba(0,191,255,0.22)', artemis: 'rgba(255,195,0,0.22)', serena: 'rgba(186,130,219,0.22)',
    kaos: 'rgba(255,77,109,0.22)', genus: 'rgba(87,207,112,0.22)', lumine: 'rgba(255,213,79,0.22)',
    solus: 'rgba(186,130,219,0.22)', rhea: 'rgba(0,209,178,0.22)', aion: 'rgba(255,159,67,0.22)',
    default: 'rgba(255,255,255,0.0)'
  };
  window.ARCH_OVERLAYS_PATCHED = ARCH_OVERLAYS_PATCHED;

  // Override applyArchOverlay to honor overlay toggle
  (function () {
    window.applyArchOverlay = function (name) {
      const key = (name || '').toLowerCase();
      const on = !!LSget('arch:overlayOn', false);
      const color = on ? (ARCH_OVERLAYS_PATCHED[key] || ARCH_OVERLAYS_PATCHED.default) : 'rgba(0,0,0,0)';
      document.documentElement.style.setProperty('--arch-overlay', color);
    };
    document.addEventListener('DOMContentLoaded', function () {
      const sel = document.getElementById('arch-select');
      const base = (sel && sel.value ? sel.value : '').replace(/\.html$/i, '');
      window.applyArchOverlay(base);
    });
  })();

  // Visual settings → iframe
  function currentVisualSettings() {
    return { preset: LSget('arch:visualPreset', 'blue1'), bloom: !!LSget('arch:bloomOn', false), glow: Number(LSget('arch:glowStrength', 0.80)), overlayOn: !!LSget('arch:overlayOn', false) };
  }
  window.sendVisualSettingsToFrame = function () {
    try { const f = document.getElementById('arch-frame'); if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'visualSettings', data: currentVisualSettings() }, '*'); } catch (_) {}
  };
  document.addEventListener('DOMContentLoaded', function () {
    const f = document.getElementById('arch-frame');
    if (f) { f.addEventListener('load', () => { try { window.sendVisualSettingsToFrame(); } catch (_) {} }); setTimeout(() => { try { window.sendVisualSettingsToFrame(); } catch (_) {} }, 800); }
  });
  window.addEventListener('message', (ev) => { const msg = ev && ev.data || {}; if (msg && msg.type === 'archReady') { try { window.sendVisualSettingsToFrame(); } catch (_) {} } });

  // initArchSelect: restore saved arch
  (function () {
    function initArchSelect() {
      const sel = document.getElementById('arch-select'); if (!sel) return;
      const saved = (localStorage.getItem('uno:arch') || localStorage.getItem('infodose:arch') || '').replace(/\.html$/i, '');
      let idx = -1;
      for (let i = 0; i < sel.options.length; i++) { const v = sel.options[i].value.replace(/\.html$/i, ''); if (saved && v === saved) { idx = i; break; } }
      sel.selectedIndex = idx;
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initArchSelect); else initArchSelect();
  })();

  // Overlay transparency gate
  (function () {
    function setOverlayTransparent() {
      try { document.documentElement.style.setProperty('--arch-overlay', 'rgba(0,0,0,0)'); document.documentElement.style.setProperty('--arch-overlay-strength', '0%'); } catch (_) {}
    }
    function gateApply() {
      window.applyArchOverlay = function (name) {
        const on = !!LSget('arch:overlayOn', false);
        if (!on) { setOverlayTransparent(); return; }
        const key = (name || '').toLowerCase();
        const MAP = window.ARCH_OVERLAYS_PATCHED || window.ARCH_OVERLAYS || { default: 'rgba(0,0,0,0)' };
        const color = MAP[key] || MAP.default || 'rgba(0,0,0,0)';
        try { document.documentElement.style.setProperty('--arch-overlay', color); } catch (_) {}
      };
      const sel = document.getElementById('arch-select');
      const base = (sel && sel.value ? sel.value : '').replace(/\.html$/i, '');
      if (!LSget('arch:overlayOn', false)) setOverlayTransparent(); else window.applyArchOverlay(base);
    }
    if (document.readyState === 'complete') gateApply(); else window.addEventListener('load', gateApply);
  })();

  // Overlay enforcement via polling + storage events
  (function () {
    function enforce() {
      const on = !!LSget('arch:overlayOn', false);
      document.documentElement.setAttribute('data-overlay', on ? 'on' : 'off');
      if (!on) {
        try {
          document.documentElement.style.setProperty('--arch-overlay', 'rgba(0,0,0,0)');
          document.documentElement.style.setProperty('--arch-overlay-strength', '0%');
          const fade = document.getElementById('arch-fadeCover');
          if (fade) fade.style.background = 'transparent';
        } catch (_) {}
      }
    }
    function bind() {
      enforce();
      setInterval(enforce, 500);
      window.addEventListener('storage', (ev) => { if (ev && ev.key === 'arch:overlayOn') enforce(); });
      document.addEventListener('click', (e) => { const t = e.target; if (!t) return; if (t.id === 'overlayToggle' || (t.closest && t.closest('#overlayToggle'))) setTimeout(enforce, 60); }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  })();

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.OVERLAY = { ARCH_OVERLAYS_PATCHED, sendVisualSettingsToFrame: window.sendVisualSettingsToFrame, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-overlay', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.OVERLAY }));
})();
