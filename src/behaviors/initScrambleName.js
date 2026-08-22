// SCRAMBLE TEXT ON NAME (hover proximity)
export function initScrambleName() {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const heading = document.getElementById('nameHeading');
  if(!heading) return;
  const lines = heading.querySelectorAll('[data-line]');
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
      item.el.style.color = '#BFFAF5';
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
