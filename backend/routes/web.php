<?php

use App\Http\Controllers\SlugController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/email', function(){
    return view('emails.otp');
});
Route::get('/slug', function(){
    return view('slug');
});
Route::post('/create-url',[SlugController::class,'CreateSlug'])->name('create-url');
Route::get('/slug/{slugurl}',[SlugController::class,'Redirect'])->name('shorturl');
Route::get('/shorturl',function(){
    return view('shorturl');
});

Route::get('alldata',[SlugController::class,'AllSlug'])->name('AllData');
