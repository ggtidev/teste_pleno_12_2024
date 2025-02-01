<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pessoa;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class PessoaController
{
    public function store(Request $request){
        $validated = $request->validate([
            'apelido' => 'required|string|max:32|unique:pessoas,apelido',
            'nome' => 'required|string|max:100|regex:/^[\pL\s]+$/u',
            'nascimento' => 'required|date_format:Y-m-d',
        ],[
            'apelido.unique' => 'Este apelido já foi utilizado.',
            'apelido.required' => 'O campo apelido é obrigatório.',
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.regex' => 'O nome deve conter apenas letras e espaços.',
            'nascimento.required' => 'A data de nascimento é obrigatória.',
            'nascimento.date_format' => 'A data de nascimento deve estar no formato YYYY-MM-DD.',
        ]);

        //Verificação para garantir que os campos não sejam nulos.
        if (empty($validated['apelido']) || empty($validated['nome'])) {
            return response()->json(['error' => 'Os Campos apelido e nome são obrigatórios'], 422);
        }

        // Gerar ID único para a pessoa.
        $validated['id'] = Str::uuid();
        $pessoa = Pessoa::create($validated);

        // Retornar resposta com o objeto criado e o cabeçalho Location.
        return response()->json($pessoa, 201)->header('Location', url("/pessoas/{$pessoa->id}"));
    }

    public function show($id)
    {
        $pessoa = pessoa::findOrFail($id);
        return response()->json($pessoa, 200);
    }

    public function search(request $request)
    {
        $termo = $request->query('t');

        // Verificar se o termo de busca foi fornecido.
        if (empty($termo)) {
            return response()->json(['error' => 'Termo de busca não fornecido.'], 400);
        }

        // Realizar busca por nome e apelido com o termo fornecido.
        $pessoas = Pessoa::where('nome', 'like', "%$termo%")
            ->orWhere('apelido', 'like', "%$termo%")
            ->get();

        return response()->json($pessoas);
    }

    public function list()
    {
        // Recuperar todas as pessoas do banco de dados.
        $pessoas = Pessoa::all();
        return response()->json($pessoas);
    }

    public function count()
    {
        // Cria um contador de Pessoas Cadastradas.
        $contagem = Pessoa::count();
        return response()->json(['contagem-pessoas' => $contagem]);
    }
}
