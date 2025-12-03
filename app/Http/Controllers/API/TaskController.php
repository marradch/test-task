<?php
namespace App\Http\Controllers\API;

use App\Http\Resources\PostCollection;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\TaskResource;
use App\Http\Services\TaskService;

class TaskController extends BaseController
{
    private TaskService $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $query = $this->service->getTaskQuery($request->input('q'));

        $tasks = $query->paginate(2);

        return TaskResource::collection($tasks)->response();
    }

    public function cursor(Request $request): JsonResponse
    {
        $query = $this->service->getTaskQuery($request->input('q'));

        $tasks = $query->cursorPaginate(2);

        return TaskResource::collection($tasks)->response();
    }

    public function show(Task $task): JsonResponse
    {
        return (new TaskResource($task))->response();
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'bail|required|string|max:255',
            'description' => 'bail|required|string',
        ]);

        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return (new TaskResource($task))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(Request $request, Task $task): JsonResponse
    {
        $request->validate([
            'title' => 'bail|required|string|max:255',
            'description' => 'bail|required|string',
        ]);

        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->save();

        return (new TaskResource($task))->response();
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return $this->sendResponse([], 'Task deleted');
    }

    public function setCompleted(Request $request, Task $task): JsonResponse
    {
        $request->validate([
            'completed' => 'required|int',
        ]);

        $task->completed = $request->completed;
        $task->save();

        return $this->sendResponse([], 'Task updated');
    }
}
