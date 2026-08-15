<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MypageController;
use App\Http\Controllers\WatchingStatusController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';

Route::middleware(['auth'])->group(function () {
    Route::put('/animes/{anime}/watchingStatus', [WatchingStatusController::class, 'update'])->name('watchingStatus.put');
    Route::get('/mypage', [MypageController::class, 'index'])->name('mypage.index');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('animes', AnimeController::class)->except(['index', 'show']);
    Route::resource('genres', GenreController::class);
});

Route::get('/', [AnimeController::class, 'index'])->name('home');
Route::resource('animes', AnimeController::class)->only(['index', 'show']);
