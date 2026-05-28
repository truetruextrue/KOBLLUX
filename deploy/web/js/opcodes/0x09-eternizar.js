/* ════════════════════════════════════════════════════════════
   0x09 ETERNIZAR · 963Hz · ♾ · CIRCULO
   localStorage sync, brand, playlist persistence, state
   layer: espirito | fonte: index.html + Fusion Card
════════════════════════════════════════════════════════════ */

(function KOBLLUX_ETERNIZAR() {
  'use strict';

  /* ── STORAGE MANIFEST ────────────────────────────────── */
  const KEYS = {
    theme:       'infodoseTheme',
    enabled:     'infodoseEnabled',
    history:     'historyMode',
    userName:    'userName',
    assistant:   'assistantBase',
    diUserName:  'di_userName',
    diArq:       'di_arquetipo',
    diArqLang:   'di_arq_lang',
    diCv1Pitch:  'di_cv1_pitch',
    diCv1Rate:   'di_cv1_rate',
    diCv2Pitch:  'di_cv2_pitch',
    diCv2Rate:   'di_cv2_rate',
    emotional:   'emotionalTimeline',
    design:      'designState',
    presets:     'koblluxPresets',
    arch:        'kob_arch',
    playlists:   'kobllux_playlists',
    vault:       'kobllux_vault',
    apikey:      'kobllux_apikey'
  };

  /* ── STATE SYNC ──────────────────────────────────────── */
  function getState() {
    const state = {};
    Object.entries(KEYS).forEach(([k, sk]) => {
      try { state[k] = JSON.parse(localStorage.getItem(sk)) ?? localStorage.getItem(sk); } catch { state[k] = localStorage.getItem(sk); }
    });
    return state;
  }

  function setState(key, value) {
    const storageKey = KEYS[key];
    if (!storageKey) return;
    const toStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(storageKey, toStore);
    window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue: toStore }));
  }

  /* ── DESIGN STATE APPLY ──────────────────────────────── */
  function applyDesignState() {
    const raw = localStorage.getItem(KEYS.design);
    if (!raw) return;
    try {
      const stateArr = JSON.parse(raw);
      stateArr.forEach(s => {
        if (s.action === 'style') {
          document.querySelectorAll(s.element).forEach(el => el.style[s.property] = s.value);
        }
      });
    } catch(e) { console.warn('[0x09] design state apply fail', e); }
  }

  /* ── EMOTIONAL TIMELINE ──────────────────────────────── */
  function getEmotionalTimeline() {
    try { return JSON.parse(localStorage.getItem(KEYS.emotional) || '[]'); } catch { return []; }
  }

  /* ── PLAYLIST TAB PERSISTENCE ────────────────────────── */
  function restorePlaylistTabs() {
    const tabs = document.getElementById('playlist-tabs');
    const dest = document.getElementById('destination-select');
    if (!tabs || !dest) return;
    const playlists = JSON.parse(localStorage.getItem(KEYS.playlists) || '{}');
    Object.keys(playlists).forEach(name => {
      const opt = document.createElement('option');
      opt.value = name; opt.textContent = name;
      dest.appendChild(opt);
    });
  }

  /* ── STORAGE EVENT LISTENER ──────────────────────────── */
  window.addEventListener('storage', e => {
    if (e.key === KEYS.theme && e.newValue) window.applyThemeSelector?.(e.newValue);
    if (e.key === KEYS.diUserName && e.newValue) window.di_syncNameUI?.(e.newValue);
  });

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    applyDesignState();
    restorePlaylistTabs();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, {
    STORAGE_KEYS: KEYS,
    getState, setState,
    getEmotionalTimeline,
    applyDesignState
  });

})();
