// app/main/mainComicData.tsx
import { chapter1 } from "./chapter1";
import { chapter2 } from "./chapter2";
import { chapter3 } from "./chapter3";
import { chapter4 } from "./chapter4";
import { chapter5 } from "./chapter5";

export type MainComic = {
    chapter: number;
    title: string;
    thumbnail: string;
    pages: string[];
    URL?: string;
    updatedAt?: string; // 更新日 'YYYY-MM-DD'。この日から7日間だけ NEW バッジを表示（自動で消える）
    isContinued?: boolean; // true にすると「つづく」ボタンを表示（クリックしても反応しない）
};

export const mainComics: MainComic[] = [
    ...chapter1,
    ...chapter2,
    ...chapter3,
    ...chapter4,
    ...chapter5,
];