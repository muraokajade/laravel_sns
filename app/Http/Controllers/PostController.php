<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Post;
use App\Models\User;
use App\Models\Like;
use App\Models\Comment;
use App\Http\Requests\PostRequest;
use App\Http\Requests\ProfileRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->withCount('likes')->latest()->get();
        // dd($posts);
        $comments = Comment::with('user')->get();
        $postImages = $posts->pluck('image');
        $user = Auth::user();
        return Inertia::render('Posts/Index', ['posts' => $posts, 'comments' => $comments, 'postImages' => $postImages, 'user' => $user]);
    }

    public function store(PostRequest $request)
    {
        // dd($request);
        $user = Auth::user();
        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('images', 'public');
        } else {
            $imagePath = null;
        }


        Post::create([
            'user_id' => $user->id,
            'comment' => $request->input('comment'),
            'image' => $imagePath
        ]);

        return Inertia::render('Posts/Index', [
            'message' => '投稿が成功しました',
        ]);
    }

    public function destroy($id)
    {

        $post = Post::findOrFail($id);
        $post->delete();
        // return Inertia::render('Posts/Index', [
        //     'message' => '投稿が削除されました',
        // ]);
        return redirect('/posts');
    }

    public function showProfile($id)
    {

        $user = User::findOrFail($id);
        $recommended_users = User::recommend($user->id)->get();

        $followersCount = $user->followers()->count();

        //フォローしているsユーザー数
        $followingCount = $user->follow_users()->count();

        $isFollowing = [];

        foreach ($recommended_users as $recommended_user) {
            $isFollowing[$recommended_user->id] = $user->isFollowing($recommended_user);
        }

        $userPosts = $user->posts()->with('user')->get();
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'userPosts' => $userPosts,
            'recommended_users' => $recommended_users,
            'isFollowing' => $isFollowing,
            'followersCount' => $followersCount,
            'followingCount' => $followingCount,
        ]);
    }

    public function updateProfile(ProfileRequest $request)
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);

        if ($request->hasFile('image')) {
            $profileImagePath = $request->file('image')->store('images', 'public');
        } else {
            $profileImagePath = null;
        }

        if ($request->hasFile('cover_image')) {
            $coverImagePath = $request->file('cover_image')->store('images', 'public');
        } else {
            $coverImagePath = null;
        }

        $user->update([
            "name" => $request->input('name'),
            "profile" => $request->input('profile'),
            "image" => $profileImagePath,
            "cover_image" => $coverImagePath,
        ]);

        return redirect()->route('profile.show', $id);
    }

    public function toggleLike($id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);

        if ($post->isLikedBy($user)) {
            // いいねの取り消し
            $post->likes->where('user_id', $user->id)->first()->delete();
        } else {
            // いいねを設定
            Like::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);
        }
        return redirect('/posts');
    }
}
