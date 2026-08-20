// PROJECT DETAIL MODAL
export function initProjectModal() {
  let openId = null;

  const GLYPHS = {
    thesis: 'THESIS / CV',
    'visual-inspection': 'CV',
    'rag-chatbot': 'RAG',
    pneumonia: 'X-RAY',
    cognitive: 'E4',
    fluenti: 'LLM',
  };
  const ORDER = ['thesis', 'visual-inspection', 'rag-chatbot', 'pneumonia', 'cognitive', 'fluenti'];
  // number of screenshots per project; files must be named project-<id>-1.jpg ... -N.jpg
  // set to 0 to fall back to a single project-<id>.jpg image
  const SHOTS = {
    thesis: 3,
    'visual-inspection': 3,
    'rag-chatbot': 4,
    pneumonia: 3,
    cognitive: 3,
    fluenti: 3,
  };
  // placeholder github links - replace with real repos before publish
  const LINKS = {
    thesis: 'https://github.com/afinatsal/waste-detection-yolov12-hscn',
    'visual-inspection': 'https://github.com/afinatsal/cnn-visual-inspection',
    'rag-chatbot': 'https://github.com/afinatsal/rag-boat-ticket-chatbot',
    pneumonia: 'https://github.com/afinatsal/pneumonia-xray-detection',
    cognitive: 'https://github.com/afinatsal/cognitive-performance-e4',
    fluenti: 'https://github.com/afinatsal/fluenti-llama3',
  };

  function projectById(id){
    const I = window.__I18N && (window.__I18N[window.__LANG] || window.__I18N.id);
    return I ? I.projects[id] : null;
  }

  const modal = document.getElementById('projectModal');
  const backdrop = document.getElementById('modalBackdrop');
  const panel = document.getElementById('modalPanel');
  const closeBtn = document.getElementById('modalClose');
  if(!modal) return;

  const elCarousel = document.getElementById('modalCarousel');
  const pcTrack = document.getElementById('pcTrack');
  const pcPrev = document.getElementById('pcPrev');
  const pcNext = document.getElementById('pcNext');
  const pcDots = document.getElementById('pcDots');
  const pcCount = document.getElementById('pcCount');
  const elEyebrow = document.getElementById('modalEyebrow');
  const elTitle = document.getElementById('modalTitle');
  const elMeta = document.getElementById('modalMeta');
  const elMetrics = document.getElementById('modalMetrics');
  const elOverview = document.getElementById('modalOverview');
  const elApproach = document.getElementById('modalApproach');
  const elResults = document.getElementById('modalResults');
  const elStack = document.getElementById('modalStack');
  const elFooter = document.getElementById('modalFooter');

  function metricCard(label, val){
    const v = String(val).replace('&lt;', '<').trim();
    const m = /^([<>]?)(-?d+(?:.d+)?)([%+]*)([a-zA-Z]*)$/.exec(v);
    let valueHtml;
    if(m){
      const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
      const prefix = m[1] === '<' ? '&lt;' : '';
      const suffix = m[3] + m[4];
      valueHtml = `<span class="font-display font-semibold text-3xl sm:text-4xl text-ink tabular-nums tracking-tight" data-count="${m[2]}" data-decimals="${decimals}"${prefix ? ` data-prefix="${prefix}"` : ''}${suffix ? ` data-suffix="${suffix}"` : ''}>${prefix}${m[2]}${suffix}</span>`;
    } else {
      valueHtml = `<span class="font-display font-semibold text-xl sm:text-2xl text-ink leading-tight">${val}</span>`;
    }
    return `<div class="border-t border-line pt-4"><p class="font-mono text-[9px] text-dim tracking-[0.18em] mb-2">${label}</p>${valueHtml}</div>`;
  }

  let carouselApi = null;

  function buildCarousel(id){
    const n = SHOTS[id] || 0;
    const srcs = [];
    if(n > 0){
      for(let i = 1; i <= n; i++) srcs.push(`./project-${id}-${i}.jpg`);
    } else {
      srcs.push(`./project-${id}.jpg`);
    }

    const slides = srcs.map((src, i) => `<div class="pc-slide" role="group" aria-label="Slide ${i + 1}">
      <span class="pc-glyph" aria-hidden="true">${GLYPHS[id] || ''}</span>
      <img src="${src}" alt="" loading="lazy" onerror="this.parentElement.classList.add('pc-missing')" draggable="false" />
    </div>`);

    const real = srcs.length;
    const order = [real - 1, ...srcs.map((_, i) => i), 0];
    pcTrack.innerHTML = order.map(k => slides[k]).join('');
    pcDots.innerHTML = srcs.map((_, i) => `<button type="button" class="pc-dot" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join('');

    const trackEls = pcTrack.children;
    const total = order.length;
    let pos = 1;
    let busy = false;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = 'transform .6s cubic-bezier(.22,1,.36,1)';

    function measure(){
      const vw = pcTrack.clientWidth || pcTrack.getBoundingClientRect().width;
      const first = pcTrack.firstElementChild;
      const slideW = first ? first.offsetWidth : vw;
      const step = slideW;
      const peek = (vw - slideW) / 2;
      return { step, peek };
    }

    function render(animate){
      const { step, peek } = measure();
      pcTrack.style.transition = (!animate || reduced) ? 'none' : ease;
      pcTrack.style.transform = `translate3d(${peek - pos * step}px, 0, 0)`;
      [...trackEls].forEach((el, i) => el.classList.toggle('is-active', i === pos));
      const shown = ((pos - 1) % real + real) % real;
      if(pcCount) pcCount.textContent = `${String(shown + 1).padStart(2, '0')} / ${String(real).padStart(2, '0')}`;
      [...pcDots.children].forEach((d, i) => d.classList.toggle('is-active', i === shown));
    }

    function wrap(p){
      return ((p - 1 + real) % real) + 1;
    }

    function go(dir){
      if(busy) return;
      if(reduced){
        pos = wrap(pos + dir);
        render(false);
        return;
      }
      busy = true;
      pos = pos + dir;
      render(true);
    }

    pcTrack.addEventListener('transitionend', function onEnd(e){
      if(e.target !== pcTrack) return;
      busy = false;
      if(pos >= total - 1) pos = 1;
      else if(pos <= 0) pos = real;
      render(false);
    });

    function onPrev(){ go(-1); }
    function onNext(){ go(1); }
    function onDot(e){
      const b = e.target.closest('[data-i]');
      if(!b) return;
      const target = Number(b.dataset.i);
      let diff = target - ((pos - 1) % real + real) % real;
      if(diff > real / 2) diff -= real;
      if(diff < -real / 2) diff += real;
      if(diff !== 0) go(diff);
    }
    function onResize(){ render(false); }

    pcPrev.addEventListener('click', onPrev);
    pcNext.addEventListener('click', onNext);
    pcDots.addEventListener('click', onDot);
    window.addEventListener('resize', onResize);

    render(false);

    return () => {
      pcPrev.removeEventListener('click', onPrev);
      pcNext.removeEventListener('click', onNext);
      pcDots.removeEventListener('click', onDot);
      window.removeEventListener('resize', onResize);
      pcTrack.removeEventListener('transitionend', onEnd);
    };
  }

  function openModal(id){
    const p = projectById(id);
    if(!p) return;
    openId = id;

    elEyebrow.innerHTML = p.eyebrow;
    elTitle.innerHTML = p.title;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    panel.scrollTop = 0;
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
      if(carouselApi) carouselApi();
      carouselApi = buildCarousel(id);
    });

    const link = LINKS[id];
    const UI = (window.__I18N && (window.__I18N[window.__LANG] || window.__I18N.id).ui) || {};
    elMeta.innerHTML = [
      `<div><p class="font-mono text-[9px] tracking-[0.15em] text-dim mb-1">${UI.role || 'PERAN'}</p><p class="font-display font-medium text-[14px] text-ink leading-snug">${p.role}</p></div>`,
      `<div><p class="font-mono text-[9px] tracking-[0.15em] text-dim mb-1">${UI.year || 'TAHUN'}</p><p class="font-display font-medium text-[14px] text-ink leading-snug">${p.year}</p></div>`,
      link ? `<div class="col-span-2 sm:col-span-1"><p class="font-mono text-[9px] tracking-[0.15em] text-dim mb-1">${UI.source || 'SUMBER'}</p><a href="${link}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 font-display font-medium text-[14px] text-dim hover:text-ink transition-colors"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" aria-label="GitHub"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg><span class="underline decoration-dim/40 underline-offset-4 hover:decoration-ink">GitHub</span></a></div>` : '',
    ].join('');

    elMetrics.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-7">${p.metrics.map(([label, val]) => metricCard(label, val)).join('')}</div>`;
    elMetrics.querySelectorAll('[data-count]').forEach(el => { if(window.__runCount) window.__runCount(el); });

    elOverview.innerHTML = p.overview;

    elApproach.innerHTML = p.approach.map((item, i) =>
      `<li class="flex gap-4 font-display text-[15px] text-dim leading-relaxed"><span class="font-mono text-[11px] text-dim/70 shrink-0 pt-[2px]">${String(i + 1).padStart(2, '0')}</span><span>${item}</span></li>`
    ).join('');

    elResults.innerHTML = (p.results || []).map(item =>
      `<li class="flex gap-3.5 font-display text-[15px] text-dim leading-relaxed"><span class="h-1.5 w-1.5 rounded-full bg-dim/60 shrink-0 mt-[10px]" aria-hidden="true"></span><span>${item}</span></li>`
    ).join('');

    elStack.innerHTML = p.stack.map(s =>
      `<span class="font-mono text-[11px] text-ink border border-line rounded-full px-3 py-1.5">${s}</span>`
    ).join('');

    renderFooter(id);

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    panel.scrollTop = 0;
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    });
  }

  function footerCard(dir, id){
    const p = projectById(id);
    if(!p) return '';
    const label = dir === 'prev'
      ? (window.__I18N[window.__LANG] || window.__I18N.id).ui.prev
      : (window.__I18N[window.__LANG] || window.__I18N.id).ui.next;
    const arrow = dir === 'prev'
      ? '<svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6 6-6-6 6-6"/></svg>'
      : '<svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
    return `<button type="button" data-nav="${id}" class="project-trigger group flex items-center gap-3 text-left py-1.5 transition-colors">
      ${dir === 'prev' ? arrow : ''}
      <span class="min-w-0">
        <span class="block font-mono text-[9px] tracking-[0.15em] text-dim mb-1">${label}</span>
        <span class="block font-display font-medium text-[14px] text-dim group-hover:text-ink leading-snug line-clamp-2 transition-colors">${p.title}</span>
      </span>
      ${dir === 'next' ? arrow : ''}
    </button>`;
  }

  function renderFooter(id){
    const idx = ORDER.indexOf(id);
    const prev = ORDER[idx - 1];
    const next = ORDER[idx + 1];
    elFooter.innerHTML = [footerCard('prev', prev), footerCard('next', next)].join('');
    elFooter.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-nav')));
    });
  }

  function closeModal(){
    openId = null;
    backdrop.style.opacity = '0';
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(24px)';
    document.body.classList.remove('modal-open');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }

  document.querySelectorAll('.project-trigger').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-project')));
  });
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });
  document.addEventListener('afin:lang', () => { if(openId) openModal(openId); });
}
