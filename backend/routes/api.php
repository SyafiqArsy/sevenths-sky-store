<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

Route::get('/ping', function () {
    return response()->json([
        'message' => 'API OK',
    ]);
});

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);

    Route::post(
        '/cart/items',
        [CartController::class, 'store']
    );

    Route::put(
        '/cart/items/{cartItem}',
        [CartController::class, 'update']
    );

    Route::delete(
        '/cart/items/{cartItem}',
        [CartController::class, 'destroy']
    );

    // Checkout
    Route::post(
        '/checkout',
        [CheckoutController::class, 'store']
    );

    // Orders
    Route::get(
        '/orders',
        [OrderController::class, 'index']
    );

    Route::get(
        '/orders/{order}',
        [OrderController::class, 'show']
    );
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'admin'
])->prefix('admin')->group(function () {

    // Upload
    Route::post(
        '/upload-test',
        [UploadController::class, 'test']
    );

    // Categories
    Route::post(
        '/categories',
        [CategoryController::class, 'store']
    );

    Route::put(
        '/categories/{category}',
        [CategoryController::class, 'update']
    );

    Route::delete(
        '/categories/{category}',
        [CategoryController::class, 'destroy']
    );

    // Products
    Route::post(
        '/products',
        [ProductController::class, 'store']
    );

    Route::put(
        '/products/{product}',
        [ProductController::class, 'update']
    );

    Route::delete(
        '/products/{product}',
        [ProductController::class, 'destroy']
    );

    // Orders
    Route::get(
        '/orders',
        [OrderController::class, 'adminIndex']
    );

    Route::put(
        '/orders/{order}/status',
        [OrderController::class, 'updateStatus']
    );
});