<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@seventhsky.com'
            ],
            [
                'name' => 'Administrator',
                'password' => 'Admin123!',
                'role' => 'admin',
            ]
        );
    }
}