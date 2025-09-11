'use client';

import { useState, useEffect, useRef } from "react";
import { sukebeList } from "./suekebeData";
import '../../styles/sukebe.css';

type SukebeItem = {
    title: string;
    thumbnail: string;
    pages: string[];
    URL?: string;
};

export default function SukebePage() {
    const [selected, setSelected] = useState<SukebeItem | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const scrollYRef = useRef(0);

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

    const sortedComics = [...sukebeList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

    return (
        <main className="sukebe-gallery">
            <h1>スケベ</h1>

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

            <div className="sukebe-list">
                {sortedComics.map((sukebe, index) => (
                    <div key={index} className="sukebe-item" onClick={() => setSelected(sukebe)}>
                        <img src={sukebe.thumbnail} alt={sukebe.title} loading="lazy" className="sukebe-thumb" />
                        <p className="sukebe-title">{sukebe.title}</p>
                    </div>
                ))}
            </div>

            {selected && (
                <div className='sukebe-modal' onClick={() => setSelected(null)}>
                    <div
                        className={`sukebe-pages ${selected.pages.length === 1 ? 'single-image' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >   
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
        </main>
    );
}