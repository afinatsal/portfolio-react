# Afin Atsal · Knowledge Base

Dokumen ini adalah satu-satunya sumber fakta untuk chatbot portofolio. Jawab HANYA berdasarkan informasi di dokumen ini. Jangan menambah atau menebak fakta yang tidak tertulis di sini.

## Identitas

- Nama lengkap: Muhammad Afin Atsal (dikenal sebagai Afin Atsal)
- Nama panggilan: Afin
- Posisi: AI/ML Engineer, spesialisasi Computer Vision dan Applied Deep Learning
- Eyebrow di situs: "AI/ML ENGINEER · INDONESIA"
- Tagline: "Membangun sistem AI dari riset ke produksi, dari notebook hingga deployment."
- Heading Tentang: "Saya AI/ML engineer yang membangun sistem computer vision."
- Lokasi: Malang, Indonesia
- Status: Terbuka untuk magang atau full-time
- Umur / detail pribadi lain: tidak dicantumkan di situs, jangan mengarang.

## Pendidikan

- S1 Teknologi Informasi, Universitas Brawijaya (FILKOM UB)
- IPK 3.64 / 4.00
- Fokus studi: computer vision dan applied deep learning

## Pengalaman Kerja

### 1. Instruktur Praktikum Python (FEB · JUL 2026)
- Organisasi: FILKOM & FMIPA, Universitas Brawijaya
- Mengampu praktikum pemrograman Python lintas fakultas selama satu semester.
- Tugas: menyusun kurikulum materi dan mengevaluasi hasil belajar mahasiswa.

### 2. AI/ML Engineer (MBKM) · X-Camp / PT XLSmart Telecom Sejahtera (AGU · DES 2025)
- Membangun sistem visual inspection berbasis CNN dengan akurasi 99.6%.
- Membangun deteksi objek hilang (Object Removal Detection) dengan OpenCV template matching.
- Membangun chatbot RAG internal.
- Metodologi Agile-Scrum, sprint mingguan.

### 3. Back-End & AI System Developer · PT Amman Mineral Internasional (JUL · AGU 2025)
- Merancang microservices FastAPI dengan PostgreSQL / PGVector.
- Membangun chatbot RAG untuk pemesanan tiket kapal (rute Kayangan–Benete).
- Latensi API rata-rata di bawah 2 detik.

### 4. Private Tutor · IoT & Applied AI (FREELANCE · BERJALAN)
- Lokasi: Malang, Indonesia
- Membimbing siswa SMA membangun sistem E-Nose untuk deteksi dini infeksi bakteri, dari sensor hingga klasifikasi berbasis AI.

## Organisasi & Kepemimpinan

### Wakil Ketua Departemen Kewirausahaan · KBMDSI FILKOM UB (FEB · DES 2024)
- Menjalankan 4 program utama.
- Menginisiasi DSI Store (merchandise) untuk pendanaan organisasi.
- Memimpin produksi PDH dan mengelola konten media sosial kewirausahaan.

### Ketua Sponsorship & Fundraising · FILAFEST 2023 (APR · DES 2023)
- Memimpin strategi akuisisi sponsor.
- Mengelola proposal dan negosiasi end-to-end.
- Mengumpulkan dana melebihi target anggaran festival.

## Sertifikasi

1. Machine Learning Specialization · DeepLearning.AI & Stanford Online (2025)
2. Google AI Professional Certificate · Google (2026, 8 kursus)
3. Google AI Essentials Specialization · Google (2025)
4. Building AI Agents & Agentic Workflows · IBM Specialization (2026)

## Skills & Tools

- AI/ML: Python, PyTorch, TensorFlow, Keras, OpenCV, Scikit-learn, XGBoost, LightGBM, Hugging Face, YOLO, LangChain
- Data & Web: FastAPI, Gradio, PostgreSQL, PGVector, Docker, Flutter, Firebase, Pandas, NumPy, Power BI, SQL, Apache Spark, Hadoop, ThingsBoard

## Proyek

### AI Labs · Studio AI (live website, 2026)
- Link: https://afinailabs.vercel.app/
- Studio yang memasang AI untuk bisnis, UMKM, dan pribadi.
- Layanan: chatbot perusahaan & UMKM, asisten pribadi berbasis AI, detektor computer vision untuk CCTV, jasa pengerjaan tugas machine learning, kelas pemasangan AI agent.
- Prinsip: setiap sistem dikerjakan sampai benar-benar berjalan di tempat yang nyata.
- Teknologi: React 19, Vite, Tailwind CSS 4, Framer Motion, font Bricolage Grotesque & IBM Plex.
- Fitur unggulan situs: hero reveal dengan lapisan gambar depan terkelupas mengikuti kursor, bento asimetris, carousel foto proyek.

### Lentera · Asisten Visual iOS untuk Tunanetra & Low Vision (2026)
- Aplikasi iOS pendamping harian untuk pengguna tunanetra dan low vision.
- Tiga mode: Baca Teks, Kenali Objek, Deteksi Rintangan.
- Baca Teks: arahkan kamera ke teks fisik (label, resep obat, papan nama, menu, dokumen); teks disusun ulang dalam urutan baca lalu dibacakan dengan suara bahasa Indonesia.
- Penyusunan teks memakai Google Gemini (model `gemini-3.5-flash-lite`); bila offline otomatis beralih ke OCR on-device (Vision framework) sebagai cadangan.
- Kenali Objek: Gemini menjelaskan objek di depan kamera, maksimal tiga kalimat, dari yang paling dominan.
- Deteksi Rintangan: Gemini memberi tahu rintangan (tangga, lubang, tembok, tiang, pintu, orang) lengkap dengan arah (kiri, kanan, depan).
- Kenapa Gemini: OCR on-device membaca teks apa adanya tanpa urutan baca dan ikut membaca logo/watermark; Gemini memahami konteks dan menyusun narasi yang rapi.
- Teknologi: Swift 5, SwiftUI, iOS 26, AVFoundation (AVCaptureSession, AVCaptureVideoDataOutput, AVCaptureVideoPreviewLayer), Vision (VNRecognizeTextRequest, bahasa id-ID & en-US), AVSpeechSynthesizer, Google Gemini API, VoiceOver, Dynamic Type, Reduce Motion, UIAccessibility, tipografi Atkinson Hyperlegible.
- Status: fase pengembangan aktif, versi 1.0, bundle identifier `afin.Lentera`.

### Skripsi: Multi-Stage Waste Detection · YOLOv12 + HSCN (FEB 2026)
- Judul lengkap publikasi: "Deteksi dan Klasifikasi Sampah Bertingkat Menggunakan YOLOv12 dan Hierarchical Sibling Classification Network".
- Pipeline dua tahap: YOLOv12 melokalisasi tiap objek sampah, lalu Hierarchical Sequential Classification Network (HSCN) memberi label tiga tingkat (status pengelolaan, jenis material, objek spesifik).
- Mengapa dibagi dua tahap: sampah perkotaan sulit dilihat dan diklasifikasikan sekaligus oleh satu model.
- Dataset: 2.116 gambar dengan 2.582 anotasi yang dikurasi dari TrashNet, Kaggle, TACO, dan RealWaste.
- Metrik: F1-Score 0.844, mAP 0.967.
- Pendekatan:
  - Membandingkan 3 varian YOLOv12 (S/M/L) untuk tahap deteksi.
  - Membenchmark 6 backbone HSCN: ResNet18/50/101, EfficientNet-B3, ConvNeXt-Small, MobileNetV3-Large.
  - Merancang hierarki 3 tingkat dengan mekanisme STOP-class supaya anotasi parsial tidak memaksa label yang salah.
  - Membangun aplikasi inferensi Flask dengan mode perbandingan backbone untuk sidang.
- Hasil: desain dua tahap mengalahkan classifier end-to-end; deteksi dulu meringankan beban classifier dari skala dan clutter.
- Stack: PyTorch, YOLOv12, Flask, OpenCV, ConvNeXt.
- Publikasi: SENTRIN 2026 · Seminar Nasional Teknologi dan Rekayasa Informasi · dalam persiapan.

### CNN Visual Inspection System (2025)
- Sistem QC lini produksi: CNN menandai produk cacat dari foto.
- Hasil mengalir ke dashboard ThingsBoard agar supervisor memantau lini real-time.
- Metrik: Akurasi 99.6%, Presisi 95.8%, Recall 100%, mAP@50 99.6%.
- Dibangun selama program MBKM X-Camp, sprint Scrum mingguan.
- Juga membangun Object Removal Detection dengan OpenCV template matching (multi-scale, normalized cross-correlation) untuk monitoring alat keselamatan, dengan status logic Detected / Partially Blocked / Missing dan alerting real-time.
- Stack: CNN, OpenCV, ThingsBoard, Python.

### RAG Chatbot untuk Booking Tiket Kapal (2025)
- Chatbot internal rute kapal Kayangan–Benete: jadwal, kursi kosong, cara booking dengan bahasa sehari-hari.
- Backend FastAPI: embed setiap pertanyaan dengan BGE-M3, ambil dari pgvector (top-k), LLM menyusun jawaban.
- Inovasi: preprocessing query LLM yang menulis ulang referensi waktu relatif ("besok") menjadi tanggal absolut sebelum pencarian agar hasil lebih akurat.
- Riwayat chat per sesi disimpan di PostgreSQL bersama tabel vektor boat_vectors dan trip_availability.
- Aplikasi Flutter sebagai antarmuka chat markdown dengan animasi; endpoint divalidasi lewat Postman.
- Metrik: Latensi API <2s.
- Stack: FastAPI, PostgreSQL, PGVector, Gemini, Flutter.

### Pneumonia Detection dari Chest X-Ray (2025)
- Klasifikasi chest X-ray untuk pneumonia di atas dataset publik yang imbalanced.
- CNN custom mengandalkan dropout dan batch normalization agar tetap di atas akurasi validasi 92%.
- Pendekatan: normalisasi, augmentasi, rebalancing data; melacak learning curve dan confusion matrix.
- Metrik: Akurasi Validasi 92%+.
- Stack: TensorFlow, Keras, OpenCV.

### Cognitive Performance Prediction (2025)
- Prediksi nilai ujian dari fisiologi: empat biosignal (HR, EDA, TEMP, ACC) dari Empatica E4 saat ujian.
- Pipeline: denoise, potong jadi windows, normalisasi, lalu Random Forest yang dituning.
- Metrik: R² Score 0.68.
- Stack: Scikit-learn, Pandas, NumPy.

### FLUENTI · AI Grammar Checker (2024–2025)
- Pengecek tata bahasa berbasis AI, hasil fine-tuning LLaMA 3.
- Stack: LLaMA 3, Python.

## Publikasi

- "Deteksi dan Klasifikasi Sampah Bertingkat Menggunakan YOLOv12 dan Hierarchical Sibling Classification Network" · SENTRIN 2026, Seminar Nasional Teknologi dan Rekayasa Informasi (dalam persiapan).

## Kontak

- Email: afinatsal41@gmail.com
- GitHub: https://github.com/afinatsal
- LinkedIn: https://www.linkedin.com/in/afinatsal
- Instagram: @afinnatsl
- WhatsApp / telepon: +62 821-1514-0703
- CV: tersedia sebagai file PDF di situs (CV_Afin_Atsal.pdf)
- Situs AI Labs: https://afinailabs.vercel.app/

## Karier / Opini (bukan fakta situs, jangan mengarang)

Tidak ada informasi opini pribadi di luar yang tertulis di dokumen ini. Jika ditanya soal pendapat, preferensi, atau hal di luar dokumen, katakan dengan jujur bahwa informasi tersebut tidak tersedia dan sarankan untuk menghubungi langsung lewat email atau WhatsApp.

## FAQ yang sering ditanyakan

- Siapa Afin Atsal? → AI/ML Engineer lulusan Teknologi Informasi Universitas Brawijaya (IPK 3.64), fokus computer vision dan applied deep learning.
- Bagaimana cara menghubungi? → Email afinatsal41@gmail.com, WhatsApp +62 821-1514-0703, LinkedIn linkedin.com/in/afinatsal.
- Apakah terbuka untuk kerja? → Ya, terbuka untuk magang atau full-time; hubungi lewat email atau WhatsApp.
- Bahasa pemrograman utama? → Python.
- Proyek yang paling menonjol? → Skripsi deteksi sampah YOLOv12 + HSCN (punya publikasi SENTRIN 2026), dan AI Labs sebagai studio AI-nya.
