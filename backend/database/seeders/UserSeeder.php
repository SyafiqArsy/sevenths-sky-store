<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@seventhsky.com',
            ],
            [
                'name' => 'Admin',
                'password' => 'password',
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'customer@seventhsky.com',
            ],
            [
                'name' => 'Customer',
                'password' => 'password',
                'role' => 'customer',
            ]
        );
    }
}