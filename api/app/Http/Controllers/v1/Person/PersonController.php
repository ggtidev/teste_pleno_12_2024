<?php

namespace App\Http\Controllers\v1\Person;

use App\Http\Controllers\Controller;
use App\Http\Requests\{StorePerson, UpdatePerson};
use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseStatusCode;

class PersonController extends Controller
{
    public function index(): JsonResponse
    {
        $person = Person::query()->paginate(10);

        return response()->json($person);
    }

    public function store(StorePerson $request): JsonResponse
    {
        $validated = $request->validated();

        $person = Person::query()->create($validated);

        return response()->json($person, ResponseStatusCode::HTTP_CREATED);
    }

    public function update(Person $person, UpdatePerson $request): JsonResponse
    {
        $validated = $request->validated();

        $person->update($validated);

        return response()->json($person, ResponseStatusCode::HTTP_OK);
    }

    public function destroy(Person $person): JsonResponse
    {
        $person->delete();

        return response()->json(null, ResponseStatusCode::HTTP_NO_CONTENT);
    }
}
