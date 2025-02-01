<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Remover a chave primária atual
        Schema::table('pessoas', function (Blueprint $table) {
            $table->dropPrimary('id');
        });

        // Adicionar a nova coluna UUID
        Schema::table('pessoas', function (Blueprint $table) {
            $table->uuid('new_id')->default(DB::raw('gen_random_uuid()'));
        });

        // Copiar os dados antigos para a nova coluna (gerar novos UUIDs para cada registro)
        DB::table('pessoas')->update(['new_id' => DB::raw('gen_random_uuid()')]);

        // Remover a coluna original 'id'
        Schema::table('pessoas', function (Blueprint $table) {
            $table->dropColumn('id');
        });

        // Renomear a coluna 'new_id' para 'id'
        Schema::table('pessoas', function (Blueprint $table) {
            $table->renameColumn('new_id', 'id');
        });

        // Definir a nova coluna 'id' como chave primária
        Schema::table('pessoas', function (Blueprint $table) {
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Voltar as alterações no metodo down, se necessário
        Schema::table('pessoas', function (Blueprint $table) {
            $table->bigIncrements('id')->primary();
        });
    }
};
