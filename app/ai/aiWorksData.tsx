// app/ai/aiWorksData.tsx

export type AiWorkType =
  | "AI実写化画像"
  | "AI制服化"
  | "AI実写化動画"
  | "実写ドラマ風PV"
  | "番外編ショート";

export type AiWork = {
  id: string;
  type: AiWorkType;
  characters: string[];
  thumbnailUrl: string;
  youtubeId?: string;
  videoAspect?: "short" | "wide";
  imageUrl?: string;
  isNew?: boolean;
};

export const aiWorks: AiWork[] = [
  {
    id: "ren-ran-live-action-02",
    type: "AI実写化動画",
    characters: ["蓮", "蘭"],
    thumbnailUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780197448/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-05-31_12.16.44_kard1n.png",
    youtubeId: "UGegqvP9j10?si",
    videoAspect: "short",
    isNew: true,
  },
  {
    id: "aoi-tsubaki-live-action-01",
    type: "AI実写化動画",
    characters: ["葵", "椿"],
    thumbnailUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780137296/%E8%91%B5_%E6%A4%BF_%E3%82%B5%E3%83%A0%E3%83%8D_benrkw.png",
    youtubeId: "xB1XKkKDuvo",
    videoAspect: "short",
    // isNew: true,
  },
  {
    id: "kaede-sakura-gallery03",
    type: "AI実写化画像",
    characters: ["楓", "桜"],
    thumbnailUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144400/IMG_2182%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC_rfzsoi.jpg",
    imageUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144401/IMG_2182_t4h3yy.jpg",
    // isNew: true,
  },
  {
    id: "ren-ran-gallery02",
    type: "AI実写化画像",
    characters: ["蓮", "蘭"],
    thumbnailUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144364/IMG_2181%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC_akgzvj.jpg",
    imageUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144361/IMG_2181_avjmqa.jpg",
    // isNew: true,
  },
  {
    id: "aoi-tsubaki-gallery01",
    type: "AI実写化画像",
    characters: ["葵", "椿"],
    thumbnailUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144355/IMG_2180%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC_hz8t3o.jpg",
    imageUrl: "https://res.cloudinary.com/dqx46otx4/image/upload/v1780144352/IMG_2180_himx3w.jpg",
    // isNew: true,
  },
  
];