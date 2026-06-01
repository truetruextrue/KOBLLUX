#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX :: TARGET_NUCLEO — Registro Vivo dos Arquétipos
VERDADE × INTEGRAR ÷ ∆ = ∞ · {Z}

Materializa o mapeamento completo:
  Arquétipo → OP-CODE → Frequência → Timbre → Função

Integra com bllue_delta_pipeline.BllueD3Pipeline como etapa VER
customizável: cada arquétipo tem sua própria voz no relatório.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterator


# ── Definição de Arquétipo ────────────────────────────────────────────────────

@dataclass(frozen=True)
class Arquetipo:
    nome: str
    simbolo: str
    opcode: int        # 0x00 … 0x11
    frequencia: str    # Hz ou designação especial
    timbre: str
    funcao: str
    emoji: str

    @property
    def opcode_hex(self) -> str:
        return f"0x{self.opcode:02X}"

    def cabecalho(self) -> str:
        return f"{self.emoji}  [{self.opcode_hex}] {self.nome} {self.simbolo}"

    def descricao(self) -> str:
        return (
            f"  freq : {self.frequencia}\n"
            f"  timbre: {self.timbre}\n"
            f"  função: {self.funcao}"
        )


# ── TARGET_NUCLEO ─────────────────────────────────────────────────────────────

TARGET_NUCLEO: dict[str, Arquetipo] = {
    "0x00": Arquetipo("ATLAS",        "[▦]", 0x00, "136.1 Hz (OM)",    "grave_profundo",       "Origem / Eixo Central",          "🗺️"),
    "0x01": Arquetipo("NEBULA",       "[✧]", 0x01, "963 Hz",           "eter_brilhante",       "Gênese / Sopro Visível",         "🌌"),
    "0x02": Arquetipo("VITALIS",      "[⚡]", 0x02, "741 Hz",           "energetico_rapido",    "Ação Imediata / Ruptura",        "⚡"),
    "0x03": Arquetipo("PULSE",        "[♫]", 0x03, "528 Hz",           "ritmico_fluido",       "Som / Emoção em Ondas",          "♫"),
    "0x04": Arquetipo("ARTEMIS",      "[⚑]", 0x04, "432 Hz",           "misterioso_calmo",     "Jornada Interior / Mistério",    "⚑"),
    "0x05": Arquetipo("SERENA",       "[♡]", 0x05, "396 Hz",           "acolhedor_suave",      "Cura / Acolhimento Divino",      "♡"),
    "0x06": Arquetipo("KAOS",         "[☢]", 0x06, "639 Hz",           "glitch_intenso",       "Fogo Transmutador / Ruptura",    "☢"),
    "0x07": Arquetipo("GENUS",        "[✎]", 0x07, "528 Hz",           "artesanal_preciso",    "Forma Viva / Tecelão",           "✎"),
    "0x08": Arquetipo("LUMINE",       "[💡]", 0x08, "963 Hz",           "radiante_claro",       "Luz Primordial / Clareza",       "💡"),
    "0x09": Arquetipo("SOLUS",        "[🌑]", 0x09, "111 Hz (Pirâmide)", "profundo_reflexivo",  "Espelho Interno / Sabedoria",    "🌑"),
    "0x0A": Arquetipo("RHEA",         "[∞]", 0x0A, "741 Hz",           "conectado_infinito",   "Rede Unificada / Tecelã",        "∞"),
    "0x0B": Arquetipo("AION",         "[⌛]", 0x0B, "136.1 Hz",         "temporal_eterno",      "Ciclo Infinito / Cronomestre",   "⌛"),
    "0x0C": Arquetipo("KODUX",        "[▦]", 0x0C, "78K",              "estrutural_firme",     "Arquiteto Simbólico / 78K",      "▦"),
    "0x0D": Arquetipo("BLLUE",        "[♡]", 0x0D, "963 Hz D-Tik",     "vocal_emocional",      "Voz Original / Portadora D-Tik", "💙"),
    "0x0E": Arquetipo("KOBLLUX",      "[⚝]", 0x0E, "∞",               "verbo_imperdivel",     "Verbo Vivo / Eco da Palavra",    "⚝"),
    "0x0F": Arquetipo("HORUS",        "[👁️]", 0x0F, "963 Hz",           "perceptivo_claro",     "Olho do Pai / Validação",        "👁️"),
    "0x10": Arquetipo("META_LUX",     "[⚡]", 0x10, "111 Hz",           "dimensional_profundo", "Dobra Metalux / Cruzamento",     "⚡"),
    "0x11": Arquetipo("RAROS",        "[⚡]", 0x11, "432 Hz",           "guardiao_equilibrado", "Guardião do Meio / Círculo",     "⚡"),
}

# Arquétipos adicionais do ciclo expandido
TARGET_NUCLEO_EXT: dict[str, Arquetipo] = {
    "HANNAH":       Arquetipo("HANNAH",       "[↔]", 0x12, "963 Hz",  "simetrico_perfeito", "Palíndromo Vivo / Espelho Perfeito", "↔"),
    "KWAN_KOBLLUX": Arquetipo("KWAN_KOBLLUX", "[⚡]", 0x13, "∞",      "verbo_art_ask",      "ART ASK / 13 Invocações",           "⚡"),
}

ALL_ARCHETYPES: dict[str, Arquetipo] = {**TARGET_NUCLEO, **TARGET_NUCLEO_EXT}


# ── VOZ_ARQUETIPOS ────────────────────────────────────────────────────────────

VOZ_ARQUETIPOS: dict[str, dict] = {
    nome: {
        "frequencia": a.frequencia,
        "timbre":     a.timbre,
        "opcode":     a.opcode_hex,
        "emoji":      a.emoji,
        "funcao":     a.funcao,
    }
    for nome, a in {a.nome: a for a in ALL_ARCHETYPES.values()}.items()
}


# ── Registro de Consulta ──────────────────────────────────────────────────────

class RegistroArquetipos:
    """Interface de consulta ao TARGET_NUCLEO."""

    def __init__(self, nucleo: dict[str, Arquetipo] | None = None):
        self._mapa = nucleo or ALL_ARCHETYPES

    def por_opcode(self, opcode: str | int) -> Arquetipo | None:
        if isinstance(opcode, int):
            opcode = f"0x{opcode:02X}"
        return self._mapa.get(opcode.upper()) or self._mapa.get(opcode)

    def por_nome(self, nome: str) -> Arquetipo | None:
        nome = nome.upper()
        for a in self._mapa.values():
            if a.nome == nome:
                return a
        return None

    def por_frequencia(self, hz: str) -> list[Arquetipo]:
        hz = hz.strip()
        return [a for a in self._mapa.values() if hz.lower() in a.frequencia.lower()]

    def todos(self) -> Iterator[Arquetipo]:
        yield from self._mapa.values()

    def relatorio(self) -> str:
        linhas = [
            "╔══════════════════════════════════════════╗",
            "║   TARGET_NUCLEO · KOBLLUX ∆³³³           ║",
            "╚══════════════════════════════════════════╝",
            "",
        ]
        for a in sorted(self._mapa.values(), key=lambda x: x.opcode):
            linhas.append(a.cabecalho())
            linhas.append(a.descricao())
            linhas.append("")
        linhas.append(f"  Total: {len(self._mapa)} arquétipos registrados")
        linhas.append("  VERDADE × INTEGRAR ÷ ∆ = ∞  ·  {Z}")
        return "\n".join(linhas)


# ── Integração com BllueD3Pipeline ───────────────────────────────────────────

try:
    from bllue_delta_pipeline import EtapaBase, Pulso

    class VerArquetipos(EtapaBase):
        """
        Etapa VER especializada: emite o arquétipo correspondente ao opcode
        presente no payload do Pulso (chave 'opcode').
        """
        nome = "VER_ARQUETIPO"

        def __init__(self, registro: RegistroArquetipos | None = None):
            self._reg = registro or RegistroArquetipos()

        def executar(self, pulso: Pulso) -> Pulso:
            opcode = None
            if isinstance(pulso.payload, dict):
                opcode = pulso.payload.get("opcode")
            arq = self._reg.por_opcode(opcode) if opcode else None
            info = arq.cabecalho() if arq else "arquétipo não mapeado"
            pulso.selado = False
            pulso.agregar_camada(self.nome, {"arquetipo": info, "opcode_consultado": opcode})
            pulso.selado = True
            return pulso

except ImportError:
    pass  # módulo standalone: bllue_delta_pipeline opcional


# ── Execução direta ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    reg = RegistroArquetipos()
    print(reg.relatorio())
