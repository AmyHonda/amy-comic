// lib/likes.ts

/** 記事ごとのいいね数。ハッシュ1つにまとめて、一覧表示を少ないコマンド数で済ませる */
export const LIKE_COUNTS_KEY = "blog:like-counts";

/** 訪問者ごとの「いいね済み記事ID」の集合 */
export const visitorLikesKey = (visitorId: string) => `blog:visitor:${visitorId}:likes`;

export const VISITOR_COOKIE = "amy_vid";

// microCMS のコンテンツIDに使われる文字だけを許可する
export const isValidBlogId = (id: unknown): id is string =>
  typeof id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(id);

export const isValidVisitorId = (id: unknown): id is string =>
  typeof id === "string" && /^[0-9a-f-]{36}$/.test(id);

/**
 * いいねの付け外しを1回で原子的に行う Lua スクリプト。
 * KEYS[1]=訪問者のいいね集合, KEYS[2]=記事ごとの数のハッシュ
 * ARGV[1]=記事ID, ARGV[2]="1"(いいね) or "0"(取り消し)
 * 実際に状態が変わったときだけ数を増減するので、連打や二重送信で数がずれない。
 */
export const TOGGLE_LIKE_SCRIPT = `
local changed
if ARGV[2] == '1' then
  changed = redis.call('SADD', KEYS[1], ARGV[1])
else
  changed = redis.call('SREM', KEYS[1], ARGV[1])
end
if changed == 1 then
  local count = redis.call('HINCRBY', KEYS[2], ARGV[1], ARGV[2] == '1' and 1 or -1)
  if count < 0 then
    redis.call('HSET', KEYS[2], ARGV[1], 0)
    return 0
  end
  return count
end
local current = redis.call('HGET', KEYS[2], ARGV[1])
return tonumber(current) or 0
`;
