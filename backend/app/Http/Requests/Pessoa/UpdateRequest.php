<?php

namespace App\Http\Requests\Pessoa;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'apelido' => 'required|string|max:32',
            'nome' => 'required|string|max:100',
            'nascimento' => 'required|date_format:Y-m-d',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.string' => 'O nome deve ser uma string',
            'nome.max' => 'O nome deve ter no máximo 100 caracteres',
            'apelido.required' => 'O apelido é obrigatório',
            'apelido.string' => 'O apelido deve ser uma string',
            'apelido.max' => 'O apelido deve ter no máximo 32 caracteres',
            'nascimento.required' => 'A data de nascimento é obrigatória',
            'nascimento.date_format' => 'A data de nascimento deve ser no formato YYYY-MM-DD',
        ];
    }
}
