<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [

            'Tracktop' => [
                'Classic Tracktop Black',
                'Classic Tracktop Navy',
                'Retro Tracktop White',
                'Sport Tracktop Grey',
                'Premium Tracktop Green',
            ],

            'Hoodie' => [
                'Essential Hoodie Black',
                'Essential Hoodie Grey',
                'Oversized Hoodie Cream',
                'Zip Hoodie Navy',
                'Premium Hoodie Brown',
            ],

            'Shirt' => [
                'Oxford Shirt White',
                'Oxford Shirt Blue',
                'Flannel Shirt Red',
                'Linen Shirt Beige',
                'Casual Shirt Black',
            ],

            'Jeans' => [
                'Slim Fit Jeans Blue',
                'Regular Fit Jeans Black',
                'Straight Jeans Indigo',
                'Relaxed Jeans Grey',
                'Vintage Jeans Light Blue',
            ],

            'Shoes' => [
                'White Sneakers',
                'Running Shoes Black',
                'Canvas Shoes Cream',
                'Sport Shoes Grey',
                'High Top Sneakers',
            ],
        ];

        foreach ($products as $categoryName => $items) {

            $category = Category::where(
                'name',
                $categoryName
            )->first();

            foreach ($items as $index => $name) {

                Product::create([

                    'category_id' => $category->id,

                    'name' => $name,

                    'slug' => Str::slug($name),

                    'description' =>
                        $name .
                        ' from Seventh Sky Store. Comfortable, stylish, and suitable for everyday wear.',

                    'sku' =>
                        'SKU-' .
                        strtoupper(
                            Str::random(8)
                        ),

                    'price' =>
                        rand(150000, 750000),

                    'stock' =>
                        rand(10, 100),

                    'image' =>
                        'https://placehold.co/600x600?text=' .
                        urlencode($name),

                    'image_public_id' => null,

                    'is_active' => true,
                ]);
            }
        }
    }
}