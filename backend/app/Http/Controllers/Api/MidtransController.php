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

        if (
            $generatedSignature !==
            $request->signature_key
        ) {

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

        $order = Order::where(
            'midtrans_order_id',
            $request->order_id
        )->first();

        if (!$order) {

            Log::warning('ORDER NOT FOUND', [
                'order_id' => $request->order_id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Status
        |--------------------------------------------------------------------------
        */

        switch ($request->transaction_status) {

            case 'settlement':

                $order->update([
                    'payment_status' => 'paid',
                    'order_status' => 'processing',
                ]);

                break;

            case 'expire':

                $order->update([
                    'payment_status' => 'expired',
                ]);

                break;

            case 'cancel':
            case 'deny':
            case 'failure':

                $order->update([
                    'payment_status' => 'failed',
                ]);

                break;
        }

        return response()->json([
            'success' => true,
        ]);
    }
}