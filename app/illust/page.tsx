// app/illust/page.tsx
import Illust from './illust';

export const metadata = {
  title: 'イラスト',
  description: '「好きって言わせてやる！」のイラストです。',
  alternates: { canonical: '/illust' },
};

export default function IllustPage() {
  return <Illust />;
}
