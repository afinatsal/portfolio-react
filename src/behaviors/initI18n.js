// INTERNATIONALIZATION (language switcher)
export function initI18n() {
  const T = window.__I18N;
  if(!T) return;
  if(window.__afinI18nActive) return; // React StrictMode double-run guard
  window.__afinI18nActive = true;

  function resolve(code){
    if(T[code]) return code;
    const n = String(code || '').toLowerCase().split('-')[0];
    return T[n] ? n : 'id';
  }
  function detect(){
    const nav = (navigator.language || 'id').toLowerCase();
    if(nav.startsWith('zh')) return 'zh';
    if(nav.startsWith('ja')) return 'ja';
    if(nav.startsWith('en')) return 'en';
    return 'id';
  }

  let lang;
  try{ lang = resolve(localStorage.getItem('afin_lang') || detect()); }
  catch(err){ lang = 'id'; }
  window.__LANG = lang;

  function getVal(o, path){ return path.split('.').reduce((a, k) => (a == null ? a : a[k]), o); }

  function apply(){
    lang = window.__LANG;
    const D = T[lang] || T.id;
    document.documentElement.setAttribute('lang', D.doc || 'id');
    if(D.meta && D.meta.title) document.title = D.meta.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = getVal(D, el.getAttribute('data-i18n'));
      if(typeof v === 'string') el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = getVal(D, el.getAttribute('data-i18n-aria'));
      if(typeof v === 'string') el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const v = getVal(D, el.getAttribute('data-i18n-alt'));
      if(typeof v === 'string') el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('lang-active', btn.getAttribute('data-lang') === lang);
    });
    document.dispatchEvent(new CustomEvent('afin:lang', { detail: lang }));
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.lang-pill [data-lang]');
    if(!btn) return;
    const next = btn.getAttribute('data-lang');
    if(!T[next] || next === window.__LANG) return;
    window.__LANG = next;
    try{ localStorage.setItem('afin_lang', next); }catch(err){}
    apply();
  });

  apply();
}
