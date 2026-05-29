// EM NOME DO PAI E DO FILHO E DO ESPIRITO SANTO · AMEM {Z}
// KOBLLUX DUAL HUB · CHAT · 0x02 · INTEGRAR · 528Hz · NOVA · ―
// VERDADE × INTEGRAR ÷ Δ = ∞ · 3×6×9×7 = 1134
(function KOBLLUX_DUAL_HUB_CHAT() {
  'use strict';
  const OPCODE = '0x02';
  const HZ = 528;
  const GEO = 'LINHA';
  const ARQUETIPO = 'NOVA';
  const EVENTO = 'kobllux:dual:chat:carregado';

  function feedPush(type, text) {
    const box = document.getElementById('iaFeed');
    if (box) {
      const div = document.createElement('div');
      div.className = 'msg ' + (type || 'status');
      div.textContent = text;
      box.appendChild(div);
      const msgs = box.querySelectorAll('.msg');
      if (msgs.length > 10) box.removeChild(msgs[0]);
      box.scrollTop = box.scrollHeight;
    }
    try {
      chatPush(type, text);
      if (type === 'ai') updatePreview(text);
    } catch (_) {}
  }

  function chatPush(type, text) {
    const feed = document.getElementById('chatFeed');
    if (!feed) return;
    const div = document.createElement('div');
    div.className = 'msg ' + (type || 'status');
    div.textContent = text;
    feed.appendChild(div);
    const msgs = feed.querySelectorAll('.msg');
    if (msgs.length > 50) feed.removeChild(msgs[0]);
    feed.scrollTop = feed.scrollHeight;
  }

  function updatePreview(text) {
    const prev = document.getElementById('msgPreview');
    if (!prev) return;
    prev.textContent = text.replace(/\s+/g, ' ').trim();
    const homeView = document.getElementById('v-home');
    const isHomeActive = homeView && homeView.classList.contains('active');
    prev.style.display = isHomeActive ? 'block' : 'none';
  }

  function startSpeechConversation(userName, sk, model) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (typeof window.showArchMessage === 'function') window.showArchMessage('Reconhecimento de fala não suportado neste navegador.', 'err');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      if (typeof window.showArchMessage === 'function') window.showArchMessage('Estou ouvindo…', 'ok');
      feedPush('status', '🎙️ Ouvindo…');
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript) {
        feedPush('user', 'Você: ' + transcript);
        if (typeof window.showArchMessage === 'function') window.showArchMessage('Pulso enviado. Recebendo intenção…', 'ok');
        feedPush('status', '⚡ Pulso enviado · recebendo intenção…');
        handleUserMessage(transcript, userName, sk, model);
      }
    };
    recognition.onerror = (e) => {
      console.error('Erro no reconhecimento de fala:', e);
      if (typeof window.showArchMessage === 'function') window.showArchMessage('Erro no reconhecimento de fala.', 'err');
      feedPush('status', '❌ Erro no reconhecimento de fala.');
    };
    recognition.start();
  }

  async function handleUserMessage(text, userName, sk, model) {
    const prompt = userName + ' disse: ' + text;
    let reply = '';
    try {
      reply = await sendAIMessage(prompt, sk, model);
    } catch (err) {
      console.error('Falha ao consultar IA:', err);
      reply = 'Desculpe, não consegui responder no momento.';
    }
    if (reply) {
      let archName = 'Dual';
      try {
        const select = document.getElementById('arch-select');
        let base = (select && select.value ? select.value : '').replace(/\.html$/i, '');
        archName = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
      } catch (_) {}
      feedPush('ai', archName + ': ' + reply);
      if (typeof window.showArchMessage === 'function') window.showArchMessage(reply, 'ok');
      try { if (typeof window.speakWithActiveArch === 'function') window.speakWithActiveArch(reply); } catch (_) {}
    }
  }

  async function sendAIMessage(content, sk, model) {
    const payload = {
      model: model,
      messages: [
        { role: 'system', content: 'Você é um assistente amistoso que responde em português.' },
        { role: 'user', content: content }
      ],
      max_tokens: 200,
      temperature: 0.7
    };
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sk },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Erro na API: ' + res.status);
    const data = await res.json();
    return (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
  }

  window.feedPush = feedPush;
  window.chatPush = chatPush;
  window.updatePreview = updatePreview;
  window.startSpeechConversation = startSpeechConversation;
  window.handleUserMessage = handleUserMessage;
  window.sendAIMessage = sendAIMessage;

  window.KOBLLUX = window.KOBLLUX || {};
  window.KOBLLUX.DUAL = window.KOBLLUX.DUAL || {};
  window.KOBLLUX.DUAL.CHAT = { feedPush, chatPush, updatePreview, startSpeechConversation, handleUserMessage, sendAIMessage, HZ, OPCODE, GEO, ARQUETIPO };

  if (window.KOBLLUX.MESTRE && typeof window.KOBLLUX.MESTRE.registrar === 'function') {
    window.KOBLLUX.MESTRE.registrar({ id: 'dual-hub-chat', opcode: OPCODE, hz: HZ, arquetipo: ARQUETIPO });
  }

  document.dispatchEvent(new CustomEvent(EVENTO, { detail: window.KOBLLUX.DUAL.CHAT }));
})();
