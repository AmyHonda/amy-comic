// app/Header.tsx
'use client';
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
        <Link href="/nijisousaku" onClick={() => setIsOpen(false)}>二次創作</Link>
        <Link href="/ai" onClick={() => setIsOpen(false)}>AI作品</Link>
        <a href="https://note.com/emiko_xyz" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>ブログ</a>
      </nav>
    </header>
  );
}
