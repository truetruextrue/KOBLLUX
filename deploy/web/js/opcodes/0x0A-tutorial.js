/* ════════════════════════════════════════════════════════════
   0x0A TUTORIAL · 432Hz · ESPIRAL
   Navigation doc buttons, toggle sections, copy-activation
   layer: corpo | fonte: docs/Fusion_index.html.txt
════════════════════════════════════════════════════════════ */

(function KOBLLUX_TUTORIAL() {
  'use strict';

  /* ── TOGGLE SECTION ──────────────────────────────────── */
  function toggleSection(id) {
    const card   = document.getElementById(id);
    const toggle = card?.previousElementSibling;
    if (!card) return;
    const isOpen = !card.classList.contains('activation-hidden');
    card.classList.toggle('activation-hidden', isOpen);
    card.classList.toggle('open', !isOpen);
    toggle?.setAttribute('aria-expanded', String(!isOpen));
  }

  /* ── COPY ACTIVATION ─────────────────────────────────── */
  function copyActivation() {
    const pre = document.getElementById('actPre');
    if (!pre) return;
    navigator.clipboard?.writeText(pre.textContent).then(() => {
      window.KOBLLUX?.toast?.('⊙ ATIVAÇÃO COPIADA');
    });
  }

  /* ── BUILD ACTIVATION ASCII ──────────────────────────── */
  function buildActivationASCII(name) {
    const arq = window.KOBLLUX?.getArquetipo?.(name) || { name: 'KOBLLUX', hz: 1134, lang: 'pt-BR' };
    const now = new Date();
    const stamp = now.toISOString().slice(0, 16).replace('T', ' ');
    return [
      '╔══════════════════════════════════════╗',
      `║  KOBLLUX³ · ATIVAÇÃO · ${stamp}  ║`,
      '╠══════════════════════════════════════╣',
      `║  USER      : ${name.padEnd(22)} ║`,
      `║  ARQUÉTIPO : ${arq.name.padEnd(22)} ║`,
      `║  FREQUÊNCIA: ${String(arq.hz + 'Hz').padEnd(22)} ║`,
      `║  LÍNGUA    : ${arq.lang.padEnd(22)} ║`,
      '╠══════════════════════════════════════╣',
      '║  VERDADE × INTEGRAR ÷ ∆ = ∞         ║',
      '║  3×6×9×7 = 1134 · JESUS É O CENTRO ║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }

  /* ── UPDATE ACTIVATION DISPLAY ───────────────────────── */
  function updateActivation(name) {
    const actPre  = document.getElementById('actPre');
    const actName = document.getElementById('actName');
    const actBadge= document.getElementById('actBadge');
    if (actPre) actPre.textContent = buildActivationASCII(name || 'DUAL');
    if (actName) actName.textContent = name || 'DUAL';
    if (actBadge) actBadge.textContent = `v:${name?.slice(0,4) || 'DUAL'}`;
  }

  /* ── MODE BUTTONS (CARD / ORB / HUD) ─────────────────── */
  function bindModeBtns() {
    ['card','orb','hud'].forEach(mode => {
      document.getElementById(`btnMode${mode.charAt(0).toUpperCase() + mode.slice(1)}`)
        ?.addEventListener('click', () => window.setMode?.(mode));
    });
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    bindModeBtns();

    document.getElementById('copyActBtn')?.addEventListener('click', copyActivation);

    /* Listen for identity updates */
    document.addEventListener('di:identity:updated', e => {
      updateActivation(e.detail?.name);
    });

    /* Initial activation render */
    const name = localStorage.getItem('di_userName') || localStorage.getItem('userName') || 'DUAL';
    updateActivation(name);

    /* Card toggle via drag handle / small preview */
    document.getElementById('dragHandle')?.addEventListener('click', () => {
      const card = document.getElementById('mainCard');
      card?.classList.toggle('open');
      card?.classList.toggle('closed');
    });
    document.getElementById('smallPreview')?.addEventListener('click', () => {
      const card = document.getElementById('mainCard');
      if (card?.classList.contains('closed')) {
        card.classList.remove('closed'); card.classList.add('open');
      }
    });
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.updateActivation = updateActivation;
  window.KOBLLUX.buildActivationASCII = buildActivationASCII;
  window.toggleSection = toggleSection;

})();
