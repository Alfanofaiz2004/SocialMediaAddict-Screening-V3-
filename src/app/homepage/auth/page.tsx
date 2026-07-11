'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { db } from '@/lib/db'; // Dexie removed
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Mohon masukkan username dan password.');
      return;
    }

    if (username === 'admin' && password === '10123406') {
      sessionStorage.setItem('screening_username', 'admin');
      sessionStorage.setItem('screening_admin_auth', 'true');
      sessionStorage.setItem('screening_user_role', 'admin');
      sessionStorage.setItem('screening_logged_in', 'true');
      router.push('/homepage/admin');
      return;
    } else if (username === 'admin') {
      setError('Password admin salah.');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('screening_username', data.user.username);
        sessionStorage.setItem('screening_user_role', data.user.role);
        sessionStorage.setItem('screening_logged_in', 'true');
        router.push(data.user.role === 'admin' ? '/homepage/admin' : '/homepage/profile');
      } else {
        setError(data.error || 'Login gagal.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat proses login.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !phone) {
      setError('Mohon lengkapi semua kolom.');
      return;
    }

    const cleanUsername = username.toLowerCase().trim();
    if (cleanUsername === 'admin' || cleanUsername === 'guest') {
      setError('Username ini tidak dapat digunakan.');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone })
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('screening_username', data.user.username);
        sessionStorage.setItem('screening_user_role', 'user');
        sessionStorage.setItem('screening_logged_in', 'true');
        router.push('/homepage/profile');
      } else {
        setError(data.error || 'Gagal mendaftar.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mendaftar.');
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center px-4 font-body-md text-on-background">
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        className="bg-surface-container-lowest border border-outline-variant p-6 sm:p-10 rounded-3xl shadow-xl w-[90vw] max-w-[400px] min-w-[300px]"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-primary-container/30 rounded-2xl flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-[32px]">shield_person</span>
          </div>
          <h1 className="font-headline-md text-2xl font-bold text-on-surface">MindScroll Auth</h1>
        </div>

        <div className="flex w-full mb-6 bg-surface border border-outline-variant rounded-lg p-1">
          <button 
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'login' ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Masuk
          </button>
          <button 
            onClick={() => { setActiveTab('signup'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'signup' ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Daftar
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.form key="login" onSubmit={handleLogin} initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: 10, filter: 'blur(10px)' }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface">Username</label>
                <input
                  type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface">Password</label>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                />
              </div>

              {error && <div className="text-error text-sm text-center bg-error-container/20 p-2 rounded-lg">{error}</div>}

              <button type="submit" className="w-full bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-medium px-4 py-3 rounded-xl transition-colors mt-2 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">login</span>
                Login
              </button>
            </motion.form>
          ) : (
            <motion.form key="signup" onSubmit={handleSignup} initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -10, filter: 'blur(10px)' }} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface">Username</label>
                <input
                  type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface">Nomor Telepon</label>
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-on-surface">Password</label>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                />
              </div>

              {error && <div className="text-error text-sm text-center bg-error-container/20 p-2 rounded-lg">{error}</div>}

              <button type="submit" className="w-full bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-medium px-4 py-3 rounded-xl transition-colors mt-2 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <button 
          onClick={() => router.push('/homepage')}
          className="w-full mt-6 text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          Kembali ke Home
        </button>
      </motion.div>
    </div>
  );
}
