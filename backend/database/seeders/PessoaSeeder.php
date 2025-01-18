<?php

namespace Database\Seeders;

use App\Models\Pessoa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class PessoaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pessoa::factory(10);
        Pessoa::factory()->create([
            'id' => (string) Str::orderedUuid(),
            'nome' => 'João',
            'apelido' => 'Joãozinho',
            'nascimento' => '1990-02-03',
        ]);
    }
}
