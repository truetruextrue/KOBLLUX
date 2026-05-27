/* ════════════════════════════════════════════════════════════
   0x06 UNIFICAR · 528Hz · ☯ · DODECAEDRO
   SymbolBar carousel, nav buttons, mode toggle, collapse
   layer: mente | fonte: index.html SymbolBar IIFE
════════════════════════════════════════════════════════════ */

(function KOBLLUX_UNIFICAR() {
  'use strict';

  const VISIBLE = 4, ITEM_H = 52, GAP = 8;

  const NAV_BUTTONS = [
    { label:'◀',  id:'btn-prev', title:'Bloco anterior', action:'prev' },
    { label:'▶',  id:'btn-play', title:'Play / Pause',   action:'play' },
    { label:'■',  id:'tts-stop', title:'Parar TTS',       action:'stop' },
    { label:'▶▶', id:'btn-next', title:'Próximo bloco',  action:'next' },
    { label:'Φ',  id:'btn-phi',  title:'Phi',   dataId:'phi',  url:'https://kodux78k.github.io/oiDual--Y-/M0D/VWRDI/index.html', isUrl:true },
    { label:'꩜',  id:'btn-viv',  title:'Viv',   dataId:'viv',  url:'https://kodux78k.github.io/oiDual--Y-/M0D/78FFD/',           isUrl:true },
    { label:'◌',  id:'btn-home', title:'Home',  dataId:'home', url:'https://kodux78k.github.io/oiDual-idHome/',                  isUrl:true },
    { label:'◘',  id:'btn-doc',  title:'Doc',   dataId:'doc',  url:'https://kodux78k.github.io/info-Doc/index.html',             isUrl:true }
  ];

  let carouselIdx = 0, carouselDragging = false, carouselDragStart = 0, carouselDragDelta = 0;

  /* ── CAROUSEL BUILD ──────────────────────────────────── */
  function buildCarousel() {
    const bar = document.getElementById('symbolBar');
    if (!bar) return;

    const hudInfo = bar.querySelector('.hud-info');

    const vp = document.createElement('div');
    vp.className = 'kblx-carousel-viewport';
    vp.style.height = (VISIBLE * ITEM_H - GAP) + 'px';
    hudInfo.before(vp);

    const track = document.createElement('div');
    track.className = 'kblx-carousel-track';
    track.style.gap = GAP + 'px';
    vp.appendChild(track);

    const dots = document.createElement('div');
    dots.className = 'kblx-dots';
    hudInfo.before(dots);

    NAV_BUTTONS.forEach(def => {
      const wrap = document.createElement('div');
      wrap.className = 'symbol-wrap';
      const btn = document.createElement('button');
      btn.className = 'symbol-button';
      btn.id = def.id; btn.title = def.title; btn.textContent = def.label;
      if (def.url)    btn.dataset.url = def.url;
      if (def.dataId) btn.dataset.id  = def.dataId;

      if (def.isUrl) {
        const ring = document.createElement('div');
        ring.className = 'kblx-ring';
        ring.innerHTML = '<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" class="nav-ring-c"/></svg>';
        btn.appendChild(ring);
        setupNavLongPress(btn);
      }
      wrap.appendChild(btn);
      track.appendChild(wrap);
    });

    /* Nav action handlers */
    document.getElementById('btn-prev')?.addEventListener('click', () => window.changePage?.(-1));
    document.getElementById('btn-next')?.addEventListener('click', () => window.changePage?.(1));
    document.getElementById('btn-play')?.addEventListener('click', () => {
      const orb = document.getElementById('main-orb');
      const p = window.pages?.[window.currentPage || 0];
      if (!p) return;
      if (orb) orb.classList.add('speaking');
      const txt = Array.from(p.querySelectorAll('p')).map(el => el.textContent).join(' ');
      window.autoSpeakPage?.(txt);
      setTimeout(() => { if (orb) orb.classList.remove('speaking'); }, 5000);
    });
    document.getElementById('tts-stop')?.addEventListener('click', () => {
      window.speechSynthesis?.cancel();
      document.getElementById('main-orb')?.classList.remove('speaking');
    });

    /* URL navigate buttons */
    document.querySelectorAll('.symbol-button[data-url]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (!btn._longPressed) window.loadInternalFrame?.(btn.dataset.url);
        btn._longPressed = false;
      });
    });

    /* Drag carousel */
    track.addEventListener('mousedown', e => {
      carouselDragging = true; carouselDragStart = e.clientY; carouselDragDelta = 0;
      track.classList.add('kblx-dragging');
    });
    document.addEventListener('mousemove', e => {
      if (!carouselDragging) return;
      carouselDragDelta = e.clientY - carouselDragStart;
      applyTrack(carouselIdx * ITEM_H - carouselDragDelta, false, track);
      applyCoverflow(carouselIdx * ITEM_H - carouselDragDelta, track);
    });
    document.addEventListener('mouseup', () => {
      if (!carouselDragging) return;
      carouselDragging = false; track.classList.remove('kblx-dragging');
      snapCarousel(carouselIdx - Math.round(carouselDragDelta / ITEM_H), track, dots);
    });

    track.addEventListener('touchstart', e => {
      carouselDragStart = e.touches[0].clientY; carouselDragDelta = 0; carouselDragging = true;
      track.classList.add('kblx-dragging');
    }, { passive: true });
    track.addEventListener('touchmove', e => {
      if (!carouselDragging) return;
      carouselDragDelta = e.touches[0].clientY - carouselDragStart;
      applyTrack(carouselIdx * ITEM_H - carouselDragDelta, false, track);
      applyCoverflow(carouselIdx * ITEM_H - carouselDragDelta, track);
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (!carouselDragging) return;
      carouselDragging = false; track.classList.remove('kblx-dragging');
      snapCarousel(carouselIdx - Math.round(carouselDragDelta / ITEM_H), track, dots);
    });

    vp.addEventListener('wheel', e => {
      e.preventDefault();
      snapCarousel(carouselIdx + (e.deltaY > 0 ? 1 : -1), track, dots);
    }, { passive: false });

    snapCarousel(0, track, dots);
  }

  function applyTrack(offsetPx, animate, track) {
    track.style.transition = animate ? 'transform 0.32s cubic-bezier(0.25,0.8,0.25,1)' : 'none';
    track.style.transform  = `translateY(${-offsetPx}px)`;
  }

  function applyCoverflow(offsetPx, track) {
    const items   = track.querySelectorAll('.symbol-wrap');
    const centerI = offsetPx / ITEM_H + (VISIBLE - 1) / 2;
    items.forEach((item, i) => {
      const d = Math.abs(i - centerI);
      const scale   = d < 0.5 ? 1 : d < 1.5 ? 1 - (d - 0.5) * 0.26 : 0.74;
      const opacity = d < 0.5 ? 1 : d < 1.5 ? 1 - (d - 0.5) * 0.38 : 0.62;
      const zIdx    = d < 0.5 ? 10 : d < 1.5 ? 5 : 1;
      item.style.setProperty('--kblx-item-scale',   scale.toFixed(3));
      item.style.setProperty('--kblx-item-opacity', opacity.toFixed(3));
      item.style.setProperty('--kblx-item-z',       zIdx);
    });
  }

  function renderDots(track, dots) {
    const pageCount = Math.ceil(NAV_BUTTONS.length / VISIBLE);
    const active    = Math.floor(carouselIdx / VISIBLE);
    dots.innerHTML  = '';
    for (let i = 0; i < pageCount; i++) {
      const d = document.createElement('div');
      d.className = 'kblx-dot' + (i === active ? ' active' : '');
      d.addEventListener('click', () => snapCarousel(i * VISIBLE, track, dots));
      dots.appendChild(d);
    }
    dots.style.display = pageCount <= 1 ? 'none' : 'flex';
  }

  function snapCarousel(idx, track, dots) {
    carouselIdx = Math.max(0, Math.min(Math.round(idx), Math.max(0, NAV_BUTTONS.length - VISIBLE)));
    const offsetPx = carouselIdx * ITEM_H;
    applyTrack(offsetPx, true, track);
    applyCoverflow(offsetPx, track);
    renderDots(track, dots);
  }

  /* ── LONG PRESS (nav buttons) ────────────────────────── */
  function setupNavLongPress(btn) {
    const CIRC = 113, DURATION = 3000;
    let timer, raf, t0;

    function start() {
      btn._longPressed = false; t0 = Date.now();
      timer = setTimeout(() => {
        btn._longPressed = true; cancelAnimationFrame(raf);
        const c = btn.querySelector('.nav-ring-c');
        if (c) { c.style.transition = 'stroke-dashoffset .2s ease'; c.style.strokeDashoffset = CIRC; }
        openUrlEditor(btn);
      }, DURATION);
      (function tick() {
        if (t0 === null) return;
        const p = Math.min((Date.now() - t0) / DURATION, 1);
        const c = btn.querySelector('.nav-ring-c');
        if (c) { c.style.transition = 'none'; c.style.strokeDashoffset = CIRC * (1 - p); }
        if (p < 1) raf = requestAnimationFrame(tick);
      })();
    }

    function cancel() {
      clearTimeout(timer); cancelAnimationFrame(raf); t0 = null;
      const c = btn.querySelector('.nav-ring-c');
      if (c) { c.style.transition = 'stroke-dashoffset .2s ease'; c.style.strokeDashoffset = CIRC; }
    }

    btn.addEventListener('pointerdown', start, { passive: true });
    btn.addEventListener('pointerup',   cancel);
    btn.addEventListener('pointerleave', cancel);
  }

  /* ── URL EDITOR ──────────────────────────────────────── */
  let urlEditorTarget = null;

  function openUrlEditor(btn) {
    urlEditorTarget = btn;
    const id = btn.dataset.id || btn.id || '?';
    const ttl = document.getElementById('kblx-ttl');
    const inp = document.getElementById('kblx-inp');
    if (ttl) ttl.textContent = 'Botão · ' + id;
    if (inp) inp.value = btn.dataset.url || '';
    document.getElementById('kblx-back')?.classList.add('open');
    setTimeout(() => inp?.focus(), 80);
  }

  /* ── COLLAPSE TOGGLE ─────────────────────────────────── */
  function initCollapseToggle() {
    document.getElementById('sbToggleBtn')?.addEventListener('click', () => {
      document.getElementById('symbolBar')?.classList.toggle('collapsed');
    });
  }

  /* ── MODE BUTTONS ────────────────────────────────────── */
  function setMode(mode) {
    const card = document.getElementById('mainCard');
    ['card','orb','hud'].forEach(m => {
      document.getElementById(`btnMode${m.charAt(0).toUpperCase() + m.slice(1)}`)?.setAttribute('aria-pressed', String(m === mode));
    });
    if (mode === 'orb' && card) { card.classList.add('closed'); }
    if (mode === 'card' && card) { card.classList.remove('closed'); card.classList.add('open'); }
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildCarousel();
    initCollapseToggle();

    document.getElementById('kblx-btn-save')?.addEventListener('click', () => {
      if (urlEditorTarget) {
        const v = document.getElementById('kblx-inp')?.value.trim();
        if (v) { urlEditorTarget.dataset.url = v; window.KOBLLUX?.toast?.('✓ URL atualizado'); }
      }
      document.getElementById('kblx-back')?.classList.remove('open');
    });

    document.getElementById('kblx-btn-close')?.addEventListener('click', () =>
      document.getElementById('kblx-back')?.classList.remove('open')
    );
    document.getElementById('kblx-back')?.addEventListener('click', e => {
      if (e.target === document.getElementById('kblx-back'))
        document.getElementById('kblx-back').classList.remove('open');
    });

    /* HUD Menu btn → open fusion card */
    document.getElementById('hudMenuBtn')?.addEventListener('click', () => {
      document.getElementById('mainCard')?.classList.toggle('open');
      document.getElementById('mainCard')?.classList.toggle('closed');
    });
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.openUrlEditor = openUrlEditor;
  window.setMode = setMode;

})();
