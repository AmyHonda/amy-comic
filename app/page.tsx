// app/page.tsx
import ClientPage from './ClientPage';

export const metadata = {
  title: 'エイミーコミック',
  description: "一次創作サイトです。高校生男女のラブコメ創作漫画「好きって言わせてやる！」を描いています。",
};

export default function Page() {
  return <ClientPage />;
}