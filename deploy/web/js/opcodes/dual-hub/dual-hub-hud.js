// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · HUD · 0x08 · TESTEMUNHAR · 852Hz · HORUS · ◉
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_HUD() {
  'use strict';
  const OPCODE = '0x08';
  const HZ = 852;
  const GEO = 'ESPIRALADO';
  const ARQUETIPO = 'HORUS';
  const EVENTO = 'kobllux:dual:hud:carregado';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  function setLS(k, v) { try { localStorage.setItem(k, String(v)); } catch (_) {} }
  function getNum(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : parseFloat(v); } catch (_) { return d; } }
  function getFlag(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v === '1'; } catch (_) { return d; } }

  // Performance defaults
  const DEF = { target: 50, minS: 96, minR: 80, cap: 360, dn: 0.85, up: 1.06 };
  const KP = { en: 'dual.perf.enable', tgt: 'dual.perf.target', s: 'dual.perf.minSingle', r: 'dual.perf.minRing', cap: 'dual.perf.maxCap', dn: 'dual.perf.stepDown', up: 'dual.perf.stepUp' };
  if (localStorage.getItem(KP.en) == null) setLS(KP.en, '1');
  if (localStorage.getItem(KP.tgt) == null) setLS(KP.tgt, DEF.target);
  if (localStorage.getItem(KP.s) == null) setLS(KP.s, DEF.minS);
  if (localStorage.getItem(KP.r) == null) setLS(KP.r, DEF.minR);
  if (localStorage.getItem(KP.cap) == null) setLS(KP.cap, DEF.cap);
  if (localStorage.getItem(KP.dn) == null) setLS(KP.dn, DEF.dn);
  if (localStorage.getItem(KP.up) == null) setLS(KP.up, DEF.up);
  if (localStorage.getItem('dual.atom.count') == null) setLS('dual.atom.count', 160);
  if (localStorage.getItem('dual.atom.orbit') == null) setLS('dual.atom.orbit', 0.74);
  if (localStorage.getItem('dual.atom.glow') == null) setLS('dual.atom.glow', 0.38);
  if (localStorage.getItem('dual.ui.bloom') == null) setLS('dual.ui.bloom', 0);
  document.body.setAttribute('data-orb-solid', 'off');

  function panel() {
    return $('#lsPanel') || $('#lsModal .ls-panel') || document.querySelector('.ls-panel') || document.querySelector('.panel-ls') || document.querySelector('.settings-panel');
  }

  function ensureSection() {
    const p = panel();
    if (!p || $('#perfControlsV371')) return;
    const tgt = getNum(KP.tgt, DEF.target), ms = getNum(KP.s, DEF.minS), mr = getNum(KP.r, DEF.minR),
      cap = getNum(KP.cap, DEF.cap), dn = getNum(KP.dn, DEF.dn), up = getNum(KP.up, DEF.up), en = getFlag(KP.en, true);
    const sec = document.createElement('section'); sec.id = 'perfControlsV371';
    sec.innerHTML = `
      <div class="section-title">Desempenho (FPS Target)</div>
      <div id="perfHud">
        <div class="stats"><span class="badge">FPS: <strong id="hudFps">—</strong></span><span class="badge">Meta: <strong id="hudTarget">${tgt}</strong></span></div>
        <button id="perfEnable" class="pill-btn ${en ? 'on' : ''}">${en ? 'Auto' : 'Manual'}</button>
      </div>
      <div class="line"><label>Meta de FPS</label><div><input id="fpsTarget" type="range" min="30" max="60" step="1" value="${tgt}" /><output id="fpsTargetOut">${tgt}</output></div></div>
      <div class="line"><label>Min (single)</label><div><input id="minSingle" type="range" min="48" max="160" step="2" value="${ms}" /><output id="minSingleOut">${ms}</output></div></div>
      <div class="line"><label>Min por anel</label><div><input id="minRing" type="range" min="48" max="160" step="2" value="${mr}" /><output id="minRingOut">${mr}</output></div></div>
      <div class="line"><label>Máximo</label><div><input id="maxCap" type="range" min="160" max="680" step="10" value="${cap}" /><output id="maxCapOut">${cap}</output></div></div>
      <div class="line"><label>Passo Reduzir</label><div><input id="stepDn" type="range" min="0.70" max="0.95" step="0.01" value="${dn}" /><output id="stepDnOut">${dn.toFixed(2)}</output></div></div>
      <div class="line"><label>Passo Aumentar</label><div><input id="stepUp" type="range" min="1.01" max="1.15" step="0.01" value="${up}" /><output id="stepUpOut">${up.toFixed(2)}</output></div></div>
      <div class="section-title">Partículas do Átomo — SAFE</div>
      <div class="line"><label>Quantidade</label><div><input id="safe-count" type="range" min="48" max="220" step="4" value="${getNum('dual.atom.count', 160)}" /><output id="safe-count-out">${getNum('dual.atom.count', 160)}</output></div></div>
      <div class="line"><label>Órbita</label><div><input id="safe-orbit" type="range" min="0.60" max="0.86" step="0.01" value="${getNum('dual.atom.orbit', 0.74)}" /><output id="safe-orbit-out">${getNum('dual.atom.orbit', 0.74).toFixed(2)}</output></div></div>
      <div class="line"><label>Glow</label><div><input id="safe-glow" type="range" min="0.00" max="1.00" step="0.01" value="${getNum('dual.atom.glow', 0.38)}" /><output id="safe-glow-out">${getNum('dual.atom.glow', 0.38).toFixed(2)}</output></div></div>`;
    p.prepend(sec);

    function bindR(id, k, fmt) {
      const el = $('#' + id); const out = $('#' + id + 'Out'); if (!el) return;
      fmt = fmt || ((v) => v);
      el.addEventListener('input', () => {
        const val = parseFloat(el.value);
        if (out) out.textContent = fmt(val);
        setLS(k, val);
        if ($('#hudTarget') && id === 'fpsTarget') $('#hudTarget').textContent = String(val);
      });
    }
    bindR('fpsTarget', KP.tgt);
    bindR('minSingle', KP.s);
    bindR('minRing', KP.r);
    bindR('maxCap', KP.cap);
    bindR('stepDn', KP.dn, (v) => v.toFixed(2));
    bindR('stepUp', KP.up, (v) => v.toFixed(2));

    ['safe-count','safe-orbit','safe-glow'].forEach(id => {
      const el = $('#' + id); const out = $('#' + id + '-out');
      if (el) el.addEventListener('input', () => {
        if (out) out.textContent = id === 'safe-count' ? el.value : parseFloat(el.value).toFixed(2);
        setLS(el.id === 'safe-count' ? 'dual.atom.count' : el.id === 'safe-orbit' ? 'dual.atom.orbit' : 'dual.atom.glow', el.value);
      });
    });

    const enBtn = $('#perfEnable');
    if (enBtn) enBtn.addEventListener('click', () => { const now = !enBtn.classList.contains('on'); enBtn.classList.toggle('on', now); enBtn.textContent = now ? 'Auto' : 'Manual'; setLS(KP.en, now ? '1' : '0'); });

    let L = performance.now(), F = 0;
    function hudTick(t) { F++; if (t - L >= 1000) { const fps = F; F = 0; L = t; const hudFps = $('#hudFps'); if (hudFps) hudFps.textContent = fps; } requestAnimationFrame(hudTick); }
    requestAnimationFrame(hudTick);
  }

  // ---- HD·PRO panel ----
  function toast(msg, ms) {
    ms = ms || 1800;
    let t = $('#hdToast');
    if (!t) { t = document.createElement('div'); t.id = 'hdToast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t.__t); t.__t = setTimeout(() => t.classList.remove('show'), ms);
  }

  function mountHandle() {
    if ($('#lsHandle')) return;
    const btn = document.createElement('button'); btn.id = 'lsHandle'; btn.title = 'Abrir/fechar painel (LS)'; document.body.appendChild(btn);
    on(btn, 'click', function toggleBrain() {
      const brain = $('#brain');
      if (!brain) { toast('Painel LS não encontrado (#brain)'); return; }
      brain.classList.toggle('hide'); btn.classList.toggle('on', !brain.classList.contains('hide'));
    });
  }

  function mountHDPro() {
    const brain = $('#brain .popover') || $('#brain');
    if (!brain || brain.__hdproMounted) return;
    brain.__hdproMounted = true;
    const sec = document.createElement('section'); sec.className = 'hdpro-sec';
    sec.innerHTML = `<div class="sec-hdr"><h3>HD • Pro — Sistema</h3><button class="hd-btn ok" id="hdRefresh">Atualizar</button></div>
      <div class="hdpro-grid">
        <div class="hdpro-row"><div><div class="hdpro-label">LocalStorage</div><div class="hdpro-meter"><div class="bar" id="barLS"></div></div></div><div class="hdpro-val" id="valLS">–</div></div>
        <div class="hdpro-row"><div><div class="hdpro-label">IndexedDB (estimado)</div><div class="hdpro-meter"><div class="bar" id="barIDB"></div></div></div><div class="hdpro-val" id="valIDB">–</div></div>
        <div class="hdpro-row"><div><div class="hdpro-label">Total (Storage API)</div><div class="hdpro-meter"><div class="bar" id="barTotal"></div></div></div><div class="hdpro-val" id="valTotal">–</div></div>
        <div class="hdpro-actions">
          <button class="hd-btn" id="btnToggleOrb">Ocultar opções avançadas do ORB/FPS</button>
          <button class="hd-btn" id="btnImportFix">Importar HTML (corrigido)</button>
          <input id="__fileImportHD" type="file" accept=".html,.htm" style="display:none" />
          <button class="hd-btn danger" id="btnClearLS">Limpar LocalStorage</button>
          <button class="hd-btn danger" id="btnClearIDB">Limpar IndexedDB</button>
        </div>
      </div>`;
    brain.appendChild(sec);

    on($('#btnToggleOrb', sec), 'click', () => {
      let toggled = 0;
      ['[data-orb-adv]','#orbAdv','.orb-adv','[data-orb-advanced]','#fpsPanel','.fps-adv','#orbControls','.orb-controls'].forEach(sel => {
        $$(sel).forEach(el => { el.classList.toggle('hdpro-adv-hidden'); toggled++; });
      });
      toast(toggled ? 'Avançados ORB/FPS alternados' : 'Nenhum bloco avançado encontrado');
    });

    const fileInput = $('#__fileImportHD', sec);
    on($('#btnImportFix', sec), 'click', () => fileInput && fileInput.click());
    on(fileInput, 'change', (e) => {
      const file = e.target.files && e.target.files[0]; if (!file) return;
      const url = URL.createObjectURL(file); const name = file.name || 'arquivo.html';
      const anchor = $('#sessionsAnchor') || $('#stackWrap') || $('#v-stack') || $('main');
      if (anchor) {
        const wrap = document.createElement('div'); wrap.className = 'session';
        wrap.innerHTML = '<div class="hdr"><span class="app-icon">' + (name[0] || 'W').toUpperCase() + '</span><span class="title">' + name + '</span><div class="tools"><button class="btn" data-act="min">Min</button><button class="btn" data-act="full">Full</button><button class="btn" data-act="close">Fechar</button></div></div><iframe src="' + url + '" referrerpolicy="no-referrer"></iframe><div class="resize-handle" title="Arraste para ajustar altura"></div>';
        anchor.appendChild(wrap);
        on(wrap.querySelector('[data-act="min"]'), 'click', () => wrap.classList.toggle('min'));
        on(wrap.querySelector('[data-act="full"]'), 'click', () => document.body.classList.toggle('session-full'));
        on(wrap.querySelector('[data-act="close"]'), 'click', () => wrap.remove());
        toast('HTML importado dentro do Stack');
      } else { window.open(url, '_blank', 'noopener'); toast('HTML aberto em nova aba'); }
      e.target.value = '';
    });

    on($('#btnClearLS', sec), 'click', () => { if (confirm('Limpar todo o LocalStorage deste domínio?')) { try { localStorage.clear(); toast('LocalStorage limpo'); } catch (err) { toast('Erro ao limpar LocalStorage'); } } });
    on($('#btnClearIDB', sec), 'click', async () => {
      if (!confirm('Apagar bancos IndexedDB deste domínio?')) return;
      try {
        if (indexedDB.databases) {
          const dbs = await indexedDB.databases();
          await Promise.all((dbs || []).map(d => d && d.name ? new Promise((res) => { const req = indexedDB.deleteDatabase(d.name); req.onsuccess = req.onerror = req.onblocked = () => res(); }) : Promise.resolve()));
        } else {
          await Promise.all(['dual','uno','app','db','files','store'].map(n => new Promise((res) => { const req = indexedDB.deleteDatabase(n); req.onsuccess = req.onerror = req.onblocked = () => res(); })));
        }
        toast('IndexedDB: pedido de exclusão enviado');
      } catch (err) { toast('IndexedDB: não suportado/erro'); }
    });
    on($('#hdRefresh', sec), 'click', () => updateMeters(true));

    async function estimateStorage() {
      const est = (navigator.storage && navigator.storage.estimate) ? await navigator.storage.estimate() : {};
      let lsBytes = 0;
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); const v = localStorage.getItem(k); lsBytes += 2 * ((k || '').length + (v || '').length); } } catch (_) {}
      const usage = est.usage || 0, quota = est.quota || 0;
      return { lsBytes, idbBytes: Math.max(0, usage - lsBytes), usage, quota };
    }
    function fmt(bytes) { const u = ['B','KB','MB','GB','TB']; let i = 0, n = bytes; while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; } return n.toFixed(i <= 1 ? 0 : 1) + ' ' + u[i]; }
    async function updateMeters(animateNumbers) {
      try {
        const { lsBytes, idbBytes, usage, quota } = await estimateStorage();
        const pct = (num, den) => den > 0 ? Math.min(100, Math.round((num / den) * 100)) : 0;
        const pLS = pct(lsBytes, 5 * 1024 * 1024), pIDB = quota ? pct(idbBytes, quota) : 0, pTot = pct(usage, quota);
        const barLS = $('#barLS'), barIDB = $('#barIDB'), barTotal = $('#barTotal');
        if (barLS) barLS.style.width = pLS + '%';
        if (barIDB) barIDB.style.width = pIDB + '%';
        if (barTotal) barTotal.style.width = pTot + '%';
        if (animateNumbers) {
          function animateCount(el, bytes) {
            if (!el) return;
            const target = bytes, start = parseFloat(el.getAttribute('data-last') || '0'), startTime = performance.now(), dur = 600;
            function step(t) { const k = Math.min(1, (t - startTime) / dur); const v = Math.round(start + (target - start) * k); el.textContent = k < 1 ? (v + ' B') : fmt(target); if (k < 1) requestAnimationFrame(step); else el.setAttribute('data-last', String(target)); }
            requestAnimationFrame(step);
          }
          animateCount($('#valLS'), lsBytes); animateCount($('#valIDB'), idbBytes); animateCount($('#valTotal'), usage);
        } else {
          const vLS = $('#valLS'), vIDB = $('#valIDB'), vTotal = $('#valTotal');
          if (vLS) vLS.textContent = fmt(lsBytes);
          if (vIDB) vIDB.textContent = fmt(idbBytes);
          if (vTotal) vTotal.textContent = fmt(usage) + ' / ' + (quota ? fmt(quota) : '–');
        }
      } catch (err) { console.error(err); }
    }
    updateMeters(false);
    sec.__interval = setInterval(() => updateMeters(false), 2500);
  }

  function bind() {
    const btn = document.getElementById('btnLS') || Array.from(document.querySelectorAll('button,[role="button"]')).find(b => /ls|painel|config|settings/i.test((b.textContent || '') + (b.id || '') + (b.className || '')));
    if (btn && !btn.dataset._masterfix) { btn.dataset._masterfix = '1'; btn.addEventListener('click', () => setTimeout(ensureSection, 120), { passive: true }); }
    setTimeout(ensureSection, 300);
    document.addEventListener('ls:disabled-changed', () => setTimeout(ensureSection, 120));
    const archFrame = document.getElementById('arch-frame');
    if (archFrame) archFrame.addEventListener('load', () => setTimeout(ensureSection, 200));
    mountHandle();
    mountHDPro();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.HUD = { HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-hud', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.HUD }));
})();
