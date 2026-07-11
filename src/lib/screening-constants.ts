import { ZoneInfo, ZoneType, Recommendation } from './screening-types';

// ============================================================
// Zona Klasifikasi (3 Zona — SVAS-6)
// Cut-off point: 15 (Katsiroumpa et al., 2025)
// Total Skor: 6 - 30
// < 15: NORMAL
// 15 - 22: BERISIKO
// 23 - 30: KECANDUAN_TINGGI
// ============================================================
export const ZONES: Record<ZoneType, ZoneInfo> = {
  NORMAL: {
    label: 'Healthy User (Normal)',
    color: '#10B981', // Green
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    textColor: '#065f46',
    description: 'Penggunaan media sosial berada dalam batas wajar. Tidak ada indikasi ketergantungan yang mengganggu aktivitas sehari-hari.',
    emoji: '🟢',
  },
  BERISIKO: {
    label: 'Berisiko',
    color: '#F59E0B', // Yellow/Orange
    bgColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    textColor: '#92400e',
    description: 'Kamu mulai menunjukkan tanda-tanda ketergantungan yang berisiko mengganggu keseharian. Diperlukan intervensi ringan untuk membatasi durasi.',
    emoji: '🟡',
  },
  KECANDUAN_TINGGI: {
    label: 'Kecanduan',
    color: '#EF4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    textColor: '#7f1d1d',
    description: 'Indikasi kuat adanya kecanduan media sosial. Sangat disarankan untuk segera melakukan intervensi atau pembatasan ketat (Digital Detox).',
    emoji: '🔴',
  },
};

// ============================================================
// SVAS-6 Questions
// ============================================================
export const SVAS_QUESTIONS = [
  {
    id: 1,
    key: 'Q1_salience',
    dimension: 'Salience',
    text: 'Saya terus memikirkan video pendek (TikTok, Reels, Shorts) saat tidak sedang menontonnya.',
    subtitle: 'Pikiran didominasi oleh konten video',
    contoh: 'Misalnya: Lagi makan atau ngerjain tugas, tapi pikiran malah melayang pengen buka Sosmed.',
  },
  {
    id: 2,
    key: 'Q2_mood_modification',
    dimension: 'Mood Modification',
    text: 'Saya menjadikan video pendek sebagai pelarian dari masalah atau saat suasana hati sedang buruk.',
    subtitle: 'Penggunaan sebagai regulasi emosi negatif',
    contoh: 'Misalnya: Lagi stres atau bete, pelarian utamanya langsung nge-scroll buat nenangin diri.',
  },
  {
    id: 3,
    key: 'Q3_loss_of_control',
    dimension: 'Loss of Control',
    text: 'Saya merasa sulit untuk berhenti menonton video pendek meskipun saya sudah berniat untuk berhenti.',
    subtitle: 'Ketidakmampuan mengontrol durasi',
    contoh: 'Misalnya: Niatnya cuma scroll 5 menit, tapi tahu-tahu bablas sampai sejam dan susah buat stop.',
  },
  {
    id: 4,
    key: 'Q4_withdrawal_sad',
    dimension: 'Withdrawal',
    text: 'Saya merasa sedih atau tertekan jika tidak bisa menonton video pendek untuk sementara waktu.',
    subtitle: 'Gejala penarikan emosional',
    contoh: 'Misalnya: Pas kuota habis atau nggak ada sinyal, mood kamu langsung anjlok atau gampang bete.',
  },
  {
    id: 5,
    key: 'Q5_negative_outcomes',
    dimension: 'Negative Outcomes',
    text: 'Saya kesulitan berkonsentrasi pada pekerjaan atau pelajaran akibat durasi menonton video pendek.',
    subtitle: 'Dampak negatif pada produktivitas',
    contoh: 'Misalnya: Tugas jadi sering telat atau numpuk gara-gara terus nunda buat nge-scroll HP.',
  },
  {
    id: 6,
    key: 'Q6_withdrawal_anxious',
    dimension: 'Withdrawal',
    text: 'Saya merasa cemas jika tidak menonton, dan kecemasan itu reda setelah saya menonton video pendek lagi.',
    subtitle: 'Siklus kecemasan dan kelegaan semu',
    contoh: 'Misalnya: Ngerasa gelisah atau takut ketinggalan tren (FOMO), dan baru tenang setelah buka sosmed lagi.',
  },
] as const;

export const SVAS_OPTIONS = [
  { label: 'Sangat Jarang', value: 1, color: '#047857' },
  { label: 'Jarang', value: 2, color: '#34D399' },
  { label: 'Kadang-kadang', value: 3, color: '#FBBF24' },
  { label: 'Sering', value: 4, color: '#F97316' },
  { label: 'Sangat Sering', value: 5, color: '#EF4444' },
] as const;

// ============================================================
// Dominant Dimension Explanations (SVAS-6)
// ============================================================
export const DOMINANT_EXPLANATIONS: Record<string, string> = {
  Q1_salience: 'Kamu sering terpaku pada pemikiran tentang video pendek bahkan saat tidak membuka aplikasi. Ini menandakan bahwa aplikasi telah merebut fokus kognitif kamu secara berkelanjutan.',
  Q2_mood_modification: 'Kamu sangat mengandalkan video pendek sebagai satu-satunya cara untuk mengatasi masalah emosional (seperti stres atau kesedihan), menghambat strategi penyelesaian masalah yang nyata.',
  Q3_loss_of_control: 'Kamu mengalami kesulitan parah dalam menghentikan tontonan. Fitur algoritma aplikasi telah berhasil meredam kendali eksekutif otak kamu dalam membatasi waktu.',
  Q4_withdrawal_sad: 'Tubuh dan pikiran kamu memberikan respon kesedihan (withdrawal) ketika stimulasi dari video pendek terputus. Ini merupakan tanda awal dari siklus adiksi psikologis.',
  Q5_negative_outcomes: 'Konsentrasi kamu di dunia nyata terganggu secara signifikan. Video pendek telah menurunkan kemampuan kamu mempertahankan fokus (rentang perhatian) pada tugas-tugas penting.',
  Q6_withdrawal_anxious: 'Kamu terjebak dalam siklus kecemasan. Kamu merasa cemas jika jauh dari video pendek, dan merasa lega saat menontonnya kembali, mengindikasikan adiksi dopaminergik yang kuat.',
};

// ============================================================
// Detailed Dimension Explanations (For Accordion UI)
// ============================================================
export const DIMENSION_DETAILS: Record<string, { basic: string; scale12: string; scale3: string; scale45: string; solusi12: string; solusi3: string; solusi45: string }> = {
  Q1_salience: {
    basic: 'Salience (Dominasi Pikiran) adalah kondisi ketika media sosial menjadi hal yang sangat menonjol dalam pikiran, perasaan, dan aktivitas seseorang. Pengguna sering memikirkan media sosial, ingin segera mengecek notifikasi, atau merasa media sosial menjadi bagian utama dari rutinitas harian.',
    scale12: 'Penggunaan media sosial masih wajar. Pengguna tidak terlalu sering memikirkan media sosial dan masih mampu memprioritaskan aktivitas lain seperti belajar, bekerja, istirahat, atau berinteraksi langsung.',
    scale3: 'Media sosial mulai cukup sering muncul dalam pikiran atau kebiasaan harian. Pengguna mungkin sering mengecek media sosial saat bosan atau senggang, tetapi masih bisa mengendalikan diri.',
    scale45: 'Media sosial sudah menjadi pusat perhatian yang kuat. Pengguna sering merasa terdorong untuk membuka media sosial, bahkan saat sedang belajar, bekerja, beristirahat, atau melakukan aktivitas penting lain.',
    solusi12: 'Jaga agar media sosial tetap menjadi aktivitas tambahan dengan menetapkan waktu penggunaan yang wajar (misalnya hanya saat istirahat). Matikan notifikasi yang tidak penting, biasakan tidak membuka media sosial langsung setelah bangun tidur, dan pertahankan aktivitas offline seperti belajar, olahraga, dan tidur yang cukup.',
    solusi3: 'Tentukan jadwal untuk mengecek media sosial (misalnya 3-4 kali sehari) dan pindahkan aplikasi dari layar utama agar tidak dibuka secara otomatis. Gunakan mode fokus saat bekerja atau belajar, dan buatlah pengganti kebiasaan saat dorongan muncul seperti minum air atau berjalan.',
    solusi45: 'Gunakan pemblokir aplikasi atau screen time limit yang tegas, dan buat "zona bebas ponsel" pada saat makan, ibadah, atau sebelum tidur. Lakukan pengurangan ini secara bertahap agar tidak menimbulkan rasa FOMO yang berlebihan, serta mintalah bantuan orang terdekat untuk mengingatkan.'
  },
  Q2_mood_modification: {
    basic: 'Mood modification (Pelarian Emosi) berarti pengguna memakai media sosial untuk mengubah suasana hati, misalnya untuk menghilangkan stres, kesepian, bosan, sedih, atau cemas.',
    scale12: 'Pengguna mungkin memakai media sosial untuk hiburan, tetapi tidak menjadikannya cara utama untuk mengatasi emosi negatif.',
    scale3: 'Pengguna cukup sering membuka media sosial saat sedang bosan, stres, atau tidak nyaman secara emosional. Namun, pengguna masih memiliki cara lain untuk mengatur suasana hati.',
    scale45: 'Pengguna sangat bergantung pada media sosial untuk merasa lebih baik. Saat sedih, cemas, bosan, atau kesepian, media sosial menjadi pelarian utama dan sulit digantikan oleh aktivitas lain.',
    solusi12: 'Gunakan media sosial sebagai hiburan ringan dan bukan sebagai pelarian. Pertahankan mekanisme coping yang sehat seperti olahraga, tidur yang cukup, dan hobi, serta kenali emosi kamu terlebih dahulu sebelum membuka media sosial.',
    solusi3: 'Terapkan jeda 5-10 menit sebelum membuka aplikasi saat emosi sedang negatif, dan cobalah mengenali emosi yang muncul (bosan, sedih, atau lelah). Lakukan aktivitas non-digital terlebih dahulu seperti menarik napas atau jalan kaki, serta kurasi konten yang memicu perbandingan sosial.',
    solusi45: 'Kurangi penggunaan saat emosi sedang negatif dan hindari doomscrolling. Buatlah daftar "coping darurat" non-digital seperti menghubungi teman atau berolahraga. Jika rasa cemas terus-menerus muncul, pertimbangkan untuk mencari bantuan dari konselor.'
  },
  Q3_loss_of_control: {
    basic: 'Loss of control (Hilang Kendali) adalah kondisi ketika pengguna sulit membatasi atau menghentikan penggunaan media sosial, meskipun sudah berniat untuk mengurangi atau berhenti.',
    scale12: 'Pengguna masih mampu mengontrol durasi penggunaan. Jika berniat berhenti atau membatasi waktu, pengguna umumnya bisa melakukannya.',
    scale3: 'Pengguna kadang kehilangan kontrol, misalnya berniat membuka media sosial sebentar tetapi akhirnya memakai lebih lama dari rencana. Namun, kondisi ini belum selalu terjadi.',
    scale45: 'Pengguna sering gagal mengontrol penggunaan media sosial. Walaupun sadar sudah terlalu lama atau sedang memiliki kewajiban lain, pengguna tetap sulit berhenti.',
    solusi12: 'Tentukan tujuan yang jelas sebelum membuka aplikasi dan hindari scrolling tanpa tujuan. Gunakan timer ringan agar durasi tidak bertambah tanpa sadar dan cek laporan screen time secara berkala.',
    solusi3: 'Gunakan alarm atau batas waktu per aplikasi dan terapkan aturan untuk menyelesaikan tugas terlebih dahulu sebelum membuka media sosial. Kamu juga dapat menggunakan teknik Pomodoro dan logout dari aplikasi yang paling sering dibuka tanpa sadar.',
    solusi45: 'Gunakan aplikasi pemblokir yang terkunci pada jam-jam tertentu dan hapus sementara aplikasi yang paling sulit dikendalikan. Simpan ponsel di luar jangkauan saat sedang belajar atau tidur, dan mintalah orang terdekat untuk membantu memantau target kamu.'
  },
  Q4_withdrawal_sad: {
    basic: 'Withdrawal (Perasaan Tidak Nyaman) adalah perasaan tidak nyaman yang muncul ketika pengguna tidak bisa mengakses atau mengurangi penggunaan media sosial. Bentuknya bisa berupa gelisah, sedih, atau terus ingin mengecek akun.',
    scale12: 'Pengguna tetap merasa nyaman saat tidak membuka media sosial. Tidak ada rasa sedih atau tertekan yang berarti ketika jauh dari media sosial.',
    scale3: 'Pengguna mulai merasa kurang nyaman jika tidak membuka media sosial dalam waktu tertentu. Ada rasa sedih atau bosan, tetapi masih bisa dikendalikan.',
    scale45: 'Pengguna merasa sangat tidak nyaman saat tidak bisa membuka media sosial. Rasa sedih, tertekan, atau dorongan untuk mengecek media sosial cukup kuat dan dapat mengganggu keseharian.',
    solusi12: 'Biasakan untuk memiliki periode pendek tanpa ponsel, misalnya saat makan atau mandi. Jangan selalu membawa ponsel ke setiap aktivitas dan latihlah kebiasaan menunggu tanpa langsung membuka aplikasi.',
    solusi3: 'Mulailah dengan memberi jeda 15-30 menit tanpa media sosial lalu tingkatkan secara perlahan. Lakukan teknik grounding saat merasa gelisah (seperti menarik napas dalam), dan tetapkan jadwal mengecek media sosial untuk meredam rasa penasaran kamu.',
    solusi45: 'Lakukan pengurangan secara bertahap, misalnya mengurangi 15-30 menit per hari, dan ganti akses media sosial dengan aktivitas yang menenangkan. Hindari melakukan detox secara mendadak jika hal tersebut justru memicu rasa cemas yang berlebih.'
  },
  Q5_negative_outcomes: {
    basic: 'Negative outcomes (Dampak Negatif) adalah dampak negatif yang muncul akibat penggunaan media sosial, misalnya terganggunya tidur, belajar, pekerjaan, hubungan sosial, kesehatan mental, atau tanggung jawab sehari-hari.',
    scale12: 'Penggunaan media sosial belum memberikan dampak negatif yang berarti. Aktivitas utama seperti belajar, bekerja, tidur, dan hubungan sosial masih berjalan baik.',
    scale3: 'Dampak negatif mulai muncul sesekali, misalnya menunda tugas, tidur lebih larut, kurang fokus, atau merasa kurang produktif karena media sosial.',
    scale45: 'Media sosial sudah memberikan dampak negatif yang cukup jelas dan berulang. Pengguna mungkin sering mengabaikan tugas, kurang tidur, mengalami penurunan produktivitas, atau konflik.',
    solusi12: 'Pertahankan waktu tidur yang cukup dan hindari penggunaan media sosial saat sedang belajar, bekerja, atau berkendara. Pilihlah konten yang mendukung suasana hati dan tidak membuat kamu merasa stres.',
    solusi3: 'Jika tidur terganggu, hentikan penggunaan media sosial 60 menit sebelum tidur. Jika fokus belajar terganggu, gunakan mode fokus dan jauhkan ponsel kamu. Batasi atau unfollow akun-akun yang memicu kecemasan.',
    solusi45: 'Buatlah rencana pengurangan durasi yang jelas serta prioritaskan tidur, aktivitas akademik, dan hubungan sosial kamu. Gunakan pemblokir aplikasi pada malam hari, dan pertimbangkan untuk meminta bantuan ahli jika terjadi insomnia atau isolasi sosial.'
  },
  Q6_withdrawal_anxious: {
    basic: 'Tolerance/Withdrawal (Kecemasan) adalah kondisi dimana pengguna perlu menambah durasi penggunaan, atau munculnya rasa cemas/gelisah saat tidak membuka media sosial yang hanya mereda setelah membukanya kembali.',
    scale12: 'Pengguna belum merasa perlu menambah durasi dan tetap tenang saat jauh dari media sosial.',
    scale3: 'Pengguna mulai butuh waktu lebih lama atau merasa gelisah jika tidak mengecek media sosial secara berkala.',
    scale45: 'Pengguna terjebak dalam siklus. Merasa butuh durasi lebih lama, atau cemas kuat saat tidak menonton dan butuh menonton untuk meredakannya.',
    solusi12: 'Pantau waktu layar (screen time) kamu secara mingguan dan hindari mengunduh aplikasi adiktif yang baru. Tetapkan batas yang wajar secara khusus untuk menonton konten video pendek.',
    solusi3: 'Kurangi durasi secara bertahap sekitar 10-20% setiap minggunya, dan identifikasi serta batasi jenis konten yang paling menyita waktu. Gantilah waktu layar tersebut dengan menyalurkan hobi atau berinteraksi sosial secara langsung.',
    solusi45: 'Buatlah target pengurangan durasi mingguan yang terukur secara jelas. Hapus sementara aplikasi yang paling adiktif jika batasan biasa selalu gagal ditaati, dan jadwalkan aktivitas offline yang mampu memberikan rasa pencapaian bagi kamu.'
  }
};

// ============================================================
// Platform Configuration
// ============================================================
export const PLATFORM_CONFIG = [
  {
    key: 'instagram' as const,
    name: 'Instagram',
    color: '#E1306C',
    bgColor: 'rgba(225, 48, 108, 0.08)',
    borderColor: 'rgba(225, 48, 108, 0.2)',
    emoji: '',
  },
  {
    key: 'tiktok' as const,
    name: 'TikTok',
    color: '#00F2EA',
    bgColor: 'rgba(0, 242, 234, 0.08)',
    borderColor: 'rgba(0, 242, 234, 0.2)',
    emoji: '',
  },
  {
    key: 'youtube' as const,
    name: 'YouTube',
    color: '#FF0000',
    bgColor: 'rgba(255, 0, 0, 0.08)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
    emoji: '',
  },
  {
    key: 'twitter' as const,
    name: 'Twitter / X',
    color: '#1D9BF0',
    bgColor: 'rgba(29, 155, 240, 0.08)',
    borderColor: 'rgba(29, 155, 240, 0.2)',
    emoji: '',
  },
] as const;

// ============================================================
// Rekomendasi per Zona
// ============================================================
export const RECOMMENDATIONS: Record<ZoneType, Recommendation[]> = {
  NORMAL: [
    {
      priority: 1,
      title: 'Pesan Motivasi',
      description: 'Selamat! Penggunaan Kamu saat ini tergolong sehat. Pertahankan literasi digital dan batasan yang sudah ada.',
      icon: 'sentiment_very_satisfied',
    },
    {
      priority: 2,
      title: 'Evaluasi Mandiri Berkala',
      description: 'Sarankan melakukan tes ulang dalam 1 bulan untuk memastikan kebiasaan tetap terkontrol.',
      icon: 'fact_check',
    },
  ],
  BERISIKO: [
    {
      priority: 1,
      title: 'Batasi Durasi Akses (Segera)',
      description: 'Segera batasi durasi penggunaan aplikasi video pendek.',
      icon: 'timer',
      urgent: true,
    },
    {
      priority: 2,
      title: 'Matikan Autoplay',
      description: 'Matikan fitur autoplay di pengaturan aplikasi (TikTok/Reels) untuk mencegah transisi tontonan otomatis.',
      icon: 'app_blocking',
    },
    {
      priority: 3,
      title: 'Waktu Bebas Gadget',
      description: 'Tentukan jam "Bebas Gadget" setiap harinya, misalnya 1 jam penuh sebelum waktu tidur.',
      icon: 'schedule',
    },
  ],
  KECANDUAN_TINGGI: [
    {
      priority: 1,
      title: 'Tindakan Segera Pemulihan Mental',
      description: 'Dibutuhkan tindakan segera untuk pemulihan mental. Hentikan eksploitasi reward dopamin instan.',
      icon: 'warning',
      urgent: true,
    },
    {
      priority: 2,
      title: 'Modifikasi Visual (Grayscale)',
      description: 'Ubah layar HP ke mode Hitam-Putih (Grayscale) dari aksesibilitas untuk menghilangkan daya tarik visual yang adiktif.',
      icon: 'color_lens',
    },
    {
      priority: 3,
      title: 'Digital Detox',
      description: 'Lakukan Digital Detox. Hapus aplikasi video pendek dari smartphone kamu selama minimal 24 jam.',
      icon: 'delete_forever',
      urgent: true,
    },
    {
      priority: 4,
      title: 'Bantuan Profesional (Hotline)',
      description: 'Segera hubungi layanan konseling psikologi jika merasakan kecemasan berat atau depresi berkepanjangan.',
      icon: 'support_agent',
      urgent: true,
    },
  ],
};
