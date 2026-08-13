<?php

namespace App\Http\Controllers;

use App\Enum\WatchingStatus;
use App\Http\Requests\AnimeRequest;
use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Storage;
use Throwable;

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
     * アニメ登録画面を表示する
     */
    public function create(): Response
    {
        $genres = Genre::all();

        return Inertia::render('animes/create', ['genres' => $genres]);
    }

    /**
     * アニメを登録する
     */
    public function store(AnimeRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = null;

        try {

            // 画像があれば、画像をstorageに保存する
            if ($request->hasFile('anime_img_path')) {
                $imagePath = $request->file('anime_img_path')->store('animes', 'public');
            }

            $anime = Anime::create([
                'genre_id' => $validated['genre_id'],
                'name' => $validated['name'],
                'official_site_url' => $validated['official_site_url'] ?? null,
                'description' => $validated['description'] ?? null,
                'is_current_season' => $validated['is_current_season'],
                'anime_img_path' => $imagePath,
            ]);

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'アニメを登録しました',
            ]);

            return to_route('animes.show', $anime);
        } catch (Throwable $e) {
            // DB保存に失敗し、画像のみ保存された場合、保存された画像を削除する
            if ($imagePath != null) {
                Storage::disk('public')->delete($imagePath);
            }

            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'アニメの登録に失敗しました',
            ]);

            return back()->withInput();
        }
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
