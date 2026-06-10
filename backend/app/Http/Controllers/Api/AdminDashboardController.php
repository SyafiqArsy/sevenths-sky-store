<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,

            'data' => [

                'total_products'
                    => Product::count(),

                'total_categories'
                    => Category::count(),

                'total_orders'
                    => Order::count(),

                'total_revenue'
                => Order::where(
                    'payment_status',
                    'paid'
                )->sum('grand_total')
            ]
        ]);
    }
}