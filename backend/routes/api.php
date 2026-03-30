<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/adminregister',[AdminController::class,'Register']);
Route::post('/adminlogin',[AdminController::class,'Login']);
Route::post('/logout', [AdminController::class, 'logout']);
Route::post('/login',[AuthController::class,'Login']);
Route::middleware('auth:sanctum')->group(function(){
   Route::post('/registerub',[AdminController::class,'RegisterUB']);
   Route::get('/allusers',[AdminController::class,'getallusers']);
   Route::get('/users',[AdminController::class,'getuser']);
   Route::get('/bloger',[AdminController::class,'getbloger']);
   Route::get('/blog/{id}', [BlogController::class, 'getblog']);
   Route::delete('/blog/{id}',[BlogController::class,'deleteblog1']);
});
Route::middleware(['auth:sanctum','role:bloger'])->group(function(){
    Route::post('/blogcreate',[BlogController::class,'CreateBlog']);
    Route::get('/blogs',[BlogController::class,'getblogs']);
});
Route::middleware(['auth:sanctum','role:admin'])->group( function (){
   Route::get('/allblogs',[BlogController::class,'getallblogs']);
   Route::put('/blogerchange',[BlogController::class,'ChangeStatus']);
   Route::delete('/deleteblog',[BlogController::class,'DeleteBlog']);
   Route::delete('/user/{id}',[AdminController::class,'DeleteUser']);
   Route::put('/edituserblog',[AdminController::class,'EditUser']);
});