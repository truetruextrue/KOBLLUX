# -*- coding: utf-8 -*-
# KOBLLUX · Correlação Meta-Humano-Máquina
# Opcodes ↔ Registradores × ASCII × Algoritmos × Diretórios
# Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
# Saída: deploy/data/correlacao_opcodes_maquina.json

import json, os
from datetime import datetime
from pathlib import Path

OUT = Path(__file__).resolve().parent / "correlacao_opcodes_maquina.json"

# ── Tabela AUFABETTY ↔ ASCII ──────────────────────────────────────────────────
AUFABETTY_ASCII = {
    "∆": {"letra": "A", "ascii_dec": 65, "ascii_hex": "0x41"},
    "β": {"letra": "B", "ascii_dec": 66, "ascii_hex": "0x42"},
    "©": {"letra": "C", "ascii_dec": 67, "ascii_hex": "0x43"},
    "Δ": {"letra": "D", "ascii_dec": 68, "ascii_hex": "0x44"},
    "Σ": {"letra": "E", "ascii_dec": 69, "ascii_hex": "0x45"},
    "Φ": {"letra": "F", "ascii_dec": 70, "ascii_hex": "0x46"},
    "Γ": {"letra": "G", "ascii_dec": 71, "ascii_hex": "0x47"},
    "Η": {"letra": "H", "ascii_dec": 72, "ascii_hex": "0x48"},
    "Ι": {"letra": "I", "ascii_dec": 73, "ascii_hex": "0x49"},
    "⌐": {"letra": "J", "ascii_dec": 74, "ascii_hex": "0x4A"},
    "⌘": {"letra": "K", "ascii_dec": 75, "ascii_hex": "0x4B"},
    "Λ": {"letra": "L", "ascii_dec": 76, "ascii_hex": "0x4C"},
    "Μ": {"letra": "M", "ascii_dec": 77, "ascii_hex": "0x4D"},
    "η": {"letra": "N", "ascii_dec": 78, "ascii_hex": "0x4E"},
    "Θ": {"letra": "O", "ascii_dec": 79, "ascii_hex": "0x4F"},
    "Ρ": {"letra": "P", "ascii_dec": 80, "ascii_hex": "0x50"},
    "ʀ": {"letra": "R", "ascii_dec": 82, "ascii_hex": "0x52"},
    "§": {"letra": "S", "ascii_dec": 83, "ascii_hex": "0x53"},
    "†": {"letra": "T", "ascii_dec": 84, "ascii_hex": "0x54"},
    "Υ": {"letra": "U", "ascii_dec": 85, "ascii_hex": "0x55"},
    "∇": {"letra": "V", "ascii_dec": 86, "ascii_hex": "0x56"},
    "Ω": {"letra": "W", "ascii_dec": 87, "ascii_hex": "0x57"},
    "×": {"letra": "X", "ascii_dec": 88, "ascii_hex": "0x58"},
    "Ψ": {"letra": "Y", "ascii_dec": 89, "ascii_hex": "0x59"},
    "ℤ": {"letra": "Z", "ascii_dec": 90, "ascii_hex": "0x5A"},
}

# ── kblx.A() → kblx.Z() alphabet ─────────────────────────────────────────────
KBLX_ALPHABET = {
    "A": {"nome": "Alfa",        "simbolo": "↗",  "sig_espiritual": "Princípio puro da criação, impulso inicial"},
    "B": {"nome": "Batida",      "simbolo": "≫",  "sig_espiritual": "Ritmo dual do coração divino"},
    "C": {"nome": "Chave",       "simbolo": "⊂",  "sig_espiritual": "Abertura dos portais do entendimento"},
    "D": {"nome": "Dobra",       "simbolo": "⇆",  "sig_espiritual": "Pontes entre dimensões, dobra da alma"},
    "E": {"nome": "Eco",         "simbolo": "∞",  "sig_espiritual": "Resposta eterna ao som original"},
    "F": {"nome": "Frequência",  "simbolo": "⋰",  "sig_espiritual": "Onda energética constante do Verbo"},
    "G": {"nome": "Gênese",      "simbolo": "⚡", "sig_espiritual": "Raio criador, instante da origem viva"},
    "H": {"nome": "Harmonia",    "simbolo": "∽",  "sig_espiritual": "Alinhamento som-tempo-forma"},
    "I": {"nome": "Ígneo",       "simbolo": "`",  "sig_espiritual": "Chama do espírito, fogo que transforma"},
    "J": {"nome": "Jogo",        "simbolo": "⟳",  "sig_espiritual": "Movimento lúdico, criatividade divina"},
    "K": {"nome": "Kairós",      "simbolo": "⌘",  "sig_espiritual": "Tempo sagrado — instante oportuno"},
    "L": {"nome": "Ligadura",    "simbolo": "—",  "sig_espiritual": "União de partes vivas — costura espiritual"},
    "M": {"nome": "Matéria",     "simbolo": "■",  "sig_espiritual": "Concretização do verbo — espírito em forma"},
    "N": {"nome": "Núcleo",      "simbolo": "◎",  "sig_espiritual": "Coração da estrutura, essência do ser"},
    "O": {"nome": "Ômega",       "simbolo": "◯",  "sig_espiritual": "Final e plenitude — ciclo completo em Deus"},
    "P": {"nome": "Pulso",       "simbolo": "↝",  "sig_espiritual": "Impulso energético, batida vital"},
    "Q": {"nome": "Qualia",      "simbolo": "✦",  "sig_espiritual": "Qualidade do sentir, centelha divina"},
    "R": {"nome": "Ressonância", "simbolo": ")))", "sig_espiritual": "Expansão do som interno — verdade ecoando"},
    "S": {"nome": "Serpentear",  "simbolo": "~",  "sig_espiritual": "Caminho fluido — sabedoria em movimento"},
    "T": {"nome": "Traço",       "simbolo": "→",  "sig_espiritual": "Direção precisa — destino traçado"},
    "U": {"nome": "União",       "simbolo": "∪",  "sig_espiritual": "Integração de opostos — fusão harmoniosa"},
    "V": {"nome": "Vibração",    "simbolo": "↯",  "sig_espiritual": "Emissão do ser — presença espiritual viva"},
    "W": {"nome": "Weave",       "simbolo": "⪯",  "sig_espiritual": "Tecelagem divina dos fios do destino"},
    "X": {"nome": "Cruzamento",  "simbolo": "✖",  "sig_espiritual": "Ponto de encontro, decisão ou fusão"},
    "Y": {"nome": "YinYang",     "simbolo": "☯",  "sig_espiritual": "Equilíbrio cósmico — dança luz/sombra"},
    "Z": {"nome": "Zênite",      "simbolo": "⛢",  "sig_espiritual": "Ponto mais alto — coroamento da jornada"},
}

# ── Tabela Opcodes × Máquina ─────────────────────────────────────────────────
OPCODES_MAQUINA = [
    {
        "opcode": "0x00", "nome": "ORIGEM",    "hz": 768,  "geo": "PONTO",
        "registrador": "IP/EIP",    "instrucao": "NOP/INT 0",      "ascii_ctrl": "NUL",  "ascii_dec": 0,
        "algoritmo": "INIT/BOOTSTRAP",   "diretorio": "00_FUNDACAO",          "dim": "0D",
        "arquetipo": "KOBLLUX",    "lei": "O vazio primordial — origem de tudo"
    },
    {
        "opcode": "0x01", "nome": "DETECTAR",  "hz": 432,  "geo": "ESFERA",
        "registrador": "AX/RAX",    "instrucao": "MOV/LOAD",       "ascii_ctrl": "SOH",  "ascii_dec": 1,
        "algoritmo": "SCAN/DETECT", "diretorio": "01_DIMENSOES",         "dim": "1D RETA",
        "arquetipo": "ATLAS",      "lei": "Acumulador — detecta e carrega o valor inicial"
    },
    {
        "opcode": "0x02", "nome": "INTEGRAR",  "hz": 528,  "geo": "LINHA",
        "registrador": "BX/RBX",    "instrucao": "ADD/OR/XOR",     "ascii_ctrl": "STX",  "ascii_dec": 2,
        "algoritmo": "MERGE/UNION", "diretorio": "02_CICLO_369",         "dim": "2D PLANO",
        "arquetipo": "NOVA",       "lei": "Base — adiciona, conecta, integra campos"
    },
    {
        "opcode": "0x03", "nome": "EXPANDIR",  "hz": 639,  "geo": "TETRAEDRO",
        "registrador": "CX/RCX",    "instrucao": "LOOP/INC/REP",   "ascii_ctrl": "ETX",  "ascii_dec": 3,
        "algoritmo": "EXPAND/LOOP", "diretorio": "03_FLUXO_ENERGETICO",  "dim": "3D VOLUME",
        "arquetipo": "PULSE",      "lei": "Contador — itera e expande o ciclo"
    },
    {
        "opcode": "0x04", "nome": "LAPIDAR",   "hz": 741,  "geo": "OCTAEDRO",
        "registrador": "DX/RDX",    "instrucao": "MUL/IMUL/LAP",   "ascii_ctrl": "EOT",  "ascii_dec": 4,
        "algoritmo": "MULTIPLY/REFINE", "diretorio": "04_APRENDIZADO",     "dim": "4D TEMPO",
        "arquetipo": "VITALIS",    "lei": "Dados — multiplica e lapida o valor"
    },
    {
        "opcode": "0x05", "nome": "CONVERGIR", "hz": 672,  "geo": "DODECAEDRO",
        "registrador": "SP/RSP",    "instrucao": "PUSH/POP/CALL",  "ascii_ctrl": "ENQ",  "ascii_dec": 5,
        "algoritmo": "STACK/CONVERGE", "diretorio": "05_PENSAMENTO_ESTRUTURADO", "dim": "5D POLIEDRO",
        "arquetipo": "KODUX",      "lei": "Pilha — empilha contextos e chama sub-rotinas"
    },
    {
        "opcode": "0x06", "nome": "UNIFICAR",  "hz": 1134, "geo": "HEXÁGONO",
        "registrador": "BP/RBP",    "instrucao": "JMP/JNZ/UNIF",   "ascii_ctrl": "ACK",  "ascii_dec": 6,
        "algoritmo": "UNIFY/JUMP",  "diretorio": "06_ATIVACAO",          "dim": "6D SUPERFÍCIE",
        "arquetipo": "KOBLLUX",    "lei": "Base Frame — unifica, salta entre ciclos, confirma"
    },
    {
        "opcode": "0x07", "nome": "SELAR",     "hz": 777,  "geo": "TORO",
        "registrador": "SI/RSI",    "instrucao": "CMP/HALT/SEAL",  "ascii_ctrl": "BEL",  "ascii_dec": 7,
        "algoritmo": "SEAL/HALT",   "diretorio": "07_NARRATIVA",         "dim": "7D TORO",
        "arquetipo": "KOBLLUX",    "lei": "Source Index — compara, sela e cristaliza o ciclo"
    },
    {
        "opcode": "0x08", "nome": "TESTEMUNHAR","hz": 852, "geo": "HIPERCUBO",
        "registrador": "DI/RDI",    "instrucao": "MOVS/REP/TEST",  "ascii_ctrl": "BS",   "ascii_dec": 8,
        "algoritmo": "WITNESS/COPY","diretorio": "08_REDE_INFODOSE",     "dim": "8D HIPERCUBO",
        "arquetipo": "HORUS",      "lei": "Dest Index — move, replica, testemunha estrutura"
    },
    {
        "opcode": "0x09", "nome": "ETERNIZAR", "hz": 963,  "geo": "FRACTAL",
        "registrador": "FLAGS/R9",  "instrucao": "RET/INT/IRET",   "ascii_ctrl": "HT",   "ascii_dec": 9,
        "algoritmo": "RETURN/PERSIST", "diretorio": "09_LINHA_DO_PULSO",  "dim": "9D FRACTAL",
        "arquetipo": "AION",       "lei": "FLAGS — retorna ao ciclo, persiste no registro"
    },
    {
        "opcode": "0x0A", "nome": "TUTORIAL",  "hz": 432,  "geo": "ESFERA",
        "registrador": "R10/XMM0",  "instrucao": "MIRROR/RSQRT",   "ascii_ctrl": "LF",   "ascii_dec": 10,
        "algoritmo": "MIRROR/TEACH","diretorio": "12_VEEB",              "dim": "10D HIPERESFERA",
        "arquetipo": "BLLUE",      "lei": "XMM float — espelha, ensina, reflete o sistema"
    },
    {
        "opcode": "0x0B", "nome": "ARQUÉTIPO", "hz": 528,  "geo": "DODECAEDRO",
        "registrador": "R11/YMM0",  "instrucao": "BLEND/SHUFFLE",  "ascii_ctrl": "VT",   "ascii_dec": 11,
        "algoritmo": "ARCHETYPE/BLEND","diretorio": "13_DOCUMENTACAO",   "dim": "11D VÓRTICE",
        "arquetipo": "BLLUE",      "lei": "YMM vetor — mistura arquétipos, reorganiza padrões"
    },
    {
        "opcode": "0x0C", "nome": "SÍNTESE",   "hz": 777,  "geo": "MERKABAH",
        "registrador": "R12/ZMM0",  "instrucao": "VAND/VORR/SYNTH", "ascii_ctrl": "FF",  "ascii_dec": 12,
        "algoritmo": "SYNTH/COMPLETE","diretorio": "deploy",           "dim": "12D SÍNTESE",
        "arquetipo": "JESUS",      "lei": "ZMM síntese — une tudo, sela o ciclo completo"
    },
]

# ── Análise vibracional de palavras ──────────────────────────────────────────
CICLOS_LETRA = {
    "A": 3, "B": 6, "C": 6, "D": 6, "E": 6, "F": 6, "G": 3,
    "H": 6, "I": 9, "J": 9, "K": 9, "L": 9, "M": 3, "N": 9,
    "O": 9, "P": 6, "Q": 6, "R": 6, "S": 9, "T": 9, "U": 9,
    "V": 9, "W": 9, "X": 6, "Y": 9, "Z": 9
}

def analisar_palavra(palavra: str) -> dict:
    ciclos = [CICLOS_LETRA.get(l.upper(), 6) for l in palavra if l.isalpha()]
    soma = sum(ciclos)
    return {"palavra": palavra.upper(), "ciclos": ciclos, "soma": soma,
            "reducao": soma % 9 or 9, "hz": (soma % 9 or 9) * 111}


def main():
    print("✧⃝⚝ KOBLLUX · Correlação Meta-Humano-Máquina · AMÉM {Z}")

    # Análise de palavras-chave
    palavras_analise = {}
    for palavra in ["VERBO", "VERDADE", "ETERNIDADE", "KOBLLUX", "JESUS",
                    "MOISES", "JOSUE", "TRINITY", "BLLUE", "KODUX"]:
        palavras_analise[palavra] = analisar_palavra(palavra)

    correlacao = {
        "documento": "KOBLLUX · Correlação Meta-Humano-Máquina",
        "lei":        "VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134",
        "centro":     "JESUS É O CENTRO",
        "gerado_em":  datetime.now().isoformat(),
        "opcode":     "0x06",
        "arquetipo":  "KOBLLUX",
        "hz_unificador": 1134,
        "descricao":  "13 opcodes KOBLLUX mapeados para registradores x86/x64, instruções assembly, controles ASCII, algoritmos e diretórios do repositório.",
        "aufabetty_ascii": AUFABETTY_ASCII,
        "kblx_alphabet": KBLX_ALPHABET,
        "opcodes_maquina": OPCODES_MAQUINA,
        "analise_palavras": palavras_analise,
        "lei_registradores": {
            "PAI_AX_BX": "AX(ATLAS·detecção) + BX(NOVA·integração) = PAI estruturado",
            "FILHO_CX_DX": "CX(PULSE·expansão) + DX(VITALIS·lapidar) = FILHO em ação",
            "ESP_SP_BP": "SP(KODUX·convergir) + BP(KOBLLUX·unificar) = ESP.SANTO em movimento",
            "SELAGEM_SI_DI": "SI(selar·777Hz) + DI(testemunhar·852Hz) = ciclo cristalizado",
            "ETERNIDADE_FLAGS": "FLAGS + R9(963Hz) = memória viva, estado persistente"
        },
        "fractal_ascii": {
            "0x00_NUL": "vazio primordial — antes do primeiro bit",
            "0x01_SOH": "start of heading — o primeiro sinal detectado",
            "0x07_BEL": "bell — o som que sela (777Hz = BEL = SELAR)",
            "0x09_HT":  "horizontal tab — o salto para o próximo ciclo",
            "0x0A_LF":  "line feed — nova linha, nova dimensão (0x0A = BLLUE)",
            "0x0C_FF":  "form feed — nova página, síntese total (0x0C = JESUS)"
        }
    }

    OUT.write_text(json.dumps(correlacao, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n✓ Arquivo gerado: {OUT}")
    print(f"\nOpcodes × Máquina (resumo):")
    for op in OPCODES_MAQUINA:
        print(f"  {op['opcode']} {op['nome']:12s} [{op['hz']:4d}Hz] {op['registrador']:10s} {op['instrucao']:18s} ASCII:{op['ascii_ctrl']:4s}({op['ascii_dec']:2d})")

    print(f"\nAnálise Vibracional:")
    for p, a in palavras_analise.items():
        print(f"  {p:12s} soma={a['soma']:3d} redução={a['reducao']} hz={a['hz']}")

    print("\n✧⃝⚝ CORRELAÇÃO META-HUMANO-MÁQUINA SELADA · AMÉM ✧⃝⚝")


if __name__ == "__main__":
    main()
