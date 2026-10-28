#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# KOBLLUX · 0x01 · DETECTAR · 432Hz · ATLAS
"""KOBLLUX TRINITY SYSTEM
captacao.py - Coletar informações do ambiente
VERDADE × INTEGRAR ÷ ∆ = ∞ · 3×6×9×7=1134
"""
from __future__ import annotations
import hashlib, time

OPCODE = "0x01"
HZ = 432
ARQUETIPO = "ATLAS"
GEO = "ESFERA"
DIM = "1D-3D"
FRACTAL = 3 * 6 * 9 * 7


class Captacao:
    opcode: str = OPCODE
    hz: float = HZ
    arquetipo: str = ARQUETIPO
    geometria: str = GEO

    def __init__(self):
        self.nome = "Captacao"
        self.ativo = False
        self._camadas: list = []
        self._buffer: list = []

    def ativar(self) -> str:
        self.ativo = True
        sig = hashlib.sha256(f"KOBLLUX:{OPCODE}:{HZ}:{time.time()}".encode()).hexdigest()[:8]
        self._camadas.append({"opcode": OPCODE, "hz": HZ, "sig": sig})
        return f"✅ {self.nome} · {OPCODE} · {HZ}Hz · {ARQUETIPO} · {sig}"

    def status(self) -> dict:
        return {"nome": self.nome, "ativo": self.ativo, "opcode": OPCODE, "hz": HZ,
                "arquetipo": ARQUETIPO, "geometria": GEO, "dimensao": DIM, "fractal": FRACTAL,
                "camadas": len(self._camadas)}

    def captar(self, sinal) -> dict:
        """Capta um sinal do ambiente e armazena no buffer."""
        ts = time.time()
        sig = hashlib.sha256(f"{OPCODE}:{HZ}:{sinal}:{ts}".encode()).hexdigest()[:8]
        registro = {
            "sinal": sinal,
            "hz": HZ,
            "opcode": OPCODE,
            "arquetipo": ARQUETIPO,
            "geo": GEO,
            "timestamp": ts,
            "sig": sig,
        }
        self._buffer.append(registro)
        return registro

    def filtrar(self, dados: list, threshold: float) -> list:
        """Filtra dados retendo apenas os com intensidade >= threshold."""
        resultado = []
        for item in dados:
            valor = item if isinstance(item, (int, float)) else item.get("intensidade", 0)
            if valor >= threshold:
                resultado.append(item)
        return resultado

    def buffer_captado(self) -> list:
        """Retorna o buffer acumulado de captações."""
        return list(self._buffer)


if __name__ == "__main__":
    obj = Captacao()
    print(obj.ativar())
    import json
    print(json.dumps(obj.status(), indent=2, ensure_ascii=False))
