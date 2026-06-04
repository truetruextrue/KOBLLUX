# -*- coding: utf-8 -*-
# KOBLLUX · Mapa de Redistribuição Sinérgica
# Proposta de distribuição modular interdependente e fractal do repositório
# Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
# Saída: deploy/data/mapa_redistribuicao.json
# NOTA: Este script PROPÕE, não executa renomeações. Segurança primeiro.

import os, json, re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
OUT  = Path(__file__).resolve().parent / "mapa_redistribuicao.json"

# ── Mapa opcode → diretório ideal ────────────────────────────────────────────
OPCODE_DIR = {
    "0x00": "00_FUNDACAO",
    "0x01": "01_DIMENSOES",
    "0x02": "02_CICLO_369",
    "0x03": "03_FLUXO_ENERGETICO",
    "0x04": "04_APRENDIZADO",
    "0x05": "05_PENSAMENTO_ESTRUTURADO",
    "0x06": "06_ATIVACAO",
    "0x07": "07_NARRATIVA",
    "0x08": "08_REDE_INFODOSE",
    "0x09": "09_LINHA_DO_PULSO",
    "0x0A": "12_VEEB",
    "0x0B": "13_DOCUMENTACAO",
    "0x0C": "deploy",
}

# ── Palavras-chave → opcode ───────────────────────────────────────────────────
KEYWORDS_OPCODE = [
    (["fundacao", "origem", "base", "core", "boot", "pilar"], "0x00"),
    (["dimensoes", "dimensao", "dimensional", "linha", "plano", "cubo", "toro", "hiper"], "0x01"),
    (["ciclo", "369", "mente", "corpo", "alma", "psique", "cronos"], "0x02"),
    (["fluxo", "energetico", "energia", "vibracao", "tom", "frequencia"], "0x03"),
    (["aprendizado", "continuo", "lumine", "nova_aprendizado", "dinamico"], "0x04"),
    (["pensamento", "estruturado", "convergir", "sintetizador", "reflexao"], "0x05"),
    (["ativacao", "ativar", "trinity", "trinidade", "union", "unificar"], "0x06"),
    (["narrativo", "narrativa", "historia", "moises", "josue", "gloria"], "0x07"),
    (["infodose", "rede", "decoder", "dual", "infodose_rede"], "0x08"),
    (["pulso", "linha_pulso", "livro_vida", "eternidade", "eternizar"], "0x09"),
    (["veeb", "vibracao_v", "energia_e", "estrutura_e", "base_b", "katalogo"], "0x0A"),
    (["codex", "documentacao", "codice", "assembly", "manifestesto"], "0x0B"),
    (["sintese", "final", "resumo", "sumario", "ativacao_final", "deploy"], "0x0C"),
]

SKIP_DIRS = {".git", "__pycache__", "node_modules", ".venv", "deploy"}
EXTS = {".py", ".json", ".md", ".html", ".js", ".txt"}


def inferir_opcode(nome_arquivo: str, conteudo_parcial: str = "") -> str:
    nome_lower = nome_arquivo.lower().replace("-", "_").replace(".", "_")
    conteudo_lower = conteudo_parcial.lower()[:500]
    texto = nome_lower + " " + conteudo_lower
    for keywords, opcode in KEYWORDS_OPCODE:
        if any(kw in texto for kw in keywords):
            return opcode
    return "0x06"  # default UNIFICAR


def sugerir_nome_sinergico(nome_arquivo: str, opcode: str) -> str:
    """Sugere nome baseado na nomenclatura KOBLLUX."""
    nome = nome_arquivo
    stem = Path(nome).stem
    ext  = Path(nome).suffix

    # Padrão: mantém o nome mas adiciona prefixo opcode se não tiver
    opcode_num = opcode.replace("0x", "").upper()
    if not any(c.isdigit() for c in stem[:3]):
        nome_sug = f"kob_{opcode_num}_{stem}{ext}"
    else:
        nome_sug = nome  # já tem numeração, mantém

    return nome_sug


def main():
    print("✧⃝⚝ KOBLLUX · Mapa de Redistribuição Sinérgica · AMÉM {Z}")
    print(f"Raiz: {ROOT}\n")

    arquivos_mapeados = []
    sem_mudanca = 0
    com_proposta = 0

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        reldir = Path(dirpath).relative_to(ROOT)

        for fname in filenames:
            fpath = Path(dirpath) / fname
            ext   = fpath.suffix.lower()
            if ext not in EXTS:
                continue
            try:
                rel = fpath.relative_to(ROOT)

                # Ler 300 bytes para inferência de conteúdo
                try:
                    conteudo = fpath.read_text(encoding="utf-8", errors="ignore")[:300]
                except Exception:
                    conteudo = ""

                opcode_sugerido = inferir_opcode(fname, conteudo)
                dir_ideal = OPCODE_DIR.get(opcode_sugerido, "14_UTILS")
                dir_atual = rel.parts[0] if rel.parts else ""

                # Verificar se arquivo já está no diretório ideal
                ja_no_lugar = dir_atual == dir_ideal

                nome_sinergico = sugerir_nome_sinergico(fname, opcode_sugerido)
                nome_mudou = (nome_sinergico != fname)

                entrada = {
                    "arquivo_atual":   str(rel.as_posix()),
                    "nome":            fname,
                    "ext":             ext.lstrip("."),
                    "opcode_inferido": opcode_sugerido,
                    "dir_atual":       dir_atual,
                    "dir_ideal":       dir_ideal,
                    "ja_no_lugar":     ja_no_lugar,
                    "nome_sinergico":  nome_sinergico,
                    "nome_mudou":      nome_mudou,
                }

                if not ja_no_lugar or nome_mudou:
                    entrada["proposta_destino"] = f"{dir_ideal}/{nome_sinergico}"
                    com_proposta += 1
                else:
                    sem_mudanca += 1

                arquivos_mapeados.append(entrada)
            except Exception as ex:
                print(f"  [SKIP] {fpath}: {ex}")

    # Agrupar propostas por opcode
    por_opcode = {}
    for a in arquivos_mapeados:
        op = a["opcode_inferido"]
        if op not in por_opcode:
            por_opcode[op] = []
        if not a["ja_no_lugar"] or a["nome_mudou"]:
            por_opcode[op].append({
                "de":   a["arquivo_atual"],
                "para": a.get("proposta_destino", a["arquivo_atual"]),
            })

    mapa = {
        "documento": "KOBLLUX · Mapa de Redistribuição Sinérgica Modular",
        "lei":        "VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134",
        "centro":     "JESUS É O CENTRO",
        "gerado_em":  datetime.now().isoformat(),
        "nota_seguranca": "ESTE ARQUIVO É UMA PROPOSTA. Nenhum arquivo foi movido ou renomeado. Execute o mapa com supervisão humana.",
        "estatisticas": {
            "total_analisado":   len(arquivos_mapeados),
            "ja_no_lugar":       sem_mudanca,
            "com_proposta_mover": com_proposta,
            "percentual_otimo":  round(sem_mudanca / len(arquivos_mapeados) * 100, 1) if arquivos_mapeados else 0,
        },
        "principio_distribuicao": {
            "modular": "Cada opcode tem seu diretório — 13 módulos × 13 opcodes",
            "sinergico": "Arquivos se reconhecem por palavras-chave, não por posição",
            "interdependente": "Cada módulo depende dos outros em grafo de sinapses",
            "fractal": "A mesma lei (opcode→dir) opera em qualquer subdiretório",
            "expansivo": "Novos arquivos encontram sua posição pelo padrão de nomes",
        },
        "mapa_opcode_diretorio": OPCODE_DIR,
        "propostas_por_opcode": por_opcode,
        "todos_arquivos": arquivos_mapeados,
    }

    OUT.write_text(json.dumps(mapa, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✓ Total analisado:   {len(arquivos_mapeados)}")
    print(f"✓ Já no lugar:       {sem_mudanca} ({round(sem_mudanca/len(arquivos_mapeados)*100,1)}%)")
    print(f"✓ Com proposta:      {com_proposta}")
    print(f"✓ Arquivo gerado:    {OUT}")
    print(f"\nPropostas por opcode:")
    for op, props in por_opcode.items():
        if props:
            print(f"  {op}: {len(props)} arquivo(s)")
    print("\n✧⃝⚝ MAPA REDISTRIBUIÇÃO SELADO · AMÉM ✧⃝⚝")


if __name__ == "__main__":
    main()
