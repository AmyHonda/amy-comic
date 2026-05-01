// app/FloatingSymbols.tsx
'use client';

import { useEffect, useState } from 'react';

const STARS = ['★', '☆'];
const COLORS = [
  '#f5c400', '#ffd966',
  '#ffb3cc', '#ff85a1',
  '#b5f0c0', '#85e0a3',
  '#d4b3f5', '#b57be8',
  '#b3e5f5', '#7ecfed',
];

interface StarConfig {
  left: number;
  size: number;
  duration: number;
  delay: number;
  char: string;
  color: string;
}

function generateStars(count: number): StarConfig[] {
  return Array.from({ length: count }, () => ({
    left:     Math.random() * 97,
    size:     13 + Math.random() * 18,
    duration: 5 + Math.random() * 7,
    delay:    Math.random() * -14,
    char:     STARS[Math.floor(Math.random() * STARS.length)],
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function FloatingSymbols({ count = 20 }: { count?: number }) {
  const [stars, setStars] = useState<StarConfig[]>([]);

  useEffect(() => {
    setStars(generateStars(count));
  }, [count]);

  return (
    <div className="floating-symbols" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="floating-symbol"
          style={{
            left:              `${s.left}%`,
            fontSize:          `${Math.round(s.size)}px`,
            color:             s.color,
            animationDuration: `${s.duration.toFixed(1)}s`,
            animationDelay:    `${s.delay.toFixed(1)}s`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}