<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/ping', function () {
    return response()->json([
        'message' => 'API OK',
    ]);
});

//PUBLIK
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

//WITH TOKEN ACTIVE
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

//CHECK ADMIN
Route::middleware(['auth:sanctum', 'admin'])
    ->get('/admin-test', function () {
        return response()->json([
            'message' => 'Admin Access Granted'
        ]);
    });

//ADMIN
Route::middleware(['auth:sanctum', 'admin'])
    ->prefix('admin')
    ->group(function () {

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
    });