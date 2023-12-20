<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::all();

        return Inertia::render('Users/Index',[
            'users' => $users,
        ]);
    }

    
}
