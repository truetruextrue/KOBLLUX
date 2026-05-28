/* ════════════════════════════════════════════════════════════
   0x03 EXPANDIR · 639Hz · ▢ · TETRAEDRO
   Iframe interno, containers, playlist management
   layer: mente | fonte: index.html SymbolBar section
════════════════════════════════════════════════════════════ */

(function KOBLLUX_EXPANDIR() {
  'use strict';

  /* ── INTERNAL FRAME LOADER ───────────────────────────── */
  function loadInternalFrame(url) {
    const frame    = document.getElementById('kob-bg-frame');
    const veil     = document.getElementById('kob-frame-veil');
    const closeBtn = document.getElementById('kob-frame-close');
    if (!frame) return;
    frame.src = url;
    frame.classList.add('visible');
    veil?.classList.add('visible');
    closeBtn?.classList.add('visible');
    toast('⊙ CARREGANDO: ' + url.split('/').pop());
  }

  function closeInternalFrame() {
    const frame    = document.getElementById('kob-bg-frame');
    const veil     = document.getElementById('kob-frame-veil');
    const closeBtn = document.getElementById('kob-frame-close');
    frame?.classList.remove('visible');
    veil?.classList.remove('visible');
    closeBtn?.classList.remove('visible');
    setTimeout(() => { if (frame) frame.src = 'about:blank'; }, 500);
  }

  /* ── TOAST ───────────────────────────────────────────── */
  function toast(msg, ms = 2200) {
    const el = document.getElementById('kblx-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), ms);
  }

  /* ── PLAYLIST MANAGER (Kodux Widget) ─────────────────── */
  const playlists = JSON.parse(localStorage.getItem('kobllux_playlists') || '{"Principais":[]}');
  let activePlaylist = Object.keys(playlists)[0] || 'Principais';

  function savePlaylists() {
    localStorage.setItem('kobllux_playlists', JSON.stringify(playlists));
  }

  function createPlaylist() {
    const inp = document.getElementById('new-playlist-input');
    if (!inp) return;
    const name = inp.value.trim();
    if (!name || playlists[name]) return;
    playlists[name] = [];
    inp.value = '';
    savePlaylists();
    renderPlaylistTabs();
    renderPlaylist();
  }

  function addLink() {
    const inp  = document.getElementById('link-input');
    const dest = document.getElementById('destination-select');
    if (!inp) return;
    const url = inp.value.trim();
    if (!url) return;
    const target = dest?.value === 'all' ? activePlaylist : (dest?.value || activePlaylist);
    if (!playlists[target]) playlists[target] = [];
    playlists[target].push({ url, title: url.split('/').pop() || url, added: Date.now() });
    inp.value = '';
    savePlaylists();
    renderPlaylist();
    toast('⊙ LINK ADICIONADO');
  }

  function renderPlaylistTabs() {
    const tabs = document.getElementById('playlist-tabs');
    const dest = document.getElementById('destination-select');
    if (!tabs) return;
    tabs.innerHTML = '';
    if (dest) dest.innerHTML = '<option value="all">Todas</option>';
    Object.keys(playlists).forEach(name => {
      const tab = document.createElement('button');
      tab.className = 'playlist-tab' + (name === activePlaylist ? ' active' : '');
      tab.textContent = name;
      tab.addEventListener('click', () => { activePlaylist = name; renderPlaylistTabs(); renderPlaylist(); });
      tabs.appendChild(tab);
      if (dest) {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = name;
        dest.appendChild(opt);
      }
    });
  }

  function renderPlaylist() {
    const container = document.getElementById('playlist-container');
    if (!container) return;
    const items = playlists[activePlaylist] || [];
    container.innerHTML = '';
    items.forEach((item, idx) => {
      const track = document.createElement('div');
      track.className = 'playlist-track';
      track.innerHTML = `
        <div class="track-info">
          <div class="track-title">${item.title || item.url}</div>
          <div class="track-artist">${item.url}</div>
        </div>
        <button style="background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:.8rem" data-idx="${idx}">✕</button>
      `;
      track.querySelector('button')?.addEventListener('click', e => {
        e.stopPropagation();
        playlists[activePlaylist].splice(idx, 1);
        savePlaylists();
        renderPlaylist();
      });
      track.addEventListener('click', () => loadInternalFrame(item.url));
      container.appendChild(track);
    });
  }

  /* ── WIDGET STATE MACHINE ────────────────────────────── */
  function updateWidgetState(state) {
    const widget = document.getElementById('kodux-widget');
    if (!widget) return;
    widget.dataset.state = state;
    ['ball','preview','footer','full'].forEach(s => {
      const el = document.getElementById('content-' + s);
      if (el) {
        el.classList.toggle('hidden-content', s !== state);
        el.classList.toggle('active', s === state);
      }
    });
  }

  function openFullFromPreview(e) {
    e?.stopPropagation();
    updateWidgetState('full');
  }

  function collapseToBall(e) {
    e?.stopPropagation();
    updateWidgetState('ball');
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('kob-frame-close')?.addEventListener('click', closeInternalFrame);

    document.getElementById('createPlaylistBtn')?.addEventListener('click', createPlaylist);
    document.getElementById('addLinkBtn')?.addEventListener('click', addLink);

    const widget = document.getElementById('kodux-widget');
    if (widget) {
      document.getElementById('content-ball')?.addEventListener('click', () => updateWidgetState('preview'));
    }

    renderPlaylistTabs();
    renderPlaylist();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, { loadInternalFrame, closeInternalFrame, toast, updateWidgetState });
  window.loadInternalFrame = loadInternalFrame;
  window.updateWidgetState = updateWidgetState;
  window.openFullFromPreview = openFullFromPreview;
  window.collapseToBall = collapseToBall;
  window.createPlaylist = createPlaylist;
  window.addLink = addLink;

})();
