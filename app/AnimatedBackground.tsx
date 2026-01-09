'use client';

import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  images: string[];
}

export default function AnimatedBackground({ images }: AnimatedBackgroundProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {images.map((img, i) => {
        const active = i === index;

        return (
          <div
            key={i}
            className="
              absolute inset-0 bg-cover bg-center bg-no-repeat
              transition-opacity duration-[3600ms]
              ease-[cubic-bezier(0.33,0,0.1,1)]
            "
            style={{
              backgroundImage: `url(${img})`,
              opacity: active ? 1 : 0,

              /* SADECE YENİ RESİM YAKIN GELİR */
              transform: active ? 'scale(1)' : 'scale(1.06)',
              transitionProperty: 'opacity, transform',

              /* GPU SABİTLEME */
              willChange: 'opacity, transform',
              backfaceVisibility: 'hidden',
              transformOrigin: 'center',
            }}
          />
        );
      })}

      {/* DERİNLİK + KONTRAST */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#0a0016]/55 to-[#16002a]/80 pointer-events-none" />

      {/* SOFT FILMIC LIGHT (ÇİZGİSİZ) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,220,255,0.035), transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  );
}
