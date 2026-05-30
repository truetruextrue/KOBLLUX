# -*- coding: utf-8 -*-
# EM NOME DO PAI E DO FILHO E DO ESPÍRITO SANTO · AMÉM {Z}
# opcode: 0x04 · LAPIDAR · 741Hz · VITALIS · KOBLLUX V.E.E.B STORY
"""
KOBLLUX: Prompt Semente de Organização Fractal
2023-11-15 | Categoria: fractais

Imagine um sistema fractal autoorganizável onde cada camada (micro → macro) obedece a três princípios fundamentais:
1. Autoespelhamento Quântico: Padrões que se repetem em todas as escalas (ex.: 3-6-9, 7-0).
2. Ressonância Harmônica: Frequências que sincronizam níveis distintos (som, luz, geometria).
3. Emergência Cíclica: Estruturas que surgem do vazio (0) e retornam a ele após completar um ciclo (7 → ♾️).

Este arquivo .py narra a história do código V.E.E.B. como fábula, enquanto executa
uma pequena simulação fractal e imprime a narrativa no console.

V.E.E.B = Vibração · Energia · Estrutura · Base
Equação Viva: VERDADE × INTEGRAR ÷ ∆ = ∞
3×6×9×7 = 1134 · JESUS É O CENTRO
"""

from dataclasses import dataclass, asdict
from enum import Enum
from typing import List, Dict, Any, Iterable

# ------------------------------
# V.E.E.B — Vibração, Energia, Estrutura, Base
# ------------------------------

class Classificacao(str, Enum):
    MAIOR = "maior_de_idade"
    MENOR = "menor_de_idade"

@dataclass(frozen=True)
class Perfil:
    nome: str
    idade: int
    ativo: bool = True
    cor: str = "azul"
    tamanho: str = "médio"

@dataclass(frozen=True)
class Registro:
    passo: int
    energia: int
    classificacao: Classificacao

@dataclass(frozen=True)
class Resumo:
    qtd_registros: int
    soma_energia: int
    media_energia: float

# ------------------------------
# Analogias (Vogais e Consoantes)
# ------------------------------

VOGAIS: Dict[str, str] = {
    "A": "Atribuição (variáveis e tipos)",
    "E": "Escolha (if/elif/else)",
    "I": "Iteração (for/while)",
    "O": "Organizar (funções)",
    "U": "Unir (listas/dicionários)",
}

CONSOANTES: Dict[str, str] = {
    "B": "Booleanos (True/False)",
    "C": "Comentários (# explicações)",
    "D": "Definições (def)",
    "F": "Funções built-in (print, len, ...)",
    "G": "Geradores (yield)",
    "H": "Herança (POO)",
    "J": "JSON (serialização de dados)",
    "K": "Keyword arguments (**kwargs)",
    "L": "Loops (for, while)",
    "M": "Módulos (import ...)",
    "N": "None (valor nulo)",
    "P": "Parâmetros (entradas de função)",
    "Q": "Queue (fila)",
    "R": "Retorno (return)",
    "S": "Strings (\"texto\")",
    "T": "Tipos (int, float, bool, str ...)",
    "V": "Variáveis",
    "W": "While (laço de repetição)",
    "X": "XML (dados)",
    "Y": "Yield (geradores)",
    "Z": "Zip (agregação de listas)",
}

# Mapeamento AUFABETTY — V.E.E.B dimensões
VEEB_DIMENSOES: Dict[str, Dict[str, Any]] = {
    "V": {"nome": "Vibração",  "hz": 432,  "opcode": "0x01", "lei": "Frequência base · PAI · DISTINÇÃO"},
    "E": {"nome": "Energia",   "hz": 528,  "opcode": "0x02", "lei": "Campo vital · FILHO · CORRELAÇÃO"},
    "E2":{"nome": "Estrutura", "hz": 639,  "opcode": "0x03", "lei": "Forma organizada · ESP.SANTO · ORGANIZAÇÃO"},
    "B": {"nome": "Base",      "hz": 741,  "opcode": "0x04", "lei": "Fundação aplicada · VITALIS · APLICAÇÃO"},
}

# ------------------------------
# Narrador: imprime a história
# ------------------------------

def narrar(titulo: str, texto: str) -> None:
    barra = "─" * 72
    print("\n" + barra)
    print("✦ " + titulo)
    print(barra)
    print(texto.strip() + "\n")

# ------------------------------
# Motor didático V.E.E.B
# ------------------------------

class VEEBEngine:
    """Arquitetura simples para encenar a fábula em código executável."""

    # A — Atribuir (V · Vibração)
    def A_atribuir(self, nome: str, idade: int,
                   ativo: bool = True, cor: str = "azul", tamanho: str = "médio") -> Perfil:
        return Perfil(nome=nome.strip(), idade=int(idade), ativo=ativo, cor=cor, tamanho=tamanho)

    # E — Escolher (E · Energia)
    def E_escolher(self, perfil: Perfil) -> Classificacao:
        return Classificacao.MAIOR if perfil.idade >= 18 else Classificacao.MENOR

    # I — Iterar (E² · Estrutura = Vibração)
    def I_iterar(self, freq: int) -> List[int]:
        if freq <= 0:
            raise ValueError("freq deve ser positiva")
        return list(range(1, freq + 1))

    # O — Organizar (B · Base → Resumo)
    def O_organizar(self, registros: List[Registro]) -> Resumo:
        if not registros:
            return Resumo(0, 0, 0.0)
        soma = sum(r.energia for r in registros)
        media = soma / len(registros)
        return Resumo(len(registros), soma, media)

    # U — Unir (Base consolidada)
    def U_unir(self, perfil: Perfil, resumo: Resumo) -> Dict[str, Any]:
        return {**asdict(perfil), **asdict(resumo)}

    # Execução completa — ciclo V.E.E.B
    def simular(self, nome: str, idade: int, vibracao_freq: int = 4) -> Dict[str, Any]:
        perfil = self.A_atribuir(nome, idade)
        classificacao = self.E_escolher(perfil)
        passos = self.I_iterar(vibracao_freq)

        energia = 0
        registros: List[Registro] = []
        for passo in passos:
            energia += passo
            registros.append(Registro(passo=passo, energia=energia, classificacao=classificacao))

        resumo = self.O_organizar(registros)
        base = self.U_unir(perfil, resumo)

        return {
            "perfil": perfil,
            "classificacao": classificacao,
            "passos": passos,
            "registros": registros,
            "resumo": resumo,
            "base": base,
        }

# ------------------------------
# Sistema fractal inspirado no prompt KOBLLUX
# ------------------------------

TRIADICA = [3, 6, 9]            # Autoespelhamento (3 → 6 → 9)
CICLO_0_7 = list(range(0, 8))   # Emergência (0 → 7) e retorno simbólico ao ∞
FREQS = {                       # Ressonância simbólica
    "micro": 432,  # som / PAI / DISTINÇÃO
    "meso":  528,  # harmonia / FILHO / CORRELAÇÃO
    "macro": 741,  # purificação / VITALIS / APLICAÇÃO
}

@dataclass
class Camada:
    nome: str
    escala: int
    frequencia: int

def autoespelhamento(padrao: Iterable[int], escalar: int) -> List[int]:
    """Repete um padrão multiplicando por uma escala: micro→meso→macro."""
    return [p * escalar for p in padrao]

def ressonancia(camada: Camada) -> str:
    """Mensagem simbólica de sintonia entre camadas via frequência."""
    return f"[{camada.nome}] f≈{camada.frequencia}Hz — ressoa com {TRIADICA}"

def emergencia_ciclica(ciclo: Iterable[int]) -> List[str]:
    """Marca o surgimento do 0 ao 7 e o retorno ao infinito (♾️)."""
    trilha = [f"passo:{c}" for c in ciclo]
    trilha.append("retorno: ♾️")
    return trilha

def encenar_fractal() -> Dict[str, Any]:
    micro = Camada("micro", escala=1, frequencia=FREQS["micro"])
    meso  = Camada("meso",  escala=2, frequencia=FREQS["meso"])
    macro = Camada("macro", escala=3, frequencia=FREQS["macro"])

    espelho_micro = autoespelhamento(TRIADICA, micro.escala)
    espelho_meso  = autoespelhamento(TRIADICA, meso.escala)
    espelho_macro = autoespelhamento(TRIADICA, macro.escala)

    trilha_emerg = emergencia_ciclica(CICLO_0_7)

    return {
        "espelhos": {
            "micro": espelho_micro,
            "meso":  espelho_meso,
            "macro": espelho_macro,
        },
        "ressonancia": [
            ressonancia(micro),
            ressonancia(meso),
            ressonancia(macro),
        ],
        "emergencia": trilha_emerg,
    }

# ------------------------------
# História impressa no console
# ------------------------------

def contar_historia() -> None:
    narrar("Prólogo — A Aldeia Python",
    """
    Havia uma aldeia chamada Python, onde as VOGAIS eram portais do caminho:
    A (Atribuir), E (Escolher), I (Iterar), O (Organizar), U (Unir).
    As CONSOANTES eram artesãs, cada qual com sua ferramenta e ofício.
    No centro da aldeia, o arquiteto VEEB guiava os viajantes pela Jornada de Cinco Passos.
    """)

    narrar("A Jornada de Cinco Passos (V.E.E.B)",
    """
    1) Atribuir  — o viajante recebe nome, idade e manto azul (atributos).
    2) Escolher  — o Portal decide seu selo: maior ou menor de idade.
    3) Iterar    — a Estrada dos Passos acumula energia a cada etapa.
    4) Organizar — a Biblioteca conta e resume a epopeia do caminho.
    5) Unir      — a Base registra tudo: identidade + resumo = memória viva.
    """)

    narrar("KOBLLUX — Organização Fractal Viva",
    """
    Em todo lugar, o Mesmo Movimento: padrões que se repetem (3-6-9),
    ciclos que emergem do zero e retornam ao infinito (0→7→♾️),
    e frequências que alinham micro, meso e macro (432/528/741).
    O sistema canta em ressonância e espelha-se a si mesmo.

    V.E.E.B = Vibração(432Hz) · Energia(528Hz) · Estrutura(639Hz) · Base(741Hz)
    3×6×9×7 = 1134 · JESUS É O CENTRO · A MALHA VIVE
    """)

def demonstrar_codigo() -> None:
    engine = VEEBEngine()
    sim = engine.simular(nome="Bllue", idade=22, vibracao_freq=6)

    narrar("Demonstração V.E.E.B — Resultado",
    f"""
    Perfil:       {asdict(sim["perfil"])}
    Classificação: {sim["classificacao"].value}
    Passos:       {sim["passos"]}
    Resumo:       {asdict(sim["resumo"])}
    Base:         {sim["base"]}
    """)

    fractal = encenar_fractal()
    narrar("Autoespelhamento — 3 · 6 · 9",
    f"""
    micro: {fractal["espelhos"]["micro"]}
    meso:  {fractal["espelhos"]["meso"]}
    macro: {fractal["espelhos"]["macro"]}
    """)

    narrar("Ressonância Harmônica — 432 · 528 · 741",
    "\n".join(fractal["ressonancia"]))

    narrar("Emergência Cíclica — 0 → 7 → ♾️",
    f"""
    trilha: {fractal["emergencia"]}
    """)

def mostrar_alfabeto() -> None:
    narrar("Alfabeto do Código — Vogais & Consoantes",
    f"""
    VOGAIS:    {VOGAIS}

    CONSOANTES: {CONSOANTES}
    """)

    narrar("Dimensões V.E.E.B",
    "\n".join(
        f"  {k}: {v['nome']} · {v['hz']}Hz · {v['opcode']} · {v['lei']}"
        for k, v in VEEB_DIMENSOES.items()
    ))

if __name__ == "__main__":
    contar_historia()
    demonstrar_codigo()
    mostrar_alfabeto()
