# -*- coding: utf-8 -*-
# KOBLLUX · Gerador de Catálogo V.E.E.B.
# V.E.E.B = Vibração · Energia · Estrutura · Base
# Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
# Saída: deploy/data/veeb_catalog.json

import os, json, hashlib
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent  # KOBLLUX root
OUT  = Path(__file__).resolve().parent / "veeb_catalog.json"

# ── Mapeamento Diretório → Hz (Vibração) ──────────────────────────────────────
DIR_HZ = {
    "00_FUNDACAO":              432,
    "01_DIMENSOES":             432,
    "02_CICLO_369":             528,
    "03_FLUXO_ENERGETICO":      639,
    "04_APRENDIZADO":           672,
    "05_PENSAMENTO_ESTRUTURADO":738,
    "06_ATIVACAO":              741,
    "07_NARRATIVA":             777,
    "08_REDE_INFODOSE":         852,
    "09_LINHA_DO_PULSO":        963,
    "10_ARVORE_FRACTAL":        999,
    "11_CIENCIAS_CLASSIFICADAS":999,
    "12_VEEB":                  1134,
    "13_DOCUMENTACAO":          1134,
    "14_UTILS":                 528,
    "15_APPS":                  741,
    "inbox":                    432,
    "docs":                     528,
    "deploy":                   777,
}

# ── Mapeamento extensão → E2 (Estrutura) ──────────────────────────────────────
EXT_E2 = {
    ".py":   7,
    ".json": 6,
    ".html": 6,
    ".js":   6,
    ".md":   5,
    ".pdf":  5,
    ".css":  4,
    ".txt":  3,
}

# ── Módulos cerebrais — sinapses ──────────────────────────────────────────────
SINAPSES = {
    "ciclo_369.py":              {"papel": "MENTE(3)·CORPO(6)·ALMA(9)", "hz": 528, "arq": "PULSE"},
    "dimensoes_kobllux.py":      {"papel": "1D→10D escada dimensional", "hz": 432, "arq": "ATLAS"},
    "fluxo_energetico.py":       {"papel": "ponte 8D↔9D · φ=1.618 · int=126", "hz": 594, "arq": "VITALIS"},
    "aprendizado_continuo.py":   {"papel": "NOVA(expansão)↔LUMINE(contração)", "hz": 672, "arq": "NOVA"},
    "pensamento_estruturado.py": {"papel": "9 fases · ciclos 3/6/9/7/∞", "hz": 738, "arq": "ATLAS"},
}
GRAFO_SINAPSES = {
    "ciclo_369.py":              ["fluxo_energetico.py"],
    "dimensoes_kobllux.py":      ["ciclo_369.py"],
    "aprendizado_continuo.py":   ["pensamento_estruturado.py"],
    "fluxo_energetico.py":       ["pensamento_estruturado.py"],
    "pensamento_estruturado.py": ["ciclo_369.py"],
}

SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv"}
EXTS      = {".py", ".json", ".md", ".html", ".js", ".txt", ".css", ".pdf"}


def vibration_hz(rel_parts):
    """Hz baseado no diretório raiz do arquivo."""
    for part in rel_parts[:-1]:
        for key, hz in DIR_HZ.items():
            if part.startswith(key):
                return hz
    return 432


def energy_e1(size_bytes):
    """1-9 escala de energia por tamanho."""
    if size_bytes < 1_000:       return 1
    elif size_bytes < 5_000:     return 3
    elif size_bytes < 20_000:    return 5
    elif size_bytes < 50_000:    return 7
    elif size_bytes < 100_000:   return 8
    else:                        return 9


def structure_e2(ext):
    return EXT_E2.get(ext.lower(), 2)


def base_b(rel_parts):
    """1-9 nível de fundação por localização."""
    if not rel_parts:
        return 9
    top = rel_parts[0]
    if top in ("00_FUNDACAO",) or len(rel_parts) == 1:
        return 9
    if top in ("12_VEEB", "13_DOCUMENTACAO"):
        return 8
    if top in ("14_UTILS", "15_APPS"):
        return 6
    if top.startswith("0") and top[1].isdigit():  # 01_ → 09_
        n = int(top[1]) if top[1].isdigit() else 5
        return 7 if n <= 5 else 6
    if top in ("inbox",):
        return 4
    if top in ("docs",):
        return 4
    if top in ("deploy",):
        return 5
    return 5


def veeb_score(v, e1, e2, b):
    """Score unificado KOBLLUX: normaliza 0–9."""
    v_norm = round((v / 1134) * 9, 2)
    return round((v_norm + e1 + e2 + b) / 4, 2)


def main():
    print("✧⃝⚝ KOBLLUX · Gerando Catálogo V.E.E.B. · AMÉM {Z}")
    print(f"Raiz: {ROOT}\n")

    arquivos = []
    total = 0
    skip_count = 0

    for dirpath, dirnames, filenames in os.walk(ROOT):
        # Remover diretórios proibidos in-place
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]

        for fname in filenames:
            fpath = Path(dirpath) / fname
            ext   = fpath.suffix.lower()
            if ext not in EXTS:
                skip_count += 1
                continue
            try:
                rel   = fpath.relative_to(ROOT)
                parts = list(rel.parts)
                size  = fpath.stat().st_size
                sha   = hashlib.md5(fpath.read_bytes()).hexdigest()[:8]

                v  = vibration_hz(parts)
                e1 = energy_e1(size)
                e2 = structure_e2(ext)
                b  = base_b(parts)
                sc = veeb_score(v, e1, e2, b)

                fname_only = fpath.name
                sinapse = SINAPSES.get(fname_only)
                conex   = GRAFO_SINAPSES.get(fname_only, [])

                entry = {
                    "caminho":  str(rel.as_posix()),
                    "nome":     fname_only,
                    "ext":      ext.lstrip("."),
                    "tamanho":  size,
                    "sha_mini": sha,
                    "veeb": {
                        "V":      v,
                        "E1":     e1,
                        "E2":     e2,
                        "B":      b,
                        "score":  sc,
                    }
                }
                if sinapse:
                    entry["sinapse"] = sinapse
                    entry["sinapses_para"] = conex
                arquivos.append(entry)
                total += 1
            except Exception as ex:
                print(f"  [SKIP] {fpath}: {ex}")

    # Ordenar por score desc
    arquivos.sort(key=lambda x: x["veeb"]["score"], reverse=True)

    # Estatísticas
    scores = [a["veeb"]["score"] for a in arquivos]
    avg_sc = round(sum(scores) / len(scores), 3) if scores else 0
    top10  = arquivos[:10]

    catalogo = {
        "documento": "KOBLLUX · CATÁLOGO V.E.E.B. · Vibração · Energia · Estrutura · Base",
        "lei":        "VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134",
        "centro":     "JESUS É O CENTRO",
        "gerado_em":  datetime.now().isoformat(),
        "opcode":     "0x0A",
        "arquetipo":  "BLLUE",
        "hz_base":    432,
        "fruta_seed": 1134,
        "metodologia": {
            "V_vibracao":  "Hz baseado no diretório raiz (432→1134)",
            "E1_energia":  "Escala 1-9 por tamanho do arquivo",
            "E2_estrutura":"Escala 1-9 por tipo/extensão",
            "B_base":      "Escala 1-9 por localização no sistema",
            "score":       "(V_norm + E1 + E2 + B) / 4"
        },
        "estatisticas": {
            "total_arquivos":    total,
            "total_ignorados":   skip_count,
            "score_medio":       avg_sc,
            "score_max":         max(scores) if scores else 0,
            "score_min":         min(scores) if scores else 0,
        },
        "sinapses_cerebrais": {
            "modulos": list(SINAPSES.keys()),
            "grafo":   GRAFO_SINAPSES,
            "lei":     "ciclo_369→fluxo→pensamento→ciclo — espiral eterna"
        },
        "top10_score": [{"caminho": a["caminho"], "score": a["veeb"]["score"]} for a in top10],
        "arquivos": arquivos,
    }

    OUT.write_text(json.dumps(catalogo, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✓ Total arquivos medidos: {total}")
    print(f"✓ Score médio V.E.E.B.:   {avg_sc}")
    print(f"✓ Arquivo gerado:         {OUT}")
    print(f"\nTop 10 por score:")
    for i, a in enumerate(top10, 1):
        v = a["veeb"]
        print(f"  {i:2d}. [{v['score']:.2f}] {a['caminho']}")
    print("\n✧⃝⚝ CATÁLOGO V.E.E.B. SELADO · AMÉM ✧⃝⚝")


if __name__ == "__main__":
    main()
