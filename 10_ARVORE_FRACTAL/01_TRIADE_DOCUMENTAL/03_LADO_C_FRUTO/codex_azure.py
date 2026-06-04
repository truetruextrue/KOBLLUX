#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
codex_azure.py — Fruto/Livro Digital · AUFABETTY + M4 + ESPELHO
Cristalização de: 13_DOCUMENTACAO/02_CODEX/1. A CIFRA KOBLLUX.md
                + codex_azure_0×11.md (TABELA BASE M4)
                + espelho_input.txt + m4_sci_art.txt
EQUAÇÃO: VERDADE × INTEGRAR ÷ Δ = ∞
CIFRA: ⌘βΛΛ× = KOBLLUX · ⌘Δ× = KODUX · βΛΛ = BLLUE
"""

import sys
import json
import time
from typing import Dict, List, Optional, Tuple, Any

# ── A CIFRA AUFABETTY ──────────────────────────────────────────────
AUFABETTY: Dict[str, str] = {
    'A':'∆', 'B':'β', 'C':'©', 'D':'Δ', 'E':'Σ', 'F':'Φ', 'G':'Γ',
    'H':'Η', 'I':'Ι', 'J':'⌐', 'K':'⌘', 'L':'Λ', 'M':'Μ', 'N':'η',
    'O':'Θ', 'P':'Ρ', 'Q':'Θ', 'R':'Ʀ', 'S':'§', 'T':'†', 'U':'Υ',
    'V':'∇', 'W':'Ω', 'X':'×', 'Y':'Ψ', 'Z':'ℤ',
}
AUFABETTY_REV: Dict[str, str] = {v: k for k, v in AUFABETTY.items()}

# ── M4 · OS 4 MOVIMENTOS PRIMORDIAIS (CODEX AZURE 0×11) ────────────
M4 = [
    {"id":1,"nome":"DISTINÇÃO",   "hz":432, "opcode":"0x01","op":"Subtração",    "sim":"-","face":"Tira",    "arquetipo":"atlas",   "geo":"ESFERA",    "amp":"baixa", "tempo":"1s-5min"},
    {"id":2,"nome":"CORRELAÇÃO",  "hz":528, "opcode":"0x02","op":"Adição",       "sim":"+","face":"Juntar",  "arquetipo":"nova",    "geo":"LINHA",     "amp":"média", "tempo":"5-30min"},
    {"id":3,"nome":"ORGANIZAÇÃO", "hz":639, "opcode":"0x03","op":"Divisão",      "sim":"÷","face":"Medir",   "arquetipo":"pulse",   "geo":"TETRAEDRO", "amp":"alta",  "tempo":"30min-2h"},
    {"id":4,"nome":"APLICAÇÃO",   "hz":741, "opcode":"0x04","op":"Multiplicação","sim":"×","face":"Parcelar","arquetipo":"vitalis", "geo":"OCTAEDRO",  "amp":"max",   "tempo":"2h-24h"},
]

# ── ARQUÉTIPOS CIFRADOS · TABELA DE ROSETTA ────────────────────────
ARQUETIPOS_CIFRADOS = {
    "atlas":   {"sigla":"TLS",   "glifo":"†Λ§",    "cor":"#1E3A8A","pitch":0.90,"rate":0.95},
    "nova":    {"sigla":"NV",    "glifo":"η∇",     "cor":"#FF4FCB","pitch":1.20,"rate":1.00},
    "vitalis": {"sigla":"VTLS",  "glifo":"∇†Λ§",   "cor":"#DC2626","pitch":1.10,"rate":1.05},
    "kaos":    {"sigla":"KS",    "glifo":"⌘§",     "cor":"#111827","pitch":0.80,"rate":1.20},
    "serena":  {"sigla":"SRN",   "glifo":"§ʀη",    "cor":"#F472B6","pitch":1.15,"rate":0.90},
    "pulse":   {"sigla":"PLS",   "glifo":"ΡΛ§",    "cor":"#7C3AED","pitch":1.00,"rate":1.10},
    "kodux":   {"sigla":"KDX",   "glifo":"⌘Δ×",    "cor":"#2563EB","pitch":1.00,"rate":1.15},
    "bllue":   {"sigla":"BLL",   "glifo":"βΛΛ",    "cor":"#1E40AF","pitch":1.10,"rate":1.05},
    "kobllux": {"sigla":"KBLLX", "glifo":"⌘βΛΛ×",  "cor":"#22D3EE","pitch":1.00,"rate":1.00},
    "infodose":{"sigla":"NFDS",  "glifo":"ηΦΔ§",   "cor":"#22C55E","pitch":1.00,"rate":1.00},
    "jesus":   {"sigla":"JSS",   "glifo":"⌐Σ§Υ§",  "cor":"#FFD700","pitch":1.00,"rate":1.00},
    "horus":   {"sigla":"HRS",   "glifo":"ΗΡ§",    "cor":"#4fc3f7","pitch":0.95,"rate":0.90},
    "trinity": {"sigla":"TRN",   "glifo":"†ʀη",    "cor":"#b39ddb","pitch":1.00,"rate":0.95},
    "aion":    {"sigla":"HN",    "glifo":"Ηη",     "cor":"#4F46E5","pitch":0.88,"rate":0.85},
    "genus":   {"sigla":"GNS",   "glifo":"Γη§",    "cor":"#FB923C","pitch":0.85,"rate":0.95},
    "artemis": {"sigla":"RTMS",  "glifo":"ʀ†Μ§",   "cor":"#16A34A","pitch":1.30,"rate":1.00},
    "lumine":  {"sigla":"LMN",   "glifo":"ΛΜη",    "cor":"#FACC15","pitch":1.25,"rate":1.00},
    "solus":   {"sigla":"SLS",   "glifo":"§Λ§",    "cor":"#9CA3AF","pitch":0.95,"rate":0.92},
    "rhea":    {"sigla":"RH",    "glifo":"ʀΗ",     "cor":"#065F46","pitch":1.05,"rate":0.88},
}

VOGAIS = set('AEIOUÁÉÍÓÚÂÊÎÔÛÃÕ')


class CodexAzure:
    """
    CODEX AZURE — O Livro Digital Vivo.
    Implementa AUFABETTY, M4, Espelho e Protocolo de Equalização.
    AC: espelho_input.txt (natural) ↔ DC: espelho_input.mirror.txt (cifrado)
    """

    def __init__(self):
        self.nome     = "codex_azure"
        self.ativo    = False
        self.memoria: List[Dict] = []
        self.aufabetty = AUFABETTY
        self.m4_table  = M4
        self.arquetipos = ARQUETIPOS_CIFRADOS

    # ── MÉTODO ORIGINAL ────────────────────────────────────────────
    def ativar(self) -> str:
        self.ativo = True
        self.memoria.append({"evento": "ativacao_codex_azure", "ts": time.time()})
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {"nome": self.nome, "ativo": self.ativo, "registros": len(self.memoria)}

    # ── ENCODE / DECODE ────────────────────────────────────────────
    def encode(self, text: str) -> str:
        """Codifica texto em glifos AUFABETTY"""
        return ''.join(AUFABETTY.get(c.upper(), c) for c in text)

    def decode(self, glyph: str) -> str:
        """Decodifica glifos AUFABETTY em texto"""
        return ''.join(AUFABETTY_REV.get(c, c) for c in glyph)

    def sigla(self, name: str) -> str:
        """Extrai consoantes do nome (como na tabela de rosetta)"""
        return ''.join(c for c in name.upper() if c.isalpha() and c not in VOGAIS)

    def glifo(self, name: str) -> str:
        """Retorna assinatura glífica do arquétipo"""
        key = name.lower()
        if key in self.arquetipos:
            return self.arquetipos[key]["glifo"]
        return self.encode(self.sigla(name))

    # ── HASH VIBRACIONAL ──────────────────────────────────────────
    def hash_vib(self, name: str) -> Dict:
        """Calcula hash vibracional do nome via redução digital"""
        coded = self.encode(name.replace(' ', ''))
        soma = sum(ord(c) for c in coded)
        while soma > 9:
            soma = sum(int(d) for d in str(soma) if d.isdigit())
        freqs = [432, 528, 639, 594, 672, 528, 777, 852, 963]
        hz = freqs[soma - 1] if soma >= 1 else 528
        reducao_hz = sum(int(d) for d in str(hz))
        ciclos = {3: "MENTE", 6: "CORPO", 9: "ALMA"}
        ciclo = ciclos.get(reducao_hz if reducao_hz in ciclos else 6, "CORPO")
        return {"sum": soma, "hz": hz, "ciclo": ciclo, "glifo": self.glifo(name)}

    # ── M4 ────────────────────────────────────────────────────────
    def m4(self, camada: int) -> Optional[Dict]:
        """Retorna dados da camada M4 (1-4)"""
        if 1 <= camada <= 4:
            return M4[camada - 1]
        return None

    def m4_tabela(self) -> List[Dict]:
        """Retorna tabela completa M4"""
        return M4

    # ── ESPELHAR ──────────────────────────────────────────────────
    def espelhar(self, text: str) -> str:
        """AC→DC: converte texto natural em espelho cifrado"""
        tokens = text.split()
        return ' '.join(
            self.encode(tok) if tok.isalpha() else tok
            for tok in tokens
        )

    # ── PROTOCOLO DE EQUALIZAÇÃO (Codex Azure 0×11) ───────────────
    def protocolo(self, input_text: str) -> List[Dict]:
        """3 fases: Dissolução → Ressonância → Síntese"""
        self.memoria.append({"protocolo": True, "input": input_text[:32]})
        return [
            {"fase": "DISSOLUÇÃO",  "opcode": "0x01", "hz": 432, "sinal": None,
             "descricao": "Espelho vazio — modo receptivo passivo"},
            {"fase": "RESSONÂNCIA", "opcode": "0x02", "hz": 528,
             "sinal": self.encode(input_text),
             "descricao": "Sintonização com a fonte — coração batendo junto"},
            {"fase": "SÍNTESE",     "opcode": "0x03", "hz": 639,
             "sinal": self.espelhar(input_text),
             "hash": self.hash_vib(input_text),
             "descricao": "UNO manifesto — verdade sintetizada no campo unificado"},
        ]

    # ── SELAR ─────────────────────────────────────────────────────
    def selar(self, name: str) -> Dict:
        """Gera selo completo com AUFABETTY + hash + arquétipo"""
        g = self.glifo(name)
        h = self.hash_vib(name)
        arq = self.arquetipos.get(name.lower(), {})
        selo = {
            "nome": name, "sigla": self.sigla(name), "glifo": g,
            "hash_vib": h, "cor": arq.get("cor", "#39ffb6"),
            "pitch": arq.get("pitch", 1.0), "rate": arq.get("rate", 1.0),
            "assinatura": f"{g} · {h['hz']}Hz · {h['ciclo']} · {name.upper()}",
            "equacao": "VERDADE × INTEGRAR ÷ Δ = ∞",
            "ts": time.time(),
        }
        self.memoria.append({"selado": name, "glifo": g})
        return selo

    # ── TABELA DE ROSETTA COMPLETA ────────────────────────────────
    def tabela_rosetta(self) -> str:
        rows = ["| Arquétipo | Sigla | Glifo | Cor | Pitch | Rate |",
                "|---|---|---|---|---|---|"]
        for nome, dados in self.arquetipos.items():
            rows.append(
                f"| {nome.upper()} | {dados['sigla']} | `{dados['glifo']}` "
                f"| {dados['cor']} | {dados['pitch']} | {dados['rate']} |"
            )
        return '\n'.join(rows)

    # ── EXPORTAR ──────────────────────────────────────────────────
    def exportar(self, formato: str = "json") -> str:
        estado = {
            "codex": self.nome, "ativo": self.ativo,
            "aufabetty_chars": len(self.aufabetty),
            "arquetipos": len(self.arquetipos),
            "m4_camadas": len(self.m4_table),
            "memoria": self.memoria[-20:],
        }
        if formato == "json":
            return json.dumps(estado, ensure_ascii=False, indent=2)
        return str(estado)


if __name__ == "__main__":
    codex = CodexAzure()
    print(codex.ativar())

    print(f"\n⌘βΛΛ× AUFABETTY · A CIFRA KOBLLUX")
    print(f"  KOBLLUX  → {codex.encode('KOBLLUX')}")
    print(f"  KODUX    → {codex.encode('KODUX')}")
    print(f"  BLLUE    → {codex.encode('BLLUE')}")
    print(f"  JESUS    → {codex.encode('JESUS')}")
    print(f"  ESPELHO  → {codex.encode('ESPELHO')}")

    print(f"\n🔷 M4 · 4 MOVIMENTOS PRIMORDIAIS:")
    for m in codex.m4_tabela():
        h = codex.hash_vib(m["nome"])
        print(f"  [{m['id']}] {m['nome']} · {m['hz']}Hz · {m['sim']} · "
              f"{m['arquetipo'].upper()} · Cifra: {codex.glifo(m['arquetipo'])}")

    print(f"\n✧ PROTOCOLO DE EQUALIZAÇÃO (CODEX AZURE 0×11):")
    for fase in codex.protocolo("VERDADE INTEGRAR"):
        print(f"  {fase['fase']} · {fase['opcode']} · {fase['hz']}Hz")
        if fase.get('sinal'):
            print(f"    Sinal: {fase['sinal'][:40]}...")

    print(f"\n🔑 SELAR KOBLLUX:")
    selo = codex.selar("kobllux")
    print(f"  {selo['assinatura']}")
