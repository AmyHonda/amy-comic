// app/layout.tsx
'use client';
import { useState, ReactNode } from "react";
import '../styles/global.css'
import './globals.css'
import Link from 'next/link';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content="エイミーコミック" />
        <meta property="og:description" content="高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を連載しています。" />
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:url" content="https://www.amy-comic.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="エイミーコミック" />

        <title>エイミーコミック</title>
        <meta name="description" content="エイミーコミックです。高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を描いています。" />
      </head>
      <body>
        <header>
          <div className="logo">
            <Link href="/">
              <Image src="/images/home/logo.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '180px', height: 'auto' }}
                alt="Amy Comic ロゴ"
              />
            </Link>
          </div>
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
          >
            ≡
          </button>

          <nav className={`navbar ${isOpen ? "open" : ""}`}>
            <Link href="/" onClick={() => setIsOpen(false)}>ホーム</Link>
            <Link href="/characters" onClick={() => setIsOpen(false)}>登場人物</Link>
            <Link href="/main" onClick={() => setIsOpen(false)}>本編</Link>
            <Link href="/sub" onClick={() => setIsOpen(false)}>番外編</Link>
            <Link href="/sukebe" onClick={() => setIsOpen(false)}>スケベ</Link>
            <Link href="/illust" onClick={() => setIsOpen(false)}>イラスト</Link>
            <Link href="/ai" onClick={() => setIsOpen(false)}>AI作品</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)}>ブログ</Link>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <div className="footer-content">
            <p>&copy;2025 エイミーコミック Amy Comic.</p>
          </div>
        </footer>

        <Analytics />

      </body>
    </html>
  );
}