<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function store(CheckoutRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $cart = Cart::with('items.product')
                ->where('user_id', $request->user()->id)
                ->first();

            if (!$cart || $cart->items->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cart is empty'
                ], 400);
            }

            $totalPrice = 0;

            foreach ($cart->items as $item) {

                if (!$item->product->is_active) {
                    return response()->json([
                        'success' => false,
                        'message' => $item->product->name . ' is inactive'
                    ], 400);
                }

                if ($item->quantity > $item->product->stock) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock for ' . $item->product->name
                    ], 400);
                }

                $totalPrice += $item->product->price * $item->quantity;
            }

            $shippingCost = 0;

            $grandTotal = $totalPrice + $shippingCost;

            $order = Order::create([
                'user_id' => $request->user()->id,

                'order_number' =>
                    'ORD-' .
                    now()->format('Ymd') .
                    '-' .
                    strtoupper(Str::random(6)),

                'recipient_name' => $request->recipient_name,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'postal_code' => $request->postal_code,

                'total_price' => $totalPrice,
                'shipping_cost' => $shippingCost,
                'grand_total' => $grandTotal,

                'payment_status' => 'pending',
                'order_status' => 'pending',
            ]);

            foreach ($cart->items as $item) {

                OrderItem::create([
                    'order_id' => $order->id,

                    'product_id' => $item->product->id,

                    'product_name' => $item->product->name,

                    'product_price' => $item->product->price,

                    'quantity' => $item->quantity,

                    'subtotal' =>
                        $item->product->price *
                        $item->quantity,
                ]);

                $item->product->decrement(
                    'stock',
                    $item->quantity
                );
            }

            $cart->items()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Checkout success',
                'data' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'grand_total' => $order->grand_total,
                    'payment_status' => $order->payment_status,
                ]
            ]);
        });
    }
}