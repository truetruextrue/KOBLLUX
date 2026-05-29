/* ════════════════════════════════════════════════════════════
   0x02 PIPELINE · 528Hz · ― · PLANO
   Motor de pipeline de integração — 3 estágios sequenciais
   Cristalização de: inline-000.js · inline-0.js · inline-1.js
   (oi-Dual · diHome · KOBLLUX PIPELINE)
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: mente | geo: PLANO | arquétipos: ATLAS · INFODOSE
   verboforma: INFODOSE (450Hz) · garganta · verbo · gota

   AC→DC: inline-000 (detecção) → inline-0 (integração) → inline-1 (fusão)
   Três ondas AC convergindo em sinal DC contínuo.

   MOTOR COMPARTILHADO — pipeline assíncrono de 3 estágios,
   cada estágio transforma e passa o sinal ao próximo.

   API:
     window.KOBLLUX.PIPELINE.run(data)       → Promise<result>
     window.KOBLLUX.PIPELINE.stage(n)        → fn do estágio n
     window.KOBLLUX.PIPELINE.addStage(fn)    → adiciona estágio
     window.KOBLLUX.PIPELINE.status()        → estado atual
     window.KOBLLUX.PIPELINE.reset()         → reinicia pipeline
════════════════════════════════════════════════════════════ */

(function KOBLLUX_PIPELINE() {
  'use strict';

  /* ── ESTÁGIOS AC→DC ─────────────────────────────────── */
  /* Estágio 000: Detecção — varre o DOM, coleta sinais */
  function stage000_detect(data) {
    const dom = {
      opcodes:   [...document.querySelectorAll('[data-kobllux-opcode]')].length,
      scripts:   [...document.querySelectorAll('script[data-opcode]')].length,
      archetypes:[...document.querySelectorAll('[data-arquetipo]')].length,
      freq:      document.querySelectorAll('[data-freq]').length
    };
    return { ...data, stage: 0, dom, ts0: Date.now() };
  }

  /* Estágio 0: Integração — normaliza e estrutura os sinais */
  function stage0_integrate(data) {
    const arch  = document.body.dataset.voiceArch || 'kobllux';
    const opcode = document.body.dataset.koblluxOpcode || '0x02';
    const hz     = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--kob-hz') || '528'
    );
    return { ...data, stage: 1, arch, opcode, hz, ts1: Date.now() };
  }

  /* Estágio 1: Fusão — une sinais em sinal DC unificado */
  function stage1_fuse(data) {
    const pipeline_hz = (data.hz || 528);
    const reduction   = [...String(Math.round(pipeline_hz))].reduce((a, b) => +a + +b, 0);
    const fused = {
      ...data,
      stage: 2,
      pipeline_hz,
      reduction,
      ciclo: [3, 6, 9, 7][reduction % 4],
      duration: Date.now() - (data.ts0 || Date.now()),
      ts2: Date.now(),
      sealed: false
    };
    return fused;
  }

  /* ── PIPELINE ENGINE ────────────────────────────────── */
  const STAGES = [stage000_detect, stage0_integrate, stage1_fuse];
  let   currentStatus = 'idle';
  let   lastResult    = null;

  function addStage(fn) {
    if (typeof fn === 'function') STAGES.push(fn);
  }

  function stage(n) {
    return STAGES[n] || null;
  }

  function status() {
    return { status: currentStatus, stages: STAGES.length, lastResult };
  }

  function reset() {
    currentStatus = 'idle';
    lastResult    = null;
    document.dispatchEvent(new CustomEvent('kobllux:pipeline:reset', { bubbles: true }));
  }

  async function run(data = {}) {
    currentStatus = 'running';
    document.dispatchEvent(new CustomEvent('kobllux:pipeline:start', {
      bubbles: true, detail: { stages: STAGES.length, hz: 528 }
    }));

    let signal = { ...data, pipeline_id: Date.now().toString(36) };

    for (let i = 0; i < STAGES.length; i++) {
      try {
        const result = STAGES[i](signal);
        signal = result instanceof Promise ? await result : result;
        document.dispatchEvent(new CustomEvent(`kobllux:pipeline:stage:${i}`, {
          bubbles: true, detail: signal
        }));
      } catch (err) {
        currentStatus = 'error';
        console.warn(`[0x02·PIPELINE] Estágio ${i} falhou:`, err);
        break;
      }
    }

    /* Selar resultado */
    if (typeof window.sealCodice === 'function') {
      window.sealCodice({ id: 'infodose', silent: true });
    }
    if (window.KOBLLUX && window.KOBLLUX.LVb) {
      window.KOBLLUX.LVb.save('pipeline.last', signal);
    }

    signal.sealed  = true;
    currentStatus  = 'done';
    lastResult     = signal;

    document.dispatchEvent(new CustomEvent('kobllux:pipeline:done', {
      bubbles: true, detail: signal
    }));
    return signal;
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Executa pipeline no boot para marcar estado inicial */
    setTimeout(() => run(), 1200);
    console.log('[0x02·PIPELINE] ― INTEGRAR · 528Hz · 3 estágios AC→DC · inline-000+0+1 cristalizado');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.PIPELINE = { run, stage, addStage, status, reset, STAGES };

})();
