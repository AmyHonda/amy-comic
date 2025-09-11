'use client';

import { useEffect, useState, useRef } from 'react';
import { subComics } from './SubComicData';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import '../../styles/subComic.css';

type SubComic = {
  title: string;
  thumbnail: string;
  pages: string[];
  URL?: string;
};

export default function SubComic() {
  const [selected, setSelected] = useState<SubComic | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollYRef = useRef(0);

  // スクロール位置監視
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ページトップへ戻る
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (selected) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      const y = scrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, y);
    }
  }, [selected]);

  const sortedComics = [...subComics].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <main className='sub-comic-gallery'>
      <h1>番外編</h1>

      {/* 並び替えボタン */}
      <div className="sort-toggle">
        <button
          className={sortOrder === 'desc' ? 'active' : ''}
          onClick={() => setSortOrder('desc')}
        >
          新しい順
        </button>
        <button
          className={sortOrder === 'asc' ? 'active' : ''}
          onClick={() => setSortOrder('asc')}
        >
          古い順
        </button>
      </div>

      <div className='sub-comic-list'>
        {sortedComics.map((comic, index) => (
          <div key={index} className="sub-comic-item" onClick={() => setSelected(comic)}>
            <img src={comic.thumbnail} alt={comic.title} loading="lazy" className="sub-comic-thumb" />
            <p className="sub-comic-title">{comic.title}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className='sub-comic-modal' onClick={() => setSelected(null)}>
          <div className='sub-comic-pages' onClick={(e) => e.stopPropagation()}>
            {selected.pages.map((page, i) => (
              <img
                key={i}
                src={page}
                alt={`page ${i + 1}`}
                loading="lazy"
                onClick={() => setSelected(null)}
              />
            ))}
            {/* あとがきリンク */}
            {selected.URL && (
              <a
                href={selected.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="afterword-link"
              >
                あとがきを読む
              </a>
            )}
          </div>
        </div>
      )}
      {/* ページトップボタン */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <ChevronDoubleUpIcon className="scroll-icon" />
        </button>
      )}
    </main>
  );
}
