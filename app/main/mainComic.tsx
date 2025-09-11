'use client';

import { useEffect, useState, useRef } from "react";
import { mainComics } from "./mainComicData";
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import '../../styles/mainComic.css';

type MainComic = {
    title: string;
    thumbnail: string;
    pages: string[];
    URL?: string;
};

export default function MainComicPage() {
    const [selected, setSelected] = useState<MainComic | null>(null);
    const [filter, setFilter] = useState(0); //0: 全て表示
    const [sortOrder, setSortOrder] = useState('desc');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollYRef = useRef(0);

    const filteredComics = (filter === 0
        ? mainComics
        : mainComics.filter(comic => comic.chapter === filter)
    ).sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title); //タイトル昇順
        } else {
            return b.title.localeCompare(a.title); //タイトル降順
        }
    });

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

    return (
        <main className="main-comic-gallery">
            <h1>本編</h1>

            {/* フィルターUI */}
            <div className="chapter-filter">
                <button
                    className={filter === 0 ? 'active' : ''}
                    onClick={() => setFilter(0)}
                >
                    すべて
                </button>
                {[1, 2, 3, 4, 5].map(ch => (
                    <button
                        key={ch}
                        className={filter === ch ? 'active' : ''}
                        onClick={() => setFilter(ch)}
                    >
                        第{ch}章
                    </button>
                ))}
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? '新しい順' : '古い順'}
                </button>
            </div>

            {/* サムネ＋タイトル　一覧 */}
            <div className="main-comic-list">
                {filteredComics.map((comic, index) => (
                    <div key={index} className="main-comic-item" onClick={() => setSelected(comic)}>
                        <img src={comic.thumbnail} alt={comic.title} loading="lazy" className="main-comic-thumb" />
                        <p className="main-comic-title">{comic.title}</p>
                    </div>
                ))}
            </div>

            {/* モーダルでページ表示 */}
            {selected && (
                <div className='main-comic-modal' onClick={() => setSelected(null)}>
                    <div className='main-comic-pages' onClick={(e) => e.stopPropagation()}>
                        {selected.pages.map((page, i) => (
                            <img
                                key={i}
                                src={page}
                                alt={`page ${i + 1}`}
                                loading="lazy"
                                onClick={() => setSelected(null)} />
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