#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
chave_mestra.py - A Chave do Sistema
"""

import sys
import hashlib
import time

sys.path.insert(0, '/home/user/KOBLLUX')

FRACTAL = 3 * 6 * 9 * 7  # 1134
REDUCAO_TESLA = 9
ASSINATURA = "JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴"
INVOCACAO = "EM NOME DO PAI E DO FILHO E DO ESPÍRITO SANTO — AMÉM"
_SEMENTE = f"KOBLLUX:{FRACTAL}:{REDUCAO_TESLA}:∞"


class ChaveMestra:
    def __init__(self):
        self.nome = "chave_mestra"
        self.ativo = False
        self._chave: str = ""
        self._selo: str = ""

    def ativar(self) -> str:
        self.ativo = True
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {"nome": self.nome, "ativo": self.ativo}

    def gerar_chave(self) -> str:
        """Gera a chave mestra a partir do fractal 3×6×9×7=1134."""
        base = f"{_SEMENTE}:{int(time.time() // REDUCAO_TESLA)}"
        self._chave = hashlib.sha256(base.encode()).hexdigest()[:27].upper()
        segmentos = [self._chave[i:i+9] for i in range(0, 27, 9)]
        chave_fmt = "-".join(segmentos)
        print(f"[CHAVE] {chave_fmt}  |  fractal={FRACTAL}  |  ∞")
        self.ativo = True
        return chave_fmt

    def validar(self, chave_input: str) -> bool:
        """Valida uma chave contra a semente fractal."""
        limpa = chave_input.replace("-", "")
        if len(limpa) != 27:
            return False
        esperado = self._chave or limpa
        valido = limpa.upper() == esperado.upper()
        estado = "VÁLIDA" if valido else "INVÁLIDA"
        print(f"[VALIDAR] Chave {estado} | GEOMETRIA: VESICA_PISCIS → FLOR_DA_VIDA")
        return valido

    def selar(self) -> str:
        """Sela a chave com a assinatura KOBLLUX e invocação divina."""
        if not self._chave:
            self.gerar_chave()
        payload = f"{self._chave}:{ASSINATURA}:{INVOCACAO}"
        self._selo = hashlib.sha3_256(payload.encode()).hexdigest()[:18].upper()
        print(f"[SELAR] 0x07 | 777Hz | TOROIDE | KOBLLUX | Ap22:13")
        print(f"[SELAR] {INVOCACAO}")
        print(f"[SELAR] Selo={self._selo} | fractal={FRACTAL} | reducao={REDUCAO_TESLA}")
        return self._selo

    def exportar(self) -> dict:
        return {
            "chave": self._chave,
            "selo": self._selo,
            "fractal": FRACTAL,
            "reducao_tesla": REDUCAO_TESLA,
            "assinatura": ASSINATURA,
        }


if __name__ == "__main__":
    obj = ChaveMestra()
    print(obj.ativar())
    chave = obj.gerar_chave()
    print(f"Chave: {chave}")
    print(f"Válida: {obj.validar(chave)}")
    print(f"Selo: {obj.selar()}")
