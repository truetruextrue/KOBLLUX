/* ════════════════════════════════════════════════════════════
   0x09 KARD · 963Hz · ♾ · INFINITO
   KARD — baralho de persistência dimensional KOBLLUX
   Cristalização de: o0.js (kard/modules)
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: espirito | geo: INFINITO | arquétipos: AION · LUMINE · JESUS
   verboforma: KOBLLUX (1134Hz) · síntese · eternidade · corpo completo

   AC: o0.js = "Origin Zero" — sinal de origem pulsando
   DC: KARD local = baralho eterno, cada dado = um kard com TTL e metadados

   KARD = Card-based dimensional persistence:
   Cada "kard" é uma unidade de dado com: id, data, TTL, tags, verboforma, hz
   O "baralho" (deck) é a coleção de kards ativa em memória + localStorage

   API:
     window.KOBLLUX.KARD.store(kard)      → guarda kard {id?,data,ttl?,tags?}
     window.KOBLLUX.KARD.fetch(query)     → busca kards por tag/id/regex
     window.KOBLLUX.KARD.deck()           → todos os kards ativos
     window.KOBLLUX.KARD.burn(id)         → remove kard por id
     window.KOBLLUX.KARD.seal(id)         → sela kard como eterno (sem TTL)
     window.KOBLLUX.KARD.shuffle()        → embaralha deck (retorna random)
════════════════════════════════════════════════════════════ */

(function KOBLLUX_KARD() {
  'use strict';

  const PREFIX     = 'kobllux.kard.';
  const DEFAULT_TTL = 30 * 24 * 60 * 60 * 1000; /* 30 dias */
  const ETERNAL    = -1; /* TTL infinito */

  /* ── FACTORY DE KARD ─────────────────────────────────── */
  function makeKard(input) {
    const now = Date.now();
    return {
      id:          input.id || `kard_${now.toString(36)}_${Math.random().toString(36).slice(2,6)}`,
      data:        input.data,
      ttl:         input.ttl !== undefined ? input.ttl : DEFAULT_TTL,
      tags:        Array.isArray(input.tags) ? input.tags : [],
      verboforma:  input.verboforma || 'kobllux',
      hz:          input.hz || 963,
      created:     now,
      expires:     input.ttl === ETERNAL ? ETERNAL : now + (input.ttl || DEFAULT_TTL),
      sealed:      false
    };
  }

  /* ── ARMAZENAMENTO ───────────────────────────────────── */
  function store(input) {
    const kard = makeKard(input);
    try {
      localStorage.setItem(PREFIX + kard.id, JSON.stringify(kard));
    } catch { /* quota exceeded — silencioso */ }
    if (window.KOBLLUX && window.KOBLLUX.LVb) {
      window.KOBLLUX.LVb.save('kard.' + kard.id, kard);
    }
    document.dispatchEvent(new CustomEvent('kobllux:kard:stored', {
      bubbles: true, detail: { id: kard.id, tags: kard.tags, hz: 963 }
    }));
    return kard;
  }

  /* ── BUSCA ───────────────────────────────────────────── */
  function fetch(query) {
    const all = deck();
    if (!query) return all;
    if (typeof query === 'string') {
      /* busca por id exato ou tag */
      return all.filter(k =>
        k.id === query ||
        (Array.isArray(k.tags) && k.tags.includes(query))
      );
    }
    if (query instanceof RegExp) {
      return all.filter(k => query.test(k.id) || (k.tags || []).some(t => query.test(t)));
    }
    return all;
  }

  /* ── DECK (todos os kards válidos) ───────────────────── */
  function deck() {
    const now = Date.now();
    const result = [];
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => {
          try {
            const kard = JSON.parse(localStorage.getItem(k));
            if (!kard) return;
            /* Remove expirados (exceto eternos) */
            if (kard.expires !== ETERNAL && kard.expires < now) {
              localStorage.removeItem(k);
              return;
            }
            result.push(kard);
          } catch {}
        });
    } catch {}
    return result;
  }

  /* ── BURN (remover) ─────────────────────────────────── */
  function burn(id) {
    try { localStorage.removeItem(PREFIX + id); } catch {}
    document.dispatchEvent(new CustomEvent('kobllux:kard:burned', {
      bubbles: true, detail: { id, hz: 963 }
    }));
    return true;
  }

  /* ── SEAL (tornar eterno) ───────────────────────────── */
  function seal(id) {
    const raw = localStorage.getItem(PREFIX + id);
    if (!raw) return null;
    try {
      const kard  = JSON.parse(raw);
      kard.sealed  = true;
      kard.expires = ETERNAL;
      kard.ttl     = ETERNAL;
      localStorage.setItem(PREFIX + id, JSON.stringify(kard));
      /* sealCodice na eternização */
      if (typeof window.sealCodice === 'function') {
        window.sealCodice({ id: 'kobllux', silent: true });
      }
      document.dispatchEvent(new CustomEvent('kobllux:kard:sealed', {
        bubbles: true, detail: { id, hz: 963 }
      }));
      return kard;
    } catch { return null; }
  }

  /* ── SHUFFLE ─────────────────────────────────────────── */
  function shuffle() {
    const d = deck();
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Limpar expirados no boot */
    deck(); /* side-effect: remove expirados */
    /* Kard de boot para rastrear sessão */
    store({
      id: 'session.' + Date.now().toString(36),
      data: { url: location.href, ts: Date.now(), ua: navigator.userAgent.slice(0,50) },
      tags: ['session', 'boot'],
      ttl: 24 * 60 * 60 * 1000 /* 24h */
    });
    console.log(`[0x09·KARD] ♾ ETERNIZAR · 963Hz · ${deck().length} kards no baralho`);
    console.log('[0x09·KARD] RÉGUA 78K · cristalizado de o0.js (kard/modules)');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.KARD = { store, fetch, deck, burn, seal, shuffle, ETERNAL };

})();
