// components/Hero.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/home/top01.jpg',
  '/images/home/top02.jpg',
  '/images/home/top03.jpg',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex items-start justify-center bg-amy-yellow-light px-4 pb-8 pt-24">
      {/* 元画像が正方形なので、枠も正方形にして全体を見せる */}
      <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[3rem] md:max-w-xl lg:max-w-[40rem]">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`「好きって言わせてやる！」のイラスト ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 640px, (min-width: 768px) 576px, 100vw"
            priority={index === 0}
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
