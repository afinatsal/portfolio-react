// PROJECT LINKS — keywords in the experience section jump to their project row.
// Click smooth-scrolls to the matching project, then pulses a highlight on it.
export function initProjectLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('.exp-link[data-project]');
    if(!link) return;
    e.preventDefault();
    const id = link.getAttribute('data-project');
    const row = document.querySelector(`.project-trigger[data-project="${id}"]`);
    if(!row) return;
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Pulse once the row actually arrives on screen.
    const io = new IntersectionObserver((entries) => {
      if(!entries[0].isIntersecting) return;
      io.disconnect();
      row.classList.add('project-highlight');
      setTimeout(() => row.classList.remove('project-highlight'), 1800);
    }, { threshold: 0.6 });
    io.observe(row);
  });
}
