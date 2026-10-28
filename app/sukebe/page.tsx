import Sukebe from './sukebe';

export const metadata = {
  title: 'スケベ',
  description: '「好きって言わせてやる！」のスケベ漫画やイラストです。',
  alternates: { canonical: '/sukebe' },
  robots: { index: false, follow: true }, // 検索結果には出さない
};

export default function sukebePage() {
  return <Sukebe />;
}
