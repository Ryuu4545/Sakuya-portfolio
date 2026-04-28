'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Нэвтрэхэд алдаа гарлаа');
      }
    } catch {
      setError('Сервертэй холбогдож чадсангүй');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(201,20,64,0.15), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(123,45,142,0.1), transparent 50%)',
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex items-end gap-[2px]">
              {[10, 16, 6, 14, 8].map((h, i) => (
                <div key={i} className="w-[3px] rounded-full bg-crimson" style={{ height: h }} />
              ))}
            </div>
            <span className="font-display text-2xl font-bold tracking-widest text-silver-light">ADMIN</span>
          </div>
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-silver-dark/50">Portfolio Dashboard</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-xl border border-white/[0.08] bg-abyss/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <h1 className="mb-6 text-center font-heading text-xl font-semibold text-silver-light">Нэвтрэх</h1>

          {error && (
            <div className="mb-4 rounded-lg border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson-light">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-heading text-xs font-medium uppercase tracking-[0.2em] text-silver-dark/60">Нэвтрэх нэр</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="admin"
                className="w-full rounded-lg border border-silver/10 bg-phantom/60 px-4 py-3 font-body text-sm text-silver-light outline-none transition-all placeholder:text-silver-dark/30 focus:border-crimson/40 focus:shadow-[0_0_20px_rgba(201,20,64,0.1)]" />
            </div>
            <div>
              <label className="mb-2 block font-heading text-xs font-medium uppercase tracking-[0.2em] text-silver-dark/60">Нууц үг</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full rounded-lg border border-silver/10 bg-phantom/60 px-4 py-3 font-body text-sm text-silver-light outline-none transition-all placeholder:text-silver-dark/30 focus:border-crimson/40 focus:shadow-[0_0_20px_rgba(201,20,64,0.1)]" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="mt-6 w-full rounded-lg bg-crimson px-6 py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/30 disabled:opacity-50">
            {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="font-heading text-xs text-silver-dark/40 transition-colors hover:text-crimson">← Нүүр хуудас руу буцах</a>
          </div>
        </form>
      </div>
    </div>
  );
}
