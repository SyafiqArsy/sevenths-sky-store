<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Tracktop',
            'Hoodie',
            'Shirt',
            'Jeans',
            'Shoes',
        ];

        foreach ($categories as $name) {

            Category::updateOrCreate(
                [
                    'slug' => Str::slug($name),
                ],
                [
                    'name' => $name,
                ]
            );
        }
    }
}