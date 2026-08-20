// COPY EMAIL TO CLIPBOARD
export function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  const textEl = document.getElementById('copyEmailText');
  if(!btn || !textEl) return;
  const email = 'afinatsal41@gmail.com';

  btn.addEventListener('click', () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    const I = window.__I18N && (window.__I18N[window.__LANG] || window.__I18N.id);
    textEl.textContent = (I && I.contact && I.contact.copied) || 'Tersalin ke clipboard!';
    setTimeout(() => { textEl.textContent = email; }, 1600);
  });
}
