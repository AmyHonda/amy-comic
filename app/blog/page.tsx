// app/blog/page.tsx
import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import "../../styles/blog.css";
import { BLOG_DESCRIPTION, getBlogsPage, totalPagesOf } from "@/lib/blog";

// 秒。Next.js の仕様で、ここは数値を直接書く必要がある(定数の import は不可)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ブログ",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
};

export default async function BlogListPage() {
  const { blogs, totalCount } = await getBlogsPage(1);
  return <BlogList blogs={blogs} page={1} totalPages={totalPagesOf(totalCount)} />;
}
