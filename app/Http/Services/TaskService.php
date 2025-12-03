<?php

namespace App\Http\Services;

use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;

class TaskService
{
    public function getTaskQuery(?string $q): Builder
    {
        $query = Task::query();

        if (!empty($q)) {
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
            });
        }

        return $query->orderBy('id', 'desc');
    }
}
