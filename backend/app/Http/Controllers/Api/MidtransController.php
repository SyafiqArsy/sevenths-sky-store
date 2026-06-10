<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransController extends Controller
{
    public function notification(Request $request)
    {
        Log::info('MIDTRANS WEBHOOK RECEIVED', [
            'payload' => $request->all(),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Verify Signature
        |--------------------------------------------------------------------------
        */

        $serverKey = config('services.midtrans.server_key');

        $generatedSignature = hash(
            'sha512',
            $request->order_id .
            $request->status_code .
            $request->gross_amount .
            $serverKey
        );

        if ($generatedSignature !== $request->signature_key) {

            Log::warning('INVALID MIDTRANS SIGNATURE', [
                'order_id' => $request->order_id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid signature',
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | Find Order
        |--------------------------------------------------------------------------
        */

        $order = Order::with('items.product')
            ->where(
                'midtrans_order_id',
                $request->order_id
            )
            ->first();

        if (!$order) {

            Log::warning('ORDER NOT FOUND', [
                'order_id' => $request->order_id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        $transactionStatus =
            $request->transaction_status;

        Log::info('MIDTRANS TRANSACTION STATUS', [
            'order_id' => $request->order_id,
            'status' => $transactionStatus,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Settlement (Paid)
        |--------------------------------------------------------------------------
        */

        if (
            $transactionStatus === 'settlement'
            ||
            (
                $transactionStatus === 'capture'
                &&
                $request->fraud_status === 'accept'
            )
        ) {

            if ($order->payment_status === 'paid') {

                Log::info('ORDER ALREADY PAID', [
                    'order_id' => $order->id,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Already processed',
                ]);
            }

            $order->update([
                'payment_status' => 'paid',
                'order_status' => 'processing',

                'transaction_id'
                    => $request->transaction_id,

                'payment_type'
                    => $request->payment_type,

                'paid_at'
                    => $request->settlement_time
                        ?? now(),
            ]);

            Log::info('ORDER MARKED AS PAID', [
                'order_id' => $order->id,
            ]);

            return response()->json([
                'success' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Expired
        |--------------------------------------------------------------------------
        */

        if ($transactionStatus === 'expire') {

            if ($order->payment_status !== 'pending') {

                return response()->json([
                    'success' => true,
                ]);
            }

            foreach ($order->items as $item) {

                if ($item->product) {

                    $item->product->increment(
                        'stock',
                        $item->quantity
                    );
                }
            }

            $order->update([
                'payment_status' => 'expired',
            ]);

            Log::info('ORDER EXPIRED', [
                'order_id' => $order->id,
            ]);

            return response()->json([
                'success' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Failed / Cancelled
        |--------------------------------------------------------------------------
        */

        if (
            in_array(
                $transactionStatus,
                [
                    'cancel',
                    'deny',
                    'failure',
                ]
            )
        ) {

            if ($order->payment_status !== 'pending') {

                return response()->json([
                    'success' => true,
                ]);
            }

            foreach ($order->items as $item) {

                if ($item->product) {

                    $item->product->increment(
                        'stock',
                        $item->quantity
                    );
                }
            }

            $order->update([
                'payment_status' => 'failed',
            ]);

            Log::info('ORDER FAILED', [
                'order_id' => $order->id,
            ]);

            return response()->json([
                'success' => true,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Other Status
        |--------------------------------------------------------------------------
        */

        Log::info('MIDTRANS STATUS IGNORED', [
            'order_id' => $order->id,
            'status' => $transactionStatus,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}