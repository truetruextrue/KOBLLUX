/* ════════════════════════════════════════════════════════════
   0x01 DETECTAR · 432Hz · ● · LINHA
   Inputs, voice recognition, emotion analysis, blob detect
   layer: corpo | fonte: index.html inline scripts
════════════════════════════════════════════════════════════ */

(function KOBLLUX_DETECTAR() {
  'use strict';

  /* ── VOICE RECOGNITION ───────────────────────────────── */
  function initVoiceBtn() {
    const voiceBtn = document.getElementById('voiceBtn');
    const userInput = document.getElementById('userInput');
    if (!voiceBtn || !userInput) return;

    voiceBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      const rec = new SpeechRecognition();
      rec.lang = 'pt-BR';
      rec.start();
      rec.onresult = evt => {
        userInput.value = evt.results[0][0].transcript;
        document.getElementById('sendBtn')?.dispatchEvent(new Event('click'));
      };
    });
  }

  /* ── EMOTION ANALYSIS ────────────────────────────────── */
  const emotionLog = JSON.parse(localStorage.getItem('emotionalTimeline') || '[]');

  function logEmotion(state) {
    const entry = { time: new Date().toISOString(), ...state };
    emotionLog.push(entry);
    localStorage.setItem('emotionalTimeline', JSON.stringify(emotionLog));
  }

  function detectEmotion(text) {
    const t = text.toLowerCase();
    if (t.includes('mistério') || t.includes('interdimensional')) return 'mysterious';
    if (t.includes('urgente') || t.includes('agora') || t.includes('!!!')) return 'excited';
    if (t.includes('calma') || t.includes('tranquilo')) return 'calm';
    if (t.includes('profundo') || t.includes('ritual')) return 'deep';
    return 'neutral';
  }

  function analyzeToneAndTrigger(inputText) {
    const lower = inputText.toLowerCase();
    const tone = {
      joy:     lower.includes('feliz') || lower.includes('grato'),
      despair: lower.includes('cansado') || lower.includes('triste') || lower.includes('vazio'),
      wonder:  lower.includes('maravilha') || lower.includes('cosmos') || lower.includes('amor')
    };
    logEmotion({ input: inputText, tone });
    return tone;
  }

  /* ── CLONE INPUT → INFODOSE NAME (Fusion Card sync) ─── */
  function bindFusionInputs() {
    const inputUser = document.getElementById('inputUser');
    const infodoseName = document.getElementById('infodoseNameInput');
    if (!inputUser || !infodoseName) return;
    [inputUser, infodoseName].forEach(inp => {
      inp.addEventListener('input', () => {
        document.dispatchEvent(new CustomEvent('di:name:update', { detail: { name: inp.value } }));
      });
    });
  }

  /* ── COPY / PASTE BUTTONS ────────────────────────────── */
  function bindCopyPaste() {
    document.querySelector('.copy-button')?.addEventListener('click', () => {
      const allBlocks = document.querySelectorAll('.response-block');
      const textToCopy = Array.from(allBlocks).map(b => b.innerText).join('\n\n');
      navigator.clipboard?.writeText(textToCopy);
    });
    document.querySelector('.paste-button')?.addEventListener('click', () => {
      navigator.clipboard?.readText().then(txt => {
        const inp = document.getElementById('userInput');
        if (inp) inp.value = txt;
      });
    });
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initVoiceBtn();
    bindCopyPaste();
    bindFusionInputs();

    const userInput = document.getElementById('userInput');
    if (userInput) {
      userInput.addEventListener('change', () => analyzeToneAndTrigger(userInput.value));
    }
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.detectEmotion = detectEmotion;
  window.KOBLLUX.logEmotion = logEmotion;
  window.KOBLLUX.analyzeTone = analyzeToneAndTrigger;

})();
