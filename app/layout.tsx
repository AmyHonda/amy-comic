'use client';
import { useState, ReactNode, useEffect } from "react"; // useEffectを追加
import { usePathname } from 'next/navigation';
import '../styles/global.css'
import './globals.css'
import Link from 'next/link';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // これは消さずに残す！

  // URLが変わるたびに忍者を呼び出す「まじない」
  useEffect(() => {
    // 既存の忍者スクリプトがあれば一旦消す（二重カウント防止）
    const oldScript = document.getElementById('ninja-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'ninja-script';
    script.src = `https://xa.shinobi.jp/ufo/192073700?t=${Date.now()}`;
    script.async = true;
    document.body.appendChild(script);
  }, [pathname]); // URL（pathname）が変わるたびに実行

  return (
    <html lang="ja">
      <head>
        {/* メタタグなどはそのまま */}
        <title>エイミーコミック</title>
      </head>
      <body>
        <header>
          {/* ヘッダー内容 */}
        </header>

        <main>{children}</main>

        <footer>
          <p>&copy;2025 エイミーコミック Amy Comic.</p>
        </footer>

        <Analytics />

        {/* JSが無効な人用のリンクだけ置いておく */}
        <noscript>
          <a href="https://xa.shinobi.jp/bin/gg?192073700" target="_blank" rel="noopener noreferrer">
            <img src="https://xa.shinobi.jp/bin/ll?192073700" style={{ border: 0 }} alt="忍者アクセス解析" />
          </a>
        </noscript>
      </body>
    </html>
  );
}