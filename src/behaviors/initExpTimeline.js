// EXPERIENCE TIMELINE — the vertical center line in the experience section.
// It starts drawing when the section reaches the middle of the screen and
// follows you down, finishing when the section's bottom passes mid-screen.
export function initExpTimeline() {
  const line = document.getElementById('expTimeline');
  if(!line) return;
  const section = line.closest('section');
  if(!section) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  function update(){
    ticking = false;
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const mid = vh / 2;
    let p = r.height > 0 ? (mid - r.top) / r.height : 0;
    p = Math.min(1, Math.max(0, p));
    line.style.transform = `translateX(-50%) scaleY(${p.toFixed(4)})`;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
}
