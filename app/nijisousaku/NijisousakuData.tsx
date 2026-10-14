// 二次創作作品のデータ（番外編 SubComicData.tsx と同じ形式）
// URL         : あとがきなどへのリンク（任意）
// isContinued : true にすると「つづく」ボタンを表示（任意・クリックしても反応しない）
export type NijisousakuItem = {
    title: string;
    thumbnail: string;
    pages: string[];
    URL?: string;
    isContinued?: boolean;
};

export const nijisousakuList: NijisousakuItem[] = [
    {
        title: '①らんま1/2【20巻】猫魔鈴回の乱あ妄想漫画',
        thumbnail: 'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978111/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC_uba92c.jpg',
        pages: [
            'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978111/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC_uba92c.jpg',
            'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978111/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC2_o00emt.jpg',
            'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978111/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC3_id7zul.jpg',
            'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978111/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC4_aoe97b.jpg',
            'https://res.cloudinary.com/dqx46otx4/image/upload/v1791978112/%E9%99%A4%E5%A4%9C%E3%81%AE%E5%91%AA%E3%81%84_%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC5_s1qvri.jpg',
        ],
        isContinued: true,
        // URL: 'https://example.com',
    },
];
