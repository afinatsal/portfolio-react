// EXPERIENCE TIMELINE — the vertical center line in the experience section.
// Animation starts when the TOP of the line hits the middle of the screen and
// finishes when the BOTTOM of the line reaches the middle.
export function initExpTimeline() {
  const line = document.getElementById('expTimeline');
  if(!line) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  function update(){
    ticking = false;
    const lr = line.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    let p = lr.height > 0 ? (mid - lr.top) / lr.height : 0;
    p = Math.min(1, Math.max(0, p));
    line.style.transform = `translateX(-50%) scaleY(${p.toFixed(4)})`;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
}
