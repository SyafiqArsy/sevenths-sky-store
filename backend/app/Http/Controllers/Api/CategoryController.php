<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Category::latest()->get(),
        ]);
    }

    public function adminIndex(Request $request)
    {
        $categories = Category::query()

            ->when(
                $request->search,
                fn ($query) =>
                $query->where(
                    'name',
                    'like',
                    '%' .
                    $request->search .
                    '%'
                )
            )

            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryService
            ->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category created',
            'data' => $category,
        ], 201);
    }

    public function update(
        UpdateCategoryRequest $request,
        Category $category
    ) {
        $category = $this->categoryService
            ->update($category, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category updated',
            'data' => $category,
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted',
        ]);
    }
}