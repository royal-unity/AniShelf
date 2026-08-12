<?php

namespace App\Http\Controllers;

use App\Enum\WatchingStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MypageController extends Controller
{
    public function index(Request $request): Response
    {
        $status = WatchingStatus::tryFrom($request->integer('status')) ?? WatchingStatus::Watching;

        $userWatchingAnimes = Auth()->user()->userWatchingAnimes()->with(['anime.genre'])->where('status', $status->value)->paginate(10)->withQueryString();

        $statusCounts = Auth()->user()->userWatchingAnimes()->selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status');

        return Inertia::render('mypage/index', [
            'currentStatus' => $status->value,
            'userWatchingAnimes' => $userWatchingAnimes,
            'watchingStatuses' => array_map(
                fn (WatchingStatus $status) => [
                    'label' => $status->lavel(),
                    'value' => $status->value,
                    'count' => (int) ($statusCounts[$status->value] ?? 0),
                ],
                WatchingStatus::cases(),
            ),
        ]);
    }
}
