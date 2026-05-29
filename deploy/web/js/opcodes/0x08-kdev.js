/* ════════════════════════════════════════════════════════════
   0x08 KDEV · 852Hz · ◉ · ESPIRALADO
   DevOs Kernel — monitor técnico de estado KOBLLUX
   Cristalização de: inline-0-kdev.js
   (DevOs/modules · KOBLLUX TESTEMUNHAR VARIANT)
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: espirito | geo: ESPIRALADO | arquétipos: HORUS · ATLAS
   verboforma: HORUS (null Hz) · visão · olho · neutro

   AC: inline-0-kdev.js = sinal DevOs alternando entre métricas
   DC: KDEV local = fluxo contínuo de observação e testemunho

   Kernel de desenvolvedor — coleta métricas em tempo real:
   FPS, memória JS, contagem DOM, estado de rede, motores ativos.
   Integrado ao HUD de testemunho (0x08-testemunhar.js).

   API:
     window.KOBLLUX.KDEV.watch(metric)   → ativa monitoramento
     window.KOBLLUX.KDEV.report()        → snapshot atual
     window.KOBLLUX.KDEV.reset()         → zera métricas
     window.KOBLLUX.KDEV.show(visible)   → exibe/oculta HUD KDEV
════════════════════════════════════════════════════════════ */

(function KOBLLUX_KDEV() {
  'use strict';

  /* ── MÉTRICAS ────────────────────────────────────────── */
  let metrics = {
    fps: 0, fpsMin: Infinity, fpsMax: 0,
    dom: 0, scripts: 0, opcodes: 0,
    online: navigator.onLine,
    motors: 0, memory: null,
    ts: Date.now()
  };

  let rafId      = null;
  let lastFrame  = performance.now();
  let frameCount = 0;
  let hudEl      = null;
  let watching   = false;

  /* ── FPS COUNTER ─────────────────────────────────────── */
  function trackFPS(now) {
    frameCount++;
    const elapsed = now - lastFrame;
    if (elapsed >= 1000) {
      metrics.fps    = Math.round(frameCount * 1000 / elapsed);
      metrics.fpsMin = Math.min(metrics.fpsMin, metrics.fps);
      metrics.fpsMax = Math.max(metrics.fpsMax, metrics.fps);
      frameCount     = 0;
      lastFrame      = now;
      updateHUD();
    }
    rafId = requestAnimationFrame(trackFPS);
  }

  /* ── SNAPSHOT DOM ───────────────────────────────────── */
  function snapDOM() {
    metrics.dom     = document.querySelectorAll('*').length;
    metrics.scripts = document.querySelectorAll('script[data-opcode]').length;
    metrics.opcodes = document.querySelectorAll('[data-kobllux-opcode]').length;
    metrics.motors  = Object.keys(window.KOBLLUX || {}).length;
    metrics.online  = navigator.onLine;
    metrics.ts      = Date.now();
    if (performance.memory) {
      metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1048576);
    }
  }

  /* ── HUD KDEV ────────────────────────────────────────── */
  function createHUD() {
    if (hudEl) return;
    hudEl = document.createElement('div');
    hudEl.id = 'kob-kdev-hud';
    Object.assign(hudEl.style, {
      position: 'fixed', bottom: '10px', right: '10px',
      background: 'rgba(5,5,16,.92)', border: '1px solid #39ffb6',
      borderRadius: '6px', padding: '8px 12px',
      fontFamily: 'monospace', fontSize: '10px', color: '#39ffb6',
      zIndex: '4999', pointerEvents: 'none', lineHeight: '1.6',
      display: 'none'
    });
    hudEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hudEl);
  }

  function updateHUD() {
    if (!hudEl || hudEl.style.display === 'none') return;
    snapDOM();
    hudEl.innerHTML =
      `◉ KDEV · 852Hz · HORUS<br>` +
      `FPS: <span style="color:#fff">${metrics.fps}</span> [${metrics.fpsMin}–${metrics.fpsMax}]<br>` +
      `DOM: <span style="color:#fff">${metrics.dom}</span> · Opcodes: <span style="color:#fff">${metrics.opcodes}</span><br>` +
      `Scripts: <span style="color:#fff">${metrics.scripts}</span> · Motors: <span style="color:#fff">${metrics.motors}</span><br>` +
      (metrics.memory ? `MEM: <span style="color:#fff">${metrics.memory}MB</span><br>` : '') +
      `Net: <span style="color:${metrics.online ? '#39ffb6' : '#ff4444'}">${metrics.online ? 'ONLINE' : 'OFFLINE'}</span>`;
  }

  /* ── API ─────────────────────────────────────────────── */
  function watch(metric) {
    if (!watching) {
      watching = true;
      rafId = requestAnimationFrame(trackFPS);
      setInterval(snapDOM, 5000);
    }
    return metrics[metric];
  }

  function report() {
    snapDOM();
    document.dispatchEvent(new CustomEvent('kobllux:kdev:report', {
      bubbles: true, detail: { ...metrics }
    }));
    return { ...metrics };
  }

  function reset() {
    metrics.fpsMin = Infinity;
    metrics.fpsMax = 0;
    metrics.ts     = Date.now();
  }

  function show(visible) {
    if (!hudEl) createHUD();
    hudEl.style.display = visible !== false ? 'block' : 'none';
    if (visible !== false) { watch('fps'); updateHUD(); }
  }

  /* ── TECLADO: [K] para toggle KDEV HUD ─────────────── */
  document.addEventListener('keydown', e => {
    if ((e.key === 'k' || e.key === 'K') && e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (!hudEl) createHUD();
      const vis = hudEl.style.display === 'none' || !hudEl.style.display;
      show(vis);
    }
  });

  /* ── NETWORK ─────────────────────────────────────────── */
  window.addEventListener('online',  () => { metrics.online = true;  updateHUD(); });
  window.addEventListener('offline', () => { metrics.online = false; updateHUD(); });

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    createHUD();
    snapDOM();
    console.log('[0x08·KDEV] ◉ TESTEMUNHAR · 852Hz · HORUS DevOs · [Shift+K] HUD');
    console.log('[0x08·KDEV] RÉGUA 78K · cristalizado de inline-0-kdev.js');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.KDEV = { watch, report, reset, show, metrics };

})();
