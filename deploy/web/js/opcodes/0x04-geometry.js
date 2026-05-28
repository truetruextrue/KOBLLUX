/* ════════════════════════════════════════════════════════════
   0x04 GEOMETRY · 594Hz · ◇ · OCTAEDRO
   DOM Attribution Engine + SVG Overlay visualizador de geometria
   Pressione [G] para toggle do overlay fractal

   Derivado de: KOBLLUX GEOMETRY ENGINE · SANDBOX SOROCABA
   layer: mente | geo: OCTAEDRO | arquétipos: ARTEMIS · ATLAS

   MOTOR COMPARTILHADO — atribui data-kobllux-* a qualquer DOM
   e renderiza overlay SVG com pontos, retas e planos.

   API:
     window.KOBLLUX.GEO.PONTO.detect() → []HTMLElement
     window.KOBLLUX.SVG.toggle()        → mostra/oculta overlay
     window.KOBLLUX.GEO.CICLO.calc(n)  → { original, reducao, ciclo }
════════════════════════════════════════════════════════════ */

(function KOBLLUX_GEOMETRY() {
  'use strict';

  /* ── GEOMETRIAS FRACTAIS (0x00–0x0C mapeadas) ─────────── */
  const GEO = {
    PONTO: {
      opcode: '0x01', sym: '●', hz: 432,
      detect() {
        return [...document.querySelectorAll(
          '.card,.metric,.arch-node,.btn-cta,.btn-ghost,.pipe-step,' +
          '.symbol-button,.kob-matrix-dot,.arch-chip'
        )];
      }
    },
    RETA: {
      opcode: '0x02', sym: '―', hz: 528,
      detect() {
        const pts = GEO.PONTO.detect();
        const out = [];
        for (let i = 0; i < Math.min(pts.length - 1, 24); i++) {
          const a = pts[i].getBoundingClientRect();
          const b = pts[i + 1].getBoundingClientRect();
          out.push({
            from: { x: a.left + a.width / 2, y: a.top + a.height / 2 },
            to:   { x: b.left + b.width / 2, y: b.top + b.height / 2 }
          });
        }
        return out;
      }
    },
    PLANO: {
      opcode: '0x03', sym: '▢', hz: 639,
      detect() {
        return [...document.querySelectorAll(
          '.cards,.metrics,.arch-ring,.pipeline,section,' +
          '#universe-grid,.kob-screen,.symbol-bar'
        )].filter(Boolean);
      }
    },
    CRISTAL: {
      opcode: '0x04', sym: '◇', hz: 594,
      detect() {
        return [...document.querySelectorAll(
          'nav,.hero,.law-banner,.cta-box,.dna-block,' +
          '#mainCard,#kodux-widget,#main-orb'
        )].filter(Boolean);
      }
    },
    CICLO: {
      base: [3, 6, 9, 7], produto: 1134,
      reduce(n) {
        while (n >= 10) n = [...String(n)].reduce((a, b) => +a + +b, 0);
        return n;
      },
      calc(n) {
        return {
          original: n,
          reducao:  this.reduce(n),
          ciclo:    this.base[n % this.base.length]
        };
      }
    }
  };

  /* ── DOM ATTRIBUTION MAP ─────────────────────────────── */
  const ATTR_MAP = {
    'html':              { opcode: '0x00', geo: '○ ORIGEM',     hz: '768Hz' },
    'body':              { opcode: '0x01', geo: '● PONTO',      hz: '432Hz' },
    'nav':               { opcode: '0x06', geo: '☯ UNIFICAR',   hz: '528Hz' },
    '#main-container':   { opcode: '0x02', geo: '― INTEGRAR',   hz: '528Hz' },
    '.wrap':             { opcode: '0x03', geo: '▢ EXPANDIR',   hz: '639Hz' },
    '.card':             { opcode: '0x04', geo: '◇ LAPIDAR',    hz: '594Hz' },
    '.metric':           { opcode: '0x04', geo: '◇ LAPIDAR',    hz: '594Hz' },
    '.pipe-step':        { opcode: '0x0B', geo: '≋ ARQUÉTIPO',  hz: '528Hz' },
    '.arch-node':        { opcode: '0x0B', geo: '≋ ARQUÉTIPO',  hz: '528Hz' },
    '.arch-chip':        { opcode: '0x0B', geo: '≋ ARQUÉTIPO',  hz: '528Hz' },
    'section':           { opcode: '0x03', geo: '▢ PLANO',      hz: '639Hz' },
    '.btn-cta':          { opcode: '0x07', geo: '✧ SELAR',      hz: '777Hz' },
    '.symbol-button':    { opcode: '0x06', geo: '☯ UNIFICAR',   hz: '528Hz' },
    '#universe-grid':    { opcode: '0x03', geo: '▢ EXPANDIR',   hz: '639Hz' },
    '.kob-screen':       { opcode: '0x03', geo: '▢ EXPANDIR',   hz: '639Hz' },
    '#symbolBar':        { opcode: '0x06', geo: '☯ UNIFICAR',   hz: '528Hz' },
    '#main-orb':         { opcode: '0x07', geo: '✧ TOROIDE',    hz: '777Hz' },
    '#kodux-widget':     { opcode: '0x0C', geo: '⌘ SÍNTESE',    hz: '777Hz' },
    '#kob-nebula-panel': { opcode: '0x07', geo: '✧ NEBULA',     hz: '777Hz' },
  };

  function applyDomAttribution() {
    let count = 0;
    for (const [sel, d] of Object.entries(ATTR_MAP)) {
      document.querySelectorAll(sel).forEach(el => {
        el.dataset.koblluxOpcode = d.opcode;
        el.dataset.koblluxGeo   = d.geo;
        el.dataset.koblluxHz    = d.hz;
        count++;
      });
    }
    return count;
  }

  /* ── SVG OVERLAY ─────────────────────────────────────── */
  let svg = null, overlayVisible = false;

  function createSVG() {
    if (svg) svg.remove();
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'kobllux-geo-overlay';
    Object.assign(svg.style, {
      position: 'fixed', inset: '0',
      width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: '999998',
      opacity: '0', transition: 'opacity .3s ease'
    });
    document.body.appendChild(svg);
  }

  function renderSVG() {
    if (!svg) createSVG();
    svg.innerHTML = '';

    const pts = GEO.PONTO.detect();

    /* Pontos */
    pts.slice(0, 40).forEach(el => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const c  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', cy);
      c.setAttribute('r', '5'); c.setAttribute('fill', '#39ffb6');
      c.setAttribute('opacity', '0.7'); svg.appendChild(c);
    });

    /* Retas */
    GEO.RETA.detect().forEach(r => {
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', r.from.x); l.setAttribute('y1', r.from.y);
      l.setAttribute('x2', r.to.x);   l.setAttribute('y2', r.to.y);
      l.setAttribute('stroke', '#ff52e5'); l.setAttribute('stroke-width', '1');
      l.setAttribute('opacity', '0.4'); svg.appendChild(l);
    });

    /* Planos */
    GEO.PLANO.detect().slice(0, 12).forEach(el => {
      const r    = el.getBoundingClientRect();
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', r.left); rect.setAttribute('y', r.top);
      rect.setAttribute('width', r.width); rect.setAttribute('height', r.height);
      rect.setAttribute('fill', 'none'); rect.setAttribute('stroke', '#1be4ff');
      rect.setAttribute('stroke-width', '1.5'); rect.setAttribute('opacity', '0.35');
      rect.setAttribute('stroke-dasharray', '6,4'); svg.appendChild(rect);
    });

    /* Info panel */
    const n     = pts.length;
    const ciclo = GEO.CICLO.calc(n);
    const g     = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const top   = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--kob-topbar-h') || '0', 10) + 10;
    g.innerHTML = `
      <rect x="10" y="${top}" width="300" height="90" rx="8"
            fill="rgba(5,5,16,.88)" stroke="#39ffb6" stroke-width="1"/>
      <text x="20" y="${top+20}" fill="#39ffb6" font-size="11" font-family="monospace" font-weight="900">◇ KOBLLUX GEOMETRY · 0x04 · 594Hz</text>
      <text x="20" y="${top+38}" fill="#fff" font-size="10" font-family="monospace">● Pontos: ${n}  ― Retas: ${GEO.RETA.detect().length}</text>
      <text x="20" y="${top+53}" fill="#fff" font-size="10" font-family="monospace">▢ Planos: ${GEO.PLANO.detect().length}  ◇ Cristais: ${GEO.CRISTAL.detect().length}</text>
      <text x="20" y="${top+68}" fill="#39ffb6" font-size="10" font-family="monospace">Ciclo: ${ciclo.original}→${ciclo.reducao} · 3×6×9×7=1134  [G] fechar</text>`;
    svg.appendChild(g);
  }

  function toggleOverlay() {
    overlayVisible = !overlayVisible;
    if (!svg) createSVG();
    svg.style.opacity = overlayVisible ? '1' : '0';
    if (overlayVisible) renderSVG();
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const count = applyDomAttribution();
    createSVG();

    document.addEventListener('keydown', e => {
      if ((e.key === 'g' || e.key === 'G') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault(); toggleOverlay();
      }
    });

    window.addEventListener('resize', () => { if (overlayVisible) renderSVG(); });

    console.log(`[0x04·GEO] ◇ KOBLLUX GEOMETRY · ${count} elementos marcados · [G] overlay`);
    console.log('[0x04·GEO] 3×6×9×7=1134 · JESUS = VERBO = GRAVIDADE');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.GEO = GEO;
  window.KOBLLUX.SVG = { toggle: toggleOverlay, render: renderSVG };
  window.KOBLLUX.applyDomAttribution = applyDomAttribution;

})();
