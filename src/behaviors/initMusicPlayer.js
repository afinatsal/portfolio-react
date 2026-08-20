// Background music: a speaker toggle docked at the end of the floating dock.
// It shares the dock's hover/tooltip magnification. Browsers block autoplay
// with sound, so playback starts on the first user gesture anywhere on the
// page and continues as looping background music. The on/off choice is
// remembered per visit via localStorage.
export function initMusicPlayer() {
  const doc = document;
  if (!doc || !doc.getElementById) return;

  const dock = doc.getElementById('dock');
  if (!dock) return;

  const AudioCtor = (typeof window !== 'undefined' && window.Audio) || (typeof Audio !== 'undefined' ? Audio : null);
  if (!AudioCtor) return;
  const audio = new AudioCtor('./amaze.mp3');

  function memGet(k){ try { const s = window.localStorage; return s && s.getItem ? s.getItem(k) : null } catch(e){ return null } }
  function memSet(k, v){ try { const s = window.localStorage; if (s && s.setItem) s.setItem(k, v) } catch(e){} }

  const btn = doc.createElement('button');
  btn.type = 'button';
  btn.id = 'musicToggle';
  btn.className = 'dock-link relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-dim transition-colors';
  btn.style.transformOrigin = 'bottom center';
  btn.setAttribute('aria-pressed', 'false');
  btn.innerHTML =
    '<span class="dock-tooltip">Musik</span>' +
    '<span class="pc-speaker" aria-hidden="true">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M3 10v4h4l5 4V6l-5 4H3z"/>' +
    '<path d="M16.5 8.5a5 5 0 0 1 0 7"/>' +
    '<path d="M19 6a8.5 8.5 0 0 1 0 12"/>' +
    '</svg></span>' +
    '<span class="pc-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

  const divider = doc.createElement('span');
  divider.className = 'dock-divider';
  divider.setAttribute('aria-hidden', 'true');
  dock.appendChild(divider);
  dock.appendChild(btn);

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
    btn.classList.toggle('music-playing', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
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

  // Autoplay with sound is blocked without a gesture: kick in on the first
  // click/keypress/touch anywhere on the page, and restore the saved choice.
  let saved;
  try { saved = memGet(KEY) === '1'; } catch (e) {}
  const gestureEvents = ['pointerdown', 'keydown', 'touchstart'];
  function onGesture() {
    gestureEvents.forEach(ev => doc.removeEventListener(ev, onGesture));
    if (saved) start();
  }
  gestureEvents.forEach(ev => doc.addEventListener(ev, onGesture, { capture: true }));

  setTooltip();
}