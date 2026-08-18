// Copywriting dictionary for the portfolio. Keys mirror the `data-i18n`
// attributes placed in MARKUP plus dynamic content (project modal, toasts).
// `doc` is the value applied to <html lang>.
const TRANSLATIONS = {
  id: {
    doc: 'id',
    meta: { title: 'Muhammad Afin Atsal · AI/ML Engineer' },
    hero: {
      eyebrow: 'AI/ML ENGINEER · COMPUTER VISION',
      tagline: 'Membangun sistem AI dari riset ke produksi, dari notebook hingga deployment.',
    },
    about: {
      label: '02 · TENTANG',
      heading: 'Mengubah riset computer vision menjadi sistem produksi nyata, bukan sekadar notebook eksperimen.',
      body: 'Lulusan Teknologi Informasi Universitas Brawijaya (IPK 3.55/4.00) dengan fokus di computer vision dan applied deep learning. Saya membawa model dari eksperimen ke sistem yang terintegrasi produksi lewat dua program magang industri, serta memimpin riset skripsi pipeline deteksi sampah hierarkis dari nol, mulai dari kurasi dataset, benchmarking arsitektur, hingga aplikasi inferensi siap demo.',
      educationLabel: 'PENDIDIKAN',
      educationVal: 'Universitas<br>Brawijaya',
      gpaLabel: 'IPK',
      locationLabel: 'LOKASI',
      locationVal: 'Malang,<br>Indonesia',
      statusLabel: 'STATUS',
      statusVal: 'Terbuka untuk magang atau full-time',
    },
    exp: {
      label: '03 · PENGALAMAN',
      e1: {
        period: 'FEB 2026 · SEKARANG',
        title: 'Instruktur Praktikum Python',
        org: 'FILKOM &amp; FMIPA, Universitas Brawijaya',
        desc: 'Mengampu praktikum pemrograman Python lintas fakultas selama satu semester, mencakup penyusunan kurikulum materi dan evaluasi hasil belajar mahasiswa.',
      },
      e2: {
        period: 'AGU · DES 2025',
        title: 'AI/ML Engineer (MBKM)',
        org: 'X-Camp / MBKM · <span class="company-highlight">PT XLSmart Telecom Sejahtera</span>',
        desc: 'Membangun sistem visual inspection berbasis CNN (akurasi 99.6%), deteksi objek hilang dengan OpenCV, dan chatbot RAG internal dalam metodologi Agile-Scrum.',
      },
      e3: {
        period: 'JUL · AGU 2025',
        title: 'Back-End &amp; AI System Developer',
        org: '<span class="company-highlight">PT Amman Mineral Internasional</span>',
        desc: 'Merancang microservices FastAPI dengan PostgreSQL/PGVector untuk chatbot RAG pemesanan tiket kapal; latensi API rata-rata di bawah 2 detik.',
      },
      e4: {
        period: 'FREELANCE · BERJALAN',
        title: 'Private Tutor · IoT &amp; Applied AI',
        org: 'Malang, Indonesia',
        desc: 'Membimbing siswa SMA membangun sistem E-Nose untuk deteksi dini infeksi bakteri, dari sensor hingga klasifikasi berbasis AI.',
      },
    },
    cert: {
      label: '04 · SERTIFIKASI',
      intro: 'Klik untuk memverifikasi kredensial.',
      c2Detail: '8 kursus',
    },
    work: {
      label: '05 · PROYEK',
      intro: 'Klik untuk melihat detail proyek.',
      thesis: {
        eyebrow: 'SKRIPSI · FEB 2026',
        heading: 'Deteksi dan klasifikasi sampah hierarkis dengan <span class="text-accent">YOLOv12 + HSCN</span>.',
        desc: 'Pipeline dua tahap, YOLOv12 mendeteksi objek lalu Hierarchical Sequential Classification Network mengklasifikasikan tiga level hierarki sampah.',
      },
      r1: {
        title: 'CNN Visual Inspection System',
        sub: 'X-Camp, PT XLSmart Telecom Sejahtera',
      },
      r2: {
        title: 'RAG Chatbot untuk Booking Tiket Kapal',
        sub: 'PT Amman Mineral Internasional',
      },
      r3: {
        title: 'Pneumonia Detection dari Chest X-Ray',
        sub: 'Proyek pribadi',
      },
      r4: {
        title: 'Cognitive Performance Prediction',
        sub: 'Wearable biosignal · Empatica E4',
      },
      r5: {
        title: 'FLUENTI · AI Grammar Checker',
        sub: 'Fine-tuning LLaMA 3',
      },
    },
    pub: {
      label: '06 · PUBLIKASI',
      venue: 'SENTRIN 2026 · Seminar Nasional Teknologi dan Rekayasa Informasi · <span class="text-accent">Dalam persiapan</span>',
    },
    skills: {
      label: '07 · SKILLS &amp; TOOLS',
      intro: 'Toolkit yang saya gunakan di riset, produksi, dan eksperimen.',
    },
    contact: {
      label: '08 · KONTAK',
      heading: 'Mari membangun sesuatu yang berdampak bersama.',
      email: 'Email',
      cv: 'CV',
      copied: 'Tersalin ke clipboard!',
    },
    dock: {
      home: 'Home',
      about: 'Tentang',
      work: 'Proyek',
      certs: 'Sertifikasi',
      contact: 'Kontak',





    },
    ui: {
      overview: 'OVERVIEW',
      approach: 'PENDEKATAN',
      stack: 'TECH STACK',
      viewDetail: 'Lihat detail',
    },
    projects: {
      thesis: {
        eyebrow: 'SKRIPSI · AI ENGINEERING &amp; COMPUTER VISION',
        title: 'Multi-Stage Waste Detection · YOLOv12 + HSCN',
        metrics: [['F1-Score', '0.844'], ['mAP', '0.967'], ['Dataset', '2.116 gambar']],
        overview: 'Pipeline dua tahap untuk deteksi dan klasifikasi sampah, YOLOv12 mendeteksi objek dalam frame lalu Hierarchical Sequential Classification Network (HSCN) mengklasifikasikan tiga level hierarki, yaitu status pengelolaan, jenis material, dan objek spesifik. Dataset custom dikurasi dari TrashNet, Kaggle, TACO, dan RealWaste (2.116 gambar, 2.582 anotasi bounding box).',
        approach: [
          'Membandingkan 3 varian YOLOv12 (S/M/L) untuk tahap deteksi objek',
          'Membenchmark 6 backbone HSCN: ResNet18/50/101, EfficientNet-B3, ConvNeXt-Small, MobileNetV3-Large',
          'Merancang skema klasifikasi hierarkis 3 level dengan mekanisme STOP-class untuk anotasi parsial',
          'Membangun aplikasi inferensi Flask dengan mode perbandingan backbone untuk demo sidang',
        ],
        stack: ['PyTorch', 'YOLOv12', 'Flask', 'OpenCV', 'ConvNeXt'],
      },
      'visual-inspection': {
        eyebrow: 'X-CAMP · PT XLSMART TELECOM SEJAHTERA · 2025',
        title: 'CNN Visual Inspection System',
        metrics: [['Akurasi', '99.6%'], ['Presisi', '95.8%'], ['Recall', '100%'], ['mAP@50', '99.6%']],
        overview: 'Sistem computer vision untuk otomasi deteksi defect di lini produksi, dibangun dalam program MBKM X-Camp dengan metodologi Agile-Scrum sprint mingguan. Terintegrasi dengan dashboard ThingsBoard untuk monitoring produksi real-time.',
        approach: [
          'Melatih model CNN untuk klasifikasi defect pada citra produk lini produksi',
          'Mengintegrasikan output model ke dashboard ThingsBoard secara real-time',
          'Turut membangun Object Removal Detection dengan OpenCV template matching (multi-scale, normalized cross-correlation) untuk monitoring alat keselamatan',
          'Mengembangkan status logic Detected / Partially Blocked / Missing dengan real-time alerting',
        ],
        stack: ['CNN', 'OpenCV', 'ThingsBoard', 'Python'],
      },
      'rag-chatbot': {
        eyebrow: 'PT AMMAN MINERAL INTERNASIONAL · 2025',
        title: 'RAG Chatbot untuk Booking Tiket Kapal',
        metrics: [['Latensi API', '&lt;2s'], ['Bahasa', 'ID / EN']],
        overview: 'Back-end dan sistem AI untuk chatbot interaktif berbasis RAG yang mengotomasi pemesanan tiket kapal dalam ekosistem SuperApps internal perusahaan, dengan percakapan multi-turn bilingual dan memori kontekstual.',
        approach: [
          'Merancang arsitektur microservices modular dengan FastAPI',
          'Mengintegrasikan data jadwal real-time dengan PostgreSQL + PGVector untuk semantic search',
          'Mengimplementasikan pipeline RAG dengan Google Gemini API untuk percakapan multi-turn bilingual',
          'Validasi sistem lewat Postman API testing dan integrasi front-end Flutter',
        ],
        stack: ['FastAPI', 'PostgreSQL', 'PGVector', 'Gemini API', 'Flutter'],
      },
      pneumonia: {
        eyebrow: 'PROYEK PRIBADI · MARET 2024',
        title: 'Pneumonia Detection dari Chest X-Ray Images',
        metrics: [['Akurasi Validasi', '92%+']],
        overview: 'Convolutional Neural Network untuk mengklasifikasikan citra chest X-ray guna mendeteksi pneumonia dengan sensitivitas dan spesifisitas tinggi, dengan penanganan khusus untuk dataset yang imbalanced.',
        approach: [
          'Preprocessing data: normalisasi, augmentasi, dan class balancing',
          'Merancang arsitektur CNN custom dengan dropout dan batch normalization untuk mencegah overfitting',
          'Memvisualisasikan learning curve dan confusion matrix untuk interpretasi performa model',
        ],
        stack: ['TensorFlow', 'Keras', 'OpenCV'],
      },
      cognitive: {
        eyebrow: 'AI ENGINEERING &amp; DATA ANALYTICS · 2025',
        title: 'Cognitive Performance Prediction based on Wearable Exam Stress Data',
        metrics: [['R² Score', '0.68']],
        overview: 'Pipeline machine learning untuk memprediksi nilai ujian mahasiswa berdasarkan data biosignal (HR, EDA, TEMP, ACC) yang dikumpulkan dari wearable sensor Empatica E4.',
        approach: [
          'Preprocessing sinyal: denoising, sliding window segmentation, feature extraction, normalisasi',
          'Membangun dan tuning Random Forest Regressor untuk memetakan fitur fisiologis ke performa akademik',
          'Evaluasi model dengan R² pada test set',
        ],
        stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      fluenti: {
        eyebrow: 'AI ENGINEERING · 2024-2025',
        title: 'FLUENTI, AI Grammar Checking Model',
        metrics: [['Base Model', 'LLaMA 3'], ['Evaluasi', 'BLEU &amp; Edit Distance']],
        overview: 'Model AI grammar checking dengan pendekatan fine-tuning LLaMA 3, diselaraskan dengan target output menggunakan dataset domain-specific Grammarly CoEdit.',
        approach: [
          'Preprocessing dan tokenisasi dataset Grammarly CoEdit',
          'Fine-tuning LLaMA 3 dengan pendekatan alignment ke target output',
          'Evaluasi performa model menggunakan metrik BLEU dan edit distance',
        ],
        stack: ['LLaMA 3', 'Hugging Face', 'Python'],
      },
    },
  },

  en: {
    doc: 'en',
    meta: { title: 'Muhammad Afin Atsal · AI/ML Engineer' },
    hero: {
      eyebrow: 'AI/ML ENGINEER · COMPUTER VISION',
      tagline: 'Building AI systems that go from research to production, from notebook to deployment.',
    },
    about: {
      label: '02 · ABOUT',
      heading: 'Turning computer vision research into real production systems, not just experiment notebooks.',
      body: 'Information Technology graduate from Universitas Brawijaya (GPA 3.55/4.00), focused on computer vision and applied deep learning. I take models from experiment to production-integrated systems through two industry internships, and led my thesis research on a hierarchical waste detection pipeline from scratch, from dataset curation and architecture benchmarking to a demo-ready inference application.',
      educationLabel: 'EDUCATION',
      educationVal: 'Universitas<br>Brawijaya',
      gpaLabel: 'GPA',
      locationLabel: 'LOCATION',
      locationVal: 'Malang,<br>Indonesia',
      statusLabel: 'STATUS',
      statusVal: 'Open to internship or full-time',
    },
    exp: {
      label: '03 · EXPERIENCE',
      e1: {
        period: 'FEB 2026 · NOW',
        title: 'Python Lab Instructor',
        org: 'FILKOM &amp; FMIPA, Universitas Brawijaya',
        desc: 'Taught Python programming across faculties for a semester, including curriculum design and student assessment.',
      },
      e2: {
        period: 'AUG · DEC 2025',
        title: 'AI/ML Engineer (MBKM)',
        org: 'X-Camp / MBKM · <span class="company-highlight">PT XLSmart Telecom Sejahtera</span>',
        desc: 'Built a CNN visual inspection system (99.6% accuracy), object removal detection with OpenCV, and an internal RAG chatbot within an Agile-Scrum workflow.',
      },
      e3: {
        period: 'JUL · AUG 2025',
        title: 'Back-End &amp; AI System Developer',
        org: '<span class="company-highlight">PT Amman Mineral Internasional</span>',
        desc: 'Designed FastAPI microservices with PostgreSQL/PGVector for a RAG chatbot handling boat ticket bookings; average API latency under 2 seconds.',
      },
      e4: {
        period: 'FREELANCE · ONGOING',
        title: 'Private Tutor · IoT &amp; Applied AI',
        org: 'Malang, Indonesia',
        desc: 'Guided a high-school student in building an E-Nose system for early bacterial infection detection, from sensors to AI-based classification.',
      },
    },
    cert: {
      label: '04 · CERTIFICATIONS',
      intro: 'Click to verify credentials.',
      c2Detail: '8 courses',
    },
    work: {
      label: '05 · PROJECTS',
      intro: 'Click to view project details.',
      thesis: {
        eyebrow: 'THESIS · FEB 2026',
        heading: 'Hierarchical waste detection &amp; classification with <span class="text-accent">YOLOv12 + HSCN</span>.',
        desc: 'A two-stage pipeline, YOLOv12 detects objects then a Hierarchical Sequential Classification Network classifies three levels of waste hierarchy.',
      },
      r1: {
        title: 'CNN Visual Inspection System',
        sub: 'X-Camp, PT XLSmart Telecom Sejahtera',
      },
      r2: {
        title: 'RAG Chatbot for Boat Ticket Booking',
        sub: 'PT Amman Mineral Internasional',
      },
      r3: {
        title: 'Pneumonia Detection from Chest X-Ray',
        sub: 'Personal project',
      },
      r4: {
        title: 'Cognitive Performance Prediction',
        sub: 'Wearable biosignal · Empatica E4',
      },
      r5: {
        title: 'FLUENTI · AI Grammar Checker',
        sub: 'Fine-tuning LLaMA 3',
      },
    },
    pub: {
      label: '06 · PUBLICATIONS',
      venue: 'SENTRIN 2026 · National Seminar on Information Technology and Engineering · <span class="text-accent">In preparation</span>',
    },
    skills: {
      label: '07 · SKILLS &amp; TOOLS',
      intro: 'The toolkit I use across research, production, and experimentation.',
    },
    contact: {
      label: '08 · CONTACT',
      heading: 'Let\'s build something impactful together.',
      email: 'Email',
      cv: 'CV',
      copied: 'Copied to clipboard!',
    },
    dock: {
      home: 'Home',
      about: 'About',
      work: 'Projects',
      certs: 'Certifications',
      contact: 'Contact',





    },
    ui: {
      overview: 'OVERVIEW',
      approach: 'APPROACH',
      stack: 'TECH STACK',
      viewDetail: 'View details',
    },
    projects: {
      thesis: {
        eyebrow: 'THESIS · AI ENGINEERING &amp; COMPUTER VISION',
        title: 'Multi-Stage Waste Detection · YOLOv12 + HSCN',
        metrics: [['F1-Score', '0.844'], ['mAP', '0.967'], ['Dataset', '2,116 images']],
        overview: 'A two-stage pipeline for waste detection and classification, YOLOv12 detects objects in a frame then a Hierarchical Sequential Classification Network (HSCN) classifies three hierarchy levels, namely management status, material type, and specific object. A custom dataset was curated from TrashNet, Kaggle, TACO, and RealWaste (2,116 images, 2,582 bounding box annotations).',
        approach: [
          'Compared 3 YOLOv12 variants (S/M/L) for the object detection stage',
          'Benchmarked 6 HSCN backbones: ResNet18/50/101, EfficientNet-B3, ConvNeXt-Small, MobileNetV3-Large',
          'Designed a 3-level hierarchical classification scheme with a STOP-class mechanism for partial annotations',
          'Built a Flask inference app with backbone comparison mode for thesis defense demos',
        ],
        stack: ['PyTorch', 'YOLOv12', 'Flask', 'OpenCV', 'ConvNeXt'],
      },
      'visual-inspection': {
        eyebrow: 'X-CAMP · PT XLSMART TELECOM SEJAHTERA · 2025',
        title: 'CNN Visual Inspection System',
        metrics: [['Accuracy', '99.6%'], ['Precision', '95.8%'], ['Recall', '100%'], ['mAP@50', '99.6%']],
        overview: 'A computer vision system automating defect detection on a production line, built within the MBKM X-Camp program using weekly-sprint Agile-Scrum. Integrated with a ThingsBoard dashboard for real-time production monitoring.',
        approach: [
          'Trained a CNN model for defect classification on production-line product images',
          'Integrated model output into a ThingsBoard dashboard in real time',
          'Co-built Object Removal Detection with OpenCV template matching (multi-scale, normalized cross-correlation) for safety-equipment monitoring',
          'Developed Detected / Partially Blocked / Missing status logic with real-time alerting',
        ],
        stack: ['CNN', 'OpenCV', 'ThingsBoard', 'Python'],
      },
      'rag-chatbot': {
        eyebrow: 'PT AMMAN MINERAL INTERNASIONAL · 2025',
        title: 'RAG Chatbot for Boat Ticket Booking',
        metrics: [['API Latency', '&lt;2s'], ['Languages', 'ID / EN']],
        overview: 'Back-end and AI system for an interactive RAG chatbot that automates boat ticket booking inside the company\'s internal SuperApps ecosystem, with bilingual multi-turn conversations and contextual memory.',
        approach: [
          'Designed a modular microservices architecture with FastAPI',
          'Integrated real-time schedule data with PostgreSQL + PGVector for semantic search',
          'Implemented a RAG pipeline with the Google Gemini API for bilingual multi-turn conversations',
          'Validated the system via Postman API testing and Flutter front-end integration',
        ],
        stack: ['FastAPI', 'PostgreSQL', 'PGVector', 'Gemini API', 'Flutter'],
      },
      pneumonia: {
        eyebrow: 'PERSONAL PROJECT · MAR 2024',
        title: 'Pneumonia Detection from Chest X-Ray Images',
        metrics: [['Validation Accuracy', '92%+']],
        overview: 'A Convolutional Neural Network that classifies chest X-ray images to detect pneumonia with high sensitivity and specificity, with dedicated handling for an imbalanced dataset.',
        approach: [
          'Data preprocessing: normalization, augmentation, and class balancing',
          'Designed a custom CNN architecture with dropout and batch normalization to prevent overfitting',
          'Visualized learning curves and confusion matrices to interpret model performance',
        ],
        stack: ['TensorFlow', 'Keras', 'OpenCV'],
      },
      cognitive: {
        eyebrow: 'AI ENGINEERING &amp; DATA ANALYTICS · 2025',
        title: 'Cognitive Performance Prediction based on Wearable Exam Stress Data',
        metrics: [['R² Score', '0.68']],
        overview: 'A machine learning pipeline that predicts students\' exam scores from biosignal data (HR, EDA, TEMP, ACC) collected with the Empatica E4 wearable sensor.',
        approach: [
          'Signal preprocessing: denoising, sliding-window segmentation, feature extraction, normalization',
          'Built and tuned a Random Forest Regressor mapping physiological features to academic performance',
          'Evaluated the model with R² on the test set',
        ],
        stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      fluenti: {
        eyebrow: 'AI ENGINEERING · 2024-2025',
        title: 'FLUENTI, AI Grammar Checking Model',
        metrics: [['Base Model', 'LLaMA 3'], ['Evaluation', 'BLEU &amp; Edit Distance']],
        overview: 'An AI grammar-checking model fine-tuned from LLaMA 3, aligned to target outputs using the domain-specific Grammarly CoEdit dataset.',
        approach: [
          'Preprocessed and tokenized the Grammarly CoEdit dataset',
          'Fine-tuned LLaMA 3 with an alignment approach toward target outputs',
          'Evaluated model performance using BLEU and edit-distance metrics',
        ],
        stack: ['LLaMA 3', 'Hugging Face', 'Python'],
      },
    },
  },

  zh: {
    doc: 'zh-CN',
    meta: { title: '穆罕默德·阿芬·阿特萨尔 · AI/ML 工程师' },
    hero: {
      eyebrow: 'AI/ML 工程师 · 计算机视觉',
      tagline: '打造从研究走向生产、从笔记本到部署的 AI 系统。',
    },
    about: {
      label: '02 · 关于我',
      heading: '将计算机视觉研究转化为真正的生产系统，而不只是实验用的笔记本。',
      body: '毕业于布拉维加亚大学信息技术专业（绩点 3.55/4.00），专注于计算机视觉与应用深度学习。通过两次行业实习，我将模型从实验带入与生产集成的系统，并主导了毕业论文中从零构建的分层垃圾检测流水线，涵盖数据集整理、架构基准测试，以及可交付演示的推理应用。',
      educationLabel: '教育',
      educationVal: '布拉维加亚<br>大学',
      gpaLabel: '绩点',
      locationLabel: '地点',
      locationVal: '印度尼西亚<br>玛琅',
      statusLabel: '状态',
      statusVal: '可应聘实习或全职',
    },
    exp: {
      label: '03 · 经历',
      e1: {
        period: '2026年2月 · 至今',
        title: 'Python 实验课讲师',
        org: 'FILKOM &amp; FMIPA, 布拉维加亚大学',
        desc: '跨院系教授一学期 Python 编程课程，涵盖实验课纲设计与学生成绩评估。',
      },
      e2: {
        period: '2025年8月 · 12月',
        title: 'AI/ML 工程师（MBKM 项目）',
        org: 'X-Camp / MBKM · <span class="company-highlight">PT XLSmart Telecom Sejahtera</span>',
        desc: '构建了 CNN 视觉检测系统（准确率 99.6%）、基于 OpenCV 的物体缺失检测及内部 RAG 聊天机器人，采用敏捷 Scrum 方法论。',
      },
      e3: {
        period: '2025年7月 · 8月',
        title: '后端与 AI 系统开发工程师',
        org: '<span class="company-highlight">PT Amman Mineral Internasional</span>',
        desc: '使用 FastAPI 微服务与 PostgreSQL/PGVector 为船票预订 RAG 聊天机器人设计架构，API 平均延迟低于 2 秒。',
      },
      e4: {
        period: '自由职业 · 进行中',
        title: '私人导师 · 物联网与应用 AI',
        org: '印度尼西亚 玛琅',
        desc: '辅导高中生搭建用于早期细菌感染检测的电子鼻（E-Nose）系统，涵盖从传感器到 AI 分类的完整流程。',
      },
    },
    cert: {
      label: '04 · 证书',
      intro: '点击即可验证证书。',
      c2Detail: '8门课程',
    },
    work: {
      label: '05 · 项目',
      intro: '点击查看项目详情。',
      thesis: {
        eyebrow: '毕业论文 · 2026年2月',
        heading: '基于 <span class="text-accent">YOLOv12 + HSCN</span> 的分层垃圾检测与分类。',
        desc: '两阶段流水线，YOLOv12 负责物体检测，再由层级序列分类网络对三层垃圾层级进行分类。',
      },
      r1: {
        title: 'CNN 视觉检测系统',
        sub: 'X-Camp, PT XLSmart Telecom Sejahtera',
      },
      r2: {
        title: '船票预订 RAG 聊天机器人',
        sub: 'PT Amman Mineral Internasional',
      },
      r3: {
        title: '基于胸部 X 光的肺炎检测',
        sub: '个人项目',
      },
      r4: {
        title: '认知表现预测',
        sub: '可穿戴生物信号 · Empatica E4',
      },
      r5: {
        title: 'FLUENTI · AI 语法检查器',
        sub: '微调 LLaMA 3',
      },
    },
    pub: {
      label: '06 · 出版物',
      venue: 'SENTRIN 2026 · 全国信息技术与工程研讨会 · <span class="text-accent">筹备中</span>',
    },
    skills: {
      label: '07 · 技能与工具',
      intro: '我在研究、生产与实验中使用的工具集。',
    },
    contact: {
      label: '08 · 联系方式',
      heading: '一起打造有影响力的事物。',
      email: '邮箱',
      cv: '简历',
      copied: '已复制到剪贴板！',
    },
    dock: {
      home: '首页',
      about: '关于',
      work: '项目',
      certs: '证书',
      contact: '联系方式',





    },
    ui: {
      overview: '概述',
      approach: '实现方法',
      stack: '技术栈',
      viewDetail: '查看详情',
    },
    projects: {
      thesis: {
        eyebrow: '毕业论文 · AI 工程与计算机视觉',
        title: '多阶段垃圾检测 · YOLOv12 + HSCN',
        metrics: [['F1 分数', '0.844'], ['mAP', '0.967'], ['数据集', '2,116 张图片']],
        overview: '用于垃圾检测与分类的两阶段流水线，YOLOv12 检测画面中的物体，再由层级序列分类网络（HSCN）对三个层级进行分类，即管理状态、材料类型与具体物体。自定义数据集整理自 TrashNet、Kaggle、TACO 与 RealWaste（2,116 张图片，2,582 个边界框标注）。',
        approach: [
          '比较 3 种 YOLOv12 变体（S/M/L）用于物体检测阶段',
          '对 6 种 HSCN 骨干网络做基准测试：ResNet18/50/101、EfficientNet-B3、ConvNeXt-Small、MobileNetV3-Large',
          '设计带 STOP-class 机制的三层层级分类方案，处理部分标注',
          '构建带骨干对比模式的 Flask 推理应用，用于毕业答辩演示',
        ],
        stack: ['PyTorch', 'YOLOv12', 'Flask', 'OpenCV', 'ConvNeXt'],
      },
      'visual-inspection': {
        eyebrow: 'X-CAMP · PT XLSMART TELECOM SEJAHTERA · 2025',
        title: 'CNN 视觉检测系统',
        metrics: [['准确率', '99.6%'], ['精确率', '95.8%'], ['召回率', '100%'], ['mAP@50', '99.6%']],
        overview: '在生产线上实现缺陷检测自动化的计算机视觉系统，在 MBKM X-Camp 项目中以每周冲刺的敏捷 Scrum 方式构建，并集成 ThingsBoard 仪表盘进行实时生产监控。',
        approach: [
          '训练 CNN 模型对生产线产品图像进行缺陷分类',
          '将模型输出实时集成到 ThingsBoard 仪表盘',
          '协同构建基于 OpenCV 模板匹配（多尺度、归一化互相关）的物体缺失检测，用于安全装备监控',
          '开发 Detected / Partially Blocked / Missing 状态逻辑并实时告警',
        ],
        stack: ['CNN', 'OpenCV', 'ThingsBoard', 'Python'],
      },
      'rag-chatbot': {
        eyebrow: 'PT AMMAN MINERAL INTERNASIONAL · 2025',
        title: '船票预订 RAG 聊天机器人',
        metrics: [['API 延迟', '&lt;2s'], ['语言', 'ID / EN']],
        overview: '用于公司内部 SuperApps 生态系统中自动预订船票的交互式 RAG 聊天机器人的后端与 AI 系统，支持双语多轮对话与上下文记忆。',
        approach: [
          '使用 FastAPI 设计模块化微服务架构',
          '集成 PostgreSQL + PGVector 的实时时刻表数据，实现语义检索',
          '使用 Google Gemini API 实现双语多轮对话的 RAG 流水线',
          '通过 Postman API 测试与 Flutter 前端集成进行系统验证',
        ],
        stack: ['FastAPI', 'PostgreSQL', 'PGVector', 'Gemini API', 'Flutter'],
      },
      pneumonia: {
        eyebrow: '个人项目 · 2024年3月',
        title: '基于胸部 X 光图像的肺炎检测',
        metrics: [['验证准确率', '92%+']],
        overview: '对胸部 X 光图像进行分类以检测肺炎的卷积神经网络，具有较高的灵敏度与特异度，并对不均衡数据集做了专门处理。',
        approach: [
          '数据预处理：归一化、数据增强与类别均衡',
          '设计带 dropout 与批归一化的自定义 CNN 架构以防过拟合',
          '可视化学习曲线与混淆矩阵，以解读模型表现',
        ],
        stack: ['TensorFlow', 'Keras', 'OpenCV'],
      },
      cognitive: {
        eyebrow: 'AI 工程与数据分析 · 2025',
        title: '基于可穿戴考试压力数据的认知表现预测',
        metrics: [['R² 分数', '0.68']],
        overview: '根据 Empatica E4 可穿戴传感器采集的生物信号（HR、EDA、TEMP、ACC）预测学生考试成绩的机器学习流水线。',
        approach: [
          '信号预处理：去噪、滑动窗口分段、特征提取与归一化',
          '构建并调优随机森林回归模型，将生理特征映射到学业表现',
          '在测试集上以 R² 评估模型',
        ],
        stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      fluenti: {
        eyebrow: 'AI 工程 · 2024-2025',
        title: 'FLUENTI，AI 语法检查模型',
        metrics: [['基础模型', 'LLaMA 3'], ['评估', 'BLEU 与编辑距离']],
        overview: '基于 LLaMA 3 微调的 AI 语法检查模型，使用领域特定的 Grammarly CoEdit 数据集与目标输出对齐。',
        approach: [
          '预处理并分词 Grammarly CoEdit 数据集',
          '以对齐方式微调 LLaMA 3，使其贴近目标输出',
          '使用 BLEU 与编辑距离指标评估模型表现',
        ],
        stack: ['LLaMA 3', 'Hugging Face', 'Python'],
      },
    },
  },

  ja: {
    doc: 'ja',
    meta: { title: 'ムハンマド・アフィン・アサール · AI/MLエンジニア' },
    hero: {
      eyebrow: 'AI/MLエンジニア · コンピュータビジョン',
      tagline: '研究から本番運用まで、ノートブックからデプロイメントまで、AIシステムを構築します。',
    },
    about: {
      label: '02 · プロフィール',
      heading: 'コンピュータビジョンの研究を、単なる実験ノートではなく実際の本番システムへと変えます。',
      body: 'ブラウィジャヤ大学情報工学卒業（GPA 3.55/4.00）。コンピュータビジョンと応用ディープラーニングを専門とし、2つの企業インターンシップを通じてモデルを本番統合システムに昇華。卒業研究では階層型ゴミ検出パイプラインをゼロから構築し、データセット整備・アーキテクチャベンチマーク・デモ可能な推論アプリケーションまでを牽引しました。',
      educationLabel: '学歴',
      educationVal: 'ブラウィジャヤ<br>大学',
      gpaLabel: 'GPA',
      locationLabel: '所在地',
      locationVal: 'インドネシア<br>マラン',
      statusLabel: 'ステータス',
      statusVal: 'インターン・正社員募集中',
    },
    exp: {
      label: '03 · 経験',
      e1: {
        period: '2026年2月 · 現在',
        title: 'Python実習講師',
        org: 'FILKOM &amp; FMIPA, ブラウィジャヤ大学',
        desc: '学期を通じて学部横断でPythonプログラミングを指導し、シラバス設計と学生評価を担当。',
      },
      e2: {
        period: '2025年8月 · 12月',
        title: 'AI/MLエンジニア（MBKM）',
        org: 'X-Camp / MBKM · <span class="company-highlight">PT XLSmart Telecom Sejahtera</span>',
        desc: 'CNNビジョン検査システム（精度99.6%）、OpenCVによる物体欠落検出、社内RAGチャットボットをアジャイル・スクラムで開発。',
      },
      e3: {
        period: '2025年7月 · 8月',
        title: 'バックエンド・AIシステム開発者',
        org: '<span class="company-highlight">PT Amman Mineral Internasional</span>',
        desc: '船のチケット予約用RAGチャットボットをFastAPIマイクロサービス＋PostgreSQL/PGVectorで設計し、API平均レイテンシを2秒未満に。',
      },
      e4: {
        period: 'フリーランス · 継続中',
        title: '家庭教師 · IoT・応用AI',
        org: 'インドネシア マラン',
        desc: '高校生が細菌感染を早期検出するE-Noseシステム（センサーからAI分類まで）を構築する支援を実施。',
      },
    },
    cert: {
      label: '04 · 認定資格',
      intro: 'クリックして証明書を検証できます。',
      c2Detail: '8コース',
    },
    work: {
      label: '05 · プロジェクト',
      intro: 'クリックで詳細を見る。',
      thesis: {
        eyebrow: '卒業研究 · 2026年2月',
        heading: '<span class="text-accent">YOLOv12 + HSCN</span>による階層型ゴミ検出・分類。',
        desc: '2段階パイプライン。YOLOv12が物体を検出し、階層型系列分類ネットワークが3段階のゴミ階層を分類します。',
      },
      r1: {
        title: 'CNNビジョン検査システム',
        sub: 'X-Camp, PT XLSmart Telecom Sejahtera',
      },
      r2: {
        title: '船のチケット予約RAGチャットボット',
        sub: 'PT Amman Mineral Internasional',
      },
      r3: {
        title: '胸部X線からの肺炎検出',
        sub: '個人プロジェクト',
      },
      r4: {
        title: '認知パフォーマンス予測',
        sub: 'ウェアラブル生体信号 · Empatica E4',
      },
      r5: {
        title: 'FLUENTI · AI文法チェッカー',
        sub: 'LLaMA 3 のファインチューニング',
      },
    },
    pub: {
      label: '06 · 発表',
      venue: 'SENTRIN 2026 · 全国情報技術・エンジニアリングセミナー · <span class="text-accent">準備中</span>',
    },
    skills: {
      label: '07 · スキルとツール',
      intro: '研究・本番・実験で使っているツールキットです。',
    },
    contact: {
      label: '08 · お問い合わせ',
      heading: '一緒にインパクトのあるものを作りましょう。',
      email: 'メール',
      cv: '履歴書',
      copied: 'クリップボードにコピーしました！',
    },
    dock: {
      home: 'ホーム',
      about: 'プロフィール',
      work: 'プロジェクト',
      certs: '認定資格',
      contact: 'お問い合わせ',





    },
    ui: {
      overview: '概要',
      approach: 'アプローチ',
      stack: '技術スタック',
      viewDetail: '詳細を見る',
    },
    projects: {
      thesis: {
        eyebrow: '卒業研究 · AIエンジニアリング &amp; コンピュータビジョン',
        title: '多段階ゴミ検出 · YOLOv12 + HSCN',
        metrics: [['F1スコア', '0.844'], ['mAP', '0.967'], ['データセット', '2,116枚の画像']],
        overview: 'ゴミの検出と分類を行う2段階パイプライン。YOLOv12がフレーム内の物体を検出し、階層型系列分類ネットワーク（HSCN）が管理状態・素材種別・具体物の3つの階層レベルを分類します。カスタムデータセットはTrashNet、Kaggle、TACO、RealWasteから収集（画像2,116枚、バウンディングボックス2,582件）。',
        approach: [
          '物体検出段階で3つのYOLOv12バリアント（S/M/L）を比較',
          '6つのHSCNバックボーンをベンチマーク：ResNet18/50/101、EfficientNet-B3、ConvNeXt-Small、MobileNetV3-Large',
          '部分アノテーションに対応するSTOP-class機構を持つ3階層の階層型分類スキームを設計',
          '発表デモ用にバックボーン比較モード付きFlask推論アプリを構築',
        ],
        stack: ['PyTorch', 'YOLOv12', 'Flask', 'OpenCV', 'ConvNeXt'],
      },
      'visual-inspection': {
        eyebrow: 'X-CAMP · PT XLSMART TELECOM SEJAHTERA · 2025',
        title: 'CNNビジョン検査システム',
        metrics: [['精度', '99.6%'], ['適合率', '95.8%'], ['再現率', '100%'], ['mAP@50', '99.6%']],
        overview: '生産ラインでの欠陥検出を自動化するコンピュータビジョンシステム。MBKM X-Campプログラムで週次スプリントのアジャイル・スクラムにより開発し、ThingsBoardダッシュボードと統合してリアルタイムの生産監視を実現。',
        approach: [
          '生産ラインの製品画像に対する欠陥分類用CNNモデルを学習',
          'モデル出力をThingsBoardダッシュボードへリアルタイム統合',
          '安全装備監視用にOpenCVテンプレートマッチング（マルチスケール・正規化相互相関）による物体欠落検出を共同開発',
          'Detected / Partially Blocked / Missing の状態ロジックとリアルタイムアラートを開発',
        ],
        stack: ['CNN', 'OpenCV', 'ThingsBoard', 'Python'],
      },
      'rag-chatbot': {
        eyebrow: 'PT AMMAN MINERAL INTERNASIONAL · 2025',
        title: '船のチケット予約RAGチャットボット',
        metrics: [['APIレイテンシ', '&lt;2s'], ['言語', 'ID / EN']],
        overview: '社内SuperAppsエコシステム内で船のチケット予約を自動化する対話型RAGチャットボットのバックエンド・AIシステム。バイリンガルの多ターン対話と文脈記憶に対応。',
        approach: [
          'FastAPIによるモジュラーなマイクロサービスアーキテクチャを設計',
          'PostgreSQL + PGVectorでリアルタイムの時刻表データを統合しセマンティック検索を実現',
          'Google Gemini APIによるRAGパイプラインでバイリンガル多ターン対話を実装',
          'Postman APIテストとFlutterフロントエンド統合でシステムを検証',
        ],
        stack: ['FastAPI', 'PostgreSQL', 'PGVector', 'Gemini API', 'Flutter'],
      },
      pneumonia: {
        eyebrow: '個人プロジェクト · 2024年3月',
        title: '胸部X線画像からの肺炎検出',
        metrics: [['検証精度', '92%+']],
        overview: '胸部X線画像を分類して肺炎を検出する畳み込みニューラルネットワーク。高い感度と特異度を持ち、不均衡データセットにも特別に対応。',
        approach: [
          'データ前処理：正規化、データ拡張、クラス均衡化',
          '過学習を防ぐためdropoutとバッチ正規化を備えた独自CNNアーキテクチャを設計',
          '学習曲線と混同行列を可視化しモデル性能を解釈',
        ],
        stack: ['TensorFlow', 'Keras', 'OpenCV'],
      },
      cognitive: {
        eyebrow: 'AIエンジニアリング &amp; データ分析 · 2025',
        title: 'ウェアラブル受験ストレスデータに基づく認知パフォーマンス予測',
        metrics: [['R²スコア', '0.68']],
        overview: 'Empatica E4ウェアラブルセンサーで収集した生体信号（HR、EDA、TEMP、ACC）から学生の試験スコアを予測する機械学習パイプライン。',
        approach: [
          '信号前処理：ノイズ除去、スライディングウィンドウ分割、特徴抽出、正規化',
          '生理的特徴から学業成績をマッピングするランダムフォレスト回帰モデルを構築・チューニング',
          'テストセットでR²によりモデルを評価',
        ],
        stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      fluenti: {
        eyebrow: 'AIエンジニアリング · 2024-2025',
        title: 'FLUENTI、AI文法チェックモデル',
        metrics: [['ベースモデル', 'LLaMA 3'], ['評価', 'BLEU と編集距離']],
        overview: 'LLaMA 3をファインチューニングしたAI文法チェックモデル。ドメイン特化のGrammarly CoEditデータセットを用いて目標出力に整列。',
        approach: [
          'Grammarly CoEditデータセットの前処理とトークン化',
          '目標出力へのアライメントアプローチでLLaMA 3をファインチューニング',
          'BLEUと編集距離メトリクスでモデル性能を評価',
        ],
        stack: ['LLaMA 3', 'Hugging Face', 'Python'],
      },
    },
  },
};

export default TRANSLATIONS;
