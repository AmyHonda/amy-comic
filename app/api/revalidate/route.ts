// app/api/revalidate/route.ts
// microCMS の Webhook を受け取り、更新された記事のページをすぐ作り直す(オンデマンド再検証)。
import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isValidBlogId } from "@/lib/likes";

/** microCMS が本文を秘密の合言葉で署名して送ってくる(X-MICROCMS-Signature)ので、それを照合する */
function isValidSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = signature.trim().toLowerCase();
  if (received.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  if (!isValidSignature(rawBody, request.headers.get("x-microcms-signature"), secret)) {
    console.warn("revalidate: 署名が一致しませんでした");
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: { api?: unknown; id?: unknown } | null = null;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // ブログ以外(news など)の更新は対象外。エラーにせず、何もしないで終える
  if (body?.api !== "blogs") {
    return NextResponse.json({ revalidated: false, reason: "not blogs" });
  }

  revalidatePath("/blog"); // 1ページ目
  revalidatePath("/blog/page/[page]", "page"); // 2ページ目以降をすべて
  revalidatePath("/sitemap.xml");
  if (isValidBlogId(body.id)) {
    revalidatePath(`/blog/${body.id}`); // 削除や非公開のときは、次のアクセスで404になる
  }

  return NextResponse.json({ revalidated: true });
}
