// app/ai/AiWorks.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import { aiWorks, type AiWork } from "./aiWorksData";
import "../../styles/aiWorks.css";

export default function AiWorks() {
  const [selected, setSelected] = useState<AiWork | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (selected) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    }
  }, [selected]);

  return (
    <div className="ai-works-page">
      <section className="ai-works-hero">
        <h1>AI作品</h1>
        <p>
          「好きって言わせてやる！」のキャラをAIで実写化・動画化した作品ギャラリーです。
        </p>
      </section>

      <section className="ai-works-grid">
        {aiWorks.map((item) => (
          <article
            key={item.id}
            className="ai-work-card"
            onClick={() => setSelected(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelected(item);
              }
            }}
          >
            <div className="ai-work-thumb">
              {item.isNew && <span className="ai-new-badge">NEW</span>}

              <img src={item.thumbnailUrl} alt={`${item.type} ${item.characters.join("・")}`} loading="lazy" />

              {item.youtubeId && (
                <span className="ai-play-badge">▶ 動画を見る</span>
              )}
            </div>

            <div className="ai-work-body">
              <div className="ai-work-meta">
                <span className="ai-type-label">{item.type}</span>
                <span className="ai-character-label">
                  {item.characters.join("・")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selected && (
        <div className="ai-work-modal" onClick={() => setSelected(null)}>
          <button
            type="button"
            className="ai-modal-close"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
            aria-label="閉じる"
          >
            ×
          </button>

          <div
            className="ai-work-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.youtubeId ? (
              <div
                className={`ai-youtube-wrap ${selected.videoAspect === "short" ? "is-short" : "is-wide"
                  }`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selected.youtubeId}`}
                  title={`${selected.type} ${selected.characters.join("・")}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : selected.imageUrl ? (
              <img
                className="ai-modal-image"
                src={selected.imageUrl}
                alt={`${selected.type} ${selected.characters.join("・")}`}
              />
            ) : (
              <img
                className="ai-modal-image"
                src={selected.thumbnailUrl}
                alt={`${selected.type} ${selected.characters.join("・")}`}
              />
            )}

            <div className="ai-modal-info">
              <div className="ai-work-meta">
                <span className="ai-type-label">{selected.type}</span>
                <span className="ai-character-label">
                  {selected.characters.join("・")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          type="button"
          className="ai-scroll-to-top"
          onClick={scrollToTop}
          aria-label="ページ上部へ戻る"
        >
          <ChevronDoubleUpIcon className="ai-scroll-icon" />
        </button>
      )}
    </div>
  );
}