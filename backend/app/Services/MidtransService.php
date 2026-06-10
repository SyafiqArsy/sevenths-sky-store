<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public static function init()
    {
        Config::$serverKey = config('midtrans.server_key');

        Config::$clientKey = config('midtrans.client_key');

        Config::$isProduction =
            config('midtrans.is_production');

        Config::$isSanitized =
            config('midtrans.is_sanitized');

        Config::$is3ds =
            config('midtrans.is_3ds');
    }

    public static function createSnapToken(array $params)
    {
        self::init();

        return Snap::getSnapToken($params);
    }
}