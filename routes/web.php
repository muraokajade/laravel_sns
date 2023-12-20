<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/users', [UserController::class, 'index']);
Route::inertia('/posts', 'Posts/Index')->name('posts.index');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('/comments', [CommentController::class, 'destroy'])->name('comments.destroy');
Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');

//プロフィール編集用
Route::get('/profile/show/{id}', [PostController::class, 'showProfile'])->name('profile.show');

Route::post('/profile/updateProfile', [PostController::class, 'updateProfile'])->name('profile.updateProfile');
Route::post('/posts/{post}/toggle_like', [PostController::class, 'toggleLike'])->name('posts.toggle_like');

Route::post('/follows/store', [FollowController::class, 'store'])->name('follows.store');
Route::delete('/follows/destroy/{user}', [FollowController::class, 'destroy'])->name('follows.destroy');

require __DIR__ . '/auth.php';
