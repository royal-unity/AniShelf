<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenreRequest;
use App\Models\Genre;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class GenreController extends Controller
{
    /**
     * ジャンル一覧画面を表示
     *
     * @return Response
     */
    public function index(): Response
    {
        $genres = Genre::withCount('animes')->get();

        return Inertia::render('genres/index', ['genres' => $genres]);
    }

    /**
     * アニメ登録
     *
     * @param  GenreRequest  $request
     * @return RedirectResponse
     */
    public function store(GenreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            Genre::create($validated);

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'ジャンルを登録しました',
            ]);

            return to_route('genres.index');
        } catch (Throwable $e) {
            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'ジャンルの登録に失敗しました',
            ]);

            // 入力欄にエラーメッセージが表示されない様に別のキーを使用して、エラーレスポンスを送る
            return back()->withErrors(['form' => 'ジャンルの登録に失敗しました']);
        }
    }

    /**
     * ジャンルを更新
     *
     * @param  GenreRequest  $request
     * @param  Genre  $genre
     * @return RedirectResponse
     */
    public function update(GenreRequest $request, Genre $genre): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $genre->update($validated);

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'ジャンルを更新しました',
            ]);

            return to_route('genres.index');
        } catch (Throwable $e) {
            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'ジャンルの更新に失敗しました',
            ]);

            // 入力欄にエラーメッセージが表示されない様に別のキーを使用して、エラーレスポンスを送る
            return back()->withErrors(['form' => 'ジャンルの更新に失敗しました']);
        }
    }

    /**
     * ジャンルを削除
     *
     * @param  Genre  $genre
     * @return RedirectResponse
     */
    public function destroy(Genre $genre): RedirectResponse
    {
        // ジャンルに紐づいているアニメがある場合、削除できない
        if ($genre->animes()->count() > 0) {

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'ジャンルに紐づいているアニメがあるため、削除できません',
            ]);

            return back();
        }

        try {
            $genre->delete();

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => "「{$genre->name}」を削除しました",
            ]);

            return to_route('genres.index');
        } catch (Throwable $e) {
            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'ジャンルの削除に失敗しました',
            ]);

            return back();
        }
    }
}
