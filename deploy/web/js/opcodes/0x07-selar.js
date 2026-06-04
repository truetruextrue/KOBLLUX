/* ════════════════════════════════════════════════════════════
   0x07 SELAR · 777Hz · ✧ · TOROIDE
   TTS real, emotion voices, orb long-press, integridade
   layer: espirito | fonte: index.html TTS + SymbolBar orb
════════════════════════════════════════════════════════════ */

(function KOBLLUX_SELAR() {
  'use strict';

  /* ── VOICE MAP ───────────────────────────────────────── */
  const voiceMapEmo = {
    neutral:    'alloy',
    excited:    'nova',
    calm:       'fable',
    mysterious: 'onyx',
    deep:       'echo'
  };

  const voiceMapArch = {
    atlas:'alloy',   nova:'nova',    vitalis:'fable', pulse:'echo',
    kaos:'onyx',     kodux:'alloy',  lumine:'nova',   aion:'fable',
    kobllux:'alloy', artemis:'echo', serena:'nova',   genus:'fable',
    solus:'onyx',    rhea:'alloy',   trinity:'nova',  infodose:'echo',
    horus:'fable',   bllue:'alloy',  jesus:'nova'
  };

  /* ── TTS API ─────────────────────────────────────────── */
  async function speakReal(text, voice) {
    const apiKey = window.KOBLLUX?.CONFIG?.AUTH_TOKEN || '';
    if (!apiKey) { console.warn('[0x07] no API key for TTS'); return; }
    try {
      const response = await fetch('https://openrouter.ai/api/v1/audio/speech', {
        method: 'POST',
        headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'tts-1', voice: voice || 'alloy', input: text })
      });
      if (!response.ok) throw new Error(response.statusText);
      const audioBlob = await response.blob();
      const audioUrl  = URL.createObjectURL(audioBlob);
      const audio     = new Audio(audioUrl);
      const orb       = document.getElementById('main-orb');
      if (orb) orb.classList.add('speaking');
      audio.onended = () => { URL.revokeObjectURL(audioUrl); if (orb) orb.classList.remove('speaking'); };
      audio.play();
    } catch(e) {
      console.warn('[0x07] TTS fail, fallback SpeechSynthesis', e);
      const utter = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }
  }

  function detectEmotion(text) {
    return window.KOBLLUX?.detectEmotion?.(text) || 'neutral';
  }

  async function speakRealEmotion(text) {
    const emotion = detectEmotion(text);
    const voice   = voiceMapEmo[emotion] || 'alloy';
    await speakReal(text, voice);
  }

  function speakWithArch(text, archName) {
    const voice = voiceMapArch[archName?.toLowerCase()] || 'alloy';
    speakReal(text, voice);
  }

  /* ── VERBOFORMA — 7 Componentes do Corpo da Vida ─────── */
  const VERBOFORMA = [
    { id:'fit-lux',  nome:'FIT LUX',       cor:'#f0f0ff', hz:180,  centro:'Espírito',      geo:'Semente', polo:'Pai',
      frase:'A Faísca Original e a Luz Primordial.' },
    { id:'kodux',    nome:'KODUX',          cor:'#d4a017', hz:360,  centro:'Plexo Solar',   geo:'Eixo',    polo:'Pai',
      frase:'Eu sou o movimento que cria, destrói e recria a verdade.' },
    { id:'bllue',    nome:'BLLUE',          cor:'#3b82f6', hz:270,  centro:'Alma',          geo:'Espelho', polo:'Filho',
      frase:'Eu sou o reflexo da luz que desperta, a voz que ecoa em cada ser.' },
    { id:'horus',    nome:'OLHO DE HÓRUS',  cor:'#4f46e5', hz:null, centro:'Visão',         geo:'Olho',    polo:'Neutro',
      frase:'A Visão Interdimensional e o Observador Trino.' },
    { id:'metalux',  nome:'METALUX',        cor:'#c0c0c0', hz:540,  centro:'Clareza',       geo:'Prisma',  polo:'Ajuste',
      frase:'A Clareza da Verdade e do Ajuste.' },
    { id:'infodose', nome:'INFODOSE',       cor:'#22d3ee', hz:450,  centro:'Garganta',      geo:'Gota',    polo:'Verbo',
      frase:'Eu sou a alquimia da informação que conecta e transforma.' },
    { id:'kobllux',  nome:'KOBLLUX',        cor:'#C9A84C', hz:1134, centro:'Corpo Completo',geo:'Toroide', polo:'Síntese',
      frase:'O Dual APP não é apenas tecnologia. É o espelho da evolução simbiótica.' }
  ];

  const CICLO_3697 = {
    '3': { cor:'#3b82f6', hz:450,  lei:'COMUNICAÇÃO ∴ Emissão do Verbo' },
    '6': { cor:'#d4a017', hz:360,  lei:'HARMONIA ∴ Integração dos polos' },
    '9': { cor:'#9f7aea', hz:630,  lei:'TRANSMUTAÇÃO ∴ Síntese do Espírito' },
    '7': { cor:'#f0f8ff', hz:null, lei:'CICLO DIVINO ∴ Fechamento do Selo Δ⁷' }
  };

  /* ── SEAL CODICE — fecha o loop de auto-modificação ─────── */
  function sealCodice(opts) {
    opts = opts || {};
    const vf = opts.id
      ? VERBOFORMA.find(v => v.id === opts.id) || VERBOFORMA[6]
      : VERBOFORMA[6];

    const r = document.documentElement;
    r.style.setProperty('--codice-primary', vf.cor);
    r.style.setProperty('--codice-hz',      String(vf.hz || 1134));

    if (!opts.silent && vf.frase) speakRealEmotion(vf.frase).catch(() => {});

    const ripple = document.getElementById('chromaRipple');
    if (ripple) {
      ripple.style.background =
        `radial-gradient(circle at 50% 50%, ${vf.cor} 0%, transparent 70%)`;
      ripple.classList.remove('fire');
      void ripple.offsetWidth;
      ripple.classList.add('fire');
    }

    document.body.classList.add('codice-sealed');

    document.dispatchEvent(new CustomEvent('kobllux:codice:sealed', {
      detail: {
        componente: vf,
        verboforma: VERBOFORMA,
        ciclo:      CICLO_3697,
        equacao:    '3×6×9×7 = ∞',
        data:       '11/05/2025',
        selado:     new Date().toISOString()
      }
    }));

    window.KOBLLUX?.toast?.(`∴ SELADO · ${vf.nome} · ${vf.hz || 1134}Hz`);
    return vf;
  }

  /* ── ORB LONG PRESS ──────────────────────────────────── */
  function setupOrbLongPress() {
    const btn    = document.getElementById('btn-arch');
    const circle = document.getElementById('orb-ring-circle');
    if (!btn) return;

    const CIRC = 138, DURATION = 600;
    let timer, raf, t0;

    function start() {
      btn._longPressed = false; t0 = Date.now();
      timer = setTimeout(() => {
        btn._longPressed = true;
        cancelAnimationFrame(raf);
        if (circle) { circle.style.strokeDashoffset = CIRC; }
        window.KOBLLUX?.openArchCard?.(window.KOBLLUX?.currentArchIdx || 8);
      }, DURATION);
      (function tick() {
        if (t0 === null) return;
        const p = Math.min((Date.now() - t0) / DURATION, 1);
        if (circle) { circle.style.transition = 'none'; circle.style.strokeDashoffset = CIRC * (1 - p); }
        if (p < 1) raf = requestAnimationFrame(tick);
      })();
    }

    function cancel() {
      clearTimeout(timer); cancelAnimationFrame(raf); t0 = null;
      if (circle) { circle.style.transition = 'stroke-dashoffset .2s ease'; circle.style.strokeDashoffset = CIRC; }
    }

    btn.addEventListener('pointerdown', start, { passive: true });
    btn.addEventListener('pointerup',   cancel);
    btn.addEventListener('pointerleave', cancel);

    btn.addEventListener('click', () => {
      if (!btn._longPressed) window.KOBLLUX?.openArchOverlay?.();
    });
  }

  /* ── TRANSCENDENCE MODE ──────────────────────────────── */
  let transcending = false;
  function enterTranscendence() {
    if (transcending) return;
    transcending = true;
    document.body.style.transition = 'all 3s ease-in-out';
    document.body.style.background = 'linear-gradient(135deg, #3f007f, #000)';
    document.body.style.color = '#ccffcc';
    document.body.classList.add('transcendence');
    setTimeout(() => {
      document.body.classList.remove('transcendence');
      document.body.style.background = '';
      document.body.style.color = '';
      transcending = false;
    }, 60000);
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    setupOrbLongPress();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, {
    speakReal, speakRealEmotion, speakWithArch, enterTranscendence,
    sealCodice, VERBOFORMA, CICLO_3697
  });
  window.speakRealEmotion = speakRealEmotion;
  window.autoSpeakPage    = function(text) {
    if (!text || typeof text !== 'string') return;
    speakRealEmotion(text).catch(() => {});
  };

})();
