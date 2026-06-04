// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · STACK · 0x05 · CONVERGIR · 672Hz · KODUX · ⧉
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_STACK() {
  'use strict';
  const OPCODE = '0x05';
  const HZ = 672;
  const GEO = 'CUBO';
  const ARQUETIPO = 'KODUX';
  const EVENTO = 'kobllux:dual:stack:carregado';

  const stackWrap = document.getElementById('stackWrap');
  const dock = document.getElementById('dock');

  function badge(item) {
    const b = document.createElement('button');
    b.className = 'badge fx-trans fx-press ring';
    b.textContent = item.title || 'App';
    b.title = 'Reabrir ' + (item.title || 'App');
    const rp = document.createElement('span'); rp.className = 'ripple'; b.appendChild(rp);
    if (typeof window.addRipple === 'function') window.addRipple(b);
    b.onclick = () => {
      const s = document.querySelector('[data-sid="' + item.sid + '"]');
      if (s) { s.scrollIntoView({ behavior: 'smooth' }); s.classList.remove('min'); }
    };
    return b;
  }

  function updateDock() {
    if (!dock) return;
    dock.innerHTML = '';
    document.querySelectorAll('.session').forEach(s => {
      dock.appendChild(badge({ title: '', sid: s.dataset.sid }));
    });
    try { if (typeof window.updateHomeStatus === 'function') window.updateHomeStatus(); } catch (_) {}
  }

  function openApp(a) {
    if (!stackWrap) return;
    const sid = a.sid || ('s_' + Math.random().toString(36).slice(2));
    const isLocal = String(a.url || '').startsWith('local:');
    const lr = isLocal ? (typeof window.getLocal === 'function' ? window.getLocal(String(a.url).slice(6)) : null) : null;
    const url = lr ? (typeof window.blobURL === 'function' ? window.blobURL(lr) : '') : a.url;
    const card = document.createElement('div');
    card.className = 'session fx-trans fx-lift';
    card.dataset.sid = sid;
    card.dataset.meta = JSON.stringify({ title: a.title || 'App', url: a.url || '' });
    if (!a.gid && a.title && a.title.includes('·')) {
      const parts = a.title.split('·');
      const gName = (parts[1] || '').trim();
      if (gName) a.gid = 'g_' + gName.toLowerCase().replace(/\s+/g, '_');
    }
    if (a.gid) card.dataset.gid = a.gid;
    card.innerHTML = `
      <div class="hdr">
        <div class="title"><span class="app-icon">${((a.title || 'App')[0] || 'A')}</span>${(a.title || 'App')}</div>
        <div class="tools">
          <button class="btn ring fx-trans fx-press" data-act="min" title="Minimizar"><span style="font-size:16px;line-height:1">&minus;</span><span class="ripple"></span></button>
          <button class="btn ring fx-trans fx-press" data-act="ref" title="Recarregar"><span style="font-size:16px;line-height:1">&#8635;</span><span class="ripple"></span></button>
          <button class="btn ring fx-trans fx-press" data-act="full" title="Tela cheia"><span style="font-size:16px;line-height:1">⤢</span><span class="ripple"></span></button>
          <button class="btn ring fx-trans fx-press" data-act="pin" title="Fixar na barra"><span class="pin-icon" style="font-size:16px;line-height:1">☆</span><span class="ripple"></span></button>
          <button class="btn ring fx-trans fx-press" data-act="move" title="Mover sessão"><span style="font-size:16px;line-height:1">⇄</span><span class="ripple"></span></button>
          <button class="btn ring fx-trans fx-press" data-act="close" title="Fechar"><span style="font-size:16px;line-height:1">&times;</span><span class="ripple"></span></button>
        </div>
      </div>
      <iframe src="${url || 'about:blank'}" allow="autoplay; clipboard-read; clipboard-write; picture-in-picture; fullscreen"></iframe>
      <div class="resize-handle" title="Arraste para ajustar a altura"></div>`;

    // Resize handle
    (function bindResize() {
      const handle = card.querySelector('.resize-handle');
      const iframe = card.querySelector('iframe');
      if (!handle || !iframe) return;
      let startY = 0, startH = 0, dragging = false;
      handle.addEventListener('pointerdown', (ev) => { dragging = true; startY = ev.clientY; startH = iframe.clientHeight; handle.setPointerCapture(ev.pointerId); });
      handle.addEventListener('pointermove', (ev) => { if (!dragging) return; iframe.style.height = Math.max(120, startH + (ev.clientY - startY)) + 'px'; });
      const stop = () => { dragging = false; };
      handle.addEventListener('pointerup', stop);
      handle.addEventListener('pointercancel', stop);
    })();

    // Place in stack
    const anchor = document.getElementById('sessionsAnchor');
    const openInside = document.getElementById('openInside');
    if (openInside && openInside.checked && anchor) {
      anchor.prepend(card);
    } else {
      const gid = window.currentGroupId || a.gid;
      let placed = false;
      if (gid) {
        const grp = stackWrap.querySelector('.stack-group[data-group-id="' + gid + '"] .group-content');
        if (grp) { grp.prepend(card); card.dataset.gid = gid; placed = true; }
      }
      if (!placed) { stackWrap.prepend(card); delete card.dataset.gid; }
    }

    // Button actions
    card.querySelector('[data-act=min]').onclick = () => {
      card.classList.toggle('min'); updateDock();
      if (typeof window.saveStackState === 'function') window.saveStackState();
      if (typeof window.dualLog === 'function') window.dualLog('Sessão minimizada: ' + (a.title || 'App'));
    };
    card.querySelector('[data-act=ref]').onclick = () => {
      const fr = card.querySelector('iframe');
      try { fr.contentWindow.location.reload(); } catch (_) { fr.src = fr.src; }
    };
    card.querySelector('[data-act=close]').onclick = () => {
      if (card.classList.contains('pinned')) {
        const meta = JSON.parse(card.dataset.meta || '{}');
        if (typeof window.removePinnedByMeta === 'function') window.removePinnedByMeta(meta);
      }
      card.remove(); updateDock();
      if (typeof window.saveStackState === 'function') window.saveStackState();
      if (typeof window.dualLog === 'function') window.dualLog('Sessão fechada: ' + (a.title || 'App'));
      try { if (typeof window.playCloseSound === 'function') window.playCloseSound(); } catch (_) {}
    };
    const fullBtn = card.querySelector('[data-act=full]');
    if (fullBtn) fullBtn.onclick = () => { card.classList.toggle('full'); document.body.classList.toggle('session-full'); };

    // Pin
    const pinBtn = card.querySelector('[data-act=pin]');
    if (pinBtn) {
      if (a.pinned) { card.classList.add('pinned'); pinBtn.querySelector('.pin-icon').textContent = '★'; }
      pinBtn.onclick = () => {
        const meta = JSON.parse(card.dataset.meta || '{}');
        if (card.classList.contains('pinned')) {
          card.classList.remove('pinned'); pinBtn.querySelector('.pin-icon').textContent = '☆';
          if (typeof window.removePinnedByMeta === 'function') window.removePinnedByMeta(meta);
        } else {
          card.classList.add('pinned'); pinBtn.querySelector('.pin-icon').textContent = '★';
          if (typeof window.addPinned === 'function') window.addPinned(meta);
        }
      };
    }

    // Move
    const moveBtn = card.querySelector('[data-act=move]');
    if (moveBtn) {
      moveBtn.onclick = () => {
        const groups = Array.from(document.querySelectorAll('#stackWrap .stack-group'));
        if (!groups.length) { delete card.dataset.gid; stackWrap.prepend(card); if (typeof window.saveStackState === 'function') window.saveStackState(); return; }
        const names = groups.map(g => g.querySelector('summary') ? g.querySelector('summary').textContent : '').filter(n => n);
        const choices = names.map((n, i) => (i + 1) + '. ' + n).join('\n');
        const ans = prompt('Mover para qual grupo?\n' + choices + '\n0. Sem grupo');
        if (ans === null) return;
        const idx = parseInt(ans.trim(), 10);
        if (!isNaN(idx) && idx >= 1 && idx <= groups.length) {
          const content = groups[idx - 1].querySelector('.group-content');
          if (content) { content.prepend(card); card.dataset.gid = groups[idx - 1].getAttribute('data-group-id') || ''; updateDock(); if (typeof window.saveStackState === 'function') window.saveStackState(); return; }
        }
        delete card.dataset.gid; stackWrap.prepend(card); updateDock();
        if (typeof window.saveStackState === 'function') window.saveStackState();
      };
    }

    updateDock();
    if (typeof window.saveStackState === 'function') window.saveStackState();
    if (typeof window.dualLog === 'function') window.dualLog('Sessão aberta: ' + (a.title || 'App'));
    try { if (typeof window.playOpenSound === 'function') window.playOpenSound(); } catch (_) {}
  }

  // Close all
  const btnCloseAll = document.getElementById('btnCloseAll');
  if (btnCloseAll) {
    btnCloseAll.onclick = () => {
      if (!confirm('Fechar todas as sessões abertas?')) return;
      document.querySelectorAll('.session').forEach(s => s.remove());
      updateDock();
      try { if (typeof window.saveStackState === 'function') window.saveStackState(); } catch (_) {}
      if (typeof window.toast === 'function') window.toast('Todas as sessões fechadas', 'warn');
    };
  }

  window.badge = badge;
  window.updateDock = updateDock;
  window.openApp = window.openApp || openApp;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.STACK = { badge, updateDock, openApp, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-stack', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.STACK }));
})();
