import os

admin_path = 'src/app/screening/admin/page.tsx'
profile_path = 'src/app/screening/profile/page.tsx'

with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

# Extract table
table_start = admin_content.find('<table className="w-full text-left border-collapse">')
table_end = admin_content.find('</table>', table_start) + 8
table_jsx = admin_content[table_start:table_end]

# Modify table JSX for profile
table_jsx = table_jsx.replace('paginatedResults', 'history')
# Remove Edit and Delete buttons from action column
import re
table_jsx = re.sub(r'<button onClick=\{\(\) => \{ setEditModal\(r\); setEditName\(r\.userName\); \}\} className="text-primary hover:text-primary-container" title="Edit Name">[\s\S]*?</button>', '', table_jsx)
table_jsx = re.sub(r'<button onClick=\{\(\) => handleDelete\(r\.id\)\} className="text-error hover:text-on-error-container" title="Delete Record">[\s\S]*?</button>', '', table_jsx)


# Extract ViewModal
modal_start = admin_content.find('{/* View Modal */}')
modal_end = admin_content.find('</AnimatePresence>', modal_start) + 18
modal_jsx = admin_content[modal_start:modal_end]


profile_code = f"""'use client';

import {{ useState, useEffect }} from 'react';
import {{ useRouter }} from 'next/navigation';
import Link from 'next/link';
import ScreeningHeader from '@/components/ScreeningHeader';
import {{ ZONES, SVAS_QUESTIONS, SVAS_OPTIONS }} from '@/lib/screening-constants';
import {{ ZoneType }} from '@/lib/screening-types';
import {{ CriteriaBarChart, PlatformBarChart, SVASRadarChart }} from '@/components/ResultVisualizations';
import {{ motion, AnimatePresence }} from 'framer-motion';

export default function ProfilePage() {{
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({{
    name: '',
    phone: '',
    address: '',
    age: '',
    gender: ''
  }});

  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [viewModal, setViewModal] = useState<any>(null);

  useEffect(() => {{
    const currentUsername = sessionStorage.getItem('screening_username');
    const loggedIn = sessionStorage.getItem('screening_logged_in') === 'true';
    const role = sessionStorage.getItem('screening_user_role');

    if (role === 'admin') {{
      alert('Admin tidak memiliki halaman profil publik.');
      router.push('/screening/admin');
      return;
    }}

    if (!currentUsername || !loggedIn) {{
      router.push('/screening/auth');
    }} else {{
      setUsername(currentUsername);
    }}
  }}, [router]);

  useEffect(() => {{
    if (username) {{
      fetch(`/api/profile?username=${{encodeURIComponent(username)}}`)
        .then(res => res.json())
        .then(data => {{
          if (data.success) setUser(data.user);
        }});
      fetch(`/api/results?username=${{encodeURIComponent(username)}}`)
        .then(res => res.json())
        .then(data => {{
          if (data.success) {{
            const mappedHistory = data.data.map((r: any) => ({{
              id: r.id,
              createdAt: r.date,
              userName: r.username,
              input: r.rawInput,
              result: r.rawResult
            }}));
            setHistory(mappedHistory);
          }}
        }});
    }}
  }}, [username]);

  useEffect(() => {{
    if (user) {{
      setFormData({{
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        age: user.age ? user.age.toString() : '',
        gender: user.gender || ''
      }});
    }}
  }}, [user]);

  const handleSave = async () => {{
    if (user && user.id) {{
      const res = await fetch('/api/profile', {{
        method: 'PUT',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{
          username,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          age: formData.age,
          gender: formData.gender
        }})
      }});
      if (res.ok) setIsEditing(false);
    }}
  }};

  const handleDeleteAccount = async () => {{
    if (confirm('Apakah kamu yakin ingin menghapus akun ini? Semua data riwayat kamu akan hilang permanen.')) {{
      try {{
        const res = await fetch(`/api/profile?username=${{encodeURIComponent(username!)}}`, {{
          method: 'DELETE'
        }});
        if (res.ok) {{
          sessionStorage.clear();
          router.push('/screening');
        }} else {{
          alert('Gagal menghapus akun.');
        }}
      }} catch (e) {{
        console.error(e);
      }}
    }}
  }};

  if (!username) return null;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <ScreeningHeader />
      
      <main className="flex-grow w-full max-w-max-width-content mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-on-surface">Selamat datang, {{username}}</h1>
            <button 
              onClick={{() => isEditing ? handleSave() : setIsEditing(true)}}
              className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">{{isEditing ? 'save' : 'edit'}}</span>
              {{isEditing ? 'Simpan Profil' : 'Edit Profil'}}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Nama Lengkap</label>
              <input 
                type="text" 
                value={{formData.name}} 
                onChange={{e => setFormData({{{{\\dots}}formData, name: e.target.value}})}}
                disabled={{!isEditing}}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Nomor Telepon</label>
              <input 
                type="text" 
                value={{formData.phone}} 
                onChange={{e => setFormData({{{{\\dots}}formData, phone: e.target.value}})}}
                disabled={{!isEditing}}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm text-on-surface-variant">Alamat</label>
              <input 
                type="text" 
                value={{formData.address}} 
                onChange={{e => setFormData({{{{\\dots}}formData, address: e.target.value}})}}
                disabled={{!isEditing}}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Umur</label>
              <input 
                type="number" 
                value={{formData.age}} 
                onChange={{e => setFormData({{{{\\dots}}formData, age: e.target.value}})}}
                disabled={{!isEditing}}
                className="bg-surface border border-outline-variant rounded-lg px-3 py-2 disabled:opacity-50 text-on-surface"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-on-surface-variant">Jenis Kelamin</label>
              <select
                value={{formData.gender}}
                onChange={{e => setFormData({{{{\\dots}}formData, gender: e.target.value}})}}
                disabled={{!isEditing}}
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
              onClick={{handleDeleteAccount}}
              className="text-error hover:text-on-error-container text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              Hapus Akun Permanen
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-on-surface mb-4">Riwayat Screening</h2>
          
          {{history && history.length > 0 ? (
            <div className="overflow-x-auto">
              {table_jsx}
            </div>
          ) : (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">history</span>
              <p>Belum ada riwayat screening.</p>
              <Link href="/screening/kuesioner" className="text-primary hover:underline mt-2 inline-block">
                Mulai screening sekarang
              </Link>
            </div>
          )}}
        </div>
      </main>

      {modal_jsx}

    </div>
  );
}}
"""

# Fix python f-string escaping for JS spread operator
profile_code = profile_code.replace("{{\\dots}}", "...")

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_code)
