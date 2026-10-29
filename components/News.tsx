// components/News.tsx
import { client } from "@/lib/microcms";

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  linkUrl?: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  }).format(new Date(dateString));
}

async function getNews(): Promise<NewsItem[]> {
  try {
    const data = await client.get({ endpoint: "news" });
    return data.contents ?? [];
  } catch {
    // microCMS が一時的に落ちていても、ページ自体は表示できるようにする
    console.error("News の取得に失敗しました");
    return [];
  }
}

export default async function News() {
  const newsItems = await getNews();
  if (newsItems.length === 0) return null;

  return (
    <section className="bg-amy-yellow-light px-4 pb-16 font-zenmaru">
      <div className="mx-auto max-w-md md:max-w-xl">
        <h2 className="mb-5 text-center font-mochiy text-2xl text-amy-gold">
          News
        </h2>

        <div className="overflow-hidden rounded-[2rem] bg-white px-6 py-2">
          <ul className="m-0 list-none p-0">
            {newsItems.map((item) => {
              const content = (
                <>
                  <p className="m-0 mb-1 text-sm font-bold text-amy-gold">
                    {formatDate(item.publishedAt)}
                  </p>
                  <p className="m-0 font-bold text-zinc-800">{item.title}</p>
                </>
              );

              return (
                <li
                  key={item.id}
                  className="border-b border-amy-yellow/40 py-5 last:border-b-0"
                >
                  {item.linkUrl ? (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-inherit no-underline transition hover:opacity-60"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
