<?php

use App\Http\Controllers\v1\Person\PersonController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::apiResource('person', PersonController::class);

    Route::get('count', [PersonController::class, 'countPerson'])->name('person.count');
});
