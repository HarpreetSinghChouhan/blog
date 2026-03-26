<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //'
    protected  $fillable = [
    "id",
    "bloger_id",    
    "title",
    "slug",
    "image",
    "content",
    "footer",
    "created_at",
    "updated_at",
    ] ;

    // protected $hidden = [
    // ];

    public function user(){
            return $this->belongsTo(User::class,'id');
    }
}
