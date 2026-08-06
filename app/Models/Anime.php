<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Anime extends Model
{
    use HasFactory;

    /**
     * 代入可能な属性
     *
     * @var array
     */
    protected $fillable = [
        'genre_id',
        'name',
        'official_site_url',
        'description',
        'is_current_season',
    ];

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
