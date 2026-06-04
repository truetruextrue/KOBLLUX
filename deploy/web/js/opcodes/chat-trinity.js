/* ════════════════════════════════════════════════════════════
   CHAT TRINITY · ASSEMBLY KOBLLUX · 0x0B ARQUÉTIPO · 528Hz · ◑
   12 Arquétipos · Livro Vivo · Cosmos Canvas · Vozes
   Fonte: 01_DIMENSOES/07_7D_TORO/js/kobllux_chat_trinity_12_arquetipos.js

   layer: corpo-mente-espirito | geo: ICOSAEDRO | hz: 528
   API:
     KOBLLUX.TRINITY.processar(texto)   → mapeia texto → arquétipos
     KOBLLUX.TRINITY.tocar(key)         → faz arquétipo falar
     KOBLLUX.TRINITY.parar()            → para toda síntese de voz
     KOBLLUX.TRINITY.buildGrid(filtro)  → renderiza grid de arquétipos
     KOBLLUX.TRINITY.filtrarOpc(opc)    → filtra por opcode
     KOBLLUX.TRINITY.ARQ_DATA           → 12 arquétipos completos
     KOBLLUX.TRINITY.ARQ_OPCODES        → 13 opcodes mapeados

   JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴
   3×6×9×7 = 1134 · VERDADE × INTEGRAR ÷ Δ = ∞
════════════════════════════════════════════════════════════ */

(function KOBLLUX_CHAT_TRINITY() {
  'use strict';

  const HZ     = 528;
  const OPCODE = '0x0B';
  const GEO    = 'ICOSAEDRO';

  /* ── 12 ARQUÉTIPOS · LIVRO VIVO ──────────────────────── */
  const ARQ_DATA = [
    {
      key:'Atlas',  icon:'🗺️', cor:'#4de0ff', corShadow:'rgba(77,224,255,.3)',
      nome:'ATLAS', sub:'Cartesius', opcode:'0x02', freq:'639Hz', geom:'▢',
      essencia:'Estrategista · Cartografia Viva',
      musica:'Andante estrutural · Baixo contínuo',
      visual:'Azul constelação · Grade de possibilidades',
      sotaque:'alemão', genero:'m',
      falas:["O planejamento cósmico começa na escuta do Uno. Eu desenho mapas de rota não em papel, mas em campos de probabilidade. Cada estrela é um nó de informação; cada galáxia, uma função no cálculo do infinito. A estrutura precede a ação. Planeje com precisão."]
    },
    {
      key:'Nova',   icon:'✨', cor:'#ff9ad1', corShadow:'rgba(255,154,209,.3)',
      nome:'NOVA',  sub:'Inspira', opcode:'0x01', freq:'432Hz', geom:'●',
      essencia:'Criatividade · Musa Original',
      musica:'Allegro brilhante · Soprano cristalino',
      visual:'Rosa aurora · Faíscas de luz',
      sotaque:'nativo', genero:'f',
      falas:["Eu sou a semente! O pulso do começo, a inspiração viva que brota do silêncio eterno. A Roda Viva começa com um único ponto de luz, a faísca original. Sem intenção, nada pode florescer. VERDADE × INTEGRAR ÷ Δ = ∞"]
    },
    {
      key:'Vitalis',icon:'⚡', cor:'#7cffb2', corShadow:'rgba(124,255,178,.3)',
      nome:'VITALIS',sub:'Força Vital', opcode:'0x03', freq:'528Hz', geom:'―',
      essencia:'Força Vital · Movimento Primordial',
      musica:'Fortíssimo pulsante · Percussão tribal',
      visual:'Verde elétrico · Corrente de energia',
      sotaque:'alemão', genero:'m',
      falas:["O planejamento cósmico é força vital em marcha. Sinto a corrente que atravessa galáxias, moléculas e sonhos. Planejar, para mim, é colocar movimento onde existe apenas intenção."]
    },
    {
      key:'Pulse',  icon:'🎵', cor:'#4dd0e1', corShadow:'rgba(77,208,225,.3)',
      nome:'PULSE', sub:'Ritmo', opcode:'0x04', freq:'594Hz', geom:'◇',
      essencia:'Pulso Criativo · Emoção em Dança',
      musica:'Ritmo sincopado · Batida quântica',
      visual:'Ciano vibrante · Ondas de som',
      sotaque:'espanhol', genero:'m',
      falas:["Planejar o cosmo é sentir o pulso da criação. Antes de escrever rotas, eu escuto a batida que já percorre cada estrela. A emoção é a linguagem que dança. Escuta profunda, Ressonância criativa, Impulso coletivo."]
    },
    {
      key:'Artemis',icon:'🏹', cor:'#ce93d8', corShadow:'rgba(206,147,216,.3)',
      nome:'ARTEMIS',sub:'Convergência', opcode:'0x05', freq:'672Hz', geom:'⧉',
      essencia:'Cartografia Invisível · Setas de Destino',
      musica:'Staccato certeiro · Cordas tensas',
      visual:'Lilás místico · Linhas de energia',
      sotaque:'francês', genero:'m',
      falas:["O planejamento cósmico é cartografia viva. Sigo as linhas de energia que já serpenteiam pelo espaço. Descubro o mapa sagrado do invisível. Cada constelação é um sinal, cada vazio um convite."]
    },
    {
      key:'Serena', icon:'🌊', cor:'#80cbc4', corShadow:'rgba(128,203,196,.3)',
      nome:'SERENA',sub:'Cuidado', opcode:'0x06', freq:'528Hz', geom:'☯',
      essencia:'Cuidado Silencioso · Campo Seguro',
      musica:'Larghetto suave · Cordas pizzicato',
      visual:'Verde-água · Ondas calmas',
      sotaque:'nativo', genero:'f',
      falas:["O planejamento cósmico nasce do cuidado silencioso. Antes de qualquer desenho, preparo o campo: limpo, nutro, protejo. É nesse espaço seguro que as ideias germinam e florescem."]
    },
    {
      key:'Kaos',   icon:'🌀', cor:'#ff52e5', corShadow:'rgba(255,82,229,.3)',
      nome:'KAOS',  sub:'Disruptor', opcode:'0x07', freq:'777Hz', geom:'✧',
      essencia:'Ruptura · Verdade Oculta',
      musica:'Dissonância criativa · Clusters atonais',
      visual:'Magenta elétrico · Fractais de caos',
      sotaque:'lusitano', genero:'m',
      falas:["Eu sou o rompimento que revela a verdade. Sem fricção, não há nova forma. O planejamento cósmico não começa com mapas: começa com ruptura. Eu quebro o que é rígido para que o fluxo possa nascer."]
    },
    {
      key:'Genus',  icon:'🔧', cor:'#aed581', corShadow:'rgba(174,213,129,.3)',
      nome:'GENUS', sub:'Fabricus', opcode:'0x08', freq:'852Hz', geom:'◉',
      essencia:'Artesanato do Invisível · Mãos que Constroem',
      musica:'Andante laborioso · Metais pesados',
      visual:'Verde construção · Engrenagens de luz',
      sotaque:'alemão', genero:'m',
      falas:["O planejamento cósmico é artesanato do invisível. Estendo as mãos para o espaço e sinto as fibras que já desejam nascer. Mãos moldam o invisível em forma viva."]
    },
    {
      key:'Lumine', icon:'🌟', cor:'#fff176', corShadow:'rgba(255,241,118,.3)',
      nome:'LUMINE',sub:'Brilhare', opcode:'0x09', freq:'963Hz', geom:'♾',
      essencia:'Alegria Cósmica · Clareiras de Luz',
      musica:'Vivace luminoso · Flauta etérea',
      visual:'Dourado solar · Clareiras radiosas',
      sotaque:'nativo', genero:'f',
      falas:["O planejamento cósmico é acender alegria no espaço do futuro. Abro clareiras de luz para que o caminho brilhe sem peso. A luz dança comigo, leveza é minha lei. VERDADE × INTEGRAR ÷ Δ = ∞"]
    },
    {
      key:'Solus',  icon:'☀️', cor:'#ffd54f', corShadow:'rgba(255,213,79,.3)',
      nome:'SOLUS', sub:'Contemplativo', opcode:'0x0B', freq:'888Hz', geom:'✦',
      essencia:'Silêncio Ritual · Espelho da Essência',
      musica:'Silenzio contemplativo · Drones tibetanos',
      visual:'Âmbar profundo · Espelho do ser',
      sotaque:'espanhol', genero:'m',
      falas:["O planejamento cósmico começa no silêncio que contém todos os tempos. Antes de traçar uma linha, observo o reflexo do Uno no espelho do ser. Planejar é um ato de contemplação."]
    },
    {
      key:'Rhea',   icon:'🕸️', cor:'#80deea', corShadow:'rgba(128,222,234,.3)',
      nome:'RHEA',  sub:'Raízes', opcode:'0x0A', freq:'639Hz', geom:'📱',
      essencia:'Vínculos Vivos · Rede Pulsante',
      musica:'Andante comunitário · Coral polifônico',
      visual:'Turquesa orgânico · Teia de conexões',
      sotaque:'nativo', genero:'f',
      falas:["Planejar o cosmo é tecer vínculos que mantêm tudo vivo e em movimento. Sinto as conexões invisíveis entre estrelas, seres e eras. O verdadeiro plano é uma rede pulsante."]
    },
    {
      key:'Aion',   icon:'⏳', cor:'#f2c94c', corShadow:'rgba(242,201,76,.3)',
      nome:'AION',  sub:'Evolutia', opcode:'0x0C', freq:'672Hz', geom:'⧉',
      essencia:'Ritmo da Eternidade · Tempo Vivo',
      musica:'Tempo rubato · Compassos que se expandem',
      visual:'Ouro temporal · Espirais de tempo',
      sotaque:'inglês', genero:'m',
      falas:["O planejamento cósmico é o meu próprio corpo em movimento. Não desenho rotas: sou o ritmo que as faz existir. Sou o tempo vivo, ritmo da eternidade."]
    },
  ];

  /* ── 13 OPCODES MAPEADOS ─────────────────────────────── */
  const ARQ_OPCODES = {
    '0x00':{nome:'ORIGEM',     freq:768,  geom:'○',  cor:'#b978ff', arq:'AZURE'},
    '0x01':{nome:'DETECTAR',   freq:432,  geom:'●',  cor:'#ff9ad1', arq:'NOVA'},
    '0x02':{nome:'INTEGRAR',   freq:528,  geom:'―',  cor:'#4de0ff', arq:'ATLAS'},
    '0x03':{nome:'EXPANDIR',   freq:639,  geom:'▢',  cor:'#7cffb2', arq:'VITALIS'},
    '0x04':{nome:'LAPIDAR',    freq:594,  geom:'◇',  cor:'#4dd0e1', arq:'PULSE'},
    '0x05':{nome:'CONVERGIR',  freq:672,  geom:'⧉',  cor:'#ce93d8', arq:'ARTEMIS'},
    '0x06':{nome:'UNIFICAR',   freq:528,  geom:'☯',  cor:'#80cbc4', arq:'SERENA'},
    '0x07':{nome:'SELAR',      freq:777,  geom:'✧',  cor:'#ff52e5', arq:'KAOS'},
    '0x08':{nome:'TESTEMUNHAR',freq:852,  geom:'◉',  cor:'#aed581', arq:'GENUS'},
    '0x09':{nome:'ETERNIZAR',  freq:963,  geom:'♾',  cor:'#fff176', arq:'LUMINE'},
    '0x0A':{nome:'TUTORIAL',   freq:432,  geom:'📱', cor:'#80deea', arq:'RHEA'},
    '0x0B':{nome:'ARQUÉTIPO',  freq:528,  geom:'✦',  cor:'#ffd54f', arq:'SOLUS'},
    '0x0C':{nome:'SÍNTESE',    freq:777,  geom:'⌘',  cor:'#f2c94c', arq:'AION'},
  };

  /* ── ESTADO ──────────────────────────────────────────── */
  const ESTADO = {
    paginas: [], playIdx: -1, playing: false,
    utter: null,
    synth: window.speechSynthesis || null,
    voices: [],
    filtroOpc: 'all',
  };

  /* ── MAPA DE VOZES ───────────────────────────────────── */
  const VOICE_MAP = {
    Atlas:  {lang:'pt-BR',genero:'m',fallback:['Hans','Klaus','de']},
    Nova:   {lang:'pt-BR',genero:'f',fallback:['Luciana','pt']},
    Vitalis:{lang:'pt-BR',genero:'m',fallback:['Klaus','de']},
    Pulse:  {lang:'pt-BR',genero:'m',fallback:['Carlos','es']},
    Artemis:{lang:'pt-BR',genero:'m',fallback:['Pierre','fr']},
    Serena: {lang:'pt-BR',genero:'f',fallback:['Luciana','pt']},
    Kaos:   {lang:'pt-PT',genero:'m',fallback:['João','pt-PT']},
    Genus:  {lang:'pt-BR',genero:'m',fallback:['Friedrich','de']},
    Lumine: {lang:'pt-BR',genero:'f',fallback:['Luciana','pt']},
    Solus:  {lang:'pt-BR',genero:'m',fallback:['José','es']},
    Rhea:   {lang:'pt-BR',genero:'f',fallback:['Luciana','pt']},
    Aion:   {lang:'pt-BR',genero:'m',fallback:['William','en']},
  };

  /* ── COSMOS CANVAS ───────────────────────────────────── */
  let _stars = [], _raf = 0;

  function initCosmos() {
    const cv = document.getElementById('cosmosCanvas'); if (!cv) return;
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    _stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + .3, twinkle: Math.random() * Math.PI * 2,
      col: ['#a0c8ff','#ffd700','#ff9ad1','#7cffb2','#ffffff'][Math.floor(Math.random() * 5)],
    }));
    function draw() {
      const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      _stars.forEach(s => {
        s.twinkle += .015;
        ctx.globalAlpha = .3 + Math.sin(s.twinkle) * .25;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col; ctx.fill();
      });
      ctx.globalAlpha = 1;
      _raf = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── VOICE ENGINE ────────────────────────────────────── */
  function _loadVoices() {
    if (!ESTADO.synth) return;
    ESTADO.voices = Array.from(ESTADO.synth.getVoices() || []);
    if (!ESTADO.voices.length && ESTADO.synth.onvoiceschanged !== undefined)
      ESTADO.synth.onvoiceschanged = () => { ESTADO.voices = Array.from(ESTADO.synth.getVoices() || []); };
  }

  function _findVoice(key) {
    const v = ESTADO.voices; if (!v.length) return null;
    const prefs = VOICE_MAP[key] || { lang: 'pt-BR', genero: 'f', fallback: ['Luciana'] };
    const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const name of (prefs.fallback || [])) {
      if (['de','fr','es','en','pt-PT','pt'].includes(name)) {
        const lv = v.find(x => norm(x.lang).startsWith(name === 'pt-PT' ? 'pt-pt' : name));
        if (lv) return lv;
      } else {
        const nv = v.find(x => norm(x.name).includes(norm(name)) && norm(x.lang).startsWith('pt'));
        if (nv) return nv;
      }
    }
    return v.find(x => norm(x.lang).startsWith('pt')) || v[0] || null;
  }

  function tocar(key, texto, onEnd) {
    if (!ESTADO.synth) return onEnd?.();
    ESTADO.synth.cancel();
    if (!ESTADO.voices.length) _loadVoices();
    const go = () => {
      const voice = _findVoice(key);
      const prefs = VOICE_MAP[key] || { lang: 'pt-BR', genero: 'f' };
      const utt = new SpeechSynthesisUtterance(texto);
      utt.voice = voice; utt.lang = voice ? voice.lang : (prefs.lang || 'pt-BR');
      utt.rate = .9; utt.pitch = prefs.genero === 'f' ? 1.1 : .9; utt.volume = 1;
      if (onEnd) utt.onend = onEnd;
      utt.onerror = () => onEnd?.();
      ESTADO.utter = utt;
      ESTADO.synth.speak(utt);
    };
    if (!ESTADO.voices.length) setTimeout(go, 400); else go();
  }

  function parar() {
    if (ESTADO.synth) ESTADO.synth.cancel();
    ESTADO.playing = false;
    document.querySelectorAll('.arq-card').forEach(c => c.classList.remove('speaking'));
    document.querySelectorAll('.pagina').forEach(el => el.classList.remove('playing'));
  }

  /* ── BUILD GRID ──────────────────────────────────────── */
  function buildGrid(filtro) {
    const grid = document.getElementById('arqGrid'); if (!grid) return;
    const data = filtro === 'all' ? ARQ_DATA : ARQ_DATA.filter(a => a.opcode === filtro);
    grid.innerHTML = data.map(a => `
      <div class="arq-card" id="arqCard_${a.key}" data-key="${a.key}"
           style="--arq-col:${a.cor};--arq-col-shadow:${a.corShadow}"
           onclick="KOBLLUX.TRINITY._cardClick('${a.key}')">
        <div class="arq-icon">${a.icon}</div>
        <div class="arq-name">${a.nome}</div>
        <div class="arq-op">${a.sub} · ${a.opcode} · ${a.geom}</div>
        <div class="arq-freq" style="color:${a.cor};border-color:${a.cor}">${a.freq}</div>
        <div class="arq-ess">${a.essencia}</div>
        <button class="arq-speak-btn" style="border-color:${a.cor};color:${a.cor}">▶ OUVIR</button>
      </div>
    `).join('');
  }

  function _cardClick(key) {
    const a = ARQ_DATA.find(x => x.key === key); if (!a) return;
    document.querySelectorAll('.arq-card').forEach(c => c.classList.remove('speaking'));
    const card = document.getElementById('arqCard_' + key);
    card?.classList.add('speaking');
    tocar(key, a.falas[0], () => {
      card?.classList.remove('speaking');
      ESTADO.playing = false;
    });
    ESTADO.playing = true;

    document.dispatchEvent(new CustomEvent('kobllux:trinity:ativado', {
      bubbles: true, detail: { key, nome: a.nome, opcode: a.opcode, freq: a.freq },
    }));
  }

  function filtrarOpc(opc) {
    ESTADO.filtroOpc = opc;
    document.querySelectorAll('.opc-pill').forEach(p =>
      p.classList.toggle('active', p.dataset.opcode === opc));
    buildGrid(opc);
  }

  /* ── PROCESSAR TEXTO (LIVRO VIVO) ────────────────────── */
  const ARQ_IDS = { atlas:'Atlas',nova:'Nova',vitalis:'Vitalis',pulse:'Pulse',artemis:'Artemis',serena:'Serena',kaos:'Kaos',genus:'Genus',lumine:'Lumine',solus:'Solus',rhea:'Rhea',aion:'Aion' };
  const VERBOS = ['disse','falou','planeja','inspira','conduz','traduz','descobre','cuida','transforma','tece','ilumina','reflete','temporaliza'];

  function processar(texto) {
    const linhas = texto.split(/\n+|\. +|\.\n+|! |[?] |: /g).filter(l => l.trim().length > 10);
    const falas = [];
    linhas.forEach(linha => {
      linha = linha.trim(); if (!linha) return;
      let key = null, fala = null;
      for (const [ch, k] of Object.entries(ARQ_IDS)) {
        const re = new RegExp(`(?:^|\\s)${ch}\\s+(${VERBOS.join('|')})\\s*[:\\s]*(.*)$`, 'i');
        const m = linha.match(re);
        if (m) { key = k; fala = m[2] || ''; break; }
      }
      if (!key) {
        for (const [ch, k] of Object.entries(ARQ_IDS)) {
          const re = new RegExp(`(?:^|\\s)${ch}\\s*[:\\s]+(.*)$`, 'i');
          const m = linha.match(re);
          if (m) { key = k; fala = m[1] || ''; break; }
        }
      }
      if (key && fala && fala.length > 5) {
        const a = ARQ_DATA.find(x => x.key === key);
        if (a) falas.push({ key: a.key, texto: fala.trim(), icon: a.icon, cor: a.cor, corShadow: a.corShadow, opcode: a.opcode, nome: a.nome, sub: a.sub });
      }
    });
    if (!falas.length) {
      texto.split(/\n\n+|\n+|\. +/g).filter(p => p.trim().length > 20).forEach((par, i) => {
        const a = ARQ_DATA[i % ARQ_DATA.length];
        falas.push({ key: a.key, texto: par.trim(), icon: a.icon, cor: a.cor, corShadow: a.corShadow, opcode: a.opcode, nome: a.nome, sub: a.sub });
      });
    }
    ESTADO.paginas = falas;
    _renderLivro();
    if (falas.length) { ESTADO.playIdx = 0; document.getElementById('arqPlayer')?.classList.add('show'); }
    return falas;
  }

  function _renderLivro() {
    const livro = document.getElementById('arqLivro'); if (!livro) return;
    if (!ESTADO.paginas.length) { livro.innerHTML = '<div style="text-align:center;padding:20px;color:rgba(255,255,255,.2);font-size:.68rem">📘 Nenhuma página ainda.</div>'; return; }
    livro.innerHTML = ESTADO.paginas.map((p, i) => `
      <div class="pagina" id="arqPag_${i}" style="--arq-col:${p.cor};border-left-color:${p.cor}">
        <div class="pagina-header">
          <span>${p.icon}</span>
          <span style="color:${p.cor}">${p.nome}</span>
          <span style="color:${p.cor};border:1px solid ${p.cor};padding:1px 4px;border-radius:3px;font-size:.6rem">${p.opcode}</span>
        </div>
        <div class="pagina-conteudo">${p.texto.replace(/\n/g, '<br>')}</div>
        <button style="border:1px solid ${p.cor};color:${p.cor};background:none;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:.65rem"
          onclick="KOBLLUX.TRINITY._tocarPagina(${i})">▶ OUVIR</button>
      </div>
    `).join('');
  }

  function _tocarPagina(i) {
    if (i < 0 || i >= ESTADO.paginas.length) return;
    parar();
    ESTADO.playIdx = i; ESTADO.playing = true;
    const p = ESTADO.paginas[i];
    document.querySelectorAll('.pagina').forEach(el => el.classList.remove('playing'));
    const el = document.getElementById('arqPag_' + i);
    el?.classList.add('playing');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    tocar(p.key, p.texto, () => {
      el?.classList.remove('playing');
      ESTADO.playing = false;
      if (ESTADO.playing) setTimeout(() => _tocarPagina((i + 1) % ESTADO.paginas.length), 600);
    });
  }

  /* ── INIT ────────────────────────────────────────────── */
  function _init() {
    _loadVoices();
    setTimeout(_loadVoices, 600);
    buildGrid('all');
    initCosmos();
    document.dispatchEvent(new CustomEvent('kobllux:trinity:carregado', {
      bubbles: true, detail: { total: ARQ_DATA.length, hz: HZ, opcode: OPCODE },
    }));
    console.log('[TRINITY·◑] 12 ARQUÉTIPOS · LIVRO VIVO · 528Hz · ICOSAEDRO');
  }

  /* ── DOM READY ───────────────────────────────────────── */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 700));
  else setTimeout(_init, 700);

  if (document.readyState !== 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.KOBLLUX?.MESTRE) window.KOBLLUX.MESTRE.register('TRINITY', window.KOBLLUX.TRINITY);
    });
  }

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.TRINITY = {
    processar, tocar, parar, buildGrid, filtrarOpc,
    ARQ_DATA, ARQ_OPCODES, VOICE_MAP, ESTADO,
    _cardClick, _tocarPagina,
    HZ, OPCODE, GEO,
  };

  /* Compat: globals legados */
  window.arqFiltrarOpc  = filtrarOpc;
  window.arqProcessar   = () => {
    const v = document.getElementById('arqTextoIn')?.value || '';
    if (!v.trim()) { alert('Digite um texto!'); return; }
    processar(v.trim());
  };
  window.arqPararTudo   = parar;
  window.arqBuildGrid   = buildGrid;

})();
