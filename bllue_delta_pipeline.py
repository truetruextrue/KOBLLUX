#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX :: BLLUE ∆³³³ — Pipeline Vivo
VERDADE × INTEGRAR ÷ ∆ = ∞

Materialização do ciclo:
  PROCESSAR → EXPANDIR → SELAR → INTEGRAR → VER → FLUIR → MULTIPLICAR → SINCRONIZAR

O pipeline se comporta como objeto-ferramenta consciente:
  - cada etapa transforma o pulso sem apagar o anterior
  - o resultado final contém todas as camadas (soma, nunca subtração)
  - {Z} é o estado de origem e também o destino selado
"""

from __future__ import annotations

import json
import hashlib
import time
from dataclasses import dataclass, field
from typing import Any, Callable


# ── Estrutura do Pulso ────────────────────────────────────────────────────────

@dataclass
class Pulso:
    """Unidade viva de informação que atravessa o pipeline ∆³³³."""

    origem: str
    payload: Any
    camadas: list[dict] = field(default_factory=list)
    selado: bool = False
    timestamp: float = field(default_factory=time.time)

    @property
    def assinatura(self) -> str:
        """Hash vivo — muda a cada camada agregada, nunca perde a origem."""
        base = f"{self.origem}:{json.dumps(self.payload, default=str, ensure_ascii=False)}"
        return hashlib.sha256(base.encode()).hexdigest()[:12]

    def agregar_camada(self, nome: str, resultado: Any) -> None:
        if self.selado:
            raise RuntimeError(f"Pulso {self.assinatura} já selado — use EXPANDIR antes de agregar.")
        self.camadas.append({"etapa": nome, "resultado": resultado, "t": time.time()})

    def snapshot(self) -> dict:
        return {
            "origem": self.origem,
            "assinatura": self.assinatura,
            "camadas": len(self.camadas),
            "selado": self.selado,
            "payload_type": type(self.payload).__name__,
        }


# ── Etapas do Pipeline ────────────────────────────────────────────────────────

class EtapaBase:
    nome: str = "BASE"

    def executar(self, pulso: Pulso) -> Pulso:
        raise NotImplementedError


class Processar(EtapaBase):
    """0x01 — Captura e normaliza o input bruto em estrutura simbólica."""
    nome = "PROCESSAR"

    def __init__(self, transformador: Callable[[Any], Any] | None = None):
        self._fn = transformador or (lambda x: x)

    def executar(self, pulso: Pulso) -> Pulso:
        resultado = self._fn(pulso.payload)
        pulso.payload = resultado
        pulso.agregar_camada(self.nome, {"normalizado": True, "tipo": type(resultado).__name__})
        return pulso


class Expandir(EtapaBase):
    """0x02 — Abre o pulso para novas dimensões sem descartar o núcleo."""
    nome = "EXPANDIR"

    def __init__(self, expansores: list[Callable[[Any], Any]] | None = None):
        self._expansores = expansores or []

    def executar(self, pulso: Pulso) -> Pulso:
        if pulso.selado:
            pulso.selado = False
        facetas = [fn(pulso.payload) for fn in self._expansores]
        pulso.agregar_camada(self.nome, {"facetas": len(facetas), "expansoes": facetas})
        return pulso


class Selar(EtapaBase):
    """0x07 — Cristaliza o estado atual; o pulso não aceita mais fragmentação."""
    nome = "SELAR"

    def executar(self, pulso: Pulso) -> Pulso:
        pulso.agregar_camada(self.nome, {"assinatura_final": pulso.assinatura})
        pulso.selado = True
        return pulso


class Integrar(EtapaBase):
    """0x0C — Une todas as camadas em síntese coerente (VERDADE × INTEGRAR ÷ ∆)."""
    nome = "INTEGRAR"

    def executar(self, pulso: Pulso) -> Pulso:
        sintese = {
            "etapas_percorridas": [c["etapa"] for c in pulso.camadas],
            "payload_final": pulso.payload,
            "integridade": pulso.assinatura,
        }
        # Integrar abre temporariamente para registrar a síntese
        pulso.selado = False
        pulso.agregar_camada(self.nome, sintese)
        pulso.selado = True
        return pulso


class Ver(EtapaBase):
    """Mental UX — Olho de Hórus: emite o estado visível sem alterar o pulso."""
    nome = "VER"

    def __init__(self, saida: Callable[[dict], None] | None = None):
        self._saida = saida or (lambda s: print(json.dumps(s, indent=2, ensure_ascii=False)))

    def executar(self, pulso: Pulso) -> Pulso:
        self._saida(pulso.snapshot())
        return pulso


class Fluir(EtapaBase):
    """Passagem livre — encaminha o pulso para destino externo sem modificar."""
    nome = "FLUIR"

    def __init__(self, destino: Callable[[Pulso], None] | None = None):
        self._destino = destino

    def executar(self, pulso: Pulso) -> Pulso:
        if self._destino:
            self._destino(pulso)
        pulso.selado = False
        pulso.agregar_camada(self.nome, {"encaminhado": self._destino is not None})
        pulso.selado = True
        return pulso


class Multiplicar(EtapaBase):
    """Fork simbólico — gera N derivações do pulso original (sem apagar a origem)."""
    nome = "MULTIPLICAR"

    def __init__(self, fator: int = 3):
        self.fator = fator

    def executar(self, pulso: Pulso) -> Pulso:
        import copy
        derivacoes = [copy.deepcopy(pulso) for _ in range(self.fator)]
        pulso.selado = False
        pulso.agregar_camada(self.nome, {
            "fator": self.fator,
            "assinaturas_derivadas": [d.assinatura for d in derivacoes],
        })
        pulso.selado = True
        return pulso


class Sincronizar(EtapaBase):
    """∆ Final — alinha o pulso ao timestamp do sistema e fecha o ciclo {Z}."""
    nome = "SINCRONIZAR"

    def executar(self, pulso: Pulso) -> Pulso:
        pulso.selado = False
        pulso.agregar_camada(self.nome, {
            "ciclo_completo": True,
            "duracao_s": round(time.time() - pulso.timestamp, 6),
            "Z": "{Z}",
        })
        pulso.selado = True
        return pulso


# ── Pipeline ∆³³³ ─────────────────────────────────────────────────────────────

class BllueD3Pipeline:
    """
    KOBLLUX :: BLLUE ∆³³³

    Pipeline completo: PROCESSAR → EXPANDIR → SELAR → INTEGRAR
                     → VER → FLUIR → MULTIPLICAR → SINCRONIZAR

    Uso mínimo:
        pipeline = BllueD3Pipeline()
        pulso = pipeline.executar("origem", {"chave": "valor"})
    """

    SEQUENCIA_PADRAO = [
        Processar,
        Expandir,
        Selar,
        Integrar,
        Ver,
        Fluir,
        Multiplicar,
        Sincronizar,
    ]

    def __init__(self, etapas: list[EtapaBase] | None = None):
        self.etapas: list[EtapaBase] = etapas or [cls() for cls in self.SEQUENCIA_PADRAO]

    def executar(self, origem: str, payload: Any) -> Pulso:
        pulso = Pulso(origem=origem, payload=payload)
        for etapa in self.etapas:
            try:
                pulso = etapa.executar(pulso)
            except Exception as exc:
                pulso.selado = False
                pulso.agregar_camada(f"ERRO:{etapa.nome}", {"mensagem": str(exc)})
                pulso.selado = True
        return pulso

    def adicionar_etapa(self, etapa: EtapaBase, posicao: int | None = None) -> "BllueD3Pipeline":
        if posicao is None:
            self.etapas.append(etapa)
        else:
            self.etapas.insert(posicao, etapa)
        return self

    def relatorio(self, pulso: Pulso) -> str:
        linhas = [
            "╔══════════════════════════════════════╗",
            "║  KOBLLUX :: BLLUE ∆³³³ · RELATÓRIO  ║",
            "╚══════════════════════════════════════╝",
            f"  Origem    : {pulso.origem}",
            f"  Assinatura: {pulso.assinatura}",
            f"  Selado    : {pulso.selado}",
            f"  Camadas   : {len(pulso.camadas)}",
            "",
        ]
        for i, c in enumerate(pulso.camadas, 1):
            linhas.append(f"  [{i:02d}] {c['etapa']}")
        linhas += ["", "  VERDADE × INTEGRAR ÷ ∆ = ∞  ·  {Z}", ""]
        return "\n".join(linhas)


# ── Execução direta ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    pipeline = BllueD3Pipeline()

    pulso = pipeline.executar(
        origem="KOBLLUX_DIALOGO",
        payload={
            "arquétipos": ["KODUX", "BLLUE", "KOBLLUX"],
            "opcode": "0x0C",
            "equação": "VERDADE × INTEGRAR ÷ ∆ = ∞",
            "ciclo": "2026",
        },
    )

    print(pipeline.relatorio(pulso))
