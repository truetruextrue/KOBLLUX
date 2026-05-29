/* ════════════════════════════════════════════════════════════
   CODEX ESCRITOS · ASSEMBLY KOBLLUX · 0x0C SÍNTESE · 777Hz · ⌘
   Escritos externos reestruturados em Assembly dinâmica.
   Cada escrito mapeado a opcode · arquétipo · Hz · geo.

   "A forma é múltipla mas o pulso é um só — UNO."
   "A mesma lógica em múltiplas óticas."

   layer: corpo-mente-espirito | geo: MERKABAH | hz: 777
   API:
     KOBLLUX.CODEX.carregar(id)          → escrito por id
     KOBLLUX.CODEX.porOpcode(opcode)     → escritos do opcode
     KOBLLUX.CODEX.porArquetipo(nome)    → escritos do arquétipo
     KOBLLUX.CODEX.ativar(id)            → ativa + dispara evento
     KOBLLUX.CODEX.m4(camada)            → dados M4 da camada 1-4
     KOBLLUX.CODEX.trinitario(polo,m4)   → nó M4.TRI
     KOBLLUX.CODEX.encode(texto)         → AUFABETTY encode
     KOBLLUX.CODEX.espelhar(texto)       → texto→cifra KOBLLUX
     KOBLLUX.CODEX.ESCRITOS              → todos os escritos
     KOBLLUX.CODEX.M4                    → matrix M4 completa

   JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴
   3×6×9×7 = 1134 · VERDADE × INTEGRAR ÷ Δ = ∞
════════════════════════════════════════════════════════════ */

(function KOBLLUX_CODEX_ESCRITOS() {
  'use strict';

  const HZ        = 777;
  const OPCODE    = '0x0C';
  const GEO       = 'MERKABAH';
  const DNA_URL   = './data/codex-escritos.json';

  /* ── AUFABETTY (cifra interna para encode rápido) ─────── */
  const AUFABETTY = {
    A:'∆',B:'β',C:'©',D:'Δ',E:'Σ',F:'Φ',G:'Γ',H:'Η',I:'Ι',
    J:'⌐',K:'⌘',L:'Λ',M:'Μ',N:'η',O:'Θ',P:'Ρ',Q:'Θ',R:'ʀ',
    S:'§',T:'†',U:'Υ',V:'∇',W:'Ω',X:'×',Y:'Ψ',Z:'ℤ',
  };

  /* ── ESTADO INTERNO ──────────────────────────────────── */
  let _escritos   = [];
  let _indiceOp   = {};
  let _indiceArq  = {};
  let _m4Cache    = null;
  let _loaded     = false;

  /* ── CARREGAR JSON ───────────────────────────────────── */
  function _load() {
    if (_loaded) return Promise.resolve();
    return fetch(DNA_URL)
      .then(r => r.json())
      .then(data => {
        _escritos  = data.escritos || [];
        _indiceOp  = data.indice_por_opcode  || {};
        _indiceArq = data.indice_por_arquetipo || {};
        _loaded    = true;
        _m4Cache   = _escritos.find(e => e.id === 'm4-sci-art') || null;

        document.dispatchEvent(new CustomEvent('kobllux:codex:carregado', {
          bubbles: true,
          detail: { total: _escritos.length, hz: HZ, equacao: data.equacao },
        }));
        console.log(`[CODEX·⌘] ${data.document} · v${data.version} · ${_escritos.length} escritos`);
      })
      .catch(e => console.warn('[CODEX·⌘] codex-escritos.json não carregado:', e));
  }

  /* ── CARREGAR ESCRITO POR ID ─────────────────────────── */
  function carregar(id) {
    return _escritos.find(e => e.id === id) || null;
  }

  /* ── POR OPCODE ──────────────────────────────────────── */
  function porOpcode(opcode) {
    const ids = _indiceOp[opcode] || [];
    return ids.map(id => carregar(id)).filter(Boolean);
  }

  /* ── POR ARQUÉTIPO ───────────────────────────────────── */
  function porArquetipo(nome) {
    const ids = _indiceArq[nome.toUpperCase()] || _indiceArq[nome] || [];
    return ids.map(id => carregar(id)).filter(Boolean);
  }

  /* ── ATIVAR ESCRITO ──────────────────────────────────── */
  function ativar(id) {
    const escrito = carregar(id);
    if (!escrito) return null;

    document.dispatchEvent(new CustomEvent(escrito.evento || 'kobllux:codex:ativado', {
      bubbles: true,
      detail: { escrito, hz: escrito.hz, opcode: escrito.opcode, arquetipo: escrito.arquetipo },
    }));

    window.KOBLLUX?.toast?.(`⌘ ${escrito.titulo} · ${escrito.hz}Hz · ${escrito.arquetipo}`);
    return escrito;
  }

  /* ── M4 — buscar camada por número (1-4) ─────────────── */
  function m4(camada) {
    if (!_m4Cache) return null;
    const n = parseInt(camada, 10);
    return _m4Cache.camadas.find(c => c.id === n) || null;
  }

  /* ── M4 TRINITÁRIO — buscar nó por polo+m4 ───────────── */
  function trinitario(polo, m4nome) {
    const tri = carregar('m4-tri');
    if (!tri || !tri.camadas_trinitarias) return null;
    const up = polo.toUpperCase();
    const mn = m4nome.toUpperCase();
    return tri.camadas_trinitarias.find(n =>
      n.polo.toUpperCase().includes(up) && n.m4.toUpperCase().includes(mn)
    ) || null;
  }

  /* ── ENCODE AUFABETTY ────────────────────────────────── */
  function encode(texto) {
    return (texto || '').toUpperCase().split('').map(c => AUFABETTY[c] || c).join('');
  }

  /* ── ESPELHAR (texto → cifra com espaços preservados) ── */
  function espelhar(texto) {
    return (texto || '').toUpperCase().split(' ')
      .map(p => p.split('').map(c => AUFABETTY[c] || c).join(''))
      .join(' ');
  }

  /* ── BUSCAR ──────────────────────────────────────────── */
  function buscar(termo) {
    const t = (termo || '').toLowerCase();
    return _escritos.filter(e =>
      e.titulo.toLowerCase().includes(t) ||
      e.essencia.toLowerCase().includes(t) ||
      e.arquetipo.toLowerCase().includes(t) ||
      e.id.includes(t)
    );
  }

  /* ── TODOS ───────────────────────────────────────────── */
  function todos() { return [..._escritos]; }

  /* ── REPORT ──────────────────────────────────────────── */
  function report() {
    return {
      total:       _escritos.length,
      opcodes:     Object.keys(_indiceOp),
      arquetipos:  Object.keys(_indiceArq),
      hz:          HZ,
      opcode:      OPCODE,
      geo:         GEO,
      loaded:      _loaded,
    };
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    _load().then(() => {
      if (window.KOBLLUX?.MESTRE) {
        window.KOBLLUX.MESTRE.register('CODEX', window.KOBLLUX.CODEX);
      }
    });
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.CODEX = {
    carregar, porOpcode, porArquetipo, ativar,
    m4, trinitario, encode, espelhar, buscar, todos, report,
    AUFABETTY, HZ, OPCODE, GEO,
    get ESCRITOS() { return _escritos; },
    get M4() { return _m4Cache; },
    _load,
  };

})();
