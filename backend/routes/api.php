<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ROTAS DE MANIPULAÇÃO DE POSTS
Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'index');
    Route::post('/posts/create', 'create');
    Route::post('/posts/edit/', 'edit');
    Route::post('/posts/update/', 'update');
    Route::post('/posts/delete/', 'destroy');
});