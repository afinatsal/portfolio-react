// EXPERIENCE TIMELINE — vertical lines in the experience section draw from
// top to bottom tracking the middle of the screen as you scroll. The dots on
// the line light up (red) as the drawn line reaches their position.
// Desktop = center line, mobile = left line.
export function initExpTimeline() {
  const center = document.getElementById('expTimeline');
  const left = document.getElementById('expTimelineMobile');
  const lines = [
    { el: center, center: true },
    { el: left, center: false },
  ].filter(l => l.el);
  const dots = Array.from(document.querySelectorAll('.tl-dot'));
  if(!lines.length) return;

  const isDesktop = () => window.innerWidth >= 640;
  const activeLine = () => isDesktop() ? center : left;

  let ticking = false;
  function update(){
    ticking = false;
    const mid = window.innerHeight / 2;
    const el = activeLine();
    if(!el) return;
    const lr = el.getBoundingClientRect();
    // offsetHeight is the untransformed layout height — getBoundingClientRect
    // height collapses to 0 while scaleY is 0 (which would deadlock the draw).
    const height = el.offsetHeight;
    let p = height > 0 ? (mid - lr.top) / height : 0;
    p = Math.min(1, Math.max(0, p));
    el.style.transform = `${isDesktop() ? 'translateX(-50%) ' : ''}scaleY(${p.toFixed(4)})`;

    dots.forEach(dot => {
      const q = height > 0 ? dot.offsetTop / height : 0;
      dot.classList.toggle('tl-dot-on', p >= q);
    });
  }
  // Reduced motion: show the full static lines and all dots on.
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    lines.forEach(({ el, center }) => {
      el.style.transform = `${center ? 'translateX(-50%) ' : ''}scaleY(1)`;
    });
    dots.forEach(dot => dot.classList.add('tl-dot-on'));
    return;
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  window.addEventListener('load', update);
  update();
}
