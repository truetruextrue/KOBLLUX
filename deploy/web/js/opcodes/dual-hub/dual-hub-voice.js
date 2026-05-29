// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · VOICE · 0x07 · SELAR · 777Hz · PULSE · ✧
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_VOICE() {
  'use strict';
  const OPCODE = '0x07';
  const HZ = 777;
  const GEO = 'TOROIDE';
  const ARQUETIPO = 'PULSE';
  const EVENTO = 'kobllux:dual:voice:carregado';

  const LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };

  function initVoices() {
    const wrap = document.getElementById('voicesWrap');
    if (!wrap) return;
    wrap.innerHTML = '';
    const archList = ['atlas.html','nova.html','vitalis.html','pulse.html','artemis.html','serena.html','kaos.html','genus.html','lumine.html','solus.html','rhea.html','aion.html'];
    function populateVoices() {
      let voices = speechSynthesis.getVoices();
      const filtered = voices.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.startsWith('en')));
      voices = filtered.length ? filtered : voices;
      const saved = LS.get('infodose:voices', {}) || {};
      if (Object.keys(saved).length === 0 && voices.length) {
        archList.forEach((name, idx) => { const v = voices[idx % voices.length]; if (v) saved[name] = v.name; });
        LS.set('infodose:voices', saved);
      }
      archList.forEach(name => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap';
        const label = document.createElement('span');
        label.textContent = name; label.style.cssText = 'min-width:70px;font-weight:700';
        const sel = document.createElement('select');
        sel.className = 'input ring'; sel.style.maxWidth = '220px';
        voices.forEach(v => {
          const opt = document.createElement('option');
          opt.value = v.name; opt.textContent = v.name + ' (' + v.lang + ')';
          sel.appendChild(opt);
        });
        if (saved[name]) sel.value = saved[name];
        sel.onchange = () => { saved[name] = sel.value; LS.set('infodose:voices', saved); };
        const btnTest = document.createElement('button');
        btnTest.className = 'btn fx-trans fx-press ring'; btnTest.textContent = 'Teste';
        const rp = document.createElement('span'); rp.className = 'ripple'; btnTest.appendChild(rp);
        if (typeof window.addRipple === 'function') window.addRipple(btnTest);
        btnTest.onclick = () => {
          const utter = new SpeechSynthesisUtterance('Olá, eu sou ' + name);
          const voiceName = saved[name] || sel.value;
          const voice = voices.find(v => v.name === voiceName);
          if (voice) utter.voice = voice;
          speechSynthesis.cancel(); speechSynthesis.speak(utter);
        };
        row.appendChild(label); row.appendChild(sel); row.appendChild(btnTest);
        wrap.appendChild(row);
      });
    }
    populateVoices();
    window.speechSynthesis.onvoiceschanged = () => populateVoices();
  }

  function speakArchetype(name) {
    try {
      const archName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      const saved = LS.get('infodose:voices', {});
      const voices = speechSynthesis.getVoices();
      let voice = null;
      if (saved && saved[archName]) voice = voices.find(v => v.name === saved[archName]);
      if (!voice) voice = voices.find(v => v.lang && (v.lang.startsWith('pt') || v.lang.startsWith('en')));
      if (!voice && voices.length) voice = voices[0];
      if (!voice) return;
      const utter = new SpeechSynthesisUtterance('Olá, eu sou ' + archName);
      utter.voice = voice;
      speechSynthesis.cancel(); speechSynthesis.speak(utter);
    } catch (_) {}
  }

  function speakWithActiveArch(text) {
    try {
      const select = document.getElementById('arch-select');
      let archFile = select ? select.value || '' : '';
      let base = archFile.replace(/\.html$/i, '');
      const key = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
      const saved = LS.get('infodose:voices', {}) || {};
      const voices = speechSynthesis.getVoices();
      let voice = null;
      if (saved[key]) voice = voices.find(v => v.name === saved[key]);
      if (!voice) voice = voices.find(v => v.lang && (v.lang.startsWith('pt') || v.lang.startsWith('en')));
      if (!voice && voices.length) voice = voices[0];
      if (!voice) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = voice;
      speechSynthesis.cancel(); speechSynthesis.speak(utter);
    } catch (_) {}
  }

  function showArchMessage(text, type) {
    type = type || 'info';
    try {
      const el = document.getElementById('archMsg');
      if (!el) return;
      el.textContent = text;
      if (type === 'ok') { el.style.background = 'rgba(57,255,182,0.75)'; el.style.color = '#0b0f14'; }
      else if (type === 'warn') { el.style.background = 'rgba(255,184,107,0.78)'; el.style.color = '#0b0f14'; }
      else if (type === 'err') { el.style.background = 'rgba(255,107,107,0.78)'; el.style.color = '#0b0f14'; }
      else { el.style.background = 'rgba(15,17,32,0.72)'; el.style.color = ''; }
      el.classList.add('show');
      clearTimeout(el._tm);
      el._tm = setTimeout(() => el.classList.remove('show'), 4000);
    } catch (_) {}
  }

  window.initVoices = initVoices;
  window.speakArchetype = speakArchetype;
  window.speakWithActiveArch = speakWithActiveArch;
  window.showArchMessage = showArchMessage;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.VOICE = { initVoices, speakArchetype, speakWithActiveArch, showArchMessage, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-voice', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.VOICE }));
})();
