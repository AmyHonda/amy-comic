// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuItem = { label: string; href: string; external?: boolean };

const menuItems: MenuItem[] = [
  { label: "HOME", href: "/" },
  { label: "登場人物", href: "/characters" },
  { label: "本編", href: "/main" },
  { label: "番外編", href: "/sub" },
  { label: "スケベ", href: "/sukebe" },
  { label: "イラスト", href: "/illust" },
  { label: "二次創作", href: "/nijisousaku" },
  { label: "AI作品", href: "/ai" },
  { label: "ブログ", href: "/blog" },
];

const linkClass =
  "block py-2 text-lg font-bold text-amy-ink no-underline transition hover:opacity-60 [@media(max-height:620px)]:py-1";

// PC(lg以上)で横並びにするときのリンク
const desktopLinkClass =
  "block rounded-xl px-3 py-1.5 text-sm font-bold text-amy-ink no-underline transition hover:bg-amy-yellow/50";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setIsOpen(false);
      previousPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* 高さは約60px(スマホ) / 68px(PC)。既存ページの上余白はこの高さを前提にしている */}
      <header
        aria-hidden={isOpen}
        inert={isOpen}
        className="fixed inset-x-0 top-0 z-[1000] bg-transparent px-6 py-3 backdrop-blur-sm md:px-8 md:py-4 lg:py-3"
      >
        <div className="mx-auto flex max-w-md items-center justify-between md:max-w-xl lg:max-w-5xl">
          <Link href="/" className="font-mplus text-xl text-amy-gold no-underline md:text-2xl">
            エイミーコミック
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="メニューを開く"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            className="flex items-center rounded-full bg-amy-yellow px-4 py-2.5 font-zenmaru text-xs font-extrabold text-amy-ink shadow-[3px_3px_0_#E6B800] transition-transform hover:-translate-y-0.5 lg:hidden"
          >
            <span className="inline-block scale-110">MENU</span>
          </button>

          {/* PC(lg以上): MENUボタンの代わりにリンクを横に並べる */}
          <nav
            aria-label="メインメニュー"
            className="hidden rounded-2xl bg-white/60 p-1 font-zenmaru shadow-sm backdrop-blur-sm lg:block"
          >
            <ul className="m-0 flex list-none items-center gap-0.5 p-0">
              {menuItems.map((item) => {
                const isCurrent = !item.external && item.href === pathname;
                const className = `${desktopLinkClass} ${isCurrent ? "bg-amy-yellow" : ""}`;
                return (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={className}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {isOpen && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-menu-title"
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-amy-yellow/20 px-6 py-10 text-center font-zenmaru backdrop-blur-sm"
        >
          <h2 id="site-menu-title" className="sr-only">サイトメニュー</h2>

          <div className="relative flex w-[70%] max-w-[280px] -translate-y-12 flex-col justify-center rounded-[3rem] bg-amy-yellow px-6 py-8 shadow-2xl">
            <nav
              aria-label="メインメニュー"
              className="max-h-[calc(100dvh-11rem)] w-full overflow-y-auto"
            >
              <ul className="m-0 flex list-none flex-col gap-1 p-0 text-center">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (item.href === pathname) setIsOpen(false);
                        }}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="absolute -bottom-7 right-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="メニューを閉じる"
                className="flex size-16 items-center justify-center rounded-full bg-white text-4xl font-bold leading-none text-amy-ink shadow-xl transition hover:scale-105"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
