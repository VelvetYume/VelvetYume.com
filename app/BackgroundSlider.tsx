'use client';
import { useState, useEffect } from 'react';

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
}

export default function BackgroundSlider({ images, interval = 5000 }: BackgroundSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(slide);
  }, [images, interval]);

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}
