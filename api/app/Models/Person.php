<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;
    use HasUuids;

    public $guarded = ['id'];

    public function scopeSearch(Builder $query, string|null $search): Builder
    {
        return $query->where('name', 'like', "%$search%")
            ->orWhere('nickname', 'like', "%$search%");
    }

    public function nickname(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => strtolower($value),
        );
    }
}
