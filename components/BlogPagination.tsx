// components/BlogPagination.tsx
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const hrefOf = (page: number) => (page === 1 ? "/blog" : `/blog/page/${page}`);

/** 表示するページ番号を作る。多いときは「1 … 4 5 6 … 20」のように省略する */
function pageItems(current: number, total: number): (number | "ellipsis")[] {
  const numbers =
    total <= 7
      ? Array.from({ length: total }, (_, i) => i + 1)
      : [...new Set([1, total, current - 1, current, current + 1])]
          .filter((n) => n >= 1 && n <= total)
          .sort((a, b) => a - b);

  const items: (number | "ellipsis")[] = [];
  numbers.forEach((n, i) => {
    if (i > 0 && n - numbers[i - 1] > 1) items.push("ellipsis");
    items.push(n);
  });
  return items;
}

const buttonClass =
  "flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-amy-ink no-underline shadow-sm transition hover:bg-amy-yellow/60";

export default function BlogPagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  return (
    <nav aria-label="ページ送り" className="mt-10 font-zenmaru">
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0">
        {current > 1 && (
          <li>
            <Link href={hrefOf(current - 1)} rel="prev" aria-label="前のページ" className={buttonClass}>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </Link>
          </li>
        )}

        {pageItems(current, total).map((item, index) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${index}`} aria-hidden="true" className="px-1 text-amy-gold">
              …
            </li>
          ) : (
            <li key={item}>
              {item === current ? (
                <span
                  aria-current="page"
                  className="flex size-10 items-center justify-center rounded-full bg-amy-yellow text-sm font-extrabold text-amy-ink shadow-[2px_2px_0_#E6B800]"
                >
                  {item}
                </span>
              ) : (
                <Link href={hrefOf(item)} aria-label={`${item}ページ目`} className={buttonClass}>
                  {item}
                </Link>
              )}
            </li>
          ),
        )}

        {current < total && (
          <li>
            <Link href={hrefOf(current + 1)} rel="next" aria-label="次のページ" className={buttonClass}>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
