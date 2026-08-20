// ANIMATED COUNTERS
export function initAnimatedCounters() {
  const els = document.querySelectorAll('[data-count]');
  if(!els.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(el){
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || 0, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if(reduce){
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = decimals ? (target * eased).toFixed(decimals) : Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  // share with the project modal so freshly-injected metrics animate too
  window.__runCount = run;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        io.unobserve(entry.target);
        run(entry.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}
