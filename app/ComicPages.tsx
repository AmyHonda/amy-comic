// app/ComicPages.tsx
'use client';

import { useCallback, useState, type ReactNode } from 'react';
import '../styles/comicPages.css';

// 何枚先まで先読みするか（表示は必ず1枚目から順番通り）
const LOOKAHEAD = 2;

type Settled = Record<number, 'ok' | 'error'>;

type ComicPagesProps = {
    pages: string[];
    onImageClick?: () => void;
    /** alt テキストの先頭に付ける作品タイトル */
    altPrefix?: string;
    /** すべての画像が表示されたあとに出す内容（あとがきリンクなど） */
    children?: ReactNode;
};

/**
 * 複数ページの画像を1枚目から順番に表示する。
 * 読み込み中のページにはスピナーを出し、前のページが揃うまで次は表示しない。
 * 親側では、別の作品に切り替えるとき key を変えてリセットすること。
 */
export default function ComicPages({ pages, onImageClick, altPrefix, children }: ComicPagesProps) {
    const [settled, setSettled] = useState<Settled>({});

    const mark = useCallback((i: number, result: 'ok' | 'error') => {
        setSettled(prev => (prev[i] ? prev : { ...prev, [i]: result }));
    }, []);

    // 先頭から連続して読み込みが終わっている枚数
    let doneCount = 0;
    while (doneCount < pages.length && settled[doneCount]) doneCount++;

    const allDone = doneCount >= pages.length;
    const renderCount = Math.min(pages.length, doneCount + LOOKAHEAD);

    return (
        <>
            {pages.slice(0, renderCount).map((src, i) => {
                const visible = i < doneCount;

                if (settled[i] === 'error' && visible) {
                    return (
                        <p key={i} className="comic-error">
                            {i + 1}ページ目を読み込めませんでした
                        </p>
                    );
                }

                return (
                    <img
                        key={i}
                        src={src}
                        alt={altPrefix ? `${altPrefix} ${i + 1}ページ目` : `page ${i + 1}`}
                        style={visible ? undefined : { display: 'none' }}
                        onLoad={() => mark(i, 'ok')}
                        onError={() => mark(i, 'error')}
                        onClick={onImageClick}
                        ref={el => {
                            // キャッシュ済みで onLoad を取りこぼした場合の保険
                            if (el && el.complete && el.naturalWidth > 0) mark(i, 'ok');
                        }}
                    />
                );
            })}

            {!allDone && (
                <div className="comic-loader" role="status" aria-label="読み込み中">
                    <span className="comic-spinner" />
                </div>
            )}

            {allDone && children}
        </>
    );
}

/** 1枚だけの画像用。読み込み中はスピナーを表示する。 */
export function SpinnerImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

    return (
        <>
            {state === 'loading' && (
                <div className="comic-loader comic-loader--compact" role="status" aria-label="読み込み中">
                    <span className="comic-spinner" />
                </div>
            )}

            {state === 'error' ? (
                <p className="comic-error">画像を読み込めませんでした</p>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    style={state === 'ok' ? undefined : { display: 'none' }}
                    onLoad={() => setState('ok')}
                    onError={() => setState('error')}
                    ref={el => {
                        if (el && el.complete && el.naturalWidth > 0) setState(s => (s === 'loading' ? 'ok' : s));
                    }}
                />
            )}
        </>
    );
}
