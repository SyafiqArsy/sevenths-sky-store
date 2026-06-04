<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\CloudinaryService;
use App\Http\Controllers\Controller;

class UploadController extends Controller
{
    public function __construct(
        private CloudinaryService $cloudinaryService
    ) {}

    public function test(Request $request)
    {
        $request->validate([
            'image' => [
                'required',
                'image',
                'max:5120',
            ],
        ]);

        $upload = $this->cloudinaryService
            ->upload(
                $request->file('image')->getRealPath()
            );

        return response()->json([
            'success' => true,
            'data' => $upload,
        ]);
    }
}