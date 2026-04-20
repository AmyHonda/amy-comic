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
    isNew?: boolean;
};

export const mainComics: MainComic[] = [
    ...chapter1,
    ...chapter2,
    ...chapter3,
    ...chapter4,
    ...chapter5,
];