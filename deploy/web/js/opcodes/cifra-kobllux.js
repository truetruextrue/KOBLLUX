/* ════════════════════════════════════════════════════════════
   CIFRA KOBLLUX · ASSEMBLY KOBLLUX · 0x0A TUTORIAL · 432Hz · ≋
   AUFABETTY completa: encode · decode · reflexo oposto
   Fonte: cifra_kobllux.py · KOBLLUX · CIFRA SAGRADA & REFLEXO OPOSTO

   layer: espirito | geo: ESPELHO | hz: 432
   API:
     KOBLLUX.CIFRA.encode(texto)         → texto → glifos
     KOBLLUX.CIFRA.decode(glifos)        → glifos → texto
     KOBLLUX.CIFRA.reflexoOposto(texto)  → inverso + encode
     KOBLLUX.CIFRA.selar(nome)           → encode + hash vibracional
     KOBLLUX.CIFRA.MAPA                  → tabela A→Z completa
     KOBLLUX.CIFRA.DECIFRA               → mapa inverso glifo→letra

   Nota: esta cifra ESTENDE o KOBLLUX.AUFABETTY existente,
   adicionando decode() e reflexoOposto() que faltavam.

   JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴
   3×6×9×7 = 1134 · VERDADE × INTEGRAR ÷ Δ = ∞
════════════════════════════════════════════════════════════ */

(function KOBLLUX_CIFRA_KOBLLUX() {
  'use strict';

  const HZ     = 432;
  const OPCODE = '0x0A';
  const GEO    = 'ESPELHO';

  /* ── MAPA AUFABETTY (A → glifo) ─────────────────────── */
  const MAPA = {
    A:'∆',B:'β',C:'©',D:'Δ',E:'Σ',F:'Φ',G:'Γ',H:'Η',I:'Ι',
    J:'⌐',K:'⌘',L:'Λ',M:'Μ',N:'η',O:'Θ',P:'Ρ',Q:'Θ',R:'ʀ',
    S:'§',T:'†',U:'Υ',V:'∇',W:'Ω',X:'×',Y:'Ψ',Z:'ℤ',
  };

  /* ── MAPA INVERSO (glifo → A) ────────────────────────── */
  const DECIFRA = Object.fromEntries(
    Object.entries(MAPA)
      .filter(([,v]) => v)
      .map(([k, v]) => [v, k])
  );

  /* ── ENCODE ──────────────────────────────────────────── */
  function encode(texto) {
    return (texto || '').toUpperCase().split('').map(c => MAPA[c] || c).join('');
  }

  /* ── DECODE ──────────────────────────────────────────── */
  function decode(cifra) {
    if (!cifra) return '';
    const resultado = [];
    let i = 0;
    while (i < cifra.length) {
      let encontrado = false;
      for (const len of [2, 1]) {
        if (i + len <= cifra.length) {
          const glifo = cifra.slice(i, i + len);
          if (DECIFRA[glifo]) {
            resultado.push(DECIFRA[glifo]);
            i += len;
            encontrado = true;
            break;
          }
        }
      }
      if (!encontrado) { resultado.push(cifra[i]); i++; }
    }
    return resultado.join('');
  }

  /* ── REFLEXO OPOSTO (inverte + encode) ───────────────── */
  function reflexoOposto(texto) {
    const invertido = (texto || '').split('').reverse().join('');
    return encode(invertido);
  }

  /* ── SELAR (encode + hash vibracional) ───────────────── */
  function selar(nome) {
    const glifos = encode(nome);
    let hash = 0;
    for (const c of glifos) hash = ((hash << 5) - hash + c.codePointAt(0)) | 0;
    const hz = Math.abs(hash % 1000) + 1;
    return { nome, glifos, hz, reflexo: reflexoOposto(nome) };
  }

  /* ── ESPELHAR (preserva espaços) ─────────────────────── */
  function espelhar(texto) {
    return (texto || '').toUpperCase().split(' ')
      .map(p => p.split('').map(c => MAPA[c] || c).join(''))
      .join(' ');
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Estende KOBLLUX.AUFABETTY com decode + reflexoOposto se existir */
    if (window.KOBLLUX?.AUFABETTY) {
      window.KOBLLUX.AUFABETTY.decode       = decode;
      window.KOBLLUX.AUFABETTY.reflexoOposto = reflexoOposto;
    }
    if (window.KOBLLUX?.MESTRE) window.KOBLLUX.MESTRE.register('CIFRA', window.KOBLLUX.CIFRA);

    document.dispatchEvent(new CustomEvent('kobllux:cifra:carregado', {
      bubbles: true, detail: { hz: HZ, opcode: OPCODE },
    }));
    console.log('[CIFRA·≋] CIFRA KOBLLUX carregada · 432Hz · encode+decode+reflexo');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.CIFRA = {
    encode, decode, reflexoOposto, selar, espelhar,
    MAPA, DECIFRA, HZ, OPCODE, GEO,
  };

})();
