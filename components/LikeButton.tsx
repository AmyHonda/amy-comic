// components/LikeButton.tsx
"use client";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LikeState = { count: number; liked: boolean };
type Status = "loading" | "ready" | "unavailable";

type LikeContextValue = {
  status: Status;
  likes: Record<string, LikeState>;
  toggle: (id: string) => void;
};

const LikeContext = createContext<LikeContextValue | null>(null);

/**
 * 与えられた記事IDのいいね数と「自分が押したか」を1回の通信でまとめて取得し、
 * 配下の LikeButton に配る。一覧ページでは全記事ぶんを1回で取得する。
 */
export function LikeProvider({ ids, children }: { ids: string[]; children: ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [likes, setLikes] = useState<Record<string, LikeState>>({});
  const pending = useRef(new Set<string>());
  const idsKey = ids.join(",");

  useEffect(() => {
    if (!idsKey) return;
    const controller = new AbortController();

    fetch(`/api/likes?ids=${encodeURIComponent(idsKey)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ likes: Record<string, LikeState> }>;
      })
      .then((data) => {
        setLikes(data.likes);
        setStatus("ready");
      })
      .catch((error) => {
        if (error?.name === "AbortError") return;
        // Redis 未設定(ローカル開発など)や一時的な障害のときは、ボタンごと隠す
        setStatus("unavailable");
      });

    return () => controller.abort();
  }, [idsKey]);

  const toggle = useCallback(
    (id: string) => {
      if (status !== "ready" || pending.current.has(id)) return;
      pending.current.add(id);

      const before = likes[id] ?? { count: 0, liked: false };
      const next = { count: Math.max(0, before.count + (before.liked ? -1 : 1)), liked: !before.liked };
      setLikes((prev) => ({ ...prev, [id]: next })); // 押した瞬間に見た目を更新する

      fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, liked: next.liked }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json() as Promise<LikeState>;
        })
        .then((data) => setLikes((prev) => ({ ...prev, [id]: data })))
        .catch(() => setLikes((prev) => ({ ...prev, [id]: before }))) // 失敗したら元に戻す
        .finally(() => pending.current.delete(id));
    },
    [status, likes],
  );

  const value = useMemo(() => ({ status, likes, toggle }), [status, likes, toggle]);
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

const RED = "text-[#c9415a]";

export function LikeButton({
  id,
  variant = "small",
  className = "",
}: {
  id: string;
  /** small: 一覧の日付の横 / large: 記事ページ下の丸いボタン */
  variant?: "small" | "large";
  className?: string;
}) {
  const context = useContext(LikeContext);
  if (!context || context.status === "unavailable") return null;

  const { status, likes, toggle } = context;
  const { count, liked } = likes[id] ?? { count: 0, liked: false };
  const Icon = liked ? HeartSolid : HeartOutline;
  const label = liked ? "いいねを取り消す" : "いいねする";

  if (variant === "large") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={() => toggle(id)}
          disabled={status !== "ready"}
          aria-pressed={liked}
          aria-label={label}
          className={`flex size-11 items-center justify-center rounded-full border-2 bg-white transition hover:scale-105 disabled:opacity-50 ${
            liked ? `border-[#c9415a] ${RED}` : "border-gray-300 text-gray-500"
          }`}
        >
          <Icon className="size-6" aria-hidden="true" />
        </button>
        {count > 0 && <span className="text-sm text-gray-500">{count}</span>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      disabled={status !== "ready"}
      aria-pressed={liked}
      aria-label={label}
      className={`relative z-10 inline-flex cursor-pointer items-center gap-1 [font-family:inherit] rounded-full p-1 text-xs transition hover:scale-105 disabled:cursor-default disabled:opacity-50 ${
        liked ? RED : "text-gray-500"
      } ${className}`}
    >
      <Icon className="size-5" aria-hidden="true" />
      {count > 0 && <span>{count}</span>}
    </button>
  );
}
