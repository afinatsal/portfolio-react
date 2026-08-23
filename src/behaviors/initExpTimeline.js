// EXPERIENCE TIMELINE — vertical lines in the experience section draw from
// top to bottom tracking the middle of the screen as you scroll.
// Animation starts when the TOP of the line hits mid-screen and finishes when
// the BOTTOM of the line reaches mid-screen. Desktop = center line, mobile =
// left line.
export function initExpTimeline() {
  const lines = [
    { el: document.getElementById('expTimeline'), center: true },
    { el: document.getElementById('expTimelineMobile'), center: false },
  ].filter(l => l.el);
  if(!lines.length) return;

  let ticking = false;
  function update(){
    ticking = false;
    const mid = window.innerHeight / 2;
    lines.forEach(({ el, center }) => {
      const lr = el.getBoundingClientRect();
      // offsetHeight is the untransformed layout height — getBoundingClientRect
      // height collapses to 0 while scaleY is 0 (which would deadlock the draw).
      const height = el.offsetHeight;
      let p = height > 0 ? (mid - lr.top) / height : 0;
      p = Math.min(1, Math.max(0, p));
      el.style.transform = `${center ? 'translateX(-50%) ' : ''}scaleY(${p.toFixed(4)})`;
    });
  }
  // Reduced motion: show the full static lines instead of the draw animation.
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    lines.forEach(({ el, center }) => {
      el.style.transform = `${center ? 'translateX(-50%) ' : ''}scaleY(1)`;
    });
    return;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  window.addEventListener('load', update);
  update();
}
