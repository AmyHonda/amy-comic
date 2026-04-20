// app/illust/illust.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import { illustrations, type Illustration } from "./illustData";
import "../../styles/illust.css";

export default function IllustGalleryPage() {
  const [selected, setSelected] = useState<Illustration | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
    <main className="illust-gallery">
      <h1>イラスト</h1>

      <div className="gallery">
        {illustrations.map((item, index) => (
          <div
            key={index}
            className="illust-thumb-wrapper"
            onClick={() => setSelected(item)}
          >
            {item.isNew && <span className="new-badge">NEW</span>}
            <img src={item.thumb} alt={item.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selected && (
        <div className="illust-modal" onClick={() => setSelected(null)}>
          <div
            className="illust-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.full} alt={selected.alt} />

            {selected.comment.trim() !== "" && (
              <div className="illust-comment">
                <div className="illust-comment-title">あとがき</div>

                {selected.comment
                  .replace(/\r\n/g, "\n")
                  .split("\n")
                  .map((line, i) => (
                    <p key={i} className="illust-comment-line">
                      {line === "" ? "\u00A0" : line}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <ChevronDoubleUpIcon className="scroll-icon" />
        </button>
      )}
    </main>
  );
}