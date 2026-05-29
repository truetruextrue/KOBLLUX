/* ════════════════════════════════════════════════════════════
   0x03 VD7 · 639Hz · ▢ · TETRAEDRO
   EXPANDIR Variante Delta-7 — progressão de 7 estados
   Cristalização de: 0x03_expandir_V_D7.js
   (kob-DH0 · KOBLLUX EXPANDIR VARIANT)
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: mente | geo: TETRAEDRO | arquétipos: VITALIS · ATLAS · AION
   verboforma: KODUX (360Hz) · eixo · expansão dimensional

   AC: 0x03_expandir_V_D7.js = 7 estados de expansão (ciclo divino)
   DC: VD7 local = mesma progressão em KOBLLUX namespace estável

   D7 = Delta-7 = 7ª progressão dimensional (7 = ciclo divino no codice.json)
   Complementa o 0x03-expandir.js com estados de expansão D0→D6

   API:
     window.KOBLLUX.VD7.expand(step)     → vai para estado D0–D6
     window.KOBLLUX.VD7.contract(step)   → retorna D6–D0
     window.KOBLLUX.VD7.state()          → estado atual {d, name, hz}
     window.KOBLLUX.VD7.cycle(ms)        → auto-ciclo por intervalo
     window.KOBLLUX.VD7.stopCycle()      → para auto-ciclo
════════════════════════════════════════════════════════════ */

(function KOBLLUX_VD7() {
  'use strict';

  /* ── ESTADOS DELTA-7 ─────────────────────────────────── */
  /* D0–D6: 7 estados de expansão dimensional */
  const DELTA = [
    { d: 0, name: 'PONTO',      hz: 432, geo: '●', escala: 0.382, opcode: '0x01' },
    { d: 1, name: 'RETA',       hz: 528, geo: '―', escala: 0.500, opcode: '0x02' },
    { d: 2, name: 'PLANO',      hz: 639, geo: '▢', escala: 0.618, opcode: '0x03' },
    { d: 3, name: 'VOLUME',     hz: 594, geo: '◇', escala: 1.000, opcode: '0x04' },
    { d: 4, name: 'HIPER',      hz: 672, geo: '⧉', escala: 1.618, opcode: '0x05' },
    { d: 5, name: 'TOROIDE',    hz: 777, geo: '✧', escala: 2.618, opcode: '0x07' },
    { d: 6, name: 'INFINITO',   hz: 963, geo: '♾', escala: 4.236, opcode: '0x09' }
  ];

  let currentD = 0;
  let cycleTimer = null;

  /* ── EXPANSÃO ────────────────────────────────────────── */
  function expand(step) {
    const d = Math.min(6, Math.max(0, typeof step === 'number' ? step : currentD + 1));
    currentD = d;
    const state = DELTA[d];

    /* Aplicar escala PHI ao grid */
    const grid = document.getElementById('universe-grid');
    if (grid) {
      grid.style.setProperty('--vd7-scale', String(state.escala));
      grid.dataset.vd7State = `D${d}`;
      grid.dataset.vd7Name  = state.name;
    }

    document.documentElement.style.setProperty('--vd7-hz',    `${state.hz}Hz`);
    document.documentElement.style.setProperty('--vd7-scale', String(state.escala));
    document.body.dataset.vd7State = `D${d}`;

    document.dispatchEvent(new CustomEvent('kobllux:vd7:expand', {
      bubbles: true, detail: { ...state, d }
    }));

    /* Selar no estado máximo */
    if (d === 6 && typeof window.sealCodice === 'function') {
      window.sealCodice({ id: 'kobllux', silent: true });
    }

    console.log(`[0x03·VD7] ▢ D${d} · ${state.name} · ${state.hz}Hz · escala=${state.escala}`);
    return state;
  }

  function contract(step) {
    const d = Math.min(6, Math.max(0, typeof step === 'number' ? step : currentD - 1));
    return expand(d);
  }

  function getState() {
    return { ...DELTA[currentD], d: currentD };
  }

  /* ── AUTO-CICLO ─────────────────────────────────────── */
  function cycle(ms = 1134) {
    stopCycle();
    cycleTimer = setInterval(() => {
      const next = (currentD + 1) % 7;
      expand(next);
    }, ms);
    return cycleTimer;
  }

  function stopCycle() {
    if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
  }

  /* ── TECLADO: [D] + número ─────────────────────────── */
  function handleKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'd' || e.key === 'D') { expand(Math.min(6, currentD + 1)); }
    if (e.key === 'c' || e.key === 'C') { contract(Math.max(0, currentD - 1)); }
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKey);
    expand(2); /* Inicia em D2 = PLANO = estado padrão Universe Grid */
    console.log('[0x03·VD7] ▢ EXPANDIR · 639Hz · 7 estados D0→D6 · Delta-7 cristalizado');
    console.log('[0x03·VD7] RÉGUA 78K · cristalizado de 0x03_expandir_V_D7.js');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.VD7 = { expand, contract, state: getState, cycle, stopCycle, DELTA };

})();
