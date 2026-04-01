<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function Login(Request $request){
        
    try {
        $rule = [
            'email' => "required | email ",
            'password' => "required | min:8",
        ];
        $message = [
            "email.required" => "Email Are Required",
            "email.email" => "Email Are Not Correct Format",
            "password.required" => "Password Are Required",
            "password.min" => "Password Are Minimum 8 Letter "
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
                return response()->json(['status' => true, 'token' => $token, 'user' => $user, 'role' => $user->role ?? null]);
            }
        }

    }
    catch(\Exception $e){
        return response()->json(["status"=>false , "message"=>$e->getMessage()]);
    }
    }
    public function AuthChenker1(){
      try{
        $user = Auth::id();
        if(!$user){
        return response()->json(["status"=>true,"message"=>" User Not Found"]);

        }
        else{
        return response()->json(["status"=>true,"data"=>$user]);

        }
      } 
      catch(\Throwable $e){
        return response()->json(["status"=>false, "message"=>$e->getMessage()]);
      }   
    }
    public function UserFound($id){
         
    $user = User::find($id);
        if(!$user){
            return response()->json(["status"=>false,"message"=>"User Not Found"]);
        }
        else{
            return response()->json(["status"=>true,"message"=>$user]);
        }
    }
}
