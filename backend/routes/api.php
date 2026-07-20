<?php

use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\MidtransController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

Route::post(
    '/midtrans/notification',
    [MidtransController::class, 'notification']
);

/*
|--------------------------------------------------------------------------
| Public Routes — Rate Limited
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('throttle:5,1');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:10,1');

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
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);

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

    // Checkout — Rate Limited
    Route::post(
        '/checkout',
        [CheckoutController::class, 'store']
    )->middleware('throttle:10,1');

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

    // Dashboard
    Route::get(
        '/dashboard',
        [AdminDashboardController::class, 'index']
    );

    // Upload
    Route::post(
        '/upload-test',
        [UploadController::class, 'test']
    );

    // Categories
    Route::get(
        '/categories',
        [CategoryController::class, 'adminIndex']
    );

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
    Route::get(
        '/products',
        [ProductController::class, 'adminIndex']
    );

    Route::get(
        '/products/{product}',
        [ProductController::class, 'adminShow']
    );

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

    Route::get(
        '/orders/{order}',
        [OrderController::class, 'adminShow']
    );

    Route::put(
        '/orders/{order}/status',
        [OrderController::class, 'updateStatus']
    );
});