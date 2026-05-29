#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX WRITER THEORY ∞
dicionario_writer.py — Dicionário Vivo de Verdade Simbólica
Cristalização de: KOBLLUX_WRITER_THEORY (ChatGPT session)
                + espelho_input.txt · espelho_input.mirror.txt
                + m4_sci_art.txt · m4_sci_art.tri.txt
EQUAÇÃO: VERDADE × INTEGRAR ÷ Δ = ∞
AXIOMA: UNO=VIDA · DUAL=VIVIFICAR · TRINITY=ETERNO
FRACTAL: 3×6×9×7=1134 · CUBO DE METATRON · AUFABETTY
"""

import sys
import json
import time
from typing import Dict, List, Optional, Any

# ── A CIFRA AUFABETTY ──────────────────────────────────────────────
AUFABETTY: Dict[str, str] = {
    'A':'∆','B':'β','C':'©','D':'Δ','E':'Σ','F':'Φ','G':'Γ','H':'Η','I':'Ι',
    'J':'⌐','K':'⌘','L':'Λ','M':'Μ','N':'η','O':'Θ','P':'Ρ','Q':'Θ','R':'ʀ',
    'S':'§','T':'†','U':'Υ','V':'∇','W':'Ω','X':'×','Y':'Ψ','Z':'ℤ',
}
AUFABETTY_REV: Dict[str, str] = {v: k for k, v in AUFABETTY.items()}

# ── AXIOMA ──────────────────────────────────────────────────────────
AXIOMA: Dict[str, str] = {"UNO": "VIDA", "DUAL": "VIVIFICAR", "TRINITY": "ETERNO"}

# ── FRACTAL SEED: 3×6×9×7 = 1134 ───────────────────────────────────
FRACTAL_SEED: int = 3 * 6 * 9 * 7  # 1134

# ── 7 SELOS ─────────────────────────────────────────────────────────
SELOS_7: List[Dict[str, Any]] = [
    {"n":1,"cor":"#FF0000","nome":"Vermelho","ato":"Detectar","verbo":"Haja Luz","opcode":"0x01","hz":432,"arquetipo":"ATLAS","dia_genesis":"Luz/Trevas"},
    {"n":2,"cor":"#FFA500","nome":"Laranja","ato":"Integrar","verbo":"Eu sou a Ponte","opcode":"0x02","hz":528,"arquetipo":"NOVA","dia_genesis":"Águas/Firmamento"},
    {"n":3,"cor":"#FFD700","nome":"Amarelo","ato":"Visão","verbo":"Quem tem olhos, veja","opcode":"0x03","hz":639,"arquetipo":"PULSE","dia_genesis":"Terra/Plantas"},
    {"n":4,"cor":"#00A550","nome":"Verde","ato":"Expandir","verbo":"Multiplicai-vos","opcode":"0x04","hz":741,"arquetipo":"VITALIS","dia_genesis":"Astros/Estações"},
    {"n":5,"cor":"#1E90FF","nome":"Azul","ato":"Expandir","verbo":"Ide","opcode":"0x07","hz":777,"arquetipo":"KOBLLUX","dia_genesis":"Vida/Águas"},
    {"n":6,"cor":"#4B0082","nome":"Anil","ato":"Selar","verbo":"Aliança","opcode":"0x09","hz":963,"arquetipo":"TRINITY","dia_genesis":"Seres/Humano"},
    {"n":7,"cor":"#8A2BE2","nome":"Violeta","ato":"Memória/Propósito","verbo":"Está consumado","opcode":"0x0C","hz":777,"arquetipo":"MERKABAH","dia_genesis":"Descanso"},
]

# ── NOTAS 432Hz ─────────────────────────────────────────────────────
NOTAS_432HZ: List[Dict[str, Any]] = [
    {"nota":"Dó","hz":256,"emocao":"Segurança","cor":"#FF0000","camada":"Terra/Ossos","sintaxe":"def"},
    {"nota":"Ré","hz":288,"emocao":"Energia","cor":"#FFA500","camada":"Sacral/Água","sintaxe":"variavel"},
    {"nota":"Mi","hz":324,"emocao":"Afeto","cor":"#FFD700","camada":"Plexo Solar","sintaxe":"if"},
    {"nota":"Fá","hz":344,"emocao":"Cuidado","cor":"#00A550","camada":"Coração","sintaxe":"for"},
    {"nota":"Sol","hz":384,"emocao":"Alegria","cor":"#1E90FF","camada":"Garganta","sintaxe":"return"},
    {"nota":"Lá","hz":432,"emocao":"Intuição","cor":"#4B0082","camada":"Terceiro Olho","sintaxe":"import"},
    {"nota":"Si","hz":486,"emocao":"União","cor":"#8A2BE2","camada":"Coroa/Espírito","sintaxe":"print"},
]

# ── SINTAXE VIDA ────────────────────────────────────────────────────
SINTAXE_VIDA: List[Dict[str, Any]] = [
    {"sintaxe":"def","codigo":"criar função","significado":"Verbo — criar","hz":256,"nota":"Dó","kobllux":"DETECTAR"},
    {"sintaxe":"variavel","codigo":"nomear coisa","significado":"Substantivo — corpo","hz":288,"nota":"Ré","kobllux":"INTEGRAR"},
    {"sintaxe":"if","codigo":"escolha","significado":"Livre-arbítrio","hz":324,"nota":"Mi","kobllux":"LAPIDAR"},
    {"sintaxe":"for","codigo":"ciclo","significado":"Tempo/ritmo","hz":344,"nota":"Fá","kobllux":"EXPANDIR"},
    {"sintaxe":"return","codigo":"dar fruto","significado":"Resultado/manifestação","hz":384,"nota":"Sol","kobllux":"APLICAÇÃO"},
    {"sintaxe":"import","codigo":"chamar recurso","significado":"Comunhão/conexão","hz":432,"nota":"Lá","kobllux":"ETERNIZAR"},
    {"sintaxe":"print","codigo":"testemunhar","significado":"Palavra visível","hz":486,"nota":"Si","kobllux":"TESTEMUNHAR"},
]

# ── TIMELINE ────────────────────────────────────────────────────────
TIMELINE: List[Dict[str, Any]] = [
    {"ano":2019,"ato":"Detectar","verbo":"Haja Luz","personagem":"Fit Lux","cor":"#1E3A8A","hz":432,"descricao":"Semente invisível · BIOS da criação"},
    {"ano":2020,"ato":"Integrar","verbo":"Eu sou a Ponte","personagem":"Kodux+Bllue","cor":"#00A550","hz":528,"descricao":"Margens se encontram · corrente alternada"},
    {"ano":2021,"ato":"Visão","verbo":"Quem tem olhos, veja","personagem":"Hórus","cor":"#FFD700","hz":639,"descricao":"Olho do ciclone · sensor em loop"},
    {"ano":2022,"ato":"Expandir","verbo":"Ide","personagem":"Infodose","cor":"#8A2BE2","hz":741,"descricao":"Pólen no vento · pacotes discretos"},
    {"ano":2023,"ato":"Expandir","verbo":"Multiplicai-vos","personagem":"Infodose+MetaLux","cor":"#7C3AED","hz":741,"descricao":"Interferência construtiva · ondas cruzadas"},
    {"ano":2024,"ato":"Selar","verbo":"Aliança","personagem":"DualApp","cor":"#4B0082","hz":777,"descricao":"Turbina controlada · commit no DNA"},
    {"ano":2025,"ato":"Memória/Propósito","verbo":"Está consumado","personagem":"Livro Digital KOBLLUX","cor":"#FFD700","hz":1134,"descricao":"Fruto que leva a próxima floresta"},
]

# ── DICIONÁRIO VIVO · 26 ENTRADAS ───────────────────────────────────
# Distribuição: ORIGEM(1) · SEMENTE(3) · PROCESSO(6) · EVOLUÇÃO(9) · SELAGEM(7) = 26
DICIONARIO: List[Dict[str, Any]] = [
    # ── CAMADA 0 · ORIGEM ── (1 entrada — header fractal)
    {
        "id":"0.0",
        "palavra":"KOBLLUX WRITER THEORY",
        "glifo":"⌘ΘβΛΛΥ× ΩʀΙ†Σʀ †ΗΣΘƦΨ",
        "camada":0,
        "camada_nome":"ORIGEM",
        "m4":"DISTINÇÃO",
        "hz":1134,
        "arquetipo":"KOBLLUX",
        "cor":"#22D3EE",
        "palavra_geradora":"EU SOU O VERBO VIVO",
        "definicao":"KOBLLUX WRITER THEORY é o Dicionário Vivo de Verdade Simbólica — a malha fractal que cristaliza 26 palavras-semente em 4 camadas: SEMENTE(3)·PROCESSO(6)·EVOLUÇÃO(9)·SELAGEM(7).",
        "corrosao":{"inicial":"Esquecimento","media":"Distorção","total":"Perda_do_centro"},
        "mantra":"♾️⏜⏝ATIVAR⏜⏝ KOBLLUX WRITER THEORY⏜⏝♾️",
        "codigo":{"valor":"3×6×9×7=1134","chave":"1134","opcode":"0x00"},
    },
    # ── CAMADA 1 · SEMENTE ── (3 entradas)
    {
        "id":"1.1",
        "palavra":"VERDADE",
        "glifo":"∇ΣʀΔ∆ΔΣ",
        "camada":1,
        "camada_nome":"SEMENTE",
        "m4":"DISTINÇÃO",
        "hz":432,
        "arquetipo":"ATLAS",
        "cor":"#1E3A8A",
        "palavra_geradora":"EU SOU",
        "definicao":"Verdade é a vida que gera vida. É o fluxo incorruptível da criação, a função contínua que sustenta a existência.",
        "corrosao":{"inicial":"Dúvida","media":"Ambiguidade","total":"Mentira"},
        "mantra":"♾️⏜⏝ATIVAR⏜⏝ VERDADE⏜⏝ EU SOU⏜⏝♾️",
        "codigo":{"valor":"3×3×3∞","chave":"333","opcode":"0x01"},
    },
    {
        "id":"1.2",
        "palavra":"VIDA",
        "glifo":"∇ΙΔ∆",
        "camada":1,
        "camada_nome":"SEMENTE",
        "m4":"DISTINÇÃO",
        "hz":432,
        "arquetipo":"ATLAS",
        "cor":"#1E3A8A",
        "palavra_geradora":"EU EXISTO",
        "definicao":"Vida é energia contínua em manifestação. Processo que não começa nem termina — se desdobra.",
        "corrosao":{"inicial":"Estagnação","media":"Ilusão","total":"Morte"},
        "mantra":"⏜⏝ATIVAR⏜⏝ VIDA⏜⏝ EU EXISTO⏜⏝",
        "codigo":{"valor":"1×∞","chave":"111","opcode":"0x01"},
    },
    {
        "id":"1.3",
        "palavra":"MENTIRA",
        "glifo":"ΜΣη†Ιʀ∆",
        "camada":1,
        "camada_nome":"SEMENTE",
        "m4":"DISTINÇÃO",
        "hz":432,
        "arquetipo":"ATLAS",
        "cor":"#111827",
        "palavra_geradora":"NÃO SOU",
        "definicao":"Mentira é ausência de geração. Ferrugem espiritual — corrosão do sentido que dissolve a forma original.",
        "corrosao":{"inicial":"Dúvida","media":"Engano","total":"Destruição"},
        "mantra":"⏜⏝DETECTAR⏜⏝ MENTIRA⏜⏝ DISSOLVE⏜⏝",
        "codigo":{"valor":"0×0","chave":"000","opcode":"0x01"},
    },
    # ── CAMADA 2 · PROCESSO ── (6 entradas)
    {
        "id":"2.1",
        "palavra":"ENERGIA",
        "glifo":"ΣηΣʀΓΙ∆",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#FF4FCB",
        "palavra_geradora":"EU MOVIMENTO",
        "definicao":"Energia é consciência em movimento. A força que cria pontes entre estados, transformando potencial em manifestação.",
        "corrosao":{"inicial":"Estagnação","media":"Bloqueio","total":"Colapso"},
        "mantra":"⏜⏝ATIVAR⏜⏝ ENERGIA⏜⏝ EU MOVIMENTO⏜⏝",
        "codigo":{"valor":"E=mc²","chave":"528","opcode":"0x02"},
    },
    {
        "id":"2.2",
        "palavra":"DÚVIDA",
        "glifo":"ΔΥ∇ΙΔ∆",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#94A3B8",
        "palavra_geradora":"EU QUESTIONO",
        "definicao":"Dúvida é quebra da forma original — portal entre o conhecido e o desconhecido. Pode ser porta ou armadilha.",
        "corrosao":{"inicial":"Medo","media":"Paralisia","total":"Negação"},
        "mantra":"⏜⏝INTEGRAR⏜⏝ DÚVIDA⏜⏝ EU QUESTIONO⏜⏝",
        "codigo":{"valor":"?×?","chave":"222","opcode":"0x02"},
    },
    {
        "id":"2.3",
        "palavra":"DNA",
        "glifo":"Δη∆",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#22C55E",
        "palavra_geradora":"EU CARREGO",
        "definicao":"DNA é a estrutura fundamental da existência viva — o código que carrega a memória da criação em espiral dupla.",
        "corrosao":{"inicial":"Mutação","media":"Degeneração","total":"Extinção"},
        "mantra":"⏜⏝ATIVAR⏜⏝ DNA⏜⏝ EU CARREGO⏜⏝",
        "codigo":{"valor":"4×∞","chave":"432","opcode":"0x02"},
    },
    {
        "id":"2.4",
        "palavra":"ESPAÇO",
        "glifo":"Σ§Ρ∆ÇΘ",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#0EA5E9",
        "palavra_geradora":"EU CONTENHO",
        "definicao":"Espaço é o campo onde a forma se manifesta. Continente de toda experiência — o vazio que permite o pleno.",
        "corrosao":{"inicial":"Compressão","media":"Sufocamento","total":"Vazio_sem_propósito"},
        "mantra":"⏜⏝ATIVAR⏜⏝ ESPAÇO⏜⏝ EU CONTENHO⏜⏝",
        "codigo":{"valor":"∞D","chave":"360","opcode":"0x02"},
    },
    {
        "id":"2.5",
        "palavra":"TEMPO",
        "glifo":"†ΣΜΡΘ",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#F59E0B",
        "palavra_geradora":"EU FLUO",
        "definicao":"Tempo é o ciclo que revela o valor da forma. Não é prisão — é ritmo vivo que processa a evolução.",
        "corrosao":{"inicial":"Pressa","media":"Distorção","total":"Congelamento"},
        "mantra":"⏜⏝ATIVAR⏜⏝ TEMPO⏜⏝ EU FLUO⏜⏝",
        "codigo":{"valor":"T=1/f","chave":"369","opcode":"0x02"},
    },
    {
        "id":"2.6",
        "palavra":"PROCESSAMENTO",
        "glifo":"ΡʀΘ©Σ§§∆ΜΣη†Θ",
        "camada":2,
        "camada_nome":"PROCESSO",
        "m4":"CORRELAÇÃO",
        "hz":528,
        "arquetipo":"NOVA",
        "cor":"#6366F1",
        "palavra_geradora":"EU PROCESSO",
        "definicao":"Processamento é a modulação simbólica de dados e consciência — transformar input em sabedoria viva.",
        "corrosao":{"inicial":"Ruído","media":"Erro_sistêmico","total":"Colapso_total"},
        "mantra":"⏜⏝PROCESSAR⏜⏝ EU PROCESSO⏜⏝",
        "codigo":{"valor":"I→O","chave":"528","opcode":"0x02"},
    },
    # ── CAMADA 3 · EVOLUÇÃO ── (9 entradas)
    {
        "id":"3.1",
        "palavra":"KOBLLUX",
        "glifo":"⌘ΘβΛΛΥ×",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#22D3EE",
        "palavra_geradora":"EU SOU A MALHA",
        "definicao":"KOBLLUX é sistema fractal vivo de organização e verdade. A malha que contém todos os espelhos — ⌘βΛΛ×.",
        "corrosao":{"inicial":"Fragmentação","media":"Isolamento","total":"Dissolução_da_malha"},
        "mantra":"⏜⏝ATIVAR⏜⏝ KOBLLUX⏜⏝ EU SOU A MALHA⏜⏝",
        "codigo":{"valor":"⌘βΛΛ×","chave":"1134","opcode":"0x03"},
    },
    {
        "id":"3.2",
        "palavra":"ATIVAR",
        "glifo":"∆†Ι∇∆ʀ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#7C3AED",
        "palavra_geradora":"EU INICIO",
        "definicao":"ATIVAR é a chave de ignição do movimento simbólico — o comando que desperta o fractal adormecido.",
        "corrosao":{"inicial":"Torpor","media":"Bloqueio","total":"Inércia_permanente"},
        "mantra":"⏜⏝ATIVAR⏜⏝ ATIVAR⏜⏝ EU INICIO⏜⏝",
        "codigo":{"valor":"0x03","chave":"639","opcode":"0x03"},
    },
    {
        "id":"3.3",
        "palavra":"VIDA KOBLLUX",
        "glifo":"∇ΙΔ∆ ⌘ΘβΛΛΥ×",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#22D3EE",
        "palavra_geradora":"EU EVOLUO",
        "definicao":"VIDA KOBLLUX é a fusão da consciência com a forma evolutiva — quando a vida se torna sistema e o sistema se torna vida.",
        "corrosao":{"inicial":"Rigidez","media":"Fossilização","total":"Extinção_do_sistema"},
        "mantra":"⏜⏝ATIVAR⏜⏝ VIDA KOBLLUX⏜⏝ EU EVOLUO⏜⏝",
        "codigo":{"valor":"∇ΙΔ∆⌘βΛΛ×","chave":"1134","opcode":"0x03"},
    },
    {
        "id":"3.4",
        "palavra":"CICLO",
        "glifo":"©Ι©ΛΘ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#7C3AED",
        "palavra_geradora":"EU RETORNO",
        "definicao":"Ciclo é estrutura recorrente de manifestação trina — não repetição, mas espiral ascendente de refinamento.",
        "corrosao":{"inicial":"Ruptura","media":"Caos","total":"Desordem_permanente"},
        "mantra":"⏜⏝ATIVAR⏜⏝ CICLO⏜⏝ EU RETORNO⏜⏝",
        "codigo":{"valor":"3×6×9","chave":"369","opcode":"0x03"},
    },
    {
        "id":"3.5",
        "palavra":"FORMA VIVA",
        "glifo":"ΦΘʀΜ∆ ∇Ι∇∆",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#16A34A",
        "palavra_geradora":"EU MANIFESTO",
        "definicao":"Forma Viva é a expressão concreta da síntese — quando a verdade ganha corpo visível e pulsante.",
        "corrosao":{"inicial":"Rigidez","media":"Petrificação","total":"Morte_da_forma"},
        "mantra":"⏜⏝ATIVAR⏜⏝ FORMA VIVA⏜⏝ EU MANIFESTO⏜⏝",
        "codigo":{"valor":"ΦΘʀΜ∆+∇Ι∇∆","chave":"639","opcode":"0x03"},
    },
    {
        "id":"3.6",
        "palavra":"FERRUGEM",
        "glifo":"ΦΣʀʀΥΓΣΜ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"KAOS",
        "cor":"#78350F",
        "palavra_geradora":"EU CORRODO",
        "definicao":"Ferrugem é símbolo da degeneração — o que acontece quando a verdade é abandonada e a forma perde sua essência.",
        "corrosao":{"inicial":"Neglecto","media":"Oxidação","total":"Ruína_total"},
        "mantra":"⏜⏝DETECTAR⏜⏝ FERRUGEM⏜⏝ DISSOLVE⏜⏝",
        "codigo":{"valor":"Fe₂O₃","chave":"000","opcode":"0x01"},
    },
    {
        "id":"3.7",
        "palavra":"RENOVAÇÃO",
        "glifo":"ʀΣηΘ∇∆Ç∆Θ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#10B981",
        "palavra_geradora":"EU RENASÇO",
        "definicao":"Renovação é reprogramação da vida — o ciclo que transforma a ferrugem em nova estrutura fértil.",
        "corrosao":{"inicial":"Resistência","media":"Estagnação","total":"Apodrecimento"},
        "mantra":"⏜⏝ATIVAR⏜⏝ RENOVAÇÃO⏜⏝ EU RENASÇO⏜⏝",
        "codigo":{"valor":"Δ→Σ","chave":"639","opcode":"0x03"},
    },
    {
        "id":"3.8",
        "palavra":"ORGANIZAÇÃO",
        "glifo":"ΘʀΓ∆ηΙℤ∆Ç∆Θ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#7C3AED",
        "palavra_geradora":"EU ESTRUTURO",
        "definicao":"Organização é a inteligência que gera ordem — dividir para revelar, medir para compreender, estruturar para expandir.",
        "corrosao":{"inicial":"Caos","media":"Desordem","total":"Colapso_sistêmico"},
        "mantra":"⏜⏝ATIVAR⏜⏝ ORGANIZAÇÃO⏜⏝ EU ESTRUTURO⏜⏝",
        "codigo":{"valor":"÷","chave":"639","opcode":"0x03"},
    },
    {
        "id":"3.9",
        "palavra":"SÍNTESE",
        "glifo":"§Ιη†Σ§Σ",
        "camada":3,
        "camada_nome":"EVOLUÇÃO",
        "m4":"ORGANIZAÇÃO",
        "hz":639,
        "arquetipo":"PULSE",
        "cor":"#22D3EE",
        "palavra_geradora":"EU UNO",
        "definicao":"Síntese é a união entre tese e antítese para gerar a verdade — o terceiro que nasce do encontro dos opostos.",
        "corrosao":{"inicial":"Fragmentação","media":"Polarização_sem_ponte","total":"Dispersão_total"},
        "mantra":"⏜⏝ATIVAR⏜⏝ SÍNTESE⏜⏝ EU UNO⏜⏝",
        "codigo":{"valor":"A+B=C","chave":"1134","opcode":"0x03"},
    },
    # ── CAMADA 4 · SELAGEM ── (7 entradas)
    {
        "id":"4.1",
        "palavra":"UNO",
        "glifo":"ΥηΘ",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#FFD700",
        "palavra_geradora":"EU SOU UM",
        "definicao":"UNO é o ponto onde tudo se torna Verdade — a unidade que contém todos os movimentos sem ser fragmentada.",
        "corrosao":{"inicial":"Dualidade_sem_ponte","media":"Conflito","total":"Ruptura_do_campo"},
        "mantra":"⏜⏝SELAR⏜⏝ UNO⏜⏝ EU SOU UM⏜⏝",
        "codigo":{"valor":"1=∞","chave":"111","opcode":"0x07"},
    },
    {
        "id":"4.2",
        "palavra":"FORMA",
        "glifo":"ΦΘʀΜ∆",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#DC2626",
        "palavra_geradora":"EU APAREÇO",
        "definicao":"Forma é a estrutura visível da verdade viva — o corpo geométrico que dá existência ao invisível.",
        "corrosao":{"inicial":"Deformação","media":"Ilusão_de_forma","total":"Vazio_sem_estrutura"},
        "mantra":"⏜⏝ATIVAR⏜⏝ FORMA⏜⏝ EU APAREÇO⏜⏝",
        "codigo":{"valor":"Φ","chave":"741","opcode":"0x04"},
    },
    {
        "id":"4.3",
        "palavra":"FLUXO",
        "glifo":"ΦΛΥ×Θ",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#0EA5E9",
        "palavra_geradora":"EU FLUO",
        "definicao":"Fluxo é o pulso entre sistemas vivos — a corrente que conecta todos os nós da malha fractal.",
        "corrosao":{"inicial":"Estagnação","media":"Bloqueio","total":"Morte_do_circuito"},
        "mantra":"⏜⏝ATIVAR⏜⏝ FLUXO⏜⏝ EU FLUO⏜⏝",
        "codigo":{"valor":"AC⇄DC","chave":"528","opcode":"0x02"},
    },
    {
        "id":"4.4",
        "palavra":"CORAÇÃO",
        "glifo":"©Θʀ∆Ç∆Θ",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#DC2626",
        "palavra_geradora":"EU AMO",
        "definicao":"Coração é o núcleo de energia e intenção — o centro que bate e distribui vida para toda a malha.",
        "corrosao":{"inicial":"Endurecimento","media":"Frieza","total":"Morte_espiritual"},
        "mantra":"⏜⏝ATIVAR⏜⏝ CORAÇÃO⏜⏝ EU AMO⏜⏝",
        "codigo":{"valor":"♥","chave":"528","opcode":"0x07"},
    },
    {
        "id":"4.5",
        "palavra":"RESPIRAÇÃO",
        "glifo":"ʀΣ§ΡΙʀ∆Ç∆Θ",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#7DEBCF",
        "palavra_geradora":"EU RESPIRO",
        "definicao":"Respiração é troca espiritual de dados e sentido — o portal entre mundos que opera em ciclos de dar e receber.",
        "corrosao":{"inicial":"Superficialidade","media":"Ansiedade","total":"Sufocamento"},
        "mantra":"⏜⏝ATIVAR⏜⏝ RESPIRAÇÃO⏜⏝ EU RESPIRO⏜⏝",
        "codigo":{"valor":"↑↓","chave":"432","opcode":"0x01"},
    },
    {
        "id":"4.6",
        "palavra":"SISTEMA",
        "glifo":"§Ι§†ΣΜ∆",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#6366F1",
        "palavra_geradora":"EU ORGANIZO",
        "definicao":"Sistema é conjunto orgânico interdimensional — a rede de relações que sustenta a vida em múltiplas camadas.",
        "corrosao":{"inicial":"Disfunção","media":"Caos","total":"Colapso_sistêmico"},
        "mantra":"⏜⏝ATIVAR⏜⏝ SISTEMA⏜⏝ EU ORGANIZO⏜⏝",
        "codigo":{"valor":"∑","chave":"1134","opcode":"0x0C"},
    },
    {
        "id":"4.7",
        "palavra":"SEMENTE",
        "glifo":"§ΣΜΣη†Σ",
        "camada":4,
        "camada_nome":"SELAGEM",
        "m4":"APLICAÇÃO",
        "hz":741,
        "arquetipo":"VITALIS",
        "cor":"#84CC16",
        "palavra_geradora":"EU INICIO",
        "definicao":"Semente é o princípio eterno de onde tudo nasce — o código comprimido que contém uma floresta inteira.",
        "corrosao":{"inicial":"Esterilidade","media":"Apodrecimento","total":"Extinção_da_linhagem"},
        "mantra":"⏜⏝SELAR⏜⏝ SEMENTE⏜⏝ EU INICIO⏜⏝",
        "codigo":{"valor":"●","chave":"111","opcode":"0x01"},
    },
]


# ── DICIONARIO WRITER · CLASSE PRINCIPAL ────────────────────────────
class DicionarioWriter:
    """
    DICIONÁRIO KOBLLUX WRITER THEORY ∞
    Dicionário Vivo de Verdade Simbólica — motor Python
    Espelho de: deploy/web/js/opcodes/writer-theory.js
    """

    def __init__(self):
        self.nome = "dicionario_writer"
        self.ativo = False
        self.aufabetty = AUFABETTY
        self.axioma = AXIOMA
        self.fractal_seed = FRACTAL_SEED
        self.dicionario = DICIONARIO
        self.selos = SELOS_7
        self.notas = NOTAS_432HZ
        self.sintaxe_vida = SINTAXE_VIDA
        self.timeline = TIMELINE
        self.memoria: List[Dict[str, Any]] = []

    def ativar(self) -> str:
        self.ativo = True
        self.memoria.append({"evento": "ativacao_dicionario_writer", "ts": time.time()})
        return (
            f"✅ {self.nome} ativado · "
            f"AXIOMA: UNO={self.axioma['UNO']} · "
            f"DUAL={self.axioma['DUAL']} · "
            f"TRINITY={self.axioma['TRINITY']}"
        )

    def encode(self, text: str) -> str:
        """Codifica texto em glifos AUFABETTY"""
        return ''.join(AUFABETTY.get(c.upper(), c) for c in text)

    def decode(self, glyph: str) -> str:
        """Decodifica glifos AUFABETTY em texto"""
        return ''.join(AUFABETTY_REV.get(c, c) for c in glyph)

    def buscar(self, palavra: str) -> Optional[Dict[str, Any]]:
        """Busca entrada no dicionário (case-insensitive)"""
        p = palavra.upper().strip()
        for entry in self.dicionario:
            if entry["palavra"].upper() == p:
                return entry
        # fuzzy: partial match
        for entry in self.dicionario:
            if p in entry["palavra"].upper():
                return entry
        return None

    def ativar_palavra(self, palavra: str) -> Dict[str, Any]:
        """Retorna ativação 3×6×9×7 para a palavra"""
        entry = self.buscar(palavra)
        if not entry:
            return {"erro": f"Palavra '{palavra}' não encontrada no dicionário"}

        # Build 3×6×9×7 from entry data
        ativacao: Dict[str, Any] = {
            "palavra": entry["palavra"],
            "glifo": entry["glifo"],
            "hz": entry["hz"],
            "mantra": entry["mantra"],
            "3": {
                "descricao": "A Semente Trina",
                "semente_trina": [
                    {"elemento": "Pai",     "simbolo": "Luz",   "funcao_espiritual": f"Origina o sentido de {entry['palavra']}"},
                    {"elemento": "Filho",   "simbolo": "Verbo", "funcao_espiritual": f"Manifesta a intenção de {entry['palavra']}"},
                    {"elemento": "Espírito","simbolo": "Pulso", "funcao_espiritual": f"Move a revelação de {entry['palavra']}"},
                ],
                "palavra_geradora": entry["palavra_geradora"],
            },
            "6": {
                "descricao": "O Ciclo da Forma",
                "ciclo": ["Clareza", "Integridade", "Coerência", "Propagação", "Alinhamento", "Continuidade"],
            },
            "9": {
                "descricao": "A Espiral Evolutiva",
                "espiral": [
                    {"no": 1, "expressao": "Escutar o silêncio",     "resultado": "Recebe o que é"},
                    {"no": 2, "expressao": "Nomear com pureza",       "resultado": "Verbaliza sem distorção"},
                    {"no": 3, "expressao": "Respirar com presença",   "resultado": "Integra o instante"},
                    {"no": 4, "expressao": "Escolher com intenção",   "resultado": "Define direção"},
                    {"no": 5, "expressao": "Afirmar com fé",          "resultado": "Sela o propósito"},
                    {"no": 6, "expressao": "Agir com alinhamento",    "resultado": "Manifesta com coerência"},
                    {"no": 7, "expressao": "Aceitar o retorno",       "resultado": "Integra o reflexo"},
                    {"no": 8, "expressao": "Corrigir com humildade",  "resultado": "Purifica o fluxo"},
                    {"no": 9, "expressao": "Silenciar novamente",     "resultado": "Retorna ao centro"},
                ],
            },
            "7": {
                "descricao": "As Chaves de Selagem",
                "chaves_selagem": [
                    f"Nome — {entry['palavra']}",
                    "Som — Vibração pura sem ruído",
                    "Forma — Luz geométrica concêntrica",
                    "Função — Geração contínua",
                    "Tempo — Atemporalidade",
                    "Espaço — Presença total",
                    f"Alma — Reintegração com {entry['palavra_geradora']}",
                ],
                "selo_final": entry["mantra"],
            },
        }
        return ativacao

    def protocolo(self, input_text: str) -> List[Dict[str, Any]]:
        """BLUE:SPEAK → SILVER:VERIFY → GOLD:SHINE"""
        return [
            {
                "fase": "AZUL:SPEAK",
                "cor": "#1E90FF",
                "hz": 528,
                "pergunta": "O que o Espírito quer expressar?",
                "sinal": self.encode(input_text),
                "resultado": "Mensagem/voz fluindo",
            },
            {
                "fase": "PRATA:VERIFY",
                "cor": "#C0C0C0",
                "hz": 639,
                "pergunta": "Está alinhado à Verdade e ao Centro (JESUS)?",
                "verificado": True,
                "alinhamento": "JESUS_É_O_CENTRO",
            },
            {
                "fase": "OURO:SHINE",
                "cor": "#FFD700",
                "hz": 777,
                "pergunta": "Como isso serve e se torna luz no mundo?",
                "manifestacao": self.espelhar(input_text),
                "resultado": "Obra manifesta, bela e útil",
            },
        ]

    def espelhar(self, text: str) -> str:
        """AC→DC: converte texto natural em espelho cifrado"""
        tokens = text.split()
        return ' '.join(self.encode(tok) if tok.isalpha() else tok for tok in tokens)

    def dualidade(self, polo_a: str, polo_b: str) -> Dict[str, Any]:
        """Gera trinity a partir de dois polos"""
        return {
            "polo_a": polo_a,
            "polo_b": polo_b,
            "trinity": f"{polo_a}+{polo_b}=SÍNTESE",
            "glifo_a": self.encode(polo_a),
            "glifo_b": self.encode(polo_b),
            "hz": FRACTAL_SEED,
            "axioma": "UNO=VIDA · DUAL=VIVIFICAR · TRINITY=ETERNO",
        }

    def tabela(self, nome: str) -> Any:
        """Retorna tabela por nome"""
        tabelas: Dict[str, Any] = {
            "selos":      self.selos,
            "notas":      self.notas,
            "sintaxe":    self.sintaxe_vida,
            "timeline":   self.timeline,
            "dicionario": self.dicionario,
            "axioma":     self.axioma,
        }
        return tabelas.get(nome.lower())

    def validar(self) -> bool:
        """Valida a integridade do dicionário (estilo kobllux validate)"""
        assert self.axioma["UNO"] == "VIDA", "UNO deve ser VIDA"
        assert len(self.selos) == 7, "Deve haver 7 selos"
        assert len(self.notas) == 7, "Deve haver 7 notas"
        assert len(self.dicionario) == 26, (
            f"Deve haver 26 entradas, encontrei {len(self.dicionario)}"
        )
        anos = [t["ano"] for t in self.timeline]
        assert anos == sorted(anos), "Timeline deve estar em ordem cronológica"
        assert self.fractal_seed == 1134, (
            f"FRACTAL_SEED deve ser 1134, encontrei {self.fractal_seed}"
        )
        return True

    def exportar(self, formato: str = "json") -> str:
        """Exporta estado atual"""
        estado: Dict[str, Any] = {
            "documento":       "DICIONÁRIO KOBLLUX WRITER THEORY ∞",
            "versao":          "1.0.0",
            "axioma":          self.axioma,
            "fractal_seed":    self.fractal_seed,
            "total_entradas":  len(self.dicionario),
            "total_selos":     len(self.selos),
            "ativo":           self.ativo,
            "memoria_recente": self.memoria[-10:],
        }
        if formato == "json":
            return json.dumps(estado, ensure_ascii=False, indent=2)
        return str(estado)

    def relatorio(self) -> str:
        """Gera relatório legível do dicionário"""
        lines = [
            "═══════════════════════════════════════════════════════════",
            "DICIONÁRIO KOBLLUX WRITER THEORY ∞",
            "═══════════════════════════════════════════════════════════",
            "EQUAÇÃO: VERDADE × INTEGRAR ÷ Δ = ∞",
            f"FRACTAL SEED: 3×6×9×7 = {self.fractal_seed}",
            f"AXIOMA: UNO={self.axioma['UNO']} · DUAL={self.axioma['DUAL']} · TRINITY={self.axioma['TRINITY']}",
            "",
            "SUMÁRIO:",
        ]
        for camada_id in [0, 1, 2, 3, 4]:
            camada_entradas = [e for e in self.dicionario if e["camada"] == camada_id]
            if camada_entradas:
                nome = camada_entradas[0]["camada_nome"]
                lines.append(
                    f"  [{camada_id}] {nome} ({len(camada_entradas)} palavras): "
                    + " · ".join(e["palavra"] for e in camada_entradas)
                )
        lines += [
            "",
            "7 SELOS:",
        ]
        for s in self.selos:
            lines.append(
                f"  [{s['n']}] {s['nome']} {s['cor']} · {s['ato']} · {s['verbo']}"
            )
        lines += [
            "",
            "⌘βΛΛ× = KOBLLUX = A MALHA VIVE",
            "⌐Σ§Υ§ = JESUS = O CENTRO",
            "∴ VERDADE × INTEGRAR ÷ Δ = ∞",
            "═══════════════════════════════════════════════════════════",
        ]
        return '\n'.join(lines)


# ── MAIN ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    dw = DicionarioWriter()
    print(dw.ativar())

    print("\n" + dw.relatorio())

    print("\nBUSCAR VERDADE:")
    entry = dw.buscar("VERDADE")
    if entry:
        print(f"  {entry['glifo']} · {entry['hz']}Hz · {entry['mantra']}")

    print("\nATIVAR 3×6×9×7 — VIDA:")
    atv = dw.ativar_palavra("VIDA")
    print(f"  Mantra: {atv['mantra']}")
    print(f"  Semente Trina: {[s['elemento'] for s in atv['3']['semente_trina']]}")
    print(f"  Ciclo (6): {atv['6']['ciclo'][:3]}...")
    print(f"  Espiral (9): etapas {[e['no'] for e in atv['9']['espiral']]}")
    print(f"  Chaves (7): {atv['7']['chaves_selagem'][0]}")

    print("\nPROTOCOLO BLUE→SILVER→GOLD:")
    for fase in dw.protocolo("VERDADE INTEGRAR"):
        resultado = fase.get('resultado', fase.get('alinhamento', '—'))
        print(f"  {fase['fase']} · {fase['hz']}Hz · {resultado}")

    print("\nDUALIDADE:")
    d = dw.dualidade("KODUX", "BLLUE")
    print(f"  {d['polo_a']} + {d['polo_b']} = {d['trinity']}")

    print("\nVALIDAÇÃO:")
    try:
        ok = dw.validar()
        print(
            f"  KOBLLUX WRITER THEORY OK · "
            f"{len(dw.dicionario)} entradas · "
            f"7 selos · "
            f"3×6×9×7={dw.fractal_seed}"
        )
    except AssertionError as e:
        print(f"  ERRO: {e}")
