<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //
    public function user(){
        $this->hasMany(User::class,'id');
    }
}
