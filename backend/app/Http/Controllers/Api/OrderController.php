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
            ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $orders->items(),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
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

    public function adminShow(Order $order)
    {
        $order->load('user', 'items');

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    public function adminIndex(Request $request)
    {
        $search = $request->search
            ? addcslashes($request->search, '%_')
            : null;

        $orders = Order::with([
            'user',
            'items'
        ])

        ->when(
            $search,
            fn ($query) =>
            $query->where(
                'order_number',
                'like',
                '%' .
                $search .
                '%'
            )
        )

        ->latest()
        ->paginate($request->input('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $orders->items(),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
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

        $currentStatus =
            $order->order_status;

        $newStatus =
            $request->order_status;

        /*
        |--------------------------------------------------------------------------
        | Valid Status Flow
        |--------------------------------------------------------------------------
        */

        $allowedTransitions = [

            'pending' => [
                'processing',
                'cancelled',
            ],

            'processing' => [
                'shipped',
            ],

            'shipped' => [
                'completed',
            ],

            'completed' => [],

            'cancelled' => [],
        ];

        /*
        |--------------------------------------------------------------------------
        | Prevent Invalid Transition
        |--------------------------------------------------------------------------
        */

        if (
            !in_array(
                $newStatus,
                $allowedTransitions[
                    $currentStatus
                ]
            )
        ) {

            return response()->json([
                'success' => false,
                'message' =>
                    'Invalid status transition',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent Processing Unpaid Orders
        |--------------------------------------------------------------------------
        */

        if (
            $order->payment_status !== 'paid'
            &&
            in_array(
                $newStatus,
                [
                    'processing',
                    'shipped',
                    'completed',
                ]
            )
        ) {

            return response()->json([
                'success' => false,
                'message' =>
                    'Order has not been paid',
            ], 422);
        }

        $order->update([
            'order_status' => $newStatus,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated',
            'data' => $order,
        ]);
    }
}