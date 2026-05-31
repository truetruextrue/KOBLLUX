# -*- coding: utf-8 -*-
# ╔══════════════════════════════════════════════════════════════════════╗
# ║  KOBLLUX · CADIAL ARCHETYPES SCANNER + V.E.E.B. · REPO EDITION     ║
# ║  Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134                ║
# ║  Saída: deploy/data/arvore_kobllux_renomeada.json                   ║
# ║  EM NOME DO PAI, DO FILHO E DO ESPÍRITO SANTO. AMÉM.               ║
# ╚══════════════════════════════════════════════════════════════════════╝
#
# USO:
#   python3 kobllux_archetypes_scanner.py [--executar] [--arquetipo NOME]
#
# MODO PADRÃO: dry-run (simulação sem renomear — segurança primeiro)
# --executar   : aplica renomeações (CUIDADO: irreversível no filesystem)
# --arquetipo  : filtra por um arquétipo específico

import os, re, json, hashlib, argparse, unicodedata
from pathlib import Path
from datetime import datetime
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent.parent
OUT  = Path(__file__).resolve().parent / "arvore_kobllux_renomeada.json"

# ── Mapeamento de diretórios KOBLLUX → opcode ──────────────────────────
KOBLLUX_DIR_OPCODE = {
    "00_FUNDACAO":              "0x00",
    "01_DIMENSOES":             "0x01",
    "02_CICLO_369":             "0x02",
    "03_FLUXO_ENERGETICO":      "0x03",
    "04_APRENDIZADO":           "0x04",
    "05_PENSAMENTO_ESTRUTURADO":"0x05",
    "06_ATIVACAO":              "0x06",
    "07_NARRATIVA_TEMPORAL":    "0x07",
    "08_REDE_INFODOSE":         "0x08",
    "09_LINHA_DO_PULSO":        "0x09",
    "10_ARVORE_FRACTAL":        "0x09",
    "11_CIENCIAS_CLASSIFICADAS":"0x08",
    "12_VEEB":                  "0x0A",
    "13_DOCUMENTACAO":          "0x0B",
    "14_UTILS":                 "0x04",
    "15_APPS":                  "0x06",
    "16_ASCII_ART":             "0x08",
    "17_MIDIA_INFODOSE":        "0x08",
    "deploy":                   "0x0C",
    "docs":                     "0x0B",
    "inbox":                    "0x00",
    "web":                      "0x03",
    "output":                   "0x0C",
}

# ── V.E.E.B. scoring (alinhado com gerar_veeb_catalog.py) ─────────────
DIR_HZ = {
    "00_FUNDACAO": 432, "01_DIMENSOES": 432, "02_CICLO_369": 528,
    "03_FLUXO_ENERGETICO": 639, "04_APRENDIZADO": 672,
    "05_PENSAMENTO_ESTRUTURADO": 738, "06_ATIVACAO": 741,
    "07_NARRATIVA_TEMPORAL": 777, "08_REDE_INFODOSE": 852,
    "09_LINHA_DO_PULSO": 963, "10_ARVORE_FRACTAL": 999,
    "11_CIENCIAS_CLASSIFICADAS": 999, "12_VEEB": 1134,
    "13_DOCUMENTACAO": 1134, "14_UTILS": 528, "15_APPS": 741,
    "16_ASCII_ART": 852, "17_MIDIA_INFODOSE": 852,
    "deploy": 777, "docs": 528, "inbox": 432, "web": 741, "output": 777,
}
EXT_E2 = {".py":7,".json":6,".html":6,".js":6,".md":5,".css":4,".txt":3,".sh":5}

def base_b(partes):
    if not partes: return 4
    d0 = partes[0]
    if d0 in ("00_FUNDACAO","12_VEEB","13_DOCUMENTACAO"): return 9
    if d0 in ("01_DIMENSOES","02_CICLO_369","03_FLUXO_ENERGETICO",
              "04_APRENDIZADO","05_PENSAMENTO_ESTRUTURADO","06_ATIVACAO",
              "07_NARRATIVA_TEMPORAL","08_REDE_INFODOSE","09_LINHA_DO_PULSO"): return 7
    if d0 in ("10_ARVORE_FRACTAL","11_CIENCIAS_CLASSIFICADAS"): return 6
    if d0 == "deploy": return 5
    return 4

def veeb_score(fpath: Path, rel: Path) -> dict:
    partes = rel.parts
    d0 = partes[0] if partes else ""
    hz = DIR_HZ.get(d0, 528)
    v_norm = round(hz / 1134 * 9, 2)
    sz = fpath.stat().st_size if fpath.exists() else 0
    if sz < 1024: e1 = 1
    elif sz < 5120: e1 = 3
    elif sz < 20480: e1 = 5
    elif sz < 51200: e1 = 7
    else: e1 = 9
    e2 = EXT_E2.get(fpath.suffix.lower(), 2)
    b  = base_b(partes)
    sc = round((v_norm + e1 + e2 + b) / 4, 3)
    return {"V": v_norm, "E1": e1, "E2": e2, "B": b, "score": sc, "hz": hz}

# ── 12 Arquétipos CADIAL ───────────────────────────────────────────────
ARQUETIPOS = {
    "Atlas":   {"opcode":"0x00","regra":"BOOT",    "vogal":"A","rung":1,
                "dir_ideal":"00_FUNDACAO","hz":768,
                "padroes":[r"config",r"setup",r"boot",r"init",r"main",r"readme",r"fundacao",r"core"]},
    "Nova":    {"opcode":"0x02","regra":"SEED",    "vogal":"Æ","rung":2,
                "dir_ideal":"02_CICLO_369","hz":528,
                "padroes":[r"nova",r"seed",r"manifesto",r"codex",r"ciclo",r"mente",r"alma",r"corpo"]},
    "Vitalis": {"opcode":"0x03","regra":"DELTA",   "vogal":"O","rung":3,
                "dir_ideal":"03_FLUXO_ENERGETICO","hz":639,
                "padroes":[r"fluxo",r"energetico",r"energia",r"flow",r"delta",r"vibracao",r"vitalis"]},
    "Pulse":   {"opcode":"0x0B","regra":"PULSE",   "vogal":"I","rung":4,
                "dir_ideal":"deploy","hz":528,
                "padroes":[r"pulse",r"audio",r"tts",r"voz",r"player",r"decoder",r"infodose"]},
    "Artemis": {"opcode":"0x01","regra":"DETECT",  "vogal":"A","rung":5,
                "dir_ideal":"01_DIMENSOES","hz":432,
                "padroes":[r"dimensao",r"dimensional",r"detect",r"scan",r"map",r"atlas",r"artemis"]},
    "Serena":  {"opcode":"0x09","regra":"GUARD",   "vogal":"U","rung":6,
                "dir_ideal":"09_LINHA_DO_PULSO","hz":963,
                "padroes":[r"pulso",r"guard",r"safe",r"backup",r"log",r"livro",r"eternidade",r"aion"]},
    "Kaos":    {"opcode":"0x06","regra":"UNIFICAR","vogal":"E","rung":7,
                "dir_ideal":"06_ATIVACAO","hz":741,
                "padroes":[r"ativacao",r"ativar",r"unif",r"trinity",r"kaos",r"clean",r"fix"]},
    "Genus":   {"opcode":"0x07","regra":"SELAR",   "vogal":"O","rung":8,
                "dir_ideal":"07_NARRATIVA_TEMPORAL","hz":777,
                "padroes":[r"narrativa",r"historia",r"selar",r"genus",r"build",r"synth",r"render"]},
    "Lumine":  {"opcode":"0x0A","regra":"RENDER",  "vogal":"Æ","rung":9,
                "dir_ideal":"12_VEEB","hz":1134,
                "padroes":[r"veeb",r"bllue",r"lumine",r"visual",r"light",r"ascii",r"art",r"ui"]},
    "Solus":   {"opcode":"0x0B","regra":"QA",      "vogal":"U","rung":10,
                "dir_ideal":"13_DOCUMENTACAO","hz":1134,
                "padroes":[r"doc",r"codex",r"test",r"relatorio",r"analise",r"espelho",r"solus"]},
    "Rhea":    {"opcode":"0x04","regra":"INTEGRAR","vogal":"U","rung":11,
                "dir_ideal":"04_APRENDIZADO","hz":672,
                "padroes":[r"aprendizado",r"rede",r"link",r"hub",r"integrar",r"rhea",r"graph"]},
    "Aion":    {"opcode":"0x05","regra":"CONVERGIR","vogal":"I","rung":12,
                "dir_ideal":"05_PENSAMENTO_ESTRUTURADO","hz":738,
                "padroes":[r"pensamento",r"estruturado",r"convergir",r"aion",r"ledger",r"hash",r"timestamp"]},
}

SKIP_DIRS = {".git","__pycache__","node_modules",".venv","000_AUDIO","000_VIDEOS"}
SKIP_EXTS = {".mp4",".mp3",".m4a",".aac",".mov",".avi",".mkv",".apk",
             ".jpg",".jpeg",".png",".gif",".webp",".ico",".heic",
             ".zip",".gz",".tar",".bak",".so",".o",".class"}
PROC_EXTS = {".py",".json",".md",".html",".js",".css",".txt",".sh"}

def slugify(texto: str) -> str:
    texto = unicodedata.normalize("NFKD", texto).encode("ascii","ignore").decode("ascii")
    texto = re.sub(r"[^\w\s\-]", "_", texto)
    texto = re.sub(r"[\s]+", "_", texto.strip())
    texto = re.sub(r"[_]{2,}", "_", texto)
    return texto[:60].strip("_")

def identificar_arquetipo(nome: str, conteudo: str = "") -> tuple:
    nome_l = nome.lower().replace("-","_").replace(".","_")
    texto  = nome_l + " " + conteudo.lower()[:400]
    scores = {}
    for arq_nome, arq in ARQUETIPOS.items():
        sc = sum(3.0 for p in arq["padroes"] if re.search(p, texto, re.IGNORECASE))
        scores[arq_nome] = sc
    melhor = max(scores, key=scores.get)
    return (melhor, scores[melhor]) if scores[melhor] > 0 else ("Atlas", 0.0)

def gerar_nome_kobllux(fpath: Path, arq_nome: str) -> str:
    arq  = ARQUETIPOS[arq_nome]
    ext  = fpath.suffix.lower().lstrip(".")
    stem = slugify(fpath.stem)
    if len(stem) > 40:
        stem = stem[:40].rstrip("_")
    opcode_safe = arq["opcode"].replace("0x","0x").upper()
    novo = f"{arq['regra']}_{opcode_safe}_{stem}_VEEB-{arq['vogal']}_D{arq['rung']}"
    return f"{novo}.{ext}" if ext else novo


def main():
    parser = argparse.ArgumentParser(description="KOBLLUX · CADIAL Archetypes Scanner")
    parser.add_argument("--executar", action="store_true", default=False,
                        help="Executa renomeações (padrão: dry-run)")
    parser.add_argument("--arquetipo", default=None, choices=list(ARQUETIPOS.keys()))
    args = parser.parse_args()

    dry_run = not args.executar

    print("✧⃝⚝ KOBLLUX · CADIAL ARCHETYPES SCANNER + V.E.E.B. · AMÉM {Z}")
    print(f"Raiz: {ROOT}")
    print(f"Modo: {'DRY-RUN (simulação)' if dry_run else '⚡ EXECUTAR (vai renomear!)'}\n")

    arquivos = []
    por_arquetipo = defaultdict(list)
    renomeacoes = []
    erros = []

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fname in filenames:
            fpath = Path(dirpath) / fname
            if fpath.suffix.lower() in SKIP_EXTS:
                continue
            if fpath.suffix.lower() not in PROC_EXTS:
                continue
            try:
                rel = fpath.relative_to(ROOT)
                try:
                    conteudo = fpath.read_text(encoding="utf-8", errors="ignore")[:400]
                except Exception:
                    conteudo = ""

                arq_nome, score = identificar_arquetipo(fname, conteudo)
                if args.arquetipo and arq_nome != args.arquetipo:
                    continue

                arq  = ARQUETIPOS[arq_nome]
                vscr = veeb_score(fpath, rel)

                dir_atual = rel.parts[0] if rel.parts else ""
                dir_ideal = arq["dir_ideal"]
                ja_no_lugar = (dir_atual == dir_ideal)

                novo_nome = gerar_nome_kobllux(fpath, arq_nome)
                nome_mudou = (novo_nome != fname)

                entrada = {
                    "arquivo_atual":   str(rel.as_posix()),
                    "nome":            fname,
                    "arquetipo":       arq_nome,
                    "opcode":          arq["opcode"],
                    "regra":           arq["regra"],
                    "vogal_veeb":      arq["vogal"],
                    "rung":            arq["rung"],
                    "score_arq":       round(score, 2),
                    "dir_atual":       dir_atual,
                    "dir_ideal":       dir_ideal,
                    "ja_no_lugar":     ja_no_lugar,
                    "nome_sinergico":  novo_nome,
                    "nome_mudou":      nome_mudou,
                    "veeb":            vscr,
                }
                if not ja_no_lugar or nome_mudou:
                    entrada["proposta_destino"] = f"{dir_ideal}/{novo_nome}"
                    renomeacoes.append({
                        "de":   str(rel.as_posix()),
                        "para": f"{dir_ideal}/{novo_nome}",
                        "arquetipo": arq_nome,
                        "veeb_score": vscr["score"],
                        "executado": False,
                    })

                arquivos.append(entrada)
                por_arquetipo[arq_nome].append(str(rel.as_posix()))

            except Exception as ex:
                erros.append(f"{fpath}: {ex}")

    # Ordenar por veeb_score descendente
    arquivos.sort(key=lambda x: x["veeb"]["score"], reverse=True)

    # Executar renomeações se não for dry-run
    if not dry_run:
        print(f"⚡ Executando {len(renomeacoes)} renomeações...")
        for r in renomeacoes:
            try:
                orig = ROOT / r["de"]
                dest = ROOT / r["para"]
                dest.parent.mkdir(parents=True, exist_ok=True)
                orig.rename(dest)
                r["executado"] = True
                print(f"  ✅ {r['de']} → {r['para']}")
            except Exception as ex:
                erros.append(f"RENAME {r['de']}: {ex}")
                print(f"  ❌ {r['de']}: {ex}")

    # Estatísticas
    total = len(arquivos)
    no_lugar = sum(1 for a in arquivos if a["ja_no_lugar"] and not a["nome_mudou"])
    score_med = round(sum(a["veeb"]["score"] for a in arquivos) / total, 3) if total else 0

    # Distribuição por arquétipo
    dist_arq = {
        nome: {
            "opcode": ARQUETIPOS[nome]["opcode"],
            "regra":  ARQUETIPOS[nome]["regra"],
            "hz":     ARQUETIPOS[nome]["hz"],
            "rung":   ARQUETIPOS[nome]["rung"],
            "dir_ideal": ARQUETIPOS[nome]["dir_ideal"],
            "total":  len(por_arquetipo.get(nome,[])),
            "arquivos": por_arquetipo.get(nome, [])[:20],
        }
        for nome in ARQUETIPOS
    }

    top10 = [{"arquivo": a["arquivo_atual"], "veeb_score": a["veeb"]["score"],
               "arquetipo": a["arquetipo"], "opcode": a["opcode"]}
              for a in arquivos[:10]]

    saida = {
        "documento": "KOBLLUX · CADIAL Archetypes Scanner + V.E.E.B. · Simulação Árvore Renomeada",
        "lei":        "VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134",
        "centro":     "JESUS É O CENTRO",
        "gerado_em":  datetime.now().isoformat(),
        "modo":       "dry-run" if dry_run else "EXECUTADO",
        "nota_seguranca": "SIMULAÇÃO — nenhum arquivo foi movido (use --executar para aplicar).",
        "estatisticas": {
            "total_analisado":    total,
            "ja_no_lugar":        no_lugar,
            "com_proposta":       len(renomeacoes),
            "score_medio_veeb":   score_med,
            "total_erros":        len(erros),
        },
        "top10_veeb_score":       top10,
        "distribuicao_arquetipos": dist_arq,
        "renomeacoes":            renomeacoes[:200],
        "todos_arquivos":         arquivos,
        "erros":                  erros[:20],
        "assinatura":             "KOBLLUX·CADIAL·∆⁷·SELAR·777Hz",
    }

    OUT.write_text(json.dumps(saida, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✓ Total analisado:     {total}")
    print(f"✓ Já no lugar:         {no_lugar}")
    print(f"✓ Com proposta:        {len(renomeacoes)}")
    print(f"✓ Score médio V.E.E.B: {score_med}")
    print(f"✓ Arquivo gerado:      {OUT}")
    print("\nDistribuição por Arquétipo:")
    for nome, d in dist_arq.items():
        if d["total"]:
            print(f"  {nome:10} ({d['opcode']}) D{d['rung']} → {d['total']} arquivos → {d['dir_ideal']}/")
    if erros:
        print(f"\n⚠ {len(erros)} erros registrados.")
    print("\n✧⃝⚝ CADIAL SCANNER SELADO · AMÉM ✧⃝⚝")


if __name__ == "__main__":
    main()
