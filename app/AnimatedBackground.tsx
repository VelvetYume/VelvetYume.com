// app/AnimatedBackground.tsx - ÜZERİNDEN SMOOTH GEÇİŞ
'use client';

import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  images: string[];
}

export default function AnimatedBackground({ images }: AnimatedBackgroundProps) {
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 🔥 RESİMLERİ ÖNCEDEN YÜKLE
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        images.map((image) => {
          return new Promise<boolean>((resolve) => {
            const img = new Image();
            img.src = image;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        })
      );
      setImagesLoaded(loaded);
    };
    loadImages();
  }, [images]);

  // 🔥 ÜZERİNDEN GEÇİŞ ANIMASYONU
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (currentImage + 1) % images.length;
      setNextImage(nextIdx);
      setIsTransitioning(true);

      // 1.5 saniye sonra geçiş tamamla
      setTimeout(() => {
        setCurrentImage(nextIdx);
        setIsTransitioning(false);
      }, 1750);
    }, 3500); // 6 saniyede bir geçiş

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden">
      
      {/* 🔥 ALT KATMAN - MEVCUT RESİM (HER ZAMAN GÖRÜNÜR) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          opacity: 1,
          zIndex: 1,
        }}
      />

      {/* 🔥 ÜST KATMAN - GELECEK RESİM (ÜZERİNDEN GEÇER) */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center bg-no-repeat 
          transition-all duration-1500 ease-in-out
        `}
        style={{
          backgroundImage: `url(${images[nextImage]})`,
          opacity: isTransitioning ? 1 : 0,
          zIndex: 2,
          transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
        }}
      />

      {/* 🔥 GEÇİŞ EFEKTİ - PARLA */}
      {isTransitioning && (
        <div className="absolute inset-0 z-3 bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-pink-500/10 animate-pulse" />
      )}
    </div>
  );
}