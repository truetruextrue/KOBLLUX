// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · STATE · 0x09 · ETERNIZAR · 963Hz · AION · ♾
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_STATE() {
  'use strict';
  const OPCODE = '0x09';
  const HZ = 963;
  const GEO = 'INFINITO';
  const ARQUETIPO = 'AION';
  const EVENTO = 'kobllux:dual:state:carregado';

  // Overlay inicial antes do primeiro arquétipo
  try { document.documentElement.style.setProperty('--arch-overlay', 'rgba(64,158,255,.22)'); } catch (_) {}

  // Helpers globais de seleção de DOM
  window.$ = window.$ || ((q, r) => (r || document).querySelector(q));
  window.$$ = window.$$ || ((q, r) => Array.from((r || document).querySelectorAll(q)));

  // Helper LocalStorage tipado
  window.LS = window.LS || {
    get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
    raw: (k) => localStorage.getItem(k) || ''
  };

  // Estado dual (performance, voz, log)
  const dualState = {
    perf: localStorage.getItem('hub.perf') || 'med',
    voice: localStorage.getItem('hub.voice') || 'Nova',
    logs: []
  };

  function dualLog(msg) {
    const entry = '[' + new Date().toLocaleTimeString() + '] ' + msg;
    dualState.logs.unshift(entry);
    const logsEl = document.getElementById('logs');
    if (logsEl) logsEl.textContent = dualState.logs.slice(0, 60).join('\n');
  }

  // Efeito ripple em botões
  function addRipple(el) {
    if (!el) return;
    if (!el.querySelector('.ripple')) {
      const slot = document.createElement('span');
      slot.className = 'ripple';
      el.appendChild(slot);
    }
  }

  // Sistema de toast
  const toastBox = document.createElement('div');
  toastBox.style.cssText = 'position:fixed;right:14px;bottom:calc(var(--tabsH) + 16px);display:grid;gap:8px;z-index:120';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(toastBox));
  } else {
    document.body.appendChild(toastBox);
  }

  window.toast = window.toast || function () {};

  function toast(msg, type) {
    type = type || 'ok';
    const el = document.createElement('div');
    el.className = 'fx-trans';
    const bg = type === 'ok'
      ? 'linear-gradient(90deg,#1b2a2a,#123c2e)'
      : type === 'warn'
        ? 'linear-gradient(90deg,#2f261b,#3c2d12)'
        : 'linear-gradient(90deg,#2f1b1b,#3c1212)';
    el.style.cssText = 'background:' + bg + '; color:var(--fg); border:' + getComputedStyle(document.documentElement).getPropertyValue('--bd') + '; padding:.6rem .8rem; border-radius:12px; box-shadow:var(--shadow)';
    el.textContent = msg;
    toastBox.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => el.remove(), 220);
    }, 1600);
  }

  window.dualLog = dualLog;
  window.addRipple = addRipple;
  window.toast = toast;

  // Namespace KOBLLUX
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.STATE = { dualState, dualLog, addRipple, toast, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-state', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.STATE }));
})();
