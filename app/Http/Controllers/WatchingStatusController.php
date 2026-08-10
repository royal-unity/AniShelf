<?php

namespace App\Http\Controllers;

use App\Http\Requests\WatchingStatusRequest;
use App\Models\Anime;
use App\Models\UserWatchingAnime;
use Illuminate\Http\RedirectResponse;

class WatchingStatusController extends Controller
{
    /**
     * Summary of update
     */
    public function update(Anime $anime, WatchingStatusRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        UserWatchingAnime::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'anime_id' => $anime->id,
            ],
            [
                'status' => $validated['selectedValue'],
            ]
        );

        return back();
    }
}
