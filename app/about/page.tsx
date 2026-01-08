'use client';

import Link from 'next/link';  // ← BU SATIRI EKLE (en üstte)!

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#0d001f] to-[#1a0033]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-12 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
          About VelvetYume
        </h1>

        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-pink-500/30 shadow-2xl">
         <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            VelvetYume is your ultimate destination for raw, uncensored hentai games.  
            We bring you the most intense, immersive experiences straight from their creators — no filters, no limits.  
            RPGM, Unity, simulation, pixel and more… every type of +18 game is here, waiting for you in its original form.
            </p>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            Our mission is to provide a safe, reliable space where fans can explore their deepest fantasies through high-quality games and stories — all in their purest form.
          </p>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            We do not host files on our servers. All downloads redirect to trusted third-party services like Pixeldrain, Gofile, Drive, and WorkUpload.  
            Every title is carefully selected for its quality, story, and immersive experience.
          </p>

          <h2 className="text-3xl font-bold text-pink-400 mb-6 text-center">
            Why VelvetYume?
          </h2>
          <ul className="text-gray-300 text-lg space-y-4 list-disc pl-6">
            <li>Curated collection of premium hentai games and visual novels</li>
            <li>Raw, uncensored experiences in their original glory</li>
            <li>Fast, secure download links from trusted platforms</li>
            <li>Regular updates with the latest releases</li>
            <li>Community-focused — your fantasies matter</li>
          </ul>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mt-10 text-center">
            Dive in. Explore. Indulge.  
            <span className="text-pink-400 font-bold"> Welcome to VelvetYume.</span>
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-pink-600/20 hover:from-pink-500/40 hover:via-purple-600/40 hover:to-pink-600/40 text-pink-300 hover:text-white font-bold text-xl rounded-full border-2 border-pink-500/40 hover:border-pink-500/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}