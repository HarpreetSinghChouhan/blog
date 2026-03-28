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
    "image_url",
    "content",
    "footer",
    "created_at",
    "updated_at",
    ] ;

    // protected $hidden = [
    // ];

    public function user(){
            return $this->belongsTo(User::class,'bloger_id');
    }
    public function getUrlImageAttribute(){
        return $this->image_url? asset('storage/blogs/'.$this->image):null;         
    }
}
