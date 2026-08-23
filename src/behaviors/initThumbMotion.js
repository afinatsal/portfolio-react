// PHOTO MOTION — project row thumbnails:
// 1) scale-in when they enter the viewport (one-shot)
// 2) subtle parallax drift as you scroll (rAF-throttled, GPU transform only)
export function initThumbMotion() {
  const thumbs = Array.from(document.querySelectorAll('.project-thumb.w-16'));
  if(!thumbs.length) return;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // entrance: scale + fade in once visible
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('thumb-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  thumbs.forEach(t => io.observe(t));

  if(reduced) return;

  // parallax: image drifts a little inside its frame based on scroll position
  let ticking = false;
  function update(){
    ticking = false;
    const vh = window.innerHeight;
    thumbs.forEach(t => {
      const img = t.querySelector('img');
      if(!img) return;
      const r = t.getBoundingClientRect();
      if(r.bottom < -40 || r.top > vh + 40) return;
      const progress = ((r.top + r.height / 2) - vh / 2) / (vh / 2); // -1..1
      const offset = progress * -(r.height * 0.08);
      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.18)`;
    });
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
}
