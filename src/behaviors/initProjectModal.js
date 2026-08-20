// PROJECT DETAIL MODAL
export function initProjectModal() {
  let openId = null;

const ORDER = ['ailabs', 'lentera', 'thesis', 'visual-inspection', 'rag-chatbot', 'pneumonia', 'cognitive', 'fluenti'];
  // number of screenshots per project; files must be named project-<id>-1.jpg ... -N.jpg
  // set to 0 to fall back to a single project-<id>.jpg image
  const SHOTS = {
    ailabs: 3,
    lentera: 4,
    thesis: 3,
    'visual-inspection': 3,
    'rag-chatbot': 4,
    pneumonia: 3,
    cognitive: 3,
    fluenti: 3,
  };
  // screenshots placed directly under /public, used as-is (no dummy prefix)
  const REAL_IMAGES = {
    ailabs: ['./project-ailabs-1.jpg', './project-ailabs-2.jpg', './project-ailabs-3.jpg'],
    lentera: ['./project-lentera-1.jpeg', './project-lentera-2.jpeg', './project-lentera-3.jpeg', './project-lentera-4.jpeg'],
  };
  // projects whose screenshots are phone-portrait shots: keep them fully
  // visible (contain) on the wide stage instead of cropping to fill it.
  const CONTAIN = new Set(['lentera']);
  // placeholder github links - replace with real repos before publish
  const LINKS = {
    ailabs: 'https://afinailabs.vercel.app/',
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
    const m = /^([<>]?)(-?\d+(?:\.\d+)?)([%+]*)([a-zA-Z]*)$/.exec(v);
    let valueHtml;
    if(m){
      const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
      const prefix = m[1] === '<' ? '&lt;' : '';
      const suffix = m[3] + m[4];
      valueHtml = `<span class="font-display font-semibold text-2xl text-ink tabular-nums tracking-tight" data-count="${m[2]}" data-decimals="${decimals}"${prefix ? ` data-prefix="${prefix}"` : ''}${suffix ? ` data-suffix="${suffix}"` : ''}>${prefix}${m[2]}${suffix}</span>`;
    } else {
      valueHtml = `<span class="font-display font-semibold text-lg text-ink leading-tight">${val}</span>`;
    }
    return `<div class="border-t border-line pt-4"><p class="font-mono text-[9px] text-dim tracking-[0.18em] mb-2">${label}</p>${valueHtml}</div>`;
  }

  let carouselApi = null;

  function buildCarousel(id){
    const n = SHOTS[id] || 0;
    const srcs = (REAL_IMAGES[id] || []).slice();
    if(srcs.length === 0){
      // Dummy solid-pale placeholder JPEGs (no gradient) until the real
      // screenshots are ready; drop the 'dummy/' prefix to use real shots.
      const dummyBase = './dummy';
      if(n > 0){
        for(let i = 1; i <= n; i++) srcs.push(`${dummyBase}/project-${id}-${i}.jpg`);
      } else {
        srcs.push(`${dummyBase}/project-${id}.jpg`);
      }
    }

    const count = srcs.length;
    const SLIDES = count * 3; // ×3 window: rebase keeps the active photo in the middle copy

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preload every screenshot the moment the modal opens so navigation never
    // waits on a network round-trip or flashes the glyph placeholder.
    const loads = {};        // real index -> true | 'err'
    let lastLoaded = null;   // url of the most recently loaded screenshot
    let seen = [];           // real indexes shown, most recent first
    srcs.forEach((src, i) => {
      const im = new Image();
      im.onload = () => {
        loads[i] = true;
        lastLoaded = src;
        [...pcTrack.children]
          .filter(s => Number(s.dataset.real) === i)
          .forEach(s => {
            const img = s.querySelector('.pc-img');
            if(img && !img.getAttribute('src')) img.src = src;
          });
        applyImageStates();
      };
      im.onerror = () => { loads[i] = 'err'; };
      im.src = src;
    });

    // Triple-copy window; each slide is addressed by its real index.
    pcTrack.innerHTML = Array.from({ length: SLIDES }, (_, k) => {
      const r = k % count;
      const num = String(r + 1).padStart(2, '0');
      const tot = String(count).padStart(2, '0');
      const contain = CONTAIN.has(id) ? ' pc-slide--contain' : '';
      return `<div class="pc-slide${contain}" role="group" aria-label="Slide ${r + 1}" data-real="${r}">
        <span class="pc-glyph" aria-hidden="true">${num} / ${tot}</span>
        <img class="pc-ph" alt="" aria-hidden="true" draggable="false" />
        <img class="pc-img" alt="" decoding="async" draggable="false" />
      </div>`;
    }).join('');
    pcDots.innerHTML = srcs.map((_, i) => `<button type="button" class="pc-dot" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join('');

    const trackEls = pcTrack.children;
    const slide0 = pcTrack.firstElementChild;

    let idx = count;   // active slide index inside the ×3 window
    let x = 0;         // track offset — the ONLY thing being animated
    let base = 0;      // offset that centers slide 0
    let unit = 0;      // slide width

    function targetX(){ return base - idx * unit; }
    function realOf(i){ return ((i % count) + count) % count; }

    function measure(){
      const vw = pcTrack.parentElement.clientWidth || pcTrack.parentElement.getBoundingClientRect().width;
      const slideW = slide0 ? slide0.offsetWidth : vw;
      unit = slideW;
      base = (vw - slideW) / 2;
      x = targetX();
      applyX();
    }

    function applyX(){ pcTrack.style.transform = `translate3d(${x}px, 0, 0)`; }

    // exact cubic-bezier(0.16, 1, 0.3, 1) — the same ease-out the afinlabs
    // carousel uses: fast start, long soft settle, no dead tail at the end.
    function easeOut(px){
      if(px <= 0) return 0;
      if(px >= 1) return 1;
      const x1 = 0.16, y1 = 1, x2 = 0.3, y2 = 1;
      const cx = 3*x1, bx = 3*(x2-x1) - cx, ax = 1 - cx - bx;
      const cy = 3*y1, by = 3*(y2-y1) - cy, ay = 1 - cy - by;
      let t = px;
      for(let i = 0; i < 10; i++){
        const tx = ((ax*t + bx)*t + cx)*t;
        if(Math.abs(tx - px) < 1e-4) break;
        t -= (tx - px) / ((3*ax*t + 2*bx)*t + cx || 1e-6);
      }
      return ((ay*t + by)*t + cy)*t;
    }

    const DUR = 450;
    let rafId = 0;
    let running = false;
    let fromX = 0, toX = 0, startT = 0;

    function tick(now){
      const p = Math.min(1, (now - startT) / DUR);
      x = fromX + (toX - fromX) * easeOut(p);
      applyX();
      if(p < 1) rafId = requestAnimationFrame(tick);
      else { running = false; settle(); }
    }
    function cancelAnim(){
      if(running){ cancelAnimationFrame(rafId); running = false; }
    }

    // Move to window index i. An in-flight animation is retargeted cleanly from
    // wherever the track currently is, so rapid clicking glides without drops,
    // stutter, or the old "one step at a time" queue.
    function animateTo(i){
      idx = i;
      updateIndicators();
      if(reduced){
        x = targetX();
        applyX();
        settle();
        return;
      }
      fromX = x;
      toX = targetX();
      startT = performance.now();
      if(!running){
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    // After motion, fold idx back into the middle copy. The jump rewrites the
    // offset to a pixel-identical position on screen, so it is invisible and
    // the track can keep scrolling in one direction forever.
    function settle(){
      if(idx >= 2 * count) idx = count + realOf(idx);
      else if(idx < count) idx = count + realOf(idx);
      x = targetX();
      applyX();
      updateState();
    }

    function markerSeen(r){ seen = [r, ...seen.filter(v => v !== r)]; }

    function placeholderFor(r){
      const prev = seen.find(v => v !== r && loads[v] === true);
      if(prev !== undefined) return srcs[prev];
      return lastLoaded;
    }

    function updateIndicators(){
      const r = realOf(idx);
      if(pcCount) pcCount.textContent = `${String(r + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      [...pcDots.children].forEach((d, j) => d.classList.toggle('is-active', j === r));
    }

    function updateState(){
      [...trackEls].forEach((el, k) => el.classList.toggle('is-active', k === idx));
      updateIndicators();
      applyImageStates();
    }

    // While a slide's own image is still decoding, the center slide shows the
    // most recently loaded screenshot instead of an empty glyph box. The
    // .is-show toggling is instant; nothing animates here, so swipes stay smooth.
    function applyImageStates(){
      const activeReal = realOf(idx);
      markerSeen(activeReal);
      [...trackEls].forEach((el, k) => {
        const r = Number(el.dataset.real);
        const img = el.querySelector('.pc-img');
        const ph = el.querySelector('.pc-ph');
        const isCenter = k === idx;
        const ready = loads[r] === true;
        if(img) img.classList.toggle('is-show', ready);
        if(ph){
          const needPh = isCenter && !ready;
          ph.classList.toggle('is-show', needPh);
          if(needPh){
            const phSrc = placeholderFor(r);
            if(phSrc && ph.getAttribute('src') !== phSrc) ph.src = phSrc;
          } else if(ph.hasAttribute('src')){
            ph.removeAttribute('src');
          }
        }
      });
    }

    function onResize(){
      measure();
      updateState();
    }

    // pointer swipe: drag the track directly, then let momentum decide
    let dragging = false;
    let grabX = 0, px0 = 0, lastClientX = 0, lastT = 0;
    function onDown(e){
      if(reduced || e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true;
      cancelAnim();
      grabX = x;
      px0 = e.clientX;
      lastClientX = e.clientX;
      lastT = performance.now();
      pcTrack.setPointerCapture(e.pointerId);
      pcTrack.setAttribute('data-dragging', '');
    }
    function onMove(e){
      if(!dragging) return;
      const now = performance.now();
      lastT = now;
      lastClientX = e.clientX;
      const raw = grabX + (e.clientX - px0);
      const t = targetX();
      x = Math.max(t - unit * 0.9, Math.min(t + unit * 0.9, raw));
      applyX();
    }
    function onUp(e){
      if(!dragging) return;
      dragging = false;
      pcTrack.removeAttribute('data-dragging');
      const dt = performance.now() - lastT;
      const vel = dt > 0 && lastClientX !== e.clientX
        ? (e.clientX - lastClientX) / dt
        : 0;
      const flick = Math.abs(vel) > 0.4;
      if(e.clientX - px0 < -unit * 0.4 || (flick && vel < 0)) animateTo(idx + 1);
      else if(e.clientX - px0 > unit * 0.4 || (flick && vel > 0)) animateTo(idx - 1);
      else animateTo(idx);
    }

    function onPrev(){ animateTo(idx - 1); }
    function onNext(){ animateTo(idx + 1); }
    function onDot(e){
      const b = e.target.closest('[data-i]');
      if(!b) return;
      const j = Number(b.dataset.i);
      const a = realOf(idx);
      let delta = ((j - a) % count + count) % count;
      if(delta > count / 2) delta -= count;
      animateTo(idx + delta);
    }

    pcPrev.addEventListener('click', onPrev);
    pcNext.addEventListener('click', onNext);
    pcDots.addEventListener('click', onDot);
    pcTrack.addEventListener('pointerdown', onDown);
    pcTrack.addEventListener('pointermove', onMove);
    pcTrack.addEventListener('pointerup', onUp);
    pcTrack.addEventListener('pointercancel', onUp);
    window.addEventListener('resize', onResize);

    measure();
    updateState();

    return () => {
      cancelAnim();
      pcPrev.removeEventListener('click', onPrev);
      pcNext.removeEventListener('click', onNext);
      pcDots.removeEventListener('click', onDot);
      pcTrack.removeEventListener('pointerdown', onDown);
      pcTrack.removeEventListener('pointermove', onMove);
      pcTrack.removeEventListener('pointerup', onUp);
      pcTrack.removeEventListener('pointercancel', onUp);
      window.removeEventListener('resize', onResize);
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
    const githubSvg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" aria-label="GitHub"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>';
    const globeSvg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" aria-label="Website" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z"/></svg>';
    const isGitHub = !!(link && link.includes('github.com'));
    const hostname = link ? link.replace(/^https?:\/\//, '').split('/')[0] : '';
    const metaRow = (label, valueHtml) =>
      `<div class="flex items-baseline justify-between gap-6 py-3.5 border-b border-line last:border-b-0">
        <p class="font-mono text-[9px] tracking-[0.18em] text-dim shrink-0">${label}</p>
        <p class="font-display font-medium text-[14px] text-ink text-right leading-snug min-w-0">${valueHtml}</p>
      </div>`;
    const srcLink = link
      ? metaRow(UI.source || 'SUMBER', `<a href="${link}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-dim hover:text-ink transition-colors">${isGitHub ? githubSvg : globeSvg}<span class="underline decoration-dim/40 underline-offset-4 hover:decoration-ink">${isGitHub ? 'GitHub' : hostname}</span></a>`)
      : '';
    elMeta.innerHTML = [
      metaRow(UI.role || 'PERAN', p.role),
      metaRow(UI.year || 'TAHUN', p.year),
      srcLink,
    ].join('');

    elMetrics.innerHTML = p.metrics.map(([label, val]) => metricCard(label, val)).join('');
    elMetrics.querySelectorAll('[data-count]').forEach(el => { if(window.__runCount) window.__runCount(el); });

    elOverview.innerHTML = p.overview;

    elApproach.innerHTML = p.approach.map((item, i) =>
      `<li class="flex gap-4 font-display text-[15px] text-ink leading-relaxed"><span class="font-mono text-[11px] text-dim/70 shrink-0 pt-[2px]">${String(i + 1).padStart(2, '0')}</span><span>${item}</span></li>`
    ).join('');

    elResults.innerHTML = (p.results || []).map(item =>
      `<li class="flex gap-3.5 font-display text-[15px] text-ink leading-relaxed"><span class="h-1.5 w-1.5 rounded-full bg-dim/60 shrink-0 mt-[10px]" aria-hidden="true"></span><span>${item}</span></li>`
    ).join('');

    elStack.innerHTML = p.stack.map(s =>
      `<span class="font-mono text-[11px] text-ink border border-line rounded-full px-3 py-1.5">${s}</span>`
    ).join('');

    renderFooter(id);
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
