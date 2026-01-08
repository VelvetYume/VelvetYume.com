'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Giriş denemesi:\nEmail: ${email}\nŞifre: ${password}`);
  };

  return (
    <main className="min-h-screen bg-[#0d001f] flex flex-col items-center justify-center text-pink-400 p-6">
      <h1 className="text-5xl font-extrabold mb-8 neon-text">VelvetYume</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1a001f] p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Giriş Yap</h2>

        <input
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-[#2a0033] text-pink-200 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-[#2a0033] text-pink-200 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-black font-semibold py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Giriş Yap
        </button>

        <p className="text-center text-pink-300 mt-4">
          Hesabın yok mu?{' '}
          <a href="/register" className="text-pink-400 font-bold hover:underline">
            Kayıt Ol
          </a>
        </p>
      </form>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px #ff2bff, 0 0 20px #ff2bff, 0 0 40px #ff2bff;
        }
      `}</style>
    </main>
  );
}
