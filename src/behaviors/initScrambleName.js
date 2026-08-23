// SCRAMBLE TEXT ON NAME (hover proximity) + staggered line/char entrance
export function initScrambleName() {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const heading = document.getElementById('nameHeading');
  if(!heading) return;
  const lines = heading.querySelectorAll('[data-line]');

  // Wrap each line in an overflow-hidden mask so chars can reveal from below.
  lines.forEach(line => {
    const mask = document.createElement('span');
    mask.className = 'hero-line-mask';
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
    line.classList.add('hero-line-inner');
  });

  const letterEls = [];
  lines.forEach(line => {
    const text = line.textContent || '';
    line.textContent = '';
    [...text].forEach(ch => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      line.appendChild(span);
      if(ch !== ' ') letterEls.push({ el: span, original: ch, state: 'idle' });
    });
  });

  // Entrance: after a 1s pause, each character slides up out of its mask,
  // staggered left to right (skipped for reduced-motion users).
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced && letterEls.length){
    const letters = letterEls.map(item => item.el);
    letters.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(110%)';
    });
    setTimeout(() => {
      letters.forEach((el, i) => {
        el.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1), opacity .8s cubic-bezier(.16,1,.3,1)';
        el.style.transitionDelay = `${i * 45}ms`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 1000);
  }

  function scrambleLetter(item){
    if(item.state !== 'idle') return;
    item.state = 'scrambling';
    const duration = 380, stepTime = 40, steps = Math.floor(duration/stepTime);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if(i >= steps){
        clearInterval(interval);
        item.el.textContent = item.original;
        item.el.style.color = '';
        item.state = 'cooldown';
        setTimeout(() => { item.state = 'idle'; }, 500);
        return;
      }
      item.el.textContent = CHARS[Math.floor(Math.random()*CHARS.length)];
      item.el.style.color = '#FF5C28';
    }, stepTime);
  }

  let hx = -9999, hy = -9999;
  let hovering = false;
  let rafId = 0;
  heading.addEventListener('mouseenter', () => {
    hovering = true;
    if(!rafId) rafId = requestAnimationFrame(checkProximity);
  });
  heading.addEventListener('mousemove', e => {
    const rect = heading.getBoundingClientRect();
    hx = e.clientX - rect.left; hy = e.clientY - rect.top;
  });
  heading.addEventListener('mouseleave', () => {
    hovering = false; hx = -9999; hy = -9999;
  });

  // The loop only runs while the cursor is over the name (the effect is
  // hover-based), so it never consumes frames during normal scrolling.
  function checkProximity(){
    if(!hovering){ rafId = 0; return; }
    const headingRect = heading.getBoundingClientRect();
    const radius = 70;
    letterEls.forEach(item => {
      const r = item.el.getBoundingClientRect();
      const cx = r.left + r.width/2 - headingRect.left;
      const cy = r.top + r.height/2 - headingRect.top;
      const dist = Math.sqrt((cx-hx)**2 + (cy-hy)**2);
      if(dist < radius) scrambleLetter(item);
    });
    rafId = requestAnimationFrame(checkProximity);
  }
}
