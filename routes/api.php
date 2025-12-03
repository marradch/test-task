<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will/home/marina/test project/test-finok/app/Http/Controllers/API/BaseController.php
/home/marina/test project/test-finok/app/Http/Controllers/API/LoginController.php
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch('/tasks/set-completion/{task}', [TaskController::class, 'setCompleted']);
    Route::get('/tasks/cursor', [TaskController::class, 'cursor']);
    Route::apiResource('tasks', TaskController::class);
});
