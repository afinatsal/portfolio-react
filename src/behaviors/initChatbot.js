// PORTFOLIO CHATBOT
// Floating chat bubble + panel that answers questions about Afin by calling
// the Vercel serverless function /api/chat (Gemini, key stays server-side).
export function initChatbot() {
  const doc = document;
  if(!doc || !doc.getElementById) return;

  const lang = () => window.__LANG || 'id';
  function T(){
    return window.__I18N && (window.__I18N[lang()] || window.__I18N.id);
  }

  const toggle = doc.createElement('button');
  toggle.type = 'button';
  toggle.id = 'chatToggle';
  toggle.className = 'dock-link fixed z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-line bg-panel/60 backdrop-blur-xl text-dim shadow-[0_8px_40px_rgba(0,0,0,0.5)]';
  toggle.style.transformOrigin = 'bottom center';
  toggle.setAttribute('aria-haspopup', 'dialog');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML =
    '<span class="dock-tooltip">Chat</span>' +
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12z"/><path d="M8.5 11h7"/><path d="M8.5 14.5h4"/></svg>';

  const panel = doc.createElement('section');
  panel.id = 'chatPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat');
  panel.className = 'cb-panel';
  panel.innerHTML =
    '<div class="cb-head">' +
      '<div class="cb-head-t">' +
        '<span class="cb-avatar" aria-hidden="true"><span class="cb-avatar-dot"></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9"/></svg></span>' +
        '<div class="min-w-0">' +
          '<p class="cb-head-title">Afin Assistant</p>' +
          '<p class="cb-head-sub">AI/ML Engineer</p>' +
        '</div>' +
      '</div>' +
      '<div class="cb-head-right">' +
        '<span class="cb-status"><i aria-hidden="true"></i><span data-chat-status>ONLINE · GEMINI</span></span>' +
        '<button type="button" id="chatClose" aria-label="Tutup" class="cb-close">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div id="chatMessages" class="cb-msgs"></div>' +
    '<form id="chatForm" class="cb-form">' +
      '<input id="chatInput" type="text" autocomplete="off" class="cb-input" placeholder="Tulis pertanyaan..." aria-label="Pertanyaan" />' +
      '<button type="submit" id="chatSend" class="cb-send" aria-label="Kirim">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      '</button>' +
    '</form>';

  doc.body.appendChild(toggle);
  doc.body.appendChild(panel);

  const msgs = doc.getElementById('chatMessages');
  const input = doc.getElementById('chatInput');
  const form = doc.getElementById('chatForm');
  const close = doc.getElementById('chatClose');
  const send = doc.getElementById('chatSend');

  let open = false;
  let history = [];
  let busy = false;
  let greeted = false;

  // ---- i18n labels
  function labels(){
    const t = T();
    const c = (t && t.ui && t.ui.chat) || {};
    return {
      title: c.title || 'Afin Assistant',
      sub: c.sub || 'AI/ML Engineer',
      status: c.status || 'ONLINE · GEMINI',
      you: c.you || 'KAMU',
      ai: c.ai || 'AFIN',
      placeholder: c.placeholder || 'Tulis pertanyaan...',
      welcome: c.welcome || '',
      suggestions: c.suggestions || [],
      send: c.send || 'Kirim',
      error: c.error || 'Gagal menghubungi server. Coba lagi nanti.',
      toggle: c.toggle || 'Chat',
      close: c.close || 'Tutup',
    };
  }
  function paint(){
    const L = labels();
    toggle.querySelector('.dock-tooltip').textContent = L.toggle;
    toggle.setAttribute('aria-label', L.toggle);
    panel.setAttribute('aria-label', L.title);
    panel.querySelector('.cb-head-title').textContent = L.title;
    input.placeholder = L.placeholder;
    input.setAttribute('aria-label', L.placeholder);
    close.setAttribute('aria-label', L.close);
    send.setAttribute('aria-label', L.send);
    const sub = panel.querySelector('.cb-head-sub');
    if(sub) sub.textContent = L.sub;
    const st = panel.querySelector('[data-chat-status]');
    if(st) st.textContent = L.status;
  }
  doc.addEventListener('afin:lang', () => { paint(); if(open && greeted) renderWelcome(); });

  // ---- markdown (mini, safe)
  function md(src){
    let s = String(src).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    s = s.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, (m, code) => `<pre class="cb-code"><code>${code.replace(/^\n+|\n+$/g,'')}</code></pre>`);
    s = s.replace(/`([^`]+)`/g, '<code class="cb-ic">$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="cb-link">$1</a>');
    let html = '', inUl = false, inOl = false;
    for(const raw of s.split('\n')){
      const line = raw.trim();
      const ul = line.match(/^[-*]\s+(.*)$/);
      const ol = line.match(/^\d+[.)]\s+(.*)$/);
      if(ul){
        if(!inUl){ html += '<ul class="cb-ul">'; inUl = true; }
        html += `<li>${ul[1]}</li>`;
        continue;
      }
      if(ol){
        if(inUl){ html += '</ul>'; inUl = false; }
        if(!inOl){ html += '<ol class="cb-ul">'; inOl = true; }
        html += `<li>${ol[1]}</li>`;
        continue;
      }
      if(inUl){ html += '</ul>'; inUl = false; }
      if(inOl){ html += '</ol>'; inOl = false; }
      if(line === '') html += '<br>';
      else html += `<p>${line}</p>`;
    }
    if(inUl) html += '</ul>';
    if(inOl) html += '</ol>';
    return html;
  }

  // ---- messages
  function bubble(role, html){
    const el = doc.createElement('div');
    el.className = 'cb-bubble cb-' + role;
    el.innerHTML =
      '<div class="cb-meta">' + (role === 'user' ? labels().you : labels().ai) + '</div>' +
      '<div class="cb-body">' + html + '</div>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }
  function typing(){
    const el = doc.createElement('div');
    el.className = 'cb-bubble cb-typing';
    el.innerHTML = '<i class="cb-bar"></i><i class="cb-bar"></i><i class="cb-bar"></i>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }
  function renderWelcome(){
    msgs.innerHTML = '';
    history = [];
    bubble('assistant', md(labels().welcome));
    const chips = labels().suggestions;
    if(chips && chips.length){
      const row = doc.createElement('div');
      row.className = 'cb-chips';
      chips.forEach(text => {
        const b = doc.createElement('button');
        b.type = 'button';
        b.className = 'cb-chip';
        b.textContent = text;
        b.addEventListener('click', () => { input.value = text; ask(); });
        row.appendChild(b);
      });
      msgs.appendChild(row);
      msgs.scrollTop = msgs.scrollHeight;
    }
    greeted = true;
  }

  function openPanel(){
    open = true;
    panel.classList.add('cb-open');
    toggle.setAttribute('aria-expanded', 'true');
    if(!greeted) renderWelcome();
    setTimeout(() => input.focus(), 120);
  }
  function closePanel(){
    open = false;
    panel.classList.remove('cb-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  async function ask(){
    const q = input.value.trim();
    if(!q || busy) return;
    input.value = '';
    bubble('user', md(q));
    history.push({ role: 'user', content: q });
    const t = typing();
    busy = true;
    send.disabled = true;
    try {
      const res = await window.fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history: history.slice(0, -1), lang: lang() }),
      });
      let text;
      try {
        const data = await res.json();
        text = data && data.text;
      } catch(e){}
      if(!res.ok || !text) throw new Error(text || 'HTTP ' + res.status);
      t.remove();
      bubble('assistant', md(text));
      history.push({ role: 'assistant', content: text });
    } catch(err) {
      t.remove();
      bubble('assistant', md(labels().error));
    } finally {
      busy = false;
      send.disabled = false;
      input.focus();
    }
  }

  toggle.addEventListener('click', () => (open ? closePanel() : openPanel()));
  close.addEventListener('click', closePanel);
  form.addEventListener('submit', e => { e.preventDefault(); ask(); });
  input.addEventListener('keydown', e => {
    if(e.key === 'Escape') closePanel();
  });

  paint();
}
