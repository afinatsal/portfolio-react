// Background music: a speaker toggle docked at the end of the floating dock.
// It shares the dock's hover/tooltip magnification. Browsers block autoplay
// with sound, so playback starts on the first user gesture anywhere on the
// page and continues as looping background music. The on/off choice is
// remembered per visit via localStorage.
export function initMusicPlayer() {
  const doc = document;
  if (!doc || !doc.getElementById) return;

  const AudioCtor = (typeof window !== 'undefined' && window.Audio) || (typeof Audio !== 'undefined' ? Audio : null);
  if (!AudioCtor) return;
  const audio = new AudioCtor('./amaze.mp3');

  function memGet(k){ try { const s = window.localStorage; return s && s.getItem ? s.getItem(k) : null } catch(e){ return null } }
  function memSet(k, v){ try { const s = window.localStorage; if (s && s.setItem) s.setItem(k, v) } catch(e){} }

  // A small circular music toggle in its own bubble, kept at the same
  // bottom offset as the floating dock.
  const btn = doc.createElement('button');
  btn.type = 'button';
  btn.id = 'musicToggle';
  btn.className = 'dock-link fixed right-4 sm:right-6 z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-line bg-panel/60 backdrop-blur-xl text-dim shadow-[0_8px_40px_rgba(0,0,0,0.5)]';
  btn.style.transformOrigin = 'bottom center';
  btn.setAttribute('aria-pressed', 'false');
  btn.innerHTML =
    '<span class="dock-tooltip">Musik</span>' +
    '<span class="pc-note" aria-hidden="true">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
    '</span>' +
    '<span class="pc-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

  doc.body.appendChild(btn);

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