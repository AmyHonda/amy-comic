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

/** 一覧用(本文を含まないが、型は Blog をそのまま使う) */
export async function getBlogs(): Promise<Blog[]> {
  try {
    const data = await client.getList<Blog>({
      endpoint: "blogs",
      queries: { limit: 100, orders: "-publishedAt" },
    });
    return data.contents ?? [];
  } catch {
    // microCMS が一時的に落ちていても、ビルドやページ表示を止めない
    console.error("blogs の取得に失敗しました");
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
