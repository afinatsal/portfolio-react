// DOCK ACTIVE STATE ON SCROLL

/* Dock hover magnification is now handled purely by CSS (see .dock-link:hover
   rule below) instead of a per-frame JS loop · removes the lag/stiffness that
   came from recalculating transforms on every mousemove. */

export function initDockActive() {
  const links = document.querySelectorAll('nav a.dock-link');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const hudSection = document.getElementById('hudSection');

  function hudLabels(){
    const I = window.__I18N && (window.__I18N[window.__LANG] || window.__I18N.id);
    return (I && I.ui && I.ui.hud) || {};
  }

  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(sec => { if(sec && window.scrollY >= sec.offsetTop - window.innerHeight/2) current = sec; });
    links.forEach(a => {
      const match = current && a.getAttribute('href') === '#'+current.id;
      a.classList.toggle('active-dock', match);
      a.classList.toggle('text-dim', !match);
    });
    if(current && hudSection){
      const labels = hudLabels();
      hudSection.textContent = labels[current.id] || current.id.toUpperCase();
    }
  });
  document.addEventListener('afin:lang', () => {
    if(!hudSection) return;
    const labels = hudLabels();
    let current = sections[0];
    sections.forEach(sec => { if(sec && window.scrollY >= sec.offsetTop - window.innerHeight/2) current = sec; });
    if(current) hudSection.textContent = labels[current.id] || current.id.toUpperCase();
  });
}
