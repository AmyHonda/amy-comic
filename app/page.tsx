// app/page.tsx
import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const SITE_URL = 'https://www.amy-comic.com';
const DESCRIPTION = '一次創作サイトです。高校生男女のラブコメ創作漫画「好きって言わせてやる！」を描いています。';

export const metadata: Metadata = {
  title: { absolute: 'エイミーコミック｜高校生男女の一次創作ラブコメ漫画「好きって言わせてやる！」' },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
};

// 検索エンジン向けの構造化データ（サイト情報と作品シリーズ）
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'エイミーコミック',
      alternateName: 'Amy Comic',
      url: `${SITE_URL}/`,
      inLanguage: 'ja',
      description: DESCRIPTION,
    },
    {
      '@type': 'ComicSeries',
      name: '好きって言わせてやる！',
      url: `${SITE_URL}/main`,
      inLanguage: 'ja',
      genre: 'ラブコメ',
      description: '高校生男女の一次創作ラブコメ漫画',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ClientPage />
    </>
  );
}
