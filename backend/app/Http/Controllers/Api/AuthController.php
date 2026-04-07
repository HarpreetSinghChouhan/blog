<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Passwords\PasswordBroker; // Add this import

class AuthController extends Controller
{
    //
    public function Login(Request $request)
    {

        try {
            $rule = [
                'email' => "required | email ",
                'password' => "required | min:8",
            ];
            $message = [
                "email.required" => "Email Are Required",
                "email.email" => "Email Are Not Correct Format",
                "password.required" => "Password Are Required",
                "password.min" => "Password Are Minimum 8 Letter"
            ];
            $validation = Validator::make($request->all(), $rule, $message);
            if ($validation->fails()) {
                return response()->json(['status' => false, 'message' => $validation->errors()], 422);
            } else {

                $user = User::Where('email', $request->email)->first();
                if (!$user || !Hash::check($request->password, $user->password)) {
                    return response()->json(['status' => false, 'message' => 'Email and Password are Not Matched']);
                } else {
                    $token = $user->createToken('apitoken')->plainTextToken;
                    return response()->json(['status' => true, "message" => "success"]);
                }
            }
        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
    public function CreateToken(Request $request)
    {
       $request->validate(['email' => 'required|email']);
            // return response()->json(["status"=>false,"message"=>$request->all()]);
    try {
        $user = User::where('email', $request->email)->first();

        // 2. Check if user exists
        if (!$user) {
            return response()->json(["status" => false, "message" => "User not found"], 404);
        }
        
       $token = Password::getRepository()->create($user);
        
        return response()->json(['status' => true, 'token' => $token]);
    } catch (\Exception $e) {
        return response()->json(["status" => false, "message" => $e->getMessage()], 422);
    }
    }

    public function CheckToken(Request $request)
    {
        try{
            
      $rule = [
        'email' => 'required|email',
        'token' => 'required'
      ];
      $message = [
        'email.required' => 'Email Are required',
        'token,required'=>"token Are required"
      ];
         $validation = Validator::make($request->all(),$rule,$message);
         if($validation->fails()){
             return response()->json(["status" => false, "message" => $validation->errors()], 422);
         }
        $user = User::where('email', $request->email)->first();
        $broker  = Password::broker();
        /** @var PasswordBroker $broker */
        if (!$user || !$broker->tokenExists($user, $request->token)) {
            return response()->json([
                'valid' => false,
                'message' => 'This password reset token is invalid or expired.'
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Token is valid.'
        ], 200);
        }
        catch(\Exception $e){
            return response()->json(["status" => false, "message" => $e->getMessage()], 422);  
        }
    }
    public function ChangePassword(Request $request)
    {
        // return response()->json(["status" => false, "message" => $request->all()]);
        try {
            $id = Auth::id();
            $user = User::with('role:id,name')->find($id);
            if ($request->oldpassword) {
                $rule = [
                    'oldpassword' => 'required|min:8',
                    'newpassword' => 'required|min:8|different:oldpassword',
                    'confirmpassword' => 'required|same:newpassword',
                ];

                $message = [
                    'oldpassword.required' => 'Old password is required.',
                    'newpassword.required' => 'New password is required.',
                    'confirmpassword.required' => 'Confirm password is required.',
                    'newpassword.different' => 'New password must be different from the old one.',
                    'confirmpassword.same' => 'Confirmation password does not match.',
                ];

                $validation = Validator::make($request->all(), $rule, $message);

                if ($validation->fails()) {
                    return response()->json(["status" => false, "message" => $validation->errors()], 422);
                }


                // Check if the provided old password matches the database
                if (!Hash::check($request->oldpassword, $user->password)) {
                    return response()->json(['status' => false, 'message' => 'Old password does not match our records.'], 401);
                }
                $user->update([
                    'password' => Hash::make($request->newpassword)
                ]);
                // $user->tokens()->delete();
                $token = $user->createToken('apitoken')->plainTextToken;
                return response()->json(['status' => true, "message" => "Password updated successfully.","token"=>$token], 200);
            } else {
                $rule = [
                    'password' => 'required|min:8',
                    'confirmpassword' => 'required|same:password',
                ];

                $message = [
                    'password.required' => 'password is required.',
                    'confirmpassword.required' => 'Confirm password is required.',
                    'confirmpassword.same' => 'Confirmation password does not match.',
                ];
                $validation = Validator::make($request->all(), $rule, $message);
                if ($validation->fails()) {
                    return response()->json(["status" => false, "message" => $validation->errors()], 422);
                } else {
                    $user->update([
                        'password' => Hash::make($request->password)
                    ]);
                    return response()->json(["status" => true, "message" => "Password are Changed"], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()], 422);
        }
    }
    public function AuthChenker1()
    {
        try {
            $id = Auth::id();
            $user = User::with('role:id,name')->find($id);
            if (!$user) {
                return response()->json(["status" => true, "message" => " User Not Found"]);
            } else {
                return response()->json(["status" => true, "user" => $user]);
            }
        } catch (\Throwable $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
    public function UserFound($id)
    {
        $user = User::with('role:id,name')->find($id);
        if (!$user) {
            return response()->json(["status" => false, "message" => "User Not Found"]);
        } else {
            return response()->json(["status" => true, "message" => $user]);
        }
    }
    public function FindUser(){
        $id = Auth::id();
        $user = User::with('role:id,name')->find($id);
        if (!$user) {
            return response()->json(["status" => false, "message" => "User Not Found"]);
        } else {
            return response()->json(["status" => true, "message" => $user]);
        }
    }
}
