'use client';

import { useEffect, useState } from "react";
import { characterList } from "../characters/data/characters";

export default function Character() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0); // モーダル内スライド用
  const [fadeClass, setFadeClass] = useState("fade-in");

  const character = characterList[index];

  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setInterval(() => {
      setFadeClass(""); // 一旦非表示（opacity: 0）

      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % character.gallery.length);
        setFadeClass("fade-in");
      }, 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isModalOpen, character.gallery.length]);

  return (
    <div className="character">
      <h1>登 場 人 物</h1>
      <div className="thumbnails">
        {characterList.map((item, i) => (
          <img
            key={i}
            src={item.url}
            alt={item.name}
            className={`thumbnail ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <p className="click">⇩クリックして拡大</p>

      <img
        src={character.url}
        alt={character.name}
        className="main-image"
        onClick={() => {
          setSlideIndex(0);
          setIsModalOpen(true);
        }}
      />

      {/* モーダル表示 */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
            </button>
            <img
              src={character.gallery[slideIndex]}
              alt={character.name}
              className={`modal-image ${fadeClass}`}
            />
          </div>
        </div>
      )}

      <h2>
        {character.name}
        <span style={{ marginLeft: '8px', fontSize: '1.1rem', color: '#666'}}>
          {character.kana}  
        </span>  
      </h2>
      <p className="description">{character.description}</p>
    </div>
  );
}
