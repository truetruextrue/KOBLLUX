// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · NAV · 0x03 · EXPANDIR · 639Hz · ATLAS · ▢
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_NAV() {
  'use strict';
  const OPCODE = '0x03';
  const HZ = 639;
  const GEO = 'TETRAEDRO';
  const ARQUETIPO = 'ATLAS';
  const EVENTO = 'kobllux:dual:nav:carregado';

  const LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  const $ = (q, r) => (r || document).querySelector(q);

  const MODELS = ['openrouter/auto','anthropic/claude-3.5-sonnet','openai/gpt-4.1-mini','google/gemini-1.5-pro','meta/llama-3.1-405b-instruct','mistral/mistral-large-latest'];

  function nav(key) {
    const __ov = document.getElementById('homeInputOverlay');
    const __tb = document.getElementById('homeTextBtn');
    if (__ov) __ov.style.display = 'none';
    if (__tb) __tb.classList.remove('active');
    if (key === 'revo') key = 'chat';
    const tabs = ['home', 'apps', 'stack', 'brain', 'chat'];
    tabs.forEach(k => {
      const viewEl = document.getElementById('v-' + k);
      if (viewEl) viewEl.classList.toggle('active', k === key);
      const tabEl = document.querySelector('.tab[data-nav="' + k + '"]');
      if (tabEl) tabEl.classList.toggle('active', k === key);
    });
    LS.set('uno:lastTab', key);
    if (key === 'home') {
      try { if (typeof window.displayGreeting === 'function') window.displayGreeting(); } catch (_) {}
      try {
        const nameG = (localStorage.getItem('infodose:userName') || '').trim();
        if (!nameG) {
          if (typeof window.toast === 'function') window.toast('Salve! Ative sua Dual Infodose registrando seu nome na seção Brain.', 'warn');
        } else {
          if (typeof window.toast === 'function') window.toast('Bem-vindo de volta, ' + nameG + '. UNO está ao seu lado.', 'ok');
        }
      } catch (_) {}
      try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
    }
    try {
      let phrase = '';
      switch (key) {
        case 'home': phrase = 'Página inicial'; break;
        case 'apps': phrase = 'Abrindo apps'; break;
        case 'stack': phrase = 'Abrindo stack'; break;
        case 'brain': phrase = 'Abrindo usuário'; break;
        case 'chat': phrase = 'Abrindo chat'; break;
      }
      if (phrase) {
        if (typeof window.speakWithActiveArch === 'function') window.speakWithActiveArch(phrase);
        if (typeof window.showArchMessage === 'function') window.showArchMessage(phrase, 'info');
      }
      try {
        const prev = document.getElementById('msgPreview');
        if (prev) prev.style.display = (key === 'home' && prev.textContent) ? 'block' : 'none';
      } catch (_) {}
    } catch (_) {}
  }

  function toggleArchMenu() {
    const menu = document.getElementById('archMenu');
    if (!menu) return;
    menu.classList.toggle('show');
  }

  function startDualInteraction() {
    const archCircle = document.querySelector('.arch-circle');
    if (!archCircle) return;
    archCircle.classList.add('pressed');
    setTimeout(() => archCircle.classList.remove('pressed'), 180);
    const greet = 'Oi Dual';
    if (typeof window.showArchMessage === 'function') window.showArchMessage(greet, 'ok');
    try { if (typeof window.speakWithActiveArch === 'function') window.speakWithActiveArch(greet); } catch (_) {}
    setTimeout(() => {
      const sk = localStorage.getItem('dual.keys.openrouter') || '';
      const userName = (localStorage.getItem('infodose:userName') || '').trim();
      const model = LS.get('dual.openrouter.model');
      if (!sk || !userName || !model) {
        const warn = 'Configure nome, chave e modelo no Brain para conversar.';
        if (typeof window.showArchMessage === 'function') window.showArchMessage(warn, 'warn');
        return;
      }
      if (typeof window.startSpeechConversation === 'function') window.startSpeechConversation(userName, sk, model);
    }, 600);
  }

  function downloadSelf() {
    try {
      const clone = document.documentElement.cloneNode(true);
      const html = '<!doctype html>\n' + clone.outerHTML;
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'HUB-UNO-Revo.html'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 500);
      if (typeof window.toast === 'function') window.toast('HTML exportado', 'ok');
    } catch (e) { alert('Falha ao exportar: ' + e.message); }
  }

  function maybeSendAppsToRevo() { return; }

  // Inicialização via DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Brain init
    (function initBrain() {
      const sel = $('#model');
      if (sel) {
        sel.innerHTML = '';
        MODELS.forEach(m => { const o = document.createElement('option'); o.value = m; o.textContent = m; sel.appendChild(o); });
        sel.value = LS.get('dual.openrouter.model', MODELS[0]);
      }
      const skEl = $('#sk');
      if (skEl) skEl.value = localStorage.getItem('dual.keys.openrouter') || '';
      const saveSK = $('#saveSK');
      if (saveSK) saveSK.onclick = () => {
        if (sel) LS.set('dual.openrouter.model', sel.value);
        if (skEl) localStorage.setItem('dual.keys.openrouter', skEl.value || '');
        if (typeof window.toast === 'function') window.toast('Configurações salvas', 'ok');
      };
      const saveName = $('#saveName');
      if (saveName) saveName.onclick = () => {
        const un = $('#userName');
        localStorage.setItem('infodose:userName', (un ? un.value || '' : '').trim());
        try { if (typeof window.playTechPopSound === 'function') window.playTechPopSound(); } catch (_) {}
        try { if (typeof window.displayGreeting === 'function') window.displayGreeting(); } catch (_) {}
        try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
      };
      const assistantInput = document.getElementById('assistantName');
      if (assistantInput) assistantInput.value = (localStorage.getItem('infodose:assistantName') || '').trim();
      const btnAssistant = document.getElementById('saveAssistant');
      if (btnAssistant && assistantInput) {
        btnAssistant.onclick = () => {
          localStorage.setItem('infodose:assistantName', (assistantInput.value || '').trim());
          try { if (typeof window.playTechPopSound === 'function') window.playTechPopSound(); } catch (_) {}
        };
      }
      const voiceSel = document.getElementById('selectVoice');
      function populateVoiceSel() {
        if (!voiceSel) return;
        voiceSel.innerHTML = '';
        let voices = speechSynthesis.getVoices();
        if (!voices || !voices.length) return;
        const filtered = voices.filter(v => v.lang && (v.lang.toLowerCase().startsWith('pt') || v.lang.toLowerCase().startsWith('en')));
        voices = filtered.length ? filtered : voices;
        const savedVoice = localStorage.getItem('infodose:speechVoice') || '';
        voices.forEach(v => {
          const opt = document.createElement('option');
          opt.value = v.name; opt.textContent = v.name + ' (' + v.lang + ')';
          if (savedVoice && savedVoice === v.name) opt.selected = true;
          voiceSel.appendChild(opt);
        });
      }
      if (voiceSel) { populateVoiceSel(); speechSynthesis.onvoiceschanged = populateVoiceSel; }
      const btnVoice = document.getElementById('saveVoice');
      if (btnVoice && voiceSel) {
        btnVoice.onclick = () => {
          localStorage.setItem('infodose:speechVoice', voiceSel.value || '');
          try { if (typeof window.playTechPopSound === 'function') window.playTechPopSound(); } catch (_) {}
        };
      }
      const addBtn = $('#addModel'); const customInput = $('#customModel');
      if (addBtn && customInput && sel) {
        addBtn.onclick = () => {
          const val = (customInput.value || '').trim();
          if (!val) return;
          const opt = document.createElement('option'); opt.value = val; opt.textContent = val;
          sel.appendChild(opt); sel.value = val; LS.set('dual.openrouter.model', val); customInput.value = '';
          if (typeof window.toast === 'function') window.toast('Modelo adicionado', 'ok');
        };
      }
      const trainInp = $('#trainingFile');
      if (trainInp) {
        trainInp.addEventListener('change', (ev) => {
          const file = ev.target.files && ev.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              LS.set('dual.openrouter.training', { name: file.name, data: reader.result });
              if (typeof window.toast === 'function') window.toast('Treinamento carregado', 'ok');
            } catch (err) { if (typeof window.toast === 'function') window.toast('Erro ao carregar treino', 'err'); }
          };
          reader.readAsDataURL(file);
        });
      }
    })();

    // Theme settings init
    (function initThemeSettings() {
      if (!LS.get('uno:theme')) LS.set('uno:theme', 'medium');
      if (typeof window.applyTheme === 'function') window.applyTheme();
      const sel = document.getElementById('themeSelect');
      if (sel) {
        sel.value = LS.get('uno:theme', 'medium');
        sel.addEventListener('change', () => {
          LS.set('uno:theme', sel.value);
          if (typeof window.applyTheme === 'function') window.applyTheme();
          if (typeof window.toast === 'function') window.toast('Tema atualizado', 'ok');
          try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
        });
      }
      const upload = document.getElementById('bgUpload');
      if (upload) {
        upload.addEventListener('change', (e) => {
          const f = e.target.files && e.target.files[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              LS.set('uno:bg', reader.result); LS.set('uno:theme', 'custom');
              if (sel) sel.value = 'custom';
              if (typeof window.applyTheme === 'function') window.applyTheme();
              if (typeof window.toast === 'function') window.toast('Fundo personalizado salvo', 'ok');
              try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
            } catch (err) { if (typeof window.toast === 'function') window.toast('Erro ao salvar fundo', 'err'); }
          };
          reader.readAsDataURL(f);
        });
      }
    })();

    // archMenu delegation
    const menu = document.getElementById('archMenu');
    if (menu) {
      menu.addEventListener('click', (e) => {
        const audioBtn = e.target.closest('button[data-audio]');
        if (audioBtn) {
          if (typeof window.toggleAudio === 'function') window.toggleAudio();
          const archCircle = document.querySelector('.arch-circle');
          if (archCircle) audioBtn.classList.toggle('on', archCircle.classList.contains('audio-on'));
          return;
        }
        const btn = e.target.closest('button[data-nav]');
        if (btn) { nav(btn.getAttribute('data-nav')); menu.classList.remove('show'); }
      });
    }

    const mp = document.getElementById('msgPreview');
    if (mp) mp.addEventListener('click', () => nav('chat'));

    // Home input overlay
    const textBtn = document.getElementById('homeTextBtn');
    const voiceBtn = document.getElementById('homeVoiceBtn');
    const hiOverlay = document.getElementById('homeInputOverlay');
    const hiForm = document.getElementById('homeInputForm');
    const hiInput = document.getElementById('homeInput');
    if (textBtn && hiOverlay && hiForm && hiInput) {
      textBtn.addEventListener('click', () => {
        const show = hiOverlay.style.display !== 'block';
        hiOverlay.style.display = show ? 'block' : 'none';
        textBtn.classList.toggle('active', show);
        if (show) setTimeout(() => hiInput.focus(), 60);
      });
      hiForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const msg = hiInput.value.trim();
        if (!msg) return;
        if (typeof window.feedPush === 'function') window.feedPush('user', 'Você: ' + msg);
        if (typeof window.showArchMessage === 'function') window.showArchMessage('Pulso enviado. Recebendo intenção…', 'ok');
        if (typeof window.feedPush === 'function') window.feedPush('status', '⚡ Pulso enviado · recebendo intenção…');
        const userName = (localStorage.getItem('dual.name') || localStorage.getItem('infodose:userName') || '').trim();
        const sk = (localStorage.getItem('dual.keys.openrouter') || localStorage.getItem('infodose:sk') || '').trim();
        let mdl = LS.get('dual.openrouter.model');
        if (!mdl) mdl = (localStorage.getItem('infodose:model') || '').trim() || 'openrouter/auto';
        try { if (typeof window.handleUserMessage === 'function') window.handleUserMessage(msg, userName, sk, mdl); } catch (e) { console.warn(e); }
        hiInput.value = '';
      });
    }
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const userName = (localStorage.getItem('dual.name') || localStorage.getItem('infodose:userName') || '').trim();
        const sk = (localStorage.getItem('dual.keys.openrouter') || localStorage.getItem('infodose:sk') || '').trim();
        let mdl = LS.get('dual.openrouter.model');
        if (!mdl) mdl = (localStorage.getItem('infodose:model') || '').trim() || 'openrouter/auto';
        if (hiOverlay) hiOverlay.style.display = 'none';
        if (typeof window.startSpeechConversation === 'function') window.startSpeechConversation(userName, sk, mdl);
      });
    }

    // Tab/nav buttons
    document.querySelectorAll('.tab,[data-nav]').forEach(b => b.addEventListener('click', () => nav(b.dataset.nav || 'home')));
    const btnBack = document.getElementById('btnBack');
    if (btnBack) btnBack.onclick = () => { try { history.length > 1 && history.back(); } catch (_) {} };
    const btnBrain = document.getElementById('btnBrain');
    if (btnBrain) btnBrain.onclick = () => nav('brain');

    // Restore last tab
    let last = LS.get('uno:lastTab', 'home');
    if (last === 'revo') last = 'home';
    nav(last);
    if (last === 'home') { try { if (typeof window.displayGreeting === 'function') window.displayGreeting(); } catch (_) {} }

    // Keyboard shortcuts
    let gPressed = false;
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); downloadSelf(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); const s = document.getElementById('appSearch'); if (s) s.focus(); return; }
      if (e.key.toLowerCase() === 'g') { gPressed = true; setTimeout(() => gPressed = false, 600); return; }
      if (!gPressed) return;
      const k = e.key.toLowerCase();
      if (k === 'h') nav('home'); if (k === 'a') nav('apps'); if (k === 's') nav('stack');
      if (k === 'b') nav('brain'); if (k === 'r') nav('chat');
      gPressed = false;
    });

    // Help modal
    const modalHelp = document.getElementById('modalHelp');
    const btnHelp = document.getElementById('btnHelp');
    const closeHelp = document.getElementById('closeHelp');
    if (modalHelp && btnHelp && closeHelp) {
      btnHelp.onclick = () => { modalHelp.classList.add('open'); modalHelp.setAttribute('aria-hidden', 'false'); };
      closeHelp.onclick = () => { modalHelp.classList.remove('open'); modalHelp.setAttribute('aria-hidden', 'true'); };
      modalHelp.addEventListener('click', (e) => { if (e.target === modalHelp) closeHelp.click(); });
    }

    // Download button
    const btnDownload = document.getElementById('btnDownload');
    if (btnDownload) btnDownload.onclick = downloadSelf;

    // Performance/voice prefs
    (function initDualPrefs() {
      const perfSel = document.getElementById('selPerf');
      const voiceSel = document.getElementById('selVoice');
      const ds = window.KOBLLUX && window.KOBLLUX.DUAL && window.KOBLLUX.DUAL.STATE ? window.KOBLLUX.DUAL.STATE.dualState : {};
      if (perfSel && ds.perf) perfSel.value = ds.perf;
      if (voiceSel && ds.voice) voiceSel.value = ds.voice;
      const perfBtn = document.getElementById('btnPerf');
      const voiceBtn2 = document.getElementById('btnVoice');
      if (perfBtn && perfSel) {
        perfBtn.addEventListener('click', () => {
          if (ds) ds.perf = perfSel.value;
          localStorage.setItem('hub.perf', perfSel.value);
          if (typeof window.dualLog === 'function') window.dualLog('Performance atualizada: ' + perfSel.value);
          if (typeof window.toast === 'function') window.toast('Performance atualizada', 'ok');
        });
      }
      if (voiceBtn2 && voiceSel) {
        voiceBtn2.addEventListener('click', () => {
          if (ds) ds.voice = voiceSel.value;
          localStorage.setItem('hub.voice', voiceSel.value);
          if (typeof window.dualLog === 'function') window.dualLog('Voz selecionada: ' + voiceSel.value);
          if (typeof window.toast === 'function') window.toast('Voz atualizada', 'ok');
        });
      }
    })();

    // CSS buttons
    const btnApplyCSS = document.getElementById('applyCSS');
    const btnClearCSS = document.getElementById('clearCSS');
    const btnDownloadCSS = document.getElementById('downloadCSS');
    if (btnApplyCSS) {
      btnApplyCSS.addEventListener('click', () => {
        const textarea = document.getElementById('cssCustom');
        const css = (textarea && textarea.value || '').trim();
        localStorage.setItem('infodose:cssCustom', css);
        if (typeof window.applyCSS === 'function') window.applyCSS();
        if (typeof window.toast === 'function') window.toast('CSS aplicado', 'ok');
      });
    }
    if (btnClearCSS) {
      btnClearCSS.addEventListener('click', () => {
        localStorage.removeItem('infodose:cssCustom');
        const textarea = document.getElementById('cssCustom');
        if (textarea) textarea.value = '';
        if (typeof window.applyCSS === 'function') window.applyCSS();
        if (typeof window.toast === 'function') window.toast('CSS removido', 'warn');
      });
    }
    if (btnDownloadCSS) {
      btnDownloadCSS.addEventListener('click', () => {
        const css = localStorage.getItem('infodose:cssCustom') || '';
        const blob = new Blob([css], { type: 'text/css' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'custom.css'; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 500);
      });
    }

    if (typeof window.addRipple === 'function') document.querySelectorAll('button').forEach(window.addRipple);
  });

  window.nav = nav;
  window.toggleArchMenu = toggleArchMenu;
  window.startDualInteraction = startDualInteraction;
  window.downloadSelf = downloadSelf;
  window.maybeSendAppsToRevo = maybeSendAppsToRevo;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.NAV = { nav, toggleArchMenu, startDualInteraction, downloadSelf, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-nav', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.NAV }));
})();
