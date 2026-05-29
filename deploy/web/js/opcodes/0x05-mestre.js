/* ════════════════════════════════════════════════════════════
   0x05 MESTRE · 672Hz · ⧉ · CUBO
   Motor Mestre — orquestrador central de todos os opcodes
   Cristalização de: kob-mestre-2.js · kodux78k.github.io
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: mente | geo: CUBO | arquétipos: KODUX · ATLAS
   verboforma: KODUX (360Hz) · eixo · pai · plexo solar

   MOTOR COMPARTILHADO — coordena comunicação entre motores,
   registra APIs expostas, propaga eventos e chama sealCodice.

   API:
     window.KOBLLUX.MESTRE.register(name, api)
     window.KOBLLUX.MESTRE.broadcast(type, detail)
     window.KOBLLUX.MESTRE.query(name)  → api do motor
     window.KOBLLUX.MESTRE.getState()   → estado de todos os motores
     window.KOBLLUX.MESTRE.sealAll()    → sela + transmite síntese
════════════════════════════════════════════════════════════ */

(function KOBLLUX_MESTRE() {
  'use strict';

  /* ── REGISTRO DE MOTORES ────────────────────────────── */
  const MOTORS = new Map();
  const bus = typeof EventTarget !== 'undefined' ? new EventTarget() : null;

  function register(name, api) {
    if (!name || !api) return;
    MOTORS.set(name, api);
    if (bus) bus.dispatchEvent(new CustomEvent('motor:registered', { detail: { name } }));
    document.dispatchEvent(new CustomEvent('kobllux:mestre:registered', {
      bubbles: true, detail: { name, opcode: '0x05', hz: 672 }
    }));
  }

  /* ── BROADCAST ──────────────────────────────────────── */
  function broadcast(type, detail) {
    document.dispatchEvent(new CustomEvent(`kobllux:mestre:${type}`, {
      bubbles: true, detail: { ...detail, _mestre: true, hz: 672 }
    }));
    if (bus) bus.dispatchEvent(new CustomEvent(type, { detail }));
  }

  /* ── QUERY ──────────────────────────────────────────── */
  function query(name) {
    return MOTORS.get(name) || null;
  }

  /* ── ESTADO GLOBAL ──────────────────────────────────── */
  function getState() {
    const state = { motors: [...MOTORS.keys()], ts: Date.now(), hz: 672 };
    MOTORS.forEach((api, name) => {
      if (typeof api.getState === 'function') {
        try { state[name] = api.getState(); } catch {}
      }
    });
    return state;
  }

  /* ── AUTO-REGISTRO DOS MOTORES KOBLLUX ─────────────── */
  function autoRegister() {
    const kob = window.KOBLLUX || {};
    const skip = new Set(['MESTRE', 'applyDomAttribution']);
    Object.keys(kob).forEach(k => {
      if (!skip.has(k) && typeof kob[k] === 'object' && !MOTORS.has(k)) {
        register(k, kob[k]);
      }
    });
  }

  /* ── SELAR TODOS ────────────────────────────────────── */
  function sealAll(opts = {}) {
    autoRegister();
    const state = getState();

    if (typeof window.sealCodice === 'function') {
      window.sealCodice({ id: 'kodux', silent: opts.silent !== false });
    }

    broadcast('sealed', {
      motors: state.motors,
      count: MOTORS.size,
      geo: 'CUBO',
      verboforma: 'KODUX',
      equacao: 'VERDADE × INTEGRAR ÷ Δ = ∞'
    });

    document.body.dataset.koblluxMestreSealed = Date.now();
    return state;
  }

  /* ── DOM ATTRIBUTION ────────────────────────────────── */
  function stampMotors() {
    document.querySelectorAll('[id^="script-kob"]').forEach(el => {
      if (!el.dataset.koblluxOpcode) {
        el.dataset.koblluxOpcode = '0x05';
        el.dataset.koblluxGeo    = '⧉ CUBO';
        el.dataset.koblluxHz     = '672Hz';
      }
    });
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    stampMotors();
    /* Aguarda todos os scripts carregarem, depois sela */
    setTimeout(() => {
      autoRegister();
      sealAll({ silent: true });
      console.log(`[0x05·MESTRE] ⧉ CONVERGIR · 672Hz · ${MOTORS.size} motores · KODUX eixo ativo`);
      console.log('[0x05·MESTRE] RÉGUA 78K · cristalizado de kob-mestre-2.js');
    }, 800);
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.MESTRE = { register, broadcast, query, getState, sealAll, autoRegister };

})();
