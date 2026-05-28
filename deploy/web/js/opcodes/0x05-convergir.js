/* ════════════════════════════════════════════════════════════
   0x05 CONVERGIR · 672Hz · ⧉ · CUBO
   Idle system — dock/widget fade quando inativo
   layer: mente | fonte: docs/Fusion_index.html.txt script-idle
════════════════════════════════════════════════════════════ */

(function KOBLLUX_CONVERGIR() {
  'use strict';

  const IDLE_DELAY = 1870;

  /* ── IDLE MANAGER ────────────────────────────────────── */
  function createIdleManager(selector, delay) {
    const el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
    if (!el) return null;

    let idleTimer;

    function resetIdle() {
      el.classList.remove('idle');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => el.classList.add('idle'), delay || IDLE_DELAY);
    }

    ['pointerdown','pointermove','touchstart','mousemove'].forEach(ev =>
      document.addEventListener(ev, resetIdle, { passive: true })
    );

    resetIdle();
    return { reset: resetIdle, el };
  }

  /* ── SYMBOL BAR IDLE ─────────────────────────────────── */
  function initBarIdle() {
    const bar = document.getElementById('symbolBar');
    if (!bar) return;
    let idleTimer;

    function resetIdle() {
      bar.classList.remove('idle');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!bar.classList.contains('is-dragging')) bar.classList.add('idle');
      }, 4000);
    }

    ['pointerdown','pointermove','touchstart','mousemove'].forEach(ev =>
      document.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();
  }

  /* ── SNAP SYSTEM (symbol bar) ────────────────────────── */
  function initSnapBar() {
    const bar = document.getElementById('symbolBar');
    if (!bar) return;

    let dragging = false, offX = 0, offY = 0;

    /* Initialize position based on current class (snap-top = start at top) */
    if (bar.classList.contains('snap-top')) {
      bar.style.top  = '0';
      bar.style.left = '0';
    } else {
      bar.style.top  = (window.innerHeight / 2 - bar.offsetHeight / 2) + 'px';
      bar.style.left = '16px';
    }

    bar.addEventListener('pointerdown', e => {
      if (e.target.closest('button, .kblx-carousel-track, .kblx-dots, .kblx-carousel-viewport')) return;
      dragging = true;
      bar.setPointerCapture(e.pointerId);
      const r = bar.getBoundingClientRect();
      offX = e.clientX - r.left;
      offY = e.clientY - r.top;
      bar.classList.add('is-dragging');
      bar.classList.remove('snap-side','snap-side-right','snap-top','floating');
      bar.style.transform = 'none';
      /* Restore natural size during drag */
      bar.style.width = '';
      bar.style.right = '';
    });

    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const x = Math.max(0, Math.min(window.innerWidth  - Math.min(bar.offsetWidth, 80),  e.clientX - offX));
      const y = Math.max(0, Math.min(window.innerHeight - bar.offsetHeight, e.clientY - offY));
      bar.style.left = x + 'px';
      bar.style.top  = y + 'px';
    });

    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      bar.classList.remove('is-dragging');
      snapBar(bar);
    });

    function snapBar(bar) {
      const r  = bar.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const W  = window.innerWidth;
      const H  = window.innerHeight;
      const topZone = Math.max(80, bar.offsetHeight + 20);

      /* Top zone → snap-top (full-width header) */
      if (cy < topZone) {
        bar.classList.add('snap-top');
        bar.style.top  = '0';
        bar.style.left = '0';
        bar.style.width  = '';
        bar.style.right  = '';
      } else if (cx <= 60 || (cx <= W - cx && cx <= cy * 1.5)) {
        bar.classList.add('snap-side');
        bar.style.left = '0';
        bar.style.top  = Math.max(0, Math.min(H - bar.offsetHeight, r.top)) + 'px';
      } else if (W - cx < cx && W - cx < 60) {
        bar.classList.add('snap-side-right');
        bar.style.left = (W - bar.offsetWidth) + 'px';
        bar.style.top  = Math.max(0, Math.min(H - bar.offsetHeight, r.top)) + 'px';
      } else {
        bar.classList.add('floating');
      }
    }
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    createIdleManager('.kob-tts-dock', IDLE_DELAY);
    createIdleManager('#kodux-widget', 3000);
    initBarIdle();
    initSnapBar();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.createIdleManager = createIdleManager;

})();
