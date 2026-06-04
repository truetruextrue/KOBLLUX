#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
KOBLLUX TRINITY SYSTEM
corpo.py - Movimento e Ação
"""

import sys

# CICLO_369 FASE_6: CORPO · movimento · soma · 528Hz · Vitalis
# 3D archetype / DODECAEDRO geometry / opcode 0x02
# VSICA_PSI stage: INTEGRATE(528Hz)

class Corpo:
    """CICLO_369 FASE_6 — CORPO: movimento, soma, o campo encarnado.

    Archetype: Vitalis · Hz: 528 · Opcode: 0x02 · Geometry: DODECAEDRO
    Fase: INTEGRATE(528Hz) — segundo estágio do pipeline VSICA_PSI.
    WRITER_THEORY: DUAL=VIVIFICAR — o corpo vivifica a mente.
    """

    FASE = "FASE_6"
    ARCHETYPE = "Vitalis"
    HZ = 528
    OPCODE = 0x02
    GEOMETRIA = "DODECAEDRO"
    FRACTAL_SEED = 1134
    DESCRICAO = "CORPO · movimento · soma · 528Hz"

    def __init__(self):
        self.nome = "corpo"
        self.ativo = False
        self._energia = 0.0
        self._vibracao_atual = 0
        self._soma_integrada = False

    def ativar(self) -> str:
        self.ativo = True
        return f"✅ {self.nome} ativado com sucesso"

    def status(self) -> dict:
        return {
            "nome": self.nome,
            "ativo": self.ativo,
            "fase": self.FASE,
            "archetype": self.ARCHETYPE,
            "hz": self.HZ,
            "opcode": hex(self.OPCODE),
            "geometria": self.GEOMETRIA,
            "energia": self._energia,
            "vibracao_atual": self._vibracao_atual,
            "soma_integrada": self._soma_integrada,
        }

    def mover(self, energia: float) -> dict:
        """Move o corpo com a energia fornecida, integrando pelo Hz Vitalis (528).

        O movimento é proporcional à ressonância dodecaédrica.
        """
        self._energia += energia
        impulso = energia * (self.HZ / self.FRACTAL_SEED)
        return {
            "archetype": self.ARCHETYPE,
            "opcode": hex(self.OPCODE),
            "geometria": self.GEOMETRIA,
            "energia_adicionada": energia,
            "energia_total": self._energia,
            "impulso": round(impulso, 6),
            "hz": self.HZ,
            "fase_vsica": f"INTEGRATE({self.HZ}Hz)",
        }

    def integrar_soma(self) -> str:
        """Integra o soma (corpo físico) com o campo energético Vitalis.

        Alinha corpo e energia no estágio INTEGRATE do pipeline VSICA_PSI.
        """
        self._soma_integrada = True
        coeficiente = self.HZ / self.FRACTAL_SEED  # 528/1134 ≈ 0.4656
        soma_valor = self._energia * coeficiente
        return (
            f"[{self.ARCHETYPE}|{hex(self.OPCODE)}|{self.GEOMETRIA}] "
            f"SOMA INTEGRADA — energia={self._energia:.4f} | "
            f"coef_vitalis={coeficiente:.4f} | soma={soma_valor:.4f} | "
            f"INTEGRATE({self.HZ}Hz) | DUAL=VIVIFICAR"
        )

    def vibrar_corpo(self, hz: int = None) -> str:
        """Vibra o corpo na frequência especificada (528Hz padrão Vitalis).

        Ativa a ressonância dodecaédrica do campo somático.
        """
        freq = hz if hz is not None else self.HZ
        self._vibracao_atual = freq
        diferenca = freq - self.HZ
        modo = "RESSONÂNCIA" if freq == self.HZ else f"HARMÔNICO(Δ={diferenca:+d}Hz)"
        return (
            f"[{self.ARCHETYPE}|{hex(self.OPCODE)}|{self.GEOMETRIA}] "
            f"CORPO vibrando em {freq}Hz | {modo} | "
            f"soma_integrada={self._soma_integrada}"
        )

if __name__ == "__main__":
    obj = Corpo()
    print(obj.ativar())
