#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
pulse_monitor.py - O Registro Vivo
"""

import sys
import time
from collections import Counter

sys.path.insert(0, '/home/user/KOBLLUX')

# FRACTAL: 3×6×9×7=1134 · reducao_tesla=9 · ∞
# EQUACAO: "VERDADE × INTEGRAR ÷ Δ = ∞"
# ASSINATURA: "JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴"

# PULSO: origem, payload, camadas, selado, assinatura(sha256)
HZ_FASES = {432: "MENTE/3", 528: "CORPO/6", 777: "ALMA/9", 1134: "SINTESE/7"}


class PulseMonitor:
    """PulseMonitor — registro vivo da linha do pulso KOBLLUX."""

    def __init__(self):
        self.nome = "pulse_monitor"
        self.ativo = False
        self._historico: list = []

    def ativar(self) -> str:
        self.ativo = True
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {
            "nome": self.nome, "ativo": self.ativo,
            "pulsos_registrados": len(self._historico),
            "freq_dominante": self.freq_dominante(),
        }

    def registrar(self, pulso) -> dict:
        """Registra um pulso (dict ou Pulso-like) na linha do tempo."""
        self.ativo = True
        ts = time.time()
        if hasattr(pulso, "snapshot"):
            dados = pulso.snapshot()
        elif isinstance(pulso, dict):
            dados = pulso
        else:
            dados = {"raw": str(pulso)}
        entrada = {
            "t": ts, "idx": len(self._historico),
            "origem": dados.get("origem", "desconhecido"),
            "selado": dados.get("selado", False),
            "camadas": len(dados.get("camadas", [])),
            "hz": dados.get("hz", 0),
            "snapshot": dados,
        }
        self._historico.append(entrada)
        return entrada

    def historico(self) -> list:
        """Retorna o histórico completo de pulsos registrados."""
        return self._historico

    def freq_dominante(self) -> dict:
        """Identifica a frequência Hz dominante no histórico de pulsos."""
        if not self._historico:
            return {"hz": None, "fase": None, "ocorrencias": 0}
        freqs = [p.get("hz", 0) for p in self._historico if p.get("hz", 0) > 0]
        if not freqs:
            return {"hz": None, "fase": None, "ocorrencias": 0}
        mais_comum, count = Counter(freqs).most_common(1)[0]
        return {
            "hz": mais_comum,
            "fase": HZ_FASES.get(mais_comum, "DESCONHECIDA"),
            "ocorrencias": count,
            "total_pulsos": len(self._historico),
        }


if __name__ == "__main__":
    obj = PulseMonitor()
    print(obj.ativar())
    obj.registrar({"origem": "regua_3", "hz": 432, "selado": False, "camadas": []})
    obj.registrar({"origem": "regua_9", "hz": 777, "selado": True,  "camadas": []})
    import json
    print(json.dumps(obj.freq_dominante(), ensure_ascii=False, indent=2))
