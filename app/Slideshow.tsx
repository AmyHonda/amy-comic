'use client';

import { useState, useEffect } from 'react';
import '../styles/home.css';

const images = [
  '/images/home/top01.jpg',
  '/images/home/top02.jpg',
  '/images/home/top03.jpg',
  '/images/home/top04.jpg',
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);

  return (
    <main className='home'>
      <div className='slideshow'>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`スライド${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
    </main>
  );
}