'use client';

import { useEffect, useState, useRef } from 'react';
import { nijisousakuList, type NijisousakuItem } from './NijisousakuData';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import '../../styles/nijisousaku.css';

import ComicPages from '../ComicPages';
import { thumbImage } from '@/lib/cloudinary';
export default function Nijisousaku() {
  const [selected, setSelected] = useState<NijisousakuItem | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollYRef = useRef(0);

  // スクロール位置監視
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ページトップへ戻る
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // モーダル表示中は背景スクロールを固定
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

  const sortedList = [...nijisousakuList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="fan-gallery">
      <h1>二次創作</h1>

      {/* 並び替えボタン */}
      <div className="fan-sort-toggle">
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

      {sortedList.length === 0 ? (
        <p className="fan-empty">現在準備中です。</p>
      ) : (
        <div className="fan-list">
          {sortedList.map((item, index) => (
            <div key={index} className="fan-item" onClick={() => setSelected(item)}>
              <img src={thumbImage(item.thumbnail)} alt={item.title} loading="lazy" className="fan-thumb" />
              <p className="fan-title">{item.title}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fan-modal" onClick={() => setSelected(null)}>
          <div className="fan-pages" onClick={(e) => e.stopPropagation()}>
            <ComicPages key={selected.title} altPrefix={selected.title} pages={selected.pages} onImageClick={() => setSelected(null)}>

            {/* つづくボタン（クリックしても反応しない） */}
            {selected.isContinued && (
              <span className="fan-link fan-continued">つづく</span>
            )}

            {/* あとがきリンク */}
            {selected.URL && (
              <a
                href={selected.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fan-link"
              >
                あとがきを読む
              </a>
            )}
            </ComicPages>
          </div>
        </div>
      )}

      {/* ページトップボタン */}
      {showScrollTop && (
        <button className="fan-scroll-top" onClick={scrollToTop}>
          <ChevronDoubleUpIcon className="fan-scroll-icon" />
        </button>
      )}
    </div>
  );
}
