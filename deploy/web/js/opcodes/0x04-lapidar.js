/* ════════════════════════════════════════════════════════════
   0x04 LAPIDAR · 594Hz · ◇ · OCTAEDRO
   API Keys vault, cofre, lock/unlock, key management
   layer: mente | fonte: docs/Fusion_index.html.txt keysModal
════════════════════════════════════════════════════════════ */

(function KOBLLUX_LAPIDAR() {
  'use strict';

  /* ── STATE ───────────────────────────────────────────── */
  window.STATE = window.STATE || { keys: [], vaultLocked: false };

  /* ── STORAGE HELPERS ─────────────────────────────────── */
  const VAULT_KEY = 'kobllux_vault';

  function loadKeys() {
    try {
      const raw = localStorage.getItem(VAULT_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      window.STATE.keys = data.keys || [];
      window.STATE.vaultLocked = data.locked || false;
    } catch(e) { console.warn('[0x04] vault load fail', e); }
  }

  function saveKeys() {
    localStorage.setItem(VAULT_KEY, JSON.stringify({
      keys: window.STATE.keys,
      locked: window.STATE.vaultLocked
    }));
  }

  /* ── KEY CRUD ────────────────────────────────────────── */
  function addKey(name, token) {
    if (!name) return;
    const key = { name, token: token || '', id: Date.now(), active: window.STATE.keys.length === 0 };
    window.STATE.keys.push(key);
    saveKeys();
    renderKeyList();
    updateStatus();
    return key;
  }

  function removeKey(id) {
    window.STATE.keys = window.STATE.keys.filter(k => k.id !== id);
    saveKeys();
    renderKeyList();
    updateStatus();
  }

  function activateKey(id) {
    window.STATE.keys.forEach(k => k.active = (k.id === id));
    saveKeys();
    renderKeyList();
    updateStatus();
  }

  /* ── RENDER KEY LIST ─────────────────────────────────── */
  function renderKeyList() {
    const list = document.getElementById('keyList');
    if (!list) return;
    list.innerHTML = '';

    if (window.STATE.keys.length === 0) {
      list.innerHTML = '<div style="font-size:.75rem;color:rgba(255,255,255,.3);text-align:center;padding:16px">Nenhuma chave cadastrada.</div>';
      return;
    }

    window.STATE.keys.forEach(key => {
      const item = document.createElement('div');
      item.className = 'key-item' + (key.active ? ' active-key' : '');
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <span class="key-name">${key.name}</span>
        <span class="key-badge">${key.active ? '● ATIVA' : '○'}</span>
        <div class="key-actions">
          <button class="key-action-btn" data-action="activate" data-id="${key.id}" title="Ativar" aria-label="Ativar chave">✓</button>
          <button class="key-action-btn delete" data-action="delete" data-id="${key.id}" title="Remover" aria-label="Remover chave">✕</button>
        </div>
      `;
      item.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const id = parseInt(btn.dataset.id);
          if (action === 'activate') activateKey(id);
          if (action === 'delete') removeKey(id);
        });
      });
      list.appendChild(item);
    });
  }

  function updateStatus() {
    const el = document.getElementById('vaultStatusText');
    if (el) el.textContent = window.STATE.vaultLocked ? '🔒 Cofre Bloqueado' : '🔓 Cofre Aberto';
    const activeKey = window.STATE.keys.find(k => k.active);
    const smallIdent = document.getElementById('smallIdent');
    if (smallIdent) smallIdent.textContent = activeKey ? activeKey.name : '--';
    const actBadge = document.getElementById('actBadge');
    if (actBadge && activeKey) actBadge.textContent = `key:${activeKey.name}`;
    /* Sync API key to 0x02 */
    if (activeKey?.token) {
      window.KOBLLUX = window.KOBLLUX || {};
      if (window.KOBLLUX.CONFIG) window.KOBLLUX.CONFIG.AUTH_TOKEN = 'Bearer ' + activeKey.token;
    }
  }

  /* ── MODAL CONTROL ───────────────────────────────────── */
  function openKeysModal() {
    const modal = document.getElementById('keysModal');
    if (modal) { modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); renderKeyList(); }
  }
  function closeKeysModal() {
    const modal = document.getElementById('keysModal');
    if (modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }
  }

  /* ── VAULT LOCK ──────────────────────────────────────── */
  function lockVault() {
    window.STATE.vaultLocked = true;
    saveKeys();
    closeKeysModal();
    openVaultModal();
  }

  function openVaultModal() {
    const modal = document.getElementById('vaultModal');
    if (modal) { modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); }
  }
  function closeVaultModal() {
    const modal = document.getElementById('vaultModal');
    if (modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }
  }

  function unlockVault(pass) {
    if (pass) {
      window.STATE.vaultLocked = false;
      saveKeys();
      closeVaultModal();
      openKeysModal();
    }
  }

  /* ── SYSTEM CONFIG SAVE ──────────────────────────────── */
  function saveSystemConfig() {
    const nameInp = document.getElementById('infodoseNameInput');
    const apiInp  = document.getElementById('apiKeyInput');
    const model   = document.getElementById('modelSelect');
    if (nameInp?.value) {
      localStorage.setItem('infodose_name', nameInp.value);
      document.dispatchEvent(new CustomEvent('di:name:update', { detail: { name: nameInp.value } }));
    }
    if (apiInp?.value) {
      addKey('Principal', apiInp.value);
      apiInp.value = '';
    }
    if (model?.value && window.KOBLLUX?.CONFIG) {
      window.KOBLLUX.CONFIG.MODEL = model.value;
    }
    window.KOBLLUX?.toast?.('✓ Configuração salva');
  }

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    loadKeys();
    renderKeyList();
    updateStatus();

    /* Avatar → abrir cofre */
    document.getElementById('avatarTarget')?.addEventListener('click', openKeysModal);
    document.getElementById('smallPreview')?.addEventListener('click', openKeysModal);

    /* Fechar modal */
    document.getElementById('closeKeysBtn')?.addEventListener('click', closeKeysModal);
    document.getElementById('keysModal')?.addEventListener('click', e => {
      if (e.target === document.getElementById('keysModal')) closeKeysModal();
    });

    /* Adicionar chave */
    document.getElementById('addKeyBtn')?.addEventListener('click', () => {
      const name  = document.getElementById('keyNameInput')?.value?.trim();
      const token = document.getElementById('keyTokenInput')?.value?.trim();
      if (name) { addKey(name, token); document.getElementById('keyNameInput').value = ''; document.getElementById('keyTokenInput').value = ''; }
    });

    /* Lock vault */
    document.getElementById('lockVaultBtn')?.addEventListener('click', lockVault);

    /* Vault unlock */
    document.getElementById('vaultUnlockBtn')?.addEventListener('click', () => {
      const pass = document.getElementById('vaultPassInput')?.value;
      unlockVault(pass);
    });
    document.getElementById('vaultCancelBtn')?.addEventListener('click', closeVaultModal);

    /* Save system config */
    document.getElementById('saveSystemBtn')?.addEventListener('click', saveSystemConfig);

    /* Vault modal on load if locked */
    if (window.STATE.vaultLocked) openVaultModal();
  });

  /* ── EXPOSE ──────────────────────────────────────────── */
  window.KOBLLUX = window.KOBLLUX || {};
  Object.assign(window.KOBLLUX, { addKey, removeKey, activateKey, openKeysModal, closeKeysModal, lockVault, unlockVault });

})();
