<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nickname' => fake()->name,
            'name'     => fake()->name,
            'birth'    => fake()->date,
        ];
    }
}
