<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'recipient_name',
        'phone',
        'address',
        'city',
        'postal_code',
        'total_price',
        'payment_status',
        'order_status',
        'midtrans_order_id',
        'midtrans_token',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}