import { useEffect, useRef } from 'react'
import TRANSLATIONS from './translations'

// The markup below is the original hand-built portfolio markup (Tailwind
// classes + inline SVGs), kept as one HTML string and mounted via
// dangerouslySetInnerHTML. All the interactive behavior (dither canvas
// background, scroll-reveal, floating dock nav, project modal, email copy,
// skills marquee) is the original vanilla JS, executed once after mount
// inside the effect below · nothing behavior-wise has changed, this file
// just gives it a proper React + Tailwind (Vite) build pipeline to run
// locally instead of the Tailwind CDN <script> tag.

const MARKUP = `<div class="grain"></div>

<!-- loading screen · CLI boot sequence with split-door reveal -->
<div id="loader" class="loader" aria-hidden="true">
  <div class="loader-inner">
    <div class="loader-meta font-mono">
      <span class="text-dim tracking-[0.25em] text-[11px]">AFIN<span class="text-accent">.</span>PORTFOLIO · <span class="text-dim">2026</span></span>
      <span id="loaderPct" class="loader-pct">000</span>
    </div>

    <h1 class="loader-name font-display">
      <span class="ln"><span style="--nd:.12s">MUHAMMAD</span></span>
      <span class="ln"><span class="text-dot" style="--nd:.26s">AFIN ATSAL</span></span>
    </h1>

    <div class="loader-term font-mono">
      <p id="loaderLog" class="loader-log"></p>
      <div class="loader-row">
        <span id="loaderStatus">BOOTING</span>
        <span class="loader-cursor" aria-hidden="true">&#9612;</span>
      </div>
    </div>

    <div class="loader-bar"><span id="loaderBar"></span></div>
  </div>
</div>

<!-- scroll progress indicator -->
<div id="scrollProgress" aria-hidden="true"></div>

<!-- LANDING SECTION: background dither lives only here, scrolls away with this section -->
<section id="home" class="relative overflow-hidden min-h-[100svh] flex flex-col" style="background:#111315;">

  <canvas id="ditherCanvas"></canvas>
  <div class="vignette"></div>

  <!-- top brand row -->
  <header class="hero-in relative z-10 flex items-center justify-between px-5 sm:px-10 pt-7 font-mono text-xs tracking-wide" style="--d:.05s">
    <div class="text-dim">AFIN<span class="text-accent">.</span> PORTFOLIO/2026</div>
    <div class="flex items-center gap-3 text-dim">
      <span class="hidden sm:flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#B7F36B] pulse-dot"></span>
        <span data-i18n="header.status">Open untuk kolaborasi</span>
      </span>
      <span class="hidden sm:block w-px h-3 bg-line"></span>
      <nav class="lang-pill" aria-label="Pilih bahasa">
        <button type="button" data-lang="id" class="lang-active" aria-label="Bahasa Indonesia">ID</button>
        <button type="button" data-lang="en" aria-label="English">EN</button>
        <button type="button" data-lang="zh" aria-label="中文">中文</button>
        <button type="button" data-lang="ja" aria-label="日本語">日本語</button>
      </nav>
    </div>
  </header>

  <!-- hero -->
  <main class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pb-32">
    <p class="hero-in font-mono text-[11px] sm:text-xs tracking-[0.25em] text-accent mb-4" style="--d:.15s" data-i18n="hero.eyebrow">AI/ML ENGINEER · COMPUTER VISION</p>

    <h1 id="nameHeading" class="hero-in font-display font-semibold leading-[0.94] tracking-tight text-[clamp(2.6rem,9vw,6.4rem)]" style="--d:.3s">
      <span data-line class="block">MUHAMMAD</span>
      <span data-line class="block text-dot">AFIN ATSAL</span>
    </h1>

    <p class="hero-in font-display text-[15px] sm:text-base text-dim leading-relaxed max-w-md mx-auto mt-6" style="--d:.42s" data-i18n="hero.tagline">
      Membangun sistem AI dari riset ke produksi, dari notebook hingga deployment.
    </p>
  </main>
  <a class="hero-in-fade scroll-cue" style="--d:.55s" href="#about" aria-label="Scroll ke bagian Tentang"><span>SCROLL TO EXPLORE</span><i></i></a>
</section>

<!-- ============ PENGALAMAN ============ -->
<!-- ============ ABOUT / TENTANG ============ -->
<section id="about" class="section-transition relative bg-section px-5 sm:px-10 py-28 sm:py-36">
  <div class="max-w-3xl mx-auto">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent mb-14 reveal" data-i18n="about.label">02 · TENTANG</p>

    <h2 class="font-display font-semibold text-2xl sm:text-4xl text-ink leading-tight mb-8 max-w-2xl reveal reveal-delay-1">
      <span data-i18n="about.heading">Mengubah riset computer vision menjadi sistem produksi nyata, bukan sekadar notebook eksperimen.</span>
    </h2>

    <p class="font-display text-[15px] text-dim leading-relaxed max-w-xl mb-12 reveal reveal-delay-1" data-i18n="about.body">
      Lulusan Teknologi Informasi Universitas Brawijaya (IPK 3.55/4.00) dengan fokus di computer vision dan applied deep learning. Saya membawa model dari eksperimen ke sistem yang terintegrasi produksi lewat dua program magang industri, serta memimpin riset skripsi pipeline deteksi sampah hierarkis dari nol, mulai dari kurasi dataset, benchmarking arsitektur, hingga aplikasi inferensi siap demo.
    </p>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-line pt-8 reveal reveal-delay-2">
      <div>
        <p class="font-mono text-[10px] tracking-[0.15em] text-dim mb-1.5" data-i18n="about.educationLabel">PENDIDIKAN</p>
        <p class="font-display font-semibold text-ink text-sm leading-snug" data-i18n="about.educationVal">Universitas<br>Brawijaya</p>
      </div>
      <div>
        <p class="font-mono text-[10px] tracking-[0.15em] text-dim mb-1.5" data-i18n="about.gpaLabel">IPK</p>
        <p class="font-display font-semibold text-ink text-sm leading-snug"><span data-count="3.55" data-decimals="2">3.55</span> / 4.00</p>
      </div>
      <div>
        <p class="font-mono text-[10px] tracking-[0.15em] text-dim mb-1.5" data-i18n="about.locationLabel">LOKASI</p>
        <p class="font-display font-semibold text-ink text-sm leading-snug" data-i18n="about.locationVal">Malang,<br>Indonesia</p>
      </div>
      <div>
        <p class="font-mono text-[10px] tracking-[0.15em] text-dim mb-1.5" data-i18n="about.statusLabel">STATUS</p>
        <p class="font-display font-semibold text-ink text-sm leading-snug" data-i18n="about.statusVal">Terbuka untuk magang atau full-time</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ SKILLS ============ -->

<section id="experience" class="relative bg-section px-5 sm:px-10 py-28 sm:py-36 border-t border-line">
  <div class="max-w-4xl mx-auto">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent text-center mb-16 reveal" data-i18n="exp.label">03 · PENGALAMAN</p>

    <div class="relative reveal reveal-delay-1">
      <div class="absolute left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2 hidden sm:block"></div>
      <div class="absolute left-0 top-0 bottom-0 w-px bg-line sm:hidden"></div>

      <!-- item 1: text right -->
      <div class="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 items-start sm:items-center mb-14 sm:mb-20 pl-8 sm:pl-0">
        <span class="absolute left-0 sm:left-1/2 top-1.5 sm:top-1/2 sm:-translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink z-10"></span>
        <div class="hidden sm:flex justify-end pr-4">
          <div class="w-24 h-24 rounded-full border border-line overflow-hidden shrink-0">
            <img src="./Instruktur-Praktikum-Python.jpeg" alt="Foto Instruktur Praktikum Python" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div class="sm:pl-10 text-left">
          <div class="sm:hidden w-10 h-10 rounded-full border border-line overflow-hidden shrink-0 mb-2.5">
            <img src="./Instruktur-Praktikum-Python.jpeg" alt="Foto Instruktur Praktikum Python" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <p class="font-mono text-[11px] text-accent mb-1.5" data-i18n="exp.e1.period">FEB 2026 · SEKARANG</p>
          <p class="font-display font-semibold text-lg sm:text-xl text-ink mb-1" data-i18n="exp.e1.title">Instruktur Praktikum Python</p>
          <p class="font-mono text-[12px] text-lime mb-2" data-i18n="exp.e1.org">FILKOM &amp; FMIPA, Universitas Brawijaya</p>
          <p class="font-display text-[14.5px] text-dim leading-relaxed" data-i18n="exp.e1.desc">Mengampu praktikum pemrograman Python lintas fakultas selama satu semester, mencakup penyusunan kurikulum materi dan evaluasi hasil belajar mahasiswa.</p>
        </div>
      </div>

      <!-- item 2: text left -->
      <div class="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 items-start sm:items-center mb-14 sm:mb-20 pl-8 sm:pl-0">
        <span class="absolute left-0 sm:left-1/2 top-1.5 sm:top-1/2 sm:-translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink z-10"></span>
        <div class="sm:pr-10 sm:text-right text-left order-2 sm:order-1">
          <div class="sm:hidden w-10 h-10 rounded-full border border-line overflow-hidden shrink-0 mb-2.5">
            <img src="./MBKM-XL-Smart.jpeg" alt="Foto MBKM X-Camp XLSmart" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <p class="font-mono text-[11px] text-accent mb-1.5" data-i18n="exp.e2.period">AGU · DES 2025</p>
          <p class="font-display font-semibold text-lg sm:text-xl text-ink mb-1" data-i18n="exp.e2.title">AI/ML Engineer (MBKM)</p>
          <p class="font-mono text-[12px] text-dim mb-2" data-i18n="exp.e2.org">X-Camp / MBKM · <span class="company-highlight">PT XLSmart Telecom Sejahtera</span></p>
          <p class="font-display text-[14.5px] text-dim leading-relaxed" data-i18n="exp.e2.desc">Membangun sistem visual inspection berbasis CNN (akurasi 99.6%), deteksi objek hilang dengan OpenCV, dan chatbot RAG internal dalam metodologi Agile-Scrum.</p>
        </div>
        <div class="hidden sm:flex justify-start pl-4 order-2">
          <div class="w-24 h-24 rounded-full border border-line overflow-hidden shrink-0">
            <img src="./MBKM-XL-Smart.jpeg" alt="Foto MBKM X-Camp XLSmart" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- item 3: text right -->
      <div class="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 items-start sm:items-center mb-14 sm:mb-20 pl-8 sm:pl-0">
        <span class="absolute left-0 sm:left-1/2 top-1.5 sm:top-1/2 sm:-translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink z-10"></span>
        <div class="hidden sm:flex justify-end pr-4">
          <div class="w-24 h-24 rounded-full border border-line overflow-hidden shrink-0">
            <img src="./Intern-Amman.jpeg" alt="Foto Internship PT Amman Mineral" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div class="sm:pl-10 text-left">
          <div class="sm:hidden w-10 h-10 rounded-full border border-line overflow-hidden shrink-0 mb-2.5">
            <img src="./Intern-Amman.jpeg" alt="Foto Internship PT Amman Mineral" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <p class="font-mono text-[11px] text-accent mb-1.5" data-i18n="exp.e3.period">JUL · AGU 2025</p>
          <p class="font-display font-semibold text-lg sm:text-xl text-ink mb-1" data-i18n="exp.e3.title">Back-End &amp; AI System Developer</p>
          <p class="font-mono text-[12px] text-dim mb-2" data-i18n="exp.e3.org"><span class="company-highlight">PT Amman Mineral Internasional</span></p>
          <p class="font-display text-[14.5px] text-dim leading-relaxed" data-i18n="exp.e3.desc">Merancang microservices FastAPI dengan PostgreSQL/PGVector untuk chatbot RAG pemesanan tiket kapal; latensi API rata-rata di bawah 2 detik.</p>
        </div>
      </div>

      <!-- item 4: text left -->
      <div class="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 items-start sm:items-center pl-8 sm:pl-0">
        <span class="absolute left-0 sm:left-1/2 top-1.5 sm:top-1/2 sm:-translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ink z-10"></span>
        <div class="sm:pr-10 sm:text-right text-left order-2 sm:order-1">
          <div class="sm:hidden w-10 h-10 rounded-full border border-line overflow-hidden shrink-0 mb-2.5">
            <img src="./Private-Tutor.jpeg" alt="Foto Private Tutor" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <p class="font-mono text-[11px] text-accent mb-1.5" data-i18n="exp.e4.period">FREELANCE · BERJALAN</p>
          <p class="font-display font-semibold text-lg sm:text-xl text-ink mb-1" data-i18n="exp.e4.title">Private Tutor · IoT &amp; Applied AI</p>
          <p class="font-mono text-[12px] text-dim mb-2" data-i18n="exp.e4.org">Malang, Indonesia</p>
          <p class="font-display text-[14.5px] text-dim leading-relaxed" data-i18n="exp.e4.desc">Membimbing siswa SMA membangun sistem E-Nose untuk deteksi dini infeksi bakteri, dari sensor hingga klasifikasi berbasis AI.</p>
        </div>
        <div class="hidden sm:flex justify-start pl-4 order-2">
          <div class="w-24 h-24 rounded-full border border-line overflow-hidden shrink-0">
            <img src="./Private-Tutor.jpeg" alt="Foto Private Tutor" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ SERTIFIKASI ============ -->
<!-- TODO: perbarui tahun dan ganti href dengan link verifikasi kredensial asli (coursera.org/verify/...) -->
<section id="certifications" class="relative bg-section px-5 sm:px-10 py-28 sm:py-36 border-t border-line">
  <div class="max-w-3xl mx-auto">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent mb-3 reveal" data-i18n="cert.label">04 · SERTIFIKASI</p>
    <p class="font-mono text-[11px] text-dim mb-14 reveal" data-i18n="cert.intro">Klik untuk memverifikasi kredensial.</p>

    <div class="border-t border-line reveal reveal-delay-1">

      <a href="https://www.coursera.org/specializations/machine-learning-introduction" target="_blank" rel="noopener" class="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">01</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors">Machine Learning Specialization</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5">DeepLearning.AI &amp; Stanford Online</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap hidden sm:block">2025</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      </a>

      <a href="https://www.coursera.org/professional-certificates/google-ai" target="_blank" rel="noopener" class="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">02</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors">Google AI Professional Certificate</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5" data-i18n="cert.c2Detail">Google · 8 kursus</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap hidden sm:block">2026</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      </a>

      <a href="https://www.coursera.org/learn/google-ai-essentials" target="_blank" rel="noopener" class="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">03</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors">Google AI Essentials Specialization</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5">Google</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap hidden sm:block">2025</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      </a>

      <a href="https://www.coursera.org/specializations/building-ai-agents-and-agentic-workflows" target="_blank" rel="noopener" class="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">04</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors">Building AI Agents &amp; Agentic Workflows</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5">IBM · Specialization</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap hidden sm:block">2026</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ============ PROYEK ============ -->
<section id="work" class="relative bg-section px-5 sm:px-10 py-28 sm:py-36 border-t border-line">
  <div class="max-w-3xl mx-auto">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent mb-3 reveal" data-i18n="work.label">05 · PROYEK</p>
    <p class="font-mono text-[11px] text-dim mb-14 reveal" data-i18n="work.intro">Klik untuk melihat detail proyek.</p>

    <!-- Featured: Thesis -->
    <button type="button" data-project="thesis" class="project-trigger group block w-full text-left mb-20 reveal reveal-delay-1">
      <div class="flex items-baseline justify-between gap-4 mb-3">
        <p class="font-mono text-[11px] text-dim" data-i18n="work.thesis.eyebrow">SKRIPSI · FEB 2026</p>
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors flex items-center gap-1.5 shrink-0">
          <span data-i18n="ui.viewDetail">Lihat detail</span>
          <svg class="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
      <h3 class="font-display font-semibold text-2xl sm:text-4xl text-ink leading-tight mb-5 max-w-2xl transition-opacity group-hover:opacity-80" data-i18n="work.thesis.heading">
        Deteksi dan klasifikasi sampah hierarkis dengan <span class="text-accent">YOLOv12 + HSCN</span>, mencapai F1 <span class="text-accent" data-count="0.844" data-decimals="3">0.844</span> dan mAP <span class="text-accent" data-count="0.967" data-decimals="3">0.967</span>.
      </h3>
      <p class="font-display text-[15px] text-dim leading-relaxed max-w-xl" data-i18n="work.thesis.desc">
        Pipeline dua tahap, YOLOv12 mendeteksi objek lalu Hierarchical Sequential Classification Network mengklasifikasikan tiga level hierarki sampah.
      </p>
      <p class="font-mono text-[11px] text-dim mt-5 border-b border-transparent group-hover:border-line pb-1 inline-block">PyTorch · YOLOv12 · Flask · OpenCV</p>
    </button>

    <!-- Other projects: clickable rows with index numbers -->
    <div class="border-t border-line reveal reveal-delay-2">

      <button type="button" data-project="visual-inspection" class="project-trigger group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full text-left py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">01</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors" data-i18n="work.r1.title">CNN Visual Inspection System</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5 hidden sm:block" data-i18n="work.r1.sub">X-Camp, PT XLSmart Telecom Sejahtera</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap" data-count="99.6" data-decimals="1" data-suffix="%">99.6%</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>

      <button type="button" data-project="rag-chatbot" class="project-trigger group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full text-left py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">02</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors" data-i18n="work.r2.title">RAG Chatbot untuk Booking Tiket Kapal</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5 hidden sm:block" data-i18n="work.r2.sub">PT Amman Mineral Internasional</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap" data-count="2" data-prefix="&lt;" data-suffix="s">&lt;2s</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>

      <button type="button" data-project="pneumonia" class="project-trigger group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full text-left py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">03</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors" data-i18n="work.r3.title">Pneumonia Detection dari Chest X-Ray</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5 hidden sm:block" data-i18n="work.r3.sub">Proyek pribadi</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap" data-count="92" data-suffix="%+">92%+</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>

      <button type="button" data-project="cognitive" class="project-trigger group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full text-left py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">04</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors" data-i18n="work.r4.title">Cognitive Performance Prediction</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5 hidden sm:block" data-i18n="work.r4.sub">Wearable biosignal · Empatica E4</p>
        </span>
        <span class="font-mono text-[12px] text-ink whitespace-nowrap" data-count="0.68" data-decimals="2" data-prefix="R² ">R² 0.68</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>

      <button type="button" data-project="fluenti" class="project-trigger group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 sm:gap-x-6 w-full text-left py-6 border-b border-line">
        <span class="font-mono text-[11px] text-dim group-hover:text-ink transition-colors">05</span>
        <span>
          <h4 class="font-display font-semibold text-ink text-lg leading-snug group-hover:text-mint transition-colors" data-i18n="work.r5.title">FLUENTI · AI Grammar Checker</h4>
          <p class="font-mono text-[11px] text-dim mt-0.5 hidden sm:block" data-i18n="work.r5.sub">Fine-tuning LLaMA 3</p>
        </span>
        <span class="font-mono text-[12px] text-dim whitespace-nowrap">2024-2025</span>
        <svg class="w-4 h-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-ink hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    </div>
  </div>
</section>

<!-- ============ PROJECT DETAIL MODAL ============ -->
<div id="projectModal" class="fixed inset-0 z-40 hidden">
  <div id="modalBackdrop" class="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
  <div class="absolute inset-0 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
    <div id="modalPanel" class="relative w-full sm:max-w-2xl sm:rounded-2xl border-0 sm:border border-line bg-panel min-h-screen sm:min-h-0 translate-y-6 opacity-0 transition-all duration-300 my-0 sm:my-10">
      <button id="modalClose" type="button" aria-label="Tutup" class="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 flex items-center justify-center rounded-full border border-line text-dim hover:text-ink hover:border-ink/40 transition-colors z-10">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div class="p-7 sm:p-10">
        <p id="modalEyebrow" class="font-mono text-[11px] tracking-[0.2em] text-accent mb-4"></p>
        <h3 id="modalTitle" class="font-display font-semibold text-2xl sm:text-3xl text-ink leading-tight mb-6 pr-10"></h3>

        <div id="modalMetrics" class="flex flex-wrap gap-x-8 gap-y-3 mb-8 pb-8 border-b border-line"></div>

        <div class="mb-7">
          <p class="font-mono text-[10px] tracking-[0.2em] text-dim mb-2" data-i18n="ui.overview">OVERVIEW</p>
          <p id="modalOverview" class="font-display text-[15px] text-dim leading-relaxed"></p>
        </div>

        <div class="mb-7">
          <p class="font-mono text-[10px] tracking-[0.2em] text-dim mb-3" data-i18n="ui.approach">PENDEKATAN</p>
          <ul id="modalApproach" class="space-y-2.5"></ul>
        </div>

        <div>
          <p class="font-mono text-[10px] tracking-[0.2em] text-dim mb-3" data-i18n="ui.stack">TECH STACK</p>
          <div id="modalStack" class="flex flex-wrap gap-2"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ============ PUBLIKASI ============ -->
<section id="publications" class="relative bg-section px-5 sm:px-10 py-28 sm:py-36 border-t border-line">
  <div class="max-w-3xl mx-auto">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent mb-14 reveal" data-i18n="pub.label">06 · PUBLIKASI</p>

    <div class="reveal reveal-delay-1">
      <h3 class="font-display font-semibold text-xl sm:text-2xl text-ink leading-snug mb-3 max-w-2xl border-b border-transparent hover:border-line transition-colors inline">
        Deteksi dan Klasifikasi Sampah Bertingkat Menggunakan YOLOv12 dan Hierarchical Sibling Classification Network
      </h3>
      <p class="font-mono text-[12px] text-dim" data-i18n="pub.venue">SENTRIN 2026 · Seminar Nasional Teknologi dan Rekayasa Informasi · <span class="text-accent">Dalam persiapan</span></p>
    </div>
  </div>
</section>

<!-- ============ SKILLS & TOOLS (marquee) ============ -->
<section id="skills" class="relative bg-section py-24 sm:py-28 border-t border-b border-line overflow-hidden">
  <p class="font-mono text-[11px] tracking-[0.25em] text-accent px-5 sm:px-10 max-w-3xl mx-auto mb-4 reveal" data-i18n="skills.label">07 · SKILLS &amp; TOOLS</p>
  <p class="font-mono text-[11px] text-dim px-5 sm:px-10 max-w-3xl mx-auto mb-12 reveal" data-i18n="skills.intro">Toolkit yang saya gunakan di riset, produksi, dan eksperimen.</p>

  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-bg to-transparent"></div>
    <div class="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-bg to-transparent"></div>
    <div class="space-y-8">
      <div class="overflow-hidden">
        <div id="marqueeTrack" class="flex gap-3 w-max marquee-track"></div>
      </div>
      <div class="overflow-hidden">
        <div id="marqueeTrackReverse" class="flex gap-3 w-max marquee-track marquee-track-reverse"></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ KONTAK ============ -->
<section id="contact" class="relative bg-section px-5 sm:px-10 pt-28 sm:pt-36 pb-44 border-t border-line">
  <div class="max-w-2xl mx-auto text-center">
    <p class="font-mono text-[11px] tracking-[0.25em] text-accent mb-6 reveal" data-i18n="contact.label">08 · KONTAK</p>
    <h2 class="font-display font-semibold text-3xl sm:text-5xl text-ink leading-tight mb-8 reveal reveal-delay-1"><span data-i18n="contact.heading">Mari membangun sesuatu yang berdampak bersama.</span></h2>

    <button id="copyEmailBtn" type="button" class="group relative inline-block font-mono text-lg sm:text-2xl text-ink reveal reveal-delay-1">
      <span id="copyEmailText">afinatsal41@gmail.com</span>
      <span class="absolute left-0 -bottom-1 h-px w-0 group-hover:w-full bg-ink transition-all duration-300"></span>
    </button>

    <div class="flex items-center justify-center gap-7 mt-9 font-mono text-[12px] text-dim reveal reveal-delay-2">
      <a href="https://linkedin.com/in/afinatsal" target="_blank" rel="noopener" class="contact-link flex items-center gap-1.5 hover:text-ink transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn
      </a>
      <a href="https://github.com/afinatsal" target="_blank" rel="noopener" class="contact-link flex items-center gap-1.5 hover:text-ink transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
        GitHub
      </a>
      <a href="mailto:afinatsal41@gmail.com" class="contact-link flex items-center gap-1.5 hover:text-ink transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
        <span data-i18n="contact.email">Email</span>
      </a>
      <a href="./CV_Afin_Atsal.pdf" download class="contact-link flex items-center gap-1.5 hover:text-ink transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
        <span data-i18n="contact.cv">CV</span>
      </a>
    </div>

    <p class="font-mono text-[11px] text-dim mt-14 reveal reveal-delay-2">Malang, Indonesia · +62 821-1514-0703</p>
  </div>
</section>

<!-- floating dock navbar · icon symbols, macOS-dock style magnification -->
<nav id="dock" class="fixed bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-end gap-2 px-4 py-3 rounded-full border border-line bg-panel/60 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
  <a href="#home" data-label="Home" class="dock-link active-dock relative flex items-center justify-center w-11 h-11 rounded-full text-ink transition-colors" style="transform-origin:bottom center;">
    <span class="dock-tooltip" data-i18n="dock.home">Home</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9"/></svg>
  </a>
  <a href="#about" data-label="Tentang" class="dock-link relative flex items-center justify-center w-11 h-11 rounded-full text-dim transition-colors" style="transform-origin:bottom center;">
    <span class="dock-tooltip" data-i18n="dock.about">Tentang</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>
  </a>
  <a href="#work" data-label="Proyek" class="dock-link relative flex items-center justify-center w-11 h-11 rounded-full text-dim transition-colors" style="transform-origin:bottom center;">
    <span class="dock-tooltip" data-i18n="dock.work">Proyek</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/></svg>
  </a>
  <a href="#certifications" data-label="Sertifikasi" class="dock-link relative flex items-center justify-center w-11 h-11 rounded-full text-dim transition-colors" style="transform-origin:bottom center;">
    <span class="dock-tooltip" data-i18n="dock.certs">Sertifikasi</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>
  </a>
  <a href="#contact" data-label="Kontak" class="dock-link relative flex items-center justify-center w-11 h-11 rounded-full text-dim transition-colors" style="transform-origin:bottom center;">
    <span class="dock-tooltip" data-i18n="dock.contact">Kontak</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
  </a>
</nav>

<style>
  .active-dock{ background:#BFFAF5 !important; color:#111315 !important; }
  .dock-link{ will-change:transform; }
  .dock-tooltip{
    position:absolute; bottom:calc(100% + 14px); left:50%; transform:translateX(-50%) translateY(4px);
    font-family:'Angie Sans', Georgia, sans-serif; font-size:12px; letter-spacing:0.02em;
    color:#F1F4F2; background:#252A2E; border:1px solid #353C42;
    padding:5px 10px; border-radius:8px; white-space:nowrap;
    opacity:0; pointer-events:none; transition:opacity .18s ease, transform .18s ease;
  }
  .dock-link:hover .dock-tooltip{ opacity:1; transform:translateX(-50%) translateY(0); }
  .dock-link:hover:not(.active-dock){ background:rgba(191,250,245,0.1); color:#74E6D5; }
  .dock-link{ transition: transform 150ms ease-out; }
  .dock-link:hover{ transform: translateY(-4px) scale(1.12); }
  .dock-link:active{ transform: translateY(-2px) scale(0.96); }
</style>`;

const LEGACY_SCRIPT = `
/* ================= INTERNATIONALIZATION (language switcher) ================= */
(function(){
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
})();

/* ================= LOADING SCREEN (CLI boot + split-door reveal) ================= */
(function(){
  const loader = document.getElementById('loader');
  if(!loader) return;
  const log = document.getElementById('loaderLog');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const statusEl = document.getElementById('loaderStatus');
  if(!log || !bar || !pct || !statusEl){ loader.remove(); return; }

  // React StrictMode double-runs this effect in dev (mount -> cleanup -> mount).
  // Let the first instance own the loader; ignore every later one.
  if(window.__afinLoaderActive) return;
  window.__afinLoaderActive = true;

  // play the intro once per browser session
  if(sessionStorage.getItem('afin_loader')){
    document.body.classList.add('ready');
    loader.remove();
    return;
  }
  sessionStorage.setItem('afin_loader', '1');

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('ready');
    loader.remove();
    return;
  }

  document.body.classList.add('loading');

  const LINES = [
    '$ init afin.dev',
    'ok  dither canvas',
    'ok  weights loaded',
    'ok  cv_pipeline up',
    'ok  uplink github',
    '->  ready.',
  ];
  const CHAR_MS = 9;
  const PAUSE_MS = 90;
  const CURSOR = '\u258C';

  // --- typewriter: reveal log lines one by one ---
  let lineIdx = 0, charsOut = 0;
  function typeLine(){
    if(lineIdx >= LINES.length){ return; }
    const line = LINES[lineIdx];
    if(charsOut >= line.length){
      log.textContent += '\\n';
      charsOut = 0; lineIdx++;
      setTimeout(typeLine, PAUSE_MS);
      return;
    }
    const span = document.createElement('span');
    span.textContent = line.slice(charsOut, charsOut + 1);
    log.appendChild(span);
    charsOut++;
    setTimeout(typeLine, CHAR_MS);
  }
  setTimeout(typeLine, 700);

  // --- progress: counter, bar and status sync ---
  const STEPS = [
    [0,   'BOOTING'],
    [32,  'STREAMING'],
    [64,  'MAPPING'],
    [92,  'LINKING'],
  ];
  const DURATION = 2100;
  const start = performance.now();

  function stepLabel(p){
    let label = 'READY';
    for(let i = STEPS.length - 1; i >= 0; i--){
      if(p >= STEPS[i][0]){ label = STEPS[i][1]; break; }
    }
    return label;
  }

  function reveal(){
    if(!loader.isConnected) return;
    document.body.classList.remove('loading');
    document.body.classList.add('ready');
    bar.style.width = '100%';
    pct.textContent = '100';
    statusEl.textContent = 'READY';
    loader.classList.add('loader-open');
    loader.style.pointerEvents = 'none';
    setTimeout(() => { if(loader.isConnected) loader.remove(); }, 1150);
  }

  // fail-safe: never leave the visitor trapped on the loader
  setTimeout(reveal, 3200);

  function tick(now){
    if(!loader.isConnected) return;
    const p = Math.min((now - start) / DURATION, 1);
    bar.style.width = (p * 100).toFixed(1) + '%';
    pct.textContent = String(Math.round(p * 100)).padStart(3, '0');
    statusEl.textContent = stepLabel(p * 100);
    if(p < 1) requestAnimationFrame(tick);
    else reveal();
  }
  requestAnimationFrame(tick);
})();

/* ================= DITHER BACKGROUND (Bayer ordered dithering + ambient drift) ================= */
(function(){
  const BAYER_4X4 = [
    [0,8,2,10],
    [12,4,14,6],
    [3,11,1,9],
    [15,7,13,5]
  ];
  const canvas = document.getElementById('ditherCanvas');
  const ctx = canvas.getContext('2d');
  const sourceCanvas = document.createElement('canvas');
  const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently:true });

  let sourceData=null, bw=0, bh=0, cell=8, rafId=0, resizeTimer;
  const img = new Image();
  img.src = "data:image/jpeg;base64,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";

  function resizeCanvas(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function prepareSource(){
    if(!img.complete || img.naturalWidth===0) return false;
    resizeCanvas();
    const cw = canvas.width, ch = canvas.height;
    if(cw===0||ch===0) return false;

    cell = Math.max(3, Math.round(Math.min(cw,ch)/220));
    bw = Math.ceil(cw/cell);
    bh = Math.ceil(ch/cell);
    sourceCanvas.width = bw;
    sourceCanvas.height = bh;

    const ir = img.naturalWidth/img.naturalHeight;
    const cr = bw/bh;
    let sw,sh,sx,sy;
    if(ir > cr){
      sh = img.naturalHeight; sw = sh*cr;
      sx = (img.naturalWidth-sw)*0.62; sy = 0;
    } else {
      sw = img.naturalWidth; sh = sw/cr;
      sx = 0; sy = (img.naturalHeight-sh)*0.22;
    }
    sourceCtx.drawImage(img, sx, sy, sw, sh, 0, 0, bw, bh);
    sourceData = sourceCtx.getImageData(0,0,bw,bh).data;
    return true;
  }

  let t=0;
  function renderFrame(){
    const cw = canvas.width, ch = canvas.height;
    if(!sourceData || cw===0 || ch===0){ rafId = requestAnimationFrame(renderFrame); return; }
    t += 0.012;

    ctx.clearRect(0,0,cw,ch);
    ctx.fillStyle = '#111315';
    ctx.fillRect(0,0,cw,ch);

    for(let y=0;y<bh;y++){
      for(let x=0;x<bw;x++){
        const idx = (y*bw+x)*4;
        const r=sourceData[idx], g=sourceData[idx+1], b=sourceData[idx+2];
        const lum = (0.299*r+0.587*g+0.114*b)/255;

        const drift = Math.sin(x*0.18+t*1.3)*Math.cos(y*0.16-t)*0.05;
        const baseLum = Math.min(1, Math.max(0, lum+drift));

        const threshold = (BAYER_4X4[y%4][x%4]+0.5)/16;
        const on = baseLum > threshold*0.92;

        if(on){
          const size = cell*(0.35+baseLum*0.55);
          const shade = Math.min(241, Math.max(70, 100 + baseLum*130));
          ctx.fillStyle = \`rgb(\${shade},\${shade*1.005},\${shade*0.99})\`;
          const dpx = x*cell + (cell-size)/2;
          const dpy = y*cell + (cell-size)/2;
          ctx.fillRect(dpx, dpy, size, size);
        }
      }
    }
    rafId = requestAnimationFrame(renderFrame);
  }

  img.onload = () => { prepareSource(); rafId = requestAnimationFrame(renderFrame); };
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(prepareSource, 120);
  });
})();

/* ================= SCRAMBLE TEXT ON NAME (hover proximity) ================= */
(function(){
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
      span.textContent = ch === ' ' ? '\\u00A0' : ch;
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
  heading.addEventListener('mousemove', e => {
    const rect = heading.getBoundingClientRect();
    hx = e.clientX - rect.left; hy = e.clientY - rect.top;
  });
  heading.addEventListener('mouseleave', () => { hx=-9999; hy=-9999; });

  function checkProximity(){
    const headingRect = heading.getBoundingClientRect();
    const radius = 70;
    letterEls.forEach(item => {
      const r = item.el.getBoundingClientRect();
      const cx = r.left + r.width/2 - headingRect.left;
      const cy = r.top + r.height/2 - headingRect.top;
      const dist = Math.sqrt((cx-hx)**2 + (cy-hy)**2);
      if(dist < radius) scrambleLetter(item);
    });
    requestAnimationFrame(checkProximity);
  }
  requestAnimationFrame(checkProximity);
})();

/* ================= DOCK ACTIVE STATE ON SCROLL ================= */
(function(){
  const links = document.querySelectorAll('nav a.dock-link');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const hudSection = document.getElementById('hudSection');
  const labels = { home:'01 · HOME', about:'02 · ABOUT', experience:'03 · EXPERIENCE', certifications:'04 · SERTIFIKASI', work:'05 · PROYEK', publications:'06 · PUBLIKASI', skills:'07 · SKILLS', contact:'08 · KONTAK' };
  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(sec => { if(sec && window.scrollY >= sec.offsetTop - window.innerHeight/2) current = sec; });
    links.forEach(a => {
      const match = current && a.getAttribute('href') === '#'+current.id;
      a.classList.toggle('active-dock', match);
      a.classList.toggle('text-dim', !match);
    });
    if(current && hudSection) hudSection.textContent = labels[current.id] || '';
  });
})();

/* Dock hover magnification is now handled purely by CSS (see .dock-link:hover
   rule below) instead of a per-frame JS loop · removes the lag/stiffness that
   came from recalculating transforms on every mousemove. */

/* ================= SCROLL REVEAL ================= */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));

  const transitions = document.querySelectorAll('.section-transition');
  const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        transitionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  transitions.forEach(section => transitionObserver.observe(section));
})();

/* ================= PROJECT DETAIL MODAL ================= */
(function(){
  let openId = null;

  function projectById(id){
    const I = window.__I18N && (window.__I18N[window.__LANG] || window.__I18N.id);
    return I ? I.projects[id] : null;
  }

  const modal = document.getElementById('projectModal');
  const backdrop = document.getElementById('modalBackdrop');
  const panel = document.getElementById('modalPanel');
  const closeBtn = document.getElementById('modalClose');
  if(!modal) return;

  const elEyebrow = document.getElementById('modalEyebrow');
  const elTitle = document.getElementById('modalTitle');
  const elMetrics = document.getElementById('modalMetrics');
  const elOverview = document.getElementById('modalOverview');
  const elApproach = document.getElementById('modalApproach');
  const elStack = document.getElementById('modalStack');

  function openModal(id){
    const p = projectById(id);
    if(!p) return;
    openId = id;

    elEyebrow.innerHTML = p.eyebrow;
    elTitle.innerHTML = p.title;
    elOverview.innerHTML = p.overview;

    elMetrics.innerHTML = p.metrics.map(([label,val]) =>
      \`<div><p class="font-display font-semibold text-xl text-ink">\${val}</p><p class="font-mono text-[10px] text-dim tracking-wide mt-0.5">\${label}</p></div>\`
    ).join('');

    elApproach.innerHTML = p.approach.map(item =>
      \`<li class="flex gap-3 font-display text-[15px] text-dim leading-relaxed"><span class="text-ink shrink-0">→</span><span>\${item}</span></li>\`
    ).join('');

    elStack.innerHTML = p.stack.map(s =>
      \`<span class="font-mono text-[11px] text-ink border border-line rounded-full px-3 py-1.5">\${s}</span>\`
    ).join('');

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
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
})();

/* ================= COPY EMAIL TO CLIPBOARD ================= */
(function(){
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
})();

/* ================= ANIMATED COUNTERS ================= */
(function(){
  const els = document.querySelectorAll('[data-count]');
  if(!els.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(el){
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || 0, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if(reduce){
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = decimals ? (target * eased).toFixed(decimals) : Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        io.unobserve(entry.target);
        run(entry.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
})();

/* ================= SKILLS & TOOLS MARQUEE (with logos) ================= */
(function(){
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
      ? \`<img src="https://cdn.simpleicons.org/\${tool.slug}/74E6D5" alt="" class="w-4 h-4 shrink-0" loading="lazy" onerror="this.style.display='none'" />\`
      : \`<span class="w-4 h-4 shrink-0 rounded-full border border-line" aria-hidden="true"></span>\`;
    return \`<span class="flex items-center gap-3 font-mono text-[13px] sm:text-sm text-ink border border-line bg-panel rounded-full pl-4 pr-5 py-2.5 whitespace-nowrap transition-colors hover:border-accent/60"\${hidden ? ' aria-hidden="true"' : ''}>\${iconHtml}\${tool.name}</span>\`;
  }

  // render twice back-to-back for a seamless infinite-loop marquee
  const build = items => items.map(t => renderItem(t, false)).join('') + items.map(t => renderItem(t, true)).join('');
  if(trackMain) trackMain.innerHTML = build(AI_ML);
  if(trackReverse) trackReverse.innerHTML = build(DATA_WEB);
})();
`;

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Make the translation dictionary available to the vanilla LEGACY_SCRIPT.
    window.__I18N = TRANSLATIONS;

    // Run the original script once the markup is in the DOM.
    const scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.text = LEGACY_SCRIPT;
    document.body.appendChild(scriptEl);

    return () => {
      document.body.classList.remove('modal-open');
      scriptEl.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: MARKUP }}
    />
  );
}
