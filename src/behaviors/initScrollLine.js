// SCROLL LINE — center vertical progress line driven by JS so it works in
// every browser (no dependence on CSS animation-timeline support).
export function initScrollLine() {
  const line = document.getElementById('scrollLine');
  if(!line) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  function update(){
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    line.style.transform = `translateX(-50%) scaleY(${p.toFixed(4)})`;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
}
