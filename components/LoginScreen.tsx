import React, { useState } from 'react';
import { LockKeyhole, LogIn } from 'lucide-react';
import { isFirebaseConfigured, auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!auth) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('E-mail ou senha inválidos. Verifique seus dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-5 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red font-black italic text-white">FP</div>
          <p className="text-lg font-black italic tracking-tight">FIGHT <span className="text-brand-red">PERFORMANCE</span></p>
          <p className="mt-1 text-sm text-zinc-500">Área exclusiva do proprietário</p>
        </div>
        {!isFirebaseConfigured ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
            O Firebase ainda não foi configurado. Adicione as variáveis `VITE_FIREBASE_*` no arquivo `.env.local` para ativar o login.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">E-mail do proprietário</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-3 outline-none focus:border-brand-red" placeholder="voce@exemplo.com" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">Senha</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-3 outline-none focus:border-brand-red" placeholder="Sua senha" /></label>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 font-bold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"><LogIn size={18} /> {isLoading ? 'Entrando...' : 'Entrar no painel'}</button>
          </form>
        )}
        <p className="mt-7 flex items-center justify-center gap-2 text-xs text-zinc-400"><LockKeyhole size={13} /> Acesso protegido pelo Firebase Authentication</p>
      </div>
    </main>
  );
};

export default LoginScreen;
