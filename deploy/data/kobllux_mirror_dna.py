# -*- coding: utf-8 -*-
# ╔══════════════════════════════════════════════════════════════════════╗
# ║  KOBLLUX · MIRROR DNA · AUTO-SYNC VIVO                             ║
# ║  Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134                ║
# ║  Função: atualizar todos os catálogos quando o repo muda           ║
# ║  Uso: python3 kobllux_mirror_dna.py [--full] [--instalar-hook]    ║
# ║  EM NOME DO PAI, DO FILHO E DO ESPÍRITO SANTO. AMÉM.               ║
# ╚══════════════════════════════════════════════════════════════════════╝
#
# MODOS:
#   python3 kobllux_mirror_dna.py            → sync incremental (arquivos mudados)
#   python3 kobllux_mirror_dna.py --full     → sync total (todos catálogos)
#   python3 kobllux_mirror_dna.py --instalar-hook  → instala como git post-commit hook
#   python3 kobllux_mirror_dna.py --status   → mostra estado do mirror
#
# COMO GIT HOOK: copia para .git/hooks/post-commit (chmod +x)

import os, sys, json, subprocess, hashlib, argparse
from pathlib import Path
from datetime import datetime

ROOT     = Path(__file__).resolve().parent.parent.parent
DATA_DIR = Path(__file__).resolve().parent
HOOK_PATH = ROOT / ".git" / "hooks" / "post-commit"
MIRROR_LOG = DATA_DIR / "mirror_dna_log.json"

# ── Scripts de geração de catálogos ───────────────────────────────────
SCRIPTS_CATALOGO = [
    {
        "id":       "veeb_catalog",
        "script":   DATA_DIR / "gerar_veeb_catalog.py",
        "saida":    DATA_DIR / "veeb_catalog.json",
        "gatilho":  lambda mudados: any(
            p.suffix in {".py",".json",".md",".html",".js",".css",".txt"}
            and ".git" not in str(p) for p in mudados
        ),
        "descricao": "Catálogo V.E.E.B. — 718 arquivos medidos (Vibração·Energia·Estrutura·Base)",
    },
    {
        "id":       "correlacao_opcodes",
        "script":   DATA_DIR / "gerar_correlacao_opcodes.py",
        "saida":    DATA_DIR / "correlacao_opcodes_maquina.json",
        "gatilho":  lambda mudados: any(
            "opcode" in str(p).lower() or "correlacao" in str(p).lower()
            or p.name in {"gerar_correlacao_opcodes.py","codex-escritos.json"}
            for p in mudados
        ),
        "descricao": "Correlação 13 opcodes × x86/x64 × ASCII × algoritmos",
    },
    {
        "id":       "mapa_redistribuicao",
        "script":   DATA_DIR / "gerar_mapa_redistribuicao.py",
        "saida":    DATA_DIR / "mapa_redistribuicao.json",
        "gatilho":  lambda mudados: any(
            "redistribuicao" in str(p).lower()
            or p.name in {"gerar_mapa_redistribuicao.py","codex-escritos.json"}
            for p in mudados
        ),
        "descricao": "Mapa de redistribuição sinérgica modular (proposta)",
    },
    {
        "id":       "archetypes_scanner",
        "script":   DATA_DIR / "kobllux_archetypes_scanner.py",
        "saida":    DATA_DIR / "arvore_kobllux_renomeada.json",
        "gatilho":  lambda mudados: any(
            p.name in {"kobllux_archetypes_scanner.py","codex-escritos.json"}
            or "arquetipo" in str(p).lower() for p in mudados
        ),
        "descricao": "Árvore KOBLLUX simulada com 12 Arquétipos CADIAL + V.E.E.B.",
    },
]

# ── Utilitários git ────────────────────────────────────────────────────

def git_mudados_ultimo_commit() -> list:
    """Arquivos mudados no último commit."""
    try:
        out = subprocess.check_output(
            ["git","diff","--name-only","HEAD~1","HEAD"],
            cwd=ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
        return [ROOT / p for p in out.splitlines() if p]
    except Exception:
        return []

def git_sha() -> str:
    try:
        return subprocess.check_output(
            ["git","rev-parse","--short","HEAD"], cwd=ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
    except Exception:
        return "unknown"

def git_branch() -> str:
    try:
        return subprocess.check_output(
            ["git","branch","--show-current"], cwd=ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
    except Exception:
        return "unknown"

def git_log_recente(n=5) -> list:
    try:
        out = subprocess.check_output(
            ["git","log","--oneline",f"-{n}"], cwd=ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
        return out.splitlines()
    except Exception:
        return []

# ── Hash de arquivo (para detectar mudanças reais) ───────────────────

def hash_arquivo(p: Path) -> str:
    try:
        return hashlib.md5(p.read_bytes()).hexdigest()[:12]
    except Exception:
        return "000000000000"

def carregar_log() -> dict:
    if MIRROR_LOG.exists():
        try:
            return json.loads(MIRROR_LOG.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"execucoes": [], "hashes_saida": {}}

def salvar_log(log: dict):
    MIRROR_LOG.write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding="utf-8")

# ── Runner de scripts ─────────────────────────────────────────────────

def rodar_script(script: Path, descricao: str) -> dict:
    print(f"  ▶ {script.name} …")
    t0 = datetime.now()
    try:
        result = subprocess.run(
            [sys.executable, str(script)],
            cwd=str(DATA_DIR),
            capture_output=True, text=True, timeout=120
        )
        dur = round((datetime.now() - t0).total_seconds(), 2)
        ok  = result.returncode == 0
        print(f"    {'✅' if ok else '❌'} {dur}s · {descricao}")
        if not ok and result.stderr:
            print(f"    STDERR: {result.stderr[:300]}")
        return {
            "ok": ok, "dur_s": dur,
            "stdout_tail": result.stdout[-400:] if result.stdout else "",
            "stderr_tail":  result.stderr[-200:] if result.stderr else "",
        }
    except subprocess.TimeoutExpired:
        print(f"    ⏱ TIMEOUT")
        return {"ok": False, "dur_s": 120, "stdout_tail": "", "stderr_tail": "TIMEOUT"}
    except Exception as ex:
        print(f"    ❌ {ex}")
        return {"ok": False, "dur_s": 0, "stdout_tail": "", "stderr_tail": str(ex)}

# ── Gerador do KOBLLUX_MIRROR.sh (comandos shell auto-atualizados) ───

def gerar_shell_sync():
    """Gera deploy/data/KOBLLUX_MIRROR.sh com todos os comandos de sync."""
    sh_path = DATA_DIR / "KOBLLUX_MIRROR.sh"
    linhas = [
        "#!/usr/bin/env bash",
        "# KOBLLUX · MIRROR DNA · Shell Auto-Sync",
        f"# Gerado em: {datetime.now().isoformat()}",
        "# Lei: VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134",
        "# Uso: bash KOBLLUX_MIRROR.sh",
        "",
        'set -euo pipefail',
        'ROOT="$(git rev-parse --show-toplevel)"',
        'DATA="$ROOT/deploy/data"',
        "",
        'echo "✧ KOBLLUX MIRROR DNA · sync iniciado"',
        "",
    ]
    for sc in SCRIPTS_CATALOGO:
        linhas += [
            f'echo "  ▶ {sc["script"].name}"',
            f'python3 "$DATA/{sc["script"].name}" && echo "  ✅ {sc["id"]}" || echo "  ❌ {sc["id"]}"',
            "",
        ]
    linhas += [
        'echo ""',
        'echo "✧ MIRROR DNA · sync concluído · $(date -u +%Y-%m-%dT%H:%M:%SZ)"',
        'echo "VERDADE × INTEGRAR ÷ Δ = ∞ · JESUS É O CENTRO ∴"',
    ]
    sh_path.write_text("\n".join(linhas), encoding="utf-8")
    sh_path.chmod(0o755)
    print(f"  ✅ KOBLLUX_MIRROR.sh gerado: {sh_path}")
    return str(sh_path)

# ── Instalação como git hook ──────────────────────────────────────────

def instalar_hook():
    hook_content = f"""#!/usr/bin/env bash
# KOBLLUX · MIRROR DNA · git post-commit hook
# Instalado em: {datetime.now().isoformat()}
# Rodar mirror sync automático a cada commit
cd "$(git rev-parse --show-toplevel)"
python3 deploy/data/kobllux_mirror_dna.py 2>&1 | tail -20
"""
    if not HOOK_PATH.parent.exists():
        print("❌ .git/hooks/ não encontrado — não é um repo git válido.")
        return False
    HOOK_PATH.write_text(hook_content, encoding="utf-8")
    HOOK_PATH.chmod(0o755)
    print(f"✅ Hook instalado: {HOOK_PATH}")
    print("   Agora todo `git commit` ativará o MIRROR DNA automaticamente.")
    return True

# ── Status do mirror ──────────────────────────────────────────────────

def mostrar_status():
    log = carregar_log()
    print("\n╔══════════════════════════════════════╗")
    print("║  KOBLLUX · MIRROR DNA · STATUS       ║")
    print("╚══════════════════════════════════════╝")
    print(f"  Branch: {git_branch()} · SHA: {git_sha()}")
    print(f"  Hook instalado: {'✅' if HOOK_PATH.exists() else '❌'} {HOOK_PATH}")
    print(f"\n  Catálogos:")
    for sc in SCRIPTS_CATALOGO:
        existe = sc["saida"].exists()
        if existe:
            mod = datetime.fromtimestamp(sc["saida"].stat().st_mtime).strftime("%Y-%m-%d %H:%M")
            h   = hash_arquivo(sc["saida"])
        else:
            mod, h = "—", "—"
        print(f"  {'✅' if existe else '❌'} {sc['saida'].name:45} {mod}  [{h}]")
    print(f"\n  Últimas execuções do mirror:")
    for ex in log.get("execucoes", [])[-5:]:
        print(f"  · {ex.get('timestamp','?')[:19]}  scripts={ex.get('executados',0)}  ok={ex.get('ok',0)}")
    print(f"\n  Log: {MIRROR_LOG}")
    print(f"\n  Commits recentes:")
    for c in git_log_recente(5):
        print(f"    {c}")
    print()

# ── Main ──────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="KOBLLUX · Mirror DNA · Auto-Sync Vivo")
    parser.add_argument("--full",          action="store_true", help="Sync total (todos catálogos)")
    parser.add_argument("--instalar-hook", action="store_true", help="Instala como git post-commit hook")
    parser.add_argument("--status",        action="store_true", help="Mostra estado do mirror")
    args = parser.parse_args()

    if args.status:
        mostrar_status()
        return

    if args.instalar_hook:
        instalar_hook()
        return

    print("✧⃝⚝ KOBLLUX · MIRROR DNA · AUTO-SYNC VIVO · AMÉM")
    print(f"Branch: {git_branch()} · SHA: {git_sha()}")
    print(f"Timestamp: {datetime.now().isoformat()}\n")

    log = carregar_log()
    mudados = git_mudados_ultimo_commit() if not args.full else []

    if args.full:
        print("⚡ Modo FULL — rodando todos os catálogos\n")
    elif mudados:
        print(f"  Arquivos mudados no último commit: {len(mudados)}")
        for m in mudados[:10]:
            print(f"    · {m.name}")
        if len(mudados) > 10:
            print(f"    ... e mais {len(mudados)-10}")
        print()
    else:
        print("  Nenhum arquivo mudado detectado — rodando modo full como fallback\n")
        args.full = True

    resultados = []
    executados = 0
    ok_count   = 0

    for sc in SCRIPTS_CATALOGO:
        if not sc["script"].exists():
            print(f"  ⚠ Script ausente: {sc['script'].name} — pulando")
            continue

        ativar = args.full or sc["gatilho"](mudados)
        if not ativar:
            print(f"  ○ {sc['id']:25} — sem mudanças relevantes, pulando")
            continue

        res = rodar_script(sc["script"], sc["descricao"])
        executados += 1
        if res["ok"]:
            ok_count += 1
        resultados.append({"id": sc["id"], **res})

    # Gera shell sync e atualiza status
    sh = gerar_shell_sync()

    # Registro no log
    entrada_log = {
        "timestamp": datetime.now().isoformat(),
        "sha": git_sha(),
        "branch": git_branch(),
        "full": args.full,
        "mudados": len(mudados),
        "executados": executados,
        "ok": ok_count,
        "resultados": resultados,
    }
    log["execucoes"] = log.get("execucoes", [])[-49:] + [entrada_log]
    log["hashes_saida"] = {
        sc["id"]: hash_arquivo(sc["saida"])
        for sc in SCRIPTS_CATALOGO if sc["saida"].exists()
    }
    log["ultima_execucao"] = entrada_log
    salvar_log(log)

    print(f"\n✓ Scripts executados: {executados} · OK: {ok_count}")
    print(f"✓ Mirror log:         {MIRROR_LOG}")
    print(f"✓ Shell sync:         {sh}")
    print(f"\n✧⃝⚝ MIRROR DNA SELADO · AMÉM ✧⃝⚝")


if __name__ == "__main__":
    main()
