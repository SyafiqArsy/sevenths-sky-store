<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden',
            ], 403);
        }

        $order->load('items');

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    public function adminIndex()
    {
        $orders = Order::with('user', 'items')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'order_status' => [
                'required',
                'in:pending,processing,shipped,completed,cancelled'
            ]
        ]);

        $order->update([
            'order_status' => $request->order_status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated',
            'data' => $order,
        ]);
    }
}