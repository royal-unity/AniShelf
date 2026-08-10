// アニメの型
export type Anime = {
    id: number;
    name: string;
    official_site_url: string;
    description: string;
    anime_img_path: string | null;
    is_current_season: boolean;
    genre: {
        id: number;
        name: string;
    };
};
