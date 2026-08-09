<?php

namespace Database\Seeders;

use App\Enum\WatchingStatus;
use App\Models\Anime;
use App\Models\User;
use App\Models\UserWatchingAnime;
use Illuminate\Database\Seeder;

class UserWatchingAnimesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $animes = Anime::all();

        foreach ($users as $user) {
            $watchAnimeesId = $animes->random(3)->pluck('id')->toArray();

            $status = [
                WatchingStatus::WantToWatch,
                WatchingStatus::Watching,
                WatchingStatus::Completed,
            ];

            foreach ($watchAnimeesId as $index => $wathcAnimeId) {
                UserWatchingAnime::create([
                    'user_id' => $user->id,
                    'anime_id' => $wathcAnimeId,
                    'status' => $status[$index],
                ]);
            }
        }
    }
}
