'use client';

import Slideshow from "./Slideshow";
import { useEffect, useState } from "react";
import { client } from '@/lib/microcms';
import { BellAlertIcon } from '@heroicons/react/24/solid';

type NewsItem = {
    id: string;
    title: string;
    publishedAt: string;
    linkUrl?: string;
};

const formatDateJP = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    });
};

export default function ClientPage() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news'); // ← 修正！
                const data = await res.json();
                setNewsItems(data.contents);
            } catch (error) {
                console.error('Newsの取得に失敗しました:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <main className="home">
            <Slideshow />

            <section className="about">
                <h1>エイミーコミック</h1>
                <p>
                    一次創作メインのサイトです。<br />
                    高校生男女のラブコメ漫画「好きって言わせてやる！」を連載しています。
                </p>
            </section>

            <section className='news'>
                <h2>News</h2>
                <ul>
                    {newsItems.map((item) => (
                        <li key={item.id}>
                            <BellAlertIcon />
                            <span>
                                {formatDateJP(item.publishedAt)}　
                                {item.linkUrl ? (
                                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
