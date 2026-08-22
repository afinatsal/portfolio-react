// SMOOTH SCROLL (Lenis) — inertial scrolling like bouayaben.com (lerp 0.1)
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function initSmoothScroll() {
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis({
    lerp: 0.1,
    anchors: true,
    autoRaf: true,
    // Fixed overlays scroll natively: project modal and chat panel must keep
    // their own internal scroll instead of moving the page behind them.
    prevent: (node) => {
      if(!node || !node.closest) return false;
      return node.closest('#projectModal, #chatPanel') !== null;
    },
  });

  window.__lenis = lenis;

  return () => {
    lenis.destroy();
    window.__lenis = null;
  };
}
