<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('order_number')->unique();

            $table->string('recipient_name');
            $table->string('phone');

            $table->text('address');
            $table->string('city');
            $table->string('postal_code');

            $table->decimal('total_price', 12, 2);

            $table->enum('payment_status', [
                'pending',
                'paid',
                'failed',
                'expired'
            ])->default('pending');

            $table->enum('order_status', [
                'pending',
                'processing',
                'shipped',
                'completed',
                'cancelled'
            ])->default('pending');

            $table->string('midtrans_order_id')->nullable();
            $table->text('midtrans_token')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};