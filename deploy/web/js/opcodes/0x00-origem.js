/* ════════════════════════════════════════════════════════════
   0x00 ORIGEM · 768Hz · ○ · PONTO
   Tema, boot sequence, particles — fundação absoluta
   layer: corpo | fonte: index.html + web/js/opcodes/0x00-core.js
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
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.toggleTheme = toggleTheme;
  window.KOBLLUX.initParticles = initParticles;

})();
