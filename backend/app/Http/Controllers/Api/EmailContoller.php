<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\AuthMail;
use Illuminate\Support\Facades\Mail;
class EmailContoller extends Controller
{
    //
     public function sendOtp(Request $request) {
    $otp = rand(100000, 999999);
     
    // This sends the actual email via Gmail SMTP
    Mail::to($request->email)->send(new AuthMail($otp));
    
    return "OTP sent to your Gmail inbox!";
}
}
