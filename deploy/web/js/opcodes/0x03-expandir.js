/* ════════════════════════════════════════════════════════════
   0x03 EXPANDIR · 639Hz · ▢ · TETRAEDRO
   Universe Grid 3×3 · iframe loader · playlist management
   layer: mente | geo: TETRAEDRO | arquétipos: VITALIS · ATLAS
════════════════════════════════════════════════════════════ */

(function KOBLLUX_EXPANDIR() {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     UNIVERSE GRID 3×3
     Inspirado em: Feeling Decor · ZPR · Serena [0x09]
     Células preenchidas consecutivamente ao navegar
  ═══════════════════════════════════════════════════════ */

  const ROWS = 3, COLS = 3;
  let currentRow = 1, currentCol = 1;  /* inicia na célula central */
  let nextCellSeq = 0;                  /* próxima célula a preencher */
  let gridAnimating = false;

  /* Ordem hierárquica de preenchimento (0x00→0x0C, centro primeiro) */
  const CELL_ORDER = [
    [1,1], [0,0], [0,1], [0,2],
    [1,0], [1,2],
    [2,0], [2,1], [2,2]
  ];

  /* Opcodes por célula (espelhando os 13 opcodes KOBLLUX) */
  const CELL_META = [
    [
      { opcode:'0x00', fase:'ORIGEM',    symbol:'○', hz:'768'  },
      { opcode:'0x01', fase:'DETECTAR',  symbol:'●', hz:'432'  },
      { opcode:'0x02', fase:'INTEGRAR',  symbol:'―', hz:'528'  }
    ],[
      { opcode:'0x03', fase:'EXPANDIR',  symbol:'▢', hz:'639'  },
      { opcode:'0x07', fase:'SELAR',     symbol:'✧', hz:'777'  },
      { opcode:'0x04', fase:'LAPIDAR',   symbol:'◇', hz:'594'  }
    ],[
      { opcode:'0x05', fase:'CONVERGIR', symbol:'⧉', hz:'672'  },
      { opcode:'0x06', fase:'UNIFICAR',  symbol:'☯', hz:'528'  },
      { opcode:'0x09', fase:'ETERNIZAR', symbol:'♾', hz:'963'  }
    ]
  ];

  /* ── BUILD GRID ──────────────────────────────────────── */
  function buildUniverseGrid() {
    const grid = document.getElementById('universe-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const meta = CELL_META[r][c];
        const cell = document.createElement('div');
        cell.className = 'kob-screen';
        cell.dataset.opcode = meta.opcode;
        cell.dataset.fase   = meta.fase;
        cell.dataset.row    = r;
        cell.dataset.col    = c;
        cell.setAttribute('data-layer', 'mente');
        cell.setAttribute('data-geo', 'TETRAEDRO');
        cell.innerHTML = `
          <div class="kob-screen-placeholder">
            <span class="ph-symbol">${meta.symbol}</span>
            <span>${meta.opcode} · ${meta.fase}</span>
            <span style="opacity:.5">${meta.hz}Hz</span>
          </div>`;
        grid.appendChild(cell);
      }
    }
    updateView();
  }

  /* ── NAVIGATION ──────────────────────────────────────── */
  function navigateTo(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
    if (row === currentRow && col === currentCol) return;
    if (gridAnimating) return;
    gridAnimating = true;
    currentRow = row; currentCol = col;
    updateView();
    setTimeout(() => { gridAnimating = false; }, 520);
  }

  function updateView() {
    const grid = document.getElementById('universe-grid');
    if (grid) {
      const tx = -currentCol * (100 / 3);
      const ty = -currentRow * (100 / 3);
      grid.style.transform = `translate(${tx}%, ${ty}%)`;
    }
    document.querySelectorAll('.kob-matrix-dot').forEach((dot, i) => {
      const r = Math.floor(i / 3), c = i % 3;
      dot.classList.toggle('active', r === currentRow && c === currentCol);
    });
  }

  /* ── BUILD NAV MATRIX DOTS ───────────────────────────── */
  function buildNavMatrix() {
    const mat = document.getElementById('navMatrix');
    if (!mat) return;
    mat.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const r = Math.floor(i / 3), c = i % 3;
      const meta = CELL_META[r][c];
      const dot = document.createElement('div');
      dot.className = 'kob-matrix-dot';
      dot.title = `${meta.opcode} · ${meta.fase}`;
      dot.setAttribute('data-row', r);
      dot.setAttribute('data-col', c);
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Célula ${r},${c} · ${meta.fase}`);
      dot.addEventListener('click', () => navigateTo(r, c));
      mat.appendChild(dot);
    }
  }

  /* ── SWIPE & KEYBOARD NAVIGATION ────────────────────── */
  function initGridNavigation() {
    const SWIPE_DIST = 45, SWIPE_TIME = 350;
    let drag = { x: 0, y: 0, t: 0, active: false };

    /* Document-level swipe: only fires for touches outside iframes (placeholders) */
    document.addEventListener('touchstart', e => {
      if (e.target.closest('#kob-strip-left,#kob-strip-right,#kob-strip-bottom,#kob-strip-top')) return;
      drag.x = e.touches[0].clientX; drag.y = e.touches[0].clientY;
      drag.t = Date.now(); drag.active = true;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      if (!drag.active) return;
      const dx = e.changedTouches[0].clientX - drag.x;
      const dy = e.changedTouches[0].clientY - drag.y;
      drag.active = false;
      if (Date.now() - drag.t > SWIPE_TIME) return;
      handleSwipe(dx, dy);
    }, { passive: true });

    document.addEventListener('keydown', e => {
      const sym = document.getElementById('symbolBar');
      if (document.activeElement && document.activeElement !== document.body) return;
      switch (e.key) {
        case 'ArrowRight': navigateTo(currentRow, currentCol + 1); break;
        case 'ArrowLeft':  navigateTo(currentRow, currentCol - 1); break;
        case 'ArrowDown':  navigateTo(currentRow + 1, currentCol); break;
        case 'ArrowUp':    navigateTo(currentRow - 1, currentCol); break;
        case 'Home':       navigateTo(1, 1); break;
      }
    });

    let wheelCooldown = false;
    document.addEventListener('wheel', e => {
      if (wheelCooldown) return;
      /* Don't capture wheel on scrollable elements */
      if (e.target.closest('.kob-screen') && e.target.closest('.kob-screen').scrollHeight > window.innerHeight) return;
      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 700);
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.deltaY > 0 ? navigateTo(currentRow + 1, currentCol) : navigateTo(currentRow - 1, currentCol);
      } else {
        e.deltaX > 0 ? navigateTo(currentRow, currentCol + 1) : navigateTo(currentRow, currentCol - 1);
      }
    }, { passive: true });
  }

  /* ── EDGE CAPTURE STRIPS ─────────────────────────────────
     Strips fixas nas beiradas da tela (sobre iframes).
     Centro da tela → iframe rola naturalmente.
     Beirada → interpreta como navegação da grade 3×3.
  ──────────────────────────────────────────────────────── */
  function initEdgeStrips() {
    const EDGE = 52; /* px — largura/altura da faixa de borda */
    const ACCENT = 'rgba(201,168,76,0.09)';

    function topH() {
      return parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--kob-topbar-h') || '58', 10);
    }

    const DEFS = [
      {
        id: 'kob-strip-left',
        css: () => `left:0;top:${topH()}px;bottom:0;width:${EDGE}px;` +
                   `background:linear-gradient(to right,${ACCENT},transparent);`
      },
      {
        id: 'kob-strip-right',
        css: () => `right:0;top:${topH()}px;bottom:0;width:${EDGE}px;` +
                   `background:linear-gradient(to left,${ACCENT},transparent);`
      },
      {
        id: 'kob-strip-bottom',
        css: () => `bottom:0;left:${EDGE}px;right:${EDGE}px;height:${EDGE}px;` +
                   `background:linear-gradient(to top,${ACCENT},transparent);`
      },
      {
        id: 'kob-strip-top',
        css: () => `top:${topH()}px;left:${EDGE}px;right:${EDGE}px;height:${EDGE}px;` +
                   `background:linear-gradient(to bottom,${ACCENT},transparent);`
      }
    ];

    DEFS.forEach(({ id, css }) => {
      let el = document.getElementById(id);
      if (!el) { el = document.createElement('div'); el.id = id; document.body.appendChild(el); }
      el.style.cssText = `position:fixed;z-index:3;pointer-events:auto;touch-action:none;${css()}`;
      el.setAttribute('aria-hidden', 'true');

      let sx, sy, st;
      el.addEventListener('touchstart', e => {
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        st = Date.now();
      }, { passive: true });

      el.addEventListener('touchend', e => {
        if (Date.now() - st > 400) return;
        handleSwipe(
          e.changedTouches[0].clientX - sx,
          e.changedTouches[0].clientY - sy
        );
      }, { passive: true });
    });
  }

  function handleSwipe(dx, dy) {
    const SWIPE_DIST = 45;
    const ax = Math.abs(dx), ay = Math.abs(dy);
    if (ax > ay && ax > SWIPE_DIST) {
      dx < 0 ? navigateTo(currentRow, currentCol + 1) : navigateTo(currentRow, currentCol - 1);
    } else if (ay > ax && ay > SWIPE_DIST) {
      dy < 0 ? navigateTo(currentRow + 1, currentCol) : navigateTo(currentRow - 1, currentCol);
    }
  }

  /* ── FRAME LOADER (preenchimento consecutivo de células) ─ */
  function loadInternalFrame(url) {
    const [r, c] = CELL_ORDER[nextCellSeq % CELL_ORDER.length];
    nextCellSeq++;

    const cell = document.querySelector(
      `#universe-grid .kob-screen[data-row="${r}"][data-col="${c}"]`
    );
    if (cell) {
      cell.innerHTML = `<iframe
        src="${url}"
        loading="lazy"
        title="${url.split('/').pop() || url}"
        data-opcode="0x03" data-fase="EXPANDIR"
      ></iframe>`;
      /* Mark dot as filled */
      const dot = document.querySelector(
        `#navMatrix .kob-matrix-dot[data-row="${r}"][data-col="${c}"]`
      );
      dot?.classList.add('filled');
      navigateTo(r, c);
    }
    toast('⊙ CARREGANDO: ' + url.split('/').pop());
  }

  function closeInternalFrame() {
    /* Volta para célula central */
    navigateTo(1, 1);
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

  /* ── PLAYLIST MANAGER ────────────────────────────────── */
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

  function openFullFromPreview(e) { e?.stopPropagation(); updateWidgetState('full'); }
  function collapseToBall(e)      { e?.stopPropagation(); updateWidgetState('ball'); }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildUniverseGrid();
    buildNavMatrix();
    initGridNavigation();
    initEdgeStrips();

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
  Object.assign(window.KOBLLUX, {
    loadInternalFrame, closeInternalFrame, toast,
    updateWidgetState, navigateTo
  });
  window.loadInternalFrame  = loadInternalFrame;
  window.navigateTo         = navigateTo;
  window.updateWidgetState  = updateWidgetState;
  window.openFullFromPreview = openFullFromPreview;
  window.collapseToBall     = collapseToBall;
  window.createPlaylist     = createPlaylist;
  window.addLink            = addLink;

})();
