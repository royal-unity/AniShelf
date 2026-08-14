<?php

namespace App\Http\Controllers;

use App\Enum\WatchingStatus;
use App\Http\Requests\WatchingStatusRequest;
use App\Models\Anime;
use App\Models\UserWatchingAnime;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Throwable;

class WatchingStatusController extends Controller
{
    /**
     * Summary of update
     */
    public function update(Anime $anime, WatchingStatusRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            UserWatchingAnime::updateOrCreate(
                [
                    'user_id' => auth()->id(),
                    'anime_id' => $anime->id,
                ],
                [
                    'status' => $validated['selectedValue'],
                ]
            );

            $status = WatchingStatus::from(
                $validated['selectedValue']
            );

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => "視聴状態を「{$status->lavel()}」に変更しました",
            ]);

        } catch (Throwable $e) {
            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => '視聴状態を変更できませんでした',
            ]);

        }

        return back();

    }
}
