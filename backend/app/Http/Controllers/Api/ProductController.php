<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\CloudinaryService;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;

class ProductController extends Controller
{
    public function __construct(
        private CloudinaryService $cloudinaryService
    ) {}

    public function index(Request $request)
    {
        $search = $request->search
            ? addcslashes($request->search, '%_')
            : null;

        $products = Product::with('category')
            ->when(
                $search,
                fn($query) =>
                $query->where(
                    'name',
                    'like',
                    '%' . $search . '%'
                )
            )
            ->when(
                $request->category,
                fn($query) =>
                $query->whereHas(
                    'category',
                    fn($q) =>
                    $q->where(
                        'slug',
                        $request->category
                    )
                )
            )
            ->where('is_active', true)
            ->latest()
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function adminIndex(Request $request)
    {
        $search = $request->search
            ? addcslashes($request->search, '%_')
            : null;

        $products = Product::with('category')

            ->when(
                $search,
                fn ($query) =>
                $query->where(
                    'name',
                    'like',
                    '%' . $search . '%'
                )
            )

            ->latest()
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    public function adminShow(Product $product)
    {
        $product->load('category');

        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    public function store(ProductStoreRequest $request)
    {
        $upload = $this->cloudinaryService
            ->upload(
                $request->file('image')->getRealPath()
            );

        $product = Product::create([
            'category_id' => $request->category_id,

            'sku' => 'SKU-' . strtoupper(
                Str::random(8)
            ),

            'name' => $request->name,

            'slug' => Str::slug(
                $request->name
            ),

            'description' => $request->description,

            'price' => $request->price,

            'stock' => $request->stock,

            'image' => $upload['url'],

            'image_public_id' => $upload['public_id'],

            'is_active' => $request->boolean(
                'is_active',
                true
            ),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product created',
            'data' => $product,
        ], 201);
    }

    public function update(
        ProductUpdateRequest $request,
        Product $product
    ) {
        $data = $request->validated();

        if ($request->hasFile('image')) {

            if ($product->image_public_id) {
                $this->cloudinaryService
                    ->destroy(
                        $product->image_public_id
                    );
            }

            $upload = $this->cloudinaryService
                ->upload(
                    $request->file('image')->getRealPath()
                );

            $data['image'] = $upload['url'];

            $data['image_public_id']
                = $upload['public_id'];
        }

        if (isset($data['name'])) {

            $data['slug']
                = Str::slug(
                    $data['name']
                );
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Product updated',
            'data' => $product->fresh(),
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->image_public_id) {

            $this->cloudinaryService
                ->destroy(
                    $product->image_public_id
                );
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted',
        ]);
    }
}