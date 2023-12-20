<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function store(CommentRequest $request) {
        Comment::create([
            'post_id' => $request->post_id,
            'user_id' => Auth::user()->id,
            'body' => $request->body
        ]);
    }
    public function index() {
        $comments = Comment::with('user')->get();
        dd($comments);
        return Inertia::render('Comment/Index',['comments' => $comments]);
    }
}
