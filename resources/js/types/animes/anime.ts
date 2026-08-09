// アニメの型
export type Anime = {
    id: number;
    name: string;
    anime_img_path: string | null;
    genre: {
        id: number;
        name: string;
    };
};
