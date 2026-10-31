import React, { useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../lib/firebaseData';
import type { User } from 'firebase/auth';

export function AuthPanel({ user, onAuthChanged }: { user: User | null; onAuthChanged?: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      if (mode === 'register') await registerUser(name.trim(), email.trim(), password);
      else await loginUser(email.trim(), password);
      setPassword(''); setMessage('Authentication successful.'); onAuthChanged?.();
    } catch (error: any) {
      setMessage(error?.message?.replace('Firebase: ', '') || 'Authentication failed.');
    } finally { setBusy(false); }
  }

  if (user) return <section className="rounded-2xl border border-stone-200 bg-white p-5">
    <h2 className="text-lg font-bold">Signed in</h2>
    <p className="mt-1 text-sm text-stone-600">{user.displayName || 'JUSTAY user'} · {user.email}</p>
    <button onClick={async () => { await logoutUser(); }} className="mt-4 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white">Sign out</button>
  </section>;

  return <section className="rounded-2xl border border-stone-200 bg-white p-5">
    <h2 className="text-lg font-bold">{mode === 'login' ? 'Sign in to JUSTAY' : 'Create your JUSTAY account'}</h2>
    <p className="mt-1 text-sm text-stone-600">Your bookings and wishlist will be saved to your Firebase account.</p>
    <form onSubmit={submit} className="mt-4 space-y-3">
      {mode === 'register' && <input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border p-3" />}
      <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border p-3" />
      <input required minLength={6} type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (at least 6 characters)" className="w-full rounded-xl border p-3" />
      <button disabled={busy} className="w-full rounded-xl bg-red-950 px-4 py-3 font-semibold text-white disabled:opacity-50">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    </form>
    {message && <p role="status" className="mt-3 break-words text-sm text-stone-600">{message}</p>}
    <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }} className="mt-4 text-sm font-semibold text-red-900 underline">{mode === 'login' ? 'New here? Create an account' : 'Already registered? Sign in'}</button>
  </section>;
}
