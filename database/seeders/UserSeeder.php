<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'kanemichi',
                'email' => 'test@test.com',
                'image' => '',
                'cover_image' => '',
                'profile' => '初めまして',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Shin Code',
                'email' => 'test2@example.com',
                'image' => '',
                'cover_image' => '',
                'profile' => '初めまして',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Code Mafia',
                'email' => 'test3@example.com',
                'image' => '',
                'cover_image' => '',
                'profile' => '初めまして',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'KeNN',
                'email' => 'test4@example.com',
                'image' => '',
                'cover_image' => '',
                'profile' => '初めまして',
                'password' => Hash::make('password'),
            ],
            [
                'name' => '兼通',
                'email' => 'test5@example.com',
                'image' => '',
                'cover_image' => '',
                'profile' => '初めまして',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
