'use client';
import { useState, useEffect, useRef } from "react";
import { illustrations } from "./illustData";
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import '../../styles/illust.css';

export default function IllustGalleryPage() {
    const [selected, setSelected] = useState<string | null>(null);
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
            window.scrollTo(0, y);  // ← 元の位置にスクロール
        }
    }, [selected]);

    return (
        <main className="illust-gallery">
            <h1>イラスト</h1>

            <div className="gallery">
                {illustrations.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        className="illust-thumbnail"
                        loading="lazy"
                        onClick={() => setSelected(item.src)}
                    />
                ))}
            </div>

            {selected && (
                <div className="illust-modal" onClick={() => setSelected(null)}>
                    <img src={selected} alt="" loading="lazy" />
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