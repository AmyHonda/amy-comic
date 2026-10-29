import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // 旧ブログ(/blog/... と、はてな時代の /entry/...)は note に移したので、そちらへ転送する。
      // 記事ごとの対応先は無いため、note のトップに集約する。
      {
        source: '/blog/:path*',
        destination: 'https://note.com/emiko_xyz',
        permanent: true,
      },
      {
        source: '/entry/:path*',
        destination: 'https://note.com/emiko_xyz',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
