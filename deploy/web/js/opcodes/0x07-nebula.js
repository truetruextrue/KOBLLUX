/* ════════════════════════════════════════════════════════════
   0x07 NEBULA · 777Hz · ✧ · TOROIDE
   VOZES NEBULA — motor de fala multi-plataforma
   SPEECHIFY  — leitura palavra-a-palavra com highlight

   Derivado de: DR-nebulaPro · KOBLLUX × SANDBOX SOROCABA
   layer: espirito | geo: TOROIDE | arquétipos: BLLUE · NOVA · AION

   MOTOR COMPARTILHADO — pode ser chamado por qualquer opcode:
     window.KOBLLUX.nebula.speak(text)
     window.KOBLLUX.nebula.stop()
     window.KOBLLUX.nebula.speakSelected()
     window.KOBLLUX.nebula.speakClipboard()
     window.NEBULA_SPF.speak(el)   — Speechify em elemento DOM
════════════════════════════════════════════════════════════ */

(function KOBLLUX_NEBULA() {
  'use strict';

  /* ── DETECÇÃO DE PLATAFORMA ─────────────────────────── */
  const UA      = navigator.userAgent || '';
  const isIOS   = /iP(hone|ad|od)/i.test(UA);
  const isMac   = /Macintosh/i.test(UA) && !isIOS;
  const isAnd   = /Android/i.test(UA);
  const isEdge  = /Edg/i.test(UA);
  const isChr   = /Chrome/i.test(UA) && !isEdge;

  const PLAT = isIOS ? '🍎iOS' : isMac ? '🍎macOS' : isAnd ? '🤖Android'
             : isEdge ? '🪟Edge' : isChr ? '🔊Chrome' : '🔊Web';

  /* ── VOICE PREFERENCES POR ARQUÉTIPO ────────────────── */
  /* Espelha ARCHETYPES de 0x0B-arquetipo.js via prioridade de voz */
  const ARCH_VOICE_PREFS = {
    nova:     [v => /luciana|francisca|vitoria|camila|isabel/i.test(v.name) && v.lang === 'pt-BR',
               v => /female|fem/i.test(v.name) && v.lang === 'pt-BR'],
    bllue:    [v => /google/i.test(v.name) && v.lang === 'pt-BR', v => v.lang === 'pt-BR'],
    pulse:    [v => /google/i.test(v.name) && v.lang === 'pt-BR'],
    lumine:   [v => /premium|enhanced/i.test(v.name + (v.voiceURI||'')) && v.lang === 'pt-BR',
               v => /luciana|eddy|reed/i.test(v.name) && v.lang === 'pt-BR'],
    aion:     [v => /eddy|antonio|roberta|reed|oskar/i.test(v.name) && v.lang === 'pt-BR'],
    kobllux:  [v => v.lang === 'pt-BR'],
    atlas:    [v => v.lang === 'pt-BR'],
    vitalis:  [v => /google/i.test(v.name) && v.lang === 'pt-BR'],
    serena:   [v => /premium/i.test(v.name) && v.lang === 'pt-BR', v => v.lang === 'pt-BR'],
    artemis:  [v => v.lang === 'pt-BR'],
    infodose: [v => /google/i.test(v.name) && v.lang === 'pt-BR'],
    jesus:    [v => v.lang === 'pt-BR'],
  };

  /* ── STATE ───────────────────────────────────────────── */
  const synth     = window.speechSynthesis;
  let allVoices   = [];
  let activeVoice = null;
  let speaking    = false;
  let chunks      = [];
  let chunkIdx    = 0;
  let keepAlive   = null;
  let currentArch = 'kobllux';

  /* ── SETTINGS PERSISTENCE ────────────────────────────── */
  const SK = 'kobllux.nebula.settings';
  let settings = JSON.parse(localStorage.getItem(SK) || '{}');
  function saveSettings() { localStorage.setItem(SK, JSON.stringify(settings)); }

  function getRate()  {
    const el = document.getElementById('nebula-rate');
    return parseFloat(el?.value || settings.rate || 0.92);
  }
  function getPitch() {
    const el = document.getElementById('nebula-pitch');
    return parseFloat(el?.value || settings.pitch || 1.0);
  }

  /* ── VOICE AUTO-DETECT (10 níveis de prioridade) ─────── */
  function autoDetectVoice(vv) {
    if (!vv || !vv.length) return null;
    const rank = [
      v => /pt[\-_]BR.*premium|premium.*pt[\-_]BR/i.test(v.name + (v.voiceURI||'')),
      v => (isIOS||isMac) && v.lang === 'pt-BR' && /luciana|eddy|reed|sandy/i.test(v.name),
      v => (isIOS||isMac) && v.lang === 'pt-BR',
      v => /google/i.test(v.name) && v.lang === 'pt-BR',
      v => /google/i.test(v.name) && v.lang.startsWith('pt'),
      v => isAnd && v.lang === 'pt-BR',
      v => /microsoft/i.test(v.name) && v.lang === 'pt-BR',
      v => v.lang === 'pt-BR',
      v => v.lang.startsWith('pt'),
      () => true,
    ];
    for (const fn of rank) { const found = vv.find(fn); if (found) return found; }
    return vv[0];
  }

  function switchVoiceForArch(arch) {
    if (!allVoices.length) return;
    const prefs = ARCH_VOICE_PREFS[arch] || [];
    for (const fn of prefs) {
      const v = allVoices.find(fn);
      if (v) { activeVoice = v; return; }
    }
    activeVoice = autoDetectVoice(allVoices);
  }

  /* ── LOAD VOICES ─────────────────────────────────────── */
  function loadVoices() {
    const vv = synth.getVoices();
    if (!vv.length) return;
    allVoices = vv;

    /* Popula select se existir */
    const sel = document.getElementById('nebula-voice-select');
    if (sel) {
      sel.innerHTML = '<option value="">— voz —</option>';
      vv.forEach((v, i) => {
        const flag = /apple/i.test(v.name+(v.voiceURI||'')) ? '🍎'
                   : /google/i.test(v.name) ? '🤖'
                   : /microsoft/i.test(v.name) ? '🪟' : '🔊';
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${flag} ${v.name} (${v.lang})`;
        sel.appendChild(opt);
      });
    }

    /* Restaura voz salva ou auto-detecta */
    const saved = settings.voice && vv.find(v => v.name === settings.voice);
    activeVoice = saved || autoDetectVoice(vv);
    if (activeVoice && sel) sel.value = vv.indexOf(activeVoice);
  }

  if (synth) {
    synth.onvoiceschanged = loadVoices;
    loadVoices();
    setTimeout(loadVoices, 600);
    setTimeout(loadVoices, 1800); /* iOS carrega vozes com delay */
  }

  /* ── KEEPALIVE iOS/Android anti-freeze ───────────────── */
  function startKeepAlive() {
    stopKeepAlive();
    keepAlive = setInterval(() => {
      if (speaking && synth.paused) synth.resume();
    }, 12000);
  }
  function stopKeepAlive() {
    if (keepAlive) { clearInterval(keepAlive); keepAlive = null; }
  }

  /* ── FALAR UM CHUNK ──────────────────────────────────── */
  function speakChunk(text, onEnd) {
    if (!synth || !text) { onEnd?.(); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice  = activeVoice;
    utt.lang   = activeVoice?.lang || 'pt-BR';
    utt.rate   = getRate();
    utt.pitch  = getPitch();
    utt.volume = 1;
    utt.onend  = () => onEnd?.();
    utt.onerror= () => onEnd?.();
    if (isAnd) synth.cancel();
    synth.speak(utt);
  }

  /* ── CADEIA DE CHUNKS ────────────────────────────────── */
  function playNext() {
    if (chunkIdx >= chunks.length || !speaking) { stop(); return; }
    const pct = Math.round((chunkIdx / chunks.length) * 100);
    const pb = document.getElementById('dock-progress-bar');
    if (pb) pb.style.width = pct + '%';
    _status(`[${chunkIdx+1}/${chunks.length}] ${chunks[chunkIdx].slice(0,52)}…`);
    speakChunk(chunks[chunkIdx], () => { chunkIdx++; playNext(); });
  }

  /* ── STATUS HELPER ───────────────────────────────────── */
  function _status(msg) {
    const el = document.getElementById('nebula-status');
    if (el) el.textContent = msg;
  }

  /* ── COLETA TEXTO DA PÁGINA ──────────────────────────── */
  function collectPageText(rootEl) {
    const root = rootEl || document.body;
    const texts = [];
    root.querySelectorAll('h1,h2,h3,p,.section-body,.card-body,.section-title,.card-title')
      .forEach(el => {
        const t = el.textContent.trim().replace(/\s+/g, ' ');
        if (t.length > 8 && !el.closest('#symbolBar,#kob-nebula-panel,nav,footer')) texts.push(t);
      });
    return texts.length ? texts : [root.textContent.trim().replace(/\s+/g,' ').slice(0,1000)];
  }

  /* ═══ API PÚBLICA ════════════════════════════════════════ */

  function speak(text) {
    if (!synth || !text) return;
    synth.cancel(); speaking = false; stopKeepAlive();
    chunks   = [text.trim().replace(/\s+/g,' ')];
    chunkIdx = 0;
    speaking = true;
    startKeepAlive();
    const pb = document.getElementById('nebula-play-btn');
    if (pb) pb.textContent = '⏸';
    _status(`✦ ${text.slice(0,52)}…`);
    speakChunk(chunks[0], () => {
      speaking = false; stopKeepAlive();
      if (pb) pb.textContent = '▶';
      _status('✦ concluído');
    });
  }

  function speakPage(rootEl) {
    if (!synth) return;
    synth.cancel(); speaking = false; stopKeepAlive();
    chunks   = collectPageText(rootEl);
    chunkIdx = 0;
    speaking = true;
    startKeepAlive();
    const pb = document.getElementById('nebula-play-btn');
    if (pb) pb.textContent = '⏸';
    playNext();
  }

  function pause() {
    if (!synth) return;
    if (speaking && !synth.paused) { synth.pause(); speaking = false; }
    else if (synth.paused) { synth.resume(); speaking = true; }
    const pb = document.getElementById('nebula-play-btn');
    if (pb) pb.textContent = speaking ? '⏸' : '▶';
  }

  function stop() {
    if (synth) synth.cancel();
    speaking = false; chunkIdx = 0; stopKeepAlive();
    const pb = document.getElementById('nebula-play-btn');
    if (pb) pb.textContent = '▶';
    const bar = document.getElementById('dock-progress-bar');
    if (bar) bar.style.width = '0%';
    _status('nebula · pronto');
  }

  async function speakClipboard() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text.length > 2) speak(text);
      else _status('clipboard vazio');
    } catch { _status('permissão clipboard negada'); }
  }

  function speakSelected() {
    const text = window.getSelection()?.toString().trim().replace(/\s+/g,' ');
    if (text && text.length > 3) speak(text);
  }

  function setArch(archName) {
    currentArch = archName;
    switchVoiceForArch(archName);
  }

  function setVoiceByIndex(idx) {
    const v = allVoices[parseInt(idx)];
    if (v) {
      activeVoice = v;
      settings.voice = v.name;
      saveSettings();
    }
  }

  /* ── SELEÇÃO → narrar automaticamente ───────────────── */
  let _selTimer = null;
  document.addEventListener('mouseup', () => {
    clearTimeout(_selTimer);
    _selTimer = setTimeout(() => {
      const text = window.getSelection()?.toString().trim().replace(/\s+/g,' ');
      if (!text || text.length < 4) return;
      /* Toast de seleção se existir */
      const toast = document.getElementById('nebula-sel-toast');
      if (toast) {
        toast.textContent = `✦ ${text.slice(0,52)}${text.length>52?'…':''}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
      speak(text);
    }, 380);
  });

  /* ── VISIBILITYCHANGE keepalive ──────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if (!synth) return;
    if (document.hidden) { if (speaking && !synth.paused) synth.pause(); }
    else                 { if (speaking &&  synth.paused) synth.resume(); }
  });

  /* ── KEYBOARD SHORTCUTS ──────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === ' ' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      /* Only intercept space if nebula panel exists */
      if (!document.getElementById('kob-nebula-panel')) return;
      e.preventDefault(); pause();
    }
  });

  /* ── RATE / PITCH SLIDERS ────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const rEl = document.getElementById('nebula-rate');
    const pEl = document.getElementById('nebula-pitch');
    const rOut = document.getElementById('nebula-rate-out');
    const pOut = document.getElementById('nebula-pitch-out');

    if (rEl) {
      rEl.value = settings.rate || 0.92;
      if (rOut) rOut.textContent = (+rEl.value).toFixed(2) + '×';
      rEl.addEventListener('input', () => {
        if (rOut) rOut.textContent = (+rEl.value).toFixed(2) + '×';
        settings.rate = parseFloat(rEl.value);
        saveSettings();
      });
    }
    if (pEl) {
      pEl.value = settings.pitch || 1.0;
      if (pOut) pOut.textContent = (+pEl.value).toFixed(2);
      pEl.addEventListener('input', () => {
        if (pOut) pOut.textContent = (+pEl.value).toFixed(2);
        settings.pitch = parseFloat(pEl.value);
        saveSettings();
      });
    }

    /* Voice select */
    const vSel = document.getElementById('nebula-voice-select');
    if (vSel) {
      vSel.addEventListener('change', () => {
        setVoiceByIndex(vSel.value);
        _status(`✦ ${activeVoice?.name || 'auto'} · ${PLAT}`);
      });
    }

    _status(`${PLAT} · nebula ready`);
  });

  /* ════════════════════════════════════════════════════════
     SPEECHIFY · Motor de leitura palavra-a-palavra
     Click em texto → lê com highlight e auto-scroll
  ════════════════════════════════════════════════════════ */
  const SPF_SEL = [
    'h1','h2','h3','.section-title','.section-body',
    '.card-body','.card-title','.pipe-name','.pipe-desc',
    '.law-text','.cta-title','.cta-sub',
    'p','.benefit-list li > div','.hero-sub',
    '.kob-screen-placeholder'
  ].join(',');

  let _spfEl = null, _spfOrigHTML = '';

  function _spfRestore(el) {
    if (el) { el.innerHTML = _spfOrigHTML; el.classList.remove('spf-reading'); }
    _spfEl = null;
  }

  function _esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function spfSpeak(el) {
    if (!synth) return;
    if (_spfEl && _spfEl !== el) _spfRestore(_spfEl);

    _spfOrigHTML = el.innerHTML;
    _spfEl       = el;
    el.classList.add('spf-reading');

    const fullText = el.textContent.trim().replace(/\s+/g, ' ');
    if (fullText.length < 2) return;

    /* Quebra texto em spans por palavra */
    const wordMap = []; let cursor = 0;
    el.innerHTML = fullText.split(/(\s+)/).map(part => {
      if (/^\s+$/.test(part)) { cursor += part.length; return part; }
      const start = cursor, id = 'spf' + start;
      cursor += part.length; wordMap.push({ start, id });
      return `<span class="spf-word" id="${id}">${_esc(part)}</span>`;
    }).join('');

    synth.cancel();
    const utt = new SpeechSynthesisUtterance(fullText);
    utt.voice  = activeVoice;
    utt.lang   = activeVoice?.lang || 'pt-BR';
    utt.rate   = getRate();
    utt.pitch  = getPitch();

    utt.onboundary = e => {
      if (e.name !== 'word') return;
      el.querySelectorAll('.spf-active').forEach(s => s.classList.remove('spf-active'));
      let best = wordMap[0];
      for (let i = 0; i < wordMap.length; i++) {
        if (wordMap[i].start <= e.charIndex) best = wordMap[i]; else break;
      }
      if (best) {
        const span = document.getElementById(best.id);
        if (span) { span.classList.add('spf-active'); span.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
      }
    };

    utt.onend = () => {
      el.querySelectorAll('.spf-active').forEach(s => s.classList.remove('spf-active'));
      setTimeout(() => { if (_spfEl === el) _spfRestore(el); }, 350);
    };
    utt.onerror = () => { if (_spfEl === el) _spfRestore(el); };

    synth.speak(utt);
    _status(`▶ "${fullText.slice(0,52)}${fullText.length>52?'…':''}"`);
  }

  function spfAttach(root) {
    (root || document).querySelectorAll(SPF_SEL).forEach(el => {
      if (el.closest('#symbolBar,#kob-nebula-panel,nav,footer,#kob-lib-drawer,#kob-tab-bar')) return;
      if (el.dataset.spf) return;
      el.dataset.spf = '1';
      el.classList.add('spf-readable');
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        const sel = window.getSelection()?.toString().trim();
        if (sel && sel.length > 3) return;
        e.stopPropagation();
        spfSpeak(this);
      });
    });
  }

  /* CSS injektado inline para SPF (sem dep. de arquivo) */
  (function injectSpfCss() {
    if (document.getElementById('spf-style')) return;
    const s = document.createElement('style');
    s.id = 'spf-style';
    s.textContent = `.spf-word{border-radius:3px;transition:background .1s}
.spf-active{background:rgba(30,226,242,.3);color:#fff;outline:1.5px solid rgba(30,226,242,.5);outline-offset:1px}
.spf-readable{cursor:pointer!important}
.spf-readable:hover{outline:1px dashed rgba(30,226,242,.2);outline-offset:2px}`;
    document.head.appendChild(s);
  })();

  document.addEventListener('DOMContentLoaded', () => spfAttach());

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.nebula = {
    speak, speakPage, pause, stop, speakClipboard, speakSelected, setArch, setVoiceByIndex,
    get voices() { return allVoices; },
    get activeVoice() { return activeVoice; },
    get speaking() { return speaking; },
    get currentArch() { return currentArch; },
    spfSpeak, spfAttach
  };

  /* Aliases globais para compatibilidade com código existente */
  window.nebulaSpeak      = speak;
  window.nebulaPlayPause  = pause;
  window.nebulaStop       = stop;
  window.nebulaSetVoice   = setVoiceByIndex;
  window.NEBULA_SPF       = { speak: spfSpeak, restore: _spfRestore, attach: spfAttach };

  console.log(`[0x07·NEBULA] ${PLAT} · VOZES NEBULA + SPEECHIFY · ATIVO`);
  console.log('[0x07·NEBULA] KODUX detecta → BLLUE pronuncia → AION sela');

})();
