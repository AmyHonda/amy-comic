// lib/newBadge.ts
//
// 「NEW」バッジを、更新日から一定期間だけ表示するための共通処理。
// 各データに updatedAt: 'YYYY-MM-DD' を書いておくと、その日（日本時間）から
// NEW_DAYS 日間だけ NEW が表示され、あとは自動で消える。
import { useEffect, useState } from 'react';

/** NEW を表示する日数 */
export const NEW_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * updatedAt（'YYYY-MM-DD'）から NEW_DAYS 日以内なら true。
 * 日付は日本時間の 0:00 起点で数える（例: 10/30 なら 11/5 の 23:59 まで表示、11/6 の 0:00 に消える）。
 * 日付が未指定・不正な形式のときは false。
 */
export function isWithinNewPeriod(updatedAt: string | undefined, now: number): boolean {
  if (!updatedAt) return false;
  const start = new Date(`${updatedAt}T00:00:00+09:00`).getTime();
  if (Number.isNaN(start)) return false;
  return now < start + NEW_DAYS * DAY_MS;
}

/**
 * コンポーネントで使うフック。 const isNew = useIsNew(); → isNew(item.updatedAt)
 *
 * 現在時刻はブラウザで表示したあとに取得する。
 * （ビルド時に作られた HTML と見ている日がずれても、古い NEW が残らないようにするため）
 */
export function useIsNew(): (updatedAt?: string) => boolean {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  return (updatedAt) => now !== null && isWithinNewPeriod(updatedAt, now);
}
