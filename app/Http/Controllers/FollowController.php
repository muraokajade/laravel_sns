<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;
use App\Models\User;

class FollowController extends Controller
{
    public function store(Request $request)
    {

        $user = Auth::user();
        Follow::create([
            'user_id' => $user->id,
            'follow_id' => $request->input('follow_id'),
        ]);

        return redirect()->route('profile.show', $user->id);
    }

    public function destroy(User $user)
    {
        $currentUser = Auth::user();
        $currentUser->follow_users()->detach($user->id);

        return redirect()->route('profile.show', $currentUser->id);
    }
}
