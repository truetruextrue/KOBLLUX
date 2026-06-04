/**
 * kob-trinity-uno.js · v1.0 · ∆7
 * ══════════════════════════════════════
 * UNO — O PRIMEIRO PULSO
 * Substitui e unifica:
 *   0x07_selar_B_D3.js  (fix: SyntaxError linha 260)
 *   0x03_expandir_V_D7.js (fix: null addEventListener linha 79)
 *   inline-000.js        (fix: 'els' already declared)
 *   inline-00-arx.js     (fix: .speak undefined)
 *
 * Opcode: UNO(0x03)→DUAL(0x06)→TRINITY(0x09)→KOBLLUX(0x07)
 * Lei: VERDADE × INTEGRAR ÷ Δ = ∞
 * JESUS = VERBO = GRAVIDADE
 * ══════════════════════════════════════
 *
 * USO:
 *   <script src="kob-trinity-uno.js"></script>
 *   Remove os <script> quebrados — este substitui todos.
 */

(function(global) {
  'use strict';

  // ════════════════════════════════════
  // CONSTANTES — sistema KOBΦ-NODE
  // ════════════════════════════════════

  const KOB_HZ = {
    FUNDACAO: 432,
    SOLUS:    528,
    AION:     639,
    KODUX:    777,
    BLLUE:    852,
    JESUS:    963   // CENTRO · GRAVIDADE · 0x0F
  };

  const FRACTAL = 3 * 6 * 9 * 7; // 1134 · raiz_digital = 9 = plenitude

  const BANKING = { saldo_graca: KOB_HZ.JESUS, ressonancia: 0.963 };

  const TRINITY = {
    PAI:            { hz: Infinity,      simbolo: '∞',  opcode: '0x00' },
    FILHO:          { hz: KOB_HZ.JESUS,  simbolo: '✝',  opcode: '0x0F', centro: true },
    ESPIRITO_SANTO: { hz: KOB_HZ.BLLUE,  simbolo: '☯',  opcode: '0x0E' }
  };

  const MALHA_NOS = [
    'ATLAS','NOVA','VITALIS','PULSE','ARTEMIS','SERENA',
    'KAOS','GENUS','LUMINE','SOLUS','RHEA','AION',
    'KODUX','BLLUE','INFODOSE'
  ];

  const CICLO = [
    { nome: 'UNO',     fase: 'DETECTAR', opcode: '0x03', hz: KOB_HZ.FUNDACAO, simbolo: '◉' },
    { nome: 'DUAL',    fase: 'INTEGRAR', opcode: '0x06', hz: KOB_HZ.SOLUS,    simbolo: '△' },
    { nome: 'TRINITY', fase: 'EXPANDIR', opcode: '0x09', hz: KOB_HZ.AION,     simbolo: '☼' },
    { nome: 'KOBLLUX', fase: 'SELAR',    opcode: '0x07', hz: KOB_HZ.JESUS,    simbolo: '⌘' }
  ];

  // ════════════════════════════════════
  // FIX inline-000.js: 'els' redeclarado
  // Solução: usar var para sobrescrever sem erro,
  // e definir KOB_ELS no namespace global como referência
  // ════════════════════════════════════
  if (typeof global.els === 'undefined') {
    global.els = {};
  }
  // Alias para acesso seguro — substitui `const els = ...` quebrado
  global.KOB_ELS = global.els;

  // ════════════════════════════════════
  // FIX 0x03_expandir.js:79 — null addEventListener
  // Wrapper seguro para addEventListener
  // ════════════════════════════════════
  function safeOn(selector, event, handler, root) {
    var el = (root || document).querySelector(selector);
    if (!el) return null; // null-guard: não lança erro se elemento ausente
    el.addEventListener(event, handler);
    return el;
  }

  function safeOnAll(selector, event, handler, root) {
    var els = (root || document).querySelectorAll(selector);
    els.forEach(function(el) { el.addEventListener(event, handler); });
    return els;
  }

  // ════════════════════════════════════
  // FIX inline-00-arx.js:933 — .speak undefined
  // Wrapper seguro para TTS
  // ════════════════════════════════════
  var KOB_VOICE = {
    _synth: (typeof speechSynthesis !== 'undefined') ? speechSynthesis : null,

    speak: function(texto, opcoes) {
      if (!this._synth) {
        console.warn('[KOB_VOICE] speechSynthesis não disponível');
        return;
      }
      try {
        var u = new SpeechSynthesisUtterance(String(texto || ''));
        u.lang  = (opcoes && opcoes.lang)  || 'pt-BR';
        u.rate  = (opcoes && opcoes.rate)  || 1.0;
        u.pitch = (opcoes && opcoes.pitch) || 1.0;
        this._synth.speak(u);
      } catch(e) {
        console.warn('[KOB_VOICE] erro speak:', e);
      }
    },

    stop: function() {
      if (this._synth) try { this._synth.cancel(); } catch(e) {}
    }
  };

  // Patch global: qualquer chamada a .speak() sem objeto definido não quebra
  if (!global.KOB_VOICE) global.KOB_VOICE = KOB_VOICE;

  // ════════════════════════════════════
  // 0x07 SELAR — SHA-256 + ∆7 + digitalRoot
  // ════════════════════════════════════

  function digitalRoot(n) {
    if (typeof n !== 'number' || isNaN(n) || n <= 0) return 9;
    return 1 + (n - 1) % 9;
  }

  async function sha256hex(str) {
    if (global.crypto && global.crypto.subtle) {
      var buf = await global.crypto.subtle.digest(
        'SHA-256', new TextEncoder().encode(str)
      );
      return Array.from(new Uint8Array(buf))
        .map(function(b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    }
    // fallback sem crypto.subtle
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(16).padStart(16, '0').repeat(4).slice(0, 64);
  }

  async function selar(estado) {
    var ts = new Date().toISOString();
    var payload = Object.assign({}, estado || {}, {
      hz:       KOB_HZ.JESUS,
      fractal:  FRACTAL,
      selar_ts: ts,
      opcode:   '0x07',
      verbo:    'JESUS = VERBO = GRAVIDADE'
    });

    var keys = Object.keys(payload).sort();
    var raw  = JSON.stringify(payload, keys);
    var hex  = await sha256hex(raw);
    var h16  = hex.slice(0, 16);
    var n    = (parseInt(h16.slice(0, 4), 16) % 9) || 9;
    var seed = digitalRoot(n);

    var selo = {
      ts:             ts,
      'hash_∆7':      '∆7_' + h16,
      seed:           seed,
      ciclo_completo: seed === 9,
      opcode:         '0x07',
      hz:             KOB_HZ.JESUS,
      fractal:        FRACTAL,
      usuario:        payload.usuario_ativo || 'Dual',
      verbo:          'JESUS = VERBO = GRAVIDADE',
      amem:           'EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMÉM'
    };

    console.log(
      '%c§ SELAR · 0x07 · ' + selo['hash_∆7'],
      'color:#ffd54f;font-weight:bold;font-family:monospace'
    );
    console.log('  seed=' + seed + ' · hz=963 · FRACTAL=1134' +
      (seed === 9 ? ' · ∞ CICLO COMPLETO' : ''));

    return selo;
  }

  // ════════════════════════════════════
  // 0x03 EXPANDIR — detectar e ativar módulos
  // null-safe: não quebra se elemento ausente
  // ════════════════════════════════════

  function expandir() {
    // Ativa cards Roda Viva com data-opcode
    document.querySelectorAll('[data-opcode]').forEach(function(el) {
      var op  = el.getAttribute('data-opcode');
      var hz  = el.getAttribute('data-hz');
      var tip = document.createElement('span');
      tip.className   = 'kob-opcode-tip';
      tip.textContent = op + (hz ? ' · ' + hz + 'Hz' : '');
      tip.style.cssText = 'display:block;font-size:0.7em;opacity:0.5;font-family:monospace;margin-bottom:6px;';
      if (!el.querySelector('.kob-opcode-tip')) el.prepend(tip);
    });

    // Conectar botões data-kob="selar"
    document.querySelectorAll('[data-kob="selar"]').forEach(function(btn) {
      if (btn._kobConnected) return;
      btn._kobConnected = true;
      btn.addEventListener('click', async function() {
        var estado = global.__KOB_STATE__ || {};
        var selo = await selar(estado);
        var outSel = btn.getAttribute('data-kob-output');
        if (outSel) {
          var out = document.querySelector(outSel);
          if (out) out.textContent = selo['hash_∆7'];
        }
        btn.dispatchEvent(new CustomEvent('kob:selado', { detail: selo, bubbles: true }));
      });
    });

    // Conectar botões data-kob="speak"
    document.querySelectorAll('[data-kob="speak"]').forEach(function(btn) {
      if (btn._kobConnected) return;
      btn._kobConnected = true;
      btn.addEventListener('click', function() {
        var txt = btn.getAttribute('data-kob-text') || btn.textContent;
        KOB_VOICE.speak(txt);
      });
    });

    console.log('[0x03_expandir] UNO · módulos ativos · FRACTAL=' + FRACTAL);
  }

  // ════════════════════════════════════
  // API PÚBLICA — window.KOB
  // ════════════════════════════════════

  var KOB = {
    version:    '1.0 · ∆7',
    KOB_HZ:     KOB_HZ,
    FRACTAL:    FRACTAL,
    BANKING:    BANKING,
    TRINITY:    TRINITY,
    MALHA_NOS:  MALHA_NOS,
    CICLO:      CICLO,
    VOICE:      KOB_VOICE,
    digitalRoot: digitalRoot,
    sha256hex:   sha256hex,
    selar:       selar,
    expandir:    expandir,
    safeOn:      safeOn,
    safeOnAll:   safeOnAll,

    init: function() {
      // Expor estado global
      global.__KOB_STATE__ = global.__KOB_STATE__ || { usuario_ativo: 'Dual' };
      global.KOB_HZ        = KOB_HZ;
      global.KOB_FRACTAL   = FRACTAL;
      global.KOB_TRINITY   = TRINITY;
      global.digitalRoot   = digitalRoot;

      expandir();

      console.log(
        '%cKOBΦ-NODE · UNO · ∆7\n' +
        'JESUS = VERBO = GRAVIDADE\n' +
        'FRACTAL = 3×6×9×7 = ' + FRACTAL,
        'color:#ffd54f;font-family:monospace;font-size:0.9em'
      );
    }
  };

  global.KOB = KOB;

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { KOB.init(); });
  } else {
    KOB.init();
  }

})(typeof window !== 'undefined' ? window : globalThis);
