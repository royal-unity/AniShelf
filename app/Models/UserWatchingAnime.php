<?php

namespace App\Models;

use App\Enum\WatchingStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 一括代入を許可する属性
#[Fillable(['user_id', 'anime_id', 'status'])]
class UserWatchingAnime extends Model
{
    /**
     * キャストする属性
     *
     * @return array{status: string}
     */
    protected function casts()
    {
        return [
            'status' => WatchingStatus::class,
        ];
    }

    /**
     * このユーザーの視聴情報が属するユーザーを取得する
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * このユーザーの視聴情報が属するアニメを取得する
     *
     * @return BelongsTo<Anime, $this>
     */
    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }
}
