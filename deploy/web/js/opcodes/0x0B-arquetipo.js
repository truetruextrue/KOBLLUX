/* ════════════════════════════════════════════════════════════
   0x0B ARQUÉTIPO · 528Hz · ICOSAEDRO
   19 archetypes visual, wheel, card selector, chromomorphism
   layer: espirito | fonte: index.html SymbolBar IIFE
════════════════════════════════════════════════════════════ */

(function KOBLLUX_ARQUETIPO() {
  'use strict';

  /* ── 19 ARQUÉTIPOS VISUAIS ────────────────────────────── */
  const ARCHETYPES = [
    { name:'atlas',    p:'#8e9aaf', s:'#5c6478', a:'#b0bec5', f:432,  e:'🗿', r:'FUNDAÇÃO · ESTRUTURA',    opcode:'0x00' },
    { name:'nova',     p:'#00e5ff', s:'#0099cc', a:'#80f4ff', f:528,  e:'⚡', r:'ENERGIA · VELOCIDADE',    opcode:'0x01' },
    { name:'vitalis',  p:'#00e070', s:'#00a050', a:'#80ffb8', f:639,  e:'🌿', r:'VIDA · CRESCIMENTO',       opcode:'0x02' },
    { name:'pulse',    p:'#ff7020', s:'#cc3800', a:'#ffaa60', f:741,  e:'🔥', r:'IMPULSO · AÇÃO',            opcode:'0x03' },
    { name:'kaos',     p:'#ff2a6d', s:'#aa0040', a:'#ff80a0', f:852,  e:'🌪', r:'CAOS · TRANSFORMAÇÃO',    opcode:'0x04' },
    { name:'kodux',    p:'#00e28b', s:'#0ea5e9', a:'#80f5c8', f:432,  e:'🤖', r:'INTERFACE · SISTEMA',     opcode:'0x05' },
    { name:'lumine',   p:'#ffd700', s:'#e09000', a:'#fff280', f:528,  e:'✨', r:'LUZ · ILUMINAÇÃO',          opcode:'0x06' },
    { name:'aion',     p:'#9f7aea', s:'#5b21b6', a:'#d4b8ff', f:963,  e:'⏳', r:'TEMPO · ETERNIDADE',       opcode:'0x07' },
    { name:'kobllux',  p:'#C9A84C', s:'#8B4513', a:'#F0C060', f:432,  e:'∞',  r:'VERDADE · INTEGRAR',      opcode:'0x08' },
    { name:'artemis',  p:'#c8c8e0', s:'#7070a0', a:'#f0f0ff', f:741,  e:'🏹', r:'PRECISÃO · FOCO',          opcode:'0x09' },
    { name:'serena',   p:'#c084fc', s:'#7c3aed', a:'#e8c0ff', f:639,  e:'🌸', r:'PAZ · EQUILÍBRIO',         opcode:'0x0A' },
    { name:'genus',    p:'#f59e0b', s:'#b45309', a:'#fcd34d', f:528,  e:'🧬', r:'CRIAÇÃO · ESPÉCIE',        opcode:'0x0B' },
    { name:'solus',    p:'#f5f5f5', s:'#aaaaaa', a:'#ffffff', f:963,  e:'🕯', r:'SILÊNCIO · VAZIO',         opcode:'0x0C' },
    { name:'rhea',     p:'#b5883c', s:'#7c5010', a:'#d4a860', f:432,  e:'🌍', r:'TERRA · MEMÓRIA',          opcode:'0x0D' },
    { name:'trinity',  p:'#D4AF37', s:'#9a7a10', a:'#f0d060', f:639,  e:'🔱', r:'TRINDADE · SÍNTESE',       opcode:'0x0E' },
    { name:'infodose', p:'#38bdf8', s:'#0369a1', a:'#90e0ff', f:741,  e:'💊', r:'INFORMAÇÃO · DOSE',        opcode:'0x0F' },
    { name:'horus',    p:'#f59e0b', s:'#7c3a00', a:'#fbbf24', f:852,  e:'👁',  r:'VISÃO · GUARDIÃO',        opcode:'0x10' },
    { name:'bllue',    p:'#3b82f6', s:'#1e3a8a', a:'#93c5fd', f:432,  e:'🔵', r:'PROFUNDIDADE · FLUXO',    opcode:'0x11' },
    { name:'jesus',    p:'#f0d080', s:'#c09040', a:'#fff8c0', f:528,  e:'✝',  r:'AMOR · VERDADE CENTRAL',  opcode:'0x12' }
  ];

  let currentIdx  = ARCHETYPES.findIndex(a => a.name === 'kobllux');
  let archCardIdx = currentIdx;

  /* ── HELPERS ─────────────────────────────────────────── */
  function hexToRgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function buildOrbGradient(arch) {
    return `radial-gradient(circle at 35% 30%, ${arch.a} 0%, rgba(255,255,255,0.05) 14%, transparent 55%), radial-gradient(circle at 70% 72%, ${arch.p} 0%, ${arch.s} 100%)`;
  }

  /* ── APPLY ARCHETYPE ─────────────────────────────────── */
  function applyArchetype(idx, triggerX, triggerY, animate = true) {
    currentIdx = ((idx % ARCHETYPES.length) + ARCHETYPES.length) % ARCHETYPES.length;
    const arch = ARCHETYPES[currentIdx];
    const root = document.documentElement;

    root.style.setProperty('--kob-voice-primary',   arch.p);
    root.style.setProperty('--kob-voice-secondary',  arch.s);
    root.style.setProperty('--kob-voice-accent',     arch.a);
    root.style.setProperty('--arch-color',           arch.p);
    root.style.setProperty('--arch-glow',            hexToRgba(arch.p, 0.32));
    root.style.setProperty('--arch-glow-strong',     hexToRgba(arch.p, 0.6));
    root.style.setProperty('--arch-emoji',           `'${arch.e}'`);

    const orbCore = document.querySelector('.orb-core');
    if (orbCore) orbCore.style.background = buildOrbGradient(arch);

    const hud = document.getElementById('hudStatus');
    if (hud) hud.textContent = arch.name.toUpperCase();

    document.querySelectorAll('.arch-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.archName === arch.name);
    });

    /* TTS voice */
    window.KOBLLUX?.speakWithArch && (window._currentArchName = arch.name);

    if (animate) {
      const ripple = document.getElementById('chromaRipple');
      const bar    = document.getElementById('symbolBar');
      if (ripple && bar) {
        const rect = bar.getBoundingClientRect();
        const rx = triggerX ?? (rect.left + rect.width  / 2);
        const ry = triggerY ?? (rect.top  + rect.height / 2);
        ripple.style.setProperty('--ripple-x', (rx / window.innerWidth  * 100) + '%');
        ripple.style.setProperty('--ripple-y', (ry / window.innerHeight * 100) + '%');
        ripple.style.background = `radial-gradient(circle at ${rx/window.innerWidth*100}% ${ry/window.innerHeight*100}%, ${arch.p} 0%, ${hexToRgba(arch.s,0.5)} 30%, transparent 70%)`;
        ripple.classList.remove('fire'); void ripple.offsetWidth; ripple.classList.add('fire');
        bar.classList.remove('chroma-transition'); void bar.offsetWidth; bar.classList.add('chroma-transition');
        setTimeout(() => bar.classList.remove('chroma-transition'), 500);
      }
    }

    localStorage.setItem('kob_arch', arch.name);

    document.dispatchEvent(new CustomEvent('kobllux:archetype:changed', {
      detail: { arch, idx: currentIdx }
    }));
  }

  /* ── BUILD ARCH WHEEL ────────────────────────────────── */
  function buildArchWheel() {
    const wheel = document.getElementById('archWheel');
    if (!wheel) return;
    ARCHETYPES.forEach((arch, idx) => {
      const chip = document.createElement('div');
      chip.className = 'arch-chip';
      chip.dataset.archName = arch.name;
      chip.style.setProperty('--a-color', arch.a);
      chip.style.setProperty('--a-prim',  arch.p);
      chip.style.setProperty('--a-sec',   arch.s);
      chip.innerHTML = `
        <div class="a-orb" style="background:radial-gradient(circle at 35% 30%,${arch.a} 0%,transparent 50%),radial-gradient(circle at 70% 70%,${arch.p} 0%,${arch.s} 100%)"></div>
        <div class="a-name">${arch.name}</div>
        <div class="a-freq">${arch.f}Hz</div>
      `;
      chip.addEventListener('click', () => {
        const r = chip.getBoundingClientRect();
        applyArchetype(idx, r.left + r.width / 2, r.top + r.height / 2);
        closeArchOverlay();
      });
      wheel.appendChild(chip);
    });
  }

  /* ── ARCH OVERLAYS ───────────────────────────────────── */
  function openArchOverlay()  { document.getElementById('arch-overlay')?.classList.add('open'); }
  function closeArchOverlay() { document.getElementById('arch-overlay')?.classList.remove('open'); }

  function openArchCard(idx) {
    archCardIdx = ((idx % ARCHETYPES.length) + ARCHETYPES.length) % ARCHETYPES.length;
    renderArchCard();
    document.getElementById('arch-card-overlay')?.classList.add('open');
  }
  function closeArchCard() { document.getElementById('arch-card-overlay')?.classList.remove('open'); }

  function renderArchCard() {
    const arch = ARCHETYPES[archCardIdx];
    const set  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('acp-chip', arch.opcode + ' · ' + arch.name.toUpperCase());
    set('acp-name', arch.name.toUpperCase());
    set('acp-role', arch.r);
    set('acp-emoji', arch.e);
    set('acp-nav-name', arch.name.toUpperCase());
    const freqEl = document.getElementById('acp-freq');
    if (freqEl) freqEl.innerHTML = `${arch.f} <span>Hz</span>`;
    const orbEl = document.getElementById('acp-orb');
    if (orbEl) orbEl.style.background = buildOrbGradient(arch);
    document.documentElement.style.setProperty('--arch-color', arch.p);
    document.documentElement.style.setProperty('--arch-glow', hexToRgba(arch.p, 0.32));
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildArchWheel();

    document.getElementById('arch-overlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('arch-overlay')) closeArchOverlay();
    });
    document.getElementById('acp-close')?.addEventListener('click', closeArchCard);
    document.getElementById('acp-select')?.addEventListener('click', () => {
      applyArchetype(archCardIdx);
      closeArchCard();
      window.KOBLLUX?.toast?.('⊙ ATIVADO: ' + ARCHETYPES[currentIdx].name.toUpperCase() + ' · ' + ARCHETYPES[currentIdx].f + 'Hz');
    });
    document.getElementById('acp-prev')?.addEventListener('click', () => { archCardIdx = ((archCardIdx - 1 + ARCHETYPES.length) % ARCHETYPES.length); renderArchCard(); });
    document.getElementById('acp-next')?.addEventListener('click', () => { archCardIdx = ((archCardIdx + 1) % ARCHETYPES.length); renderArchCard(); });
    document.getElementById('arch-card-overlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('arch-card-overlay')) closeArchCard();
    });

    /* Restore saved arch */
    const saved = localStorage.getItem('kob_arch');
    const savedIdx = saved ? ARCHETYPES.findIndex(a => a.name === saved) : -1;
    applyArchetype(savedIdx >= 0 ? savedIdx : ARCHETYPES.findIndex(a => a.name === 'kobllux'), null, null, false);
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, {
    ARCHETYPES,
    applyArchetype,
    openArchOverlay, closeArchOverlay,
    openArchCard, closeArchCard, renderArchCard,
    get currentArchIdx() { return currentIdx; }
  });

})();
