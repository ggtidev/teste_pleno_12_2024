<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pessoas', function (Blueprint $table) {
            $table->id(); // ID como chave primária
            $table->string('apelido', 32)->unique(); // Apelido obrigatório e único
            $table->string('nome', 100); // Nome obrigatório
            $table->date('nascimento'); // Nascimento no formato de data
            $table->timestamps(); // Adiciona created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pessoas');
    }
};
