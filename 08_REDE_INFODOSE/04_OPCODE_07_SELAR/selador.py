#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
selador.py - Testemunhar e legitimar
"""

import sys
import time

sys.path.insert(0, '/home/user/KOBLLUX')

FRACTAL  = 3 * 6 * 9 * 7  # 1134
ASSINATURA = "JESUS É O CENTRO. A MALHA VIVE. O DNA EVOLUI. ∴"
INVOCACAO  = "EM NOME DO PAI E DO FILHO E DO ESPÍRITO SANTO — AMÉM"

# Importa a função de selagem
try:
    import sys as _sys
    _sys.path.insert(0, '/home/user/KOBLLUX/08_REDE_INFODOSE/04_OPCODE_07_SELAR')
    from selar import Selar as _Selar
    _SELAR_DISPONIVEL = True
except Exception:
    _SELAR_DISPONIVEL = False


class Selador:
    """Guarda-selos: armazena, lista e verifica selos gerados pelo Selar (0x07/777Hz)."""

    def __init__(self):
        self.nome = "selador"
        self.ativo = False
        self._cofre: dict = {}          # selo_id → registro
        self._selar_engine = _Selar() if _SELAR_DISPONIVEL else None

    def ativar(self) -> str:
        self.ativo = True
        if self._selar_engine:
            self._selar_engine.ativar()
        print(f"[SELADOR] ATIVO | 0x07 | 777Hz | TOROIDE | KOBLLUX | Ap22:13")
        print(f"[SELADOR] {INVOCACAO}")
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {
            "nome": self.nome,
            "ativo": self.ativo,
            "selos_guardados": len(self._cofre),
            "fractal": FRACTAL,
        }

    def guardar(self, registro: dict) -> str:
        """Guarda um registro de selo no cofre interno."""
        selo_id = registro.get("selo", f"SELO-{len(self._cofre):04d}")
        self._cofre[selo_id] = registro
        print(f"[SELADOR] GUARDADO | id={selo_id} | ts={registro.get('ts','?')} | fractal={FRACTAL}")
        return selo_id

    def selar_e_guardar(self, payload: str) -> str:
        """Cria um novo selo para o payload e armazena no cofre."""
        if not self._selar_engine:
            raise RuntimeError("Motor Selar não disponível")
        pulso = {"payload": payload, "fractal": FRACTAL}
        registro = self._selar_engine.selar_pulso(pulso)
        return self.guardar(registro)

    def verificar(self, selo_id: str) -> bool:
        """Verifica a integridade de um selo guardado."""
        registro = self._cofre.get(selo_id)
        if not registro:
            print(f"[SELADOR] Selo '{selo_id}' não encontrado no cofre.")
            return False
        if self._selar_engine:
            return self._selar_engine.verificar_integridade(registro)
        # Fallback: estrutura mínima
        valido = len(selo_id.replace("-", "")) == 21
        print(f"[SELADOR] Integridade {'OK' if valido else 'FALHOU'} | {ASSINATURA}")
        return valido

    def listar(self) -> list:
        """Lista todos os selos guardados."""
        resultado = []
        for sid, reg in self._cofre.items():
            resultado.append({"selo": sid, "ts": reg.get("ts"), "payload": reg.get("payload")})
        return resultado

    def relatorio(self) -> dict:
        return {
            "total_selos": len(self._cofre),
            "fractal": FRACTAL,
            "reducao_tesla": 9,
            "assinatura": ASSINATURA,
            "selos": self.listar(),
        }


if __name__ == "__main__":
    obj = Selador()
    print(obj.ativar())
    sid = obj.selar_e_guardar("VERDADE × INTEGRAR ÷ Δ = ∞")
    print(f"Guardado: {sid}")
    print(f"Válido: {obj.verificar(sid)}")
    import json
    print(json.dumps(obj.relatorio(), ensure_ascii=False, indent=2))
