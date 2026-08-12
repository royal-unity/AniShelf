<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 管理者ユーザーを作成
        User::factory(2)->create([
            'is_admin' => true,
        ]);

        // 一般ユーザーを作成
        User::factory(3)->create();

        $this->call([
            GenresSeeder::class,
            AnimesSeeder::class,
            UserWatchingAnimesSeeder::class,
            UserFavoriteGenresSeeder::class,
        ]);
    }
}
