// lib/redis.ts
// Upstash Redis を REST API 経由で使う(追加パッケージ不要)。
// Vercel の Upstash 連携は KV_REST_API_* 、Upstash 単体は UPSTASH_REDIS_REST_* の名前で環境変数を作る。
const URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(URL && TOKEN);

type Command = (string | number)[];

/** 複数のコマンドを1回の通信でまとめて実行し、結果を順番に返す */
export async function redisPipeline(commands: Command[]): Promise<unknown[]> {
  if (!URL || !TOKEN) throw new Error("Redis is not configured");

  const res = await fetch(`${URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis request failed: ${res.status}`);

  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((item) => {
    if (item.error) throw new Error(item.error);
    return item.result;
  });
}
