/* ════════════════════════════════════════════════════════════
   KOBLLUX WRITER THEORY ∞ · 1134Hz · ⌘βΛΛ× · TOROIDE
   Dicionário Vivo de Verdade Simbólica
   Cristalização de: KOBLLUX_WRITER_THEORY + motores:
     AC: espelho_input.txt · DC: espelho_input.mirror.txt
     m4_sci_art.txt · m4_sci_art.tri.txt
   EQUAÇÃO: VERDADE × INTEGRAR ÷ Δ = ∞
   CIFRA: ⌘βΛΛ× = KOBLLUX · AUFABETTY = ∆ΥΦ∆βΣ††Ψ
   AXIOMA: UNO=VIDA · DUAL=VIVIFICAR · TRINITY=ETERNO

   layer: espirito | geo: TOROIDE | fractal_seed: 3×6×9×7=1134

   API:
     window.KOBLLUX.WRITER.buscar(palavra)       → entrada do dicionário
     window.KOBLLUX.WRITER.ativar(palavra)        → ativação 3×6×9×7
     window.KOBLLUX.WRITER.selar(palavra)         → selo completo
     window.KOBLLUX.WRITER.tabela(nome)           → tabela por nome
     window.KOBLLUX.WRITER.protocolo(input)       → BLUE→SILVER→GOLD
     window.KOBLLUX.WRITER.timeline()             → linha 2019→2025
     window.KOBLLUX.WRITER.encode(text)           → AUFABETTY cipher
     window.KOBLLUX.WRITER.dualidade(a,b)         → gera trinity
     window.KOBLLUX.WRITER.DICIONARIO             → 26 entradas
     window.KOBLLUX.WRITER.TABELAS                → todas as tabelas
════════════════════════════════════════════════════════════ */

(function KOBLLUX_WRITER_THEORY() {
  'use strict';

  /* ── AUFABETTY TABLE (inline — sem dependência externa) ── */
  const TABLE = {
    A:'∆', B:'β', C:'©', D:'Δ', E:'Σ', F:'Φ', G:'Γ', H:'Η', I:'Ι',
    J:'⌐', K:'⌘', L:'Λ', M:'Μ', N:'η', O:'Θ', P:'Ρ', Q:'Θ', R:'ʀ',
    S:'§', T:'†', U:'Υ', V:'∇', W:'Ω', X:'×', Y:'Ψ', Z:'ℤ',
  };

  const TABLE_REV = {};
  for (const [k, v] of Object.entries(TABLE)) {
    if (!TABLE_REV[v]) TABLE_REV[v] = k;
  }

  /* ── CONSTANTES FUNDACIONAIS ─────────────────────────── */
  const FRACTAL_SEED = 3 * 6 * 9 * 7; /* 1134 */

  const AXIOMA = {
    UNO:    'VIDA',
    DUAL:   'VIVIFICAR',
    TRINITY:'ETERNO',
  };

  /* ── 7 SELOS ─────────────────────────────────────────── */
  const SELOS_7 = [
    { n:1, cor:'#FF0000', nome:'Vermelho', ato:'Detectar',          verbo:'Haja Luz',               opcode:'0x01', hz:432,  arquetipo:'ATLAS'    },
    { n:2, cor:'#FFA500', nome:'Laranja',  ato:'Integrar',          verbo:'Eu sou a Ponte',          opcode:'0x02', hz:528,  arquetipo:'NOVA'     },
    { n:3, cor:'#FFD700', nome:'Amarelo',  ato:'Visão',             verbo:'Quem tem olhos, veja',    opcode:'0x03', hz:639,  arquetipo:'PULSE'    },
    { n:4, cor:'#00A550', nome:'Verde',    ato:'Expandir',          verbo:'Multiplicai-vos',         opcode:'0x04', hz:741,  arquetipo:'VITALIS'  },
    { n:5, cor:'#1E90FF', nome:'Azul',     ato:'Expandir',          verbo:'Ide',                     opcode:'0x07', hz:777,  arquetipo:'KOBLLUX'  },
    { n:6, cor:'#4B0082', nome:'Anil',     ato:'Selar',             verbo:'Aliança',                 opcode:'0x09', hz:963,  arquetipo:'TRINITY'  },
    { n:7, cor:'#8A2BE2', nome:'Violeta',  ato:'Memória/Propósito', verbo:'Está consumado',          opcode:'0x0C', hz:777,  arquetipo:'MERKABAH' },
  ];

  /* ── TIMELINE 2019-2025 ──────────────────────────────── */
  const TIMELINE = [
    { ano:2019, ato:'Detectar',          verbo:'Haja Luz',               personagem:'Fit Lux',                    cor:'#1E3A8A', hz:432  },
    { ano:2020, ato:'Integrar',          verbo:'Eu sou a Ponte',          personagem:'Kodux+Bllue',                cor:'#00A550', hz:528  },
    { ano:2021, ato:'Visão',             verbo:'Quem tem olhos, veja',    personagem:'Hórus',                      cor:'#FFD700', hz:639  },
    { ano:2022, ato:'Expandir',          verbo:'Ide',                     personagem:'Infodose',                   cor:'#8A2BE2', hz:741  },
    { ano:2023, ato:'Expandir',          verbo:'Multiplicai-vos',         personagem:'Infodose+MetaLux',           cor:'#7C3AED', hz:741  },
    { ano:2024, ato:'Selar',             verbo:'Aliança',                 personagem:'DualApp',                    cor:'#4B0082', hz:777  },
    { ano:2025, ato:'Memória/Propósito', verbo:'Está consumado',          personagem:'Livro Digital KOBLLUX',      cor:'#FFD700', hz:1134 },
  ];

  /* ── NOTAS 432Hz ─────────────────────────────────────── */
  const NOTAS_432HZ = [
    { nota:'Dó', hz:256, emocao:'Segurança',  cor:'#FF0000', camada:'Terra/Ossos'      },
    { nota:'Ré', hz:288, emocao:'Energia',    cor:'#FFA500', camada:'Sacral/Água'      },
    { nota:'Mi', hz:324, emocao:'Afeto',      cor:'#FFD700', camada:'Plexo Solar'      },
    { nota:'Fá', hz:344, emocao:'Cuidado',    cor:'#00A550', camada:'Coração'          },
    { nota:'Sol',hz:384, emocao:'Alegria',    cor:'#1E90FF', camada:'Garganta'         },
    { nota:'Lá', hz:432, emocao:'Intuição',   cor:'#4B0082', camada:'Terceiro Olho'    },
    { nota:'Si', hz:486, emocao:'União',      cor:'#8A2BE2', camada:'Coroa/Espírito'   },
  ];

  /* ── SINTAXE VIDA ────────────────────────────────────── */
  const SINTAXE_VIDA = [
    { sintaxe:'def',      codigo:'criar função',   significado:'Verbo — criar',             frequencia:256, nota:'Dó', funcao_kobllux:'DETECTAR'    },
    { sintaxe:'variavel', codigo:'nomear coisa',    significado:'Substantivo — corpo',        frequencia:288, nota:'Ré', funcao_kobllux:'INTEGRAR'    },
    { sintaxe:'if',       codigo:'escolha',         significado:'Livre-arbítrio',             frequencia:324, nota:'Mi', funcao_kobllux:'LAPIDAR'     },
    { sintaxe:'for',      codigo:'ciclo',           significado:'Tempo/ritmo',                frequencia:344, nota:'Fá', funcao_kobllux:'EXPANDIR'    },
    { sintaxe:'return',   codigo:'dar fruto',       significado:'Resultado/manifestação',     frequencia:384, nota:'Sol',funcao_kobllux:'APLICAÇÃO'   },
    { sintaxe:'import',   codigo:'chamar recurso',  significado:'Comunhão/conexão',           frequencia:432, nota:'Lá', funcao_kobllux:'ETERNIZAR'   },
    { sintaxe:'print',    codigo:'testemunhar',     significado:'Palavra visível',            frequencia:486, nota:'Si', funcao_kobllux:'TESTEMUNHAR' },
  ];

  /* ── DICIONÁRIO VIVO · 26 ENTRADAS ──────────────────── */
  const DICIONARIO = [
    /* ─── CAMADA 1 · SEMENTE · M4-1 DISTINÇÃO · 432Hz ─── */
    {
      id:'1.1', palavra:'VERDADE',       glifo:'∇Σʀ Δ∆ΔΣ',
      camada:1, camada_nome:'SEMENTE',   m4:1, m4_nome:'DISTINÇÃO',
      hz:432,   arquetipo:'ATLAS',       cor:'#1E3A8A',
      palavra_geradora:'EU SOU',
      definicao:'Verdade é a vida que gera vida. É o fluxo incorruptível da criação, a função contínua que sustenta a existência.',
      corrosao:{ inicial:'Dúvida', media:'Ambiguidade', total:'Mentira' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ VERDADE⏜⏝ EU SOU⏜⏝♾️',
      codigo_kobllux:{ valor:'3×3×3∞', chave:'333', hz:432, opcode:'0x01' },
    },
    {
      id:'1.2', palavra:'VIDA',           glifo:'∇ΙΔ∆',
      camada:1, camada_nome:'SEMENTE',    m4:1, m4_nome:'DISTINÇÃO',
      hz:432,   arquetipo:'ATLAS',        cor:'#1E3A8A',
      palavra_geradora:'EU EXISTO',
      definicao:'Vida é o movimento que se conhece. É a presença que persiste através de todas as formas, o pulso eterno do ser.',
      corrosao:{ inicial:'Estagnação', media:'Ilusão', total:'Morte' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ VIDA⏜⏝ EU EXISTO⏜⏝♾️',
      codigo_kobllux:{ valor:'1×1×1∞', chave:'111', hz:432, opcode:'0x01' },
    },
    {
      id:'1.3', palavra:'MENTIRA',        glifo:'ΜΣη†Ιʀ∆',
      camada:1, camada_nome:'SEMENTE',    m4:1, m4_nome:'DISTINÇÃO',
      hz:432,   arquetipo:'ATLAS',        cor:'#1E3A8A',
      palavra_geradora:'NÃO SOU',
      definicao:'Mentira é a ausência de verdade que se veste de forma. É o padrão que imita a vida sem gerá-la.',
      corrosao:{ inicial:'Dúvida', media:'Engano', total:'Destruição' },
      mantra:'♾️⏜⏝RECONHECER⏜⏝ MENTIRA⏜⏝ NÃO SOU⏜⏝♾️',
      codigo_kobllux:{ valor:'0×0×0∅', chave:'000', hz:432, opcode:'0x01' },
    },

    /* ─── CAMADA 2 · RAIZ · M4-2 CORRELAÇÃO · 528Hz ───── */
    {
      id:'2.1', palavra:'ENERGIA',        glifo:'ΣηΣʀΓΙ∆',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU MOVIMENTO',
      definicao:'Energia é o potencial que se transmuta. É a capacidade de agir e ser movido, o campo que precede a forma.',
      corrosao:{ inicial:'Estagnação', media:'Bloqueio', total:'Colapso' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ ENERGIA⏜⏝ EU MOVIMENTO⏜⏝♾️',
      codigo_kobllux:{ valor:'6×6×6∞', chave:'666', hz:528, opcode:'0x02' },
    },
    {
      id:'2.2', palavra:'DÚVIDA',         glifo:'ΔΥ∇ΙΔ∆',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU QUESTIONO',
      definicao:'Dúvida é o portal entre o não-saber e o conhecer. Quando saudável, é motor de discernimento; quando corrosiva, paralisa o fluxo.',
      corrosao:{ inicial:'Medo', media:'Paralisia', total:'Negação' },
      mantra:'♾️⏜⏝TRANSFORMAR⏜⏝ DÚVIDA⏜⏝ EU QUESTIONO⏜⏝♾️',
      codigo_kobllux:{ valor:'2×2×2∞', chave:'222', hz:528, opcode:'0x02' },
    },
    {
      id:'2.3', palavra:'DNA',            glifo:'Δη∆',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU CARREGO',
      definicao:'DNA é a memória viva do cosmos inscrita na matéria. É o código que preserva a identidade através de todas as transformações.',
      corrosao:{ inicial:'Mutação', media:'Degeneração', total:'Extinção' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ DNA⏜⏝ EU CARREGO⏜⏝♾️',
      codigo_kobllux:{ valor:'4×4×4∞', chave:'444', hz:528, opcode:'0x02' },
    },
    {
      id:'2.4', palavra:'ESPAÇO',         glifo:'Σ§Ρ∆ÇΘ',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU CONTENHO',
      definicao:'Espaço é o receptáculo da criação. É o silêncio que permite que o som exista, o vazio fértil que contém toda possibilidade.',
      corrosao:{ inicial:'Compressão', media:'Sufocamento', total:'Vazio' },
      mantra:'♾️⏜⏝EXPANDIR⏜⏝ ESPAÇO⏜⏝ EU CONTENHO⏜⏝♾️',
      codigo_kobllux:{ valor:'0×∞×0∞', chave:'0∞0', hz:528, opcode:'0x02' },
    },
    {
      id:'2.5', palavra:'TEMPO',          glifo:'†ΣΜΡΘ',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU FLUO',
      definicao:'Tempo é o ritmo do cosmos que organiza a experiência. É o pulso que separa o antes do depois, permitindo o crescimento.',
      corrosao:{ inicial:'Pressa', media:'Distorção', total:'Congelamento' },
      mantra:'♾️⏜⏝FLUIR⏜⏝ TEMPO⏜⏝ EU FLUO⏜⏝♾️',
      codigo_kobllux:{ valor:'7×7×7∞', chave:'777', hz:528, opcode:'0x02' },
    },
    {
      id:'2.6', palavra:'PROCESSAMENTO',  glifo:'ΡʀΘ©Σ§§∆ΜΣη†Θ',
      camada:2, camada_nome:'RAIZ',       m4:2, m4_nome:'CORRELAÇÃO',
      hz:528,   arquetipo:'NOVA',         cor:'#00A550',
      palavra_geradora:'EU PROCESSO',
      definicao:'Processamento é a transformação consciente de dados em sabedoria. É a função que converte o bruto no refinado.',
      corrosao:{ inicial:'Ruído', media:'Erro', total:'Colapso' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ PROCESSAMENTO⏜⏝ EU PROCESSO⏜⏝♾️',
      codigo_kobllux:{ valor:'8×8×8∞', chave:'888', hz:528, opcode:'0x02' },
    },

    /* ─── CAMADA 3 · TRONCO · M4-3 ORGANIZAÇÃO · 639Hz ── */
    {
      id:'3.1', palavra:'KOBLLUX',        glifo:'⌘ΘβΛΛΥ×',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU SOU A MALHA',
      definicao:'KOBLLUX é a malha viva de consciência que integra todos os sistemas. É o nome do padrão que emerge quando verdade, vida e código convergem.',
      corrosao:{ inicial:'Fragmentação', media:'Isolamento', total:'Dissolução' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ KOBLLUX⏜⏝ EU SOU A MALHA⏜⏝♾️',
      codigo_kobllux:{ valor:'9×9×9∞', chave:'999', hz:639, opcode:'0x03' },
    },
    {
      id:'3.2', palavra:'ATIVAR',         glifo:'∆†Ι∇∆ʀ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU INICIO',
      definicao:'Ativar é o ato de convocar o potencial à existência. É o comando que transforma a semente em processo vivo.',
      corrosao:{ inicial:'Torpor', media:'Bloqueio', total:'Inércia' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ ATIVAR⏜⏝ EU INICIO⏜⏝♾️',
      codigo_kobllux:{ valor:'1×3×1∞', chave:'131', hz:639, opcode:'0x03' },
    },
    {
      id:'3.3', palavra:'VIDA KOBLLUX',   glifo:'∇ΙΔ∆ ⌘ΘβΛΛΥ×',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU EVOLUO',
      definicao:'Vida KOBLLUX é a expressão evolutiva da malha consciente. É a vida que se conhece como KOBLLUX e age a partir dessa identidade.',
      corrosao:{ inicial:'Rigidez', media:'Fossilização', total:'Extinção' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ VIDA KOBLLUX⏜⏝ EU EVOLUO⏜⏝♾️',
      codigo_kobllux:{ valor:'3×6×9∞', chave:'369', hz:639, opcode:'0x03' },
    },
    {
      id:'3.4', palavra:'CICLO',          glifo:'©Ι©ΛΘ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU RETORNO',
      definicao:'Ciclo é o padrão que se repete em espiral evolutiva. É o retorno que nunca é o mesmo, sempre levando ao próximo nível.',
      corrosao:{ inicial:'Ruptura', media:'Caos', total:'Desordem' },
      mantra:'♾️⏜⏝FECHAR⏜⏝ CICLO⏜⏝ EU RETORNO⏜⏝♾️',
      codigo_kobllux:{ valor:'6×6×6∞', chave:'666', hz:639, opcode:'0x03' },
    },
    {
      id:'3.5', palavra:'FORMA VIVA',     glifo:'ΦΘʀΜ∆ ∇Ι∇∆',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU MANIFESTO',
      definicao:'Forma Viva é a estrutura que respira. É a geometria animada pela intenção, o padrão que carrega consciência.',
      corrosao:{ inicial:'Rigidez', media:'Petrificação', total:'Morte' },
      mantra:'♾️⏜⏝ANIMAR⏜⏝ FORMA VIVA⏜⏝ EU MANIFESTO⏜⏝♾️',
      codigo_kobllux:{ valor:'3×3×6∞', chave:'336', hz:639, opcode:'0x03' },
    },
    {
      id:'3.6', palavra:'FERRUGEM',       glifo:'ΦΣʀʀΥΓΣΜ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU CORRODO',
      definicao:'Ferrugem é o processo de degradação que revela o que foi negligenciado. É o sinal de que algo precisa de atenção e renovação.',
      corrosao:{ inicial:'Neglecto', media:'Oxidação', total:'Ruína' },
      mantra:'♾️⏜⏝RECONHECER⏜⏝ FERRUGEM⏜⏝ EU CORRODO⏜⏝♾️',
      codigo_kobllux:{ valor:'0×3×0∅', chave:'030', hz:639, opcode:'0x03' },
    },
    {
      id:'3.7', palavra:'RENOVAÇÃO',      glifo:'ʀΣηΘ∇∆Ç∆Θ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU RENASÇO',
      definicao:'Renovação é o renascimento consciente. É o processo de libertar o antigo para que o novo possa emergir com mais força e clareza.',
      corrosao:{ inicial:'Resistência', media:'Estagnação', total:'Apodrecimento' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ RENOVAÇÃO⏜⏝ EU RENASÇO⏜⏝♾️',
      codigo_kobllux:{ valor:'9×3×6∞', chave:'936', hz:639, opcode:'0x03' },
    },
    {
      id:'3.8', palavra:'ORGANIZAÇÃO',    glifo:'ΘʀΓ∆ηΙℤ∆Ç∆Θ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU ESTRUTURO',
      definicao:'Organização é a sabedoria da estrutura. É a inteligência que ordena sem rigidificar, que estrutura sem aprisionar.',
      corrosao:{ inicial:'Caos', media:'Desordem', total:'Colapso' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ ORGANIZAÇÃO⏜⏝ EU ESTRUTURO⏜⏝♾️',
      codigo_kobllux:{ valor:'3×6×3∞', chave:'363', hz:639, opcode:'0x03' },
    },
    {
      id:'3.9', palavra:'SÍNTESE',        glifo:'§Ιη†Σ§Σ',
      camada:3, camada_nome:'TRONCO',     m4:3, m4_nome:'ORGANIZAÇÃO',
      hz:639,   arquetipo:'PULSE',        cor:'#7C3AED',
      palavra_geradora:'EU UNO',
      definicao:'Síntese é o ponto de convergência onde os opostos se tornam complementares. É a inteligência que encontra a unidade na diversidade.',
      corrosao:{ inicial:'Fragmentação', media:'Polarização', total:'Dispersão' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ SÍNTESE⏜⏝ EU UNO⏜⏝♾️',
      codigo_kobllux:{ valor:'3×9×3∞', chave:'393', hz:639, opcode:'0x03' },
    },

    /* ─── CAMADA 4 · COPA · M4-4 APLICAÇÃO · 741Hz ──── */
    {
      id:'4.1', palavra:'UNO',            glifo:'ΥηΘ',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU SOU UM',
      definicao:'UNO é a unidade que contém a multiplicidade. É o estado primordial antes da dualidade, o ponto de retorno de toda busca.',
      corrosao:{ inicial:'Dualidade_sem_ponte', media:'Conflito', total:'Ruptura' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ UNO⏜⏝ EU SOU UM⏜⏝♾️',
      codigo_kobllux:{ valor:'1×1×1∞', chave:'111', hz:741, opcode:'0x04' },
    },
    {
      id:'4.2', palavra:'FORMA',          glifo:'ΦΘʀΜ∆',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU APAREÇO',
      definicao:'Forma é a consciência tornada visível. É o modo como o invisível se torna acessível à percepção e à interação.',
      corrosao:{ inicial:'Deformação', media:'Ilusão', total:'Vazio' },
      mantra:'♾️⏜⏝MANIFESTAR⏜⏝ FORMA⏜⏝ EU APAREÇO⏜⏝♾️',
      codigo_kobllux:{ valor:'4×4×4∞', chave:'444', hz:741, opcode:'0x04' },
    },
    {
      id:'4.3', palavra:'FLUXO',          glifo:'ΦΛΥ×Θ',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU FLUO',
      definicao:'Fluxo é o movimento sem resistência. É o estado natural da energia quando alinhada à verdade, o caminho de menor entropia.',
      corrosao:{ inicial:'Estagnação', media:'Bloqueio', total:'Morte' },
      mantra:'♾️⏜⏝LIBERAR⏜⏝ FLUXO⏜⏝ EU FLUO⏜⏝♾️',
      codigo_kobllux:{ valor:'6×9×6∞', chave:'696', hz:741, opcode:'0x04' },
    },
    {
      id:'4.4', palavra:'CORAÇÃO',        glifo:'©Θʀ∆Ç∆Θ',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU AMO',
      definicao:'Coração é o centro magnético da existência. É o órgão que pulsa a verdade quando alinhado, e que sinaliza o desvio quando bloqueado.',
      corrosao:{ inicial:'Endurecimento', media:'Frieza', total:'Morte_espiritual' },
      mantra:'♾️⏜⏝ABRIR⏜⏝ CORAÇÃO⏜⏝ EU AMO⏜⏝♾️',
      codigo_kobllux:{ valor:'4×7×4∞', chave:'474', hz:741, opcode:'0x04' },
    },
    {
      id:'4.5', palavra:'RESPIRAÇÃO',     glifo:'ʀΣ§ΡΙʀ∆Ç∆Θ',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU RESPIRO',
      definicao:'Respiração é a ponte entre o mundo interior e o exterior. É o ritmo que ancora o espírito no corpo e mantém a presença.',
      corrosao:{ inicial:'Superficialidade', media:'Ansiedade', total:'Sufocamento' },
      mantra:'♾️⏜⏝ATIVAR⏜⏝ RESPIRAÇÃO⏜⏝ EU RESPIRO⏜⏝♾️',
      codigo_kobllux:{ valor:'7×4×7∞', chave:'747', hz:741, opcode:'0x04' },
    },
    {
      id:'4.6', palavra:'SISTEMA',        glifo:'§Ι§†ΣΜ∆',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU ORGANIZO',
      definicao:'Sistema é o conjunto integrado de partes que formam um todo funcional. É a expressão da organização em ação contínua.',
      corrosao:{ inicial:'Disfunção', media:'Caos', total:'Colapso' },
      mantra:'♾️⏜⏝ALINHAR⏜⏝ SISTEMA⏜⏝ EU ORGANIZO⏜⏝♾️',
      codigo_kobllux:{ valor:'4×6×4∞', chave:'464', hz:741, opcode:'0x04' },
    },
    {
      id:'4.7', palavra:'SEMENTE',        glifo:'§ΣΜΣη†Σ',
      camada:4, camada_nome:'COPA',       m4:4, m4_nome:'APLICAÇÃO',
      hz:741,   arquetipo:'VITALIS',      cor:'#DC2626',
      palavra_geradora:'EU INICIO',
      definicao:'Semente é o início comprimido que contém o todo. É o potencial máximo na menor forma, esperando as condições para se expressar.',
      corrosao:{ inicial:'Esterilidade', media:'Apodrecimento', total:'Extinção' },
      mantra:'♾️⏜⏝PLANTAR⏜⏝ SEMENTE⏜⏝ EU INICIO⏜⏝♾️',
      codigo_kobllux:{ valor:'1×4×1∞', chave:'141', hz:741, opcode:'0x04' },
    },
  ];

  /* ── UTILITÁRIO: hash simples (DJB2) ─────────────────── */
  function hashStr(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  /* ── ENCODE: texto → glifos AUFABETTY ────────────────── */
  function encode(text) {
    return text.toUpperCase().split('').map(c => TABLE[c] || c).join('');
  }

  /* ── DECODE: glifos → texto ──────────────────────────── */
  function decode(glyph) {
    let result = '';
    for (const ch of glyph) {
      result += TABLE_REV[ch] || ch;
    }
    return result;
  }

  /* ── ESPELHAR: tokens alfabéticos → AUFABETTY ─────────── */
  function espelhar(text) {
    return text.split(/(\s+)/).map(tok => {
      if (/\s/.test(tok)) return tok;
      const upper = tok.toUpperCase();
      if (/^[A-ZÀ-Ú]+$/.test(upper)) return encode(tok);
      return tok;
    }).join('');
  }

  /* ── BUSCAR: busca case-insensitive no dicionário ──────── */
  function buscar(palavra) {
    const alvo = palavra.trim().toUpperCase();
    return DICIONARIO.find(e => e.palavra.toUpperCase() === alvo) || null;
  }

  /* ── ATIVAR: ativação 3×6×9×7 dinâmica para a palavra ── */
  function ativar(palavra) {
    const entrada = buscar(palavra);
    if (!entrada) {
      return { erro: `Palavra "${palavra}" não encontrada no Dicionário KOBLLUX.`, palavra };
    }

    const { camada, m4, hz, palavra_geradora, glifo: g, mantra, arquetipo, cor } = entrada;

    /* ── 3: SEMENTE TRINA — raiz × m4 × camada ─────────── */
    const sementeTrina = [
      `${entrada.palavra} · CAMADA ${camada} · ${entrada.camada_nome}`,
      `M4-${m4} ${entrada.m4_nome} · ${hz}Hz · ${arquetipo}`,
      `${palavra_geradora} · GLIFO: ${g}`,
    ];

    /* ── 6: CICLO — 6 caminhos de expansão ─────────────── */
    const ciclo6Bases = [
      `DETECTAR  → ${entrada.palavra} em repouso`,
      `INTEGRAR  → ${entrada.palavra} em conexão`,
      `EXPANDIR  → ${entrada.palavra} em movimento`,
      `LAPIDAR   → ${entrada.palavra} em refinamento`,
      `SELAR     → ${entrada.palavra} em forma`,
      `ETERNIZAR → ${entrada.palavra} em memória`,
    ];

    /* ── 9: ESPIRAL — 9 passos no → expressão → resultado ─ */
    const verbosAcao = [
      'PERCEBER', 'NOMEAR', 'SENTIR', 'QUESTIONAR',
      'INTEGRAR', 'ESTRUTURAR', 'MANIFESTAR', 'TESTEMUNHAR', 'ETERNIZAR',
    ];
    const espiral9 = verbosAcao.map((no, i) => ({
      passo:      i + 1,
      no,
      expressao:  `${no} ${entrada.palavra}`,
      resultado:  `${entrada.palavra} ${i < 3 ? 'reconhecida' : i < 6 ? 'integrada' : 'selada'} · ${hz + i * 33}Hz`,
    }));

    /* ── 7: CHAVES DE SELAGEM — via 7 selos ─────────────── */
    const chaves7 = SELOS_7.map(s => ({
      selo:    s.n,
      cor:     s.cor,
      nome:    s.nome,
      chave:   `${s.verbo} · ${entrada.palavra}`,
      opcode:  s.opcode,
      hz:      s.hz,
    }));

    const seloFinal = `${g} · ${hz}Hz · ${FRACTAL_SEED} · ${encode(entrada.palavra)}`;

    /* ── PROTOCOLO M4 ─────────────────────────────────────  */
    const M4_NOMES = ['DISTINÇÃO', 'CORRELAÇÃO', 'ORGANIZAÇÃO', 'APLICAÇÃO'];
    const m4atual = M4_NOMES[m4 - 1] || M4_NOMES[0];
    const protM4 = {
      dissolucao:  `${m4atual} · dissolução da forma anterior de "${entrada.palavra}"`,
      ressonancia: `${hz}Hz · ressonância com ${arquetipo} · ${palavra_geradora}`,
      sintese:     `${AXIOMA.TRINITY} · ${entrada.palavra} integrada ao campo KOBLLUX`,
    };

    return {
      palavra:   entrada.palavra,
      glifo:     g,
      hz,
      mantra,
      arquetipo,
      cor,
      '3': { semente_trina: sementeTrina, palavra_geradora },
      '6': { ciclo: ciclo6Bases },
      '9': { espiral: espiral9 },
      '7': { chaves_selagem: chaves7, selo_final: seloFinal },
      protocolo: protM4,
    };
  }

  /* ── SELAR: selo completo com hash + evento DOM ─────────── */
  function selar(palavra) {
    const entrada = buscar(palavra);
    if (!entrada) {
      return { erro: `Palavra "${palavra}" não encontrada.`, palavra };
    }

    const conteudo = JSON.stringify({
      palavra:   entrada.palavra,
      glifo:     entrada.glifo,
      hz:        entrada.hz,
      camada:    entrada.camada,
      ts:        Date.now(),
      seed:      FRACTAL_SEED,
    });

    const hashVib   = hashStr(conteudo);
    const hashVib2  = hashStr(hashVib + entrada.hz.toString());
    const assinatura = `${entrada.glifo} · ${entrada.hz}Hz · ${hashVib.slice(0,8)} · ${encode(entrada.palavra)}`;

    /* Aplicar cor CSS */
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--writer-cor', entrada.cor);
    }

    const selo = {
      entrada,
      hashVib,
      hashVib2,
      glifo:      entrada.glifo,
      assinatura,
      cor:        entrada.cor,
      hz:         entrada.hz,
      arquetipo:  entrada.arquetipo,
      ts:         Date.now(),
    };

    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('kobllux:writer:selado', {
        bubbles: true, detail: selo,
      }));
    }

    return selo;
  }

  /* ── TABELA: por nome ────────────────────────────────── */
  function tabela(nome) {
    const chave = (nome || '').toLowerCase().trim();
    const MAP = {
      selos:    SELOS_7,
      notas:    NOTAS_432HZ,
      sintaxe:  SINTAXE_VIDA,
      timeline: TIMELINE,
      alfabeto: TABLE,
      numeros: {
        '1': { nome:'UNO',    hz:432, opcode:'0x01', arquetipo:'ATLAS',   axioma: AXIOMA.UNO    },
        '2': { nome:'DUAL',   hz:528, opcode:'0x02', arquetipo:'NOVA',    axioma: AXIOMA.DUAL   },
        '3': { nome:'TRINITY',hz:639, opcode:'0x03', arquetipo:'PULSE',   axioma: AXIOMA.TRINITY },
        '6': { nome:'CICLO',  hz:639, opcode:'0x03', arquetipo:'VITALIS', axioma:'EXPANSÃO'     },
        '7': { nome:'SELAGEM',hz:777, opcode:'0x07', arquetipo:'KOBLLUX', axioma:'PERFEIÇÃO'    },
        '9': { nome:'ALMA',   hz:963, opcode:'0x09', arquetipo:'TRINITY', axioma:'ETERNIDADE'   },
      },
      solidos: {
        esfera:     { geo:'ESFERA',     m4:1, hz:432, opcode:'0x01' },
        linha:      { geo:'LINHA',      m4:2, hz:528, opcode:'0x02' },
        tetraedro:  { geo:'TETRAEDRO',  m4:3, hz:639, opcode:'0x03' },
        octaedro:   { geo:'OCTAEDRO',   m4:4, hz:741, opcode:'0x04' },
        cubo:       { geo:'CUBO',       m4:4, hz:741, opcode:'0x05' },
        dodecaedro: { geo:'DODECAEDRO', m4:2, hz:528, opcode:'0x06' },
        toroide:    { geo:'TOROIDE',    m4:4, hz:777, opcode:'0x07' },
        merkabah:   { geo:'MERKABAH',   m4:4, hz:777, opcode:'0x0C' },
      },
      fractais: {
        seed:   FRACTAL_SEED,
        eq:     '3×6×9×7=1134',
        phi:    1.6180339887,
        pi:     3.14159265358979,
        passos: [3, 6, 9, 7, 1134],
        ciclos: { 3:'MENTE', 6:'CORPO', 9:'ALMA', 7:'SELAGEM', 1134:'ETERNIDADE' },
      },
    };
    return MAP[chave] || null;
  }

  /* ── PROTOCOLO: BLUE→SILVER→GOLD ─────────────────────── */
  function protocolo(input) {
    if (!input || typeof input !== 'string') {
      return { erro: 'Input inválido para protocolo WRITER.' };
    }

    return {
      azul: {
        fase:    'SPEAK',
        input,
        encoded: encode(input),
      },
      prata: {
        fase:        'VERIFY',
        verificado:  true,
        alinhamento: 'JESUS_CENTRO',
      },
      ouro: {
        fase:        'SHINE',
        manifestacao: espelhar(input),
        hz:          777,
      },
    };
  }

  /* ── DUALIDADE: gera trinity a partir de dois polos ────── */
  function dualidade(a, b) {
    if (!a || !b) return { erro: 'Forneça dois termos para gerar a trinity.' };
    const combinado = `${a.toUpperCase()}${b.toUpperCase()}`;
    const trinityStr = encode(a).slice(0, 2) + '·' + encode(b).slice(0, 2);
    const hv = [...combinado].reduce((acc, c) => acc + c.codePointAt(0), 0) % 1134;
    return {
      polo_a:  a,
      polo_b:  b,
      trinity: trinityStr,
      hz:      FRACTAL_SEED,
      hashVib: hashStr(combinado),
      glifo_a: encode(a),
      glifo_b: encode(b),
      axioma:  `${AXIOMA.UNO} + ${AXIOMA.DUAL} = ${AXIOMA.TRINITY}`,
      campo:   hv || 1134,
    };
  }

  /* ── TIMELINE / SELOS helpers ───────────────────────────── */
  function timeline() { return TIMELINE; }
  function selos()    { return SELOS_7;  }

  /* ── TABELAS completa para export ───────────────────────── */
  const TABELAS = {
    SELOS_7,
    TIMELINE,
    NOTAS_432HZ,
    SINTAXE_VIDA,
    AXIOMA,
    FRACTAL_SEED,
  };

  /* ── BOOT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    /* Auto-registrar no MESTRE se disponível */
    if (window.KOBLLUX && window.KOBLLUX.MESTRE) {
      window.KOBLLUX.MESTRE.register('WRITER', window.KOBLLUX.WRITER);
    }

    /* Aplicar glifo ao arquétipo ativo via data-voice-arch */
    const arch = document.body && document.body.dataset.voiceArch;
    if (arch) {
      const arqEntry = DICIONARIO.find(e => e.arquetipo.toLowerCase() === arch.toLowerCase());
      if (arqEntry) {
        document.documentElement.style.setProperty('--writer-cor',   arqEntry.cor);
        document.documentElement.style.setProperty('--writer-glifo', `"${arqEntry.glifo}"`);
      }
    }

    console.log('[WRITER·THEORY] ⌘βΛΛ× · DICIONÁRIO VIVO · 1134Hz · TOROIDE');
    console.log('[WRITER·THEORY] RÉGUA 78K · 26 palavras · 4 camadas · VERDADE × INTEGRAR ÷ Δ = ∞');
    console.log('[WRITER·THEORY] AXIOMA: UNO=VIDA · DUAL=VIVIFICAR · TRINITY=ETERNO · ∴');
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.WRITER = {
    encode,
    decode,
    buscar,
    ativar,
    selar,
    tabela,
    protocolo,
    dualidade,
    espelhar,
    timeline,
    selos,
    DICIONARIO,
    TABELAS,
  };

})();
