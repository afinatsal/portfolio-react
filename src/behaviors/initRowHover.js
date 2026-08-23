// ROW HOVER ON SCROLL — when the cursor is stationary in the middle of the
// page and you scroll, each project/certification row animates the moment it
// passes under the cursor (like bouayaben's work list). CSS :hover alone
// defers during scroll-behavior:smooth, so we track the cursor Y and flag
// rows with .is-hot while it crosses them.
export function initRowHover() {
  const rows = Array.from(document.querySelectorAll('#work .project-trigger, #certifications .group'));
  if(!rows.length) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseY = -9999;
  let ticking = false;
  function update(){
    ticking = false;
    rows.forEach(r => {
      const rect = r.getBoundingClientRect();
      const over = mouseY >= rect.top - 6 && mouseY <= rect.bottom + 6;
      r.classList.toggle('is-hot', over);
    });
  }
  function schedule(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('mousemove', e => { mouseY = e.clientY; schedule(); });
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
  window.addEventListener('mouseleave', () => { mouseY = -9999; update(); });
  update();
}
