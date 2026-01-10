// components/GameDetails.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Game } from '@/types/game'; 

export default function GameDetails({ game }: { game: Game }) {
  const [selectedOS, setSelectedOS] = useState<string | null>(null);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || !game.screenshots || game.screenshots.length === 0) return;
    const interval = setInterval(() => {
      setCurrentScreenshotIndex((prev) => (prev + 1) % (game.screenshots?.length ?? 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, game.screenshots?.length]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentScreenshotIndex((prev) =>
      prev === 0 ? (game.screenshots?.length ?? 0) - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentScreenshotIndex((prev) => (prev + 1) % (game.screenshots?.length ?? 0));
  };

  const goToIndex = (index: number) => {
    setIsAutoPlay(false);
    setCurrentScreenshotIndex(index);
  };

  const router = useRouter();

  const availableOS = Object.keys(game.download ?? {});
  const hasWindows = availableOS.includes('Windows');
  const hasAndroid = availableOS.includes('Android');

  const getDownloadLinksForOS = (os: string) => {
  const download = game.download ?? {}; // ← boş obje
  return download[os as keyof typeof download] ?? {}; // ← kırmızı kalkar (os'u anahtar olarak zorla)
};

  const handleOSClick = (os: string) => {
    setSelectedOS(os === selectedOS ? null : os);
  };

  const handleTagClick = (tag: string) => {
  router.push(`/?category=${encodeURIComponent(tag)}#games`);
};
  const platformConfig = {
    'Gofile': { icon: '📁', color: 'from-blue-500 to-cyan-600', bg: 'from-blue-500/20 to-cyan-600/20' },
    'Pixeldrain': { icon: '🖥️', color: 'from-purple-500 to-pink-600', bg: 'from-purple-500/20 to-pink-600/20' },
    'WorkUpload': { icon: '💾', color: 'from-green-500 to-emerald-600', bg: 'from-green-500/20 to-emerald-600/20' },
    'Drive': { icon: '🚗', color: 'from-yellow-500 to-orange-600', bg: 'from-yellow-500/20 to-orange-600/20' },
    'Mega': { icon: '☁️', color: 'from-indigo-500 to-violet-600', bg: 'from-indigo-500/20 to-violet-600/20' },
    'MediaFire': { icon: '🔥', color: 'from-red-500 to-orange-600', bg: 'from-red-500/20 to-orange-600/20' },
    'default': { icon: '📥', color: 'from-pink-500 to-purple-600', bg: 'from-pink-500/20 to-purple-600/20' }
  };

  return (
    <main className="min-h-screen bg-[#0d001f] text-pink-400 p-4 md:p-8 max-w-7xl mx-auto">
      {/* ANA RESİM */}
      <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-900/80 bg-black group">
  <Image
    src={game.img ?? '/images/placeholder.jpg'}
    alt={game.title}
    fill
    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-105 contrast-110"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
</div>


      {/* OYUN BİLGİLERİ */}
      <div className="bg-gradient-to-br from-[#1a001f]/95 via-[#0d001f]/90 to-[#1a001f]/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-pink-500/30">
        
        <h1 className="text-5xl md:text-7xl font-black text-center mb-8 neon-text bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
          {game.title}
        </h1>

        <div className="text-center mb-10">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-2 border-pink-500/40 rounded-full text-lg font-semibold text-pink-300">
            {game.type}
          </span>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-center px-4">
            {game.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left">
          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20">
            <span className="block text-pink-400 font-bold mb-2">Developer</span>
            <span className="text-white font-semibold">{game.developer}</span>
          </div>
          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20">
            <span className="block text-pink-400 font-bold mb-2">Publisher</span>
            <span className="text-white font-semibold">{game.publisher}</span>
          </div>
          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20">
            <span className="block text-pink-400 font-bold mb-2">Version</span>
            <span className="text-pink-300 font-bold text-lg">{game.version}</span>
          </div>
          {game.languages && game.languages.length > 0 && (
            <div className="p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20">
              <span className="block text-pink-400 font-bold mb-2">Languages</span>
              <span className="text-white font-semibold">
                {game.languages.join(", ")}
              </span>
            </div>
          )}
        </div>

        {game.category && game.category.length > 0 && (
          <div className="text-center mb-12">
            <p className="text-2xl font-bold text-pink-300 mb-6">Tags</p>
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
              {game.category.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tag)}
                  className="group/tag px-6 py-3 bg-gradient-to-r from-purple-500/20 via-pink-600/20 to-purple-500/20 border-2 border-purple-500/40 rounded-full text-sm md:text-base font-semibold text-purple-300 shadow-lg backdrop-blur-sm hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500/40 hover:via-pink-600/40 hover:to-purple-500/40 hover:border-purple-500/70 hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer"
                  title={`View games in "${tag}" category`}
                >
                  <span className="relative z-10">{tag}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur opacity-0 group-hover/tag:opacity-100 transition-opacity duration-500 -z-10" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-pink-300">Downloads</h2>

          <div className={`grid ${hasWindows && hasAndroid ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 max-w-4xl mx-auto`}>
            {hasWindows && (
              <button
                onClick={() => handleOSClick('Windows')}
                className={`group/os flex flex-col items-center justify-center gap-4 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 relative overflow-hidden ${
                  selectedOS === 'Windows'
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 scale-105 shadow-blue-500/25 border-2 border-blue-400/80'
                    : 'bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 hover:from-blue-600/40 via-indigo-600/40 to-purple-600/40 text-white/80 hover:text-white border-2 border-blue-500/40 hover:border-blue-500/70 hover:scale-105'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-sm ${selectedOS === 'Windows' ? 'scale-110' : ''}`}>
                    <svg className={`w-12 h-12 ${selectedOS === 'Windows' ? 'text-white' : 'text-blue-200'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.583 10H21V9h.583c.31 0 .583.27.583.583v1.834h-.008zM12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm4.583 17H9.417V15h7.166v3zM9.417 13h7.166V9.417H9.417V13zm0-3.834h7.166V5.417H9.417V9.166z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${selectedOS === 'Windows' ? 'text-white' : 'text-blue-100'}`}>Windows</div>
                    <div className={`text-sm font-semibold mt-1 ${selectedOS === 'Windows' ? 'text-blue-100' : 'text-blue-200'}`}>
                      {Object.keys(getDownloadLinksForOS('Windows')).length} links
                    </div>
                  </div>
                </div>
                {selectedOS === 'Windows' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" />
                )}
              </button>
            )}

            {hasAndroid && (
              <button
                onClick={() => handleOSClick('Android')}
                className={`group/os flex flex-col items-center justify-center gap-4 p-8 rounded-3xl shadow-2xl transform transition-all duration-700 relative overflow-hidden ${
                  selectedOS === 'Android'
                    ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 scale-105 shadow-green-500/25 border-2 border-green-400/80'
                    : 'bg-gradient-to-br from-green-600/20 via-emerald-600/20 to-teal-600/20 hover:from-green-600/40 via-emerald-600/40 to-teal-600/40 text-white/80 hover:text-white border-2 border-green-500/40 hover:border-green-500/70 hover:scale-105'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-sm ${selectedOS === 'Android' ? 'scale-110' : ''}`}>
                    <svg className={`w-12 h-12 ${selectedOS === 'Android' ? 'text-white' : 'text-green-200'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.34 7.93c-3.18-.59-6.11-1.44-8.34-2.09V17c3.72 1.02 7.46 1.78 11.23 2.09V7.93zm17.66 0V17c-3.72 1.02-7.46 1.78-11.23 2.09v-9.16c3.32-.69 6.67-1.28 10.23-1.93zM12 3c-2.63 0-5.15.42-7.5 1.19L12 12l7.5-8.81C17.15 3.42 14.63 3 12 3z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${selectedOS === 'Android' ? 'text-white' : 'text-green-100'}`}>Android</div>
                    <div className={`text-sm font-semibold mt-1 ${selectedOS === 'Android' ? 'text-green-100' : 'text-green-200'}`}>
                      {Object.keys(getDownloadLinksForOS('Android')).length} links
                    </div>
                  </div>
                </div>
                {selectedOS === 'Android' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-teal-500/30 animate-pulse" />
                )}
              </button>
            )}
          </div>

          {selectedOS && (
            <div className="mt-12 pt-10 border-t-2 border-pink-500/30">
              <h3 className="text-4xl font-bold text-pink-300 mb-10 text-center neon-text">
                {selectedOS} Download Links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {Object.entries(getDownloadLinksForOS(selectedOS)).map(([platform, link]) => {
                  const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.default;

                  return (
                    <a
                      key={platform}
                       href={(link ?? '#') as string} // ← kırmızı çizgi kalkar (null ise #)
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/link flex flex-col items-center gap-4 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden border-2 border-pink-500/30 hover:border-${config.color.split('-')[0]}-500/60 bg-gradient-to-br ${config.bg} hover:${config.color}/40`}
                    >
                      <div className="text-4xl group-hover/link:-translate-y-2 transition-transform duration-300">
                        {config.icon}
                      </div>
                      <div className="text-center">
                        <span className="font-black text-lg text-white block mb-1">{platform}</span>
                        <span className="text-sm text-pink-300/80">Fast & Secure</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover/link:translate-x-full transition-transform duration-1000" />
                      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-0 group-hover/link:opacity-20 blur-xl animate-pulse" />
                    </a>
                    
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCREENSHOTS */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-pink-300 mb-12 text-center neon-text">Screenshots</h2>
        {game.screenshots && game.screenshots.length > 0 ? (
          <div className="relative max-w-7xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-800/80 bg-black/50 group">
              
              <div 
                className="flex h-full w-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentScreenshotIndex * 100}%)` }}
              >
                {game.screenshots.map((screenshot, index) => (
                 <div
  key={index}
  className="relative w-full aspect-video flex-shrink-0 rounded-2xl overflow-hidden bg-black"
>
  <Image
  src={screenshot}
  alt={`${game.title} screenshot ${index + 1}`}
  fill
  className="object-contain transition-transform duration-500"
  sizes="(max-width: 768px) 100vw, 80vw"
  priority={index === 0}
/>

</div>



                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-pink-400/50 shadow-lg z-10 group/btn opacity-0 lg:opacity-100 hover:opacity-100"
              >
                <span className="group-hover/btn:-translate-x-1 transition-transform duration-300">❮</span>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-pink-400/50 shadow-lg z-10 group/btn opacity-0 lg:opacity-100 hover:opacity-100"
              >
                <span className="group-hover/btn:translate-x-1 transition-transform duration-300">❯</span>
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {game.screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`
                      relative w-3 h-3 rounded-full transition-all duration-500 backdrop-blur-sm border-2 border-white/60 overflow-hidden
                      ${index === currentScreenshotIndex 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-125 shadow-lg shadow-pink-500/50 ring-2 ring-pink-500/30' 
                        : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                      }`}
                  />
                ))}
              </div>

              <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm text-white text-lg font-bold px-4 py-2 rounded-full border-2 border-pink-400/50 shadow-lg z-10">
                {currentScreenshotIndex + 1} / {game.screenshots.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">Bu oyuna ait screenshot bulunamadı.</p>
          </div>
        )}
      </div>

      {/* BACK TO HOME */}
      <div className="text-center py-16">
        <Link
          href="/#games"
          className="group inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-pink-600/20 hover:from-pink-500/40 hover:via-purple-600/40 hover:to-pink-600/40 text-pink-300 hover:text-white font-bold text-xl rounded-full border-2 border-pink-500/40 hover:border-pink-500/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}