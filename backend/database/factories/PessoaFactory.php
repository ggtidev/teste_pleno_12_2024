<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pessoa>
 */
class PessoaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => (string) Str::orderedUuid(), // Garante um UUID único e ordenado
            'nome' => $this->faker->name(),
            'apelido' => $this->faker->lastName(),
            'nascimento' => $this->faker->date('Y-m-d'),
        ];
    }
}
