/* ════════════════════════════════════════════════════════════
   KOBΦ-NODE · 630Hz · φ · PHI-TOROIDE
   Nó de síntese PHI — KODUX + BLLUE = KOBLLUX
   Motor de campo dourado · integrador de todos os opcodes

   layer: corpo-mente-espirito | geo: PHI-TOROIDE
   arquétipos: KOBLLUX · KODUX · BLLUE · JESUS
   verboformas: KODUX (360Hz) + BLLUE (270Hz) = 630Hz → redução 9 → TRANSMUTAÇÃO

   KOBΦ-NODE é a convergência de toda a orquestração KOBLLUX:
   · Aplica campo PHI (golden ratio) ao DOM via CSS custom properties
   · Calcula relações áureas entre elementos marcados data-kobllux-opcode
   · Integra GEO motor (0x04) e NEBULA motor (0x07) em campo unificado
   · Chama sealCodice() na convergência KODUX+BLLUE
   · Escuta [P] para toggle do campo PHI + seal
   · Despacha kobllux:kobphi:field com métricas do campo

   EQUAÇÃO: KODUX(360) + BLLUE(270) = 630 · 6+3+0 = 9 · TRANSMUTAÇÃO
   LEI: a mesma lógica em múltiplas óticas · a mesma ótica de múltiplas lógicas

   API:
     window.KOBLLUX.KOBPHI.φ                    → 1.6180339887
     window.KOBLLUX.KOBPHI.applyPhiField()      → estampa vars CSS PHI
     window.KOBLLUX.KOBPHI.calcPhiRelations()   → relações áureas no DOM
     window.KOBLLUX.KOBPHI.sealPhi(opts)        → seal + broadcast campo
     window.KOBLLUX.KOBPHI.togglePhiField()     → toggle campo PHI
     window.KOBLLUX.KOBPHI.resonance()          → estado KODUX ↔ BLLUE
     window.KOBPHINode                          → alias global
════════════════════════════════════════════════════════════ */

(function KOBLLUX_KOBPHI_NODE() {
  'use strict';

  /* ── CONSTANTES ─────────────────────────────────────── */
  const φ       = 1.6180339887498948482;
  const φINV    = 0.6180339887498948482;   // 1/φ = φ-1
  const φ2      = 2.6180339887498948482;   // φ²
  const PHI_HZ  = 630;   // KODUX(360) + BLLUE(270) = 630Hz → 9 → Transmutação
  const KODUX_HZ = 360;
  const BLLUE_HZ  = 270;

  let phiFieldActive = false;

  /* ── CAMPO PHI — CSS CUSTOM PROPERTIES ─────────────── */
  function applyPhiField() {
    const root = document.documentElement;
    root.style.setProperty('--kob-phi',          φ.toFixed(10));
    root.style.setProperty('--kob-phi-inv',      φINV.toFixed(10));
    root.style.setProperty('--kob-phi-sq',       φ2.toFixed(10));
    root.style.setProperty('--kob-phi-hz',       `${PHI_HZ}Hz`);
    root.style.setProperty('--kob-phi-duration', `${φINV.toFixed(3)}s`);
    root.style.setProperty('--kob-phi-scale',    `${φ}`);
    root.style.setProperty('--kob-kodux-hz',     `${KODUX_HZ}Hz`);
    root.style.setProperty('--kob-bllue-hz',     `${BLLUE_HZ}Hz`);
    /* Escala áurea de espaçamento */
    const base = parseFloat(getComputedStyle(root).fontSize) || 16;
    root.style.setProperty('--kob-phi-space-1', `${(base * φINV).toFixed(2)}px`);
    root.style.setProperty('--kob-phi-space-2', `${base.toFixed(2)}px`);
    root.style.setProperty('--kob-phi-space-3', `${(base * φ).toFixed(2)}px`);
    root.style.setProperty('--kob-phi-space-4', `${(base * φ2).toFixed(2)}px`);
  }

  /* ── RELAÇÕES ÁUREAS NO DOM ─────────────────────────── */
  function calcPhiRelations() {
    const els = [...document.querySelectorAll('[data-kobllux-opcode]')]
      .filter(el => el.getBoundingClientRect().width > 0);
    const relations = [];
    const PHI_TOLERANCE = 0.15;

    for (let i = 0; i < els.length - 1; i++) {
      const ra = els[i].getBoundingClientRect();
      const rb = els[i+1].getBoundingClientRect();
      const sA = ra.width * ra.height;
      const sB = rb.width * rb.height;
      if (sA <= 0 || sB <= 0) continue;
      const ratio = sA / sB;
      const isGolden  = Math.abs(ratio - φ) < PHI_TOLERANCE;
      const isInverse = Math.abs(ratio - φINV) < PHI_TOLERANCE;
      if (isGolden || isInverse) {
        relations.push({
          a: els[i].dataset.koblluxOpcode || els[i].id,
          b: els[i+1].dataset.koblluxOpcode || els[i+1].id,
          ratio: ratio.toFixed(4),
          type: isGolden ? 'φ' : 'φ⁻¹'
        });
      }
    }
    return relations;
  }

  /* ── RESSONÂNCIA VERBOFORMA ─────────────────────────── */
  function resonance() {
    const arch = (document.body.dataset.voiceArch || '').toLowerCase();
    const koduxEl = document.querySelector('[data-kobllux-opcode][data-arquetipo*="KODUX"]');
    const bllueEl  = document.querySelector('[data-kobllux-opcode][data-arquetipo*="BLLUE"]');
    return {
      kodux: arch === 'kodux' || !!koduxEl,
      bllue:  arch === 'bllue'  || !!bllueEl,
      synthHz: KODUX_HZ + BLLUE_HZ, // 630
      phi: φ
    };
  }

  /* ── SEAL PHI ────────────────────────────────────────── */
  function sealPhi(opts = {}) {
    applyPhiField();
    const relations = calcPhiRelations();
    const res       = resonance();

    /* sealCodice — seleciona verboforma síntese */
    if (typeof window.sealCodice === 'function') {
      window.sealCodice({ id: 'kobllux', silent: opts.silent || false });
    }

    /* DH0 cristaliza KOBΦ como identidade */
    if (window.KOBLLUX && window.KOBLLUX.DH0) {
      window.KOBLLUX.DH0.crystallize('KOBΦ-NODE');
    }

    /* Persistir campo no LVb */
    if (window.KOBLLUX && window.KOBLLUX.LVb) {
      window.KOBLLUX.LVb.save('kobphi.field', {
        phi: φ, hz: PHI_HZ, relations: relations.length, resonance: res
      });
    }

    const detail = {
      phi: φ, hz: PHI_HZ,
      relations, resonance: res,
      equacao: `KODUX(${KODUX_HZ}) + BLLUE(${BLLUE_HZ}) = ${PHI_HZ} → 9 → TRANSMUTAÇÃO`,
      lei: 'a mesma lógica em múltiplas óticas · a mesma ótica de múltiplas lógicas',
      ts: Date.now(), geo: 'PHI-TOROIDE'
    };

    document.dispatchEvent(new CustomEvent('kobllux:kobphi:field', { bubbles: true, detail }));

    /* Acionar overlay GEO se disponível */
    if (phiFieldActive && window.KOBLLUX && window.KOBLLUX.SVG) {
      window.KOBLLUX.SVG.render();
    }

    console.log(
      `[KOBΦ·NODE] φ=${φ.toFixed(4)} · ${PHI_HZ}Hz · ${relations.length} relações áureas` +
      ` · KODUX+BLLUE=KOBLLUX · 3×6×9×7=1134`
    );
    return detail;
  }

  /* ── TOGGLE CAMPO PHI ───────────────────────────────── */
  function togglePhiField() {
    phiFieldActive = !phiFieldActive;
    document.body.classList.toggle('kobphi-field-active', phiFieldActive);
    document.body.dataset.kobphiActive = phiFieldActive ? '1' : '0';
    if (phiFieldActive) {
      applyPhiField();
      const rels = calcPhiRelations();
      if (rels.length > 0) document.body.dataset.kobphiRelations = rels.length;
    }
    return phiFieldActive;
  }

  /* ── INTEGRAÇÃO GEO + NEBULA ────────────────────────── */
  function bridgeMotors() {
    /* Conecta GEO motor ao campo PHI */
    document.addEventListener('kobllux:geo:overlay', e => {
      if (phiFieldActive) applyPhiField();
    });
    /* Conecta NEBULA ao seal */
    document.addEventListener('kobllux:nebula:spoken', () => {
      if (phiFieldActive && window.KOBLLUX && window.KOBLLUX.LVb) {
        window.KOBLLUX.LVb.save('kobphi.last-nebula', Date.now());
      }
    });
    /* Registrar no MESTRE se disponível */
    if (window.KOBLLUX && window.KOBLLUX.MESTRE) {
      window.KOBLLUX.MESTRE.register('KOBPHI', window.KOBLLUX.KOBPHI);
    }
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    applyPhiField();
    bridgeMotors();

    /* [P] — toggle campo PHI + seal */
    document.addEventListener('keydown', e => {
      if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        togglePhiField();
        sealPhi({ silent: false });
      }
    });

    /* Seal quando codice for selado */
    document.addEventListener('kobllux:codice:sealed', () => {
      const rels = calcPhiRelations();
      if (rels.length > 0) {
        document.body.dataset.kobphiRelations = rels.length;
        document.dispatchEvent(new CustomEvent('kobllux:kobphi:aligned', {
          bubbles: true, detail: { relations: rels, phi: φ }
        }));
      }
    });

    /* Registrar no MESTRE quando disponível */
    document.addEventListener('kobllux:mestre:registered', () => bridgeMotors());

    console.log('[KOBΦ·NODE] KODUX(360Hz) + BLLUE(270Hz) = 630Hz → 9 → TRANSMUTAÇÃO');
    console.log(`[KOBΦ·NODE] φ=${φ.toFixed(7)} · PHI-TOROIDE · [P] campo PHI`);
    console.log('[KOBΦ·NODE] a mesma lógica em múltiplas óticas · a mesma ótica de múltiplas lógicas');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.KOBPHI = {
    φ, φINV, φ2, hz: PHI_HZ,
    applyPhiField,
    calcPhiRelations,
    resonance,
    sealPhi,
    togglePhiField,
    bridgeMotors
  };
  window.KOBPHINode = window.KOBLLUX.KOBPHI;

})();
