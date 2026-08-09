<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserFavoriteGenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $genres = Genre::all();

        foreach ($users as $user) {
            // お気に入りにするジャンル3つをランダムで取得
            $favoriteGenreIds = $genres->random(rand(0, 3))->pluck('id')->toArray();

            // 中間テーブルに登録
            $user->favoriteGenres()->syncWithoutDetaching($favoriteGenreIds);
        }
    }
}
