/* ════════════════════════════════════════════════════════════
   0x02 INTEGRAR · 528Hz · ― · PLANO
   Chat Engine IIFE — CONFIG, training, API, renderResponse
   layer: mente | fonte: index.html IIFE principal
════════════════════════════════════════════════════════════ */

(function KOBLLUX_INTEGRAR() {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────── */
  const CONFIG = {
    TRAINING_MAIN:    'data/manifesto_infinity_metalux.txt',
    TRAINING_HISTORY: 'data/codex/Protocolo_de_Equalização_KOBLLUX_A_Verdade_do_Uno.txt',
    API_URL:  'https://openrouter.ai/api/v1/chat/completions',
    MODEL:    'arcee-ai/trinity-large-preview:free',
    TEMP:     0.7,
    CHUNK_SIZE: 49000,
    get AUTH_TOKEN() {
      return window.env?.API_KEY ||
             localStorage.getItem('kobllux_apikey') ||
             'Bearer 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';
    }
  };

  /* ── STATE ───────────────────────────────────────────── */
  const STORAGE_KEY = 'infodoseEnabled';
  const HISTORY_KEY = 'historyMode';
  let training = '', chunks = [], chunkIndex = 0;
  let trainingHistory = '';
  let conversation = [];
  let isEnabled = false, isStudying = false, isHistory = false;
  let userName = '', assistantBase = '';
  let pages = [], currentPage = 0, autoAdvance = true;

  const $ = s => document.querySelector(s);
  const create = (t, c, h) => {
    const e = document.createElement(t);
    if (c) e.className = c;
    if (h) e.innerHTML = h;
    return e;
  };

  /* ── API CALL ────────────────────────────────────────── */
  async function callAI() {
    try {
      const res = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': CONFIG.AUTH_TOKEN,
          'Content-Type':  'application/json'
        },
        body: JSON.stringify({
          model:       CONFIG.MODEL,
          messages:    conversation,
          temperature: CONFIG.TEMP
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || res.statusText);
      const ans = data.choices[0].message.content.trim();
      conversation.push({ role: 'assistant', content: ans });
      renderResponse(ans);
    } catch (e) {
      console.error('[0x02]', e);
      const msg = 'Desculpe, não consegui obter resposta. Tente novamente.';
      conversation.push({ role: 'assistant', content: msg });
      renderResponse(msg);
    }
  }

  /* ── RENDER RESPONSE ─────────────────────────────────── */
  function splitText(t) {
    let ps = t.split(/\n\s*\n/).filter(p => p.trim());
    if (ps.length < 2) ps = (t.match(/[^.!?]+[.!?]+/g) || []).map(s => s.trim());
    return ps;
  }

  function attachBlockListeners(block, para) {
    block.addEventListener('click', () => {
      autoAdvance = false;
      const clean = para
        .replace(/["""'']/g, '')
        .replace(/[ἰ0-ὯFᾐ0-ᾟF☀-⛿✀-➿]/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
      if (!block.dataset.spoken) {
        block.dataset.spoken = '1';
        block.classList.add('clicked');
      } else {
        block.classList.add('expanded');
        if (!isEnabled) { isEnabled = true; localStorage.setItem(STORAGE_KEY, '1'); updateUI(); }
        showLoading(' Pulso em Expansão...');
        conversation.push({ role: 'user', content: clean });
        callAI();
      }
    });
  }

  function processDynamicCommands(containerElem) {
    const CMD_REGEX = /\[\[([a-zA-Z0-9_]+):([\s\S]+?)\]\]/g;
    containerElem.innerHTML = containerElem.innerHTML.replace(CMD_REGEX, (full, type, payloadStr) => {
      let payload;
      try { payload = JSON.parse(payloadStr); } catch { return full; }
      switch (type) {
        case 'button':
          return `<button onclick='handleDynamicAction(${JSON.stringify(payload)})'>${payload.label || 'Botão'}</button>`;
        case 'style':
          document.querySelectorAll(payload.element).forEach(el => el.style[payload.property] = payload.value);
          return '';
        default: return full;
      }
    });
  }

  window.handleDynamicAction = function(payload) {
    switch (payload.action) {
      case 'copy':       navigator.clipboard.writeText(payload.data); break;
      case 'alert':      alert(payload.message); break;
      case 'saveDesign': localStorage.setItem('designState', JSON.stringify(payload.state)); break;
    }
  };

  function renderResponse(txt) {
    const wrap = document.querySelector('.pages-wrapper');
    if (!wrap) return;
    wrap.innerHTML = '';
    pages = []; currentPage = 0; autoAdvance = true;

    txt = txt
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    const paras = splitText(txt);
    const total = paras.length;
    if (total === 0) return;

    const maxPerPage = 3;
    const numPages = Math.ceil(total / maxPerPage);
    const baseSize = Math.floor(total / numPages);
    const extra = total % numPages;
    let cursor = 0;

    for (let i = 0; i < numPages; i++) {
      const thisSize = baseSize + (i < extra ? 1 : 0);
      const pg = document.createElement('div');
      pg.className = 'page' + (i === 0 ? ' active' : '');
      for (let j = 0; j < thisSize; j++) {
        const para = paras[cursor++].trim();
        const posClass = j === 0 ? 'intro' : (j === thisSize - 1 ? 'ending' : 'middle');
        const block = document.createElement('div');
        block.className = `response-block ${posClass}`;
        block.innerHTML = `<p>${para}</p>`;
        processDynamicCommands(block.querySelector('p'));
        attachBlockListeners(block, para);
        pg.appendChild(block);
      }
      wrap.appendChild(pg);
      pages.push(pg);
    }

    const ind = document.getElementById('pageIndicator');
    if (ind) ind.textContent = `1 / ${pages.length}`;
    autoSpeakPage(0);
  }

  function autoSpeakPage(i) {
    if (!pages[i]) return;
    const txts = Array.from(pages[i].querySelectorAll('p')).map(p => p.textContent).join(' ');
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(txts);
    utter.onend = () => {
      if (autoAdvance && i < pages.length - 1) changePage(1);
      else if (i === pages.length - 1) {
        speechSynthesis.speak(new SpeechSynthesisUtterance('Do seu jeito. Sempre único. Sempre seu.'));
      }
    };
    speechSynthesis.speak(utter);
  }

  function changePage(d) {
    const np = currentPage + d;
    if (np < 0 || np >= pages.length) return;
    pages[currentPage].classList.remove('active');
    pages[np].classList.add('active');
    currentPage = np;
    const ind = document.getElementById('pageIndicator');
    if (ind) ind.textContent = `${np + 1} / ${pages.length}`;
    if (autoAdvance) autoSpeakPage(np);
  }

  function showLoading(msg) {
    const wrap = document.querySelector('.pages-wrapper');
    if (!wrap) return;
    wrap.innerHTML = '';
    const p = create('div', 'page active');
    const foot = create('p', 'footer-text loading', '');
    msg.split('').forEach((ch, i) => {
      const sp = create('span');
      sp.textContent = ch;
      sp.style.animationDelay = (i * 0.02) + 's';
      sp.classList.add('loading');
      foot.appendChild(sp);
    });
    p.appendChild(foot);
    wrap.appendChild(p);
    const ind = document.getElementById('pageIndicator');
    if (ind) ind.textContent = '1 / 1';
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  }

  /* ── UI ──────────────────────────────────────────────── */
  function updateUI() {
    $('#toggleBtn')?.classList.toggle('active', isEnabled);
    $('#kittyBtn')?.classList.toggle('active', isStudying);
    $('#historyBtn')?.classList.toggle('active', isHistory);
    const name = $('#assistantName');
    if (name) name.textContent = isHistory
      ? 'CODEX: dual.infodose'
      : (isStudying ? 'Estudos dual.infodose' : (isEnabled ? assistantBase + ' dual.infodose' : ''));
    const cont = $('#logoContainer'), logo = $('#logoObj');
    if (cont && logo) {
      cont.classList.add('fading');
      setTimeout(() => {
        if (isHistory) logo.data = 'assets/icons/pill_fusion-kblx-trinity3.png';
        else if (isStudying) logo.data = 'assets/icons/DualKittyKard-icon-3.png';
        else logo.data = 'assets/icons/pill_fusion-kblx-1.png';
        cont.classList.remove('fading');
      }, 999);
    }
  }

  function loadConfig() {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      isEnabled = true;
      userName = localStorage.getItem('userName') || '';
      assistantBase = localStorage.getItem('assistantBase') || '';
      conversation = [{ role: 'system', content: (chunks[0] || training) + `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.` }];
      chunkIndex = 1;
      updateUI();
    }
    if (localStorage.getItem(HISTORY_KEY) === '1') { isHistory = true; updateUI(); }
  }

  function startConversation() {
    const base = isHistory
      ? trainingHistory
      : (chunks[0] || training) + `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`;
    const persona = isHistory ? 'CODEX dual.infodose.' : 'CODEX KOBLLUX Dual.infodose.';
    conversation = [{ role: 'system', content: base + '\n\nVocê é o ' + persona }];
    updateUI();
  }

  /* ── ON SEND ─────────────────────────────────────────── */
  function onSend() {
    const raw = ($('#userInput') || { value: '' }).value.trim();
    if (!raw) return;
    $('#userInput').value = '';
    autoAdvance = false;
    const lower = raw.toLowerCase();

    const responses = {
      cansado:    ["esgotado"],
      perdido:    ["confuso", "disperso"],
      "sem energia": ["fraco", "desanimado"],
      travou:     ["reiniciar"]
    };

    if (lower.includes('cansado') || lower.includes('esgotado')) {
      renderResponse("Respire... [[button:{\"label\":\"🧘 Meditar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#101F33\"}]}]]");
      return;
    }
    if (lower.includes('perdido') || lower.includes('confuso') || lower.includes('disperso')) {
      renderResponse("Vamos centrar o foco: [[button:{\"label\":\"💎 Harmonizar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#2f2f4f\"}]}]]");
      return;
    }
    if (lower.includes('sem energia') || lower.includes('fraco') || lower.includes('desanimado')) {
      renderResponse("Pulso em reativação... [[button:{\"label\":\"⚡ Reativar Pulso\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"linear-gradient(135deg,#0ff,#f0f)\"}]}]]");
      return;
    }
    if (lower.includes('travou') || lower.includes('reiniciar')) {
      renderResponse("Vamos renovar o campo: [[button:{\"label\":\"🔄 Reiniciar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#000\"}]}]]");
      return;
    }

    showLoading('Pulso enviado... Recebendo intenção…');
    conversation.push({ role: 'user', content: raw });
    callAI();
  }

  /* ── BIND UI ─────────────────────────────────────────── */
  function bindUI() {
    $('#sendBtn')?.addEventListener('click', onSend);
    $('#userInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') onSend(); });

    $('#historyBtn')?.addEventListener('click', () => {
      isHistory = !isHistory;
      localStorage.setItem(HISTORY_KEY, isHistory ? '1' : '0');
      startConversation();
    });

    $('#kittyBtn')?.addEventListener('click', () => {
      isStudying = !isStudying;
      if (isStudying) conversation = [{ role: 'system', content: training + '\n\nVocê é Assistente de Estudos dual.infodose.' }];
      else loadConfig();
      updateUI();
    });

    $('#toggleBtn')?.addEventListener('click', () => {
      if (!isEnabled) {
        document.getElementById('loginBox')?.classList.add('active');
      } else {
        isEnabled = false;
        localStorage.removeItem(STORAGE_KEY);
        conversation = [];
        updateUI();
      }
    });

    document.getElementById('loginForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('userName')?.value?.trim();
      const a = document.getElementById('assistantInput')?.value?.trim();
      if (!u || !a) return alert('Preencha os dados');
      isEnabled = true; userName = u; assistantBase = a;
      localStorage.setItem(STORAGE_KEY, '1');
      localStorage.setItem('userName', u);
      localStorage.setItem('assistantBase', a);
      loadConfig();
      document.getElementById('loginBox')?.classList.remove('active');
    });

    document.querySelector('.pagination')?.addEventListener('click', e => {
      if (e.target.dataset.action === 'prev') changePage(-1);
      if (e.target.dataset.action === 'next') changePage(1);
      autoAdvance = false;
    });

    document.body.addEventListener('click', e => {
      if (e.target.closest('.footer-text')) {
        document.querySelector('.pages-wrapper')?.classList.toggle('collapsed');
        e.target.closest('.footer-text')?.classList.toggle('active');
      }
    });
  }

  /* ── INIT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', async () => {
    window.handleAICommand = function(cmd) { console.warn('[0x02] AI command', cmd); };

    try {
      training = await fetch(CONFIG.TRAINING_MAIN).then(r => r.text());
      for (let i = 0; i < training.length; i += CONFIG.CHUNK_SIZE)
        chunks.push(training.slice(i, i + CONFIG.CHUNK_SIZE));
    } catch(e) { console.warn('[0x02] training load fail', e); }

    try {
      trainingHistory = await fetch(CONFIG.TRAINING_HISTORY).then(r => r.text());
    } catch(e) { console.warn('[0x02] history load fail', e); }

    bindUI();
    loadConfig();
    if (!conversation.length) startConversation();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, {
    callAI, renderResponse, changePage,
    autoSpeakPage, showLoading, onSend,
    getPages: () => pages,
    getCurrentPage: () => currentPage,
    CONFIG
  });

  window.changePage = changePage;
  window.autoSpeakPage = autoSpeakPage;
  window.pages = pages;
  window.currentPage = currentPage;

})();
