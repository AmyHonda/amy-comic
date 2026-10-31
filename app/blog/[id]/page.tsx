// app/blog/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LikeButton, LikeProvider } from "@/components/LikeButton";
import {
  DEFAULT_OGP,
  SITE_NAME,
  SITE_URL,
  formatDate,
  getAllBlogs,
  getBlog,
  toDescription,
} from "@/lib/blog";
import "../../../styles/blog.css";

// 秒。Next.js の仕様で、ここは数値を直接書く必要がある(定数の import は不可)
export const revalidate = 3600;

// 既存の記事はビルド時に静的生成する。新しい記事は初回アクセス時に生成される。
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ id: blog.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return {};

  const description = toDescription(blog.content);
  const image = blog.eyecatch
    ? {
        url: blog.eyecatch.url,
        width: blog.eyecatch.width,
        height: blog.eyecatch.height,
        alt: blog.title,
      }
    : DEFAULT_OGP;

  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blog/${blog.id}` },
    // openGraph / twitter は layout の設定とマージされず丸ごと置き換わるので、必要な項目を全部書く
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `/blog/${blog.id}`,
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.revisedAt ?? blog.updatedAt,
      images: [image],
    },
    twitter: {
      card: blog.eyecatch ? "summary_large_image" : "summary",
      title: blog.title,
      description,
      images: [image.url],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  const imageUrl = blog.eyecatch?.url ?? `${SITE_URL}${DEFAULT_OGP.url}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: toDescription(blog.content),
    image: imageUrl,
    datePublished: blog.publishedAt,
    dateModified: blog.revisedAt ?? blog.updatedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${blog.id}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="bg-amy-yellow-light px-4 pb-20 pt-24 font-note">
      <script
        type="application/ld+json"
        // "<" をエスケープして、本文中の文字列で script が途切れないようにする
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LikeProvider ids={[blog.id]}>
      <article className="mx-auto max-w-2xl rounded-3xl bg-white px-5 py-8 shadow-md md:px-10">
        {blog.eyecatch && (
          <Image
            src={blog.eyecatch.url}
            alt={blog.title}
            width={blog.eyecatch.width}
            height={blog.eyecatch.height}
            priority
            sizes="(min-width: 768px) 672px, 100vw"
            className="mb-6 block max-h-96 w-full rounded-2xl object-cover"
          />
        )}

        {blog.category && (
          <span className="mb-2 inline-block rounded-full bg-amy-yellow px-3 py-0.5 text-xs font-bold text-amy-ink">
            {blog.category.name}
          </span>
        )}
        <h1 className="m-0 mb-2 text-2xl font-bold leading-relaxed text-amy-ink">
          {blog.title}
        </h1>
        <time dateTime={blog.publishedAt} className="text-sm text-amy-gold">
          {formatDate(blog.publishedAt)}
        </time>

        <div
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-10 border-t border-amy-yellow pt-5">
          <LikeButton id={blog.id} variant="large" />
        </div>
      </article>
      </LikeProvider>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-block rounded-full bg-amy-yellow px-6 py-2.5 text-sm font-extrabold text-amy-ink no-underline shadow-[3px_3px_0_#E6B800] transition hover:-translate-y-0.5"
        >
          ブログ一覧へ
        </Link>
      </div>
    </div>
  );
}
