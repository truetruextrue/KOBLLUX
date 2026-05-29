/* ════════════════════════════════════════════════════════════
   0x0B DI · 528Hz · ICOSAEDRO
   diHome — display de arquétipo em contexto home/landing
   Cristalização de: inline-0B.js (diHome/modules)
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: espirito | geo: ICOSAEDRO | arquétipos: todos os 19
   verboforma: INFODOSE (450Hz) · garganta · verbo · display

   DI = Dual Interface = interface dual arquétipo↔contexto
   AC: inline-0B.js = sinal alternando entre arquétipos no diHome
   DC: DI local = fluxo contínuo de exibição arquetípica estável

   Exibe arquétipos KOBLLUX em contexto de landing/home:
   carousel com timing PHI (1.618s por arquétipo),
   transição suave, integração com 0x0B-arquetipo.js

   API:
     window.KOBLLUX.DI.show(arch)        → exibe arquétipo por nome
     window.KOBLLUX.DI.cycle(ms?)        → auto-ciclo PHI timing
     window.KOBLLUX.DI.stopCycle()       → para ciclo
     window.KOBLLUX.DI.attach(container) → monta display em elemento
     window.KOBLLUX.DI.current()         → arquétipo atual
════════════════════════════════════════════════════════════ */

(function KOBLLUX_DI() {
  'use strict';

  const φ = 1.6180339887;
  const PHI_MS = Math.round(1618); /* 1618ms = φ × 1000 */

  /* ── 19 ARQUÉTIPOS ──────────────────────────────────── */
  const ARCHS = [
    { name:'atlas',    cor:'#8e9aaf', geo:'TETRAEDRO',  hz:432  },
    { name:'nova',     cor:'#00e5ff', geo:'OCTAEDRO',   hz:528  },
    { name:'vitalis',  cor:'#00e676', geo:'DODECAEDRO', hz:639  },
    { name:'pulse',    cor:'#ff6d00', geo:'ICOSAEDRO',  hz:594  },
    { name:'kaos',     cor:'#f50057', geo:'ESFERA',     hz:432  },
    { name:'kodux',    cor:'#ffd600', geo:'CUBO',       hz:360  },
    { name:'lumine',   cor:'#fff9c4', geo:'PRISMA',     hz:528  },
    { name:'aion',     cor:'#7c4dff', geo:'INFINITO',   hz:963  },
    { name:'kobllux',  cor:'#39ffb6', geo:'TOROIDE',    hz:1134 },
    { name:'artemis',  cor:'#80deea', geo:'ARCO',       hz:528  },
    { name:'serena',   cor:'#ce93d8', geo:'ONDA',       hz:432  },
    { name:'genus',    cor:'#a5d6a7', geo:'RAIZ',       hz:528  },
    { name:'solus',    cor:'#fff176', geo:'SOL',        hz:639  },
    { name:'rhea',     cor:'#ef9a9a', geo:'TERRA',      hz:432  },
    { name:'trinity',  cor:'#b39ddb', geo:'TRINDADE',   hz:777  },
    { name:'infodose', cor:'#80cbc4', geo:'GOTA',       hz:450  },
    { name:'horus',    cor:'#4fc3f7', geo:'OLHO',       hz:432  },
    { name:'bllue',    cor:'#1E90FF', geo:'ESPELHO',    hz:270  },
    { name:'jesus',    cor:'#fffde7', geo:'MERKABAH',   hz:432  }
  ];

  let currentArch = null;
  let cycleTimer  = null;
  let cycleIdx    = 0;
  let containers  = [];

  /* ── EXIBIR ARQUÉTIPO ───────────────────────────────── */
  function show(nameOrArch) {
    const arch = typeof nameOrArch === 'string'
      ? ARCHS.find(a => a.name === nameOrArch.toLowerCase())
      : nameOrArch;
    if (!arch) return null;
    currentArch = arch;

    /* Aplicar ao body se 0x0B disponível */
    if (window.KOBLLUX && window.KOBLLUX.setArch) {
      window.KOBLLUX.setArch(arch.name);
    }

    /* Aplicar aos containers registrados */
    containers.forEach(el => renderTo(el, arch));

    /* CSS vars locais */
    document.documentElement.style.setProperty('--di-arch-cor', arch.cor);
    document.documentElement.style.setProperty('--di-arch-hz',  `${arch.hz}Hz`);
    document.body.dataset.diArch = arch.name;

    document.dispatchEvent(new CustomEvent('kobllux:di:show', {
      bubbles: true, detail: { arch, hz: 528 }
    }));
    return arch;
  }

  /* ── RENDERIZAR EM CONTAINER ─────────────────────────── */
  function renderTo(el, arch) {
    if (!el) return;
    el.style.setProperty('--di-color', arch.cor);
    el.dataset.diArch = arch.name;
    el.dataset.diHz   = arch.hz;
    /* Se tiver .di-arch-name e .di-arch-geo, atualiza */
    const nameEl = el.querySelector('.di-arch-name');
    const geoEl  = el.querySelector('.di-arch-geo');
    if (nameEl) nameEl.textContent = arch.name.toUpperCase();
    if (geoEl)  geoEl.textContent  = arch.geo;
  }

  /* ── AUTO-CICLO PHI ──────────────────────────────────── */
  function cycle(ms = PHI_MS) {
    stopCycle();
    cycleTimer = setInterval(() => {
      cycleIdx = (cycleIdx + 1) % ARCHS.length;
      show(ARCHS[cycleIdx]);
    }, ms);
    return cycleTimer;
  }

  function stopCycle() {
    if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
  }

  /* ── ATTACH ──────────────────────────────────────────── */
  function attach(container) {
    const el = typeof container === 'string'
      ? document.querySelector(container)
      : container;
    if (!el) return;
    if (!containers.includes(el)) containers.push(el);
    el.classList.add('di-attached');
    if (currentArch) renderTo(el, currentArch);
    return el;
  }

  function current() { return currentArch; }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Escutar mudança de arquétipo do 0x0B */
    document.addEventListener('kobllux:arch:applied', e => {
      if (e.detail && e.detail.name) {
        const arch = ARCHS.find(a => a.name === e.detail.name.toLowerCase());
        if (arch) { currentArch = arch; containers.forEach(el => renderTo(el, arch)); }
      }
    });
    /* Iniciar com arquétipo salvo */
    const saved = localStorage.getItem('kob_arch');
    if (saved !== null) {
      const idx  = parseInt(saved, 10);
      const name = !isNaN(idx) ? ARCHS[idx % ARCHS.length].name : saved;
      show(name);
    }
    console.log('[0x0B·DI] ICOSAEDRO · 528Hz · diHome · 19 arquétipos · φ-cycle=' + PHI_MS + 'ms');
    console.log('[0x0B·DI] RÉGUA 78K · cristalizado de inline-0B.js');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DI = { show, cycle, stopCycle, attach, current, ARCHS, φ };

})();
