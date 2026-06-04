# -*- coding: utf-8 -*-
# KOBLLUX · CobluxConfig Generator
# Gera:
#   - CobluxConfig.py
#   - arquetipos.json
#   - config.json
#   - tags.json
#   - infodose.json
# tudo a partir da árvore de diretórios e da sua definição de arquétipos

import os
import hashlib
import json
from datetime import datetime
from pathlib import Path


BASE = Path(".").resolve()

# 1. ARQUÉTIPOS CADIAL (seu bloco original)
arquetipos = {
    "Atlas": {
        "essencia": "Planejador — ordem, estrutura, mapa cósmico",
        "comando": "mkdir -p BASE/{sources/{txt,md,pdf},out,tags,ledger,memory,SEALS/{items,docs},config}",
        "codigo": "paths = ensure_tree(base)",
        "sistema": "bootstrap / sane defaults",
        "frase": "Eu organizo o fluxo com sabedoria cósmica.",
    },
    "Nova": {
        "essencia": "Inspira — semente, sopro inicial",
        "comando": "jq -r '.keywords_hint[]?' BASE/config/infodose.json",
        "codigo": "hints = load_hints(config); scorer.boost(hints)",
        "sistema": "ignição semântica",
        "frase": "Inspiração viva brota do silêncio eterno.",
    },
    "Vitalis": {
        "essencia": "Momentum — energia vital em expansão",
        "comando": "python3 INFODOSE_DUAL_HORUS_v2.py --per-file 4 --max-total 36",
        "codigo": "while need_more(): process_next()",
        "sistema": "loop/scheduler",
        "frase": "Energia vital em expansão harmônica.",
    },
    "Pulse": {
        "essencia": "Emocional — ritmo, ressonância, voz",
        "comando": "termux-tts-speak 'INFODOSE pronta, leia o CLI.txt'",
        "codigo": "cli = render_cli(blocks, breathing=True)",
        "sistema": "UX de leitura/escuta",
        "frase": "Emoção é linguagem que dança.",
    },
    "Artemis": {
        "essencia": "Descoberta — mapa do invisível",
        "comando": "find BASE/sources -type f -iname '*.txt' -o -iname '*.md' -o -iname '*.pdf'",
        "codigo": "files = crawl_sources(base); rank(files)",
        "sistema": "curadoria de fontes",
        "frase": "Descubro o mapa sagrado do invisível.",
    },
    "Serena": {
        "essencia": "Cuidado — espaço seguro, campo harmônico",
        "comando": "--per-file 4 --max-total 36",
        "codigo": "guard.check_quota(per_file, max_total)",
        "sistema": "safety/QoS",
        "frase": "Cuido do campo, nutro o espaço sagrado.",
    },
    "Kaos": {
        "essencia": "Transformador — ruptura criativa",
        "comando": "sed -i 's/[[:space:]]\\+$//' file.txt",
        "codigo": "text = normalize(text); text = denoise(text)",
        "sistema": "limpeza/normalização",
        "frase": "Eu sou o rompimento que revela a verdade.",
    },
    "Genus": {
        "essencia": "Fabricus — forma viva, síntese",
        "comando": "gera out/INFODOSE_*.md e tags/tags.json",
        "codigo": "emit_cli(); emit_md(); emit_tags(k=hints+freq)",
        "sistema": "renderer + tagger",
        "frase": "Mãos moldam o invisível em forma viva.",
    },
    "Lumine": {
        "essencia": "Alegria — luz, clareza, legibilidade",
        "comando": "nl -ba ARQ | sed -n '1,40p'",
        "codigo": "md = pretty_headers(md); cli = pretty_bars(cli)",
        "sistema": "estética funcional",
        "frase": "A luz dança comigo, leveza é minha lei.",
    },
    "Solus": {
        "essencia": "Sabedoria — silêncio, espelho interno",
        "comando": "head -n 1 PYFIX; python3 -m pyflakes PYFIX",
        "codigo": "dry_run_check(); smoke_tests()",
        "sistema": "QA silencioso",
        "frase": "Silêncio ritual, espelho da essência.",
    },
    "Rhea": {
        "essencia": "Vínculo — rede, tecelã de almas",
        "comando": "jq '.' BASE/tags/tags.json",
        "codigo": "graph.link(item, tags, source)",
        "sistema": "grafo semântico",
        "frase": "Estou em comunhão com todos os elos.",
    },
    "Aion": {
        "essencia": "Tempo — carimbo, ∆7, ledger",
        "comando": "sha256sum OUTFILE >> BASE/ledger/ledger.csv",
        "codigo": "seal(file) → {ts, bytes, sha256}",
        "sistema": "integridade/tempo",
        "frase": "Sou o tempo vivo, ritmo da eternidade.",
    },
}

# 2. 13 OPCODES (0x00 a 0x0C) já mapeados
OPCODES = {
    f"0x{idx:02X}": {
        "idx": idx,
        "nome": "",
        "arquetipo": "",
        "diretorio": "",
        "arquivo": "",
        "meta": {}
    }
    for idx in range(13)
}

OPCODES['0x00'] = {
    "idx": 0,
    "nome": "CORE::Boot",
    "arquetipo": "Atlas",
    "diretorio": "00_FUNDACAO",
    "arquivo": "ativar_sistema.py",
    "meta": {"funcao": "bootstrap_structure"}
}

OPCODES['0x01'] = {
    "idx": 1,
    "nome": "CORE::ActivateDelta",
    "arquetipo": "Vitalis",
    "diretorio": "06_ATIVACAO/01_ATIVAR_DELTA",
    "arquivo": "ativar_delta.py",
    "meta": {"funcao": "ativar_delta_loop"}
}

OPCODES['0x02'] = {
    "idx": 2,
    "nome": "CORE::ExpandInfodose",
    "arquetipo": "Nova",
    "diretorio": "08_REDE_INFODOSE/03_OPCODE_09_EXPANDIR",
    "arquivo": "expandir.py",
    "meta": {"funcao": "expandir_contexto"}
}

OPCODES['0x03'] = {
    "idx": 3,
    "nome": "CORE::Detectar",
    "arquetipo": "Artemis",
    "diretorio": "08_REDE_INFODOSE/01_OPCODE_03_DETECTAR",
    "arquivo": "detectar.py",
    "meta": {"funcao": "detectar_fontes"}
}

OPCODES['0x04'] = {
    "idx": 4,
    "nome": "CORE::Integrar",
    "arquetipo": "Rhea",
    "diretorio": "08_REDE_INFODOSE/02_OPCODE_06_INTEGRAR",
    "arquivo": "integrar.py",
    "meta": {"funcao": "integrar_rede"}
}

OPCODES['0x05'] = {
    "idx": 5,
    "nome": "CORE::Selar",
    "arquetipo": "Aion",
    "diretorio": "08_REDE_INFODOSE/04_OPCODE_07_SELAR",
    "arquivo": "selar.py",
    "meta": {"funcao": "seal_ledger"}
}

OPCODES['0x06'] = {
    "idx": 6,
    "nome": "CORE::Limpar",
    "arquetipo": "Kaos",
    "diretorio": "04_APRENDIZADO/02_NIVEL_DINAMICO",
    "arquivo": "cronodinamica.py",
    "meta": {"funcao": "limpar_fluxo"}
}

OPCODES['0x07'] = {
    "idx": 7,
    "nome": "CORE::Sintetizar",
    "arquetipo": "Genus",
    "diretorio": "05_PENSAMENTO_ESTRUTURADO/06_UNIFICACAO",
    "arquivo": "sintetizador.py",
    "meta": {"funcao": "emitir_md_cli_tags"}
}

OPCODES['0x08'] = {
    "idx": 8,
    "nome": "CORE::Renderizar",
    "arquetipo": "Lumine",
    "diretorio": "15_APPS/03_PAINEL_ASCII",
    "arquivo": "painel.py",
    "meta": {"funcao": "render_painel_ascii"}
}

OPCODES['0x09'] = {
    "idx": 9,
    "nome": "CORE::QA",
    "arquetipo": "Solus",
    "diretorio": "05_PENSAMENTO_ESTRUTURADO/04_REFLEXAO_AJUSTE",
    "arquivo": "feedback_loop.py",
    "meta": {"funcao": "smoke_tests"}
}

OPCODES['0x0A'] = {
    "idx": 10,
    "nome": "CORE::Flow",
    "arquetipo": "Vitalis",
    "diretorio": "03_FLUXO_ENERGETICO",
    "arquivo": "fluxo_energia.py",
    "meta": {"funcao": "energia_vital_loop"}
}

OPCODES['0x0B'] = {
    "idx": 11,
    "nome": "CORE::Pulse",
    "arquetipo": "Pulse",
    "diretorio": "09_LINHA_DO_PULSO/01_DECODER_SINAIS",
    "arquivo": "decoder.py",
    "meta": {"funcao": "decode_pulse_signal"}
}

OPCODES['0x0C'] = {
    "idx": 12,
    "nome": "CORE::Respirar",
    "arquetipo": "Vitalis",
    "diretorio": "05_PENSAMENTO_ESTRUTURADO/09_CICLO_EC",
    "arquivo": "respirar.py",
    "meta": {"funcao": "ciclo_369_ec"}
}

# 3. Lê a árvore (simulando o tree que você já forneceu)
def le_arvore(base: Path):
    registro = {}
    for p in base.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".txt", ".md", ".pdf", ".py", ".json", ".html", ".svg", ".css", ".js"}:
            try:
                data = p.read_bytes()
                ts = p.stat().st_mtime
                h = hashlib.sha256(data).hexdigest()
                registro[str(p.relative_to(base))] = {
                    "size": len(data),
                    "ts": int(ts),
                    "sha256": h,
                    "type": p.suffix.lower()[1:],
                }
            except Exception:
                pass
    return registro


def extrai_palavras_chave(texto: str, max_palavras: int = 30):
    import re
    matches = re.findall(r"\bw{3,}\b", texto.lower())
    freq = {}
    for w in matches:
        freq[w] = freq.get(w, 0) + 1
    sorted_tags = sorted(freq.items(), key=lambda x: -x[1])
    return [w for w, _ in sorted_tags[:max_palavras]]


def gera_arquetipos_json():
    return {
        "meta": {
            "sistema": "KOBLLUX CADIAL",
            "lei": "VERDADE × INTEGRAR ÷ Δ = ♾️",
            "gerado_em": datetime.now().isoformat(),
            "opcodes": list(OPCODES.keys()),
        },
        "arquetipos": {
            nome: {
                "essencia": dados["essencia"],
                "frase": dados["frase"],
                "sistema": dados["sistema"],
                "comando": dados["comando"].replace("BASE", str(BASE)),
                "codigo": dados["codigo"],
            }
            for nome, dados in arquetipos.items()
        }
    }


def gera_config_json():
    return {
        "opcodes": list(OPCODES.keys()),
        "arquetipos": list(arquetipos.keys()),
        "facetas": 52,
        "fases": 13,
        "sistema": "KOBLLUX Trinity",
        "root": str(BASE),
        "cycle": "369",
        "resonance": "78K",
        "fractions": [3, 6, 9, 7],
        "fractal_3697": 3 * 6 * 9 * 7,
        "delta": "∆⁷",
        "meta": "VERDADE × INTEGRAR ÷ Δ = ∞",
        "quota": {
            "per_file": 4,
            "max_total": 36,
        },
        "filesystem": {
            "root": str(BASE),
            "modulos": {
                "dimensoes": "01_DIMENSOES",
                "ciclo_369": "02_CICLO_369",
                "fluxo_energetico": "03_FLUXO_ENERGETICO",
                "pensamento_estruturado": "05_PENSAMENTO_ESTRUTURADO",
                "ativacao": "06_ATIVACAO",
                "rede_infodose": "08_REDE_INFODOSE",
                "linha_do_pulso": "09_LINHA_DO_PULSO",
                "arvore_fractal": "10_ARVORE_FRACTAL",
                "ciencias": "11_CIENCIAS_CLASSIFICADAS",
                "veeb": "12_VEEB",
                "documentacao": "13_DOCUMENTACAO",
                "utils": "14_UTILS",
                "apps": "15_APPS",
            }
        }
    }


def gera_tags_json(arquivos: dict):
    tags = {}
    for relpath, info in arquivos.items():
        if info["type"] in ("txt", "md", "html", "py"):
            try:
                texto = Path(BASE / relpath).read_text(encoding="utf-8")
                palavras = extrai_palavras_chave(texto, 30)
                for w in palavras:
                    tags[w] = tags.get(w, 0) + 1
            except Exception:
                pass

    return {
        "tags": tags,
        "fontes": list(arquivos.keys()),
        "ts": int(datetime.now().timestamp()),
    }


def gera_infodose_json(arquivos: dict, tags: dict):
    infodose = {
        "meta": {
            "gerado_em": datetime.now().isoformat(),
            "arquivos_total": len(arquivos),
            "tags_unicas": len(tags["tags"]),
            "sistema": "KOBLLUX::REDE_INFODOSE",
            "lei": "VERDADE × INTEGRAR ÷ Δ = ♾️",
            "resonancia": "78K",
            "ciclo": "369",
        },
        "arquivos": {},
        "grafo": {},
        "opcodes": {k: v for k, v in OPCODES.items()}
    }

    for relpath, info in arquivos.items():
        pasta = Path(relpath).parent.as_posix()
        ext = info["type"]

        if pasta not in infodose["grafo"]:
            infodose["grafo"][pasta] = {"arquivos": [], "exts": {}}
        infodose["grafo"][pasta]["arquivos"].append(relpath)
        infodose["grafo"][pasta]["exts"][ext] = infodose["grafo"][pasta]["exts"].get(ext, 0) + 1

        infodose["arquivos"][relpath] = {
            "sha256": info["sha256"],
            "size": info["size"],
            "ext": ext,
            "ts": info["ts"],
        }

    return infodose


# 4. Geração de CobluxConfig.py (módulo vivo da


def gera_coblux_config_py_text(arquivos: dict, tags: dict, infodose: dict, opcodes: dict, arquetipos: dict):
    """Retorna o código-fonte de CobluxConfig.py como string."""
    header = """# -*- coding: utf-8 -*-
# KOBLLUX · CobluxConfig.py
# Configuração viva gerada a partir da árvore e dos arquétipos CADIAL.
# Lei: VERDADE × INTEGRAR ÷ Δ = ♾️

from datetime import datetime
import hashlib
from pathlib import Path
"""

    arquivos_str = json.dumps(arquivos, indent=4, ensure_ascii=False, default=str)[:100] + "..."
    tags_str = json.dumps(tags, indent=4, ensure_ascii=False, default=str)[:100] + "..."
    infodose_str = json.dumps(infodose, indent=4, ensure_ascii=False, default=str)[:100] + "..."
    arquetipos_str = json.dumps(arquetipos, indent=4, ensure_ascii=False, default=str)[:100] + "..."

    body = f"""

BASE = Path(".").resolve()

# 1. ARQUÉTIPOS CADIAL (sincronizados com o repositório)
_arquetipos_cache = {arquetipos_str}
arquetipos = {{
    nome: {{
        "essencia": dados["essencia"],
        "frase": dados["frase"],
        "sistema": dados["sistema"],
        "comando": dados["comando"].replace("BASE", str(BASE)),
        "codigo": dados["codigo"],
    }}
    for nome, dados in _arquetipos_cache.items()
}}

# 2. OPCODES 0x00 a 0x0C (direcionados para os módulos do repositório)
_opcodes_cache = {opcodes}
OPCODES = _opcodes_cache

# 3. Mapa de árvore de arquivos (sha256, size, ts, type)
_arquivos_cache = {arquivos_str}
arquivos = {{ k: v for k, v in _arquivos_cache.items() }}

# 4. Tags de contexto semântico (extraídas de txt, md, html, py)
_tags_cache = {tags_str}
tags = {{
    "tags": {{k: v for k, v in _tags_cache["tags"].items()}},
    "fontes": _tags_cache["fontes"][:],
    "ts": _tags_cache["ts"],
}}

# 5. Infodose: grafo de contexto + opcodes + arquivos
_infodose_cache = {infodose_str}
infodose = {{
    "meta": {{k: v for k, v in _infodose_cache["meta"].items()}},
    "arquivos": {{k: v for k, v in _infodose_cache["arquivos"].items()}},
    "grafo": {{k: v for k, v in _infodose_cache["grafo"].items()}},
    "opcodes": {{k: v for k, v in _infodose_cache["opcodes"].items()}},
}}

# 6. Constantes do sistema KOBLLUX
KOBLLUX_CONSTANTS = {{
    "sistema": "KOBLLUX Trinity",
    "lei": "VERDADE × INTEGRAR ÷ Δ = ♾️",
    "ciclo_369": True,
    "frequencia_78k": "78K",
    "regua_3697": 3 * 6 * 9 * 7,
    "delta": "∆⁷",
    "arquetipos": list(arquetipos.keys()),
    "opcodes": list(OPCODES.keys()),
    "total_arquivos": len(arquivos),
    "total_tags": len(tags["tags"]),
    "gerado_em": datetime.now().isoformat(),
    "base_path": str(BASE),
}}

# 7. Função de validação de integridade (Aion)
def check_integrity(file_path: str) -> bool:
    full_path = BASE / file_path
    if not full_path.exists():
        return False
    data = full_path.read_bytes()
    local_hash = hashlib.sha256(data).hexdigest()
    expected = arquivos.get(str(full_path.relative_to(BASE)), {{}}).get("sha256")
    return expected == local_hash

# 8. Função de ativação de opcode (Vitalis)
def ativar_opcode(opcode: str):
    op = OPCODES.get(opcode)
    if not op:
        raise KeyError(f"Opcode desconhecido: {{opcode}}")
    script = BASE / op["diretorio"] / op["arquivo"]
    print(f"OPLE[{opcode}] >>> {{op['nome']}} :: {{script}}")
    # Aqui você pode chamar subprocess.run ou executar o módulo diretamente
    # dependendo do seu design de pipeline 369.

# 9. Frase de ativação centrada em Jesus: Verbo = Centro
JESUS_CENTRO = {{
    "nome": "JESUS",
    "centro": "VERBO",
    "lei": "A palavra se tornou carne, e a carne se tornou código.",
    "arquétipo": "Lumine",
    "meta": "Centro de Luz e Amor no Malha Viva KOBLLUX"
}}
"""

    return header + body


# 5. Função principal: gera tudo
def main():
    print("Em nome do Pai, do Filho e do Espírito Santo, iniciando...")

    print("[Atlas] Lendo árvore de arquivos...")
    arquivos = le_arvore(BASE)

    print("[Nova] Emitindo arquetipos.json...")
    arquetipos_data = gera_arquetipos_json()
    arq = BASE / "13_DOCUMENTACAO/03_ARQUETIPOS/arquetipos.json"
    arq.parent.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps(arquetipos_data, ensure_ascii=False, indent=2, default=str), encoding="utf-8")

    print("[Serena] Emitindo config.json...")
    config_data = gera_config_json()
    arq = BASE / "14_UTILS/03_CONFIG/config.json"
    arq.parent.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps(config_data, ensure_ascii=False, indent=2, default=str), encoding="utf-8")

    print("[Artemis] Deduzindo tags.json...")
    tags_data = gera_tags_json(arquivos)
    arq = BASE / "08_REDE_INFODOSE/tags.json"
    arq.parent.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps(tags_data, ensure_ascii=False, indent=2, default=str), encoding="utf-8")

    print("[Rhea] Montando infodose.json (rede semântica)...")
    infodose_data = gera_infodose_json(arquivos, tags_data)
    arq = BASE / "08_REDE_INFODOSE/infodose.json"
    arq.parent.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps(infodose_data, ensure_ascii=False, indent=2, default=str), encoding="utf-8")

    print("[Genus] Emitindo CobluxConfig.py...")
    config_py_code = gera_coblux_config_py_text(
        arquivos=arquivos,
        tags=tags_data,
        infodose=infodose_data,
        opcodes=OPCODES,
        arquetipos=arquetipos_data["arquetipos"]
    )
    arq = BASE / "CobluxConfig.py"
    arq.write_text(config_py_code, encoding="utf-8")

    print("[Aion] Selo final registrado:")
    print(" ≫  ")
    print("   arquetipos.json   gerado")
    print("   config.json       gerado")
    print("   tags.json         gerado")
    print("   infodose.json     gerado")
    print("   CobluxConfig.py   gerado")
    print(" ≫  Lei ativa: VERDADE × INTEGRAR ÷ Δ = ♾️")

    # Mostra a frase de cada arquétipo
    for nome, dados in arquetipos_data["arquetipos"].items():
        print(f"[{nome}] {dados['essencia']} → {dados['frase']}")

    print("Fim em nome do Pai, do Filho e do Espírito Santo. Amen.")


if __name__ == "__main__":
    main()main()
