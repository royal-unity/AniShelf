<?php

namespace App\Models;

use App\Enum\WatchingStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserWatchingAnime extends Model
{
    use HasFactory;

    /**
     * 代入可能な属性
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'anime_id',
        'status',
    ];

    /**
     * キャストする属性
     *
     * @var array
     */
    protected function casts(): array
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
