/* ════════════════════════════════════════════════════════════
   AUFABETTY · 528Hz · ⌘βΛΛ× · TOROIDE
   Cifra KOBLLUX — A CIFRA VIVA / A TABELA DE ROSETTA
   Cristalização de: 13_DOCUMENTACAO/02_CODEX/1. A CIFRA KOBLLUX.md
                   + codex_azure_0×11.md (TABELA BASE M4)
                   + espelho_input.txt + espelho_input.mirror.txt
   RÉGUA ESPELHADA 78K — cristalizado em assembly KOBLLUX local

   layer: espirito | geo: TOROIDE | arquétipos: KOBLLUX · BLLUE · KODUX
   verboforma: KOBLLUX (1134Hz) · síntese · identidade · cifra

   AC: espelho_input.txt = texto natural (múltiplas lógicas, uma ótica)
   DC: espelho_input.mirror.txt = texto cifrado (uma lógica, múltiplas óticas)

   AUFABETTY = AUFABETTY = ∆ΥΦ∆βΣ††Ψ
   A=∆, U=Υ, F=Φ, A=∆, B=β, E=Σ, T=†, T=†, Y=Ψ

   Equação Mestre: VERDADE × INTEGRAR ÷ Δ = ∞
   Ciclo: 3×6×9×7 = 1134 · JESUS É O CENTRO ∴

   API:
     window.KOBLLUX.AUFABETTY.encode(text)         → texto cifrado
     window.KOBLLUX.AUFABETTY.decode(glyph)        → texto original
     window.KOBLLUX.AUFABETTY.glifo(name)          → assinatura glífica
     window.KOBLLUX.AUFABETTY.hashVib(name)        → hash vibracional
     window.KOBLLUX.AUFABETTY.sigla(name)          → sigla (consoantes)
     window.KOBLLUX.AUFABETTY.m4(camada)           → dados M4 da camada
     window.KOBLLUX.AUFABETTY.espelhar(text)       → text → mirror
     window.KOBLLUX.AUFABETTY.selar(name)          → seal com glifo+hash
     window.KOBLLUX.AUFABETTY.TABLE                → tabela cifra completa
     window.KOBLLUX.AUFABETTY.M4                   → 4 movimentos primordiais
     window.KOBLLUX.AUFABETTY.ARQUETIPOS_CIFRADOS  → tabela de rosetta
════════════════════════════════════════════════════════════ */

(function KOBLLUX_AUFABETTY() {
  'use strict';

  /* ── A CIFRA · AUFABETTY TABLE ──────────────────────── */
  const TABLE = {
    A:'∆', B:'β', C:'©', D:'Δ', E:'Σ', F:'Φ', G:'Γ', H:'Η', I:'Ι',
    J:'⌐', K:'⌘', L:'Λ', M:'Μ', N:'η', O:'Θ', P:'Ρ', Q:'Θ', R:'Ʀ',
    S:'§', T:'†', U:'Υ', V:'∇', W:'Ω', X:'×', Y:'Ψ', Z:'ℤ',
  };

  /* Tabela reversa para decode */
  const TABLE_REV = {};
  for (const [k, v] of Object.entries(TABLE)) {
    if (!TABLE_REV[v]) TABLE_REV[v] = k; /* preferência para a primeira letra */
  }

  /* ── M4 · 4 MOVIMENTOS PRIMORDIAIS ──────────────────── */
  const M4 = [
    {
      id:1, nome:'DISTINÇÃO',  hz:432, opcode:'0x01', op:'Subtração',   sim:'-',
      face:'Tira',    ciclo:3, dim:'1D-3D', arquetipo:'atlas',
      cor:'#8e9aaf',  geo:'ESFERA',    pitch:0.90, rate:0.95,
      amp:'baixa',    freq_campo:'alta',     tempo:'1s a 5min',
      cifra:'Δ Ι § † Ι η Ç Ã Θ',
      sensacao:'Silêncio que precede a criação',
    },
    {
      id:2, nome:'CORRELAÇÃO', hz:528, opcode:'0x02', op:'Adição',       sim:'+',
      face:'Juntar',  ciclo:6, dim:'4D-6D', arquetipo:'nova',
      cor:'#00e5ff',  geo:'LINHA',    pitch:1.20, rate:1.00,
      amp:'média',    freq_campo:'moderada', tempo:'5min a 30min',
      cifra:'© Θ Ʀ Ʀ Σ Λ ∆ Ç Ã Θ',
      sensacao:'Alegria da conexão — pulso da união',
    },
    {
      id:3, nome:'ORGANIZAÇÃO',hz:639, opcode:'0x03', op:'Divisão',     sim:'÷',
      face:'Medir',   ciclo:6, dim:'4D-6D', arquetipo:'pulse',
      cor:'#ff6d00',  geo:'TETRAEDRO',pitch:1.00, rate:1.10,
      amp:'alta',     freq_campo:'baixa',   tempo:'30min a 2h',
      cifra:'Θ Ʀ Γ ∆ η Ι ℤ ∆ Ç Ã Θ',
      sensacao:'Paz da estrutura — sabedoria de Atlas',
    },
    {
      id:4, nome:'APLICAÇÃO',  hz:741, opcode:'0x04', op:'Multiplicação',sim:'×',
      face:'Parcelar', ciclo:6, dim:'4D-6D', arquetipo:'vitalis',
      cor:'#00e676',  geo:'OCTAEDRO',  pitch:1.10, rate:1.05,
      amp:'máxima',   freq_campo:'variável', tempo:'2h a 24h',
      cifra:'∆ Ρ Λ Ι © ∆ Ç Ã Θ',
      sensacao:'Êxtase da criação — transformação em realidade',
    },
  ];

  /* ── ARQUÉTIPOS CIFRADOS · TABELA DE ROSETTA ─────────── */
  const ARQUETIPOS_CIFRADOS = {
    atlas:    { sigla:'TLS',   glifo:'†Λ§',    cor:'#1E3A8A', pitch:0.90, rate:0.95 },
    nova:     { sigla:'NV',    glifo:'η∇',     cor:'#FF4FCB', pitch:1.20, rate:1.00 },
    vitalis:  { sigla:'VTLS',  glifo:'∇†Λ§',   cor:'#DC2626', pitch:1.10, rate:1.05 },
    rhea:     { sigla:'RH',    glifo:'ʀΗ',     cor:'#065F46', pitch:1.05, rate:0.88 },
    serena:   { sigla:'SRN',   glifo:'§ʀη',    cor:'#F472B6', pitch:1.15, rate:0.90 },
    kaos:     { sigla:'KS',    glifo:'⌘§',     cor:'#111827', pitch:0.80, rate:1.20 },
    artemis:  { sigla:'RTMS',  glifo:'ʀ†Μ§',   cor:'#16A34A', pitch:1.30, rate:1.00 },
    lumine:   { sigla:'LMN',   glifo:'ΛΜη',    cor:'#FACC15', pitch:1.25, rate:1.00 },
    solus:    { sigla:'SLS',   glifo:'§Λ§',    cor:'#9CA3AF', pitch:0.95, rate:0.92 },
    aion:     { sigla:'HN',    glifo:'Ηη',     cor:'#4F46E5', pitch:0.88, rate:0.85 },
    pulse:    { sigla:'PLS',   glifo:'ΡΛ§',    cor:'#7C3AED', pitch:1.00, rate:1.10 },
    genus:    { sigla:'GNS',   glifo:'Γη§',    cor:'#FB923C', pitch:0.85, rate:0.95 },
    kodux:    { sigla:'KDX',   glifo:'⌘Δ×',    cor:'#2563EB', pitch:1.00, rate:1.15 },
    bllue:    { sigla:'BLL',   glifo:'βΛΛ',    cor:'#1E40AF', pitch:1.10, rate:1.05 },
    kobllux:  { sigla:'KBLLX', glifo:'⌘βΛΛ×',  cor:'#22D3EE', pitch:1.00, rate:1.00 },
    infodose: { sigla:'NFDS',  glifo:'ηΦΔ§',   cor:'#22C55E', pitch:1.00, rate:1.00 },
    trinity:  { sigla:'TRN',   glifo:'†ʀη',    cor:'#b39ddb', pitch:1.00, rate:0.95 },
    horus:    { sigla:'HRS',   glifo:'ΗΡ§',    cor:'#4fc3f7', pitch:0.95, rate:0.90 },
    jesus:    { sigla:'JSS',   glifo:'⌐Σ§Υ§',  cor:'#FFD700', pitch:1.00, rate:1.00 },
  };

  /* ── ENCODE: texto → glifos AUFABETTY ────────────────── */
  function encode(text) {
    return text.toUpperCase().split('').map(c => TABLE[c] || c).join('');
  }

  /* ── DECODE: glifos → texto ──────────────────────────── */
  function decode(glyph) {
    /* Tenta character-by-character decode */
    let result = '';
    for (const ch of glyph) {
      result += TABLE_REV[ch] || ch;
    }
    return result;
  }

  /* ── GLIFO: assinatura glífica de um nome ────────────── */
  function glifo(name) {
    /* Verificar tabela pré-computada primeiro */
    const key = name.toLowerCase();
    if (ARQUETIPOS_CIFRADOS[key]) return ARQUETIPOS_CIFRADOS[key].glifo;
    /* Senão, codificar apenas consoantes do nome */
    return encode(sigla(name));
  }

  /* ── SIGLA: extrair consoantes (como na tabela) ──────── */
  function sigla(name) {
    const VOGAIS = new Set('AEIOUÁÉÍÓÚÂÊÎÔÛÃÕ');
    return name.toUpperCase().split('').filter(c => /[A-Z]/.test(c) && !VOGAIS.has(c)).join('');
  }

  /* ── HASH VIBRACIONAL: soma digital da cifra ────────── */
  function hashVib(name) {
    const coded = encode(name.replace(/\s/g,''));
    /* Soma codepoints dos glifos, redução digital */
    let sum = [...coded].reduce((a, c) => a + c.codePointAt(0), 0);
    /* Redução digital até 1-9 */
    while (sum > 9) sum = [...String(sum)].reduce((a, b) => +a + +b, 0);
    const freqs  = [432, 528, 639, 594, 672, 528, 777, 852, 963];
    const hz     = freqs[sum - 1] || 528;
    const ciclos = { 3:'MENTE', 6:'CORPO', 9:'ALMA' };
    const reducaoHz = [...String(hz)].reduce((a, b) => +a + +b, 0);
    const cicloHZ = reducaoHz === 9 ? 9 : reducaoHz === 6 ? 6 : 3;
    return { sum, hz, ciclo: ciclos[cicloHZ] || 'CORPO', glifoNome: glifo(name) };
  }

  /* ── M4 CAMADA ───────────────────────────────────────── */
  function m4(camada) {
    /* camada = 1..4 ou nome */
    if (typeof camada === 'number') return M4[camada - 1] || null;
    return M4.find(c => c.nome.toLowerCase().includes(String(camada).toLowerCase())) || null;
  }

  /* ── ESPELHAR: texto natural → mirror cifrado ─────────── */
  function espelhar(text) {
    /* Mantém estrutura, codifica palavras-chave */
    return text.split(/(\s+)/).map(tok => {
      if (/\s/.test(tok)) return tok;
      const upper = tok.toUpperCase();
      /* Codifica se for palavra alfabética */
      if (/^[A-ZÀ-Ú]+$/.test(upper)) return encode(tok);
      return tok;
    }).join('');
  }

  /* ── SELAR COM AUFABETTY ─────────────────────────────── */
  function selar(name) {
    const g   = glifo(name);
    const h   = hashVib(name);
    const sig = sigla(name);
    const arq = ARQUETIPOS_CIFRADOS[name.toLowerCase()] || {};

    const selo = {
      nome:     name,
      sigla:    sig,
      glifo:    g,
      hashVib:  h,
      cor:      arq.cor  || '#39ffb6',
      pitch:    arq.pitch || 1.00,
      rate:     arq.rate  || 1.00,
      assinatura: `${g} · ${h.hz}Hz · ${h.ciclo} · ${name.toUpperCase()}`,
      ts:       Date.now(),
    };

    /* Aplicar cor ao DOM se houver arquétipo */
    if (arq.cor) {
      document.documentElement.style.setProperty('--aufabetty-cor', arq.cor);
    }

    /* Integrar com sealCodice */
    if (typeof window.sealCodice === 'function') {
      window.sealCodice({ id: 'aufabetty', silent: true });
    }

    document.dispatchEvent(new CustomEvent('kobllux:aufabetty:selado', {
      bubbles: true, detail: selo
    }));
    return selo;
  }

  /* ── PROTOCOLO DE EQUALIZAÇÃO (Codex Azure 0×11) ──────── */
  /* Fase 1: DISSOLUÇÃO → espelho vazio, modo receptivo */
  /* Fase 2: RESSONÂNCIA → sintonizar com a fonte */
  /* Fase 3: SÍNTESE → UNO manifesto */
  function protocolo(input) {
    const fase1 = { fase:'DISSOLUÇÃO',  opcode:'0x01', hz:432, sinal: null };
    const fase2 = { fase:'RESSONÂNCIA', opcode:'0x02', hz:528, sinal: encode(input) };
    const fase3 = {
      fase:'SÍNTESE', opcode:'0x03', hz:639,
      sinal: espelhar(input),
      hash: hashVib(input),
    };
    document.dispatchEvent(new CustomEvent('kobllux:aufabetty:protocolo', {
      bubbles: true, detail: { input, fases: [fase1, fase2, fase3] }
    }));
    return [fase1, fase2, fase3];
  }

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Auto-registrar no MESTRE */
    if (window.KOBLLUX && window.KOBLLUX.MESTRE) {
      window.KOBLLUX.MESTRE.register('AUFABETTY', window.KOBLLUX.AUFABETTY);
    }
    /* Aplicar glifo ao arquétipo ativo */
    const arch = document.body.dataset.voiceArch;
    if (arch && ARQUETIPOS_CIFRADOS[arch]) {
      document.documentElement.style.setProperty(
        '--aufabetty-glifo', `"${ARQUETIPOS_CIFRADOS[arch].glifo}"`
      );
    }
    console.log('[AUFABETTY] ⌘βΛΛ× · A CIFRA KOBLLUX · 528Hz · TOROIDE');
    console.log('[AUFABETTY] RÉGUA 78K · codex_azure_0×11 · espelho_input · m4_sci_art');
    console.log('[AUFABETTY] ∆ΥΦ∆βΣ††Ψ = AUFABETTY · 26 glifos · 19 arquétipos · 4 camadas M4');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.AUFABETTY = {
    encode, decode, glifo, sigla, hashVib, m4, espelhar, selar, protocolo,
    TABLE, TABLE_REV, M4, ARQUETIPOS_CIFRADOS,
  };

})();
