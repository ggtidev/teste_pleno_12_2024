<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PessoaController;

Route::get('/users', function (Request $request) {
    return response()->json([
        'status' => true,
        'message' => 'Listar Usuários',
    ], 200);
});


Route::prefix('pessoas')->group(function () {
    Route::post('/', [PessoaController::class, 'store']);
    Route::get('/', [PessoaController::class, 'search']);
    Route::get('/', [PessoaController::class, 'list']);
    Route::get('/{id}', [PessoaController::class, 'show']);
});

Route::get('/contagem-pessoas', [PessoaController::class, 'count']);
