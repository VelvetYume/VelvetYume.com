// app/layout.tsx - YAŞ DOĞRULAMA KALDIRILMIŞ GÜNCEL HALİ
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AnimatedBackground from './AnimatedBackground';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'VelvetYume',
  description: 'Raw, uncensored hentai games and visual novels',
  keywords: 'hentai, adult games, visual novel, rpgm, simulation, pixel, 18+',
  authors: [{ name: 'VelvetYume' }],
  openGraph: {
    title: 'VelvetYume',
    description: 'Raw, uncensored hentai games and visual novels',
    url: 'https://velvetyume.com',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImages = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/bg5.jpg',
    '/images/bg6.jpg',
    '/images/bg7.jpg',
    '/images/bg8.jpg',
    '/images/bg9.jpg',
    '/images/bg16.jpg',
    '/images/bg18.jpg',
    '/images/bg19.jpg',
    '/images/bg22.jpg',
    '/images/bg33.jpg',
    '/images/bg40.jpg',
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`
          ${inter.variable} 
          font-sans 
          bg-transparent 
          text-white 
          min-h-screen 
          antialiased
          overflow-x-hidden
          relative
        `}
      >
        {/* 🔥 Animated Background */}
        <AnimatedBackground images={bgImages} />
        
        {/* 🔥 Overlay */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black/70 via-[#0a0015]/80 to-[#1a0033]/70 pointer-events-none" />
        
        {/* 🎨 Navbar */}
        <Navbar />
        
        {/* 📱 İçerik */}
        <main className="relative z-10 pt-20 pb-12 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}