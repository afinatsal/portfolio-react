// ABOUT ALIGN — keeps the right edge of the About content column aligned with
// the right edge of the "AFIN. PORTFOLIO/2026" brand in the header. Runs only
// at sm+ (desktop) where the two-column about layout is active.
export function initAboutAlign() {
  const brand = document.querySelector('.brand-cta');
  const col = document.querySelector('#about .about-col');
  if(!brand || !col) return;

  let ticking = false;
  function apply(){
    ticking = false;
    if(window.innerWidth < 640) return; // mobile layout is stacked
    const br = brand.getBoundingClientRect();
    const cr = col.getBoundingClientRect();
    // shift the column left so its right edge meets the brand's right edge,
    // but never collapse it below ~half the section width.
    const shift = cr.right - br.right;
    col.style.marginRight = Math.max(0, Math.min(shift, cr.width * 0.5)) + 'px';
  }
  function onResize(){ if(!ticking){ ticking = true; requestAnimationFrame(apply); } }
  window.addEventListener('resize', onResize);
  window.addEventListener('load', apply);
  apply();
}
