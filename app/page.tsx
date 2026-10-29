// app/page.tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import News from '@/components/News';
import About from '@/components/About';

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

// News を最新に保つため、1分ごとに再生成する
export const revalidate = 60;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="bg-amy-yellow-light">
        <h1 className="sr-only">エイミーコミック</h1>

        {/* スマホ・タブレット: 上から ヒーロー → About → News の1列。
            PC(lg以上): 左に About と News(3)、右に ヒーロー(7) の2列。
            DOMの順番がスマホの表示順で、PCでは位置だけ指定し直している。 */}
        <div className="mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[3fr_7fr] lg:grid-rows-[auto_1fr] lg:px-8">
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Hero />
          </div>

          {/* PC: 高さが変わらない About を上、件数で伸びる News を下にする。
              About の上余白(pt-24)は Hero の上余白とそろえている。 */}
          <About className="lg:col-start-1 lg:row-start-1 lg:min-w-0 lg:pl-0 lg:pr-8 lg:pb-8 lg:pt-24" />
          <News className="lg:col-start-1 lg:row-start-2 lg:self-start lg:min-w-0 lg:pl-0 lg:pr-8 lg:pb-16" />
        </div>
      </div>
    </>
  );
}
