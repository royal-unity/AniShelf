<?php

use App\Http\Controllers\AnimeController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

Route::get('/', [AnimeController::class, 'index'])->name('home');
Route::get('/animes', [AnimeController::class, 'index']);
