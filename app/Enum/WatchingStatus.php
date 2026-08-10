<?php

namespace App\Enum;

enum WatchingStatus: int
{
    case WantToWatch = 1;
    case Watching = 2;
    case Completed = 3;

    public function lavel(): string
    {
        return match ($this) {
            self::WantToWatch => '視聴予定',
            self::Watching => '視聴中',
            self::Completed => '視聴済み',
        };
    }
}
