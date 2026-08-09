<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

// 一括代入を許可する属性
#[Fillable(['name'])]
class Genre extends Model
{
    /**
     * このジャンルに紐づいているアニメを取得する
     *
     * @return HasMany<Anime, $this>
     */
    public function animes(): HasMany
    {
        return $this->hasMany(Anime::class);
    }

    /**
     * このジャンルをお気に入り登録しているユーザーを取得する
     *
     * @return BelongsToMany<User, $this>
     */
    public function favoriteUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_favorite_genres')->withTimestamps();
    }
}
