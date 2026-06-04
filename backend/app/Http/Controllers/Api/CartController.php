<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\UpdateCartItemRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = Cart::with('items.product')
            ->firstOrCreate([
                'user_id' => $request->user()->id
            ]);

        return response()->json([
            'success' => true,
            'data' => $cart
        ]);
    }

    public function store(AddToCartRequest $request)
    {
        $product = Product::findOrFail($request->product_id);

        if (!$product->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Product is inactive'
            ], 400);
        }

        if ($product->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock'
            ], 400);
        }

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($item) {

            $newQty = $item->quantity + $request->quantity;

            if ($newQty > $product->stock) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stock exceeded'
                ], 400);
            }

            $item->update([
                'quantity' => $newQty
            ]);

        } else {

            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity
            ]);

        }

        return response()->json([
            'success' => true,
            'message' => 'Product added to cart',
            'data' => $item
        ]);
    }

    public function update(UpdateCartItemRequest $request,CartItem $cartItem)
    {
        if (
            $cartItem->cart->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden'
            ], 403);
        }

        $product = $cartItem->product;

        if ($request->quantity > $product->stock) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock'
            ], 400);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated',
            'data' => $cartItem
        ]);
    }

    public function destroy(
        Request $request,
        CartItem $cartItem
    )
    {
        if (
            $cartItem->cart->user_id !==
            $request->user()->id
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden'
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }
}