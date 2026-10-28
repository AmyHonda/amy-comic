// app/sitemap.ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.amy-comic.com';

// /sukebe は noindex のためサイトマップには含めない
const PATHS = ['/', '/main', '/sub', '/characters', '/illust', '/nijisousaku', '/ai'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(path => ({
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
  }));
}
