// HEAVY SCROLL — subtle inertia without a library. Wheel input accumulates
// into a target and each frame the scroll position is lerped toward it, so
// the page glides with a gentle weight and settles softly after the wheel
// stops. LERP is tuned high enough to feel weighty, not sluggish.
export function initHeavyScroll() {
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const LERP = 0.2;   // lower = heavier/slower settle
  const GAIN = 1.1;   // wheel delta multiplier

  let current = window.scrollY;
  let target = current;
  let running = false;

  function clampTarget(){
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if(target > max) target = max;
    if(target < 0) target = 0;
  }
  function start(){
    if(running) return;
    running = true;
    requestAnimationFrame(step);
  }
  function step(){
    const diff = target - current;
    if(Math.abs(diff) < 0.5){
      current = target;
      window.scrollTo({ top: current, behavior: 'instant' });
      running = false;
      return;
    }
    current += diff * LERP;
    // behavior:'instant' is essential — the page uses scroll-behavior:smooth,
    // and a smooth scrollTo every frame would fight itself (net movement ~0).
    window.scrollTo({ top: current, behavior: 'instant' });
    requestAnimationFrame(step);
  }
  function onWheel(e){
    if(e.target.closest && e.target.closest('#projectModal, #chatPanel')) return;
    e.preventDefault();
    let dy = e.deltaY;
    if(e.deltaMode === 1) dy *= 16;            // lines
    else if(e.deltaMode === 2) dy *= window.innerHeight; // pages
    target += dy * GAIN;
    clampTarget();
    start();
  }
  // Keep in sync when scrolling some other way (touch, scrollbar, keyboard).
  window.addEventListener('scroll', () => {
    if(running) return;
    current = window.scrollY;
    target = window.scrollY;
  }, { passive:true });
  window.addEventListener('wheel', onWheel, { passive:false });
}
