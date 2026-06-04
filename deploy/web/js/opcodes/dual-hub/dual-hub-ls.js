// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · LS · 0x09 · ETERNIZAR · 963Hz · AION · ♾
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_LS() {
  'use strict';
  const OPCODE = '0x09';
  const HZ = 963;
  const GEO = 'INFINITO';
  const ARQUETIPO = 'AION';
  const EVENTO = 'kobllux:dual:ls:carregado';

  const LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  const $ = (q, r) => (r || document).querySelector(q);
  const $$ = (q, r) => Array.from((r || document).querySelectorAll(q));

  // ---- Stack upload ----
  (() => {
    const uploadBtn = document.getElementById('btnStackUpload');
    const uploadInput = document.getElementById('stackUpload');
    if (uploadBtn && uploadInput) {
      uploadBtn.addEventListener('click', () => uploadInput.click());
      uploadInput.addEventListener('change', (ev) => {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const content = String(reader.result || '');
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          if (typeof window.openApp === 'function') window.openApp({ title: file.name.replace(/\.(html?|txt)$/i, ''), url });
        };
        reader.readAsText(file);
        ev.target.value = '';
      });
    }

    const btnAddGroup = document.getElementById('btnAddGroup');
    const stackWrapEl = document.getElementById('stackWrap');
    window.currentGroupId = null;
    if (btnAddGroup && stackWrapEl) {
      btnAddGroup.addEventListener('click', () => {
        const name = prompt('Nome do grupo:');
        if (!name) return;
        const gid = 'g_' + Math.random().toString(36).slice(2);
        const details = document.createElement('details');
        details.className = 'stack-group';
        details.setAttribute('data-group-id', gid);
        details.open = true;
        const summary = document.createElement('summary');
        summary.textContent = name;
        const content = document.createElement('div');
        content.className = 'group-content';
        details.appendChild(summary); details.appendChild(content);
        stackWrapEl.prepend(details);
        window.currentGroupId = gid;
        try { if (typeof window.saveStackState === 'function') window.saveStackState(); } catch (_) {}
      });
    }
  })();

  // ---- Splash ----
  window.addEventListener('load', () => {
    const splash = document.getElementById('appSplash');
    if (!splash) return;
    const audioElem = document.getElementById('splashSound');
    if (audioElem) { try { audioElem.currentTime = 0; audioElem.play().catch(() => {}); } catch (_) {} }
    try { if (typeof window.speakSplash === 'function') window.speakSplash(); } catch (_) {}
    try { if (typeof window.speakHomeGreeting === 'function') setTimeout(() => window.speakHomeGreeting(), 400); } catch (_) {}
    setTimeout(() => {
      splash.classList.add('hidden');
      setTimeout(() => { if (splash && splash.parentNode) splash.parentNode.removeChild(splash); }, 400);
    }, 1200);
  });

  // ---- Stack state: save / restore / groups / pinned ----
  (() => {
    function createStackGroup(gid, name) {
      const stackWrapEl = document.getElementById('stackWrap');
      if (!stackWrapEl) return;
      const details = document.createElement('details');
      details.className = 'stack-group';
      details.setAttribute('data-group-id', gid);
      details.open = true;
      const summary = document.createElement('summary');
      summary.textContent = name;
      const content = document.createElement('div');
      content.className = 'group-content';
      details.appendChild(summary); details.appendChild(content);
      stackWrapEl.prepend(details);
    }

    function saveStackState() {
      try {
        const groups = [];
        document.querySelectorAll('#stackWrap .stack-group').forEach(g => {
          const id = g.getAttribute('data-group-id');
          const name = g.querySelector('summary') ? g.querySelector('summary').textContent : '';
          if (id && name) groups.push({ id, name });
        });
        localStorage.setItem('unoStackGroups', JSON.stringify(groups));
        const sess = [];
        document.querySelectorAll('#stackWrap .session, #sessionsAnchor .session').forEach(card => {
          const sid = card.dataset.sid;
          const meta = card.dataset.meta;
          const gid = card.dataset.gid || null;
          const min = card.classList.contains('min');
          const pinned = card.classList.contains('pinned');
          if (sid && meta) sess.push({ sid, meta, gid, min, pinned });
        });
        localStorage.setItem('unoStackSessions', JSON.stringify(sess));
      } catch (e) { console.warn('Erro ao salvar estado do stack', e); }
    }
    window.saveStackState = saveStackState;

    function ensureDefaultGroups() {
      try {
        const stackWrapEl = document.getElementById('stackWrap');
        if (!stackWrapEl) return;
        const RAW = window.RAW || {};
        const names = {};
        (RAW.apps || []).forEach(a => {
          if (a && a.title && a.title.includes('·')) {
            const parts = a.title.split('·');
            const gName = (parts[1] || '').trim();
            if (gName) names[gName] = true;
          }
        });
        Object.keys(names).forEach(name => {
          const gid = 'g_' + name.toLowerCase().replace(/\s+/g, '_');
          if (!document.querySelector('#stackWrap .stack-group[data-group-id="' + gid + '"]')) createStackGroup(gid, name);
        });
      } catch (e) { console.warn('Falha ao garantir grupos padrão', e); }
    }
    window.ensureDefaultGroups = ensureDefaultGroups;

    function restoreStackState() {
      try {
        const groups = JSON.parse(localStorage.getItem('unoStackGroups') || '[]');
        if (Array.isArray(groups)) groups.forEach(g => { if (g && g.id && g.name) createStackGroup(g.id, g.name); });
        const sessions = JSON.parse(localStorage.getItem('unoStackSessions') || '[]');
        if (Array.isArray(sessions)) {
          sessions.forEach(s => {
            try {
              const meta = JSON.parse(s.meta || '{}');
              if (typeof window.openApp === 'function') window.openApp({ sid: s.sid, title: meta.title, url: meta.url, gid: s.gid, pinned: s.pinned });
              const card = document.querySelector('[data-sid="' + s.sid + '"]');
              if (card && s.min) card.classList.add('min');
            } catch (_) {}
          });
        }
      } catch (e) { console.warn('Falha ao restaurar grupos/sessões', e); }
      if (typeof window.updateDock === 'function') window.updateDock();
    }
    window.restoreStackState = restoreStackState;

    function getPinnedList() { try { return JSON.parse(localStorage.getItem('unoPinnedApps') || '[]') || []; } catch (_) { return []; } }

    function addPinned(meta) {
      if (!meta || !meta.title) return;
      const list = getPinnedList();
      const exists = list.some(item => item.title === meta.title && item.url === meta.url);
      if (!exists) { list.push({ title: meta.title, url: meta.url }); localStorage.setItem('unoPinnedApps', JSON.stringify(list)); }
      if (typeof window.updatePinnedNav === 'function') window.updatePinnedNav();
    }
    window.addPinned = addPinned;

    function removePinnedByMeta(meta) {
      if (!meta) return;
      let list = getPinnedList().filter(item => !(item.title === meta.title && item.url === meta.url));
      localStorage.setItem('unoPinnedApps', JSON.stringify(list));
      if (typeof window.updatePinnedNav === 'function') window.updatePinnedNav();
    }
    window.removePinnedByMeta = removePinnedByMeta;

    function updatePinnedNav() {
      const navInner = document.querySelector('.tabbar .inner');
      if (!navInner) return;
      navInner.querySelectorAll('button.tab[data-pinned]').forEach(btn => btn.remove());
      getPinnedList().forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'tab fx-trans fx-press ring';
        btn.setAttribute('data-pinned', 'true');
        btn.title = item.title;
        const letter = (item.title || '?').trim().charAt(0).toUpperCase();
        btn.innerHTML = '<span class="pin-letter">' + letter + '</span><span class="ripple"></span>';
        btn.onclick = () => { if (typeof window.openApp === 'function') window.openApp({ title: item.title, url: item.url }); };
        navInner.appendChild(btn);
      });
    }
    window.updatePinnedNav = updatePinnedNav;

    document.addEventListener('DOMContentLoaded', () => {
      try { window.__RESTORING_CHAT = true; restoreStackState(); updatePinnedNav(); } catch (e) { console.warn(e); }
    });
  })();

  // ---- Sounds ----
  (function () {
    const play = (id) => { const audio = document.getElementById(id); if (audio) { try { audio.currentTime = 0; audio.play(); } catch (_) {} } };
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (btn) play('sndClick');
      const navBtn = e.target.closest('nav .btn');
      if (navBtn) play('sndTab');
    });
    document.body.addEventListener('mouseenter', (e) => {
      const btn = e.target.closest('.btn');
      if (btn) play('sndHover');
    }, true);
    window.playOpenSound = () => play('sndOpen');
    window.playCloseSound = () => play('sndClose');
    window.playTechPopSound = () => play('sndTechPop');
  })();

  // ---- ChatPlus (chat store + enriched replies) ----
  (function () {
    const LS2 = {
      get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
      set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
      raw: (k) => localStorage.getItem(k) || ''
    };

    function sanitizeHTML(input) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(String(input || ''), 'text/html');
        ['script','style','link','iframe','object','embed','meta'].forEach(tag => doc.querySelectorAll(tag).forEach(n => n.remove()));
        const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
        const allowedProtocols = ['http:', 'https:', 'data:'];
        while (walker.nextNode()) {
          const el = walker.currentNode;
          [...el.attributes].forEach(a => { if (/^on/i.test(a.name) || a.name === 'style') el.removeAttribute(a.name); });
          if (el.tagName === 'A') {
            el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer');
            const href = el.getAttribute('href') || '';
            try { const u = new URL(href, location.href); if (!allowedProtocols.includes(u.protocol)) el.removeAttribute('href'); } catch (_) { el.removeAttribute('href'); }
          }
          if (el.tagName === 'IMG') {
            const src = el.getAttribute('src') || '';
            if (!/^https?:|^data:image\//i.test(src)) el.removeAttribute('src');
            else if (src.startsWith('data:') && src.length > 200000) el.setAttribute('src', '');
            el.setAttribute('loading', 'lazy'); el.setAttribute('decoding', 'async');
            el.style.maxWidth = '100%'; el.style.height = 'auto'; el.style.borderRadius = '8px';
          }
        }
        return doc.body.innerHTML;
      } catch (e) { return String(input || '').replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;'); }
    }

    const ChatStore = {
      key: 'uno:chat:v2', memKey: 'uno:chat:mem', maxPairs: 12, maxChars: 100000,
      load() { return LS2.get(this.key, []); },
      save(list) { LS2.set(this.key, list || []); },
      memory() { return LS2.get(this.memKey, ''); },
      setMemory(text) { LS2.set(this.memKey, String(text || '')); },
      append(role, content) { const list = this.load(); list.push({ role, content: String(content || ''), ts: Date.now() }); this.save(list); this.compact(); },
      clear() { LS2.set(this.key, []); LS2.set(this.memKey, ''); },
      compact() {
        try {
          let list = this.load();
          const textLen = list.map(x => x.content || '').join('\n').length;
          if (list.length > 120 || textLen > this.maxChars) {
            const keep = list.filter(m => m.role === 'user' || m.role === 'assistant');
            const cutoffIndex = Math.max(0, keep.length - (this.maxPairs * 2));
            const older = keep.slice(0, cutoffIndex); const newer = keep.slice(cutoffIndex);
            const summary = this.naiveSummarize(older); this.setMemory(summary);
            const rebuilt = [];
            if (summary) rebuilt.push({ role: 'system', content: 'Contexto resumido: ' + summary, ts: Date.now() });
            newer.forEach(m => rebuilt.push(m)); this.save(rebuilt);
          }
        } catch (_) {}
      },
      naiveSummarize(msgs) {
        if (!Array.isArray(msgs) || !msgs.length) return '';
        const lines = []; let count = 0;
        for (const m of msgs) {
          const role = m.role === 'assistant' ? 'IA' : (m.role === 'user' ? 'Você' : m.role);
          const t = String(m.content || '').replace(/\s+/g, ' ').trim();
          if (!t) continue;
          const first = t.split(/[.!?]/)[0];
          if (first) { lines.push('• ' + role + ': ' + first.slice(0, 160)); count += first.length; }
          if (count > 1200) break;
        }
        return lines.join('\n');
      },
      buildMessages(userContent) {
        const sys = { role: 'system', content: 'Você é um assistente em português. Estruture SEMPRE a resposta em 3 blocos, com estes títulos exatos: ### Recompensa Inicial ### Curiosidade & Expansão ### Antecipação Vibracional' };
        const memory = this.memory();
        const memMsg = memory ? { role: 'system', content: 'Contexto resumido (memória):\n' + memory } : null;
        const prev = this.load().filter(m => m.role === 'user' || m.role === 'assistant');
        const sliceStart = Math.max(0, prev.length - (this.maxPairs * 2));
        const context = prev.slice(sliceStart);
        const msgs = [sys];
        if (memMsg) msgs.push(memMsg);
        context.forEach(m => msgs.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }));
        msgs.push({ role: 'user', content: userContent });
        return msgs;
      }
    };
    window.ChatStore = ChatStore;

    function splitIntoBlocks(raw) {
      const t = String(raw || '');
      const re1 = /###\s*Recompensa\s*Inicial[\s\S]*?(?=###\s*Curiosidade\s*&\s*Expans[aã]o|$)/i;
      const re2 = /###\s*Curiosidade\s*&\s*Expans[aã]o[\s\S]*?(?=###\s*Antecip[aã]o\s*Vibracional|$)/i;
      const re3 = /###\s*Antecip[aã]o\s*Vibracional[\s\S]*/i;
      const b1 = (t.match(re1) || [''])[0].replace(/###.*?\n?/, '').trim();
      const b2 = (t.match(re2) || [''])[0].replace(/###.*?\n?/, '').trim();
      const b3 = (t.match(re3) || [''])[0].replace(/###.*?\n?/, '').trim();
      if (b1 || b2 || b3) return { reward: b1, curious: b2, vibe: b3 };
      const parts = t.split(/\n\n+/); const n = parts.length;
      return { reward: parts.slice(0, Math.max(1, Math.ceil(n * 0.3))).join('\n\n'), curious: parts.slice(Math.max(1, Math.ceil(n * 0.3)), Math.max(2, Math.ceil(n * 0.7))).join('\n\n'), vibe: parts.slice(Math.max(2, Math.ceil(n * 0.7))).join('\n\n') };
    }

    function paraToHTML(s) {
      const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return esc.split(/\n{2,}/).map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('');
    }

    function createBlockEl(title, content) {
      const details = document.createElement('details');
      details.className = 'ai-block';
      const summary = document.createElement('summary');
      summary.innerHTML = title;
      const body = document.createElement('div');
      body.className = 'block-body';
      const fenced = (/```html\s*([\s\S]*?)\s*```/i.exec(content || '') || [null, null])[1];
      if (fenced) { body.innerHTML = '<div class="render-html">' + sanitizeHTML(fenced) + '</div>'; }
      else if (/<[a-z][\s\S]*>/i.test(content || '')) { body.innerHTML = '<div class="render-html">' + sanitizeHTML(content) + '</div>'; }
      else { body.innerHTML = paraToHTML(content || ''); }
      details.appendChild(summary); details.appendChild(body);
      return details;
    }

    function renderAssistantReply(raw) {
      const feed = document.getElementById('chatFeed');
      if (!feed) return;
      const { reward, curious, vibe } = splitIntoBlocks(raw || '');
      const wrap = document.createElement('div');
      wrap.className = 'msg ai ai-rich';
      const b1 = createBlockEl('1) <strong>Recompensa Inicial</strong> ⚡', reward || '');
      const b2 = createBlockEl('2) <strong>Curiosidade &amp; Expansão</strong> 🔎', curious || '');
      const b3 = createBlockEl('3) <strong>Antecipação Vibracional</strong> ✨', vibe || '');
      b1.open = true; wrap.appendChild(b1); wrap.appendChild(b2); wrap.appendChild(b3);
      const ems = (raw || '').match(/([\p{Extended_Pictographic}☀-➿])/gu) || [];
      const uniq = Array.from(new Set(ems)).slice(0, 8);
      if (uniq.length) {
        const sug = document.createElement('div'); sug.className = 'emoji-suggestions';
        uniq.forEach(e => { const btn = document.createElement('button'); btn.className = 'emoji-btn'; btn.textContent = e; btn.setAttribute('data-emoji', e); sug.appendChild(btn); });
        wrap.appendChild(sug);
      }
      feed.appendChild(wrap); feed.scrollTop = feed.scrollHeight;
      try {
        const txt = (reward || '').replace(/<[^>]*>/g, '').replace(/```[\s\S]*?```/g, '').trim();
        if (typeof window.updatePreview === 'function') window.updatePreview(txt || (raw || '').slice(0, 180));
        if (typeof window.speakWithActiveArch === 'function' && txt) window.speakWithActiveArch(txt);
      } catch (_) {}
      try { if (!window.__RESTORING_CHAT) ChatStore.append('assistant', raw || ''); } catch (_) {}
    }
    window.renderAssistantReply = renderAssistantReply;

    async function sendUserMessage(msg) {
      const text = String(msg || '').trim();
      if (!text) return;
      if (typeof window.feedPush === 'function') window.feedPush('user', 'Você: ' + text);
      try {
        if (typeof window.showArchMessage === 'function') window.showArchMessage('Pulso enviado. Recebendo intenção…', 'ok');
        if (typeof window.speakWithActiveArch === 'function') {
          window.speakWithActiveArch('Pulso enviado');
          setTimeout(() => window.speakWithActiveArch('Recebendo intenção'), 380);
        }
      } catch (_) {}
      if (typeof window.feedPush === 'function') window.feedPush('status', '⚡ Pulso enviado · recebendo intenção…');
      try { ChatStore.append('user', text); } catch (_) {}
      const userName = (localStorage.getItem('dual.name') || localStorage.getItem('infodose:userName') || '').trim();
      const sk = (localStorage.getItem('dual.keys.openrouter') || localStorage.getItem('infodose:sk') || '').trim();
      let model = (LS2.get('dual.openrouter.model')) || (localStorage.getItem('infodose:model') || '').trim() || 'openrouter/auto';
      try {
        const messages = ChatStore.buildMessages(text);
        const url = 'https://openrouter.ai/api/v1/chat/completions';
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sk }, body: JSON.stringify({ model, messages, max_tokens: 600, temperature: 0.7 }) });
        if (!res.ok) throw new Error('Erro na API: ' + res.status);
        const data = await res.json();
        const reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (reply) renderAssistantReply(reply);
      } catch (err) {
        console.error(err);
        if (typeof window.feedPush === 'function') window.feedPush('status', '❌ Erro ao obter resposta.');
      }
    }
    window.sendUserMessage = sendUserMessage;

    // Restore chat on load
    document.addEventListener('DOMContentLoaded', () => {
      try {
        window.__RESTORING_CHAT = true;
        const list = ChatStore.load();
        if (!list || !list.length) return;
        const feed = document.getElementById('chatFeed');
        if (!feed) return;
        list.forEach(m => {
          if (m.role === 'assistant') { renderAssistantReply(m.content); }
          else if (m.role === 'user') { const div = document.createElement('div'); div.className = 'msg user'; div.textContent = 'Você: ' + (m.content || ''); feed.appendChild(div); }
        });
        feed.scrollTop = feed.scrollHeight;
        window.__RESTORING_CHAT = false;
      } catch (e) { console.warn('Restore chat failed', e); window.__RESTORING_CHAT = false; }
    });

    document.addEventListener('DOMContentLoaded', () => {
      const hiForm = document.getElementById('homeInputForm');
      const hiInput = document.getElementById('homeInput');
      if (hiForm && hiInput) {
        hiForm.addEventListener('submit', (ev) => {
          ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
          const msg = (hiInput.value || '').trim();
          if (msg) window.sendUserMessage(msg);
          hiInput.value = ''; return false;
        }, true);
      }
    });
  })();

  // ---- DualLS panel (presets, wallet, LS viewer) ----
  (function () {
    const DISABLED_KEY = 'infodose:presets.disabled';
    const PRESETS = [
      { key: 'infodose:userName', label: 'Usuário' },
      { key: 'infodose:assistantName', label: 'Assistente' },
      { key: 'dual.keys.openrouter', label: 'Chave OpenRouter (ativa)' },
      { key: 'dual.openrouter.model', label: 'Modelo OpenRouter' },
      { key: 'uno:theme', label: 'Tema' },
      { key: 'uno:bg', label: 'Fundo Custom' },
      { key: 'infodose:cssCustom', label: 'CSS Custom' },
      { key: 'infodose:voices', label: 'Vozes Arquetípicas' }
    ];

    const disabledSet = () => { try { return new Set(JSON.parse(localStorage.getItem(DISABLED_KEY) || '[]')); } catch (_) { return new Set(); } };
    const saveDisabled = (set) => localStorage.setItem(DISABLED_KEY, JSON.stringify(Array.from(set)));
    const isEnabled = (k) => !disabledSet().has(k);
    const toggleDisabled = (k) => { const s = disabledSet(); s.has(k) ? s.delete(k) : s.add(k); saveDisabled(s); renderAll(); window.dispatchEvent(new CustomEvent('ls:disabled-changed', { detail: { key: k, disabled: s.has(k) } })); };

    const WALLET_KEY = 'dual.keys.wallet';
    const getWallet = () => { try { return JSON.parse(localStorage.getItem(WALLET_KEY) || '[]'); } catch (_) { return []; } };
    const setWallet = (arr) => localStorage.setItem(WALLET_KEY, JSON.stringify(arr));
    const renderWallet = () => {
      const grid = $('#skGrid'); if (!grid) return; grid.innerHTML = '';
      const list = getWallet();
      if (!list.length) { grid.innerHTML = '<div class="meta">Nenhuma chave na carteira ainda.</div>'; return; }
      list.forEach(item => {
        const div = document.createElement('div'); div.className = 'sk-item';
        const top = document.createElement('div'); top.className = 'top';
        const name = document.createElement('div'); name.className = 'name'; name.textContent = item.name + (item.active ? ' • ATIVA' : '');
        const act = document.createElement('div');
        const bUse = document.createElement('button'); bUse.textContent = item.active ? 'Desativar' : 'Ativar';
        bUse.onclick = () => {
          if (item.active) {
            const list2 = getWallet().map(x => ({ ...x, active: x.id === item.id ? false : x.active })); setWallet(list2);
            if (!getWallet().some(x => x.active)) localStorage.setItem('dual.keys.openrouter', '');
            renderWallet(); renderAll();
          } else {
            const list2 = getWallet().map(x => ({ ...x, active: x.id === item.id })); setWallet(list2);
            if (isEnabled('dual.keys.openrouter')) { const chosen = list2.find(x => x.active); localStorage.setItem('dual.keys.openrouter', chosen ? chosen.key : ''); }
            renderAll();
          }
        };
        const bDel = document.createElement('button'); bDel.textContent = 'Apagar';
        bDel.onclick = () => { if (confirm('Apagar entrada da carteira?')) { setWallet(getWallet().filter(x => x.id !== item.id)); renderWallet(); } };
        act.append(bUse, bDel); top.append(name, act);
        const key = document.createElement('div'); key.className = 'key'; key.textContent = item.key;
        div.append(top, key); grid.append(div);
      });
    };

    const isJson = (v) => { try { JSON.parse(v); return true; } catch (_) { return false; } };
    const inferType = (v) => {
      if (v == null || v === '') return 'empty';
      if (isJson(v)) { const p = JSON.parse(v); if (Array.isArray(p)) return 'json[array]'; if (p && typeof p === 'object') return 'json[object]'; return 'json[' + (typeof p) + ']'; }
      if (/^data:image\//i.test(v) || /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(v)) return 'image';
      if (/^(true|false|1|0)$/i.test(v)) return 'boolean-like';
      if (/^https?:\/\//i.test(v)) return 'url';
      if (/^data:/i.test(v)) return 'data-url';
      return 'string';
    };
    const prettyBytes = (n) => { if (!Number.isFinite(n) || n <= 0) return '0 B'; const u = ['B','KB','MB','GB']; let i = 0; while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; } return n.toFixed(2) + ' ' + u[i]; };
    const lsEntries = () => { const out = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); const v = localStorage.getItem(k) || ''; out.push({ key: k, val: v }); } return out.sort((a, b) => a.key.localeCompare(b.key)); };
    const lsSizeBytes = () => { let sum = 0; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); const v = localStorage.getItem(k) || ''; sum += k.length + v.length; } return sum; };

    const renderPresets = () => {
      const grid = $('#presetsGrid'); if (!grid) return; grid.innerHTML = '';
      const dis = disabledSet();
      PRESETS.forEach(p => {
        const val = localStorage.getItem(p.key); const on = !dis.has(p.key);
        const wrap = document.createElement('div'); wrap.className = 'preset';
        const head = document.createElement('div'); head.className = 'row';
        const name = document.createElement('div'); name.innerHTML = '<strong>' + p.label + '</strong><div class="type">' + p.key + '</div>';
        const sw = document.createElement('div'); sw.className = 'switch' + (on ? ' on' : ''); sw.title = on ? 'Desativar (não apaga)' : 'Ativar'; sw.onclick = () => toggleDisabled(p.key);
        head.append(name, sw);
        const meta = document.createElement('div'); meta.className = 'val';
        meta.textContent = val ? (inferType(val).startsWith('json') ? JSON.stringify(JSON.parse(val), null, 2) : val) : '—';
        wrap.append(head, meta); grid.append(wrap);
      });
    };

    const renderLS = () => {
      const list = $('#lsList'); if (!list) return; list.innerHTML = '';
      const imgGrid = $('#imgGrid'); if (imgGrid) imgGrid.innerHTML = '';
      const entries = lsEntries();
      const count = $('#lsCount'); if (count) count.textContent = entries.length + ' chave(s)';
      const size = $('#lsSize'); if (size) size.textContent = prettyBytes(lsSizeBytes());
      const dis = disabledSet();
      entries.forEach(({ key, val }) => {
        if (key === DISABLED_KEY) return;
        const it = document.createElement('div'); it.className = 'item';
        const head = document.createElement('div'); head.className = 'head';
        const left = document.createElement('div');
        left.innerHTML = '<div class="key">' + key + (dis.has(key) ? ' <span class="type">(desativado)</span>' : '') + '</div><div class="type">' + inferType(val) + ' • ' + prettyBytes((val || '').length) + '</div>';
        const ctr = document.createElement('div'); ctr.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
        const sw = document.createElement('div'); sw.className = 'switch' + (!dis.has(key) ? ' on' : ''); sw.title = (!dis.has(key) ? 'Desativar' : 'Ativar'); sw.onclick = () => toggleDisabled(key);
        const bEdit = document.createElement('button'); bEdit.textContent = 'Editar'; bEdit.onclick = () => { const next = prompt('Editar valor de\n' + key, val ?? ''); if (next == null) return; localStorage.setItem(key, String(next)); renderAll(); };
        const bDel = document.createElement('button'); bDel.textContent = 'Apagar'; bDel.onclick = () => { if (confirm('Apagar ' + key + '?')) { localStorage.removeItem(key); renderAll(); } };
        if (inferType(val) === 'image') {
          const bImg = document.createElement('button'); bImg.textContent = 'Ver imagem'; bImg.onclick = () => {
            const g = $('#imgGrid'); if (!g) return;
            const card = document.createElement('div'); card.className = 'img-card';
            const cap = document.createElement('div'); cap.className = 'meta'; cap.textContent = key;
            const im = new Image(); im.src = val; im.loading = 'lazy';
            card.append(cap, im); g.append(card);
          }; ctr.append(bImg);
        }
        ctr.append(sw, bEdit, bDel); head.append(left, ctr);
        const v = document.createElement('div'); v.className = 'val'; v.textContent = inferType(val).startsWith('json') ? JSON.stringify(JSON.parse(val), null, 2) : (val ?? '—');
        it.append(head, v); list.append(it);
      });
    };

    const renderAll = () => { renderPresets(); renderLS(); };
    const openLS = () => { const m = $('#lsModal'); if (!m) return; m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); renderAll(); renderWallet(); };
    const closeLS = () => { const m = $('#lsModal'); if (!m) return; m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); };

    const ready = () => {
      const btn = document.getElementById('btnLS');
      if (btn && !btn.dataset._lsUnified) {
        const c = btn.cloneNode(true);
        c.removeAttribute('onclick'); c.removeAttribute('href'); c.dataset._lsUnified = '1';
        c.addEventListener('click', (ev) => {
          ev.preventDefault(); ev.stopPropagation();
          try { document.querySelectorAll('.modal,[role="dialog"],[class*="modal"]').forEach(el => { if (el.id !== 'lsModal') { el.style.display = 'none'; el.classList.remove('open', 'show', 'visible'); el.setAttribute('aria-hidden', 'true'); } }); } catch (_) {}
          openLS();
        }, { passive: false });
        btn.parentNode.replaceChild(c, btn);
      }
      const lsClose = $('#lsClose'); if (lsClose) lsClose.onclick = closeLS;
      const lsRescan = $('#lsRescan'); if (lsRescan) lsRescan.onclick = renderAll;
      const lsExport = $('#lsExport');
      if (lsExport) lsExport.onclick = () => {
        const dump = {};
        for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k === DISABLED_KEY) continue; dump[k] = localStorage.getItem(k); }
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'localstorage_export.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 2000);
      };
      const lsImportFile = $('#lsImportFile');
      if (lsImportFile) lsImportFile.addEventListener('change', ev => {
        const f = ev.target.files && ev.target.files[0]; if (!f) return;
        const r = new FileReader(); r.onload = () => { try { const data = JSON.parse(r.result || '{}'); Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, String(v))); alert('Importado com sucesso.'); renderAll(); } catch (_) { alert('JSON inválido.'); } }; r.readAsText(f);
        ev.target.value = '';
      });
      const lsClearDisabled = $('#lsClearDisabled'); if (lsClearDisabled) lsClearDisabled.onclick = () => { localStorage.setItem(DISABLED_KEY, '[]'); renderAll(); };
      const modal = $('#lsModal'); if (modal) modal.addEventListener('click', (evt) => { if (evt.target === modal) closeLS(); });
      const skAdd = $('#skAdd');
      if (skAdd) skAdd.onclick = () => {
        const name = ($('#skName') ? $('#skName').value : '').trim();
        const key = ($('#skValue') ? $('#skValue').value : '').trim();
        if (!name || !key) return alert('Informe nome e chave.');
        const list = getWallet(); const genId = (crypto && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
        list.push({ id: genId, name, key, active: false }); setWallet(list); renderWallet();
        if ($('#skName')) $('#skName').value = ''; if ($('#skValue')) $('#skValue').value = '';
      };
      const lsRefresh = $('#lsRefresh'); if (lsRefresh) lsRefresh.onclick = () => { try { location.reload(); } catch (_) {} };
    };

    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', ready); } else { ready(); }
    window.DualLS = { open: openLS, close: closeLS, render: renderAll };
  })();

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.LS = { HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-ls', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.LS }));
})();
