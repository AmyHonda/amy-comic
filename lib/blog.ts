// lib/blog.ts
import { client } from "@/lib/microcms";

export const SITE_URL = "https://www.amy-comic.com";
export const SITE_NAME = "エイミーコミック";
export const DEFAULT_OGP = {
  url: "/ogp-square.jpg",
  width: 968,
  height: 968,
  type: "image/jpeg",
  alt: SITE_NAME,
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string; width: number; height: number };
  category?: { name: string };
  publishedAt: string;
  updatedAt: string;
  revisedAt?: string;
};

export const BLOGS_PER_PAGE = 20;

export const BLOG_DESCRIPTION =
  "ラブコメ一次創作漫画「好きって言わせてやる！」の制作の裏話や、エイミーコミックの更新情報をお届けするブログです。";

/** 一覧の1ページ分(新しい順)と、全記事数を取得する */
export async function getBlogsPage(page: number): Promise<{ blogs: Blog[]; totalCount: number }> {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        limit: BLOGS_PER_PAGE,
        offset: (page - 1) * BLOGS_PER_PAGE,
        orders: "-publishedAt",
      },
    });
    return { blogs: data.contents ?? [], totalCount: data.totalCount ?? 0 };
  } catch {
    // microCMS が一時的に落ちていても、ビルドやページ表示を止めない
    console.error("blogs の取得に失敗しました");
    return { blogs: [], totalCount: 0 };
  }
}

export const totalPagesOf = (totalCount: number) => Math.ceil(totalCount / BLOGS_PER_PAGE);

type BlogMeta = Pick<Blog, "id" | "publishedAt" | "updatedAt" | "revisedAt">;

/** sitemap や静的生成用に、全記事の id と日付だけを(100件を超えても)全部取得する */
export async function getAllBlogs(): Promise<BlogMeta[]> {
  try {
    return await client.getAllContents<BlogMeta>({
      endpoint: "blogs",
      queries: { fields: "id,publishedAt,updatedAt,revisedAt", orders: "-publishedAt" },
    });
  } catch {
    console.error("blogs の全件取得に失敗しました");
    return [];
  }
}

export async function getBlog(id: string): Promise<Blog | null> {
  try {
    return await client.get<Blog>({ endpoint: "blogs", contentId: id });
  } catch {
    return null;
  }
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(dateString));
}

/** 本文HTMLからタグを除いて、meta description 用の短い文章にする */
export function toDescription(html: string, maxLength = 120) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
