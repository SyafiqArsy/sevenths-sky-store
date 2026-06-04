<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('cloudinary.cloud_name'),
                'api_key' => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => true,
            ],
        ]);
    }

    public function upload(string $filePath): array
    {
        $result = $this->cloudinary
            ->uploadApi()
            ->upload($filePath, [
                'folder' => 'seventh-sky-store/products',
            ]);

        return [
            'public_id' => $result['public_id'],
            'url' => $result['secure_url'],
        ];
    }

    public function destroy(string $publicId): void
    {
        $this->cloudinary
            ->uploadApi()
            ->destroy($publicId);
    }
}