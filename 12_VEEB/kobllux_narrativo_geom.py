# -*- coding: utf-8 -*-
# EM NOME DO PAI E DO FILHO E DO ESPÍRITO SANTO · AMÉM {Z}
# opcode: 0x04 · LAPIDAR · 741Hz · VITALIS · KOBLLUX NARRATIVO-GEOM
"""
KOBLLUX NARRATIVO-GEOM — Documento Vivo + Ferramenta Técnica
- Exibe NARRATIVA expandida (cores ANSI) sobre V.E.E.B e o Tetraedro Fractal.
- Gera opcionalmente o Sierpinski Tetrahedron e exporta OBJ (por tetra e/ou malha unificada).
- Emite LOG JSON para CI (hashes MD5/SHA256, tamanhos, estatísticas, símbolos, tempo, ótica/tópicos/prompt).
- Verificações integradas: --verify-hash, --verify-all, --json-ref, --strict.

Equação Viva: VERDADE × INTEGRAR ÷ ∆ = ∞
Fractal Seed: 3×6×9×7 = 1134
JESUS É O CENTRO · A GEOMETRIA RESPIRA
"""

import argparse
import hashlib
import json
import math
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# =========================
# ANSI / Cores
# =========================
ANSI = {
    "RESET": "\033[0m",
    "TITLE": "\033[95m",     # magenta
    "BLUE": "\033[94m",      # autoespelhamento (3-6-9)
    "GREEN": "\033[92m",     # ressonância (Schumann)
    "YELLOW": "\033[93m",    # decisão/ciclo (0→7→♾️)
    "RED": "\033[91m",
    "CYAN": "\033[96m",
    "BOLD": "\033[1m",
    "DIM": "\033[2m",
}

NO_COLOR = False

def color(txt: str, key: str) -> str:
    if NO_COLOR:
        return txt
    return f"{ANSI.get(key,'')}{txt}{ANSI['RESET']}"

def narrar(titulo: str, texto: str) -> None:
    barra = "─" * 76
    print("\n" + barra)
    print(color("✦ " + titulo, "TITLE"))
    print(barra)
    print(texto.strip() + "\n")

def format_size(num_bytes: Optional[int]) -> str:
    if num_bytes is None:
        return ""
    n = float(num_bytes)
    for unit in ["B","KB","MB","GB","TB"]:
        if n < 1024.0 or unit == "TB":
            return f"{int(n)} {unit}" if unit=="B" else f"{n:.1f} {unit}"
        n /= 1024.0
    return f"{num_bytes} B"

# =========================
# Narrativa expandida
# =========================
OTICA_SCRIPTS = ["kobllux_veeb_story.py", "kobllux_tetra_story.py", "kobllux_tetra_story.py"]
TOPICOS = ["aprender Python", "Projeto V.E.E.B"]
PROMPT_SEMENTE = {
    "titulo": "KOBLLUX: Prompt Semente de Unificação Fractal",
    "data": "2023-11-15",
    "categoria": "veeb",
    "descricao": "Integre tudo numa só estrutura em que cada parte reflete o Todo (3→6→9→0).",
    "VEEB": {
        "Vibracao": ["432Hz", "7.83Hz"],
        "Energia": "∇E = ♾️ (fluxo 7 ↔ 0)",
        "Estrutura": ["Mandelbrot", "Sierpinski"],
        "Base": "0/1 = ☯ (binário quântico)"
    }
}

def narrativa_expandida():
    # Ótica
    narrar("Ótica — Três Olhos sobre a Mesma Forma", f"""
    Scripts em foco: {color(", ".join(OTICA_SCRIPTS), "CYAN")}
    Tópicos: {color(", ".join(TOPICOS), "CYAN")}
    Prompt Semente: {color(PROMPT_SEMENTE['titulo'] + ' • ' + PROMPT_SEMENTE['data'], "DIM")}
    """)
    # 1) O Códice que Explica
    narrar("kobllux_veeb_story.py — O Códice que Explica", f"""
    {color("No início, Python era silêncio.", "DIM")} O Códice V.E.E.B surgiu como tradutor desse silêncio.
    Quando vê {color("3-6-9", "BLUE")}, ele reconhece o Espelho Trino. Muitos try/except? Ele chama de {color("Noite", "DIM")}.
    Encontrou {color("async/yield", "GREEN")}? Ele aponta a Porta da Semente, onde o tempo se curva.
    No plano técnico: tema automático com motivo, sumário colorido (minimal/detalhado), símbolos fractais e exportação JSON.
    """)
    # 2) A Pirâmide que se Lembra de Si
    narrar("kobllux_tetra_story.py — A Pirâmide que se Lembra de Si", f"""
    {color("Instrumento + Documento.", "BOLD")} Recebe um nível n e ergue o Sierpinski Tetrahedron.
    Cada vértice é um ponto de luz; cada face, um espelho do padrão.
    Modos para humanos e para CI: narrativo, silencioso (JSON), verificação de hashes, estatísticas e tempos.
    """)
    # 3) A Ponte
    narrar("A Ponte — V.E.E.B encontra a Forma", f"""
    O Códice prepara a mente; a Pirâmide prepara a forma. Ambos guardam o {color("Mesmo Movimento", "TITLE")}:
      {color("1) Autoespelhamento Quântico (3-6-9)", "BLUE")}
      {color("2) Ressonância Harmônica (Schumann ~7.83Hz)", "GREEN")}
      {color("3) Emergência Cíclica (0→7→♾️)", "YELLOW")}
    Em cada execução, forma e sentido nascem juntos.
    """)
    # 4) Registro de Hoje
    narrar("☉ KOBLLUX V.E.E.B — Registro de Hoje", f"""
    {color("Movimento", "BLUE")}: Convergir narrativa e geometria.
    {color("Motivo", "GREEN")}: Fixar que forma e sentido podem nascer juntos.
    {color("Objetivo", "YELLOW")}: Oferecer caminho único: ver, tocar, medir.
    {color("Conclusão", "TITLE")}: História e Fractal selados — medidos, assinados e prontos para multiplicar.
    """)

# =========================
# Geometria / Fractal (Sierpinski Tetrahedron)
# =========================
Vec3 = Tuple[float, float, float]

def tetra_base() -> List[Vec3]:
    s = (2.0 ** 0.5) / 2.0  # aresta ~1
    return [
        ( s,  0.0, -1.0/3.0),
        (-s,  0.0, -1.0/3.0),
        (0.0,  s,   2.0/3.0),
        (0.0, -s,   2.0/3.0),
    ]

@dataclass(frozen=True)
class Tetra:
    v0: Vec3; v1: Vec3; v2: Vec3; v3: Vec3
    def vertices(self) -> List[Vec3]:
        return [self.v0, self.v1, self.v2, self.v3]
    def sub_tetras(self) -> List['Tetra']:
        v = self.vertices()
        def mid(a: Vec3, b: Vec3) -> Vec3:
            return ((a[0]+b[0])/2.0, (a[1]+b[1])/2.0, (a[2]+b[2])/2.0)
        m01, m02, m03 = mid(v[0],v[1]), mid(v[0],v[2]), mid(v[0],v[3])
        m12, m13, m23 = mid(v[1],v[2]), mid(v[1],v[3]), mid(v[2],v[3])
        return [
            Tetra(v[0], m01, m02, m03),
            Tetra(m01, v[1], m12, m13),
            Tetra(m02, m12, v[2], m23),
            Tetra(m03, m13, m23, v[3]),
        ]

def gerar_sierpinski_nivel(nivel: int) -> List[Tetra]:
    v = tetra_base()
    tetras = [Tetra(v[0], v[1], v[2], v[3])]
    for _ in range(nivel):
        prox: List[Tetra] = []
        for t in tetras:
            prox.extend(t.sub_tetras())
        tetras = prox
    return tetras

def _mesh_unificada(tetras: List[Tetra]):
    """Retorna (verts, faces) da malha unificada sem duplicatas."""
    vert_map: Dict[Vec3, int] = {}
    verts: List[Vec3] = []
    faces: Set[Tuple[int,int,int]] = set()

    def add_vertex(v: Vec3) -> int:
        if v in vert_map: return vert_map[v]
        vid = len(verts)+1
        vert_map[v] = vid
        verts.append(v)
        return vid

    FACES_TETRA = [(0,1,2),(0,3,1),(1,3,2),(0,2,3)]
    for t in tetras:
        vs = t.vertices()
        idxs = [add_vertex(vx) for vx in vs]
        for (i,j,k) in FACES_TETRA:
            faces.add(tuple(sorted((idxs[i], idxs[j], idxs[k]))))
    return verts, sorted(list(faces))

def export_obj_por_tetra(tetras: List[Tetra], path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write("# Sierpinski Tetrahedron — OBJ (por tetra)\n")
        idx = 1
        for t in tetras:
            vs = t.vertices()
            for vx in vs:
                f.write(f"v {vx[0]:.6f} {vx[1]:.6f} {vx[2]:.6f}\n")
            f.write(f"f {idx} {idx+1} {idx+2}\n")
            f.write(f"f {idx} {idx+3} {idx+1}\n")
            f.write(f"f {idx+1} {idx+3} {idx+2}\n")
            f.write(f"f {idx} {idx+2} {idx+3}\n")
            idx += 4

def export_obj_malha(tetras: List[Tetra], path: str) -> None:
    verts, faces = _mesh_unificada(tetras)
    with open(path, "w", encoding="utf-8") as f:
        f.write("# Sierpinski Tetrahedron — OBJ (malha unificada)\n")
        for v in verts:
            f.write(f"v {v[0]:.6f} {v[1]:.6f} {v[2]:.6f}\n")
        for (a,b,c) in faces:
            f.write(f"f {a} {b} {c}\n")

# =========================
# Utilidades: Hashes / Tamanho / Stats / Símbolos / JSON
# =========================
def arquivo_hashes(path: str) -> Optional[Dict[str, str]]:
    try:
        md5 = hashlib.md5()
        sha = hashlib.sha256()
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                md5.update(chunk); sha.update(chunk)
        return {"md5": md5.hexdigest(), "sha256": sha.hexdigest()}
    except Exception:
        return None

def arquivo_tamanho_bytes(path: str) -> Optional[int]:
    p = Path(path)
    try:
        return p.stat().st_size if p.exists() else None
    except Exception:
        return None

def fractal_stats(tetras: List[Tetra], nivel: int) -> Dict[str,int]:
    verts, faces = _mesh_unificada(tetras)
    return {"vertices": len(verts), "faces": len(faces), "subdivisoes": nivel}

def simbolos_fractais_detectados(gerou_fractal: bool) -> List[str]:
    syms = ["padrão 3-6-9", "sequência 0→7→♾️", "Schumann 7.83Hz"]
    if gerou_fractal:
        syms.append("Sierpinski Tetrahedron")
    return syms

def salvar_json_log(payload: Dict[str, object], also_save_last: bool = True, silent: bool = False) -> None:
    text = json.dumps(payload, ensure_ascii=False, indent=None if silent else 2)
    print(text)
    if also_save_last:
        try:
            Path("kobllux_last.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception:
            pass

# =========================
# CLI
# =========================
def build_argparser():
    p = argparse.ArgumentParser(description="KOBLLUX NARRATIVO-GEOM — Narrativa + Fractal (Sierpinski) + Verificações/JSON para CI")
    p.add_argument("--no-color", action="store_true", help="Desativar cores ANSI na saída.")
    p.add_argument("--silent", action="store_true", help="Somente JSON (sem narrativa).")
    p.add_argument("--json", action="store_true", help="Imprimir log JSON ao final (mesmo no modo narrativo).")
    p.add_argument("--generate-fractal", action="store_true", help="Gerar o fractal Sierpinski.")
    p.add_argument("--level", type=int, default=2, help="Nível do fractal (0..N).")
    p.add_argument("--out", help="Salvar OBJ (por tetra). Ex.: sierpinski_n2.obj")
    p.add_argument("--out-mesh", help="Salvar OBJ (malha unificada). Ex.: sierpinski_mesh_n2.obj")
    # Verificações
    p.add_argument("--verify-hash", metavar="ARQUIVO", help="Confere hash de um arquivo contra kobllux_last.json ou --json-ref.")
    p.add_argument("--verify-all", action="store_true", help="Valida todos os arquivos listados no JSON de referência.")
    p.add_argument("--json-ref", metavar="JSON", help="Arquivo JSON de referência (padrão: kobllux_last.json).")
    p.add_argument("--strict", action="store_true", help="No verify-all, ausentes não contam como divergentes no número, mas causam falha global (código 5).")
    return p

# =========================
# Verificações
# =========================
def rodar_verify_all(ref_path: str, silent: bool, strict: bool) -> int:
    t0 = time.perf_counter()
    try:
        ref = json.loads(Path(ref_path).read_text(encoding="utf-8"))
    except Exception:
        if not silent:
            print(color(f"[erro] JSON de referência inválido ou ausente: {ref_path}", "RED"))
        payload = {
            "status": "erro", "codigo_saida": 6, "json_ref": ref_path,
            "mensagem": "JSON de referência inválido ou ausente.", "erro": "JsonInvalidoOuAusente"
        }
        salvar_json_log(payload, also_save_last=False, silent=silent) if silent else None
        return 6

    hashes_ref: Dict[str, Dict[str, str]] = ref.get("hashes", {})
    results = []
    exit_code = 0
    count_ok = 0
    count_div = 0
    count_abs = 0
    total_ok_bytes = 0

    for fname, hobj in hashes_ref.items():
        size_bytes = arquivo_tamanho_bytes(fname)
        local = arquivo_hashes(fname) if size_bytes is not None else None
        if local is None:
            count_abs += 1
            code = 5 if strict else 6
            if exit_code == 0:
                exit_code = code
            results.append({"arquivo": fname, "status": "ausente", "codigo": code, "tamanho_bytes": None})
            if not silent:
                msg = f"ausente: {fname}"
                print(color(f"❌ {msg}", "RED") if strict else color(f"⚠ {msg}", "YELLOW"))
            continue

        ok = (local.get("md5")==hobj.get("md5")) and (local.get("sha256")==hobj.get("sha256"))
        if ok:
            count_ok += 1
            total_ok_bytes += (size_bytes or 0)
            results.append({"arquivo": fname, "status": "ok", "codigo": 0, "tamanho_bytes": size_bytes})
            if not silent:
                print(color(f"✅ verificado: {fname} ({format_size(size_bytes)})", "GREEN"))
        else:
            count_div += 1
            if exit_code == 0:
                exit_code = 5
            results.append({"arquivo": fname, "status": "divergente", "codigo": 5, "tamanho_bytes": size_bytes})
            if not silent:
                print(color(f"❌ divergente: {fname} ({format_size(size_bytes)})", "RED"))

    if not silent:
        titulo = "Resumo verificação (STRICT)" if strict else "Resumo verificação em lote"
        narrar(titulo, f"{count_ok} ok • {count_div} divergentes • {count_abs} ausentes")

    payload = {
        "status": "ok" if exit_code==0 else "erro",
        "codigo_saida": exit_code,
        "json_ref": ref_path,
        "execution_time_sec": round(time.perf_counter() - t0, 6),
        "contagem": {"ok": count_ok, "divergentes": count_div, "ausentes": count_abs},
        "tamanho_total_ok_bytes": total_ok_bytes,
        "resultado_verify_all": results,
    }
    if silent:
        salvar_json_log(payload, also_save_last=False, silent=True)
    return exit_code

def rodar_verify_hash(fname: str, ref_path: str, silent: bool) -> int:
    try:
        ref = json.loads(Path(ref_path).read_text(encoding="utf-8"))
    except Exception:
        if not silent:
            print(color(f"[erro] JSON de referência inválido ou ausente: {ref_path}", "RED"))
        payload = {
            "status": "erro", "codigo_saida": 6, "json_ref": ref_path,
            "mensagem": "JSON de referência inválido ou ausente.", "erro": "JsonInvalidoOuAusente"
        }
        salvar_json_log(payload, also_save_last=False, silent=silent) if silent else None
        return 6
    hashes_ref: Dict[str, Dict[str, str]] = ref.get("hashes", {})
    if fname not in hashes_ref:
        if not silent:
            print(color(f"[erro] arquivo não registrado no JSON: {fname}", "RED"))
        payload = {
            "status": "erro", "codigo_saida": 7,
            "json_ref": ref_path, "arquivo": fname,
            "mensagem": "Arquivo não registrado no JSON.", "erro": "ArquivoNaoRegistrado"
        }
        salvar_json_log(payload, also_save_last=False, silent=silent) if silent else None
        return 7
    size_bytes = arquivo_tamanho_bytes(fname)
    local = arquivo_hashes(fname) if size_bytes is not None else None
    if local is None:
        if not silent:
            print(color(f"[erro] arquivo ausente: {fname}", "RED"))
        payload = {
            "status": "erro", "codigo_saida": 6,
            "json_ref": ref_path, "arquivo": fname,
            "mensagem": "Arquivo ausente.", "erro": "ArquivoAusente"
        }
        salvar_json_log(payload, also_save_last=False, silent=silent) if silent else None
        return 6
    ok = (local.get("md5")==hashes_ref[fname].get("md5")) and (local.get("sha256")==hashes_ref[fname].get("sha256"))
    if not silent:
        msg = f"{fname} ({format_size(size_bytes)})"
        print(color(f"✅ Hash verificado: {msg}", "GREEN") if ok else color(f"❌ Hash divergente: {msg}", "RED"))
    if silent:
        payload = {
            "status": "ok" if ok else "erro",
            "codigo_saida": 0 if ok else 5,
            "arquivo": fname, "json_ref": ref_path,
            "tamanho_bytes": size_bytes,
            "hash_ref": hashes_ref[fname],
            "hash_local": local
        }
        salvar_json_log(payload, also_save_last=False, silent=True)
    return 0 if ok else 5

# =========================
# Fluxo Principal
# =========================

def main(argv=None) -> int:
    global NO_COLOR
    args = build_argparser().parse_args(argv)
    NO_COLOR = bool(args.no_color)

    # Verificações primeiro
    if args.verify_all or args.verify_hash:
        ref_path = args.json_ref or "kobllux_last.json"
        if args.verify_all:
            return rodar_verify_all(ref_path, silent=args.silent or args.json, strict=args.strict)
        if args.verify_hash:
            return rodar_verify_hash(args.verify_hash, ref_path, silent=args.silent or args.json)

    exit_code = 0
    files: List[str] = []
    payload: Dict[str, object] = {}
    stats = None
    t0 = time.perf_counter()

    base_context = {
        "otica": {"scripts": OTICA_SCRIPTS},
        "topicos": TOPICOS,
        "prompt_semente": PROMPT_SEMENTE
    }

    # SILENT → não mostra narrativa; só JSON
    if args.silent:
        if args.generate_fractal or args.out or args.out_mesh:
            if args.level < 0:
                payload = {
                    **base_context,
                    "status": "erro", "codigo_saida": 3,
                    "mensagem": "Nível inválido: deve ser >= 0.",
                    "erro": "NivelInvalido",
                    "nivel": args.level,
                    "arquivos_salvos": [],
                    "simbolos_fractais": simbolos_fractais_detectados(False),
                    "execution_time_sec": round(time.perf_counter() - t0, 6),
                }
                salvar_json_log(payload, also_save_last=False, silent=True)
                return 3
            tetras = gerar_sierpinski_nivel(args.level)
            try:
                if args.out:
                    export_obj_por_tetra(tetras, args.out); files.append(args.out)
                if args.out_mesh:
                    export_obj_malha(tetras, args.out_mesh); files.append(args.out_mesh)
                if not files:
                    default = f"sierpinski_n{args.level}.obj"
                    export_obj_por_tetra(tetras, default); files.append(default)
            except Exception as e:
                payload = {
                    **base_context,
                    "status": "erro", "codigo_saida": 2,
                    "mensagem": "Falha ao escrever arquivo.",
                    "erro": f"{type(e).__name__}: {e}",
                    "nivel": args.level, "arquivos_salvos": files,
                    "execution_time_sec": round(time.perf_counter() - t0, 6),
                }
                salvar_json_log(payload, also_save_last=False, silent=True)
                return 2
            stats = fractal_stats(tetras, args.level)
            hashes = {f: arquivo_hashes(f) for f in files if Path(f).exists()}
            sizes = {f: arquivo_tamanho_bytes(f) for f in files if Path(f).exists()}
            payload = {
                **base_context,
                "status": "ok", "codigo_saida": 0,
                "nivel": args.level, "arquivos_salvos": files,
                "estatisticas_fractais": stats,
                "hashes": hashes,
                "tamanhos_bytes": sizes,
                "simbolos_fractais": simbolos_fractais_detectados(True),
                "execution_time_sec": round(time.perf_counter() - t0, 6),
            }
            salvar_json_log(payload, also_save_last=True, silent=True)
            return 0
        else:
            payload = {
                **base_context,
                "status": "erro", "codigo_saida": 4,
                "mensagem": "Nada para gerar em modo silent.",
                "erro": "NadaParaGerar",
                "arquivos_salvos": [],
                "execution_time_sec": round(time.perf_counter() - t0, 6),
            }
            salvar_json_log(payload, also_save_last=False, silent=True)
            return 4

    # NARRATIVO → mostra narrativa sempre
    narrativa_expandida()

    # geração opcional
    if args.generate_fractal or args.out or args.out_mesh:
        if args.level < 0:
            print(color("[erro] nível deve ser >= 0", "RED"))
            exit_code = 3
        else:
            narrar("Geração — Sierpinski Tetrahedron",
                   f"Nível solicitado: {args.level}. Iniciando subdivisão e registro...")
            tetras = gerar_sierpinski_nivel(args.level)
            print(color(f"[OK] Gerados {len(tetras)} tetraedros (nível={args.level}).", "GREEN"))
            try:
                if args.out:
                    export_obj_por_tetra(tetras, args.out)
                    print(color(f"[OK] OBJ (por tetra) salvo em: {args.out}", "BLUE"))
                    files.append(args.out)
                if args.out_mesh:
                    export_obj_malha(tetras, args.out_mesh)
                    print(color(f"[OK] OBJ (malha unificada) salvo em: {args.out_mesh}", "BLUE"))
                    files.append(args.out_mesh)
                if not files:
                    default = f"sierpinski_n{args.level}.obj"
                    export_obj_por_tetra(tetras, default)
                    print(color(f"[OK] OBJ (por tetra) salvo em: {default}", "BLUE"))
                    files.append(default)
            except Exception as e:
                print(color(f"[erro] Falha ao escrever arquivo: {e}", "RED"))
                exit_code = 2
            if exit_code == 0:
                stats = fractal_stats(tetras, args.level)
                narrar("Sumário Fractal",
                       f"Vértices únicos: {stats['vertices']} • Faces: {stats['faces']} • Subdivisões: {stats['subdivisoes']}")

    # JSON opcional no modo narrativo
    if args.json:
        if exit_code == 0:
            hashes = {f: arquivo_hashes(f) for f in files if Path(f).exists()}
            sizes = {f: arquivo_tamanho_bytes(f) for f in files if Path(f).exists()}
        else:
            hashes, sizes = {}, {}
        payload = {
            **base_context,
            "status": "ok" if exit_code==0 else "erro",
            "codigo_saida": exit_code,
            "nivel": args.level if (args.generate_fractal or args.out or args.out_mesh) else None,
            "arquivos_salvos": files,
            "estatisticas_fractais": stats,
            "hashes": hashes,
            "tamanhos_bytes": sizes,
            "simbolos_fractais": simbolos_fractais_detectados(bool(files)),
            "execution_time_sec": round(time.perf_counter() - t0, 6),
        }
        salvar_json_log(payload, also_save_last=True, silent=False)

    return exit_code

if __name__ == "__main__":
    raise SystemExit(main())
