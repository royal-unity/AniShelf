<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenresSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            'アクション',
            'ファンタジー',
            'SF',
            '恋愛',
            '日常',
            'ホラー',
            'ミステリー',
            '魔法少女',
            'コメディ',
            '異世界転生',
        ];

        foreach ($genres as $genre) {
            Genre::create([
                'name' => $genre,
            ]);
        }
    }
}
