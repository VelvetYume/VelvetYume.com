// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/#games', label: 'Games' },  // ← BURAYI DEĞİŞTİR (#games anchor linki)
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="VelvetYume"
              width={42}
              height={42}
              className="rounded-xl shadow-lg group-hover:scale-110 transition-all duration-500 ease-out"
              priority
            />
            <span className="text-2xl font-bold text-white tracking-wide">
              VelvetYume
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group"
                onClick={() => setIsOpen(false)} // Mobil menüde tıklayınca kapanır
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {menuItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-3 px-4 text-white/80 hover:bg-white/10 rounded-xl font-medium transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}