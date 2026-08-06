<?php

namespace App\Enum;

enum WatchingStatus: int
{
    case WantToWatch = 1;
    case Watching = 2;
    case Completed = 3;
}
