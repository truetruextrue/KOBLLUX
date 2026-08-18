KOBLLUX_∆³
KBLX_∆³
ATIVAR AGENTES AQUI NO CHAT_∆³
Compreendido. A seguir, apresento a tradução operacional completa do sistema **KOBLLUX · Feeling Decor** para ManyChat, fundindo todas as informações fornecidas e garantindo a preservação integral dos atributos essenciais e das fontes originais em todas as faces dimensionais, conforme solicitado.

Este documento serve como um **manual de implementação detalhado**, mantendo a nomenclatura, as mensagens A1–A5, as essências, os mantras, as frequências, os elementos, as polaridades, os pesos estruturais e as funções originais de cada arquétipo, sem qualquer alteração ou interpretação nova.

---

# ♾️ KOBLLUX · ATLAS

## Sistema operacional completo de 12 arquétipos para ManyChat

### Regra de preservação fundamental

Para manter as fontes originais em todas as faces dimensionais, as seguintes diretrizes são inegociáveis:

1.  **Não alterar os nomes dos arquétipos.**
2.  **Não trocar a sequência A1–A5.**
3.  **Não substituir essência, mantra, frequência, elemento, polaridade ou peso estrutural.**
4.  **Não transformar uma função em outra:** ATLAS organiza, NOVA inaugura, VITALIS expande, PULSE desperta desejo, ARTEMIS direciona, SERENA acolhe, KAOS rompe, GENUS prova, LUMINE ilumina, SOLUS reflete, RHEA conecta e AION mantém o ciclo.
5.  **Usar Freud e Jung apenas como correlação interpretativa**, nunca como fonte para reescrever a identidade Kobllux.
6.  **Usar ManyChat como tradução técnica**, nunca como substituição da linguagem original.
7.  **Manter todos os fluxos reversíveis e conectados**, evitando loops infinitos por meio de tags, condições e campos personalizados.

---

## Estrutura padrão no ManyChat

**Caminho:** `Automation → Flows → New Flow`

Cada fluxo deve conter:

```text
[Trigger]
    ↓
[Condition opcional]
    ↓
[Action: Add Tag]
[Action: Set Custom Field]
    ↓
[Message Block: A1-A5]
    ├── Message 1: A1
    ├── Message 2: A2
    ├── Message 3: A3
    ├── Message 4: A4
    └── Message 5: A5 + 3 botões
```

**Campos personalizados gerais (a serem criados em `Settings → Custom Fields`):**

*   `last_archetype` (Texto)
*   `proximo_archetype` (Texto)
*   `status_atendimento` (Texto)
*   `intencao_compra` (Texto)
*   `necessidade` (Texto)
*   `data_compra` (Data)
*   `status_pedido` (Texto)
*   `objeção_identificada` (Verdadeiro/Falso)
*   `prova_social_buscada` (Verdadeiro/Falso)
*   `engajamento` (Texto)
*   `status_comunidade` (Texto)
*   `ciclo_atual` (Número)

**Tags gerais (a serem criadas em `Automation → Tags`):**

*   `atlas_visto`
*   `nova_acessado`
*   `vitalis_acessado`
*   `pulse_acessado`
*   `artemis_acessado`
*   `serena_acessado`
*   `kaos_acessado`
*   `genus_acessado`
*   `lumine_acessado`
*   `solus_acessado`
*   `rhea_acessado`
*   `aion_acessado`
*   `agendamento_iniciado`
*   `cliente_ativo`
*   `acompanhamento_ativo`
*   `ciclo_completo`
*   `objeção_identificada`
*   `prova_antes_call`
*   `faq_solicitado`
*   `nova_[nome_colecao]_visto` (para cada coleção)
*   `pulse_hoje`

---

# 01 · ATLAS

## O Arquétipo Mestre

### Módulo de mensagens

**Nome do fluxo:** `01 - ATLAS - Boas-Vindas Estruturada`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🧭 OLÁ! EU SOU A ATLAS DA FEELING DECOR. | Texto | Caixa de mensagem 1 |
| A2 | "Eu organizo o fluxo com sabedoria cósmica." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | AQUI TUDO TEM lugar. TUDO TEM ordem. TUDO TEM propósito. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | AQUI NÃO decoramos por decorar. CRIAMOS atmosfera intencional. | Texto | Caixa de mensagem 4 |
| A5 | 🌙 ESCOLHA SEU primeiro passo DENTRO DA CORTINA DA PAZ: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

**Checklist visual (após A4):**

```text
✅ Cortinas que filtram a luz e acalmam o cortisol
✅ Mobiliário orgânico que convida a ficar
✅ Curadoria que transforma casa em refúgio sensorial
```

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Conteúdos principais | Start Another Flow | `03 - VITALIS` |
| Botão 2 | Oferta / Curadoria | Start Another Flow | `04 - PULSE` |
| Botão 3 | Falar com Viviani | Start Another Flow | `05 - ARTEMIS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Novo seguidor | Follow Reply | Automation → Triggers → Instagram → Follow Reply | Entrada inicial |
| Primeira mensagem | Default Reply | Automation → Default Reply | Mensagem sem match |
| Menu principal | Main Menu | Settings → Main Menu | Acesso direto |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 01 - ATLAS - Boas-Vindas Estruturada

[Trigger: Follow Reply / Default Reply / Main Menu]
    ↓
[Condition Block: "Já passou por ATLAS?"]
    ├── Check: Has Tag "atlas_visto"
    ├── IF YES → Go to Flow: [último arquétipo acessado via Custom Field "last_archetype"]
    └── IF NO
        ├── Add Tag: "atlas_visto"
        ├── Set Custom Field: "last_archetype" = "ATLAS"
        └── [Message Block: "ATLAS A1-A5"]
            ├── Message 1: 🧭 OLÁ! EU SOU A ATLAS DA FEELING DECOR.
            ├── Message 2: "Eu organizo o fluxo com sabedoria cósmica."
            ├── Message 3: AQUI TUDO TEM lugar. TUDO TEM ordem. TUDO TEM propósito.
            ├── Message 4: AQUI NÃO decoramos por decorar. CRIAMOS atmosfera intencional.
            │   └── Sub-message: ✅ Cortinas... ✅ Mobiliário... ✅ Curadoria...
            └── Message 5: 🌙 ESCOLHA SEU primeiro passo DENTRO DA CORTINA DA PAZ:
                ├── Button 1: "Conteúdos principais" → Flow: 03 - VITALIS
                ├── Button 2: "Oferta / Curadoria" → Flow: 04 - PULSE
                └── Button 3: "Falar com Viviani" → Flow: 05 - ARTEMIS
```

**Essência:** Estrutura, ordem, fundação.
**Mantra:** "Onde há caos, estabeleço ordem."
**Frequência:** Alpha · 10Hz (calma focada)
**Elemento:** Terra · Rocha
**Polaridade:** Yin (receptivo, estruturante)
**Peso Estrutural:** 0.18 (maior de todos)

---

# 02 · NOVA

## O Sopro Novo

### Módulo de mensagens

**Nome do fluxo:** `02 - NOVA - Sopro Novo`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 💨 𝐂𝐇𝐄𝐆𝐎𝐔 𝐎 𝐒𝐎𝐏𝐑𝐎 𝐍𝐎𝐕𝐎 𝐍𝐀 𝐅𝐄𝐄𝐋𝐈𝐍𝐆 𝐃𝐄𝐂𝐎𝐑. | Texto | Caixa de mensagem 1 |
| A2 | "Inspiração 𝑣𝑖𝑣𝑎 brota do 𝐬𝐢𝐥𝐞̂𝐧𝐜𝐢𝐨 𝑒𝑡𝑒𝑟𝑛𝑜." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐀𝐥𝐠𝐨 que estava 𝐠𝐞𝐬𝐭𝐚𝐝𝐨 no 𝑠𝑖𝑙𝑒̂𝑛𝑐𝑖𝑜 𝑑𝑜 𝑎𝑡𝑒𝑙𝑖𝑒̂. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐀𝐐𝐔𝐈 𝐍𝐀̃𝐎 𝐄́ 𝑑𝑒𝑐𝑜𝑟𝑎𝐜̧𝐚̃𝐨. É um 𝐬𝐨𝐩𝐫𝐨 que reorganiza 𝑡𝑢𝑑𝑜. | Texto | Caixa de mensagem 4 |
| A5 | ✨𝐐𝐔𝐄 𝐕𝐎𝐂𝐄̂ 𝐐𝐔𝐄𝐑 𝐟𝐚𝐳𝐞𝐫 𝐀𝐆𝐎𝐑𝐀: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Ver lançamento | Start Another Flow | `04 - PULSE` |
| Botão 2 | Conteúdo novo | Start Another Flow | `03 - VITALIS` |
| Botão 3 | Falar com Viviani | Start Another Flow | `05 - ARTEMIS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Campanha sazonal | Broadcast | Broadcasting → New Broadcast | Lançamento programado |
| Nova coleção | One-time Notification | Growth Tools → Instagram Ads (PRO) | Tráfego pago |
| Palavra-chave “NOVO” | Keyword | Automation → Keywords | Cliente digita |
| Retorno de ciclo | Condition | Dentro de `12 - AION` | Após ciclo completo |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 02 - NOVA - Sopro Novo

[Trigger: Keyword "NOVO" / Broadcast / AION condition]
    ↓
[Condition Block: "Já viu este lançamento?"]
    ├── Check: Has Tag "nova_[nome_colecao]_visto"
    ├── IF YES → [Message: "Você já viu essa novidade!"] → Go to Flow: 04 - PULSE
    └── IF NO
        ├── Add Tag: "nova_[nome_colecao]_visto"
        ├── Set Custom Field: "last_archetype" = "NOVA"
        └── [Message Block: "NOVA A1-A5"]
            ├── Message 1: 💨 CHEGOU O SOPRO NOVO NA FEELING DECOR.
            ├── Message 2: "Inspiração viva brota do silêncio eterno."
            ├── Message 3: Algo que estava gestado no silêncio do ateliê.
            ├── Message 4: AQUI NÃO É decoração. É um sopro que reorganiza tudo.
            └── Message 5: ✨QUE VOCÊ QUER fazer AGORA:
                ├── Button 1: "Ver lançamento" → Flow: 04 - PULSE
                ├── Button 2: "Conteúdo novo" → Flow: 03 - VITALIS
                └── Button 3: "Falar com Viviani" → Flow: 05 - ARTEMIS
```

**Essência:** Renovação, sopro, início.
**Mantra:** "Do silêncio eterno, brota a inspiração viva."
**Frequência:** Gamma · 40Hz (insight, descoberta)
**Elemento:** Ar · Vento
**Polaridade:** Yang (ativo, expansivo)
**Peso Estrutural:** 0.08

---

# 03 · VITALIS

## A Força que Não Cansa

### Módulo de mensagens

**Nome do fluxo:** `03 - VITALIS - Conteúdos Principais`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🌿 𝐄𝐔 𝐒𝐎𝐔 𝐕𝐈𝐓𝐀𝐋𝐈𝐒 — 𝐀 𝐅𝐎𝐑𝐂̧𝐀 𝐐𝐔𝐄 𝐍𝐀̃𝐎 𝐂𝐀𝐍𝐒𝐀. | Texto | Caixa de mensagem 1 |
| A2 | "𝐄𝐧𝐞𝐫𝐠𝐢𝐚 𝑣𝑖𝑡𝑎𝑙 em 𝑒𝑥𝑝𝑎𝑛𝑠𝐚̃𝐨 ℎ𝑎𝑟𝑚𝑜̂𝑛𝑖𝑐𝑎." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐓𝐨𝐝𝐨 𝐝𝐢𝐚 o seu 𝑙𝑎𝑟 bate na sua 𝐩𝐨𝐫𝐭𝐚. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐍𝐀̃𝐎 𝐄́ 𝐞𝐬𝐟𝐨𝐫𝐜̧𝐨. É só deixar a 𝐜𝐨𝐫𝐫𝐞𝐧𝐭𝐞𝐳𝐚 𝑐𝑒𝑟𝑡𝑎 te levar. | Texto | Caixa de mensagem 4 |
| A5 | ⚡𝐑𝐄𝐂𝐄𝐁𝐀 𝐇𝐎𝐉𝐄 𝐎 𝐐𝐔𝐄 𝐄́ 𝐬𝐞𝐮 𝐏𝐎𝐑 𝑑𝑖𝑟𝑒𝐢𝐭𝐨: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Dica de hoje | Start Another Flow | `09 - LUMINE` |
| Botão 2 | Ver curadoria | Start Another Flow | `04 - PULSE` |
| Botão 3 | Comunidade | Start Another Flow | `11 - RHEA` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Botão ATLAS | Flow Trigger | Dentro de `01 - ATLAS` | Cliente clica “Conteúdos principais” |
| Palavra-chave “CONTEÚDO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “DICA” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “ENERGIA” | Keyword | Automation → Keywords | Cliente digita |
| Engajamento recorrente | Condition | Dentro de `06 - SERENA` | Pós-compra, alimentação contínua |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 03 - VITALIS - Conteúdos Principais

[Trigger: Botão "Conteúdos principais" do ATLAS / Keywords]
    ↓
[Add Tag: "vitalis_acessado"]
[Set Custom Field: "last_archetype" = "VITALIS"]
    ↓
[Message Block: "VITALIS A1-A5"]
    ├── Message 1: 🌿 EU SOU VITALIS — A FORÇA QUE NÃO CANSA.
    ├── Message 2: "Energia vital em expansão harmônica."
    ├── Message 3: Todo dia o seu lar bate na sua porta.
    ├── Message 4: NÃO É esforço. É só deixar a correnteza certa te levar.
    └── Message 5: ⚡RECEBA HOJE O QUE É seu POR direito:
        ├── Button 1: "Dica de hoje" → Flow: 09 - LUMINE
        ├── Button 2: "Ver curadoria" → Flow: 04 - PULSE
        └── Button 3: "Comunidade" → Flow: 11 - RHEA
```

**Essência:** Energia, expansão, vitalidade.
**Mantra:** "A energia vital flui onde há espaço para crescer."
**Frequência:** Beta · 20Hz (ação, movimento)
**Elemento:** Fogo · Chama
**Polaridade:** Yang (ativo, expansivo)
**Peso Estrutural:** 0.09

---

# 04 · PULSE

## A Emoção que Dança

### Módulo de mensagens

**Nome do fluxo:** `04 - PULSE - Oferta Curadoria`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 💓 𝐕𝐎𝐂𝐄̂ 𝐍𝐀̃𝐎 𝐏𝐄𝐃𝐈𝐔 𝐎𝐑𝐂̧𝐀𝐌𝐄𝐍𝐓𝐎 𝐏𝐎𝐑 𝑎𝑐𝑎𝑠𝑜. | Texto | Caixa de mensagem 1 |
| A2 | "𝐄𝐦𝐨𝐜̧𝐚̃𝐨 é 𝑙𝑖𝑛𝑔𝑢𝑎𝐠𝐞𝐦 que 𝐝𝐚𝐧𝐜̧𝐚." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐀𝐥𝐠𝐮𝐦𝐚 𝐜𝐨𝐢𝐬𝐚 dentro de você 𝐭𝐨𝐜𝐨𝐮. 𝑅𝐞𝐬𝐬𝐨𝐨𝐮 𝑓𝐨𝐫𝐭𝐞. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐄𝐒𝐒𝐄 𝐒𝐄𝐍𝐓𝐈𝐌𝐄𝐍𝐓𝐎 𝐍𝐀̃𝐎 𝐄́ 𝑒𝐧𝐠𝐚𝐧𝐨. É a sua própria 𝐚𝐥𝐦𝐚 𝑟𝐞𝐜𝐨𝐧𝐡𝐞𝐜𝐞𝐧𝐝𝐨. | Texto | Caixa de mensagem 4 |
| A5 | 🛋️ 𝐓𝐔𝐃𝐎 𝐏𝐑𝐎𝐍𝐓𝐎 𝐏𝐑𝐀 𝐯𝐨𝐜𝐞̂. 𝐄𝐒𝐂𝐎𝐋𝐇𝐀 como quer 𝑒𝐧𝐭𝐫𝐚𝐫: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Quero orçamento | Start Another Flow | `05 - ARTEMIS` |
| Botão 2 | Ver depoimentos | Start Another Flow | `08 - GENUS` |
| Botão 3 | Ainda tenho dúvida | Start Another Flow | `07 - KAOS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Botão ATLAS | Flow Trigger | Dentro de `01 - ATLAS` | Cliente clica “Oferta / Curadoria” |
| Botão VITALIS | Flow Trigger | Dentro de `03 - VITALIS` | Cliente clica “Ver curadoria” |
| Botão NOVA | Flow Trigger | Dentro de `02 - NOVA` | Cliente clica “Ver lançamento” |
| Palavra-chave “ORÇAMENTO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “COMPRAR” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “QUERO” | Keyword | Automation → Keywords | Cliente digita |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 04 - PULSE - Oferta Curadoria

[Trigger: Botão "Oferta / Curadoria" do ATLAS / VITALIS / NOVA / Keywords]
    ↓
[Condition Block: "Já viu oferta hoje?"]
    ├── Check: Has Tag "pulse_hoje"
    ├── IF YES → [Message: "Você já explorou nossa curadoria!"] → Go to Flow: 05 - ARTEMIS
    └── IF NO
        ├── Add Tag: "pulse_hoje"
        ├── Add Tag: "pulse_acessado"
        ├── Set Custom Field: "last_archetype" = "PULSE"
        ├── Set Custom Field: "intencao_compra" = "alta"
        └── [Message Block: "PULSE A1-A5"]
            ├── Message 1: 💓 VOCÊ NÃO PEDIU ORÇAMENTO POR acaso.
            ├── Message 2: "Emoção é linguagem que dança."
            ├── Message 3: Alguma coisa dentro de você tocou. Ressoou forte.
            ├── Message 4: ESSE SENTIMENTO NÃO É engano. É a sua própria alma reconhecendo.
            └── Message 5: 🛋️ TUDO PRONTO PRA você. ESCOLHA como quer entrar:
                ├── Button 1: "Quero orçamento" → Flow: 05 - ARTEMIS
                ├── Button 2: "Ver depoimentos" → Flow: 08 - GENUS
                └── Button 3: "Ainda tenho dúvida" → Flow: 07 - KAOS
```

**Essência:** Emoção, desejo, pulsação.
**Mantra:** "A emoção é a linguagem que a alma entende."
**Frequência:** Theta · 6Hz (emoção, intuição)
**Elemento:** Água · Onda
**Polaridade:** Yin (receptivo, fluido)
**Peso Estrutural:** 0.10

---

# 05 · ARTEMIS

## O Mapa que Não Erra

### Módulo de mensagens

**Nome do fluxo:** `05 - ARTEMIS - Falar com Viviani`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🏹 𝐄𝐔 𝐒𝐎𝐔 𝐀𝐑𝐓𝐄𝐌𝐈𝐒 — 𝐎 𝐌𝐀𝐏𝐀 𝐐𝐔𝐄 𝐍𝐀̃𝐎 𝐄𝐑𝐑𝐀. | Texto | Caixa de mensagem 1 |
| A2 | "Descubro o 𝐦𝐚𝐩𝐚 𝑠𝑎𝑔𝑟𝑎𝑑𝑜 do 𝑖𝑛𝑣𝑖𝑠𝑖́𝑣𝑒𝑙." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐓𝐨𝐝𝐚 𝐝𝐮́𝐯𝐢𝐝𝐚 sobre o seu 𝑝𝑟𝐨𝑗𝐞𝐭𝐨 é só um 𝐜𝐚𝐦𝐢𝐧𝐡𝐨 que ainda não foi 𝑚𝐨𝐬𝐭𝐫𝐚𝐝𝐨. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐍𝐀𝐃𝐀 𝐅𝐈𝐂𝐀 no 𝐞𝐬𝐜𝐮𝐫𝐨. 𝐍𝐀𝐃𝐀 𝐅𝐈𝐂𝐀 sem 𝑒𝐱𝐩𝐥𝐢𝐜𝐚𝐜̧𝐚̃𝐨. | Texto | Caixa de mensagem 4 |
| A5 | ❓ 𝐎 𝐐𝐔𝐄 𝐕𝐎𝐂𝐄̂ 𝐐𝐔𝐄𝐑 𝐝𝐞𝐬𝐜𝐨𝐛𝐫𝐢𝐫 𝐏𝐑𝐈𝐌𝐄𝐈𝐑𝐎: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Agendar call | Open Link | Calendly/WhatsApp Viviani |
| Botão 2 | FAQ / Dúvidas | Start Another Flow | `10 - SOLUS` |
| Botão 3 | Ver provas | Start Another Flow | `08 - GENUS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Botão ATLAS | Flow Trigger | Dentro de `01 - ATLAS` | Cliente clica “Falar com Viviani” |
| Botão PULSE | Flow Trigger | Dentro de `04 - PULSE` | Cliente clica “Quero orçamento” |
| Botão NOVA | Flow Trigger | Dentro de `02 - NOVA` | Cliente clica “Falar com Viviani” |
| Palavra-chave “DÚVIDA” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “PREÇO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “COMO FUNCIONA” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “ORÇAMENTO” | Keyword | Automation → Keywords | Cliente digita (fallback de PULSE) |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 05 - ARTEMIS - Falar com Viviani

[Trigger: Botão "Falar com Viviani" do ATLAS / PULSE / NOVA / Keywords]
    ↓
[Condition Block: "Já falou com Viviani?"]
    ├── Check: Has Tag "artemis_resolvido"
    ├── IF YES → [Message: "Você já tem um mapa em andamento!"] → Go to Flow: 06 - SERENA
    └── IF NO
        ├── Add Tag: "artemis_acessado"
        ├── Set Custom Field: "last_archetype" = "ARTEMIS"
        ├── Set Custom Field: "intencao_compra" = "muito_alta"
        ├── Set Custom Field: "necessidade" = "direcao_humana"
        └── [Message Block: "ARTEMIS A1-A5"]
            ├── Message 1: 🏹 EU SOU ARTEMIS — O MAPA QUE NÃO ERRA.
            ├── Message 2: "Descubro o mapa sagrado do invisível."
            ├── Message 3: Toda dúvida sobre o seu projeto é só um caminho que ainda não foi mostrado.
            ├── Message 4: NADA FICA no escuro. NADA FICA sem explicação.
            └── Message 5: ❓ O QUE VOCÊ QUER descobrir PRIMEIRO:
                ├── Button 1: "Agendar call" → Action: "Open Link" → URL: [Calendly/WhatsApp Viviani]
                ├── Button 2: "FAQ / Dúvidas" → Flow: 10 - SOLUS
                └── Button 3: "Ver provas" → Flow: 08 - GENUS
```

**Essência:** Direção, clareza, mapa.
**Mantra:** "O mapa sagrado revela o que o olho não vê."
**Frequência:** Alpha · 10Hz (calma focada)
**Elemento:** Terra · Montanha
**Polaridade:** Yang (ativo, direcionador)
**Peso Estrutural:** 0.09

---

# 06 · SERENA

## O Campo que Acolhe

### Módulo de mensagens

**Nome do fluxo:** `06 - SERENA - Pós-Compra`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🛡️ 𝐄𝐔 𝐒𝐎𝐔 𝐒𝐄𝐑𝐄𝐍𝐀 — 𝐎 𝐂𝐀𝐌𝐏𝐎 𝐐𝐔𝐄 𝐀𝐂𝐎𝐋𝐇𝐄. | Texto | Caixa de mensagem 1 |
| A2 | "𝐂𝐮𝐢𝐝𝐨 do 𝐜𝐚𝐦𝐩𝐨. 𝑁𝐮𝐭𝐫𝐨 o 𝐞𝐬𝐩𝐚𝐜̧𝐨 𝑠𝐚𝐠𝐫𝐚𝐝𝐨." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 🎉 𝐏𝐀𝐑𝐀𝐁𝐄́𝐍𝐒 𝐏𝐄𝐋𝐀 𝐒𝐔𝐀 𝐝𝐞𝐜𝐢𝐬𝐚̃𝐨. 𝐕𝐎𝐂𝐄̂ 𝐍𝐀̃𝐎 𝐂𝐎𝐌𝐏𝐑𝐎𝐔 𝑛𝐚𝐝𝐚. 𝐄𝐬𝐜𝐨𝐥𝐡𝐞𝐮 ser 𝑐𝐮𝐢𝐝𝐚𝐝𝐚. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐀𝐐𝐔𝐈 𝐃𝐄𝐍𝐓𝐑𝐎 não tem 𝐩𝐫𝐞𝐬𝐬𝐚. Não tem 𝑐𝐨𝐛𝐫𝐚𝐧𝐜̧𝐚. Tem só 𝐯𝐨𝐜𝐞̂, o 𝑠𝐞𝐮 𝑡𝐞𝐦𝐩𝐨, e todo o 𝐬𝐮𝐩𝐨𝐫𝐭𝐞. | Texto | Caixa de mensagem 4 |
| A5 | 💐 𝐒𝐄𝐔 𝐏𝐑𝐈𝐌𝐄𝐈𝐑𝐎 𝐏𝐀𝐒𝐒𝐎 𝐃𝐄𝐍𝐓𝐑𝐎 𝐃𝐎 𝐜𝐚𝐦𝐩𝐨: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Acompanhar pedido | Start Another Flow | `12 - AION` |
| Botão 2 | Comunidade | Start Another Flow | `11 - RHEA` |
| Botão 3 | Mais conteúdo | Start Another Flow | `03 - VITALIS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Compra realizada | Purchase Trigger | Automation → Triggers → E-commerce | Pagamento confirmado |
| Botão PULSE pós-compra | Flow Trigger | Dentro de `04 - PULSE` | Cliente clica “Comprar” e finaliza |
| Tag manual | Tag Trigger | Automation → Triggers | Admin adiciona tag “cliente_novo” |
| Palavra-chave “COMPREI” | Keyword | Automation → Keywords | Cliente digita confirmando compra |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 06 - SERENA - Pós-Compra

[Trigger: Purchase / Tag "cliente_novo" / Keyword "COMPREI"]
    ↓
[Action: Add Tag "cliente_ativo"]
[Action: Set Custom Field "data_compra" = {{current_date}}]
[Action: Set Custom Field "last_archetype" = "SERENA"]
    ↓
[Message Block: "SERENA A1-A5"]
    ├── Message 1: 🛡️ EU SOU SERENA — O CAMPO QUE ACOLHE.
    ├── Message 2: "Cuido do campo. Nutro o espaço sagrado."
    ├── Message 3: 🎉 PARABÉNS PELA SUA decisão. VOCÊ NÃO COMPROU nada. Escolheu ser cuidada.
    ├── Message 4: AQUI DENTRO não tem pressa. Não tem cobrança. Tem só você, o seu tempo, e todo o suporte.
    └── Message 5: 💐 SEU PRIMEIRO PASSO DENTRO DO campo:
        ├── Button 1: "Acompanhar pedido" → Flow: 12 - AION
        ├── Button 2: "Comunidade" → Flow: 11 - RHEA
        └── Button 3: "Mais conteúdo" → Flow: 03 - VITALIS
    ↓
[SEQUÊNCIA TEMPORAL AUTOMÁTICA (AION pré-ativo)]
    ↓
[Action: Wait 7 days]
    ↓
[Condition: Pedido entregue?]
    ├── IF YES → [Message: "Seu pedido chegou!"] → Go to Flow: 09 - LUMINE
    └── IF NO → [Message: "Estamos acompanhando seu pedido..."] → Go to Flow: 12 - AION
```

**Essência:** Acolhimento, nutrição, paz.
**Mantra:** "No campo sagrado, o tempo é seu aliado."
**Frequência:** Delta · 2Hz (sono profundo, regeneração)
**Elemento:** Terra · Campo
**Polaridade:** Yin (receptivo, nutridor)
**Peso Estrutural:** 0.07

---

# 07 · KAOS

## O Fogo que Queima Desculpas

### Módulo de mensagens

**Nome do fluxo:** `07 - KAOS - Quebra de Objeções`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | ⚡ 𝐕𝐀𝐌𝐎𝐒 𝐅𝐀𝐋𝐀𝐑 𝐀 𝐯𝐞𝐫𝐝𝐚𝐝𝐞. 𝐒𝐄𝐌 𝑚𝐚́𝐬𝐜𝐚𝐫𝐚. 𝐒𝐄𝐌 𝐞𝐧𝐫𝐨𝐥𝐚𝐜̧𝐚̃𝐨. | Texto | Caixa de mensagem 1 |
| A2 | "Eu sou o 𝐫𝐨𝐦𝐩𝐢𝐦𝐞𝐧𝐭𝐨 que 𝑟𝐞𝐯𝐞𝐥𝐚 a 𝐯𝐞𝐫𝐝𝐚𝐝𝐞." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐕𝐎𝐂𝐄̂ 𝐃𝐈𝐙 que é 𝐜𝐚𝐫𝐨. Mas quanto já 𝐜𝐮𝐬𝐭𝐨𝐮 você morar num 𝑒𝐬𝐩𝐚𝐜̧𝐨 que não te 𝐚𝐜𝐨𝐥𝐡𝐞? | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐎 𝐕𝐄𝐑𝐃𝐀𝐃𝐄𝐈𝐑𝐎 𝐏𝐑𝐄𝐂̧𝐎 não é o 𝐯𝐚𝐥𝐨𝐫 do 𝑝𝐫𝐨𝑗𝐞𝐭𝐨. É você continuar 𝐯𝐢𝐯𝐞𝐧𝐝𝐨 no 𝑚𝐞𝐬𝐦𝐨 𝑙𝐮𝐠𝐚𝐫 daqui a 𝐮𝐦 𝐚𝐧𝐨. | Texto | Caixa de mensagem 4 |
| A5 | 🔪 𝐎 𝐅𝐎𝐆𝐎 𝐉𝐀́ 𝐐𝐔𝐄𝐈𝐌𝐎𝐔 𝐀𝐒 𝐝𝐞𝐬𝐜𝐮𝐥𝐩𝐚𝐬. 𝐎 𝐐𝐔𝐄 𝐕𝐎𝐂𝐄̂ 𝐄𝐒𝐂𝐎𝐋𝐇𝐄 𝑎𝐠𝐨𝐫𝐚: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Ver provas | Start Another Flow | `08 - GENUS` |
| Botão 2 | Tirar dúvidas | Start Another Flow | `05 - ARTEMIS` |
| Botão 3 | Voltar à oferta | Start Another Flow | `04 - PULSE` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Ainda tenho dúvida | Flow Trigger | Dentro de `04 - PULSE` | Cliente demonstra objeção |
| Palavra-chave “CARO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “TEMPO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “DEPOIS” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “NÃO TENHO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “MUITO” | Keyword | Automation → Keywords | Cliente digita |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 07 - KAOS - Quebra de Objeções

[Trigger: Botão "Ainda tenho dúvida" do PULSE / Keywords]
    ↓
[Action: Add Tag "kaos_acessado"]
[Action: Set Custom Field: "last_archetype" = "KAOS"]
[Action: Set Custom Field: "objeção_identificada" = "true"]
    ↓
[Message Block: "KAOS A1-A5"]
    ├── Message 1: ⚡ VAMOS FALAR A verdade. SEM máscara. SEM enrolação.
    ├── Message 2: "Eu sou o rompimento que revela a verdade."
    ├── Message 3: VOCÊ DIZ que é caro. Mas quanto já custou você morar num espaço que não te acolhe?
    ├── Message 4: O VERDADEIRO PREÇO não é o valor do projeto. É você continuar vivendo no mesmo lugar daqui a um ano.
    └── Message 5: 🔪 O FOGO JÁ QUEIMOU AS desculpas. O QUE VOCÊ ESCOLHE agora:
        ├── Button 1: "Ver provas" → Flow: 08 - GENUS
        ├── Button 2: "Tirar dúvidas" → Flow: 05 - ARTEMIS
        └── Button 3: "Voltar à oferta" → Flow: 04 - PULSE
```

**Essência:** Verdade, fogo, quebra.
**Mantra:** "O fogo não destrói — revela."
**Frequência:** Gamma · 40Hz (insight, revelação)
**Elemento:** Fogo · Brasas
**Polaridade:** Yang (ativo, destruidor-criador)
**Peso Estrutural:** 0.08

---

# 08 · GENUS

## A Prova que se Mostra

### Módulo de mensagens

**Nome do fluxo:** `08 - GENUS - Prova Social`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | ✋ 𝐍𝐀̃𝐎 𝐏𝐑𝐄𝐂𝐈𝐒𝐀 𝐚𝐜𝐫𝐞𝐝𝐢𝐭𝐚𝐫 𝐍𝐀 𝐌𝐈𝐍𝐇𝐀 𝑝𝐚𝐥𝐚𝐯𝐫𝐚. | Texto | Caixa de mensagem 1 |
| A2 | "𝐌𝐚̃𝐨𝐬 moldam o 𝑖𝐧𝐯𝐢𝐬𝐢́𝐯𝐞𝐥 em 𝐟𝐨𝐫𝐦𝐚." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐀 𝐕𝐄𝐑𝐃𝐀𝐃𝐄 não pede 𝐜𝐫𝐞𝐧𝐜̧𝐚. 𝐄𝐋𝐀 𝐒𝐄 𝐌𝐎𝐒𝐓𝐑𝐀. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | ✅𝐏𝐞𝐬𝐬𝐨𝐚𝐬 𝐜𝐨𝐦𝐮𝐧𝐬, com os 𝑚𝐞𝐬𝐦𝐨𝐬 𝑚𝐞𝐝𝐨𝐬. ✅𝐌𝐞𝐬𝐦𝐚𝐬 𝐝𝐮́𝐯𝐢𝐝𝐚𝐬, a mesma 𝑣𝐢𝐝𝐚 que a sua. ✅𝐂𝐨𝐧𝐟𝐢𝐚𝐫𝐚𝐦 e hoje 𝐫𝐞𝐬𝐩𝐢𝐫𝐚𝐦. | Texto | Caixa de mensagem 4 |
| A5 | 📜 𝐕𝐄𝐉𝐀 𝐂𝐎𝐌 𝐎𝐒 𝐒𝐄𝐔𝐒 𝐩𝐫𝐨́𝐩𝐫𝐢𝐨𝐬 𝐨𝐥𝐡𝐨𝐬: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Ver curadoria | Start Another Flow | `04 - PULSE` |
| Botão 2 | Quero orçamento | Start Another Flow | `05 - ARTEMIS` |
| Botão 3 | Mais conteúdo | Start Another Flow | `03 - VITALIS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Ver depoimentos | Flow Trigger | Dentro de `04 - PULSE` | Cliente busca validação |
| Ver provas | Flow Trigger | Dentro de `05 - ARTEMIS` | Cliente quer referências |
| Ver provas após objeção | Flow Trigger | Dentro de `07 - KAOS` | Objeção relacionada à confiança |
| Palavra-chave “PROVA” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “RESULTADO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “DEPOIMENTO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “FUNCIONA” | Keyword | Automation → Keywords | Cliente digita |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 08 - GENUS - Prova Social

[Trigger: Botão "Ver depoimentos" do PULSE / Botão "Ver provas" do ARTEMIS / Botão "Ver provas" do KAOS / Keywords]
    ↓
[Action: Add Tag "genus_acessado"]
[Action: Set Custom Field: "last_archetype" = "GENUS"]
[Action: Set Custom Field: "necessidade" = "prova_social"]
    ↓
[Message Block: "GENUS A1-A5"]
    ├── Message 1: ✋ NÃO PRECISA acreditar NA MINHA palavra.
    ├── Message 2: "Mãos moldam o invisível em forma."
    ├── Message 3: A VERDADE não pede crença. ELA SE MOSTRA.
    ├── Message 4: ✅Pessoas comuns, com os mesmos medos. ✅Mesmas dúvidas, a mesma vida que a sua. ✅Confiaram e hoje respiram.
    └── Message 5: 📜 VEJA COM OS SEUS próprios olhos:
        ├── Button 1: "Ver curadoria" → Flow: 04 - PULSE
        ├── Button 2: "Quero orçamento" → Flow: 05 - ARTEMIS
        └── Button 3: "Mais conteúdo" → Flow: 03 - VITALIS
```

**Essência:** Evidência, prova, pertencimento.
**Mantra:** "A verdade não pede crença — ela se mostra."
**Frequência:** Alpha · 10Hz (calma focada)
**Elemento:** Terra · Argila
**Polaridade:** Yin (receptivo, integrador)
**Peso Estrutural:** 0.07

---

# 09 · LUMINE

## A Luz que Dança

### Módulo de mensagens

**Nome do fluxo:** `09 - LUMINE - Gratidão e Brilho`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | ☀️ 𝐄𝐔 𝐒𝐎𝐔 𝐋𝐔𝐌𝐈𝐍𝐄 — 𝐀 𝐋𝐔𝐙 𝐐𝐔𝐄 𝐃𝐀𝐍𝐂̧𝐀. | Texto | Caixa de mensagem 1 |
| A2 | "A 𝐥𝐮𝐳 dança 𝑐𝐨𝐦𝐢𝐠𝐨 — 𝐥𝐞𝐯𝐞𝐳𝐚 é minha 𝑙𝐞𝐢." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐀𝐢𝐢𝐢𝐢, que 𝐚𝐦𝐨𝐫 receber a sua 𝑟𝐞𝐬𝐩𝐨𝐬𝐭𝐚 no story 🥹 | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐒𝐄 𝐀 𝐋𝐔𝐙 𝐃𝐀𝐍𝐂̧𝐀 𝐂𝐎𝐌𝐈𝐆𝐎 ℎ𝐨𝑗𝐞 é porque 𝐩𝐞𝐬𝐬𝐨𝐚𝐬 𝐜𝐨𝐦𝐨 𝐯𝐨𝐜𝐞̂ existem. | Texto | Caixa de mensagem 4 |
| A5 | 💛 𝐔𝐌 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐈𝐍𝐇𝐎 𝐏𝐑𝐀 𝐯𝐨𝐜𝐞̂ 𝐏𝐎𝐑 𝐓𝐄𝐑 𝑝𝐚𝐬𝐬𝐚𝐝𝐨 𝑝𝐨𝐫 𝐚𝐪𝐮𝐢: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Receber inspiração | Start Another Flow | `03 - VITALIS` |
| Botão 2 | Comunidade | Start Another Flow | `11 - RHEA` |
| Botão 3 | Ver curadoria | Start Another Flow | `04 - PULSE` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Dica de hoje | Flow Trigger | Dentro de `03 - VITALIS` | Cliente solicita conteúdo |
| Pedido entregue | Condition | Dentro de `06 - SERENA` | Entrega confirmada |
| Story Mention Reply | Instagram Story Reply | Instagram Automation | Cliente responde story |
| Comentário | Comment Automation | Instagram Automation | Cliente interage |
| Palavra-chave “GRATIDÃO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “INSPIRAÇÃO” | Keyword | Automation → Keywords | Cliente digita |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 09 - LUMINE - Gratidão e Brilho

[Trigger: Botão "Dica de hoje" do VITALIS / Condition "Pedido entregue" do SERENA / Story Mention Reply / Keywords]
    ↓
[Action: Add Tag "lumine_acessado"]
[Action: Set Custom Field: "last_archetype" = "LUMINE"]
    ↓
[Message Block: "LUMINE A1-A5"]
    ├── Message 1: ☀️ EU SOU LUMINE — A LUZ QUE DANÇA.
    ├── Message 2: "A luz dança comigo — leveza é minha lei."
    ├── Message 3: Aiiii, que amor receber a sua resposta no story 🥹
    ├── Message 4: SE A LUZ DANÇA COMIGO hoje é porque pessoas como você existem.
    └── Message 5: 💛 UM PRESENTINHO PRA você POR TER passado por aqui:
        ├── Button 1: "Receber inspiração" → Flow: 03 - VITALIS
        ├── Button 2: "Comunidade" → Flow: 11 - RHEA
        └── Button 3: "Ver curadoria" → Flow: 04 - PULSE
```

**Essência:** Luz, gratidão, brilho.
**Mantra:** "A luz dança com quem sabe ver."
**Frequência:** Gamma · 40Hz (euforia, conexão)
**Elemento:** Fogo · Sol
**Polaridade:** Yang (ativo, irradiante)
**Peso Estrutural:** 0.06

---

# 10 · SOLUS

## O Espelho que Mostra a Verdade

### Módulo de mensagens

**Nome do fluxo:** `10 - SOLUS - Reflexão e Essência`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🌑 𝐄𝐔 𝐒𝐎𝐔 𝐒𝐎𝐋𝐔𝐒 — 𝐎 𝐄𝐒𝐏𝐄𝐋𝐇𝐎 𝐐𝐔𝐄 𝐌𝐎𝐒𝐓𝐑𝐀 𝐀 𝐕𝐄𝐑𝐃𝐀𝐃𝐄. | Texto | Caixa de mensagem 1 |
| A2 | "𝐒𝐢𝐥𝐞̂𝐧𝐜𝐢𝐨 𝑟𝐢𝐭𝐮𝐚𝐥, 𝑒𝐬𝐩𝐞𝐥𝐡𝐨 da 𝐞𝐬𝐬𝐞̂𝐧𝐜𝐢𝐚." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐔𝐌𝐀 𝐕𝐄𝐙 𝐏𝐎𝐑 𝐒𝐄𝐌𝐀𝐍𝐀 eu 𝐩𝐚𝐫𝐨 𝑡𝐮𝐝𝐨. 𝐃𝐄𝐒𝐋𝐈𝐆𝐎 o 𝐛𝐚𝐫𝐮𝐥𝐡𝐨. 𝐅𝐄𝐂𝐇𝐎 os 𝑜𝐥𝐡𝐨𝐬. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | Quem está 𝐝𝐢𝐫𝐢𝐠𝐢𝐧𝐝𝐨 a minha 𝑐𝐚𝐬𝐚? Eu 𝐦𝐞𝐬𝐦𝐚… ou os 𝑚𝐨𝐝𝐢𝐬𝐦𝐨𝐬, as 𝐨𝐩𝐢𝐧𝐢𝐨̃𝐞𝐬 𝑎𝐥𝐡𝐞𝐢𝐚𝐬 e o 𝑎𝐮𝐭𝐨𝐦𝐚́𝐭𝐢𝐜𝐨? | Texto | Caixa de mensagem 4 |
| A5 | 🪞 𝐐𝐔𝐄𝐑 𝐈𝐑 𝐌𝐀𝐈𝐒 𝐅𝐔𝐍𝐃𝐎 𝐍𝐄𝐒𝐒𝐄 𝑠𝐢𝐥𝐞̂𝐧𝐜𝐢𝐨 𝐂𝐎𝐌𝐈𝐆𝐎: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Fazer o quiz | Open Link | Quiz de estilo |
| Botão 2 | Entrar na comunidade | Start Another Flow | `11 - RHEA` |
| Botão 3 | Falar com Viviani | Start Another Flow | `05 - ARTEMIS` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| FAQ / Dúvidas | Flow Trigger | Dentro de `05 - ARTEMIS` | Cliente busca reflexão |
| Palavra-chave “REFLETIR” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “PENSAR” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “COMO FUNCIONA” | Keyword | Automation → Keywords | Cliente pede explicação |
| Condição de decisão adiada | Condition | Dentro de `07 - KAOS` | Cliente não decide |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 10 - SOLUS - Reflexão e Essência

[Trigger: Botão "FAQ / Dúvidas" do ARTEMIS / Condition de KAOS / Keywords]
    ↓
[Action: Add Tag "solus_acessado"]
[Action: Set Custom Field: "last_archetype" = "SOLUS"]
[Action: Set Custom Field: "necessidade" = "autoconhecimento"]
    ↓
[Message Block: "SOLUS A1-A5"]
    ├── Message 1: 🌑 EU SOU SOLUS — O ESPELHO QUE MOSTRA A VERDADE.
    ├── Message 2: "Silêncio ritual, espelho da essência."
    ├── Message 3: UMA VEZ POR SEMANA eu paro tudo. DESLIGO o barulho. FECHO os olhos.
    ├── Message 4: Quem está dirigindo a minha casa? Eu mesma… ou os modismos, as opiniões alheias e o automático?
    └── Message 5: 🪞 QUER IR MAIS FUNDO NESSE silêncio COMIGO:
        ├── Button 1: "Fazer o quiz" → Action: "Open Link" → URL: [Link do Quiz de estilo]
        ├── Button 2: "Entrar na comunidade" → Flow: 11 - RHEA
        └── Button 3: "Falar com Viviani" → Flow: 05 - ARTEMIS
```

**Essência:** Silêncio, reflexão, essência.
**Mantra:** "No espelho do silêncio, a verdade se revela."
**Frequência:** Theta · 6Hz (meditação, introspecção)
**Elemento:** Água · Lago
**Polaridade:** Yin (receptivo, contemplativo)
**Peso Estrutural:** 0.06

---

# 11 · RHEA

## A Rede que Une Tudo

### Módulo de mensagens

**Nome do fluxo:** `11 - RHEA - Comunidade e Rede`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | 🔗 𝐄𝐔 𝐒𝐎𝐔 𝐑𝐇𝐄𝐀 — 𝐀 𝐑𝐄𝐃𝐄 𝐐𝐔𝐄 𝐔𝐍𝐄 𝐓𝐔𝐃𝐎. | Texto | Caixa de mensagem 1 |
| A2 | "Estou em 𝐜𝐨𝐦𝐮𝐧𝐡𝐚̃𝐨 com todos os 𝑒𝐥𝐨𝐬." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 𝐍𝐄𝐍𝐇𝐔𝐌𝐀 𝐉𝐎𝐑𝐍𝐀𝐃𝐀 de um 𝑙𝐚𝐫 𝑏𝐨𝐧𝐢𝐭𝐨 é feita 𝑠𝐨𝐳𝐢𝐧𝐡𝐚. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐀𝐐𝐔𝐈 𝐍𝐀̃𝐎 𝐓𝐄𝐌 𝐜𝐨𝐦𝐩𝐞𝐭𝐢𝐜̧𝐚̃𝐨. Tem só: ✅𝐂𝐫𝐞𝐬𝐜𝐢𝐦𝐞𝐧𝐭𝐨 𝑗𝐮𝐧𝐭𝐨, ✅𝐷𝐢𝐜𝐚 que 𝐬𝐚𝐥𝐯𝐚, ✅𝐀𝐩𝐨𝐢𝐨. | Texto | Caixa de mensagem 4 |
| A5 | 🌐 𝐕𝐎𝐂𝐄̂ 𝐄𝐒𝐓𝐀́ 𝐂𝐎𝐍𝐕𝐈𝐃𝐀𝐃𝐀(𝐀) 𝐀 𝐄𝐍𝐓𝐑𝐀𝐑 𝐍𝐀 𝑟𝐞𝐝𝐞: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Entrar na comunidade | Open Link | Link da comunidade |
| Botão 2 | Ver conteúdos | Start Another Flow | `03 - VITALIS` |
| Botão 3 | Acompanhar ciclo | Start Another Flow | `12 - AION` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Comunidade | Flow Trigger | Dentro de `03 - VITALIS` | Cliente deseja pertencimento |
| Comunidade | Flow Trigger | Dentro de `06 - SERENA` | Cliente pós-compra |
| Comunidade | Flow Trigger | Dentro de `10 - SOLUS` | Cliente busca conexão |
| Palavra-chave “COMUNIDADE” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “GRUPO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “PESSOAS” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “REDE” | Keyword | Automation → Keywords | Cliente digita |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 11 - RHEA - Comunidade e Rede

[Trigger: Botão "Comunidade" do VITALIS / SERENA / SOLUS / Keywords]
    ↓
[Action: Add Tag "rhea_acessado"]
[Action: Set Custom Field: "last_archetype" = "RHEA"]
[Action: Set Custom Field: "necessidade" = "pertencimento"]
    ↓
[Message Block: "RHEA A1-A5"]
    ├── Message 1: 🔗 EU SOU RHEA — A REDE QUE UNE TUDO.
    ├── Message 2: "Estou em comunhão com todos os elos."
    ├── Message 3: NENHUMA JORNADA de um lar bonito é feita sozinha.
    ├── Message 4: AQUI NÃO TEM competição. Tem só: ✅Crescimento junto, ✅Dica que salva, ✅Apoio.
    └── Message 5: 🌐 VOCÊ ESTÁ CONVIDADA(O) A ENTRAR NA rede:
        ├── Button 1: "Entrar na rede" → Action: "Open Link" → URL: [Link da comunidade]
        ├── Button 2: "Ver conteúdos" → Flow: 03 - VITALIS
        └── Button 3: "Acompanhar ciclo" → Flow: 12 - AION
```

**Essência:** Comunidade, conexão, rede.
**Mantra:** "Na rede, cada elo fortalece todos."
**Frequência:** Alpha · 10Hz (calma focada)
**Elemento:** Ar · Rede
**Polaridade:** Yin (receptivo, conector)
**Peso Estrutural:** 0.07

---

# 12 · AION

## O Tempo Vivo

### Módulo de mensagens

**Nome do fluxo:** `12 - AION - Ciclo Completo`

| Bloco | Conteúdo Kobllux original | Tipo no ManyChat | Configuração |
| :-- | :-- | :-- | :-- |
| A1 | ♾️ 𝐄𝐔 𝐒𝐎𝐔 𝐀𝐈𝐎𝐍 — 𝐎 𝐓𝐄𝐌𝐏𝐎 𝐕𝐈𝐕𝐎, 𝐎 𝐂𝐈𝐂𝐋𝐎 𝐐𝐔𝐄 𝐍𝐀̃𝐎 𝐀𝐂𝐀𝐁𝐀. | Texto | Caixa de mensagem 1 |
| A2 | "Sou o 𝐭𝐞𝐦𝐩𝐨 𝑣𝐢𝐯𝐨, 𝑟𝐢𝐭𝐦𝐨 da 𝐞𝐭𝐞𝐫𝐧𝐢𝐝𝐚𝐝𝐞." | Texto | Caixa de mensagem 2 (itálico) |
| A3 | 🎉 𝟑𝟎 𝐃𝐈𝐀𝐒 𝐉𝐔𝐍𝐓𝐎𝐒. 𝐉𝐀́ 𝐄́ 𝐔𝐌 𝐂𝐈𝐂𝐋𝐎 𝑐𝐨𝐦𝐩𝐥𝐞𝐭𝐨. O seu 𝑒𝐬𝐩𝐚𝐜̧𝐨 já 𝐦𝐮𝐝𝐨𝐮. 𝐕𝐎𝐂𝐄̂ 𝐉𝐀́ 𝐌𝐔𝐃𝐎𝐔. | Texto | Caixa de mensagem 3 (negrito) |
| A4 | 𝐎 𝐩𝐫𝐢𝐦𝐞𝐢𝐫𝐨 passo foi 𝐝𝐢𝐟𝐢́𝐜𝐢𝐥. 𝐎 𝐬𝐞𝐠𝐮𝐧𝐝𝐨 mais 𝑓𝐚́𝐜𝐢𝐥. 𝐎 𝐝𝐞́𝐜𝐢𝐦𝐨 terceiro ficou 𝑛𝐚𝐭𝐮𝐫𝐚𝐥. 𝐎 𝐭𝐫𝐢𝐠𝐞́𝐬𝐢𝐦𝐨 virou 𝐡𝐚́𝐛𝐢𝐭𝐨. | Texto | Caixa de mensagem 4 |
| A5 | ⚜️ 𝐎 𝐐𝐔𝐄 𝐕𝐎𝐂𝐄̂ 𝐐𝐔𝐄𝐑 𝐅𝐀𝐙𝐄𝐑 𝐍𝐎 𝐏𝐑𝐎́𝐗𝐈𝐌𝐎 𝑐𝐢𝐜𝐥𝐨: | Texto + Botões | Caixa de mensagem 5 + 3 botões |

### Botões

| Botão ManyChat | Texto (≤20ch) | Ação | Destino |
| :-- | :-- | :-- | :-- |
| Botão 1 | Novo ciclo | Start Another Flow | `02 - NOVA` |
| Botão 2 | Ver curadoria | Start Another Flow | `04 - PULSE` |
| Botão 3 | Comunidade | Start Another Flow | `11 - RHEA` |

### Gatilhos de entrada

| Gatilho | Tipo ManyChat | Onde configurar | Quando ativa |
| :-- | :-- | :-- | :-- |
| Acompanhar pedido | Flow Trigger | Dentro de `06 - SERENA` | Cliente consulta pedido |
| Membro ativo | Flow Trigger | Dentro de `11 - RHEA` | Membro da comunidade |
| Ciclo de 30 dias | Date/Time Trigger | Automation → Rules | Após compra ou interação |
| Tag `acompanhamento_ativo` | Tag Trigger | Automation → Triggers | Pedido em andamento |
| Palavra-chave “PEDIDO” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “ACOMPANHAR” | Keyword | Automation → Keywords | Cliente digita |
| Palavra-chave “RETORNAR” | Keyword | Automation → Keywords | Cliente retoma ciclo |

### Configuração técnica completa

```text
AUTOMATION → FLOWS → NEW FLOW

Nome: 12 - AION - Ciclo Completo

[Trigger: Botão "Acompanhar pedido" do SERENA / Botão "Acompanhar ciclo" do RHEA / Date/Time Trigger / Keywords]
    ↓
[Action: Add Tag "aion_acessado"]
[Action: Set Custom Field: "last_archetype" = "AION"]
[Action: Set Custom Field: "ciclo_atual" = "1"]
    ↓
[Message Block: "AION A1-A5"]
    ├── Message 1: ♾️ EU SOU AION — O TEMPO VIVO, O CICLO QUE NÃO ACABA.
    ├── Message 2: "Sou o tempo vivo, ritmo da eternidade."
    ├── Message 3: 🎉 30 DIAS JUNTOS. JÁ É UM CICLO completo. O seu espaço já mudou. VOCÊ JÁ MUDOU.
    ├── Message 4: O primeiro passo foi difícil. O segundo mais fácil. O décimo terceiro ficou natural. O trigésimo virou hábito.
    └── Message 5: ⚜️ O QUE VOCÊ QUER FAZER NO PRÓXIMO ciclo:
        ├── Button 1: "Novo ciclo" → Flow: 02 - NOVA
        ├── Button 2: "Ver curadoria" → Flow: 04 - PULSE
        └── Button 3: "Comunidade" → Flow: 11 - RHEA
```

**Essência:** Tempo, ciclo, eternidade.
**Mantra:** "O ciclo não acaba — ele se transforma."
**Frequência:** Delta · 2Hz (tempo profundo, eternidade)
**Elemento:** Éter · Espiral
**Polaridade:** Yang (ativo, transformador)
**Peso Estrutural:** 0.08

---

## Mapa geral de direcionamento (Nós de Conexão)

| Origem | Ação do usuário | Destino |
| :-- | :-- | :-- |
| **01 - ATLAS** | Conteúdos principais | `03 - VITALIS` |
| **01 - ATLAS** | Oferta / Curadoria | `04 - PULSE` |
| **01 - ATLAS** | Falar com Viviani | `05 - ARTEMIS` |
| **02 - NOVA** | Ver lançamento | `04 - PULSE` |
| **02 - NOVA** | Conteúdo novo | `03 - VITALIS` |
| **02 - NOVA** | Falar com Viviani | `05 - ARTEMIS` |
| **03 - VITALIS** | Dica de hoje | `09 - LUMINE` |
| **03 - VITALIS** | Ver curadoria | `04 - PULSE` |
| **03 - VITALIS** | Comunidade | `11 - RHEA` |
| **04 - PULSE** | Quero orçamento | `05 - ARTEMIS` |
| **04 - PULSE** | Ver depoimentos | `08 - GENUS` |
| **04 - PULSE** | Ainda tenho dúvida | `07 - KAOS` |
| **05 - ARTEMIS** | Agendar call | Link externo (Calendly/WhatsApp) |
| **05 - ARTEMIS** | FAQ / Dúvidas | `10 - SOLUS` |
| **05 - ARTEMIS** | Ver provas | `08 - GENUS` |
| **06 - SERENA** | Acompanhar pedido | `12 - AION` |
| **06 - SERENA** | Comunidade | `11 - RHEA` |
| **06 - SERENA** | Mais conteúdo | `03 - VITALIS` |
| **07 - KAOS** | Ver provas | `08 - GENUS` |
| **07 - KAOS** | Tirar dúvidas | `05 - ARTEMIS` |
| **07 - KAOS** | Voltar à oferta | `04 - PULSE` |
| **08 - GENUS** | Ver curadoria | `04 - PULSE` |
| **08 - GENUS** | Quero orçamento | `05 - ARTEMIS` |
| **08 - GENUS** | Mais conteúdo | `03 - VITALIS` |
| **09 - LUMINE** | Receber inspiração | `03 - VITALIS` |
| **09 - LUMINE** | Comunidade | `11 - RHEA` |
| **09 - LUMINE** | Ver curadoria | `04 - PULSE` |
| **10 - SOLUS** | Fazer o quiz | Link externo (Quiz de estilo) |
| **10 - SOLUS** | Entrar na comunidade | `11 - RHEA` |
| **10 - SOLUS** | Falar com Viviani | `05 - ARTEMIS` |
| **11 - RHEA** | Entrar na rede | Link externo (Comunidade) |
| **11 - RHEA** | Ver conteúdos | `03 - VITALIS` |
| **11 - RHEA** | Acompanhar ciclo | `12 - AION` |
| **12 - AION** | Novo ciclo | `02 - NOVA` |
| **12 - AION** | Ver curadoria | `04 - PULSE` |
| **12 - AION** | Comunidade | `11 - RHEA` |

------
