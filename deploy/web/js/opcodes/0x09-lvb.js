/* ════════════════════════════════════════════════════════════
   0x09 LVb · 963Hz · ♾ · INFINITO
   Lux Veritas Bllue — estado eterno multi-camada
   Cristalização de: kob-LVb.js · kodux78k.github.io
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: espirito | geo: INFINITO | arquétipos: BLLUE · NOVA · LUMINE
   verboforma: BLLUE (270Hz) · espelho · alma · filho

   MOTOR COMPARTILHADO — persistência cross-tab (BroadcastChannel)
   + IndexedDB para dados grandes + purge automático

   API:
     window.KOBLLUX.LVb.save(key, data)      → persiste dados
     window.KOBLLUX.LVb.load(key)            → recupera dados
     window.KOBLLUX.LVb.sync(callback)       → ouve mudanças cross-tab
     window.KOBLLUX.LVb.purge(olderThanMs)   → limpa dados expirados
     window.KOBLLUX.LVb.keys()               → lista todas as chaves
     window.KOBLLUX.LVb.snapshot()           → exporta estado completo
════════════════════════════════════════════════════════════ */

(function KOBLLUX_LVB() {
  'use strict';

  const PREFIX   = 'kobllux.lvb.';
  const VERBOFORMA = { id: 'bllue', hz: 270, cor: '#1E90FF', geo: 'INFINITO' };

  /* ── BROADCAST CHANNEL (cross-tab sync) ─────────────── */
  let CHANNEL = null;
  try {
    CHANNEL = typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('kobllux-lvb')
      : null;
  } catch {}

  /* ── INDEXEDDB (dados grandes) ──────────────────────── */
  let idb = null;
  function initIDB() {
    if (!window.indexedDB) return;
    try {
      const req = indexedDB.open('kobllux-lvb', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data', { keyPath: 'k' });
        }
      };
      req.onsuccess = e => { idb = e.target.result; };
    } catch {}
  }

  function idbSet(key, payload) {
    if (!idb) return;
    try {
      const tx = idb.transaction('data', 'readwrite');
      tx.objectStore('data').put({ k: key, ...payload });
    } catch {}
  }

  function idbGet(key, cb) {
    if (!idb) { cb(null); return; }
    try {
      const tx  = idb.transaction('data', 'readonly');
      const req = tx.objectStore('data').get(key);
      req.onsuccess = e => cb(e.target.result ? e.target.result.value : null);
      req.onerror   = () => cb(null);
    } catch { cb(null); }
  }

  /* ── PERSISTÊNCIA ────────────────────────────────────── */
  function save(key, data) {
    const payload = {
      value: data,
      ts: Date.now(),
      verboforma: VERBOFORMA.id,
      hz: VERBOFORMA.hz
    };
    try { localStorage.setItem(PREFIX + key, JSON.stringify(payload)); } catch {}
    idbSet(key, payload);
    if (CHANNEL) {
      try { CHANNEL.postMessage({ type: 'save', key, data }); } catch {}
    }
    document.dispatchEvent(new CustomEvent('kobllux:lvb:saved', {
      bubbles: true, detail: { key, hz: 963 }
    }));
    return payload;
  }

  function load(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw).value : null;
    } catch { return null; }
  }

  function loadAsync(key, cb) {
    const ls = load(key);
    if (ls !== null) { cb(ls); return; }
    idbGet(key, cb);
  }

  /* ── SYNC CROSS-TAB ─────────────────────────────────── */
  function sync(callback) {
    if (!CHANNEL) return;
    CHANNEL.onmessage = e => {
      if (e.data && e.data.type === 'save' && typeof callback === 'function') {
        callback(e.data.key, e.data.data);
      }
    };
  }

  /* ── PURGE ───────────────────────────────────────────── */
  function purge(olderThanMs = 7 * 24 * 60 * 60 * 1000) {
    const cutoff = Date.now() - olderThanMs;
    let purged = 0;
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => {
          try {
            const item = JSON.parse(localStorage.getItem(k));
            if (item && item.ts < cutoff) { localStorage.removeItem(k); purged++; }
          } catch {}
        });
    } catch {}
    return purged;
  }

  /* ── KEYS ────────────────────────────────────────────── */
  function keys() {
    try {
      return Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .map(k => k.slice(PREFIX.length));
    } catch { return []; }
  }

  /* ── SNAPSHOT ────────────────────────────────────────── */
  function snapshot() {
    const snap = { verboforma: VERBOFORMA, ts: Date.now(), data: {} };
    keys().forEach(k => { snap.data[k] = load(k); });
    return snap;
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initIDB();
    /* Restaurar estado cross-tab */
    sync((key, data) => {
      try { localStorage.setItem(PREFIX + key, JSON.stringify({ value: data, ts: Date.now(), verboforma: 'bllue', hz: 270 })); } catch {}
    });
    console.log('[0x09·LVb] ♾ ETERNIZAR · 963Hz · LUX VERITAS BLLUE · estado eterno ativo');
    console.log('[0x09·LVb] RÉGUA 78K · cristalizado de kob-LVb.js');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.LVb = { save, load, loadAsync, sync, purge, keys, snapshot, VERBOFORMA };

})();
