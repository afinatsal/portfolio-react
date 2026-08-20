// SKILLS & TOOLS MARQUEE (with logos)
export function initSkillsMarquee() {
  const trackMain = document.getElementById('marqueeTrack');
  const trackReverse = document.getElementById('marqueeTrackReverse');
  if(!trackMain && !trackReverse) return;

  // slug = Simple Icons slug (cdn.simpleicons.org). If a logo doesn't exist
  // there, the onerror handler below hides the broken image and a neutral
  // ring marker takes its place.
  const AI_ML = [
    { name: 'Python', slug: 'python' },
    { name: 'PyTorch', slug: 'pytorch' },
    { name: 'TensorFlow', slug: 'tensorflow' },
    { name: 'Keras', slug: 'keras' },
    { name: 'OpenCV', slug: 'opencv' },
    { name: 'Scikit-learn', slug: 'scikitlearn' },
    { name: 'XGBoost', slug: 'xgboost' },
    { name: 'LightGBM', slug: '' },
    { name: 'Hugging Face', slug: 'huggingface' },
    { name: 'YOLO', slug: '' },
    { name: 'LangChain', slug: 'langchain' },
  ];

  const DATA_WEB = [
    { name: 'FastAPI', slug: 'fastapi' },
    { name: 'Gradio', slug: 'gradio' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'PGVector', slug: '' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Flutter', slug: 'flutter' },
    { name: 'Firebase', slug: 'firebase' },
    { name: 'Pandas', slug: 'pandas' },
    { name: 'NumPy', slug: 'numpy' },
    { name: 'Power BI', slug: 'powerbi' },
    { name: 'SQL', slug: '' },
    { name: 'Apache Spark', slug: 'apachespark' },
    { name: 'Hadoop', slug: 'apachehadoop' },
    { name: 'ThingsBoard', slug: '' },
  ];

  function renderItem(tool, hidden){
    const iconHtml = tool.slug
      ? `<img src="https://cdn.simpleicons.org/${tool.slug}" alt="" class="w-4 h-4 shrink-0" loading="lazy" onerror="this.style.display='none'" />`
      : `<span class="w-4 h-4 shrink-0 rounded-full border border-line" aria-hidden="true"></span>`;
    return `<span class="flex items-center gap-3 font-mono text-[13px] sm:text-sm text-ink border border-line bg-panel rounded-full pl-4 pr-5 py-2.5 whitespace-nowrap transition-colors hover:border-accent/60"${hidden ? ' aria-hidden="true"' : ''}>${iconHtml}${tool.name}</span>`;
  }

  // render twice back-to-back for a seamless infinite-loop marquee
  const build = items => items.map(t => renderItem(t, false)).join('') + items.map(t => renderItem(t, true)).join('');
  if(trackMain) trackMain.innerHTML = build(AI_ML);
  if(trackReverse) trackReverse.innerHTML = build(DATA_WEB);
}
