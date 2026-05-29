// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · AUDIO · 0x08 · TESTEMUNHAR · 852Hz · HORUS · ◉
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_AUDIO() {
  'use strict';
  const OPCODE = '0x08';
  const HZ = 852;
  const GEO = 'ESPIRALADO';
  const ARQUETIPO = 'HORUS';
  const EVENTO = 'kobllux:dual:audio:carregado';

  function initAudioRipple() {
    const clickLayer = document.getElementById('audioRipple');
    const archCircleEl = document.querySelector('.arch-circle');
    if (!clickLayer || !archCircleEl) return;
    let enabled = false;
    let audioCtx = null;
    let analyser = null;
    let micStream = null;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream = stream;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const src = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        animate();
      } catch (_) {
        if (typeof window.toast === 'function') window.toast('Não foi possível acessar o microfone.', 'err');
        enabled = false;
        archCircleEl.classList.remove('audio-on');
      }
    }

    function stop() {
      if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
      if (audioCtx) { try { audioCtx.close(); } catch (_) {} audioCtx = null; }
      archCircleEl.style.boxShadow = '';
    }

    function animate() {
      if (!enabled || !analyser) return;
      const buf = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
      const rms = Math.sqrt(sum / buf.length);
      const intensity = Math.min(0.8, rms * 4);
      try {
        const fr = document.getElementById('arch-frame');
        if (fr && fr.contentWindow) fr.contentWindow.postMessage({ audioLevel: Math.min(1, rms * 3) }, '*');
      } catch (_) {}
      const blur = rms * 80;
      archCircleEl.style.boxShadow = '0 0 ' + blur + 'px rgba(255,255,255,' + intensity + ')';
      requestAnimationFrame(animate);
    }

    clickLayer.addEventListener('click', () => {
      if (typeof window.startDualInteraction === 'function') window.startDualInteraction();
    });

    window.toggleAudio = function () {
      enabled = !enabled;
      archCircleEl.classList.toggle('audio-on', enabled);
      if (enabled) start(); else stop();
    };
  }

  function welcome() {
    const name = (localStorage.getItem('infodose:userName') || '').trim();
    if (!name) {
      const msg = 'Salve! Ative sua Dual Infodose registrando seu nome na seção Brain.';
      if (typeof window.showArchMessage === 'function') window.showArchMessage(msg, 'warn');
      try { if (typeof window.speakWithActiveArch === 'function') window.speakWithActiveArch(msg); } catch (_) {}
    } else {
      const msg = 'Bem-vindo de volta, ' + name + '. UNO está ao seu lado.';
      if (typeof window.showArchMessage === 'function') window.showArchMessage(msg, 'ok');
      try { if (typeof window.speakWithActiveArch === 'function') window.speakWithActiveArch(msg); } catch (_) {}
    }
  }

  // Aplicar ripple em todos os botões e observar novos elementos
  if (typeof window.addRipple === 'function') document.querySelectorAll('button').forEach(window.addRipple);
  const obs = new MutationObserver((muts) => {
    muts.forEach(m => m.addedNodes && m.addedNodes.forEach(n => {
      if (n.nodeType === 1 && typeof window.addRipple === 'function') {
        if (n.matches && n.matches('button')) window.addRipple(n);
        n.querySelectorAll && n.querySelectorAll('button').forEach(window.addRipple);
      }
    }));
  });
  obs.observe(document.body || document.documentElement, { childList: true, subtree: true });

  // Reposicionar arquétipo abaixo do menu na Home
  (function () {
    try {
      const home = document.getElementById('v-home');
      if (!home) return;
      const arch = home.querySelector('.arch-container');
      const cards = home.querySelector('.cards');
      if (arch && cards) arch.insertAdjacentElement('afterend', cards);
    } catch (_) {}
  })();

  window.initAudioRipple = initAudioRipple;
  window.welcome = welcome;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.AUDIO = { initAudioRipple, welcome, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-audio', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.AUDIO }));
})();
