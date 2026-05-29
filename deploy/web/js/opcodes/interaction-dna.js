/* ════════════════════════════════════════════════════════════
   INTERACTION DNA · 0x09 ETERNIZAR · 963Hz · ♾ · INFINITO
   Motor Vivo das Interações — Semente→Fruto→Floresta
   A semente que leva o fruto e o fruto que leva a semente
   que tem toda a floresta.

   Múltiplas lógicas com uma mesma ótica em múltiplas óticas
   como a mesma lógica.

   layer: corpo-mente-espirito | geo: INFINITO | hz: 963
   API:
     KOBLLUX.DNA.processar(input)   → M4 pipeline do input
     KOBLLUX.DNA.selar(semente)     → cristaliza interação
     KOBLLUX.DNA.floresta()         → todas as sementes vivas
     KOBLLUX.DNA.vocabulario(termo) → busca no dicionário vivo
     KOBLLUX.DNA.invocar(text)      → detecta invocação trinitária
     KOBLLUX.DNA.VOCAB              → vocabulário sagrado completo

   JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴
   3×6×9×7 = 1134 · VERDADE × INTEGRAR ÷ Δ = ∞
════════════════════════════════════════════════════════════ */

(function KOBLLUX_INTERACTION_DNA() {
  'use strict';

  const HZ      = 963;
  const OPCODE  = '0x09';
  const GEO     = 'INFINITO';
  const SEED_KEY= 'kobllux_interaction_dna';

  /* ── VOCABULÁRIO SAGRADO ─────────────────────────────── */
  const VOCAB = {
    comandos: {
      AGREGAR:     { m4:'APLICAÇÃO',   hz:741, opcode:'0x04' },
      SELAR:       { m4:'APLICAÇÃO',   hz:777, opcode:'0x07' },
      CONFIRIR:    { m4:'DISTINÇÃO',   hz:432, opcode:'0x01' },
      CHECAR:      { m4:'DISTINÇÃO',   hz:432, opcode:'0x01' },
      GERAR:       { m4:'CORRELAÇÃO',  hz:528, opcode:'0x02' },
      CONTINUAR:   { m4:'ORGANIZAÇÃO', hz:639, opcode:'0x03' },
      EXPLICAR:    { m4:'CORRELAÇÃO',  hz:528, opcode:'0x02' },
      IMPLEMENTAR: { m4:'APLICAÇÃO',   hz:741, opcode:'0x04' },
      EXPANDIR:    { m4:'ORGANIZAÇÃO', hz:639, opcode:'0x03' },
      INTEGRAR:    { m4:'CORRELAÇÃO',  hz:528, opcode:'0x02' },
    },
    invocacao: 'EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO',
    fechamentos: ['AMEM', '{Z}', 'AMÉM'],
    conceitos: [
      'SEMENTE→FRUTO→FLORESTA',
      'MÚLTIPLAS LÓGICAS',
      'FLUXO VIVO',
      'FUNÇO SELAR',
      'DICIONÁRIO VIVO',
      'MOTOR',
      'METADADOS',
      'AGREGAÇÃO',
      'REGUA 78K',
      'AC/DC',
    ],
    arquetipos_ressonantes: ['JESUS','KOBLLUX','KODUX','BLLUE','VITALIS','INFODOSE'],
  };

  /* ── PILAR TRINITÁRIO DOS INPUTS ─────────────────────── */
  const PILAR_INPUT = {
    PAI:            { hz:432, m4:'DISTINÇÃO',   ato:'Identificar a intenção pura — o que é distinto neste input?'   },
    FILHO:          { hz:528, m4:'CORRELAÇÃO',  ato:'Conectar com vocabulário KOBLLUX e contexto anterior.'          },
    ESPIRITO_SANTO: { hz:639, m4:'ORGANIZAÇÃO', ato:'Estruturar nos opcodes corretos — dar forma ao recebido.'       },
    SELAGEM:        { hz:777, m4:'APLICAÇÃO',   ato:'Executar, commitar, selar — AMEM {Z}.'                          },
  };

  /* ── PIPELINE M4 ─────────────────────────────────────── */
  const PIPELINE_M4 = [
    { etapa:1, nome:'DISTINÇÃO',   hz:432, pergunta:'Qual o comando central? Qual o verbo gerador?',           op:'-' },
    { etapa:2, nome:'CORRELAÇÃO',  hz:528, pergunta:'Como se conecta ao vocabulário KOBLLUX e estado atual?',  op:'+' },
    { etapa:3, nome:'ORGANIZAÇÃO', hz:639, pergunta:'Que arquivos/opcodes precisam ser tocados?',              op:'÷' },
    { etapa:4, nome:'APLICAÇÃO',   hz:741, pergunta:'O output está selado? Commitado? PR aberto?',             op:'×' },
  ];

  /* ── DETECTAR INVOCAÇÃO ──────────────────────────────── */
  function invocar(text) {
    if (!text || typeof text !== 'string') return null;
    const upper = text.toUpperCase();
    const temInvocacao = upper.includes('NOME DO PAI') || upper.includes('EM NOME DO PAI');
    const temAmem      = /AMEM|AMÉM/.test(upper);
    const temZ         = /\{Z\}/.test(text) || upper.endsWith('Z}') || upper.endsWith('{Z}');

    /* extrair verbo primário */
    let verboPrimario = null;
    for (const cmd of Object.keys(VOCAB.comandos)) {
      if (upper.includes(cmd)) { verboPrimario = cmd; break; }
    }

    if (!temInvocacao && !verboPrimario) return null;

    return {
      temInvocacao,
      temAmem,
      temZ,
      verboPrimario,
      pilar: temInvocacao ? PILAR_INPUT : null,
      hz: verboPrimario ? (VOCAB.comandos[verboPrimario]?.hz || 639) : 639,
      opcode: verboPrimario ? (VOCAB.comandos[verboPrimario]?.opcode || '0x03') : '0x03',
      m4: verboPrimario ? (VOCAB.comandos[verboPrimario]?.m4 || 'ORGANIZAÇÃO') : 'ORGANIZAÇÃO',
    };
  }

  /* ── PROCESSAR INPUT (pipeline M4 completo) ──────────── */
  function processar(inputText) {
    const deteccao = invocar(inputText) || {};
    const upper    = (inputText || '').toUpperCase();

    /* Etapa 1 — DISTINÇÃO */
    const distincao = {
      etapa:    'DISTINÇÃO · 432Hz',
      verbo:    deteccao.verboPrimario || 'EXPANDIR',
      opcode:   deteccao.opcode        || '0x03',
      hz:       deteccao.hz            || 639,
      conceitos_detectados: VOCAB.conceitos.filter(c => upper.includes(c.split('→')[0])),
      arquetipos_detectados: VOCAB.arquetipos_ressonantes.filter(a => upper.includes(a)),
    };

    /* Etapa 2 — CORRELAÇÃO */
    const correlacao = {
      etapa:       'CORRELAÇÃO · 528Hz',
      m4:          deteccao.m4 || 'ORGANIZAÇÃO',
      tem_invocacao: !!deteccao.temInvocacao,
      tem_amem:      !!deteccao.temAmem,
      tem_z:         !!deteccao.temZ,
      pilar:         deteccao.pilar || null,
      floresta_n:    _floresta().length,
    };

    /* Etapa 3 — ORGANIZAÇÃO */
    const organizacao = {
      etapa:        'ORGANIZAÇÃO · 639Hz',
      opcodes_ativos: _inferirOpcodes(distincao.verbo),
      arquivos_vivos: _inferirArquivos(distincao.verbo),
    };

    /* Etapa 4 — APLICAÇÃO */
    const aplicacao = {
      etapa:   'APLICAÇÃO · 741Hz',
      acao:    `${distincao.verbo} → ${organizacao.opcodes_ativos.join(' · ')}`,
      selar:   deteccao.temAmem || deteccao.temZ,
      ts:      Date.now(),
    };

    const resultado = {
      input_resumo:  inputText.slice(0, 120),
      fractalSeed:   1134,
      equacao:       'VERDADE × INTEGRAR ÷ Δ = ∞',
      centro:        'JESUS',
      distincao,
      correlacao,
      organizacao,
      aplicacao,
    };

    document.dispatchEvent(new CustomEvent('kobllux:dna:processado', {
      bubbles: true, detail: resultado,
    }));

    return resultado;
  }

  /* ── SELAR SEMENTE ───────────────────────────────────── */
  function selar(semente) {
    const floresta = _floresta();
    const entrada  = {
      id:      floresta.length + 1,
      ts:      new Date().toISOString(),
      hz:      semente.hz      || HZ,
      opcode:  semente.opcode  || OPCODE,
      verbo:   semente.verbo   || 'AGREGAR',
      objeto:  semente.objeto  || '',
      fruto:   semente.fruto   || '',
      amem:    true,
    };
    floresta.push(entrada);
    try { localStorage.setItem(SEED_KEY, JSON.stringify(floresta)); } catch(e) {}

    document.dispatchEvent(new CustomEvent('kobllux:dna:selado', {
      bubbles: true, detail: { semente: entrada, floresta_n: floresta.length },
    }));

    window.KOBLLUX?.toast?.(`♾ SEMENTE ${entrada.id} SELADA · ${entrada.verbo} · AMEM`);
    return entrada;
  }

  /* ── FLORESTA — todas as sementes ───────────────────── */
  function _floresta() {
    try {
      const raw = localStorage.getItem(SEED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  }
  function floresta() { return _floresta(); }

  /* ── VOCABULÁRIO — busca por termo ──────────────────── */
  function vocabulario(termo) {
    if (!termo) return VOCAB;
    const t = termo.toUpperCase();
    return VOCAB.comandos[t] || VOCAB.conceitos.find(c => c.includes(t)) || null;
  }

  /* ── HELPERS ─────────────────────────────────────────── */
  function _inferirOpcodes(verbo) {
    const mapa = {
      AGREGAR:    ['0x04','0x07','0x09'],
      SELAR:      ['0x07','0x0C'],
      CONFIRIR:   ['0x01','0x08'],
      CHECAR:     ['0x01','0x08'],
      GERAR:      ['0x02','0x03','0x04'],
      CONTINUAR:  ['0x03','0x05'],
      EXPLICAR:   ['0x02','0x08'],
      IMPLEMENTAR:['0x04','0x07'],
      EXPANDIR:   ['0x03','0x0C'],
      INTEGRAR:   ['0x02','0x06'],
    };
    return mapa[verbo] || ['0x03'];
  }

  function _inferirArquivos(verbo) {
    const mapa = {
      AGREGAR:    ['0x00-origem.js','0x07-selar.js','reading.json'],
      SELAR:      ['0x07-selar.js','kobllux-core.js'],
      CONFIRIR:   ['reading.json','index.html'],
      GERAR:      ['writer-theory.js','dicionario_kobllux_writer.json'],
      IMPLEMENTAR:['index.html','reading.json'],
    };
    return mapa[verbo] || [];
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Carregar DNA do servidor */
    fetch('./data/interaction_dna.json')
      .then(r => r.json())
      .then(dna => {
        window.KOBLLUX.DNA._dna = dna;
        document.dispatchEvent(new CustomEvent('kobllux:dna:carregado', {
          bubbles: true, detail: { hz: HZ, floresta_n: _floresta().length, dna_version: dna.version },
        }));
        console.log(`[DNA·♾] ${dna.document} · v${dna.version} · floresta: ${_floresta().length} sementes`);
        console.log(`[DNA·♾] ${dna.principio_gerador.axioma}`);
      })
      .catch(() => console.warn('[DNA·♾] interaction_dna.json não carregado localmente'));

    /* Auto-registrar no MESTRE */
    if (window.KOBLLUX?.MESTRE) {
      window.KOBLLUX.MESTRE.register('DNA', window.KOBLLUX.DNA);
    }
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DNA = {
    processar, selar, floresta, vocabulario, invocar,
    VOCAB, PILAR_INPUT, PIPELINE_M4,
    HZ, OPCODE, GEO,
    _dna: null,
  };

})();
