// app/robots.ts
import type { MetadataRoute } from 'next';

// noindex を読んでもらうため、sukebe もクロール自体はブロックしない
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.amy-comic.com/sitemap.xml',
  };
}
