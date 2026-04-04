<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\EmailContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/adminregister', [AdminController::class, 'Register']);
Route::post('/adminlogin', [AdminController::class, 'Login']);
Route::post('/logout', [AdminController::class, 'logout']);
Route::post('/login', [AuthController::class, 'Login']);
Route::post('/verifyemail', [EmailContoller::class, 'SendOtp']);
Route::post('/verifyotp', [EmailContoller::class, 'verifyOtp']);
Route::middleware('auth:sanctum')->group(function () {
Route::post('/check-password-token', [AuthController::class, 'CheckToken']);
Route::patch('/changepassword', [AuthController::class, 'ChangePassword']);
    Route::post('/create', [AuthController::class, 'CreateToken']);
    Route::get('/blogs', [BlogController::class, 'blogs']);
    Route::get('/verifyuser', [AdminController::class, 'verifyProfile']);
    Route::get('/authication', [AuthController::class, 'AuthChenker1']);
    Route::post('/registerub', [AdminController::class, 'RegisterUB']);
    Route::get('/allusers', [AdminController::class, 'getallusers']);
    Route::get('/users', [AdminController::class, 'getuser']);
    Route::get('/bloger', [AdminController::class, 'getbloger']);
    Route::get('/blog/{id}', [BlogController::class, 'getblog']);
    Route::delete('/blog/{id}', [BlogController::class, 'deleteblog1']);
    Route::put('/blogedit', [BlogController::class, 'EditBlog']);
    Route::get('/user/{id}', [AuthController::class, 'UserFound']);
});
Route::middleware(['auth:sanctum', 'role:bloger'])->group(function () {
    Route::post('/blogcreate', [BlogController::class, 'CreateBlog']);
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::put('/blogerchange', [BlogController::class, 'ChangeStatus']);
    Route::delete('/deleteblog', [BlogController::class, 'DeleteBlog']);
    Route::delete('/user/{id}', [AdminController::class, 'DeleteUser']);
    Route::put('/user/{id}', [AdminController::class, 'EditUser']);
});
