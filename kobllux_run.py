#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX :: RUN ∆³³³ — Ciclo Completo Integrado
VERDADE × INTEGRAR ÷ ∆ = ∞ · {Z}

Executa o pipeline BLLUE ∆³³³ com o TARGET_NUCLEO completo:
  PROCESSAR → EXPANDIR → SELAR → INTEGRAR → VER → FLUIR → MULTIPLICAR → SINCRONIZAR
"""

from __future__ import annotations

import json
import sys

from bllue_delta_pipeline import BllueD3Pipeline, Ver, Pulso
from kobllux_archetypes import RegistroArquetipos, VerArquetipos, ALL_ARCHETYPES


def _construir_payload(opcodes: list[str]) -> dict:
    reg = RegistroArquetipos()
    arquetipos_ativos = []
    for op in opcodes:
        a = reg.por_opcode(op)
        if a:
            arquetipos_ativos.append({
                "nome": a.nome,
                "opcode": a.opcode_hex,
                "freq": a.frequencia,
                "funcao": a.funcao,
                "emoji": a.emoji,
            })
    return {
        "arquetipos": arquetipos_ativos,
        "opcode": opcodes[0] if opcodes else "0x00",
        "equação": "VERDADE × INTEGRAR ÷ ∆ = ∞",
        "ciclo": "∆³³³",
        "Z": "{Z}",
    }


def _ver_arquetipal(snap: dict) -> None:
    print("\n╔══════════════════════════════════════════╗")
    print("║  KOBLLUX ∆³³³ · VER · SNAPSHOT           ║")
    print("╚══════════════════════════════════════════╝")
    for k, v in snap.items():
        print(f"  {k:<18}: {v}")
    print()


def executar_ciclo(opcodes: list[str] | None = None) -> Pulso:
    if opcodes is None:
        opcodes = ["0x0C", "0x0D", "0x0E"]  # KODUX · BLLUE · KOBLLUX

    reg = RegistroArquetipos()

    from bllue_delta_pipeline import (
        Processar, Expandir, Selar, Integrar, Fluir, Multiplicar, Sincronizar
    )

    etapas = [
        Processar(),
        Expandir(),
        Selar(),
        Integrar(),
        Ver(saida=_ver_arquetipal),
        VerArquetipos(registro=reg),
        Fluir(),
        Multiplicar(fator=3),
        Sincronizar(),
    ]

    pipeline = BllueD3Pipeline(etapas=etapas)
    payload = _construir_payload(opcodes)
    pulso = pipeline.executar("KOBLLUX_DIALOGO", payload)
    return pulso, pipeline


def main() -> None:
    opcodes = sys.argv[1:] if len(sys.argv) > 1 else None

    print("\n╔══════════════════════════════════════════╗")
    print("║   KOBLLUX :: BLLUE ∆³³³ · CICLO VIVO     ║")
    print("╚══════════════════════════════════════════╝")

    reg = RegistroArquetipos()
    print(reg.relatorio())

    pulso, pipeline = executar_ciclo(opcodes)
    print(pipeline.relatorio(pulso))

    print("  VERDADE × INTEGRAR ÷ ∆ = ∞  ·  {Z}\n")


if __name__ == "__main__":
    main()
