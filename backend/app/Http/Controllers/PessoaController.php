<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pessoa\StoreRequest;
use App\Http\Requests\Pessoa\UpdateRequest;
use App\Http\Resources\PessoaResource;
use App\Models\Pessoa;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class PessoaController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pessoa::query();

        if ($request->filled('t')) {
            $query->where(function($query) use ($request){
                $query->orWhere('apelido', 'like', '%' . $request->input('t') . '%')
                ->orWhere('nome', 'like', '%' . $request->input('t') . '%');
            });
        }

        $pessoas = $query->limit(50)->get();

        // Retorna a coleção de recursos
        return PessoaResource::collection($pessoas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {

        $pessoa = Pessoa::create($request->validated());

        if (!$pessoa) {
            return $this->error('Erro ao criar Pessoa', 400);
        }

        return $this->success('Pessoa criada com sucesso', 201, new PessoaResource($pessoa));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pessoa = Pessoa::find($id);

        if (!$pessoa) {
            return response()->json(['message' => 'Pessoa não encontrado'], 404);
        }

        return new PessoaResource($pessoa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $pessoa = Pessoa::find($id);

        if (!$pessoa) {
            return $this->error('Pessoa não encontrado', 404);
        }

        $pessoaAtualizado = $pessoa->update($request->validated());

        if (!$pessoaAtualizado) {
            return $this->error('Erro ao atualizar Pessoa', 400);
        }

        return $this->success('Pessoa atualizado com sucesso', 200, new PessoaResource($pessoa));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pessoa = Pessoa::find($id);

        if (!$pessoa) {
            return $this->error('Pessoa não encontrado', 404);
        }

        $pessoa->delete();

        return $this->success('Pessoa deletado com sucesso', 200);
    }

    public function count()
    {
        return Pessoa::count();
    }

}
