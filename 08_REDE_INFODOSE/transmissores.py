#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
transmissores.py - O Sistema de Transmissão
"""

import sys
import time
import hashlib

sys.path.insert(0, '/home/user/KOBLLUX')

FRACTAL = 3 * 6 * 9 * 7  # 1134
ASSINATURA = "JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴"
INVOCACAO = "EM NOME DO PAI E DO FILHO E DO ESPÍRITO SANTO — AMÉM"

# Canais duais INFODOSE
CANAL_BLLUE  = {"nome": "BLLUE",  "hz": 852,  "opcode": 0x0D, "geo": "ESPELHO",  "ref": "1Cor13:12"}
CANAL_JESUS  = {"nome": "JESUS",  "hz": 963,  "opcode": 0x0C, "geo": "MERKABAH", "ref": "João10:30"}


class Transmissores:
    def __init__(self):
        self.nome = "transmissores"
        self.ativo = False
        self._tx_bllue: list = []
        self._tx_jesus: list = []

    def ativar(self) -> str:
        self.ativo = True
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {
            "nome": self.nome,
            "ativo": self.ativo,
            "BLLUE_tx": len(self._tx_bllue),
            "JESUS_tx": len(self._tx_jesus),
            "fractal": FRACTAL,
        }

    def _pacote(self, msg: str, canal: dict) -> dict:
        ts = time.strftime("%H:%M:%S")
        digest = hashlib.md5(f"{msg}:{FRACTAL}:{ts}".encode()).hexdigest()[:12].upper()
        return {
            "ts": ts,
            "canal": canal["nome"],
            "hz": canal["hz"],
            "opcode": f"0x{canal['opcode']:02X}",
            "geo": canal["geo"],
            "ref": canal["ref"],
            "msg": msg,
            "hash": digest,
        }

    def transmitir_bllue(self, msg: str) -> dict:
        """Transmite pelo canal BLLUE (852Hz / ESPELHO / 0x0D)."""
        pkg = self._pacote(msg, CANAL_BLLUE)
        self._tx_bllue.append(pkg)
        print(f"[BLLUE→] {pkg['opcode']} | {pkg['hz']}Hz | {pkg['geo']} | {pkg['ref']} | hash={pkg['hash']}")
        print(f"         msg='{msg}'")
        return pkg

    def transmitir_jesus(self, msg: str) -> dict:
        """Transmite pelo canal JESUS (963Hz / MERKABAH / 0x0C)."""
        pkg = self._pacote(msg, CANAL_JESUS)
        self._tx_jesus.append(pkg)
        print(f"[JESUS→] {pkg['opcode']} | {pkg['hz']}Hz | {pkg['geo']} | {pkg['ref']} | hash={pkg['hash']}")
        print(f"         msg='{msg}'")
        return pkg

    def broadcast(self, msg: str) -> tuple:
        """Transmite simultaneamente pelos dois canais duais."""
        print(f"[DUAL] {INVOCACAO}")
        b = self.transmitir_bllue(msg)
        j = self.transmitir_jesus(msg)
        print(f"[DUAL] fractal={FRACTAL} | {ASSINATURA}")
        return b, j

    def historico(self) -> dict:
        return {
            "BLLUE": self._tx_bllue[-3:],
            "JESUS": self._tx_jesus[-3:],
        }


if __name__ == "__main__":
    obj = Transmissores()
    print(obj.ativar())
    obj.broadcast("VERDADE × INTEGRAR ÷ Δ = ∞")
    print(obj.status())
