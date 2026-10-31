// components/BlogList.tsx
import Image from "next/image";
import Link from "next/link";
import BlogPagination from "@/components/BlogPagination";
import { LikeButton, LikeProvider } from "@/components/LikeButton";
import { formatDate, type Blog } from "@/lib/blog";

/** /blog と /blog/page/[page] で共通の、プロフィール + 記事一覧 + ページ送り */
export default function BlogList({
  blogs,
  page,
  totalPages,
}: {
  blogs: Blog[];
  page: number;
  totalPages: number;
}) {
  return (
    <div className="bg-amy-yellow-light px-4 pb-20 pt-24 font-note">
      <div className="mx-auto max-w-md md:max-w-xl lg:max-w-4xl">
        {/* 見出しは検索エンジン・読み上げ用に残し、画面にはプロフィールを出す */}
        <h1 className="sr-only">{page === 1 ? "ブログ" : `ブログ(${page}ページ目)`}</h1>
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image
            src="/images/blog/emiko-profile.jpg"
            alt="emiko のプロフィール画像"
            width={312}
            height={312}
            priority
            className="size-16 rounded-full bg-white object-cover shadow-md md:size-20"
          />
          <p className="m-0 font-note text-2xl font-extrabold text-amy-ink md:text-3xl">
            emiko
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-amy-ink">まだ記事がありません。</p>
        ) : (
          <LikeProvider ids={blogs.map((blog) => blog.id)}>
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                // カード全体は記事へのリンク(::after で全面に広げる)。♡ボタンはその上(z-10)に置く
                <li
                  key={blog.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-amy-ink shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/blog/${blog.id}`}
                    className="block text-amy-ink no-underline after:absolute after:inset-0 after:content-['']"
                  >
                    {blog.eyecatch && (
                      <Image
                        src={blog.eyecatch.url}
                        alt=""
                        width={blog.eyecatch.width}
                        height={blog.eyecatch.height}
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 100vw"
                        className="block h-44 w-full object-cover"
                      />
                    )}
                    <div className="px-4 pt-3">
                      {blog.category && (
                        <span className="mb-2 inline-block rounded-full bg-amy-yellow px-3 py-0.5 text-xs font-bold">
                          {blog.category.name}
                        </span>
                      )}
                      <p className="m-0 text-base font-bold leading-relaxed">{blog.title}</p>
                    </div>
                  </Link>
                  <div className="mt-auto flex items-center gap-3 px-4 pb-4 pt-2">
                    <time dateTime={blog.publishedAt} className="text-xs text-amy-gold">
                      {formatDate(blog.publishedAt)}
                    </time>
                    <LikeButton id={blog.id} />
                  </div>
                </li>
              ))}
            </ul>
          </LikeProvider>
        )}

        <BlogPagination current={page} total={totalPages} />
      </div>
    </div>
  );
}
