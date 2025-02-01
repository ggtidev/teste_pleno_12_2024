<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\MessageBag;

trait HttpResponses
{
    protected function success(string $message, int $status = 200, array|Model|JsonResource $data=[], array $links = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function error(string $message, string|int $status, array|MessageBag $errors=[], array $links = [])
    {
        return response()->json([
            'message' => $message,
            'status' => $status,
            'errors' => $errors,
        ], $status);
    }
}
