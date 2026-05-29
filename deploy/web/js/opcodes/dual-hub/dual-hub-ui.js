// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · UI · 0x03 · EXPANDIR · 639Hz · VITALIS · ▢
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_UI() {
  'use strict';
  const OPCODE = '0x03';
  const HZ = 639;
  const GEO = 'TETRAEDRO';
  const ARQUETIPO = 'VITALIS';
  const EVENTO = 'kobllux:dual:ui:carregado';

  const LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };

  function displayGreeting() {
    const card = document.getElementById('greetingCard');
    if (card) card.style.display = 'none';
    const name = (localStorage.getItem('infodose:userName') || '').trim();
    const sessions = document.querySelectorAll('.session').length;
    if (!name) {
      if (typeof window.showArchMessage === 'function')
        window.showArchMessage('Salve! Ative sua Dual Infodose registrando seu nome na seção Brain.', 'warn');
    } else {
      if (typeof window.showArchMessage === 'function')
        window.showArchMessage('Bem-vindo de volta, ' + name + '. UNO está ao seu lado. Você tem ' + sessions + ' sessão(ões) ativa(s).', 'ok');
    }
  }

  function applyTheme() {
    const theme = LS.get('uno:theme', 'medium');
    if (theme === 'default') {
      delete document.body.dataset.theme;
    } else {
      document.body.dataset.theme = theme;
    }
    const bgContainer = document.getElementById('custom-bg');
    if (!bgContainer) return;
    if (theme !== 'custom') { bgContainer.innerHTML = ''; return; }
    const bgData = LS.get('uno:bg', '');
    bgContainer.innerHTML = '';
    if (!bgData) return;
    if (/^data:video\//.test(bgData)) {
      const vid = document.createElement('video');
      vid.src = bgData; vid.autoplay = true; vid.loop = true; vid.muted = true; vid.playsInline = true;
      vid.style.cssText = 'width:100%;height:100%;object-fit:cover';
      bgContainer.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = bgData; img.alt = '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover';
      bgContainer.appendChild(img);
    }
  }

  function applyCSS() {
    let styleEl = document.getElementById('customStyle');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'customStyle';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = localStorage.getItem('infodose:cssCustom') || '';
  }

  window.displayGreeting = displayGreeting;
  window.applyTheme = applyTheme;
  window.applyCSS = applyCSS;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.UI = { displayGreeting, applyTheme, applyCSS, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-ui', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.UI }));
})();
