/* ════════════════════════════════════════════════════════════
   RODA VIVA · ASSEMBLY KOBLLUX · 0x03 EXPANDIR · 639Hz · ▢
   DOM Enhancer — animações · tabelas · código · scroll · tema
   Fonte: inbox/[0×00]_SCRIPTS_DE_MELHORIA_RODA_VIVA_KOBLLUX.js
          web/js/opcodes/0x00-core.js

   layer: corpo | geo: TETRAEDRO | hz: 639
   API:
     KOBLLUX.RODA.init()             → ativa todos os enhancers
     KOBLLUX.RODA.aplicarAnimacoes() → headings pulse delay
     KOBLLUX.RODA.formatarTabelas()  → kobllux-table + row nums
     KOBLLUX.RODA.destacarCodigo()   → syntax highlight básico
     KOBLLUX.RODA.scrollSuave()      → smooth anchor scroll
     KOBLLUX.RODA.autoScroll(ms)     → auto-scroll com timeout
     KOBLLUX.RODA.setTema(nome)      → dark/light/medium/vibe
     KOBLLUX.RODA.detectarTema()     → detecta preferência do OS

   JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴
   3×6×9×7 = 1134 · VERDADE × INTEGRAR ÷ Δ = ∞
════════════════════════════════════════════════════════════ */

(function KOBLLUX_RODA_VIVA() {
  'use strict';

  const HZ     = 639;
  const OPCODE = '0x03';
  const GEO    = 'TETRAEDRO';

  const TEMAS_VALIDOS = ['dark', 'light', 'medium', 'vibe', 'cyberpunk', 'anime'];
  const TEMA_KEY = 'kobllux_tema';

  /* ── TEMA ────────────────────────────────────────────── */
  function setTema(val) {
    const body = document.body;
    TEMAS_VALIDOS.forEach(t => body.classList.remove(t));
    if (val && val !== 'dark') body.classList.add(val);
    try { localStorage.setItem(TEMA_KEY, val); } catch(e) {}

    document.dispatchEvent(new CustomEvent('kobllux:roda:tema', {
      bubbles: true, detail: { tema: val, hz: HZ },
    }));
  }

  function detectarTema() {
    const salvo = (() => { try { return localStorage.getItem(TEMA_KEY); } catch(e) { return null; } })();
    if (salvo) return salvo;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* ── ANIMAÇÕES ───────────────────────────────────────── */
  function aplicarAnimacoes() {
    document.querySelectorAll('h1, h2, h3').forEach((h, i) => {
      h.style.animationDelay = `${i * 0.1}s`;
      h.classList.add('kob-heading-pulse');
    });
  }

  /* ── TABELAS ─────────────────────────────────────────── */
  function formatarTabelas() {
    document.querySelectorAll('table').forEach(table => {
      table.classList.add('kobllux-table');
      table.querySelectorAll('tbody tr').forEach((row, i) => {
        row.setAttribute('data-line', i + 1);
      });
    });
  }

  /* ── SYNTAX HIGHLIGHT ────────────────────────────────── */
  function _aplicarHighlight(element) {
    let html = element.innerHTML;
    html = html.replace(/(#[^\n<]*)(?=\n|<)/gm, '<span class="kob-hl-comment">$1</span>');
    html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="kob-hl-string">$1</span>');
    html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="kob-hl-number">$1</span>');
    const keywords = ['def','class','if','else','elif','for','while','return','import',
                      'from','function','const','let','var','=>','async','await'];
    keywords.forEach(kw => {
      const re = new RegExp(`\\b(${kw})\\b`, 'g');
      html = html.replace(re, '<span class="kob-hl-keyword">$1</span>');
    });
    element.innerHTML = html;
  }

  function destacarCodigo() {
    document.querySelectorAll('pre code').forEach(block => {
      const lines = block.textContent.split('\n').length;
      block.setAttribute('data-lines', lines);
      _aplicarHighlight(block);
    });
  }

  /* ── SCROLL SUAVE ────────────────────────────────────── */
  function scrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ── AUTO-SCROLL ─────────────────────────────────────── */
  function autoScroll(duracaoMs = 30000) {
    const iv = setInterval(() => {
      if (document.body.scrollHeight > window.innerHeight) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 3000);
    setTimeout(() => clearInterval(iv), duracaoMs);
    return () => clearInterval(iv);
  }

  /* ── INIT COMPLETO ───────────────────────────────────── */
  function init() {
    aplicarAnimacoes();
    formatarTabelas();
    destacarCodigo();
    scrollSuave();
    setTema(detectarTema());

    document.dispatchEvent(new CustomEvent('kobllux:roda:carregado', {
      bubbles: true, detail: { hz: HZ, opcode: OPCODE, geo: GEO },
    }));
    console.log('[RODA·▢] RODA VIVA iniciada · 639Hz · TETRAEDRO');
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    init();
    if (window.KOBLLUX?.MESTRE) window.KOBLLUX.MESTRE.register('RODA', window.KOBLLUX.RODA);
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.RODA = {
    init, aplicarAnimacoes, formatarTabelas, destacarCodigo,
    scrollSuave, autoScroll, setTema, detectarTema,
    HZ, OPCODE, GEO,
  };

  /* Compat: expose global para usos legados */
  window.applyThemeSelector = setTema;

})();
