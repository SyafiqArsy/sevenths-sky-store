<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'category_id' => [
                'sometimes',
                'exists:categories,id'
            ],

            'name' => [
                'sometimes',
                'string',
                'max:255'
            ],

            'description' => [
                'nullable',
                'string',
                'max:5000'
            ],

            'price' => [
                'sometimes',
                'numeric',
                'min:0'
            ],

            'stock' => [
                'sometimes',
                'integer',
                'min:0'
            ],

            'image' => [
                'nullable',
                'image',
                'max:5120'
            ],

            'is_active' => [
                'nullable',
                'boolean'
            ]
        ];
    }
}