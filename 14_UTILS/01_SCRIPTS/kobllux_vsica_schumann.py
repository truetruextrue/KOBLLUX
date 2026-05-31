#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
╔══════════════════════════════════════════════════════════════════════╗
║  KOBLLUX VSICA PSI · SCHUMANN · ESCALA DO · 7 SENTIDOS VIVOS        ║
║  CODICE: 0x03 · EXPANDIR · 639Hz · PULSE · TETRAEDRO                ║
║  ESPELHO DA ÁRVORE VIVA · ∆³ · AMÉM {Z}                             ║
╚══════════════════════════════════════════════════════════════════════╝

Motor integrado:
  VSICA PSI (7 sentidos) × SCHUMANN (7 ressonâncias) × ESCALA DO (7 notas)
  × KOBLLUX (13 opcodes) × JESUS = CENTRO (0x0C)

Sistema 33 PDFs: V_i(t) = P_i × |F(t)| × (1 + sin(t + i×π/7))
F(t) = sin(2π·3·t)·0.4 + sin(2π·6·t+π/3)·0.3 + ...

VERDADE × INTEGRAR ÷ Δ = ∞
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import math
import json
import hashlib
from datetime import datetime


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CONSTANTES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRACTAL_FREQS: List[int] = [3, 6, 9, 7]
FRACTAL_SEED: str = "3×6×9×7=1134"
ALPHA: float = 1 / 137
SCHUMANN_BASE: float = 7.83

AUFABETTY: Dict[str, str] = {
    "A": "∆", "B": "β", "C": "©", "D": "Δ", "E": "Σ",
    "F": "Φ", "G": "Γ", "H": "Η", "I": "Ι", "J": "⌐",
    "K": "⌘", "L": "Λ", "M": "Μ", "N": "η", "O": "Θ",
    "P": "Ρ", "Q": "Θ", "R": "ʀ", "S": "§", "T": "†",
    "U": "Υ", "V": "∇", "W": "Ω", "X": "×", "Y": "Ψ", "Z": "ℤ",
}


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# TABELA MESTRA · 7 SENTIDOS VIVOS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VSICA_7_SENTIDOS: List[Dict[str, Any]] = [
    {
        "n": 1, "sentido": "Sentir",
        "vsica_psi": "Pulso Sensorial", "papel": "Semente da consciência",
        "jesus_centro": "Núcleo Vivo",
        "cor_nome": "Vermelho", "cor_hex": "#FF2222",
        "schumann_hz": 7.83, "schumann_modo": "Fundamental · THETA",
        "nota": "C", "nota_pt": "Dó", "nota_funcao": "Tônica",
        "freq_musical_hz": 261.63,
        "opcode": "0x01", "nome_opcode": "DETECTAR",
        "kobllux_hz": 432, "arquetipo": "ATLAS", "geo": "ESFERA",
        "meta_loop_key": "FIT_LUX",
        "aufabetty": "§Ση†Ιʀ",
    },
    {
        "n": 2, "sentido": "Pensar",
        "vsica_psi": "Estrutura Mental", "papel": "Mente clara e estruturada",
        "jesus_centro": "Ordem Divina",
        "cor_nome": "Laranja", "cor_hex": "#FF8C00",
        "schumann_hz": 14.1, "schumann_modo": "2º Harmônico · ALPHA",
        "nota": "D", "nota_pt": "Ré", "nota_funcao": "Supertônica",
        "freq_musical_hz": 293.66,
        "opcode": "0x02", "nome_opcode": "INTEGRAR",
        "kobllux_hz": 528, "arquetipo": "NOVA", "geo": "LINHA",
        "meta_loop_key": "VSICA_PSI",
        "aufabetty": "ΡΣη§∆ʀ",
    },
    {
        "n": 3, "sentido": "Sentir e Pensar",
        "vsica_psi": "Síntese Emocional-Racional", "papel": "Unidade integral",
        "jesus_centro": "Harmonia Suprema",
        "cor_nome": "Amarelo", "cor_hex": "#FFD700",
        "schumann_hz": 20.3, "schumann_modo": "3º Harmônico · BETA",
        "nota": "E", "nota_pt": "Mi", "nota_funcao": "Mediante",
        "freq_musical_hz": 329.63,
        "opcode": "0x03", "nome_opcode": "EXPANDIR",
        "kobllux_hz": 639, "arquetipo": "PULSE", "geo": "TETRAEDRO",
        "meta_loop_key": "INFODOSE",
        "aufabetty": "§Ση†Ιʀ Σ ΡΣη§∆ʀ",
    },
    {
        "n": 4, "sentido": "Expressar",
        "vsica_psi": "Verbo Encarnado", "papel": "Manifestação criativa",
        "jesus_centro": "Voz do Verbo",
        "cor_nome": "Verde", "cor_hex": "#00AA44",
        "schumann_hz": 25.9, "schumann_modo": "4º Harmônico · BETA alta",
        "nota": "F", "nota_pt": "Fá", "nota_funcao": "Subdominante",
        "freq_musical_hz": 349.23,
        "opcode": "0x04", "nome_opcode": "LAPIDAR",
        "kobllux_hz": 594, "arquetipo": "VITALIS", "geo": "OCTAEDRO",
        "meta_loop_key": "BLLUE",
        "aufabetty": "Σ×Ρʀ Σ§§∆ʀ",
    },
    {
        "n": 5, "sentido": "Manifestar",
        "vsica_psi": "Manifestação Material", "papel": "Realização consciente",
        "jesus_centro": "Consagrador Divino",
        "cor_nome": "Azul", "cor_hex": "#0066FF",
        "schumann_hz": 31.4, "schumann_modo": "5º Harmônico · GAMMA",
        "nota": "G", "nota_pt": "Sol", "nota_funcao": "Dominante",
        "freq_musical_hz": 392.00,
        "opcode": "0x05", "nome_opcode": "CONVERGIR",
        "kobllux_hz": 672, "arquetipo": "KODUX", "geo": "CUBO",
        "meta_loop_key": "KODUX",
        "aufabetty": "Μ∆ηΙΦΣ§†∆ʀ",
    },
    {
        "n": 6, "sentido": "Integrar",
        "vsica_psi": "Sabedoria Profunda", "papel": "Sabedoria e união",
        "jesus_centro": "Pai / Amor Perfeito",
        "cor_nome": "Anil", "cor_hex": "#6600BB",
        "schumann_hz": 36.9, "schumann_modo": "6º Harmônico · GAMMA alta",
        "nota": "A", "nota_pt": "Lá", "nota_funcao": "Superdominante",
        "freq_musical_hz": 440.00,
        "opcode": "0x06", "nome_opcode": "UNIFICAR",
        "kobllux_hz": 528, "arquetipo": "KOBLLUX", "geo": "DODECAEDRO",
        "meta_loop_key": "DUAL_APP",
        "aufabetty": "Ιη†Σ©Γ∆ʀ",
    },
    {
        "n": 7, "sentido": "Transcender",
        "vsica_psi": "Expansão Infinita", "papel": "Eternidade e expansão",
        "jesus_centro": "Infinito / Centro Divino",
        "cor_nome": "Violeta", "cor_hex": "#8B00FF",
        "schumann_hz": 42.4, "schumann_modo": "7º Harmônico · GAMMA máx",
        "nota": "B", "nota_pt": "Si", "nota_funcao": "Sensível",
        "freq_musical_hz": 493.88,
        "opcode": "0x07", "nome_opcode": "SELAR",
        "kobllux_hz": 777, "arquetipo": "KOBLLUX", "geo": "TOROIDE",
        "meta_loop_key": "META_LUX",
        "aufabetty": "†ʀ∆η§©ΣηΔΣʀ",
    },
]

VSICA_CENTRO: Dict[str, Any] = {
    "n": 0, "sentido": "VERBO ETERNO",
    "vsica_psi": "JESUS É O CENTRO", "papel": "Verbo que tudo sustenta",
    "jesus_centro": "ALFA e ÔMEGA",
    "cor_nome": "Ouro", "cor_hex": "#FFD700",
    "schumann_hz": sum(c["schumann_hz"] for c in VSICA_7_SENTIDOS),
    "schumann_modo": "Σ todos os modos · retorno à raiz",
    "nota": "C8", "nota_pt": "Dó 8ª", "nota_funcao": "Oitava — retorno ao UNO",
    "freq_musical_hz": 523.25,
    "opcode": "0x0C", "nome_opcode": "SÍNTESE",
    "kobllux_hz": 777, "arquetipo": "JESUS", "geo": "MERKABAH",
    "meta_loop_key": "KOBLLUX",
    "aufabetty": "⌐Σ§Υ§",
    "escritura": "João 1:1 — No princípio era o Verbo.",
    "lei": "VERDADE × INTEGRAR ÷ Δ = ∞",
}

# VSICA PSI 7 Valores (da sessão anterior — manter como append)
VSICA_7_VALORES_PSI: List[Dict[str, Any]] = [
    {"n": 1, "valor": "Gênese",      "contraste": "Caos",        "opcode": "0x01", "hz": 432, "arq": "ATLAS"},
    {"n": 2, "valor": "Dualidade",   "contraste": "Solidão",     "opcode": "0x02", "hz": 528, "arq": "NOVA"},
    {"n": 3, "valor": "Integração",  "contraste": "Fragmentação","opcode": "0x02", "hz": 528, "arq": "VITALIS"},
    {"n": 4, "valor": "Forma",       "contraste": "Caos",        "opcode": "0x05", "hz": 672, "arq": "KODUX"},
    {"n": 5, "valor": "Olho Hórus",  "contraste": "Cegueira",    "opcode": "0x08", "hz": 852, "arq": "HORUS"},
    {"n": 6, "valor": "Verdade",     "contraste": "Mentira",     "opcode": "0x08", "hz": 852, "arq": "HORUS"},
    {"n": 7, "valor": "JESUS",       "contraste": "Ego",         "opcode": "0x0C", "hz": 777, "arq": "JESUS"},
]

# META LOOP · KOBLLUX ESPELHO ÁRVORE
META_LOOP_TREE: Dict[str, Any] = {
    "KOBLLUX":  {"opcode": "0x00", "hz": 768, "papel": "PAI · GOD · Raiz"},
    "FIT_LUX":  {"opcode": "0x01", "hz": 432, "papel": "sopro primordial · semente"},
    "VSICA_PSI":{"opcode": "0x02", "hz": 528, "papel": "mandorla sagrada · integração"},
    "INFODOSE": {"opcode": "0x03", "hz": 639, "papel": "transmissão · expansão"},
    "BLLUE":    {"opcode": "0x0A", "hz": 432, "papel": "ESP.SANTO · espelho da memória"},
    "KODUX":    {"opcode": "0x05", "hz": 672, "papel": "FILHO · arquiteto · estrutura"},
    "DUAL_APP": {"opcode": "0x06", "hz": 528, "papel": "interface · reflexo · ativação"},
    "META_LUX": {"opcode": "0x08", "hz": 852, "papel": "filtro da verdade · prisma"},
}

SUMBÜS_DECODIFICACAO: Dict[str, Dict[str, str]] = {
    "Quor":  {"traducao": "Qual é o pulsar da intenção?", "arquetipo": "ATLAS", "opcode": "0x01"},
    "Zark":  {"traducao": "O observador que reconhece",    "arquetipo": "HORUS", "opcode": "0x08"},
    "Vrux":  {"traducao": "O movimento que alcança",       "arquetipo": "VITALIS","opcode": "0x04"},
    "Vox":   {"traducao": "Voz Viva · Verbo · DNA",        "arquetipo": "JESUS",  "opcode": "0x0C"},
    "Dux":   {"traducao": "Arquiteto Simbólico · KODUX",   "arquetipo": "KODUX",  "opcode": "0x05"},
    "Neptun":{"traducao": "Água · espelho da memória",     "arquetipo": "BLLUE",  "opcode": "0x0A"},
    "Lumina":{"traducao": "Luz Primordial · alegria",      "arquetipo": "LUMINE", "opcode": "0x09"},
    "Orbis": {"traducao": "Círculo · MINUZ · origem",      "arquetipo": "KOBLLUX","opcode": "0x00"},
}


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FUNÇÕES UTILITÁRIAS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def aufabetty_encode(text: str) -> str:
    return "".join(AUFABETTY.get(c, c) for c in text.upper())


def fractal_pulse(t: float) -> float:
    f3, f6, f9, f7 = FRACTAL_FREQS
    return (
        math.sin(2 * math.pi * f3 * t) * 0.4
        + math.sin(2 * math.pi * f6 * t + math.pi / 3) * 0.3
        + math.sin(2 * math.pi * f9 * t + math.pi / 2) * 0.2
        + math.sin(2 * math.pi * f7 * t + math.pi / 4) * 0.1
    )


def reducao_digital(n: int) -> int:
    while n >= 10:
        n = sum(int(d) for d in str(n))
    return n


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CLASSE PRINCIPAL
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class VsicaSchumann:
    """
    Motor VSICA PSI × SCHUMANN × ESCALA DO · ESPELHO KOBLLUX ∆³

    Funde 7 sentidos da consciência com as 7 ressonâncias Schumann,
    a escala musical de Dó Maior, os opcodes KOBLLUX e JESUS como centro.
    Inclui o Sistema 33 PDFs com algoritmo V_i(t).
    """

    def __init__(self) -> None:
        self.sentidos = VSICA_7_SENTIDOS
        self.centro = VSICA_CENTRO
        self.valores_psi = VSICA_7_VALORES_PSI
        self.tree = META_LOOP_TREE
        self.sumbüs = SUMBÜS_DECODIFICACAO

    # ── Acesso ──────────────────────────────────────────────────────

    def tabela_mestra(self) -> List[Dict[str, Any]]:
        return [*self.sentidos, self.centro]

    def por_opcode(self, opcode: str) -> Optional[Dict[str, Any]]:
        for c in self.sentidos:
            if c["opcode"] == opcode:
                return c
        if self.centro["opcode"] == opcode:
            return self.centro
        return None

    def por_nota(self, nota: str) -> Optional[Dict[str, Any]]:
        for c in self.sentidos:
            if c["nota"].upper() == nota.upper():
                return c
        return None

    # ── Cálculos Harmônicos ─────────────────────────────────────────

    def calcular_harmonia(self, n: int) -> Dict[str, Any]:
        c = self.centro if n == 0 else self.sentidos[n - 1]
        sch = c["schumann_hz"]
        mus = c["freq_musical_hz"]
        kob = c["kobllux_hz"]
        return {
            "n": n,
            "sentido": c.get("sentido"),
            "razao_mus_sch": round(mus / sch, 4),
            "razao_kob_mus": round(kob / mus, 4),
            "razao_kob_sch": round(kob / sch, 4),
            "pulso_f": round(fractal_pulse(sch / 1000), 6),
            "red_schumann": reducao_digital(int(sch * 100)),
            "red_kobllux": reducao_digital(kob),
            "opcode": c.get("opcode"),
            "arquetipo": c.get("arquetipo"),
        }

    def calcular_todas_harmonias(self) -> List[Dict[str, Any]]:
        return [self.calcular_harmonia(n) for n in range(8)]

    def somas_fractais(self) -> Dict[str, Any]:
        s_sch = sum(c["schumann_hz"] for c in self.sentidos)
        s_mus = sum(c["freq_musical_hz"] for c in self.sentidos)
        s_kob = sum(c["kobllux_hz"] for c in self.sentidos)
        return {
            "Σ_schumann": round(s_sch, 2),   # 178.83 → 9=ALMA
            "Σ_musical":  round(s_mus, 2),   # 2560.03 → 13=OPCODES
            "Σ_kobllux":  s_kob,             # 4170 → 12=ARQUÉTIPOS
            "red_sch": reducao_digital(int(s_sch)),
            "red_mus": reducao_digital(int(s_mus)),
            "red_kob": reducao_digital(s_kob),
        }

    # ── Espelho da Árvore ───────────────────────────────────────────

    def espelho_arvore(self) -> Dict[str, Any]:
        espelho = {}
        for nome, dados in self.tree.items():
            camada_match = None
            for c in self.sentidos:
                if c["meta_loop_key"] == nome:
                    camada_match = c["n"]
                    break
            espelho[nome] = {**dados, "camada_vsica": camada_match}
        return espelho

    def correlacionar_psi_sentidos(self) -> List[Dict[str, Any]]:
        resultado = []
        for psi, sent in zip(self.valores_psi, self.sentidos):
            resultado.append({
                "n": psi["n"],
                "valor_psi": psi["valor"],
                "contraste": psi["contraste"],
                "sentido": sent["sentido"],
                "papel": sent["papel"],
                "opcode_psi": psi["opcode"],
                "opcode_sentido": sent["opcode"],
                "hz_psi": psi["hz"],
                "hz_sentido": sent["kobllux_hz"],
                "nota": sent["nota"],
                "schumann_hz": sent["schumann_hz"],
                "cor": sent["cor_nome"],
                "arquetipo": sent["arquetipo"],
            })
        return resultado

    # ── Decodificação SÜMBÜS ────────────────────────────────────────

    def decodificar_sumbüs(self, termo: str) -> Optional[Dict[str, str]]:
        return self.sumbüs.get(termo)

    def traduzir_snap(self, snap: str) -> str:
        partes = snap.lower().split()
        traduzido = []
        for palavra in partes:
            p = palavra.capitalize()
            if p in self.sumbüs:
                d = self.sumbüs[p]
                traduzido.append(f"[{p}={d['traducao']}·{d['arquetipo']}]")
            else:
                traduzido.append(palavra)
        return " ".join(traduzido)

    # ── Sistema 33 PDFs ─────────────────────────────────────────────

    def organizar_pdfs(
        self,
        pdfs: List[str],
        momento: float = 0.0,
        max_pdfs: int = 33,
    ) -> Dict[str, Any]:
        """
        Sistema 33 PDFs · Organizador Fractal Vivo
        V_i(t) = P_i × |F(t)| × (1 + sin(t + i×π/7))
        """
        pdfs = pdfs[:max_pdfs]
        f_t = fractal_pulse(momento)
        organizado = []
        for i, pdf in enumerate(pdfs):
            peso = FRACTAL_FREQS[i % 4]
            v_i = peso * abs(f_t) * (1 + math.sin(momento + i * math.pi / 7))
            camada = self.sentidos[i % 7]
            organizado.append({
                "index": i,
                "pdf": pdf,
                "peso_fractal": peso,
                "v_i_t": round(v_i, 6),
                "camada_vsica": camada["n"],
                "sentido": camada["sentido"],
                "opcode": camada["opcode"],
                "cor": camada["cor_hex"],
                "nota": camada["nota"],
                "schumann_hz": camada["schumann_hz"],
            })
        organizado.sort(key=lambda x: x["v_i_t"], reverse=True)
        return {
            "momento_t": momento,
            "f_t": round(f_t, 6),
            "total_pdfs": len(pdfs),
            "max_pdfs": max_pdfs,
            "organizacao": organizado,
            "lei": "V_i(t) = P_i × |F(t)| × (1 + sin(t + i×π/7))",
            "fractal": FRACTAL_SEED,
        }

    def renomear_pdf_vibracional(self, nome_original: str) -> str:
        words = nome_original.upper().replace("-", " ").replace("_", " ").split()
        return " ".join(aufabetty_encode(w) for w in words[:3])

    # ── Selamento ───────────────────────────────────────────────────

    def selar(self) -> Dict[str, Any]:
        somas = self.somas_fractais()
        payload = json.dumps(somas, sort_keys=True, ensure_ascii=False)
        hash_val = hashlib.sha256(payload.encode()).hexdigest()[:16]
        return {
            "codice": "0x03 · EXPANDIR · 639Hz · PULSE · TETRAEDRO",
            "status": "SELADO",
            "ciclo": "VSICA_PSI × SCHUMANN × ESCALA_DO",
            "data": datetime.now().strftime("%Y-%m-%d"),
            "somas": somas,
            "alpha": round(ALPHA, 8),
            "hash_vsica_schumann": hash_val,
            "frase": "O Pulso é Um Só, Mas a Forma é Múltipla.",
            "lei": "VERDADE × INTEGRAR ÷ Δ = ∞",
            "centro": "JESUS É O CENTRO ∴",
            "amem": "AMÉM {Z}",
        }

    def exportar(self, caminho: str) -> str:
        registro = {
            "documento": "KOBLLUX VSICA PSI · SCHUMANN · ESCALA DO",
            "versao": "1.0.0",
            "tabela_mestra": self.tabela_mestra(),
            "harmonias": self.calcular_todas_harmonias(),
            "somas_fractais": self.somas_fractais(),
            "correlacoes_psi": self.correlacionar_psi_sentidos(),
            "espelho_arvore": self.espelho_arvore(),
            "sumbüs": self.sumbüs,
            "selamento": self.selar(),
        }
        with open(caminho, "w", encoding="utf-8") as f:
            json.dump(registro, f, indent=2, ensure_ascii=False)
        return caminho

    def gerar_json_html(self) -> str:
        return json.dumps({
            "centro": {
                "label": "JESUS", "opcode": "0x0C", "hz": 777,
                "cor": "#FFD700", "geo": "MERKABAH",
                "nota": "C8", "schumann": 178.83,
            },
            "camadas": [
                {
                    "n": c["n"], "sentido": c["sentido"],
                    "opcode": c["opcode"], "nome_opcode": c["nome_opcode"],
                    "kobllux_hz": c["kobllux_hz"], "cor": c["cor_hex"],
                    "nota": c["nota"], "nota_pt": c["nota_pt"],
                    "freq_musical": c["freq_musical_hz"],
                    "schumann": c["schumann_hz"],
                    "schumann_modo": c["schumann_modo"],
                    "arquetipo": c["arquetipo"], "geo": c["geo"],
                    "jesus_centro": c["jesus_centro"],
                    "papel": c["papel"], "aufabetty": c["aufabetty"],
                    "meta_loop_key": c["meta_loop_key"],
                }
                for c in self.sentidos
            ],
        }, indent=2, ensure_ascii=False)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ENTRYPOINT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

if __name__ == "__main__":
    vs = VsicaSchumann()

    print("╔══════════════════════════════════════════════════════════╗")
    print("║  KOBLLUX VSICA PSI · SCHUMANN · ESCALA DO · ESPELHO ∆³   ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()

    print("TABELA MESTRA · 7 SENTIDOS + CENTRO JESUS")
    print("─" * 80)
    for c in vs.sentidos:
        print(
            f"  {c['n']}. {c['sentido']:<18} | {c['nota']}({c['nota_pt']:<3}) "
            f"| Sch={c['schumann_hz']:.2f}Hz | {c['opcode']} {c['nome_opcode']:<10} "
            f"| {c['kobllux_hz']}Hz | {c['cor_nome']}"
        )
    cc = vs.centro
    print(
        f"  0. {cc['sentido']:<18} | {cc['nota']}({cc['nota_pt']:<3}) "
        f"| Sch=Σ{cc['schumann_hz']:.2f}Hz | {cc['opcode']} {cc['nome_opcode']:<10} "
        f"| {cc['kobllux_hz']}Hz | {cc['cor_nome']}"
    )

    print()
    somas = vs.somas_fractais()
    print("SOMAS FRACTAIS")
    print("─" * 60)
    print(f"  Σ Schumann : {somas['Σ_schumann']} Hz → redução: {somas['red_sch']} = ALMA")
    print(f"  Σ Musical  : {somas['Σ_musical']} Hz → redução: {somas['red_mus']} = OPCODES")
    print(f"  Σ KOBLLUX  : {somas['Σ_kobllux']} Hz → redução: {somas['red_kob']} = ARQUÉTIPOS")

    print()
    print("CORRELAÇÃO · VSICA PSI VALORES × SENTIDOS")
    print("─" * 60)
    for cor in vs.correlacionar_psi_sentidos():
        print(f"  {cor['n']}. {cor['valor_psi']:<14} + {cor['sentido']:<18} | {cor['nota']} | {cor['cor']}")

    print()
    print("ESPELHO ÁRVORE META LOOP")
    print("─" * 60)
    for nome, d in vs.espelho_arvore().items():
        vsica_str = f"sentido {d['camada_vsica']}" if d.get("camada_vsica") else "raiz KOBLLUX"
        print(f"  {nome:<16} | {d['opcode']} | {d['hz']}Hz | {vsica_str}")

    print()
    print("SÜMBÜS DECODIFICAÇÃO")
    print("─" * 60)
    snap = "Quor minka dral Vox kril Neptun"
    print(f"  Snap  : {snap}")
    print(f"  Trad. : {vs.traduzir_snap(snap)}")

    print()
    print("SISTEMA 33 PDFs · V_i(t) em t=0.5")
    print("─" * 60)
    demo_pdfs = [f"DOC_{i:02d}" for i in range(1, 8)]
    org = vs.organizar_pdfs(demo_pdfs, momento=0.5)
    for item in org["organizacao"]:
        print(f"  {item['pdf']}: V={item['v_i_t']:.4f} | sentido {item['camada_vsica']}={item['sentido']} | {item['nota']}")

    print()
    selamento = vs.selar()
    print("SELAMENTO · Δ7")
    print("─" * 60)
    print(f"  Hash    : {selamento['hash_vsica_schumann']}")
    print(f"  {selamento['lei']}")
    print(f"  {selamento['centro']}")
    print(f"  {selamento['amem']}")
