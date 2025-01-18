<?php

namespace Tests\Feature;

use App\Models\Pessoa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PessoaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_pessoas()
    {
        // Cria 3 registros de exemplo no banco
        Pessoa::factory()->count(3)->create();

        // Faz uma requisição GET para o endpoint
        $response = $this->getJson(route('pessoas.index'));

        // Verifica se a resposta tem status 200
        $response->assertStatus(200);

        // Verifica se a estrutura retornada está correta
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'nome', 'apelido', /* outros campos de Pessoa */],
            ],
        ]);
    }

    /** @test */
    public function it_can_create_a_pessoa()
    {
        // Dados para criar uma pessoa
        $data = [
            'nome' => 'João Silva',
            'apelido' => 'João',
        ];

        // Faz uma requisição POST para o endpoint
        $response = $this->postJson(route('pessoas.store'), $data);

        // Verifica se a resposta tem status 201
        $response->assertStatus(201);

        // Verifica se o registro foi criado no banco
        $this->assertDatabaseHas('pessoas', $data);
    }

    /** @test */
    public function it_can_show_a_pessoa()
    {
        // Cria uma pessoa
        $pessoa = Pessoa::factory()->create();

        // Faz uma requisição GET para mostrar essa pessoa
        $response = $this->getJson(route('pessoas.show', $pessoa->id));

        // Verifica se a resposta tem status 200
        $response->assertStatus(200);

        // Verifica se a pessoa retornada é a esperada
        $response->assertJson([
            'data' => [
                'id' => $pessoa->id,
                'nome' => $pessoa->nome,
                'apelido' => $pessoa->apelido,
            ],
        ]);
    }

    /** @test */
    public function it_can_count_pessoas()
    {
        // Cria 5 registros de exemplo
        Pessoa::factory()->count(5)->create();

        // Faz uma requisição GET para o contador
        $response = $this->getJson(route('pessoas.count'));

        // Verifica se a resposta tem status 200 e o valor esperado
        $response->assertStatus(200);
        $response->assertJson([
            'data' => 5,
        ]);
    }
}
