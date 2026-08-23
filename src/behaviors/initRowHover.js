// ROW HOVER ON SCROLL — when the cursor is stationary and you scroll, each
// project/certification row plays a FULL slide-out-and-back animation the
// moment it passes under the cursor. CSS :hover alone defers during
// scroll-behavior:smooth and a transition would be cut short on a quick pass,
// so we trigger a one-shot .row-anim keyframe per touch.
export function initRowHover() {
  const rows = Array.from(document.querySelectorAll('#work .project-trigger, #certifications .group'));
  if(!rows.length) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseY = -9999;
  let ticking = false;
  function fireOnce(r){
    if(r.dataset.anim) return;
    r.dataset.anim = '1';
    r.classList.remove('row-anim');
    void r.offsetWidth; // restart the animation
    r.classList.add('row-anim');
    setTimeout(() => {
      delete r.dataset.anim;
      r.classList.remove('row-anim');
    }, 650);
  }
  function update(){
    ticking = false;
    rows.forEach(r => {
      const rect = r.getBoundingClientRect();
      const over = mouseY >= rect.top - 6 && mouseY <= rect.bottom + 6;
      if(over) fireOnce(r);
    });
  }
  function schedule(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('mousemove', e => { mouseY = e.clientY; schedule(); });
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
}
