// app/page.tsx - MAIN PAGE - SINGLE IMAGE
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gamesData from '@/data/games.json';
import { useSearchParams } from 'next/navigation';



interface Game {
  id: string;
  title: string;
  createdAt?: string;
  category?: string[];
  type?: string;
  os?: string[] | string;
  img?: string;
}


export default function Home() {
  const [filters, setFilters] = useState<string[]>([]);
  const [osFilter, setOsFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const searchParams = useSearchParams();
  const pageFromHome = searchParams.get('page');



  const toggleCategory = (category: string) => {
  if (category === 'All') {
    setFilters([]);
    setCurrentPage(1);
    return;
  }

  setFilters(prev => {
    const exists = prev.includes(category);
    const updated = exists
      ? prev.filter(c => c !== category)
      : [...prev, category];

    return updated;
  });

  setCurrentPage(1);
};


  useEffect(() => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  const categoryFromUrl = params.get('category');
  const pageFromUrl = params.get('page');

  if (categoryFromUrl) {
    setFilters([categoryFromUrl]);
  }

  if (pageFromUrl) {
    const pageNum = Number(pageFromUrl);
    if (!isNaN(pageNum)) {
      setCurrentPage(pageNum);
    }
  }
}, []);



  const categories = [
    'All', '2D','3D', 'Adventure', 'Anal Sex','Animation', 'Big Tits', 'Blowjob', 'Censored', 'Uncensored',
    'Complete', 'Creampie','Demon','Elf', 'Furry','Female Protagonist', 'FootSex', 'Groping', 'Handjob','Tits fuck',
    'Harem', 'Horror', 'incest', 'Male protagonist','Massage','Monster','Oral Sex', 'Rape', 'Maid','Milf', 'Ntr','Nun', 'Parody',
    'Rpgm', 'School',"Succubus",'Shota', 'Vaginal Sex', 'Voiced', 'Visual Novel', 'Pixel', 'Hospital', 'Nurse', 'Ghost'
  ];

  const itemsPerPage = 10;
  

  const updateOsFilter = (newOsFilter: string) => {
    setOsFilter(newOsFilter);
    setCurrentPage(1);
  };

  // SINGLE IMAGE ON MAIN PAGE
  const getGameMainImage = (gameId: string, gameImg?: string): string => {
    if (gameId.toLowerCase().includes('lust demon')) {
      return '/images/games/lust-demon-1.jpg';
    }
    return gameImg || '/images/placeholder.jpg';
  };

  // REMOVE DUPLICATES
  const uniqueGames: Game[] = gamesData.filter((game: Game, index: number, self: Game[]) => {
    return index === self.findIndex((g: Game) => g.id === game.id);
  });

  // SORT BY DATE (newest first)
  const sortedGames: Game[] = [...uniqueGames].sort((a, b) => {
    const dateA = new Date(a.createdAt || '2000-01-01').getTime();
    const dateB = new Date(b.createdAt || '2000-01-01').getTime();
    return dateB - dateA;
  });

  // FILTERING
  const filteredGames = sortedGames.filter((game: Game) => {
    const matchesCategory =
  filters.length === 0 ||
  (game.category &&
    filters.every(cat => game.category!.includes(cat)));


    const matchesOS =
      osFilter === 'All' ||
      (Array.isArray(game.os)
        ? game.os.map(o => o.toLowerCase()).includes(osFilter.toLowerCase())
        : typeof game.os === 'string'
          ? game.os.toLowerCase() === osFilter.toLowerCase()
          : false);

    const matchesSearch = game.title?.toLowerCase().includes(search.toLowerCase()) || false;

    return matchesCategory && matchesOS && matchesSearch;
  });

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
  setCurrentPage(page);

  const params = new URLSearchParams(window.location.search);
  params.set('page', String(page));

  window.history.pushState({}, '', `/?${params.toString()}#games`);
};

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
useEffect(() => {
  const gamesSection = document.getElementById('games');
  if (gamesSection) {
    gamesSection.scrollIntoView({ behavior: 'smooth' });
  }
}, [currentPage]);

  return (
    <div className="relative z-20 min-h-screen">
      
      {/* HERO */}
      <section className="relative z-30 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Velvet
            </span>
            <span className="text-white">Yume</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-200 max-w-4xl mx-auto mb-12 leading-tight px-4 tracking-wide">
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ignite your deepest cravings
            </span>
            <span className="text-white opacity-90"> — the rawest hentai worlds await in their original form.</span>
          </p>
          <a 
            href="#games" 
            className="inline-flex items-center gap-4 px-10 py-4 bg-black/50 backdrop-blur-xl text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-500 group shadow-2xl"
          >
            <span>🎮 Browse Games</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section id="games" className="relative z-30 px-6 py-20 max-w-7xl mx-auto w-full">
        
        {/* FILTER PANEL */}
        <div className="
  bg-black/60
  md:backdrop-blur-2xl
  rounded-3xl
  p-8
  mb-12
  border border-white/20
  shadow-lg
  md:shadow-2xl
">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="🔍 Search game name"
                value={search}
                onChange={(e) => { 
                  setSearch(e.target.value); 
                  setCurrentPage(1); 
                }}
                className="w-full px-6 py-4 rounded-2xl bg-black/50 text-white placeholder-gray-400 border-2 border-white/20 focus:border-pink-500/50 focus:outline-none transition-all duration-300"
              />
            </div>
            <select
              value={osFilter}
              onChange={(e) => updateOsFilter(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-black/50 text-white border-2 border-white/20 focus:border-pink-500/50 focus:outline-none transition-all duration-300"
            >
              <option value="All">🌐 All Platforms</option>
              <option value="Windows">🖥️ Windows</option>
              <option value="Android">📱 Android</option>
            </select>
          </div>

          <div
  className={`
    flex flex-wrap justify-center gap-4 mb-10 pb-6 border-b border-white/10
    transition-all duration-300

    ${!showAllCategories ? 'max-h-[110px] overflow-hidden' : ''}

    md:max-h-none md:overflow-visible
  `}
>
  <div className="md:hidden text-center mb-8">
  <button
    onClick={() => setShowAllCategories(prev => !prev)}
    className="text-pink-400 font-semibold underline"
  >
    {showAllCategories ? 'show less' : 'show all categories'}
  </button>
</div>


            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  (cat === 'All' && filters.length === 0) || filters.includes(cat)
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                    : 'bg-black/30 text-gray-300 hover:bg-white/10 border border-white/20 hover:border-white/40'
                }`}
              >
                {cat}
              </button>

            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-lg font-semibold">
              {filteredGames.length} games found
              {filters.length > 0 && (
  <span className="ml-4 text-pink-400">
    • {filters.join(', ')}
  </span>
    )}

            </p>
          </div>
        </div>

        {/* GAME CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-16">
          {currentGames.map((game: Game, index: number) => {
            const gameId = game.id || `game-${index}`;
            const gameTitle = game.title || 'Unknown Game';
            const mainImage = getGameMainImage(gameId, game.img);

            return (
              <Link
  key={gameId}
  href={`/games/${encodeURIComponent(gameId)}?page=${currentPage}`}
  className="group block"
>

                <div className="
  relative
  bg-black/60
  md:backdrop-blur-xl
  rounded-2xl
  p-6
  border border-white/10
  hover:border-pink-500/40
  overflow-hidden
  transition-all duration-500
  md:hover:scale-105
  shadow-md
  md:shadow-xl
  h-full
">

                  
                  {/* SINGLE IMAGE */}
                  <div className="relative w-full h-52 rounded-xl overflow-hidden mb-6 bg-black/30">
                    <Image 
  src={mainImage} 
  alt={gameTitle}
  width={400}
  height={208}
  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 20vw"
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
  priority={index < 6}
/>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-pink-400 transition-colors duration-300">
                    {gameTitle}
                  </h3>
                  
                  <p className="text-pink-400 text-sm font-semibold mb-4 bg-black/40 px-4 py-2 rounded-full inline-block w-fit">
                    {game.type || 'Unknown'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(game.category || []).slice(0, 3).map((tag: string, idx: number) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-xs text-pink-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-2xl">
                    <span className="text-white font-bold text-sm bg-black/70 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
                      👉 View Details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* NO RESULTS + PAGINATION */}
        {currentGames.length === 0 && (
          <div className="text-center py-24 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20">
            <div className="text-8xl mb-8">🔍</div>
            <h3 className="text-4xl font-bold text-white mb-6">No Games Found</h3>
            <p className="text-gray-300 mb-10 max-w-3xl mx-auto">
              No games match your criteria.
            </p>
            <button 
              onClick={() => {
                setFilters([]);
                setOsFilter('All');
                setSearch('');
                setCurrentPage(1);
              }}
              className="px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              🎮 View All Games
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-6 p-8 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-2xl bg-black/30 text-white font-semibold border border-white/20 hover:border-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              ← Previous
            </button>
            
            <div className="flex gap-3 bg-black/40 rounded-2xl p-3 border border-white/20">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 min-w-[44px] ${
                      pageNum === currentPage 
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    {pageNum}
                    
                  </button>
                );
                
              })}
              
            </div>
            
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-2xl bg-black/30 text-white font-semibold border border-white/20 hover:border-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next →
            </button>
            
            <span className="text-gray-300 font-semibold min-w-[160px] text-center">
              Page {currentPage} / {totalPages}
            </span>
          </div>
        )}
      </section>

      <footer className="relative z-30 w-full mt-24 py-12 bg-gradient-to-t from-black via-[#0d001f] to-black/90 backdrop-blur-2xl border-t border-pink-500/20">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-300 leading-relaxed">
          <p className="mb-3 font-bold text-pink-400 text-lg tracking-wide">
            Disclaimer
          </p>

          <p className="mb-4">
            All games and contents on this website are provided for informational purposes only.  
            We do not host any files on our servers. All download links redirect to third-party file hosting services.
          </p>

          <p className="mb-6">
            If you are a copyright owner and believe any content infringes your rights,  
            or for general inquiries/support,  
            please <a href="mailto:dmcavelvetyume@gmail.com" className="text-pink-400 hover:text-pink-300 underline font-semibold transition-colors duration-300">
              email us at dmcavelvetyume@gmail.com
            </a>. We respond promptly.
          </p>

          <p className="text-xs text-gray-500 mt-8">
            © {new Date().getFullYear()} VelvetYume. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}