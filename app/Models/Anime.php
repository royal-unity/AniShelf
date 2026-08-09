<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

// 一括代入を許可する属性
#[Fillable([
    'genre_id',
    'name',
    'official_site_url',
    'description',
    'is_current_season',
    'anime_img_path',
])]
class Anime extends Model
{
    /**
     * このアニメに紐づくユーザーの視聴情報を取得する
     *
     * @return HasMany<UserWatchingAnime, $this>
     */
    public function userWatchingAnimes(): HasMany
    {
        return $this->hasMany(UserWatchingAnime::class);
    }

    /**
     * このアニメが属するジャンルを取得する
     *
     * @return BelongsTo<Genre, $this>
     */
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }
}
