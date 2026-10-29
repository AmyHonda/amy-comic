// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Mochiy_Pop_One, Zen_Maru_Gothic } from "next/font/google";
import './globals.css'; // レイヤーの順序宣言を含むので、最初に読み込む
import '../styles/global.css';
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const mochiyPopOne = Mochiy_Pop_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mochiy-pop-one",
});

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-mplus-rounded",
});

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru-gothic",
});

const SITE_URL = 'https://www.amy-comic.com';
const SITE_NAME = 'エイミーコミック';
const DESCRIPTION = '高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を連載しています。';
const OGP_IMAGE = '/ogp-square.jpg'; // 968x968 正方形(JPEG)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'エイミーコミックです。高校生男女のラブコメ一次創作漫画「好きって言わせてやる！」を描いています。',
  verification: {
    google: 'TSLsUGcm0my9okl0BE99up7il2TCWrZ3VaJy8JJOUvQ', // Google Search Console 所有権確認
  },
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
    images: [{ url: OGP_IMAGE, width: 968, height: 968, type: 'image/jpeg', alt: SITE_NAME }],
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
    <html
      lang="ja"
      className={`${mochiyPopOne.variable} ${zenMaruGothic.variable} ${mPlusRounded.variable}`}
    >
      <body>
        <SiteHeader />

        <main>
          {children}
        </main>

        <SiteFooter />

        <Analytics />

      </body>
    </html>
  );
}
