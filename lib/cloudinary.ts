// lib/cloudinary.ts

const UPLOAD_MARKER = '/image/upload/';

/**
 * Cloudinary の画像URLに自動最適化(f_auto,q_auto)を付ける。
 * - f_auto: ブラウザに合わせて WebP / AVIF などの軽い形式で配信
 * - q_auto: 見た目を保ったまま画質(容量)を自動調整
 * Cloudinary 以外のURLや、すでに変換指定があるURLはそのまま返す。
 */
export function optimizeImage(url: string, transform = 'f_auto,q_auto'): string {
  if (!url.includes('res.cloudinary.com')) return url;

  const i = url.indexOf(UPLOAD_MARKER);
  if (i < 0) return url;

  const head = url.slice(0, i + UPLOAD_MARKER.length);
  const rest = url.slice(i + UPLOAD_MARKER.length);

  // 変換指定済み（例: "w_400,c_fill/..."）なら触らない。バージョン "v123/" には _ が無いので誤判定しない。
  if (/^[a-z]{1,3}_[^/]*\//.test(rest)) return url;

  return `${head}${transform}/${rest}`;
}

/**
 * 一覧用サムネイル。表示サイズに合わせて縮小して配信する(元画像が大きくても転送量が小さくなる)。
 * - c_limit: 指定幅より大きい場合だけ縮小(拡大はしない・縦横比も変えない)
 * - width は「表示幅の約2倍」を目安にする(Retina 向け)
 */
export function thumbImage(url: string, width = 480): string {
  return optimizeImage(url, `f_auto,q_auto,c_limit,w_${width}`);
}
