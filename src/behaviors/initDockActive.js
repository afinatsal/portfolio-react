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

  // Order-independent: the active section is the one farthest down the page
  // whose top edge has crossed the half-viewport line. (The dock item order
  // on screen must NOT drive the scroll-spy, or the pill lands on the wrong
  // link once a later-in-DOM section scrolls past an earlier one.)
  function currentSection(){
    let cur = null;
    sections.forEach(sec => {
      if(sec && window.scrollY >= sec.offsetTop - window.innerHeight/2){
        if(!cur || sec.offsetTop > cur.offsetTop) cur = sec;
      }
    });
    return cur || sections[0];
  }

  function apply(){
    const current = currentSection();
    links.forEach(a => {
      const match = current && a.getAttribute('href') === '#'+current.id;
      a.classList.toggle('active-dock', match);
      a.classList.toggle('text-dim', !match);
    });
    if(current && hudSection){
      const labels = hudLabels();
      hudSection.textContent = labels[current.id] || current.id.toUpperCase();
    }
  }

  window.addEventListener('scroll', apply);
  document.addEventListener('afin:lang', apply);
}
