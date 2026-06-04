/* ════════════════════════════════════════════════════════════
   0x08 TESTEMUNHAR · 852Hz · ◉ · ESFERA
   Clock, HUD updates, DevPanel, audio player (koblluxPlayer)
   layer: espirito | fonte: index.html second script block
════════════════════════════════════════════════════════════ */

(function KOBLLUX_TESTEMUNHAR() {
  'use strict';

  /* ── KOBLLUX PLAYER ──────────────────────────────────── */
  function initKoblluxPlayer() {
    const trackAudio    = new Audio();
    const binauralAudio = new Audio();
    const toggleBtn     = document.getElementById('togglePlayer');
    const controls      = document.getElementById('playerControls');
    const playPauseBtn  = document.getElementById('playPause');
    const trackSelect   = document.getElementById('trackSelect');
    const binauralSelect= document.getElementById('binauralSelect');
    const trackVol      = document.getElementById('trackVolume');
    const binauralVol   = document.getElementById('binauralVolume');
    if (!toggleBtn || !controls) return;

    /* Preset UI */
    const presetSelect  = document.createElement('select');
    presetSelect.id     = 'presetSelect';
    const savePresetBtn = document.createElement('button');
    savePresetBtn.textContent = '💾 Salvar Preset';
    controls.appendChild(presetSelect);
    controls.appendChild(savePresetBtn);

    function fadeAudio(audio, targetVolume, duration = 1000) {
      const start = audio.volume, steps = 30, stepTime = duration / steps;
      let cur = 0;
      const step = () => { cur++; audio.volume = start + (targetVolume - start) * (cur / steps); if (cur < steps) setTimeout(step, stepTime); };
      step();
    }

    toggleBtn.addEventListener('click', () => {
      controls.style.display = controls.style.display === 'flex' ? 'none' : 'flex';
      loadPresets();
    });

    playPauseBtn?.addEventListener('click', () => {
      [trackAudio, binauralAudio].forEach(audio => {
        if (audio.src) {
          if (audio.paused) { fadeAudio(audio, parseFloat(audio.dataset.targetVolume || 1)); audio.play(); }
          else { fadeAudio(audio, 0); setTimeout(() => audio.pause(), 1000); }
        }
      });
      setTimeout(() => { if (playPauseBtn) playPauseBtn.textContent = (trackAudio.paused && binauralAudio.paused) ? '►' : '⏸'; }, 1000);
    });

    function loadTrack(src, volume) {
      fadeAudio(trackAudio, 0);
      setTimeout(() => {
        trackAudio.src = src; trackAudio.loop = true;
        trackAudio.volume = 0; trackAudio.dataset.targetVolume = volume;
        trackAudio.play(); fadeAudio(trackAudio, volume);
      }, 1000);
    }

    function loadBinaural(src, volume) {
      fadeAudio(binauralAudio, 0);
      setTimeout(() => {
        binauralAudio.src = src; binauralAudio.loop = true;
        binauralAudio.volume = 0; binauralAudio.dataset.targetVolume = volume;
        binauralAudio.play(); fadeAudio(binauralAudio, volume);
      }, 1000);
    }

    trackSelect?.addEventListener('change', () => {
      if (trackSelect.value) { loadTrack(`assets/sounds/trilhas/${trackSelect.value}.mp3`, trackVol?.value || 1); if (playPauseBtn) playPauseBtn.textContent = '⏸'; }
      else { fadeAudio(trackAudio, 0); setTimeout(() => trackAudio.pause(), 1000); }
    });

    binauralSelect?.addEventListener('change', () => {
      if (binauralSelect.value) loadBinaural(`assets/sounds/binaural/${binauralSelect.value}.wav`, binauralVol?.value || 1);
      else { fadeAudio(binauralAudio, 0); setTimeout(() => binauralAudio.pause(), 1000); }
    });

    trackVol?.addEventListener('input', () => { trackAudio.dataset.targetVolume = trackVol.value; trackAudio.volume = trackVol.value; });
    binauralVol?.addEventListener('input', () => { binauralAudio.dataset.targetVolume = binauralVol.value; binauralAudio.volume = binauralVol.value; });

    savePresetBtn.addEventListener('click', () => {
      const presets = JSON.parse(localStorage.getItem('koblluxPresets') || '[]');
      const name = prompt('Nome do preset:');
      if (!name) return;
      presets.push({ name, track: trackSelect?.value, binaural: binauralSelect?.value, trackVol: trackVol?.value, binauralVol: binauralVol?.value });
      localStorage.setItem('koblluxPresets', JSON.stringify(presets));
      loadPresets();
    });

    presetSelect.addEventListener('change', () => {
      const presets = JSON.parse(localStorage.getItem('koblluxPresets') || '[]');
      const preset = presets[presetSelect.selectedIndex - 1];
      if (!preset) return;
      if (trackSelect) trackSelect.value = preset.track;
      if (binauralSelect) binauralSelect.value = preset.binaural;
      if (trackVol) trackVol.value = preset.trackVol;
      if (binauralVol) binauralVol.value = preset.binauralVol;
      if (preset.track) loadTrack(`assets/sounds/trilhas/${preset.track}.mp3`, preset.trackVol);
      if (preset.binaural) loadBinaural(`assets/sounds/binaural/${preset.binaural}.wav`, preset.binauralVol);
    });

    function loadPresets() {
      presetSelect.innerHTML = '<option>🎛️ Presets salvos...</option>';
      JSON.parse(localStorage.getItem('koblluxPresets') || '[]').forEach(p => {
        const opt = document.createElement('option');
        opt.textContent = p.name; presetSelect.appendChild(opt);
      });
    }
    loadPresets();
  }

  /* ── DEV PANEL ───────────────────────────────────────── */
  window.KDevPanel = {
    toggle() {
      const panel = document.getElementById('dev-panel');
      panel?.classList.toggle('open');
      if (panel?.classList.contains('open')) this.scan();
    },
    scan() {
      const list = document.getElementById('dev-resources-list');
      if (!list) return;
      list.innerHTML = '';
      const links   = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      [...links, ...scripts].forEach(el => {
        const isCSS  = el.tagName === 'LINK';
        const url    = el.href || el.src;
        const badge  = isCSS ? 'CSS' : 'JS';
        const opcode = el.dataset?.opcode || '--';
        const item   = document.createElement('div');
        item.className = 'dev-resource-item';
        item.innerHTML = `
          <span class="dev-resource-badge">${badge} ${opcode}</span>
          <span class="dev-resource-url" title="${url}">${url.replace('https://','')}</span>
          <button class="dev-resource-remove" title="Remover">✕</button>
        `;
        item.querySelector('button')?.addEventListener('click', () => { el.remove(); list.removeChild(item); });
        list.appendChild(item);
      });
    },
    updateVar(prop, value) {
      document.documentElement.style.setProperty(prop, value);
      const span = document.getElementById('val-' + prop.replace(/--/,'--'));
      if (span) span.textContent = value;
    },
    addResource() {
      const type = document.getElementById('dev-new-type')?.value;
      const url  = document.getElementById('dev-new-url')?.value?.trim();
      if (!url) return;
      if (type === 'css') {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = url;
        document.head.appendChild(link);
      } else {
        const sc = document.createElement('script');
        sc.src = url; document.body.appendChild(sc);
      }
      this.scan();
    },
    exportHTML() {
      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'kobllux-export.html';
      a.click(); URL.revokeObjectURL(a.href);
    }
  };

  /* ── DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initKoblluxPlayer();
  });

})();
