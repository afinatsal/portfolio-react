// Background music: a floating speaker toggle in the corner. Browsers block
// autoplay with sound, so playback starts on the first user gesture anywhere
// on the page and continues as looping background music. The on/off choice is
// remembered per visit via localStorage.
export function initMusicPlayer() {
  const doc = document;
  if (!doc || !doc.getElementById) return;

  const btn = doc.createElement('button');
  btn.type = 'button';
  btn.id = 'musicToggle';
  btn.className =
    'fixed bottom-[86px] right-4 sm:right-6 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-line bg-panel/60 backdrop-blur-xl text-dim hover:text-ink transition-colors shadow-[0_8px_40px_rgba(0,0,0,0.5)]';
  btn.setAttribute('aria-label', 'Musik');
  btn.innerHTML =
    '<span class="dock-tooltip">Musik</span>' +
    '<svg class="w-4 h-4 pc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h4l5 4V6l-5 4H3z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>';

  const AudioCtor = (typeof window !== 'undefined' && window.Audio) || (typeof Audio !== 'undefined' ? Audio : null);
  if (!AudioCtor) return;
  const audio = new AudioCtor('./amaze.mp3');

  function memGet(k){ try { const s = window.localStorage; return s && s.getItem ? s.getItem(k) : null } catch(e){ return null } }
  function memSet(k, v){ try { const s = window.localStorage; if (s && s.setItem) s.setItem(k, v) } catch(e){} }
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = 0.45;

  const KEY = 'portfolio-music';
  let playing = false;

  function setTooltip() {
    const lang = (window.__LANG || 'id');
    const ui = (window.__I18N && (window.__I18N[lang] || window.__I18N.id).ui) || {};
    const label = ui.music || 'Musik';
    btn.querySelector('.dock-tooltip').textContent = label;
    btn.setAttribute('aria-label', label);
  }

  function reflect() {
    btn.classList.toggle('text-accent', playing);
    btn.classList.toggle('text-dim', !playing);
    const svg = btn.querySelector('.pc-icon');
    svg.style.display = playing ? 'none' : 'block';
    if (playing && !btn.querySelector('.eq')) {
      const eq = doc.createElement('span');
      eq.className = 'eq';
      eq.setAttribute('aria-hidden', 'true');
      eq.innerHTML = '<i></i><i></i><i></i><i></i>';
      btn.appendChild(eq);
    }
    if (!playing && btn.querySelector('.eq')) btn.querySelector('.eq').remove();
  }

  function start() {
    if (playing) return;
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
    playing = true;
    try { memSet(KEY, '1'); } catch (e) {}
    reflect();
  }

  function stop() {
    audio.pause();
    playing = false;
    try { memSet(KEY, ''); } catch (e) {}
    reflect();
  }

  function toggle() {
    if (playing) stop();
    else start();
  }

  btn.addEventListener('click', toggle);
  doc.body.appendChild(btn);
  setTooltip();

  // Autoplay with sound is blocked without a gesture: kick in on the first
  // click/keypress/touch anywhere on the page, and restore the saved choice.
  let saved;
  try { saved = memGet(KEY) === '1'; } catch (e) {}
  const gestureEvents = ['pointerdown', 'keydown', 'touchstart'];
  function onGesture() {
    gestureEvents.forEach(ev => doc.removeEventListener(ev, onGesture));
    if (saved) start();
  }
  gestureEvents.forEach(ev => doc.addEventListener(ev, onGesture, { capture: true, once: false }));
}