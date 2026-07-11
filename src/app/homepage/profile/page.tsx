'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ScreeningHeader from '@/components/ScreeningHeader';
import { ZONES, SVAS_QUESTIONS, SVAS_OPTIONS } from '@/lib/screening-constants';
import { ZoneType } from '@/lib/screening-types';
import { CriteriaBarChart, PlatformBarChart, SVASRadarChart, DimensionAccordion } from '@/components/ResultVisualizations';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    age: '',
    gender: ''
  });

  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [viewModal, setViewModal] = useState<any>(null);

  useEffect(() => {
    const currentUsername = sessionStorage.getItem('screening_username');
    const loggedIn = sessionStorage.getItem('screening_logged_in') === 'true';
    const role = sessionStorage.getItem('screening_user_role');

    if (role === 'admin') {
      alert('Admin tidak memiliki halaman profil publik.');
      router.push('/homepage/admin');
      return;
    }

    if (!currentUsername || !loggedIn) {
      router.push('/homepage/auth');
    } else {
      setUsername(currentUsername);
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      fetch(`/api/profile?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setUser(data.user);
        });
      fetch(`/api/results?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const mappedHistory = data.data.map((r: any) => ({
              id: r.id,
              createdAt: r.date,
              userName: r.username,
              input: r.rawInput,
              result: r.rawResult
            }));
            setHistory(mappedHistory);
          }
        });
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        age: user.age ? user.age.toString() : '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (user && user.id) {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          age: formData.age,
          gender: formData.gender
        })
      });
      if (res.ok) setIsEditing(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Apakah kamu yakin ingin menghapus akun ini? Semua data riwayat kamu akan hilang permanen.')) {
      try {
        const res = await fetch(`/api/profile?username=${encodeURIComponent(username!)}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          sessionStorage.clear();
          router.push('/homepage');
        } else {
          alert('Gagal menghapus akun.');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!username) return null;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <ScreeningHeader />
      
      <main className="flex-grow w-full max-w-max-width-content mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-on-surface">Selamat datang, {username}</h1>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">{isEditing ? 'save' : 'edit'}</span>
              {isEditing ? 'Simpan Profil' : 'Edit Profil'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Nama Lengkap</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                disabled={!isEditing}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Nomor Telepon</label>
              <input 
                type="text" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm text-on-surface-variant">Alamat</label>
              <input 
                type="text" 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})}
                disabled={!isEditing}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Umur</label>
              <input 
                type="number" 
                value={formData.age} 
                onChange={e => setFormData({...formData, age: e.target.value})}
                disabled={!isEditing}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Jenis Kelamin</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
                disabled={!isEditing}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              >
                <option value="">Pilih...</option>
                <option value="Male">Laki-laki</option>
                <option value="Female">Perempuan</option>
                <option value="Other">Lainnya</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 border-t border-outline-variant pt-6">
            <button 
              onClick={handleDeleteAccount}
              className="text-error hover:text-on-error-container text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              Hapus Akun Permanen
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-on-surface mb-4">Riwayat Screening</h2>
          
          {history && history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider">
                <th className="p-4">Tanggal</th>
                <th className="p-4">Nama</th>
                <th className="p-4 text-center">Jawaban (Q1-Q6)</th>
                <th className="p-4 text-center">S-VAS</th>
                <th className="p-4">Zona</th>
                <th className="p-4">Skor</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={6} className="p-lg text-center text-on-surface-variant">Tidak ada rekaman tes ditemukan.</td></tr>
              ) : (
                history.map((r) => (
                  <tr key={r.id} className="border-b border-outline-variant hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm text-on-surface-variant">{new Date(r.createdAt).toLocaleDateString()} {new Date(r.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td className="p-4 font-medium text-on-surface">{r.userName}</td>
                    <td className="p-4">
                      {r.input.svasScores && r.input.svasScores.length > 0 ? (
                        <div className="flex justify-center gap-1">
                          {r.input.svasScores.map((score: number, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold ${
                              score >= 4 ? 'bg-error/10 text-error' :
                              score === 3 ? 'bg-[#f59e0b]/10 text-[#d97706]' :
                              'bg-primary/10 text-primary'
                            }`} title={`Q${i+1}: ${score}`}>
                              {score}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-xs text-on-surface-variant italic">-</div>
                      )}
                    </td>
                    <td className="p-4 text-center text-on-surface-variant">{r.result.svasTotal || '-'}/30</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        r.result.zone === 'NORMAL' ? 'bg-[#d1fae5] text-[#065f46]' : 
                        r.result.zone === 'BERISIKO' ? 'bg-[#fef3c7] text-[#92400e]' : 
            <tbody className="divide-y divide-outline-variant/50">
              {history.map((h: any, idx: number) => {
                const zoneInfo = ZONES[h.result.zone as ZoneType] || ZONES['NORMAL'];
                return (
                  <tr key={idx} className="hover:bg-surface-variant/10 transition-colors">
                    <td className="p-5 font-medium text-on-surface">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_month</span>
                        {new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-5">
                      <span 
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm inline-flex items-center gap-1.5"
                        style={{ backgroundColor: `${zoneInfo.color}15`, color: zoneInfo.color, borderColor: `${zoneInfo.color}30` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: zoneInfo.color }}></span>
                        {zoneInfo.label}
                      </span>
                    </td>
                    <td className="p-5 font-bold text-on-surface">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]" style={{ color: zoneInfo.color }}>stacked_bar_chart</span>
                        {h.result.detoxPercentage}%
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => setViewModal(h)}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-container bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl font-bold transition-colors text-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            </div>
          ) : (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">history</span>
              <p>Belum ada riwayat screening.</p>
              <Link href="/homepage/kuesioner" className="text-primary hover:underline mt-2 inline-block">
                Mulai screening sekarang
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      <AnimatePresence>
        {viewModal && (
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="fixed inset-0 bg-on-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(10px)' }} 
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }} 
              exit={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-5xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
            >
              {(() => {
                const zoneInfo = ZONES[viewModal.result.zone as ZoneType] || ZONES['NORMAL'];
                return (
                  <>
                    <div className="p-xl relative overflow-hidden shrink-0 border-b border-outline-variant" style={{ backgroundColor: zoneInfo.bgColor }}>
                      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-[120px] leading-none transform translate-x-1/4 -translate-y-1/4">
                        {zoneInfo.emoji}
                      </div>
                      <button onClick={() => setViewModal(null)} className="absolute top-4 right-4 text-on-surface hover:bg-surface/50 rounded-full p-2 backdrop-blur-sm transition-all z-10">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                      
                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                          <div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-sm"
                              style={{ backgroundColor: zoneInfo.color, color: '#fff' }}
                            >
                              {zoneInfo.label}
                            </span>
                            <h2 className="font-display-md text-on-surface font-bold tracking-tight">{viewModal.userName}</h2>
                            <p className="font-body-sm text-on-surface-variant flex items-center gap-1.5 mt-2 opacity-80">
                              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                              {new Date(viewModal.createdAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col items-center min-w-[120px]">
                              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Score Final</span>
                              <span className="font-display-lg font-bold" style={{ color: zoneInfo.color }}>{viewModal.result.detoxPercentage}%</span>
                            </div>
                            <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col items-center min-w-[120px]">
                              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">S-VAS Total</span>
                              <span className="font-display-lg font-bold" style={{ color: zoneInfo.color }}>{viewModal.result.svasTotal || '-'}/30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-xl overflow-y-auto flex-1 flex flex-col gap-xl bg-surface-container-lowest">
                      
                      <div className="grid grid-cols-1 gap-8 mb-8">
                        <div className="bg-surface border border-outline-variant rounded-2xl p-lg shadow-sm flex flex-col">
                          <div className="flex items-center gap-2 mb-6 justify-center">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">bar_chart</span>
                            <h3 className="font-label-md uppercase tracking-wider text-on-surface">Tingkat Kriteria</h3>
                          </div>
                          <div className="flex-1 w-full flex flex-col items-center justify-center mt-4 px-4 sm:px-12">
                            <CriteriaBarChart criteria={viewModal.result.svasCriteria || []} />
                            
                            <div className="w-full mt-10 pt-6 border-t border-outline-variant/50">
                              <h4 className="font-label-md uppercase tracking-wider text-on-surface mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">psychology</span>
                                Penjelasan Detail Dimensi
                              </h4>
                              <DimensionAccordion criteria={viewModal.result.svasCriteria || []} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-surface-variant/30 p-lg border-b border-outline-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px] text-primary">fact_check</span>
                          <h3 className="font-label-md uppercase tracking-wider text-on-surface">Rekam Jawaban Tes S-VAS</h3>
                        </div>
                        <div className="p-lg bg-surface-container-lowest">
                          {viewModal.input.svasScores && viewModal.input.svasScores.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              {SVAS_QUESTIONS.map((q, idx) => {
                                const score = viewModal.input.svasScores[idx] ?? 0;
                                const option = SVAS_OPTIONS.find(o => o.value === score);
                                return (
                                  <li key={q.id} className="flex flex-col gap-3 pb-6 border-b border-outline-variant/60 last:border-0 md:nth-last-child(-n+2):border-0 md:nth-last-child(-n+2):pb-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: option?.color || '#555' }}>
                                        {q.dimension}
                                      </span>
                                      <span 
                                        className="px-3 py-1 rounded-md text-[11px] font-bold shadow-sm border"
                                        style={{ backgroundColor: `${option?.color || '#ccc'}15`, color: option?.color || '#555', borderColor: `${option?.color || '#ccc'}30` }}
                                      >
                                        {option?.label || 'N/A'} ({score})
                                      </span>
                                    </div>
                                    <p className="text-base text-on-surface leading-relaxed">{q.text}</p>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-on-surface-variant text-sm italic py-4 text-center bg-surface-container-low rounded-lg border border-outline-variant/50">Data rekaman jawaban pertanyaan tidak tersedia untuk riwayat ini.</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                        <div className="bg-surface border border-outline-variant rounded-2xl p-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-6 justify-center">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">radar</span>
                            <h3 className="font-label-md uppercase tracking-wider text-on-surface">Pola Adiksi (S-VAS)</h3>
                          </div>
                          <div className="w-full flex justify-center">
                            <SVASRadarChart criteria={viewModal.result.svasCriteria || []} />
                          </div>
                        </div>
                        {/* Context Data */}
                        <div className="bg-surface border border-outline-variant rounded-2xl p-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-6 justify-center">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">analytics</span>
                            <h3 className="font-label-md uppercase tracking-wider text-on-surface">Data Konteks Saat Tes</h3>
                          </div>
                          <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                              <div className="flex items-center gap-3 text-on-surface-variant">
                                <span className="material-symbols-outlined">timer</span>
                                <span className="font-medium">Durasi Tonton (Jam/Hari)</span>
                              </div>
                              <span className="font-bold text-lg text-primary">{viewModal.result.contextScores?.totalDuration?.toFixed(1) || '-'} Jam</span>
                            </div>
                            <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                              <div className="flex items-center gap-3 text-on-surface-variant">
                                <span className="material-symbols-outlined">bedtime</span>
                                <span className="font-medium">Waktu Tidur Semalam</span>
                              </div>
                              <span className="font-bold text-lg text-primary">{viewModal.input.sleepHours} Jam</span>
                            </div>
                            <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                              <div className="flex items-center gap-3 text-on-surface-variant">
                                <span className="material-symbols-outlined">trending_down</span>
                                <span className="font-medium">Ggn. Produktivitas</span>
                              </div>
                              <span className="font-bold text-lg text-primary">{viewModal.input.productivityImpact} / 10</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Platform Duration Breakdown */}
                        <div className="bg-surface border border-outline-variant rounded-2xl p-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">pie_chart</span>
                            <h3 className="font-label-md uppercase tracking-wider text-on-surface">Distribusi Waktu Platform</h3>
                          </div>
                          <div className="bg-surface-container-lowest rounded-xl p-md">
                            <PlatformBarChart 
                              data={Object.entries(viewModal.input.platforms || {}).map(([name, hours]) => ({ name, hours: hours as number }))} 
                            />
                          </div>
                        </div>

                      {/* Recommendations */}
                        <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                          <div className="bg-primary/5 p-lg border-b border-outline-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary">lightbulb</span>
                            <h3 className="font-label-md uppercase tracking-wider text-on-surface text-primary">Saran & Solusi Sistem</h3>
                          </div>
                          <div className="p-lg bg-surface-container-lowest">
                            <div className="grid grid-cols-1 gap-4">
                              {(viewModal.result.recommendations || []).map((rec: any, idx: number) => (
                                <div key={idx} className={`border rounded-xl p-md flex flex-col sm:flex-row gap-4 sm:items-start transition-colors hover:bg-surface-variant/20 ${rec.urgent ? 'border-error/30 bg-error/5' : 'border-outline-variant/50'}`}>
                                  <div className={`p-3 rounded-lg shrink-0 flex items-center justify-center ${rec.urgent ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                                    <span className="material-symbols-outlined text-[28px]">
                                      {rec.icon || 'star'}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-title-md text-on-surface mb-2 flex items-center gap-3">
                                      {rec.title}
                                      {rec.urgent && <span className="px-2 py-0.5 bg-error text-on-error rounded text-[10px] uppercase font-bold tracking-widest shadow-sm">Urgent</span>}
                                    </h4>
                                    <p className="text-base text-on-surface-variant leading-relaxed">{rec.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>                      
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
