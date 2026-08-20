// SCROLL REVEAL
export function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));

  const transitions = document.querySelectorAll('.section-transition');
  const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        transitionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  transitions.forEach(section => transitionObserver.observe(section));
}
