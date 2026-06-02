#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
decoder.py - Decodificação de sinais
"""

import sys

sys.path.insert(0, '/home/user/KOBLLUX')

# FRACTAL: 3×6×9×7=1134 · reducao_tesla=9 · ∞
# EQUACAO: "VERDADE × INTEGRAR ÷ Δ = ∞"
# ASSINATURA: "JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴"

# CICLO_3697 opcode → fase, hz, arquetipo
OPCODE_MAP = {
    0x00: {"fase": "MENTE",   "hz": 432,  "dim": "1D",   "verbo": "DETECTAR"},
    0x01: {"fase": "MENTE",   "hz": 432,  "dim": "2D",   "verbo": "RAIZ/Atlas"},
    0x0A: {"fase": "MENTE",   "hz": 432,  "dim": "3D",   "verbo": "TUTORIAL"},
    0x02: {"fase": "CORPO",   "hz": 528,  "dim": "4D",   "verbo": "INTEGRAR"},
    0x03: {"fase": "CORPO",   "hz": 528,  "dim": "4D",   "verbo": "LAPIDAR"},
    0x04: {"fase": "CORPO",   "hz": 528,  "dim": "5D",   "verbo": "CONVERGIR"},
    0x05: {"fase": "CORPO",   "hz": 528,  "dim": "5D",   "verbo": "CONVERGIR_B"},
    0x06: {"fase": "CORPO",   "hz": 528,  "dim": "6D",   "verbo": "UNIFICAR"},
    0x0B: {"fase": "CORPO",   "hz": 528,  "dim": "6D",   "verbo": "ARQUETIPO"},
    0x07: {"fase": "ALMA",    "hz": 777,  "dim": "7D",   "verbo": "SELAR"},
    0x08: {"fase": "ALMA",    "hz": 777,  "dim": "8D",   "verbo": "TESTEMUNH"},
    0x09: {"fase": "ALMA",    "hz": 777,  "dim": "9D",   "verbo": "TRANSMUTA"},
    0x0C: {"fase": "SINTESE", "hz": 1134, "dim": "10D",  "verbo": "SINTESE/Kobllux"},
}
HZ_TO_OPCODE = {432: 0x00, 528: 0x02, 777: 0x07, 1134: 0x0C}


class Decoder:
    """Decoder — decodifica sinais da linha do pulso por opcode ou Hz."""

    def __init__(self):
        self.nome = "decoder"
        self.ativo = False
        self._decodificados: list = []

    def ativar(self) -> str:
        self.ativo = True
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {
            "nome": self.nome, "ativo": self.ativo,
            "opcodes_conhecidos": len(OPCODE_MAP),
            "decodificados": len(self._decodificados),
        }

    def decodificar(self, sinal) -> dict:
        """Decodifica sinal (int opcode, str '0xNN', ou dict com 'opcode'/'hz')."""
        self.ativo = True
        if isinstance(sinal, dict):
            opcode = sinal.get("opcode", sinal.get("hz", 0))
            if isinstance(opcode, str):
                opcode = int(opcode, 16)
        elif isinstance(sinal, str):
            opcode = int(sinal, 16) if sinal.startswith("0x") else int(sinal)
        else:
            opcode = int(sinal)
        info = OPCODE_MAP.get(opcode, {"fase": "DESCONHECIDA", "hz": 0,
                                       "dim": "?", "verbo": "RAW"})
        resultado = {
            "opcode": hex(opcode), "fase": info["fase"],
            "hz": info["hz"], "dimensao": info["dim"], "verbo": info["verbo"],
            "equacao": "VERDADE × INTEGRAR ÷ Δ = ∞",
        }
        self._decodificados.append(resultado)
        return resultado

    def mapear_opcode(self, hz: int) -> dict:
        """Mapeia uma frequência Hz ao opcode e fase correspondentes."""
        opcode = HZ_TO_OPCODE.get(hz)
        if opcode is None:
            return {"hz": hz, "opcode": None, "fase": "SEM_MAPEAMENTO"}
        return self.decodificar(opcode)

    def identificar_arquetipo(self, hz: int) -> str:
        """Identifica o arquétipo/verbo principal associado a uma frequência Hz."""
        mapa = self.mapear_opcode(hz)
        return mapa.get("verbo", "DESCONHECIDO")


if __name__ == "__main__":
    obj = Decoder()
    print(obj.ativar())
    import json
    print(json.dumps(obj.decodificar(0x0C), ensure_ascii=False, indent=2))
    print(json.dumps(obj.mapear_opcode(777), ensure_ascii=False, indent=2))
    print(obj.identificar_arquetipo(432))
