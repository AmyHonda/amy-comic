// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import '../styles/global.css'
import './globals.css'
import { Analytics } from "@vercel/analytics/react";
import Header from './Header';

const SITE_URL = 'https://www.amy-comic.com';
const SITE_NAME = 'エイミーコミック';
const DESCRIPTION = '高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を連載しています。';
const OGP_IMAGE = '/ogp.png'; // 968x968 正方形

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: 'エイミーコミックです。高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を描いています。',
  icons: {
    icon: '/favicon.ico?v=2',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: OGP_IMAGE, width: 968, height: 968, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary', // 正方形画像は summary で切り抜かれずに表示される
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [OGP_IMAGE],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />

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
