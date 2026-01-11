// app/layout.tsx - ANIMASYON COMPONENT'E TAŞINDI
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import Navbar from '@/components/Navbar';
import AnimatedBackground from './AnimatedBackground';
import './globals.css';
import Script from "next/script";


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
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/bg6.jpg',
    '/images/bg11.jpg',
    '/images/bg18.jpg',
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
        {/* 🔥 Animated Background - Tüm efekt burada */}
        <AnimatedBackground images={bgImages} />
        
        {/* 🎨 Navbar */}
        <Navbar />
        
        {/* 📱 İçerik */}
        <main className="relative z-10 pt-20 pb-12 min-h-screen">
          {children}
           {/* Vercel Analytics */}
    <Analytics />
        </main>
            <Script
  src="https://a.magsrv.com/ad-provider.js"
  strategy="afterInteractive"
/>
    

      </body>
    </html>
  );
}