// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · CHAT-AI · 0x02 · INTEGRAR · 528Hz · NOVA · ―
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_CHAT_AI() {
  'use strict';
  const OPCODE = '0x02';
  const HZ = 528;
  const GEO = 'LINHA';
  const ARQUETIPO = 'NOVA';
  const EVENTO = 'kobllux:dual:chatai:carregado';

  // ---- Chat 13 Pipeline ----
  (function () {
    const CHAT_BACKEND = 'openrouter';
    const OPENROUTER_CONF = {
      model: (localStorage.getItem('dual.openrouter.model') || 'openai/gpt-4o-mini'),
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      get key() { return localStorage.getItem('dual.keys.openrouter') || ''; }
    };

    const BLOCKS = [
      ['Sinal','Contextualize a intenção do usuário em 1 frase objetiva.'],
      ['Mapa','Liste 3-5 pontos-chave do problema.'],
      ['Hipóteses','Traga 3 hipóteses testáveis.'],
      ['Dados','Quais dados mínimos precisamos coletar?'],
      ['Ações 10min','Aplique uma micro-ação que cabe em 10 minutos.'],
      ['Riscos','Alerte sobre 2 riscos ou armadilhas.'],
      ['Recursos','Sugira 3 recursos (apps, docs, pessoas).'],
      ['Sequência','Desenhe a ordem ótima em 4 passos.'],
      ['Expansão','Mostre 2 variações criativas do caminho.'],
      ['Métrica','Defina 1 métrica simples de sucesso.'],
      ['Checkpoint','O que revisar em 24h?'],
      ['Compromisso','Gere 1 compromisso curto e claro.'],
      ['Fecho','Feche com 1 frase que mantenha o pulso.']
    ];

    function sanitize(md) {
      const esc = (s) => s.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
      md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`([^`]+?)`/g, '<code>$1</code>').replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      return md.split('\n').map(ln => '<p>' + esc(ln) + '</p>').join('');
    }

    const feed = document.getElementById('chatFeed');

    function push(role, title, html) {
      if (!feed) return;
      const el = document.createElement('div');
      el.className = 'msg role-' + role;
      el.innerHTML = (title ? '<h5>' + title + '</h5>' : '') + (html || '');
      feed.appendChild(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function pushBlock(title) {
      if (!feed) return null;
      const el = document.createElement('div');
      el.className = 'msg role-assistant';
      el.innerHTML = '<h5>' + title + '</h5><div class="mut">…</div>';
      feed.appendChild(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return el;
    }

    async function callOpenRouter(messages) {
      if (!OPENROUTER_CONF.key) throw new Error('Chave OpenRouter ausente (defina em localStorage: dual.keys.openrouter)');
      const body = { model: OPENROUTER_CONF.model, messages, temperature: 0.7 };
      const r = await fetch(OPENROUTER_CONF.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENROUTER_CONF.key, 'HTTP-Referer': location.origin, 'X-Title': 'HUB UNO Chat13' },
        body: JSON.stringify(body)
      });
      if (!r.ok) throw new Error('OpenRouter HTTP ' + r.status);
      const j = await r.json();
      return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
    }

    async function chat13Pipeline(userText) {
      const baseSystem = 'Você é o Chat13 do HUB UNO. Responda de forma breve, clara e aplicável para cada bloco.';
      const baseMsgs = [{ role: 'system', content: baseSystem }, { role: 'user', content: userText }];
      for (const [title, instr] of BLOCKS) {
        const dom = pushBlock(title);
        try {
          const content = await callOpenRouter([
            ...baseMsgs,
            { role: 'user', content: 'Bloco: ' + title + '. Instrução: ' + instr + '.\nFormate com frases curtas, listas quando fizer sentido, e sem rodeios.' }
          ]);
          if (dom) dom.innerHTML = '<h5>' + title + '</h5>' + sanitize(content);
        } catch (e) {
          if (dom) dom.innerHTML = '<h5>' + title + '</h5><p class="mut">[erro: ' + e.message + ']</p>';
        }
      }
    }

    const input = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    if (chatSend && input) {
      chatSend.addEventListener('click', async () => {
        const text = (input.value || '').trim();
        if (!text) return;
        push('user', 'Você', sanitize(text));
        input.value = ''; input.focus();
        try { await chat13Pipeline(text); }
        catch (e) { push('assistant', 'Erro', '<p class="mut">' + e.message + '</p>'); }
      });

      input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatSend.click(); } });

      const pulse = document.getElementById('chatPulse');
      if (pulse) {
        input.addEventListener('focus', () => pulse.style.setProperty('animation-duration', '1.6s'));
        input.addEventListener('blur', () => pulse.style.setProperty('animation-duration', '2.8s'));
      }

      push('assistant', 'Pronto', '<p>Chat 13-Blocos iniciado. Escreva sua intenção e aperte <strong>Enviar</strong>.</p>');
    }
  })();

  // ---- ArchOrb (SVG archetype orb) ----
  (function () {
    const ARCHES = [
      { id: 'atlas', label: 'Atlas' }, { id: 'nova', label: 'Nova' }, { id: 'vitalis', label: 'Vitalis' }, { id: 'pulse', label: 'Pulse' },
      { id: 'artemis', label: 'Artemis' }, { id: 'serena', label: 'Serena' }, { id: 'kaos', label: 'Kaos' }, { id: 'genus', label: 'Genus' },
      { id: 'lumine', label: 'Lumine' }, { id: 'solus', label: 'Solus' }, { id: 'aion', label: 'Aion' }, { id: 'rhea', label: 'Rhea' }
    ];
    const $orb = document.getElementById('arch-orb');
    const $use = document.getElementById('arch-icon');
    let idx = 0;

    function setArch(key) {
      const i = typeof key === 'number'
        ? ((key % ARCHES.length) + ARCHES.length) % ARCHES.length
        : ARCHES.findIndex(a => a.id === String(key).toLowerCase());
      if (i < 0) return;
      idx = i;
      if ($use) $use.setAttribute('href', '#icon-' + ARCHES[i].id);
      try { document.documentElement.style.setProperty('--arch-overlay', 'rgba(64,158,255,.22)'); } catch (_) {}
    }

    window.ArchOrb = { set: setArch, get: () => ARCHES[idx], svg: () => $orb ? new XMLSerializer().serializeToString($orb) : '' };
    const hash = location.hash.replace('#', '').trim();
    if (hash) setArch(hash);
  })();

  // ---- Dedup style/script tags + Service Worker ----
  (function () {
    try {
      const ORDER = ['blue1Theme','customStyle','multiagent-styles','patch-blue1-theme','overlay-defaults','ls-panel-css','show-app-title-css','overlay-css-unify','overlay-guardian-css','orb-slot-css','hdpro-override','ATOM_UI_PATCH','OVERLAY_BG_ONLY','ARCH_FAB_ROUND_FIX'];
      ['style','script'].forEach(tag => {
        const els = Array.from(document.querySelectorAll(tag + '[id]'));
        for (let i = 0; i < els.length; i++) {
          const id = els[i].id;
          const dups = els.filter(e => e.id === id);
          if (dups.length > 1) dups.slice(0, -1).forEach(x => x.parentNode && x.parentNode.removeChild(x));
        }
      });
      const head = document.head || document.querySelector('head');
      if (head) { ORDER.forEach(id => { const el = document.getElementById(id); if (el) head.appendChild(el); }); }
    } catch (_) {}

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
          try { reg.update(); } catch (_) {}
          let refreshing = false;
          navigator.serviceWorker.addEventListener('controllerchange', function () { if (refreshing) return; refreshing = true; location.reload(); });
          if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          reg.addEventListener('updatefound', () => {
            const nw = reg.installing;
            nw && nw.addEventListener('statechange', () => {
              if (nw.state === 'installed' && navigator.serviceWorker.controller) nw.postMessage({ type: 'SKIP_WAITING' });
            });
          });
          navigator.serviceWorker.addEventListener('message', evt => { if (evt && evt.data && evt.data.type === 'RELOAD') location.reload(); });
        } catch (_) {}
      });
    }
  })();

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.CHATAI = { HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-chat-ai', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.CHATAI }));
})();
