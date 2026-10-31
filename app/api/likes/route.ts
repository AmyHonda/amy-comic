// app/api/likes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getBlog } from "@/lib/blog";
import {
  LIKE_COUNTS_KEY,
  TOGGLE_LIKE_SCRIPT,
  VISITOR_COOKIE,
  isValidBlogId,
  isValidVisitorId,
  visitorLikesKey,
} from "@/lib/likes";
import { redisConfigured, redisPipeline } from "@/lib/redis";

const RATE_LIMIT_PER_MINUTE = 30;

/** GET /api/likes?ids=a,b,c → { likes: { a: { count, liked }, ... } } */
export async function GET(request: NextRequest) {
  if (!redisConfigured) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const ids = [...new Set((request.nextUrl.searchParams.get("ids") ?? "").split(",").filter(Boolean))];
  if (ids.length === 0 || ids.length > 100 || !ids.every(isValidBlogId)) {
    return NextResponse.json({ error: "invalid ids" }, { status: 400 });
  }

  const cookie = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = isValidVisitorId(cookie) ? cookie : undefined;

  try {
    const [rawCounts, rawLiked] = await redisPipeline([
      ["HGETALL", LIKE_COUNTS_KEY],
      ...(visitorId ? [["SMEMBERS", visitorLikesKey(visitorId)]] : []),
    ]);

    // HGETALL は [項目, 値, 項目, 値, ...] の平らな配列で返ってくる
    const counts = new Map<string, number>();
    const flat = (rawCounts as string[] | undefined) ?? [];
    for (let i = 0; i + 1 < flat.length; i += 2) counts.set(flat[i], Number(flat[i + 1]) || 0);
    const liked = new Set((rawLiked as string[] | undefined) ?? []);

    const likes = Object.fromEntries(
      ids.map((id) => [id, { count: Math.max(0, counts.get(id) ?? 0), liked: liked.has(id) }]),
    );
    return NextResponse.json({ likes }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("いいねの取得に失敗しました", error);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}

/** POST /api/likes  { id, liked } → { count, liked } */
export async function POST(request: NextRequest) {
  if (!redisConfigured) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { id?: unknown; liked?: unknown } | null;
  if (!body || !isValidBlogId(body.id) || typeof body.liked !== "boolean") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const { id, liked } = body;

  try {
    // 連打・自動送信の対策: IP ごとに1分あたりの回数を制限する
    const ip = (request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").slice(0, 64);
    const rateKey = `blog:ratelimit:${ip}`;
    const [attempts] = await redisPipeline([
      ["INCR", rateKey],
      ["EXPIRE", rateKey, 60, "NX"],
    ]);
    if (Number(attempts) > RATE_LIMIT_PER_MINUTE) {
      return NextResponse.json({ error: "too many requests" }, { status: 429 });
    }

    // 存在しない記事IDにいいねが溜まらないようにする
    if (liked && !(await getBlog(id))) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const cookie = request.cookies.get(VISITOR_COOKIE)?.value;
    const visitorId = isValidVisitorId(cookie) ? cookie : crypto.randomUUID();

    const [result] = await redisPipeline([
      ["EVAL", TOGGLE_LIKE_SCRIPT, 2, visitorLikesKey(visitorId), LIKE_COUNTS_KEY, id, liked ? "1" : "0"],
    ]);

    const response = NextResponse.json(
      { count: Math.max(0, Number(result) || 0), liked },
      { headers: { "Cache-Control": "no-store" } },
    );
    if (visitorId !== cookie) {
      response.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
    return response;
  } catch (error) {
    console.error("いいねの更新に失敗しました", error);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
