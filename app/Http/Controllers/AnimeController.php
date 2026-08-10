<?php

namespace App\Http\Controllers;

use App\Enum\WatchingStatus;
use App\Models\Anime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    /**
     * アニメ一覧を表示する
     */
    public function index(Request $request): Response
    {
        $keyword = $request->string('keyword')->trim()->toString();

        $animes = Anime::with('genre')
            ->when($keyword, function ($query, $keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('animes/index', [
            'animes' => $animes,
            'keyword' => $keyword,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        //
    }

    /**
     * アニメ詳細画面表示
     */
    public function show(Anime $anime): Response
    {
        $showAnime = $anime->load('genre');

        $userWatchingAnime = $anime->userWatchingAnimes()->where('user_id', auth()->id())->first();

        return Inertia::render('animes/show', [
            'anime' => $showAnime,
            'currentWatchingStatus' => $userWatchingAnime ? (string) $userWatchingAnime->status->value : null,
            'watchingStatuses' => array_map(
                fn (WatchingStatus $status) => [
                    'label' => $status->lavel(),
                    'value' => (string) $status->value,
                ],
                WatchingStatus::cases(),
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
