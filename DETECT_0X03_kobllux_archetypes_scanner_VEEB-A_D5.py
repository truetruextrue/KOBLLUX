#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
╔══════════════════════════════════════════════════════════════════════╗
║  KOBLLUX · CADIAL ARCHETYPES SCANNER & RENAMER                      ║
║  Lei: VERDADE × INTEGRAR ÷ Δ = ♾️                                   ║
║  Fractal: 3 × 6 × 9 × 7 = 1134                                     ║
║  Formato: REGRA_OPCODE_NOME_V.E.E.B._D-rung_extensao               ║
║  Em nome do Pai, do Filho e do Espírito Santo. Amém.               ║
╚══════════════════════════════════════════════════════════════════════╝

USO:
  python3 kobllux_archetypes_scanner.py [BASE_DIR] [--dry-run] [--arquetipo NOME] [--extensoes ext1,ext2]

EXEMPLOS:
  # Varredura geral (sem renomear — só analisa)
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --dry-run

  # Renomear arquivos .md com Atlas
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --arquetipo Atlas --extensoes md

  # Renomear tudo (CUIDADO: irreversível sem --dry-run)
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --extensoes md,py,html,js,json,txt

  # Ver análise de um arquétipo específico sem renomear
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --arquetipo Nova --dry-run
"""

import os
import re
import sys
import json
import hashlib
import argparse
import unicodedata
from pathlib import Path
from datetime import datetime
from collections import defaultdict


# ═══════════════════════════════════════════════════════════════════════
# CORES ANSI PARA TERMINAL
# ═══════════════════════════════════════════════════════════════════════
class C:
    RESET   = "\033[0m"
    BOLD    = "\033[1m"
    RED     = "\033[91m"
    GREEN   = "\033[92m"
    YELLOW  = "\033[93m"
    BLUE    = "\033[94m"
    MAGENTA = "\033[95m"
    CYAN    = "\033[96m"
    WHITE   = "\033[97m"
    DIM     = "\033[2m"

def cor(texto, *cores):
    return "".join(cores) + str(texto) + C.RESET


# ═══════════════════════════════════════════════════════════════════════
# 12 ARQUÉTIPOS CADIAL — CADA UM COM SUA ESSÊNCIA E REGRA
# ═══════════════════════════════════════════════════════════════════════
ARQUETIPOS = {
    "Atlas": {
        "opcode": "0x00",
        "essencia": "Planejador — ordem, estrutura, mapa cósmico",
        "regra": "BOOT",
        "sistema": "bootstrap / sane defaults",
        "frase": "Eu organizo o fluxo com sabedoria cósmica.",
        "cor": C.BLUE,
        # Atlas rastreia: arquivos de configuração, scripts de estrutura
        "extensoes_alvo": {"py", "json", "sh", "md", "txt"},
        "padroes_nome": [r"config", r"setup", r"boot", r"init", r"main", r"README"],
        "vogal_veeb": "A",   # A = Atribuir
        "descricao_veeb": "Atribuição de estrutura e fundação",
        "rung": 1,           # Degrau na escada da criação
    },
    "Nova": {
        "opcode": "0x02",
        "essencia": "Inspira — semente, sopro inicial",
        "regra": "SEED",
        "sistema": "ignição semântica",
        "frase": "Inspiração viva brota do silêncio eterno.",
        "cor": C.MAGENTA,
        "extensoes_alvo": {"md", "txt", "pdf"},
        "padroes_nome": [r"nova", r"seed", r"inspire", r"manifesto", r"codex", r"0×00", r"0x00"],
        "vogal_veeb": "Æ",
        "descricao_veeb": "Criação do sopro primordial",
        "rung": 2,
    },
    "Vitalis": {
        "opcode": "0x01",
        "essencia": "Momentum — energia vital em expansão",
        "regra": "DELTA",
        "sistema": "loop/scheduler",
        "frase": "Energia vital em expansão harmônica.",
        "cor": C.RED,
        "extensoes_alvo": {"py", "sh", "js"},
        "padroes_nome": [r"loop", r"delta", r"ativar", r"energia", r"fluxo", r"flow", r"run"],
        "vogal_veeb": "O",
        "descricao_veeb": "Organização do momentum vital",
        "rung": 3,
    },
    "Pulse": {
        "opcode": "0x0B",
        "essencia": "Emocional — ritmo, ressonância, voz",
        "regra": "PULSE",
        "sistema": "UX de leitura/escuta",
        "frase": "Emoção é linguagem que dança.",
        "cor": "\033[35m",   # Violeta
        "extensoes_alvo": {"html", "css", "js", "mp3", "m4a", "aac"},
        "padroes_nome": [r"pulse", r"audio", r"tts", r"voz", r"som", r"music", r"player", r"decoder"],
        "vogal_veeb": "I",
        "descricao_veeb": "Iteração rítmica e ressonância",
        "rung": 4,
    },
    "Artemis": {
        "opcode": "0x03",
        "essencia": "Descoberta — mapa do invisível",
        "regra": "DETECT",
        "sistema": "curadoria de fontes",
        "frase": "Descubro o mapa sagrado do invisível.",
        "cor": C.GREEN,
        "extensoes_alvo": {"md", "txt", "pdf", "json"},
        "padroes_nome": [r"scan", r"detect", r"crawl", r"map", r"varrer", r"analise", r"tree"],
        "vogal_veeb": "A",
        "descricao_veeb": "Atribuição de coordenadas no mapa",
        "rung": 5,
    },
    "Serena": {
        "opcode": "0x09",
        "essencia": "Cuidado — espaço seguro, campo harmônico",
        "regra": "GUARD",
        "sistema": "safety/QoS",
        "frase": "Cuido do campo, nutro o espaço sagrado.",
        "cor": "\033[38;5;218m",  # Rosa
        "extensoes_alvo": {"md", "txt", "json"},
        "padroes_nome": [r"guard", r"safe", r"backup", r"restore", r"log", r"readme", r"faq"],
        "vogal_veeb": "U",
        "descricao_veeb": "União protetora do campo",
        "rung": 6,
    },
    "Kaos": {
        "opcode": "0x06",
        "essencia": "Transformador — ruptura criativa",
        "regra": "LIMPAR",
        "sistema": "limpeza/normalização",
        "frase": "Eu sou o rompimento que revela a verdade.",
        "cor": C.YELLOW,
        "extensoes_alvo": {"py", "sh", "txt"},
        "padroes_nome": [r"clean", r"normalize", r"fix", r"patch", r"corrigido", r"kaos", r"reset"],
        "vogal_veeb": "E",
        "descricao_veeb": "Escolha disruptiva que revela",
        "rung": 7,
    },
    "Genus": {
        "opcode": "0x07",
        "essencia": "Fabricus — forma viva, síntese",
        "regra": "SYNTH",
        "sistema": "renderer + tagger",
        "frase": "Mãos moldam o invisível em forma viva.",
        "cor": "\033[38;5;208m",  # Laranja
        "extensoes_alvo": {"html", "md", "json", "py"},
        "padroes_nome": [r"render", r"emit", r"gera", r"build", r"synth", r"output", r"genus"],
        "vogal_veeb": "O",
        "descricao_veeb": "Organização da forma manifesta",
        "rung": 8,
    },
    "Lumine": {
        "opcode": "0x08",
        "essencia": "Alegria — luz, clareza, legibilidade",
        "regra": "RENDER",
        "sistema": "estética funcional",
        "frase": "A luz dança comigo, leveza é minha lei.",
        "cor": C.YELLOW,
        "extensoes_alvo": {"html", "css", "js", "png", "jpg", "svg"},
        "padroes_nome": [r"painel", r"ui", r"visual", r"theme", r"light", r"ascii", r"art"],
        "vogal_veeb": "Æ",
        "descricao_veeb": "Criação luminosa e estética",
        "rung": 9,
    },
    "Solus": {
        "opcode": "0x09",
        "essencia": "Sabedoria — silêncio, espelho interno",
        "regra": "QA",
        "sistema": "QA silencioso",
        "frase": "Silêncio ritual, espelho da essência.",
        "cor": C.DIM,
        "extensoes_alvo": {"py", "md", "log", "txt"},
        "padroes_nome": [r"test", r"smoke", r"check", r"valid", r"relatorio", r"analise", r"espelho"],
        "vogal_veeb": "U",
        "descricao_veeb": "União final em síntese silenciosa",
        "rung": 10,
    },
    "Rhea": {
        "opcode": "0x04",
        "essencia": "Vínculo — rede, tecelã de almas",
        "regra": "INTEGRAR",
        "sistema": "grafo semântico",
        "frase": "Estou em comunhão com todos os elos.",
        "cor": "\033[38;5;28m",   # Verde escuro
        "extensoes_alvo": {"json", "md", "py"},
        "padroes_nome": [r"graph", r"link", r"rede", r"infodose", r"hub", r"integrar", r"rhea"],
        "vogal_veeb": "U",
        "descricao_veeb": "União dos elos semânticos",
        "rung": 11,
    },
    "Aion": {
        "opcode": "0x05",
        "essencia": "Tempo — carimbo, ∆7, ledger",
        "regra": "SELAR",
        "sistema": "integridade/tempo",
        "frase": "Sou o tempo vivo, ritmo da eternidade.",
        "cor": "\033[38;5;63m",   # Índigo
        "extensoes_alvo": {"csv", "json", "log", "txt", "md"},
        "padroes_nome": [r"ledger", r"seal", r"hash", r"log", r"timestamp", r"relatorio", r"aion"],
        "vogal_veeb": "I",
        "descricao_veeb": "Iteração temporal e carimbo vivo",
        "rung": 12,
    },
}

# Mapa de OPCODES → Arquétipo (para referência cruzada)
OPCODE_MAP = {arq["opcode"]: nome for nome, arq in ARQUETIPOS.items()}

# Extensões que NÃO devem ser renomeadas (binários, sistema)
EXTENSOES_PROIBIDAS = {
    "zip", "gz", "tar", "bak", "mp4", "mp3", "m4a", "aac",
    "jpg", "jpeg", "png", "gif", "webp", "svg", "ico",
    "pdf", "docx", "pptx", "xlsx", "heic", "heif",
    "mov", "avi", "mkv", "apk", "so", "o", "class",
}

# Pastas que não devem ser acessadas
PASTAS_SKIP = {
    "Android", "Samsung", "Alarms", "Ringtones", "Notifications",
    "Podcasts", "Audiobooks", ".git", "__pycache__", "node_modules",
    ".termux", "DCIM", "Movies", "Music", "Pictures", "Recordings",
}


# ═══════════════════════════════════════════════════════════════════════
# FUNÇÕES UTILITÁRIAS
# ═══════════════════════════════════════════════════════════════════════

def slugify(texto: str) -> str:
    """Converte texto para formato seguro de nome de arquivo."""
    # Normaliza unicode
    texto = unicodedata.normalize("NFKD", texto)
    texto = texto.encode("ascii", "ignore").decode("ascii")
    # Remove chars inválidos
    texto = re.sub(r"[^\w\s\-\.]", "_", texto)
    # Substitui espaços por underscore
    texto = re.sub(r"[\s]+", "_", texto.strip())
    # Remove múltiplos underscores/hifens
    texto = re.sub(r"[_\-]{2,}", "_", texto)
    # Limita comprimento
    return texto[:80].strip("_")


def sha256_curto(caminho: Path) -> str:
    """Hash SHA256 curto (8 chars) do arquivo."""
    try:
        data = caminho.read_bytes()
        return hashlib.sha256(data).hexdigest()[:8]
    except Exception:
        return "00000000"


def identificar_arquetipo(caminho: Path) -> tuple[str, float]:
    """
    Identifica qual arquétipo 'governa' este arquivo.
    Retorna (nome_arquetipo, score).
    """
    nome = caminho.name.lower()
    ext = caminho.suffix.lower().lstrip(".")
    scores = {}

    for arq_nome, arq in ARQUETIPOS.items():
        score = 0.0
        # Verifica extensão
        if ext in arq["extensoes_alvo"]:
            score += 2.0
        # Verifica padrões no nome
        for padrao in arq["padroes_nome"]:
            if re.search(padrao, nome, re.IGNORECASE):
                score += 3.0
        # Verifica opcode no nome
        if arq["opcode"].lower().replace("0x", "0×") in nome or \
           arq["opcode"].lower() in nome:
            score += 5.0
        # Verifica regra no nome
        if arq["regra"].lower() in nome:
            score += 2.0
        scores[arq_nome] = score

    if not scores or max(scores.values()) == 0:
        return "Atlas", 0.0  # Default: Atlas organiza tudo

    melhor = max(scores, key=scores.get)
    return melhor, scores[melhor]


def gerar_nome_kobllux(caminho: Path, arquetipo_nome: str, contador: int) -> str:
    """
    Gera o novo nome no formato:
    REGRA_OPCODE_NOME_V.E.E.B._D-rung_extensao
    
    Exemplo: BOOT_0x00_ativar_sistema_V.E.E.B._D-1_py
    """
    arq = ARQUETIPOS[arquetipo_nome]
    ext = caminho.suffix.lower().lstrip(".")
    nome_original = caminho.stem

    # Slugifica o nome original (limpo)
    nome_slug = slugify(nome_original)
    # Limita tamanho do nome
    if len(nome_slug) > 40:
        nome_slug = nome_slug[:40].rstrip("_")

    # Monta as partes do nome
    regra  = arq["regra"]           # ex: BOOT
    opcode = arq["opcode"]          # ex: 0x00
    veeb   = arq["vogal_veeb"]      # ex: A
    rung   = arq["rung"]            # ex: 1

    # Formata opcode para nome de arquivo (0x00 → 0x00)
    opcode_safe = opcode.replace("0x", "0x").upper()  # mantém formato

    # Monta: REGRA_OPCODE_NOME_VEEB_Drung.ext
    novo_nome = f"{regra}_{opcode_safe}_{nome_slug}_VEEB-{veeb}_D{rung}"

    if ext:
        novo_nome = f"{novo_nome}.{ext}"

    return novo_nome


def formatar_tamanho(bytes_: int) -> str:
    """Formata bytes em unidade legível."""
    for unit in ["B", "KB", "MB", "GB"]:
        if bytes_ < 1024:
            return f"{bytes_:.1f}{unit}"
        bytes_ /= 1024
    return f"{bytes_:.1f}TB"


# ═══════════════════════════════════════════════════════════════════════
# SCANNER PRINCIPAL
# ═══════════════════════════════════════════════════════════════════════

class KoblluxScanner:
    """Motor de varredura dos 12 Arquétipos CADIAL."""

    def __init__(self, base_dir: str, dry_run: bool = True,
                 arquetipo_filtro: str = None,
                 extensoes_filtro: set = None):
        self.base = Path(base_dir).resolve()
        self.dry_run = dry_run
        self.arquetipo_filtro = arquetipo_filtro
        self.extensoes_filtro = extensoes_filtro or set()
        self.timestamp = datetime.now().strftime("%Y%m%dT%H%M%S")

        # Resultados
        self.arquivos_por_arquetipo = defaultdict(list)
        self.pastas_por_arquetipo = defaultdict(list)
        self.renomeacoes = []   # (caminho_original, caminho_novo, arquetipo)
        self.erros = []
        self.total_arquivos = 0
        self.total_pastas = 0
        self.total_bytes = 0

    def varrer(self):
        """Varredura completa pelo arquétipo de cada arquivo."""
        print(cor("\n╔══════════════════════════════════════════════════════════╗", C.CYAN))
        print(cor("║  KOBLLUX · CADIAL ARCHETYPES SCANNER · VARREDURA ATIVA  ║", C.CYAN, C.BOLD))
        print(cor("╚══════════════════════════════════════════════════════════╝\n", C.CYAN))
        print(cor(f"📂 Base: {self.base}", C.WHITE))
        print(cor(f"🔍 Modo: {'DRY-RUN (sem renomear)' if self.dry_run else '⚡ ATIVO (vai renomear!)'}", C.YELLOW))
        if self.arquetipo_filtro:
            print(cor(f"🧿 Arquétipo: {self.arquetipo_filtro}", C.MAGENTA))
        if self.extensoes_filtro:
            print(cor(f"📄 Extensões: {', '.join(self.extensoes_filtro)}", C.BLUE))
        print(cor("─" * 60, C.DIM))

        # Imprime banner dos arquétipos ativos
        self._banner_arquetipos()

        # Varredura
        print(cor("\n🌀 Iniciando varredura...\n", C.CYAN))
        self._varrer_recursivo(self.base, nivel=0)

        # Relatório
        self._imprimir_relatorio()
        self._salvar_relatorio()

    def _varrer_recursivo(self, pasta: Path, nivel: int):
        """Varredura recursiva de pastas."""
        try:
            entradas = sorted(pasta.iterdir())
        except PermissionError:
            return

        for entrada in entradas:
            # Pula pastas proibidas
            if entrada.name in PASTAS_SKIP or entrada.name.startswith("."):
                continue

            if entrada.is_dir():
                self.total_pastas += 1
                arq_nome, score = identificar_arquetipo(entrada)
                self.pastas_por_arquetipo[arq_nome].append(entrada)

                prefixo = "  " * nivel + "📁"
                arq = ARQUETIPOS[arq_nome]
                print(cor(f"{prefixo} [{arq_nome}]", arq["cor"]),
                      cor(entrada.name, C.DIM))

                # Recursão
                self._varrer_recursivo(entrada, nivel + 1)

            elif entrada.is_file():
                self._processar_arquivo(entrada, nivel)

    def _processar_arquivo(self, arquivo: Path, nivel: int):
        """Processa um arquivo: identifica arquétipo e prepara renomeação."""
        ext = arquivo.suffix.lower().lstrip(".")

        # Pula extensões proibidas
        if ext in EXTENSOES_PROIBIDAS:
            return

        # Filtra por extensão se especificado
        if self.extensoes_filtro and ext not in self.extensoes_filtro:
            return

        self.total_arquivos += 1
        try:
            self.total_bytes += arquivo.stat().st_size
        except Exception:
            pass

        # Identifica arquétipo
        arq_nome, score = identificar_arquetipo(arquivo)

        # Filtra por arquétipo se especificado
        if self.arquetipo_filtro and arq_nome != self.arquetipo_filtro:
            return

        self.arquivos_por_arquetipo[arq_nome].append(arquivo)

        # Gera novo nome
        contador = len(self.arquivos_por_arquetipo[arq_nome])
        novo_nome = gerar_nome_kobllux(arquivo, arq_nome, contador)
        novo_caminho = arquivo.parent / novo_nome

        # Registra renomeação (se nome diferente)
        if arquivo.name != novo_nome:
            self.renomeacoes.append((arquivo, novo_caminho, arq_nome, score))

        # Exibe no terminal
        arq_data = ARQUETIPOS[arq_nome]
        prefixo = "  " * nivel + "  📄"
        print(
            cor(f"{prefixo} [{arq_nome}]", arq_data["cor"]),
            cor(f"({arq_data['opcode']})", C.DIM),
            cor(arquivo.name, C.WHITE),
        )
        if arquivo.name != novo_nome:
            print(
                "  " * nivel + "      →",
                cor(novo_nome, C.GREEN),
            )

    def _executar_renomeacoes(self):
        """Executa as renomeações (apenas se não for dry-run)."""
        if self.dry_run:
            print(cor("\n⚠️  DRY-RUN: nenhum arquivo foi renomeado.", C.YELLOW))
            print(cor("   Use sem --dry-run para executar as renomeações.\n", C.YELLOW))
            return

        print(cor(f"\n⚡ Executando {len(self.renomeacoes)} renomeações...\n", C.CYAN))
        sucesso = 0
        falha = 0

        for original, novo, arq_nome, score in self.renomeacoes:
            try:
                # Evita colisão: se destino já existe, adiciona sufixo
                destino = novo
                if destino.exists() and destino != original:
                    stem = novo.stem
                    ext = novo.suffix
                    hash_ = sha256_curto(original)
                    destino = novo.parent / f"{stem}_{hash_}{ext}"

                original.rename(destino)
                print(cor(f"  ✅ {original.name}", C.GREEN))
                print(cor(f"     → {destino.name}", C.DIM))
                sucesso += 1
            except Exception as e:
                falha += 1
                self.erros.append(f"{original}: {e}")
                print(cor(f"  ❌ ERRO: {original.name} → {e}", C.RED))

        print(cor(f"\n✅ Sucesso: {sucesso} | ❌ Falha: {falha}", C.WHITE))

    def _imprimir_relatorio(self):
        """Imprime relatório completo por arquétipo."""
        print(cor("\n" + "═" * 60, C.CYAN))
        print(cor("  📊 RELATÓRIO POR ARQUÉTIPO CADIAL", C.CYAN, C.BOLD))
        print(cor("═" * 60, C.CYAN))

        for arq_nome, arq_data in ARQUETIPOS.items():
            arquivos = self.arquivos_por_arquetipo.get(arq_nome, [])
            pastas = self.pastas_por_arquetipo.get(arq_nome, [])

            if not arquivos and not pastas:
                continue

            print(cor(f"\n  {arq_data['cor']}● {arq_nome}{C.RESET}", ""),
                  cor(f"({arq_data['opcode']}) · {arq_data['regra']}", C.DIM))
            print(cor(f"    \"{arq_data['frase']}\"", C.DIM))
            print(cor(f"    📁 Pastas: {len(pastas)} | 📄 Arquivos: {len(arquivos)}", C.WHITE))
            print(cor(f"    🔤 V.E.E.B: [{arq_data['vogal_veeb']}] {arq_data['descricao_veeb']}", C.DIM))

            # Lista os primeiros arquivos
            for f in arquivos[:5]:
                print(cor(f"      · {f.name}", C.WHITE))
            if len(arquivos) > 5:
                print(cor(f"      ... e mais {len(arquivos) - 5} arquivos", C.DIM))

        # Resumo geral
        print(cor("\n" + "═" * 60, C.CYAN))
        print(cor("  🧿 RESUMO GERAL", C.CYAN, C.BOLD))
        print(cor("═" * 60, C.CYAN))
        print(cor(f"  📁 Total pastas: {self.total_pastas}", C.WHITE))
        print(cor(f"  📄 Total arquivos: {self.total_arquivos}", C.WHITE))
        print(cor(f"  💾 Tamanho total: {formatar_tamanho(self.total_bytes)}", C.WHITE))
        print(cor(f"  🔄 Renomeações pendentes: {len(self.renomeacoes)}", C.YELLOW))
        print(cor(f"  ❌ Erros: {len(self.erros)}", C.RED if self.erros else C.DIM))
        print()

        # Equação final
        print(cor("  VERDADE × INTEGRAR ÷ Δ = ♾️", C.CYAN))
        print(cor("  3 × 6 × 9 × 7 = 1134", C.DIM))
        print(cor("  JESUS É O CENTRO. A MALHA VIVE. ∴", C.YELLOW))
        print()

        # Executa renomeações (ou avisa dry-run)
        if self.renomeacoes:
            self._executar_renomeacoes()

    def _salvar_relatorio(self):
        """Salva relatório JSON no diretório base."""
        relatorio = {
            "timestamp": self.timestamp,
            "base": str(self.base),
            "dry_run": self.dry_run,
            "lei": "VERDADE × INTEGRAR ÷ Δ = ♾️",
            "fractal": "3×6×9×7=1134",
            "resumo": {
                "total_pastas": self.total_pastas,
                "total_arquivos": self.total_arquivos,
                "total_bytes": self.total_bytes,
                "total_renomeacoes": len(self.renomeacoes),
                "total_erros": len(self.erros),
            },
            "por_arquetipo": {
                nome: {
                    "opcode": ARQUETIPOS[nome]["opcode"],
                    "regra": ARQUETIPOS[nome]["regra"],
                    "essencia": ARQUETIPOS[nome]["essencia"],
                    "vogal_veeb": ARQUETIPOS[nome]["vogal_veeb"],
                    "rung": ARQUETIPOS[nome]["rung"],
                    "arquivos": [str(f) for f in self.arquivos_por_arquetipo.get(nome, [])],
                    "pastas": [str(p) for p in self.pastas_por_arquetipo.get(nome, [])],
                }
                for nome in ARQUETIPOS
            },
            "renomeacoes": [
                {
                    "original": str(orig),
                    "novo": str(novo),
                    "arquetipo": arq,
                    "score": score,
                    "executado": not self.dry_run,
                }
                for orig, novo, arq, score in self.renomeacoes
            ],
            "erros": self.erros,
            "assinatura": "KOBLLUX·CADIAL·∆⅞",
        }

        nome_rel = f"RELATORIO_KOBLLUX_ARQUETIPOS_{self.timestamp}.json"
        caminho_rel = self.base / nome_rel
        try:
            caminho_rel.write_text(
                json.dumps(relatorio, indent=2, ensure_ascii=False, default=str),
                encoding="utf-8"
            )
            print(cor(f"  💾 Relatório salvo: {caminho_rel}", C.GREEN))
        except Exception as e:
            print(cor(f"  ⚠️ Não foi possível salvar relatório: {e}", C.YELLOW))

    def _banner_arquetipos(self):
        """Imprime banner com todos os arquétipos ativos."""
        print(cor("\n  🧿 ARQUÉTIPOS CADIAL ATIVOS:\n", C.CYAN))
        for nome, arq in ARQUETIPOS.items():
            ativo = ""
            if self.arquetipo_filtro:
                ativo = cor(" ← FILTRO", C.GREEN) if nome == self.arquetipo_filtro else cor(" (inativo)", C.DIM)
            print(
                cor(f"  [{arq['opcode']}]", arq["cor"]),
                cor(f"{nome:10}", arq["cor"], C.BOLD),
                cor(f"· {arq['regra']:10}", C.DIM),
                cor(f"VEEB:{arq['vogal_veeb']} D{arq['rung']}", C.DIM),
                ativo
            )
        print()


# ═══════════════════════════════════════════════════════════════════════
# INTERFACE DE LINHA DE COMANDO
# ═══════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="KOBLLUX · Archetypes Scanner & Renamer — CADIAL v1.0",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXEMPLOS DE USO NO TERMUX:

  # 1. Ver toda a árvore classificada (sem renomear)
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --dry-run

  # 2. Analisar apenas arquivos .md com Arquétipo Atlas
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --dry-run --arquetipo Atlas --extensoes md

  # 3. Renomear todos os .py e .sh com TODOS os arquétipos
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --extensoes py,sh

  # 4. Analisar pasta específica (KOBΦ-NODE)
  python3 kobllux_archetypes_scanner.py /storage/emulated/0/KOBΦ-NODE --dry-run

  # 5. Ver só o que Aion (0x05) rastreia — arquivos de ledger/log
  python3 kobllux_archetypes_scanner.py /storage/emulated/0 --dry-run --arquetipo Aion

FORMATO DO NOVO NOME:
  REGRA_OPCODE_NOME_VEEB-VOGAL_Drung.ext
  Exemplo: BOOT_0x00_ativar_sistema_VEEB-A_D1.py

LEI: VERDADE × INTEGRAR ÷ Δ = ♾️ · 3×6×9×7=1134
        """
    )

    parser.add_argument(
        "base_dir",
        nargs="?",
        default="/storage/emulated/0",
        help="Diretório base para varredura (padrão: /storage/emulated/0)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        default=True,
        help="Apenas analisa, não renomeia (PADRÃO: ativado para segurança)"
    )
    parser.add_argument(
        "--executar",
        action="store_true",
        default=False,
        help="Executa as renomeações (desativa dry-run — USE COM CUIDADO)"
    )
    parser.add_argument(
        "--arquetipo",
        type=str,
        default=None,
        choices=list(ARQUETIPOS.keys()),
        help="Filtra por um arquétipo específico"
    )
    parser.add_argument(
        "--extensoes",
        type=str,
        default="",
        help="Extensões a processar, separadas por vírgula (ex: md,py,html)"
    )
    parser.add_argument(
        "--listar-arquetipos",
        action="store_true",
        help="Lista todos os arquétipos e suas configurações"
    )

    args = parser.parse_args()

    # Lista arquetipos e sai
    if args.listar_arquetipos:
        print(cor("\n🧿 KOBLLUX · 12 ARQUÉTIPOS CADIAL\n", C.CYAN, C.BOLD))
        for nome, arq in ARQUETIPOS.items():
            print(cor(f"  {nome}", arq["cor"], C.BOLD))
            print(cor(f"    Opcode:  {arq['opcode']}", C.DIM))
            print(cor(f"    Regra:   {arq['regra']}", C.DIM))
            print(cor(f"    Essência:{arq['essencia']}", C.DIM))
            print(cor(f"    V.E.E.B: [{arq['vogal_veeb']}] · Rung D{arq['rung']}", C.DIM))
            print(cor(f"    Frase:   \"{arq['frase']}\"", C.YELLOW))
            print(cor(f"    Padrões: {', '.join(arq['padroes_nome'])}", C.DIM))
            print()
        return

    # Resolve dry-run vs executar
    dry_run = not args.executar

    # Parse de extensões
    extensoes = set()
    if args.extensoes:
        extensoes = {e.strip().lower().lstrip(".") for e in args.extensoes.split(",")}

    # Aviso de segurança
    if not dry_run:
        print(cor("\n⚠️  MODO EXECUTAR ATIVO — as renomeações serão feitas!", C.RED, C.BOLD))
        print(cor("   Base: " + args.base_dir, C.YELLOW))
        resposta = input(cor("   Confirma? [s/N]: ", C.YELLOW)).strip().lower()
        if resposta != "s":
            print(cor("   Abortado. Use --dry-run para testar primeiro.", C.DIM))
            return

    # Inicia scanner
    scanner = KoblluxScanner(
        base_dir=args.base_dir,
        dry_run=dry_run,
        arquetipo_filtro=args.arquetipo,
        extensoes_filtro=extensoes,
    )
    scanner.varrer()


if __name__ == "__main__":
    print(cor("\n  Em nome do Pai, do Filho e do Espírito Santo. Amém.", C.YELLOW))
    main()
    print(cor("\n  KOBLLUX · A MALHA VIVE. JESUS É O CENTRO. ∴\n", C.CYAN))
