'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScreeningHeader from '@/components/ScreeningHeader';

export default function ArtikelPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <ScreeningHeader />

      <main className="flex-grow w-full flex flex-col items-center pb-24">
        {/* Article Container - Diperlebar menjadi max-w-5xl */}
        <article className="w-full max-w-5xl px-6 md:px-12 mt-12 md:mt-16">
          
          {/* ─── HEADER ARTIKEL ─── */}
          <header className="mb-12 border-b border-outline-variant pb-8">
            <div className="flex items-center gap-3 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Deep Dive & Edukasi
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight mb-6 text-left">
              Membedah SVAS-6: Landasan Ilmiah di Balik Kecanduan Video Pendek
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Ditulis oleh Tim MindScroll</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>Waktu Baca: ~8 Menit</span>
              </div>
            </div>
          </header>

          {/* ─── ISI ARTIKEL ─── */}
          <div className="prose-lg md:prose-xl text-on-surface-variant leading-relaxed space-y-6 text-left">
            <p>
              Pernah nggak sih, kamu niatnya cuma mau ngecek TikTok, Instagram Reels, atau YouTube Shorts selama 5 menit aja... eh pas lihat jam, tahu-tahu udah subuh? Tenang, kamu nggak sendirian. Di era digital sekarang, algoritma super canggih bekerja siang-malam buat bikin kamu nggak bisa berhenti nge-<em>scroll</em>.
            </p>
            <p>
              Fenomena ini sering disebut sebagai <strong>"Dopamine Economy"</strong>. Saat kamu nemu konten menarik, otakmu melepaskan dopamin (hormon bahagia). Masalahnya, kalau otak keseringan ditembak dopamin instan, kegiatan dunia nyata yang ritmenya lambat bakal terasa super ngebosenin. Dari keresahan inilah website <em>screening</em> ini lahir. Kami pengen bantu kamu mengukur secara objektif: sejauh mana perilaku <em>scrolling</em> ini udah masuk ke tahap adiktif?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-14 mb-6">
              Kenalan Dulu Sama SVAS-6 (Short Video Addiction Scale)
            </h2>
            <p>
              Tes yang kamu kerjain di website ini tuh bukan kuis tebak-tebakan abal-abal, lho. Kami menggunakan instrumen psikometrik asli bernama <strong>Short Video Addiction Scale (SVAS)</strong>. Skala ini awalnya dikembangkan dan divalidasi oleh para peneliti di China (Ye et al., 2024) di bidang psikologi dan perilaku digital, sebagai respons terhadap betapa gilanya fenomena kecanduan platform video pendek secara global.
            </p>
            <p>
              Secara ilmiah, SVAS dirancang berdasarkan konsep <em>behavioral addiction</em> (kecanduan perilaku). Instrumen ini awalnya diadaptasi dari <em>Bergen Facebook Addiction Scale (BFAS)</em>, yang kemudian dioptimalkan lagi menjadi versi super ringkas yang disebut <strong>SVAS-6 items</strong>. Dengan cuma enam butir pernyataan, alat ini udah bisa mengidentifikasi kecenderungan perilaku adiktif seseorang dengan sangat presisi.
            </p>
            <p>
              Biar kamu makin yakin, instrumen ini punya performa psikometrik yang "sakti" banget di dunia akademik! Pengujian konsistensi internalnya menunjukkan nilai koefisien <em>Cronbach's alpha</em> sebesar 0,799 dan <em>McDonald's omega</em> 0,808. Stabilitas metrik skala ini juga diperkuat oleh nilai <em>intraclass correlation coefficient (ICC)</em> sebesar 0,994 serta rentang <em>Cohen's kappa</em> antara 0,667 hingga 0,913. Ditambah lagi, lewat analisis faktor konfirmatori, SVAS-6 terbukti sebagai instrumen satu faktor yang sangat ringkas dan efisien (Katsiroumpa et al., 2025).
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-14 mb-6">
              Anatomi Candu: Bedah 6 Dimensi Indikator SVAS-6
            </h2>
            <p>
              Kalau kamu udah ikut tesnya, pasti kamu lihat grafik radar keren yang bentuknya punya 6 sudut, kan? Keenam sudut itu mewakili 6 indikator utama dari instrumen SVAS-6. Yuk, kita bedah satu per satu!
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">psychology</span>
              1. Salience
            </h3>
            <p>
              Indikator pertama ini terjadi di mana pikiranmu terus-menerus terfokus pada konten video pendek. Biarpun aplikasinya lagi ditutup atau kamu lagi nongkrong bareng temen, otakmu terus mengarah ke keinginan buat segera buka HP dan lanjut nge-<em>scroll</em>.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">update</span>
              2. Tolerance
            </h3>
            <p>
              Mencerminkan kebutuhan waktu menonton yang terus meningkat. Dulu mungkin nonton video pendek 15 menit udah cukup menghibur, sekarang durasinya jadi bengkak berjam-jam cuma buat dapetin rasa puas yang sama kayak dulu.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">mood</span>
              3. Mood Modification
            </h3>
            <p>
              Di tahap ini, video pendek digunakan secara aktif sebagai sarana pelarian untuk menghilangkan stres. Saat ada masalah, panik, atau sedih, pelarian utamamu adalah ngebuka medsos untuk mematikan perasaan-perasaan negatif tersebut.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">sync_problem</span>
              4. Relapse
            </h3>
            <p>
              Indikator yang menggambarkan kegagalan individu saat mencoba mengurangi durasi menonton. Udah niat ngurangin <em>screen time</em> atau bahkan nge-<em>uninstall</em> aplikasinya, eh besoknya dibongkar lagi. Ini tanda hilangnya kendali diri.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">sick</span>
              5. Withdrawal
            </h3>
            <p>
              Sensasi <em>sakaw</em> digital. Yaitu munculnya perasaan negatif (kayak cemas, gelisah, atau gampang marah) saat kamu nggak bisa mengakses aplikasi. Entah gara-gara kuota habis, nggak ada sinyal, atau baterai HP mati.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-10 mb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">gavel</span>
              6. Conflict
            </h3>
            <p>
              Ditandai dengan terganggunya kewajiban dan tanggung jawab. Entah itu urusan tugas akademik/pekerjaan yang terbengkalai, maupun hubungan sosial di dunia nyata yang rusak akibat aktivitas menonton video pendek yang kelewatan batas.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-14 mb-6">
              Skoring SVAS-6 dan 3 Tujuan Utama Skrining
            </h2>
            <p>
              Dalam penelitian aslinya, skala SVAS-6 menetapkan nilai ambang batas (<em>cut-off point</em>) optimal sebesar 15. Artinya, kalau skor totalmu <strong>≥ 15</strong>, itu mengindikasikan kecenderungan penggunaan video pendek yang problematis dengan probabilitas kecanduan tinggi. Sebaliknya, kalau skormu <strong>&lt; 15</strong>, kamu dikategorikan sebagai pengguna yang sehat (Katsiroumpa et al., 2025). 
            </p>
            <p>
              Di website kami, perhitungan tersebut dikonversi secara otomatis ke dalam sistem persentase dan visual zona skor (Normal, Waspada, Kritis) agar lebih gampang kamu pahami. Penggunaan instrumen SVAS dalam penelitian dan praktik klinis (termasuk website ini) sebenarnya mencakup 3 aspek utama:
            </p>
            <ul className="list-disc pl-6 space-y-4 my-6 marker:text-primary">
              <li>
                <strong>Sebagai Sarana Skrining (Deteksi Dini):</strong> Mengidentifikasi individu yang berisiko mengalami gangguan perilaku akibat penggunaan video pendek yang berlebihan sebelum jadi makin parah.
              </li>
              <li>
                <strong>Sebagai Instrumen Pemetaan Perilaku:</strong> Membantu kita memahami dimensi kecanduan mana yang paling dominan. Misalnya, apakah kamu paling bermasalah di hilangnya kontrol (Relapse) atau malah di gangguan tanggung jawab (Conflict)?
              </li>
              <li>
                <strong>Sebagai Alat Evaluasi Intervensi:</strong> Dipakai untuk menilai efektivitas tindakan pencegahan. Coba tes lagi bulan depan setelah kamu ngurangin jatah main HP, dan lihat apakah skor SVAS-mu membaik!
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-14 mb-6">
              Kenapa Kami Juga Menanyakan Kualitas Tidur & Produktivitas?
            </h2>
            <p>
              Mungkin kamu bingung, "Tes kecanduan kok nanyain jam tidur sama gangguan produktivitas?" <em>Well</em>, kecanduan medsos itu nggak pernah menyerang sendirian. Dia bakal ngerusak pilar utama kesehatanmu melalui dua jalur ini:
            </p>
            
            <h3 className="text-2xl font-bold text-on-surface mt-8 mb-3">1. Manipulasi Sirkadian (Efek Blue Light)</h3>
            <p>
              Layar HP memancarkan cahaya biru (<em>blue light</em>) yang menipu kelenjar di otakmu buat mikir "Oh, masih siang nih." Akibatnya, produksi melatonin (hormon tidur) mandek. Efeknya? Kamu jadi susah tidur, kualitas tidur memburuk, dan siklus sirkadianmu berantakan.
            </p>

            <h3 className="text-2xl font-bold text-on-surface mt-8 mb-3">2. Attention Span yang Ciut (Context-Switching Fatigue)</h3>
            <p>
              Otak yang telanjur kebiasaan ngeproses informasi baru setiap 15 detik bakal kelabakan kalau disuruh fokus ngerjain satu tugas berat berjam-jam (kayak nulis laporan atau belajar). Otakmu bakal ngerasa bosan luar biasa dan produktivitas kerjamu pun hancur lebur.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-14 mb-6">
              <em>So, What's Next?</em>
            </h2>
            <p>
              Memahami landasan ilmiah dan cara kerja algoritma yang memanipulasi psikologimu adalah langkah pertama buat merebut kembali kebebasan digitalmu. Kalau informasi dari penelitian-penelitian di atas bikin kamu mikir "Wah, ini *gue* banget," tapi kamu belum ngambil tesnya... yuk, cobain sekarang!
            </p>
          </div>

          {/* ─── CTA BUTTON ─── */}
          <div className="mt-16 pt-10 border-t border-outline-variant flex justify-center">
            <Link
              href="/homepage/kuesioner"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-[28px]">assignment</span>
              Cek Skor Kecanduanmu Sekarang!
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
