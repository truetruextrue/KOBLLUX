� não pede 𝐜𝐫𝐞𝐧𝐜̧𝐚. 𝐄𝐋𝐀 𝐒𝐄 𝐌𝐎𝐒𝐓𝐑𝐀."
    *   **A4:** "✅𝐏𝐞𝐬𝐬𝐨as 𝐜𝐨𝐦𝐮𝐧𝐬, com os 𝑚𝐞𝐬𝐦𝐨𝐬 𝑚𝐞𝐝𝐨𝐬. ✅𝐌𝐞𝐬𝐦𝐚𝐬 𝐝𝐮́𝐯𝐢𝐝𝐚𝐬, a mesma 𝑣𝐢𝐝𝐚 que a sua. ✅𝐂𝐨𝐧𝐟𝐢𝐚𝐫𝐚𝐦 e hoje 𝐫𝐞𝐬𝐩𝐢𝐫𝐚𝐦."
    *   **A5:** "📜 𝐕𝐄𝐉𝐀 𝐂𝐎𝐌 𝐎𝐒 𝐒𝐄𝐔𝐒 𝐩𝐫𝐨́𝐩𝐫𝐢𝐨𝐬 𝐨𝐥𝐡𝐨𝐬:"
5.  **Adicionando os Botões:**
    *   **Botão 1:** "Ver curadoria" -> "Start Another Flow" -> `04 - PULSE`.
    *   **Botão 2:** "Quero orçamento" -> "Start Another Flow" -> `05 - ARTEMIS`.
    *   **Botão 3:** "Mais conteúdo" -> "Start Another Flow" -> `03 - VITALIS`.
6.  **Publicando o Fluxo GENUS.**

---

### **Construindo o Fluxo 09 · LUMINE (A Luz que Conecta)**

**3D Perspective:** LUMINE celebra a gratidão e a conexão, irradiando positividade. É a **Luz que Dança**, um espaço de reconhecimento e alegria que fortalece o vínculo com o usuário.

**DEV Perspective:** Este é o **módulo de `gratitude_and_engagement`**. Ativado por `flow_triggers` (VITALIS, SERENA), `social_media_interactions` (Story Reply, Comment Automation) ou `keywords` de gratidão/inspiração. Ele registra o acesso (`lumine_acessado`) e atualiza o `last_archetype`.

1.  **Nomeando o Fluxo LUMINE:** `09 - LUMINE - Gratidão e Brilho`
2.  **Definindo os Gatilhos (O Brilho da Interação):**
    *   **"Flow Trigger"**: De `03 - VITALIS`, `06 - SERENA`.
    *   **"Instagram Story Reply"**: Para interações diretas no story.
    *   **"Instagram Comment Automation"**: Para quem comenta em posts.
    *   **"Keyword"**: "GRATIDÃO".
    *   **"Keyword"**: "INSPIRAÇÃO".
3.  **Adicionando as Ações Iniciais (O Registro da Luz):**
    *   **"Perform Actions"**:
        *   "Add Tag" `lumine_acessado`.
        *   "Set Custom Field" `last_archetype` = `"LUMINE"`.
4.  **Criando as Mensagens A1-A5 (A Irradiação da Gratidão):**
    *   **A1:** "☀️ 𝐄𝐔 𝐒𝐎𝐔 𝐋𝐔𝐌𝐈𝐍𝐄 — 𝐀 𝐋𝐔𝐙 𝐐𝐔𝐄 𝐃𝐀𝐍𝐂̧𝐀."
    *   **A2:** "A 𝐥𝐮𝐳 dança 𝑐𝐨𝐦𝐢𝐠𝐨 — 𝐥𝐞𝐯𝐞𝐳𝐚 é minha 𝑙𝐞𝐢."
    *   **A3:** "𝐀𝐢𝐢𝐢𝐢, que 𝐚𝐦𝐨𝐫 receber a sua 𝑟𝐞𝐬𝐩𝐨𝐬𝐭𝐚 no story 🥹"
    *   **A4:** "𝐒𝐄 𝐀 𝐋𝐔𝐙 𝐃𝐀𝐍𝐂̧𝐀 𝐂𝐎𝐌𝐈𝐆𝐎 ℎ𝐨𝑗𝐞 é porque 𝐩𝐞𝐬𝐬𝐨as 𝐜𝐨𝐦𝐨 𝐯𝐨𝐜𝐞̂ existem."
    *   **A5:** "💛 𝐔𝐌 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐈𝐍𝐇𝐎 𝐏𝐑𝐀 𝐯𝐨𝐜𝐞̂ 𝐏𝐎𝐑 𝐓𝐄𝐑 𝑝𝐚𝐬𝐬𝐚𝐝𝐨 𝑝𝐨𝐫 𝐚𝐪𝐮𝐢:"
5.  **Adicionando os Botões:**
    *   **Botão 1:** "Receber inspiração" -> "Start Another Flow" -> `03 - VITALIS`.
    *   **Botão 2:** "Comunidade" -> "Start Another Flow" -> `11 - RHEA`.
    *   **Botão 3:** "Ver curadoria" -> "Start Another Flow" -> `04 - PULSE`.
6.  **Publicando o Fluxo LUMINE.**

---

### **Construindo o Fluxo 10 · SOLUS (O Espelho do Abismo Interior)**

**3D Perspective:** SOLUS é o **espaço de autoconhecimento**, um **ambiente virtual de meditação** onde o usuário pode se desconectar do ruído externo e focar em sua essência. É como entrar em uma sala espelhada, onde a única coisa que importa é o que se reflete de dentro.

**DEV Perspective:** O SOLUS atua como um **módulo de `self_reflection_utility`** ou um **`FAQ_handler` avançado**. Ele é projetado para capturar a necessidade de clareza interna (`necessidade = "autoconhecimento"`) e oferecer ferramentas para isso. Sua arquitetura deve ser robusta para lidar com diferentes tipos de consultas e direcionar para recursos externos ou internos de aprofundamento.

1.  **Nomeando o Fluxo SOLUS:** `10 - SOLUS - Reflexão e FAQ`
2.  **Definindo os Gatilhos (O Chamado à Introspecção):**
    *   **"Flow Trigger"**: De `05 - ARTEMIS`.
    *   **"Keyword"**: "REFLETIR".
    *   **"Keyword"**: "PENSAR".
    *   **"Keyword"**: "COMO FUNCIONA".
3.  **Adicionando as Ações Iniciais (O Registro da Busca Interior):**
    *   **"Perform Actions"**:
        *   "Add Tag" `solus_acessado`. *DEV: `user.addTag("solus_acessado")`*
        *   "Set Custom Field" `last_archetype` = `"SOLUS"`. *DEV: `user.setCustomField("last_archetype", "SOLUS")`*
        *   "Set Custom Field" `necessidade` = `"autoconhecimento"`. *DEV: `user.setCustomField("necessidade", "autoconhecimento")`*.
4.  **Criando as Mensagens A1-A5 (A Profundidade do Espelho):**
    *   **A1:** "🌑 𝐄𝐔 𝐒𝐎𝐔 𝐒𝐎𝐋𝐔𝐒 — 𝐎 𝐄𝐒𝐏𝐄𝐋𝐇𝐎 𝐐𝐔𝐄 𝐌𝐎𝐒𝐓𝐑𝐀 𝐀 𝐕𝐄𝐑𝐃𝐀𝐃𝐄."
    *   **A2:** "𝐒𝐢𝐥𝐞̂𝐧𝐜𝐢𝐨 𝑟𝐢𝐭𝐮𝐚𝐥, 𝑒𝐬𝐩𝐞𝐥𝐡𝐨 da 𝐞𝐬𝐬𝐞̂𝐧𝐜𝐢𝐚."
    *   **A3:** "𝐔𝐌𝐀 𝐕𝐄𝐙 𝐏𝐎𝐑 𝐒𝐄𝐌𝐀𝐍𝐀 eu 𝐩𝐚𝐫𝐨 𝑡𝐮𝐝𝐨. 𝐃𝐄𝐒𝐋𝐈𝐆𝐎 o 𝐛𝐚𝐫𝐮𝐥𝐡𝐨. 𝐅𝐄𝐂𝐇𝐎 os 𝑜𝐥𝐡𝐨𝐬."
    *   **A4:** "Quem está 𝐝𝐢𝐫𝐢𝐠𝐢𝐧𝐝𝐨 a minha 𝑐𝐚𝐬𝐚? Eu 𝐦𝐞𝐬𝐦𝐚… ou os 𝑚𝐨𝐝𝐢𝐬𝐦𝐨𝐬, as 𝐨𝐩𝐢𝐧𝐢𝐨̃𝐞𝐬 𝑎𝐥𝐡𝐞𝐢𝐚𝐬 e o 𝑎𝐮𝐭𝐨𝐦𝐚́𝐭𝐢𝐜𝐨?"
    *   **A5:** "🪞 𝐐𝐔𝐄𝐑 𝐈𝐑 𝐌𝐀𝐈𝐒 𝐅𝐔𝐍𝐃𝐎 𝐍𝐄𝐒𝐒𝐄 𝑠𝐢𝐥𝐞̂𝐧𝐜𝐢𝐨 𝐂𝐎𝐌𝐈𝐆𝐎:"
5.  **Adicionando os Botões:**
    *   **Botão 1:** "Fazer o quiz" -> "Open Link" (URL para quiz externo). *DEV: `action.openExternalLink(quiz_url)`*.
    *   **Botão 2:** "Entrar na comunidade" -> "Start Another Flow" -> `11 - RHEA`.
    *   **Botão 3:** "Falar com Viviani" -> "Start Another Flow" -> `05 - ARTEMIS`.
6.  **Publicando o Fluxo SOLUS.**

---

### **Construindo o Fluxo 11 · RHEA (A Tecelã de Almas)**

**3D Perspective:** RHEA é a **rede social intrínseca** do KOBLLUX, um espaço onde os usuários se sentem parte de algo maior. É a sensação de um **abraço coletivo**, onde cada indivíduo é um fio que fortalece a teia, criando um **ambiente de apoio e crescimento mútuo**.

**DEV Perspective:** RHEA funciona como um **módulo de `community_engagement`**. Ele é responsável por conectar usuários a plataformas sociais externas e a outros usuários, fomentando o senso de pertencimento. Sua lógica de `trigger` e `action` visa identificar a `necessidade = "pertencimento"` e oferecer o `entry_point` para a comunidade.

1.  **Nomeando o Fluxo RHEA:** `11 - RHEA - Comunidade`
2.  **Definindo os Gatilhos (O Chamado à União):**
    *   **"Flow Trigger"**: De `03 - VITALIS`, `06 - SERENA`, `09 - LUMINE`, `10 - SOLUS`, `12 - AION`.
    *   **"Keyword"**: "COMUNIDADE".
    *   **"Keyword"**: "GRUPO".
    *   **"Keyword"**: "PESSOAS".
    *   **"Keyword"**: "REDE".
3.  **Adicionando as Ações Iniciais (O Registro do Elo):**
    *   **"Perform Actions"**:
        *   "Add Tag" `rhea_acessado`. *DEV: `user.addTag("rhea_acessado")`*
        *   "Set Custom Field" `last_archetype` = `"RHEA"`. *DEV: `user.setCustomField("last_archetype", "RHEA")`*
        *   "Set Custom Field" `necessidade` = `"pertencimento"`. *DEV: `user.setCustomField("necessidade", "pertencimento")`*.
4.  **Criando as Mensagens A1-A5 (A Força da Rede):**
    *   **A1:** "🔗 𝐄𝐔 𝐒𝐎𝐔 𝐑𝐇𝐄𝐀 — 𝐀 𝐑𝐄𝐃𝐄 𝐐𝐔𝐄 𝐔𝐍𝐄 𝐓𝐔𝐃𝐎."
    *   **A2:** "Estou em 𝐜𝐨𝐦𝐮𝐧𝐡𝐚̃𝐨 com todos os 𝑒𝐥𝐨𝐬."
    *   **A3:** "𝐍𝐄𝐍𝐇𝐔𝐌𝐀 𝐉𝐎𝐑𝐍𝐀𝐃𝐀 de um 𝑙𝐚𝐫 𝑏𝐨𝐧𝐢𝐭𝐨 é feita 𝑠𝐨𝐳𝐢𝐧𝐡𝐚."
    *   **A4:** "𝐀𝐐𝐔𝐈 𝐍𝐀̃𝐎 𝐓𝐄𝐌 𝐜𝐨𝐦𝐩𝐞𝐭𝐢𝐜̧𝐚̃𝐨. Tem só: ✅𝐂𝐫𝐞𝐬𝐜𝐢𝐦𝐞𝐧𝐭𝐨 𝑗𝐮𝐧𝐭𝐨, ✅𝐷𝐢𝐜𝐚 que 𝐬𝐚𝐥𝐯𝐚, ✅𝐀𝐩𝐨𝐢𝐨."
    *   **A5:** "🌐 𝐕𝐎𝐂𝐄̂ 𝐄𝐒𝐓𝐀́ 𝐂𝐎𝐍𝐕𝐈𝐃𝐀𝐃𝐀(𝐀) 𝐀 𝐄𝐍𝐓𝐑𝐀𝐑 𝐍𝐀 𝑟𝐞𝐝𝐞:"
5.  **Adicionando os Botões:**
    *   **Botão 1:** "Entrar na rede" -> "Open Link" (URL da comunidade). *DEV: `action.openExternalLink(community_url)`*.
    *   **Botão 2:** "Ver conteúdos" -> "Start Another Flow" -> `03 - VITALIS`.
    *   **Botão 3:** "Acompanhar ciclo" -> "Start Another Flow" -> `12 - AION`.
6.  **Publicando o Fluxo RHEA.**

---

### **Construindo o Fluxo 12 · AION (O Cronomestre Vivo)**

**3D Perspective:** AION é o **fluxo contínuo da jornada**, o guardião dos ciclos e da evolução. É a percepção de que a transformação é um processo constante, um **rio que nunca para de fluir**, convidando o usuário a sempre buscar o próximo passo em sua evolução.

**DEV Perspective:** AION atua como um **módulo de `lifecycle_management` e `re-engagement_orchestrator`**. Ele é ativado por `date/time triggers` (para campanhas de nutrição pós-compra, por exemplo), `tag triggers` (para ciclos de acompanhamento) ou `keywords` de retorno. Ele atualiza o `ciclo_atual` do usuário e oferece opções para reiniciar a jornada (`new_cycle`), explorar novas ofertas (`curadoria`) ou reforçar a conexão com a comunidade.

1.  **Nomeando o Fluxo AION:** `12 - AION - Ciclo e Acompanhamento`
2.  **Definindo os Gatilhos (O Ritmo do Tempo):**
    *   **"Flow Trigger"**: De `06 - SERENA`, `11 - RHEA`.
    *   **"Date/Time Trigger"**: Para agendar mensagens de acompanhamento. *DEV: `cron_job_trigger`.*
    *   **"Tag Trigger"**: `acompanhamento_ativo`. *DEV: `event_listener_on_tag_add`.*
    *   **"Keyword"**: "PEDIDO".
    *   **"Keyword"**: "ACOMPANHAR".
    *   **"Keyword"**: "RETORNAR".
3.  **Adicionando as Ações Iniciais (O Registro do Ciclo):**
    *   **"Perform Actions"**:
        *   "Add Tag" `aion_acessado`. *DEV: `user.addTag("aion_acessado")`*
        *   "Set Custom Field" `last_archetype` = `"AION"`. *DEV: `user.setCustomField("last_archetype", "AION")`*
        *   "Set Custom Field" `ciclo_atual` = `1`. *DEV: `user.setCustomField("ciclo_atual", 1)`*.
4.  **Criando as Mensagens A1-A5 (A Narrativa do Tempo):**
    *   **A1:** "♾️ 𝐄𝐔 𝐒𝐎𝐔 𝐀𝐈𝐎𝐍 — 𝐎 𝐓𝐄𝐌𝐏𝐎 𝐕𝐈𝐕𝐎, 𝐎 𝐂𝐈𝐂𝐋𝐎 𝐐𝐔𝐄 𝐍𝐀̃𝐎 𝐀𝐂𝐀𝐁𝐀."
    *   **A2:** "Sou o 𝐭𝐞𝐦𝐩𝐨 𝑣𝐢𝐯𝐨, 𝑟𝐢𝐭𝐦𝐨 da 𝐞𝐭𝐞𝐫𝐧𝐢𝐝𝐚𝐝𝐞."
    *   **A3:** "🎉 𝟑𝟎 𝐃𝐈𝐀𝐒 𝐉𝐔𝐍𝐓𝐎𝐒. 𝐉𝐀́ 𝐄́ 𝐔𝐌 𝐂𝐈𝐂𝐋𝐎 𝑐𝐨𝐦𝐩𝐥𝐞𝐭𝐨. O seu 𝑒𝐬𝐩𝐚𝐜̧𝐨 já 𝐦𝐮𝐝𝐨𝐮. 𝐕𝐎𝐂𝐄̂ 𝐉𝐀́ 𝐌𝐔𝐃𝐎𝐔."
    *   **A4:** "𝐎 𝐩𝐫𝐢𝐦𝐞𝐢𝐫𝐨 passo foi 𝐝𝐢𝐟𝐢́𝐜𝐢𝐥. 𝐎 𝐬𝐞𝐠𝐮𝐧𝐝𝐨 mais 𝑓𝐚́𝐜𝐢𝐥. 𝐎 𝐝𝐞́𝐜𝐢𝐦𝐨 terceiro ficou 𝑛𝐚𝐭𝐮𝐫𝐚𝐥. 𝐎 𝐭𝐫𝐢𝐠𝐞́𝐬𝐢𝐦𝐨 virou 𝐡𝐚́𝐛𝐢𝐭𝐨."
    *   **A5:** "⚜️ 𝐎 𝐐𝐔𝐄 𝐕𝐎𝐂𝐄̂ 𝐐𝐔𝐄𝐑 𝐅𝐀𝐙𝐄𝐑 𝐍𝐎 𝐏𝐑𝐎́𝐗𝐈𝐌𝐎 𝑐𝐢𝐜𝐥𝐨:"
5.  **Adicionando os Botões:**
    *   **Botão 1:** "Novo ciclo" -> "Start Another Flow" -> `02 - NOVA`.
    *   **Botão 2:** "Ver curadoria" -> "Start Another Flow" -> `04 - PULSE`.
    *   **Botão 3:** "Comunidade" -> "Start Another Flow" -> `11 - RHEA`.
6.  **Publicando o Fluxo AION.**

---


-
