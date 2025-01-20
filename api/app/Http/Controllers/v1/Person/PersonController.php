<?php

namespace App\Http\Controllers\v1\Person;

use App\Http\Controllers\Controller;
use App\Http\Requests\{StorePerson, UpdatePerson};
use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseStatusCode;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Person API Documentation",
 *     description="API endpoints for managing person records"
 * )
 *
 * @OA\Schema(
 *     schema="Person",
 *     required={"nickname", "name", "birth"},
 *     @OA\Property(property="id", type="string", format="uuid", readOnly=true),
 *     @OA\Property(property="nickname", type="string", example="johndoe"),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="birth", type="string", format="date", example="1990-01-01"),
 *     @OA\Property(property="created_at", type="string", format="datetime", readOnly=true),
 *     @OA\Property(property="updated_at", type="string", format="datetime", readOnly=true)
 * )
 *
 * @OA\Schema(
 *     schema="PersonRequest",
 *     required={"nickname", "name", "birth"},
 *     @OA\Property(property="nickname", type="string", example="johndoe"),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="birth", type="string", format="date", example="1990-01-01")
 * )
 */
class PersonController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/person",
     *     summary="List all persons",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="t",
     *         in="query",
     *         description="Search term",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Person")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $search = request()->query('t');
        $query = Person::query();
        if (!empty($search)) {
            $query->search($search);
        }
        $person = $query->get();
        return response()->json($person);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/person",
     *     summary="Create a new person",
     *     tags={"Person"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PersonRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Person created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Person")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(StorePerson $request): JsonResponse
    {
        $validated = $request->validated();
        $person = Person::query()->create($validated);
        return response()->json($person, ResponseStatusCode::HTTP_CREATED);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/person/{id}",
     *     summary="Get person by ID",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Person")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     )
     * )
     */
    public function show(string $id): JsonResponse
    {
        $person = Person::query()->find($id);
        return response()->json($person);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/person/{id}",
     *     summary="Update person by ID",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PersonRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Person")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Person $person, UpdatePerson $request): JsonResponse
    {
        $validated = $request->validated();
        $person->update($validated);
        return response()->json($person, ResponseStatusCode::HTTP_OK);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/person/{id}",
     *     summary="Delete person by ID",
     *     tags={"Person"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Person ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Person deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Person not found"
     *     )
     * )
     */
    public function destroy(Person $person): JsonResponse
    {
        $person->delete();
        return response()->json(null, ResponseStatusCode::HTTP_NO_CONTENT);
    }

    public function countPerson(): JsonResponse
    {
        $person = Person::query()->count();
        return response()->json($person);
    }
}
