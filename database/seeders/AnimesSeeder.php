<?php

namespace Database\Seeders;

use App\Models\Anime;
use Illuminate\Database\Seeder;

class AnimesSeeder extends Seeder
{
    public function run(): void
    {
        $animes = [
            [
                'genre_id' => 2,
                'name' => '星屑リフレイン',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '星の記憶を失った少女と、彼女の過去を知る少年が夜空の謎を追う青春ファンタジー。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 7,
                'name' => '放課後クロノグラフ',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '放課後だけ時間を巻き戻せる時計を手にした高校生たちの学園ミステリー。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 2,
                'name' => '蒼天のアルカディア',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '空に浮かぶ大陸を舞台に、失われた王国を探す飛空士たちの冒険を描く。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 7,
                'name' => 'メモリーズ・オブ・レイン',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '雨の日にだけ他人の記憶が見える少女が、街で起きる事件の真相に迫る。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 8,
                'name' => '魔法喫茶ルミエール',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '魔法使いたちが集まる喫茶店で働く新人店員の日常と騒動を描くコメディ。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 3,
                'name' => '機鋼都市ヴァルハイト',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '巨大機械に支配された都市で、自由を求める若者たちが戦うSFアクション。',
                'is_current_season' => true,
            ],
            [
                'genre_id' => 7,
                'name' => '月影探偵局',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '人間には見えない怪異事件を専門に扱う、小さな探偵事務所の物語。',
                'is_current_season' => false,
            ],
            [
                'genre_id' => 5,
                'name' => '君と奏でる青い季節',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '廃部寸前の吹奏楽部に集まった生徒たちが、最後のコンクールを目指す青春物語。',
                'is_current_season' => false,
            ],
            [
                'genre_id' => 10,
                'name' => '異世界郵便局の配達日誌',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '異世界に転移した青年が郵便配達員となり、さまざまな種族へ手紙を届ける。',
                'is_current_season' => false,
            ],
            [
                'genre_id' => 2,
                'name' => '零番街のエクソシスト',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '悪霊が集まる都市の片隅で、秘密を抱えた退魔師が戦い続けるダークファンタジー。',
                'is_current_season' => false,
            ],
            [
                'genre_id' => 2,
                'name' => 'スイーツ王国の見習い騎士',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => 'お菓子でできた王国を守るため、臆病な見習い騎士が仲間と成長していく。',
                'is_current_season' => false,
            ],
            [
                'genre_id' => 7,
                'name' => '深海列車アビサルライン',
                'official_site_url' => 'https://laravel.com/docs',
                'description' => '深海を走る列車に乗り込んだ乗客たちが、海底世界の秘密を解き明かす。',
                'is_current_season' => false,
            ],
        ];

        foreach ($animes as $anime) {
            Anime::create($anime);
        }
    }
}