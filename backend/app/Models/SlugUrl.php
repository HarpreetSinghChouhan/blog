<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SlugUrl extends Model
{
    //
    protected $fillable = [
        'id',
        'shorturl',
        'correcturl',
        'created_at',
        'updated_at',
    ];
}
