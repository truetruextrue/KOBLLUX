// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · ARCH · 0x0B · ARQUÉTIPO · 528Hz · KOBLLUX · ◑
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_ARCH() {
  'use strict';
  const OPCODE = '0x0B';
  const HZ = 528;
  const GEO = 'ICOSAEDRO';
  const ARQUETIPO = 'KOBLLUX';
  const EVENTO = 'kobllux:dual:arch:carregado';

  const ARCH_OVERLAYS = {
    atlas:   'rgba(64,158,255,0.22)',  nova:    'rgba(255,82,177,0.22)',
    vitalis: 'rgba(72,218,168,0.22)',  pulse:   'rgba(255,99,132,0.22)',
    artemis: 'rgba(186,130,219,0.22)', serena:  'rgba(140,190,255,0.22)',
    kaos:    'rgba(255,77,109,0.22)',   genus:   'rgba(87,207,112,0.22)',
    lumine:  'rgba(255,213,79,0.22)',   rhea:    'rgba(0,209,178,0.22)',
    solus:   'rgba(100,149,237,0.22)',  aion:    'rgba(255,159,67,0.22)',
    default: 'rgba(255,255,255,0.0)'
  };
  window.ARCH_OVERLAYS = ARCH_OVERLAYS;

  function applyArchOverlay(name) {
    const key = (name || '').toLowerCase();
    const color = ARCH_OVERLAYS[key] || ARCH_OVERLAYS.default;
    document.documentElement.style.setProperty('--arch-overlay', color);
  }
  window.applyArchOverlay = applyArchOverlay;

  (function initArchCircle() {
    const archList = ['atlas.html','nova.html','vitalis.html','pulse.html','artemis.html','serena.html','kaos.html','genus.html','lumine.html','solus.html','rhea.html','aion.html'];
    const select = document.getElementById('arch-select');
    const frame = document.getElementById('arch-frame');
    const fade = document.getElementById('arch-fadeCover');
    if (!select || !frame) return;

    function populate() {
      select.innerHTML = '';
      archList.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = name;
        select.appendChild(opt);
      });
    }

    function setSrcByIndex(idx) {
      if (!archList.length) return;
      const n = ((idx + archList.length) % archList.length);
      select.selectedIndex = n;
      const file = archList[n];
      frame.src = './archetypes/' + file;
      try { const base = file.replace(/\.html$/i, ''); if (typeof window.speakArchetype === 'function') window.speakArchetype(base); } catch (_) {}
      try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
      try { const base = file.replace(/\.html$/i, ''); applyArchOverlay(base); } catch (_) {}
    }

    let current = 0;
    populate();
    if (archList.length) setSrcByIndex(0);

    const archPrev = document.getElementById('arch-prev');
    const archNext = document.getElementById('arch-next');
    if (archPrev) {
      archPrev.addEventListener('click', () => {
        current = (current - 1 + archList.length) % archList.length;
        if (fade) fade.classList.add('show');
        setTimeout(() => { setSrcByIndex(current); setTimeout(() => { if (fade) fade.classList.remove('show'); }, 200); }, 140);
      });
    }
    if (archNext) {
      archNext.addEventListener('click', () => {
        current = (current + 1) % archList.length;
        if (fade) fade.classList.add('show');
        setTimeout(() => { setSrcByIndex(current); setTimeout(() => { if (fade) fade.classList.remove('show'); }, 200); }, 140);
      });
    }
    select.addEventListener('change', () => {
      current = select.selectedIndex;
      if (fade) fade.classList.add('show');
      setTimeout(() => { setSrcByIndex(current); setTimeout(() => { if (fade) fade.classList.remove('show'); }, 200); }, 140);
    });
  })();

  // Init CSS, voices, audio
  try { if (typeof window.applyCSS === 'function') window.applyCSS(); } catch (_) {}
  try { if (typeof window.initVoices === 'function') window.initVoices(); } catch (_) {}
  try { if (typeof window.initAudioRipple === 'function') window.initAudioRipple(); } catch (_) {}
  try { if (typeof window.welcome === 'function') window.welcome(); } catch (_) {}

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.ARCH = { applyArchOverlay, ARCH_OVERLAYS, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-arch', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.ARCH }));
})();
