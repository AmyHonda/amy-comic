// app/blog/page/[page]/page.tsx — 一覧の2ページ目以降(/blog/page/2, /blog/page/3, ...)
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogList from "@/components/BlogList";
import "../../../../styles/blog.css";
import { BLOG_DESCRIPTION, getBlogsPage, totalPagesOf } from "@/lib/blog";

// 秒。Next.js の仕様で、ここは数値を直接書く必要がある(定数の import は不可)
export const revalidate = 3600;

type Props = { params: Promise<{ page: string }> };

/** "2" → 2。数字以外や 0 以下は null */
function parsePage(raw: string): number | null {
  if (!/^\d{1,4}$/.test(raw)) return null;
  const page = Number(raw);
  return page >= 1 ? page : null;
}

// 現在ある2ページ目以降をビルド時に生成する。記事が増えて新しいページができたら、初回アクセス時に生成される。
export async function generateStaticParams() {
  const { totalCount } = await getBlogsPage(1);
  const totalPages = totalPagesOf(totalCount);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (page === null || page === 1) return {};
  return {
    title: `ブログ(${page}ページ目)`,
    description: BLOG_DESCRIPTION,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (page === null) notFound();
  if (page === 1) permanentRedirect("/blog"); // 1ページ目のURLは /blog に一本化する

  const { blogs, totalCount } = await getBlogsPage(page);
  if (blogs.length === 0) notFound(); // 存在しないページ

  return <BlogList blogs={blogs} page={page} totalPages={totalPagesOf(totalCount)} />;
}
