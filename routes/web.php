<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\WatchingStatusController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';

Route::get('/', [AnimeController::class, 'index'])->name('home');
Route::resource('animes', AnimeController::class);

Route::middleware(['auth'])->group(function () {
    Route::put('/animes/{anime}/watchingStatus', [WatchingStatusController::class, 'update'])->name('watchingStatus.put');
});
