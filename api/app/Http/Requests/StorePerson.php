<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response as ResponseStatusCode;

class StorePerson extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nickname' => 'required|string|max:32|unique:people',
            'name' => 'required|string|max:100',
            'birth' => 'required|string|date|date_format:Y-m-d',
        ];
    }

    /**
     * @throws HttpResponseException
     */
    public function failedValidation(Validator $validator): void
    {
        if(is_numeric($this->input('name'))) {
            throw new HttpResponseException(
                response()->json([
                    'error' => true,
                    'message' => $validator->errors()
                ], ResponseStatusCode::HTTP_BAD_REQUEST)
            );
        }
    }
}
