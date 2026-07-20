<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'recipient_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\.\-\']+$/'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^[\d\+\-\s\(\)]+$/'],
            'address' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:20', 'regex:/^[\d\-]+$/'],
        ];
    }
}