// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL, getBlogs } from '@/lib/blog';

// 秒。Next.js の仕様で、ここは数値を直接書く必要がある(定数の import は不可)
export const revalidate = 3600;

// /sukebe は noindex のためサイトマップには含めない
const PATHS = ['/', '/main', '/sub', '/characters', '/illust', '/nijisousaku', '/ai', '/blog'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

  return [
    ...PATHS.map(path => ({
      url: `${SITE_URL}${path === '/' ? '/' : path}`,
    })),
    ...blogs.map(blog => ({
      url: `${SITE_URL}/blog/${blog.id}`,
      lastModified: new Date(blog.revisedAt ?? blog.updatedAt),
    })),
  ];
}
