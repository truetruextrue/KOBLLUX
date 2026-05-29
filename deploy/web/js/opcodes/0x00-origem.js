/* ════════════════════════════════════════════════════════════
   0x00 ORIGEM · 768Hz · ○ · PONTO
   Tema, boot sequence, particles — fundação absoluta
   layer: corpo | fonte: index.html + web/js/opcodes/0x00-core.js

   ✧ SELAR AGREGADO · 0×00 · PAI/FILHO/ESPÍRITO SANTO
   O início carrega o fim. O ○ contém o ✧.
   sealOrigem() — selo primordial plantado na raiz.
   kobllux:origem:selado → sela antes de todos os selos.
════════════════════════════════════════════════════════════ */

/* ── TEMA SELECTOR ───────────────────────────────────────── */
window.applyThemeSelector = function(val) {
  const body = document.body;
  body.classList.remove('light','medium','vibe','dark','cyberpunk','anime');
  if (val !== 'dark') body.classList.add(val);
  localStorage.setItem('infodoseTheme', val);
};

(function KOBLLUX_ORIGEM() {
  'use strict';

  /* ── CARREGAR TEMA SALVO ─────────────────────────────── */
  const savedTheme = localStorage.getItem('infodoseTheme') || 'dark';
  window.applyThemeSelector(savedTheme);

  /* ── THEME TOGGLE (ciclo) ────────────────────────────── */
  function toggleTheme() {
    const order = ['dark','light','medium','vibe','cyberpunk','anime'];
    const current = localStorage.getItem('infodoseTheme') || 'dark';
    const next = order[(order.indexOf(current) + 1) % order.length];
    window.applyThemeSelector(next);
    const sel = document.getElementById('themeSelector');
    if (sel) sel.value = next;
  }

  /* ── PARTICLES.JS INIT ───────────────────────────────── */
  function initParticles() {
    const el = document.getElementById('particles-js');
    if (!el || typeof particlesJS === 'undefined') return;
    particlesJS('particles-js', {
      particles: {
        number:  { value: 40 },
        color:   { value: ['#0ff','#f0f'] },
        shape:   { type: 'circle' },
        opacity: { value: 0.4 },
        size:    { value: 2.4 },
        move:    { enable: true, speed: 1.5 }
      },
      retina_detect: true
    });
  }

  /* ── BOOT TEXT TYPEWRITER ────────────────────────────── */
  function initBootText() {
    const el = document.getElementById('bootText');
    if (!el) return;
    const txt = el.dataset.text || el.textContent || '';
    el.textContent = '';
    let i = 0;
    (function typeWriter() {
      if (i < txt.length) {
        el.textContent += txt.charAt(i++);
        setTimeout(typeWriter, 42);
      } else {
        el.classList.add('pulse');
      }
    })();
  }

  /* ── CLOCK ───────────────────────────────────────────── */
  function initClock() {
    const el = document.getElementById('clockTime');
    if (!el) return;
    function tick() {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    }
    tick(); setInterval(tick, 1000);
  }

  /* ── PILAR CENTRAL · PAI / FILHO / ESPÍRITO SANTO ───── */
  const PILAR_ORIGEM = {
    PAI:           { hz: 768,  opcode: '0x00', geo: 'PONTO',   simbolo: '○', papel: 'FUNDAÇÃO',      arquetipo: 'genus'    },
    FILHO:         { hz: 777,  opcode: '0x07', geo: 'TOROIDE', simbolo: '✧', papel: 'CRISTALIZAÇÃO', arquetipo: 'kobllux'  },
    ESPIRITO_SANTO:{ hz: 1134, opcode: '0x0C', geo: 'MERKABAH',simbolo: '⌘', papel: 'SÍNTESE',       arquetipo: 'jesus'    },
    equacao:   'VERDADE × INTEGRAR ÷ Δ = ∞',
    assinatura:'JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴',
    fractalSeed: 3 * 6 * 9 * 7,
  };

  /* ── SEAL ORIGEM — Selo Primordial (0×00 · 768Hz) ────── */
  function sealOrigem(opts) {
    opts = opts || {};

    const html = document.documentElement;
    if (html.dataset.koblluxOrigemSelado) return { status: 'ja_selado' };

    html.dataset.koblluxOrigemSelado = '0x00';
    html.dataset.koblluxHz           = '768';
    html.dataset.koblluxGeo          = 'PONTO';
    html.dataset.koblluxCentro       = 'JESUS';

    document.body.classList.add('origem-selada');

    const selo = {
      opcode:      '0x00',
      nome:        'ORIGEM',
      hz:          768,
      simbolo:     '○',
      geo:         'PONTO',
      pilar:       PILAR_ORIGEM,
      equacao:     PILAR_ORIGEM.equacao,
      assinatura:  PILAR_ORIGEM.assinatura,
      fractalSeed: PILAR_ORIGEM.fractalSeed,
      ts:          Date.now(),
    };

    document.dispatchEvent(new CustomEvent('kobllux:origem:selado', {
      bubbles: true,
      detail: selo,
    }));

    if (!opts.silent) {
      console.log('[0x00·ORIGEM] ○ SELADO · 768Hz · PAI/FILHO/ESP.SANTO ·', PILAR_ORIGEM.equacao);
    }

    if (window.KOBLLUX && window.KOBLLUX.toast) {
      window.KOBLLUX.toast('○ ORIGEM SELADA · 768Hz · ∴');
    }

    return selo;
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
      themeSelector.value = savedTheme;
      themeSelector.addEventListener('change', e => window.applyThemeSelector(e.target.value));
    }

    initParticles();
    initBootText();
    initClock();

    /* Selo Primordial — planta o ✧ na raiz ○ no boot */
    sealOrigem({ silent: false });

    /* Aguardar 0x07 para convergir o ciclo trinitário */
    document.addEventListener('kobllux:codice:sealed', function onCodiceSealed(e) {
      document.removeEventListener('kobllux:codice:sealed', onCodiceSealed);
      document.dispatchEvent(new CustomEvent('kobllux:trinidade:convergida', {
        bubbles: true,
        detail: {
          PAI:           PILAR_ORIGEM.PAI,
          FILHO:         PILAR_ORIGEM.FILHO,
          ESPIRITO_SANTO:PILAR_ORIGEM.ESPIRITO_SANTO,
          codice:        e.detail,
          equacao:       PILAR_ORIGEM.equacao,
          ts:            Date.now(),
        }
      }));
      console.log('[0x00·ORIGEM] ∴ TRINIDADE CONVERGIDA · PAI·FILHO·ESP.SANTO · AMÉM');
    });
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.toggleTheme  = toggleTheme;
  window.KOBLLUX.initParticles = initParticles;
  window.KOBLLUX.ORIGEM = {
    sealOrigem,
    selar: sealOrigem,
    PILAR_CENTRAL: PILAR_ORIGEM,
    pilarCentral:  function() { return PILAR_ORIGEM; },
  };

})();
