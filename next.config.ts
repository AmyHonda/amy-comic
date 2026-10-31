import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ブログのアイキャッチ(microCMS の画像)を next/image で配信するために許可する
    remotePatterns: [
      { protocol: 'https', hostname: 'images.microcms-assets.io' },
    ],
  },
  async redirects() {
    return [
      // Vercel の自動ドメイン (amy-comic.vercel.app) に来た人を、正規ドメインへ恒久転送する。
      // 同じサイトが2つのドメインで見えると、検索結果で重複扱いになるため。
      // host が一致したときだけ働くので、www.amy-comic.com やプレビュー用URLには影響しない。
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'amy-comic.vercel.app' }],
        destination: 'https://www.amy-comic.com/:path*',
        permanent: true,
      },
      // はてなブログ時代の旧URL(/entry/...)は、記事ごとの対応先が無いため /blog に集約する。
      {
        source: '/entry/:path*',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
