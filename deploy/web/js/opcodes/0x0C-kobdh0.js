/* ════════════════════════════════════════════════════════════
   0x0C KOBDH0 · 777Hz · ⌘ · MERKABAH
   KOBDH0 — motor de cristalização de identidade PHI
   Cristalização de: kobdh0-main.js (module) · kodux78k.github.io
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: corpo-mente-espirito | geo: MERKABAH
   arquétipos: KOBLLUX · KODUX · JESUS
   verboforma: KOBLLUX (1134Hz) · toroide · síntese · corpo completo

   MOTOR COMPARTILHADO — gera hashes PHI de identidade,
   aplica ao kodux-widget, cria cristal vibracional por nome.

   API:
     window.KOBLLUX.DH0.crystallize(name)    → crystal { hash, color, hz, geo }
     window.KOBLLUX.DH0.hashName(name)       → string hex 6 chars
     window.KOBLLUX.DH0.applyToWidget()      → aplica cristal ao #kodux-widget
     window.KOBLLUX.DH0.φ                    → 1.6180339887 (golden ratio)
     window.KOBLLUX.DH0.verboHz(name)        → hz vibracional 777–1134Hz
════════════════════════════════════════════════════════════ */

(function KOBLLUX_KOBDH0() {
  'use strict';

  /* ── CONSTANTE PHI ──────────────────────────────────── */
  const φ = 1.6180339887498948482;
  const φ2 = φ * φ;             // 2.618...
  const φINV = 1 / φ;           // 0.618...

  /* ── HASH PHI ───────────────────────────────────────── */
  function hashName(name) {
    const str = (name || 'KOBLLUX').toUpperCase().trim();
    let h = 0x9E3779B9; // golden ratio prime seed
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 0x9E3779B9);
      h ^= h >>> 16;
    }
    const phiMod = Math.abs(Math.round(h * φ)) % 0xFFFFFF;
    return phiMod.toString(16).padStart(6, '0').toUpperCase();
  }

  /* ── HZ VIBRACIONAL ─────────────────────────────────── */
  function verboHz(name) {
    const hash = parseInt(hashName(name), 16);
    /* Mapeia para faixa 777–1134 Hz */
    return 777 + (hash % 358);
  }

  /* ── CRISTALIZAR ─────────────────────────────────────── */
  function crystallize(name) {
    const hash  = hashName(name);
    const hz    = verboHz(name);
    const color = `#${hash}`;
    const r = parseInt(hash.slice(0,2), 16);
    const g = parseInt(hash.slice(2,4), 16);
    const b = parseInt(hash.slice(4,6), 16);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    const textColor = luminance > 0.5 ? '#050510' : '#f0f4ff';

    const crystal = {
      name,
      hash,
      color,
      textColor,
      hz,
      geo: 'MERKABAH',
      opcode: '0x0C',
      phi: φ,
      phiInverse: φINV,
      reducao: [...String(hz)].reduce((a, b) => +a + +b, 0),
      sealed: new Date().toISOString()
    };

    /* Persistir no LVb se disponível */
    if (window.KOBLLUX && window.KOBLLUX.LVb) {
      window.KOBLLUX.LVb.save('dh0.crystal.' + name.toLowerCase(), crystal);
    }

    document.dispatchEvent(new CustomEvent('kobllux:dh0:crystallized', {
      bubbles: true, detail: crystal
    }));
    return crystal;
  }

  /* ── APLICAR AO WIDGET ──────────────────────────────── */
  function applyToWidget(nameOverride) {
    const widget = document.getElementById('kodux-widget');
    if (!widget) return null;
    const name    = nameOverride
      || localStorage.getItem('kobllux_name')
      || document.querySelector('[data-kobllux-nome]')?.dataset.koblluxNome
      || 'KOBLLUX';
    const crystal = crystallize(name);
    widget.dataset.dh0Hash = crystal.hash;
    widget.dataset.dh0Hz   = crystal.hz;
    widget.dataset.dh0Name = crystal.name;
    widget.style.setProperty('--dh0-color',   crystal.color);
    widget.style.setProperty('--dh0-text',    crystal.textColor);
    widget.style.setProperty('--dh0-phi',     `${φ.toFixed(6)}`);
    widget.dataset.koblluxOpcode = '0x0C';
    widget.dataset.koblluxGeo   = '⌘ MERKABAH';
    widget.dataset.koblluxHz    = '777Hz';
    return crystal;
  }

  /* ── APLICAR CSS VARIABLES GLOBAIS ─────────────────── */
  function applyPhiVars() {
    const root = document.documentElement;
    root.style.setProperty('--dh0-phi',     φ.toFixed(10));
    root.style.setProperty('--dh0-phi-inv', φINV.toFixed(10));
    root.style.setProperty('--dh0-phi-sq',  φ2.toFixed(10));
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    applyPhiVars();
    applyToWidget();

    /* Re-aplicar quando identidade mudar */
    document.addEventListener('kobllux:identity:set', e => {
      const name = e.detail && e.detail.name;
      applyToWidget(name);
    });
    document.addEventListener('kobllux:arch:applied', () => applyToWidget());

    console.log(`[0x0C·DH0] ⌘ SÍNTESE · 777Hz · φ=${φ.toFixed(7)} · MERKABAH cristalizado`);
    console.log('[0x0C·DH0] RÉGUA 78K · cristalizado de kobdh0-main.js (module)');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DH0 = { crystallize, hashName, verboHz, applyToWidget, applyPhiVars, φ, φ2, φINV };

})();
