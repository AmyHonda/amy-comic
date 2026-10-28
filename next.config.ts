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
    ];
  },
};

export default nextConfig;
