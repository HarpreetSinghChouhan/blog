<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\AuthMail;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class EmailContoller extends Controller
{

    public function sendOtp(Request $request)
    {
        $request->validate(['email' => "required|email"]);
        $otp = rand(100000, 999999);

        Cache::put('otp_' . $request->email, $otp, now()->addMinutes(5));
        try {
            $user = User::Where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['status' => false, 'message' => 'this Mail is not exist or regiter your account'], 404);
            } else {
                Mail::to($request->email)->send(new AuthMail($otp));
                return response()->json(['status' => true, 'message' => 'Real OTP sent to Gmail!']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'error' => 'Gmail failed: ' . $e->getMessage()], 500);
        }
    }

    public function verifyOtp(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'otp' => 'required|numeric'
            ]);
            $storedOtp = Cache::get('otp_' . $request->email);
            if ($storedOtp && $request->otp == $storedOtp) {
                Cache::forget('otp_' . $request->email); // Verified!
                $user = User::Where('email', $request->email)->first();
                if (!$user) {
                    return response()->json(['status' => false, 'message' => 'this Mail is not exist or regiter your account'], 404);
                } else {
                    $token =  $user->createToken('apitoken')->plainTextToken;
                    // if($request->forgetpassword){
                    //     $token = Password::getRepository()->create($user);
                    // }
                    return response()->json(['status' => true, 'message' => 'OTP Verified Successfully', 'token' => $token], 200);
                }
            }
            return response()->json(['status' => false, 'message' => 'Invalid or expired OTP'], 401);
        } catch (\Throwable $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
}
