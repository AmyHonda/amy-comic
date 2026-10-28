import MainComic from './mainComic';

export const metadata = {
  title: '本編',
  description: '「好きって言わせてやる！」の本編漫画です。',
  alternates: { canonical: '/main' },
};

export default function mainComicPage() {
  return <MainComic />;
}
