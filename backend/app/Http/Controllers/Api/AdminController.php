<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Exceptions\OriginMismatchException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

class AdminController extends Controller
{
    //
    public function  Register(Request $request)
    {
       try{
         $rule = array(
            "name" => 'required | min:2',
            'email' => "required | email | unique:users",
            'password' => "required | min:8",
        );
        $message = [
            "name.required" => "Name Are Required",
            "name.min" => "Name minimum letter 2 letter",
            "email.required" => "Email Are Required",
            "email.email" => "Email Are Not Correct Format",
            "email.unique" => "Email Are Allready userd Try Other or Login",
            "password.required" => "Password Are Required",
            "password.min" => "Password Are Minimum 8 Letter "
        ];
        $valdation = Validator::make($request->all(), $rule, $message);
        if ($valdation->fails()) {
            return response()->json(['status' => false, 'message' => $valdation->errors()], 422);
        } else {
            
          $role = Role::findOrCreate('admin', 'web');
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $role->id,
            ]);
            $token = $user->createToken('apitoken')->plainTextToken;
            $user->assignRole($role);
            return response()->json(['status' => true, 'user' => $user, "token" => $token, 'role' => $user->role], 201);
        }
       }
       catch(\Exception $e){
        return response()->json(['status'=>false,"message"=>$e->getMessage()]);
       }
    }
    public function DeleteUser($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(["status" => false, "message" => "User Not Found"], 404);
            } else {
                $user->delete();
                return response()->json(["status" => true, "message" => "User Are Deleted"], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);
        }
    }
    public function Login(Request $request)
    {
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
    public function EditUser(Request $request ,$id){
        try{
            $rule = [
                "name"=> "required | min:3",
                "role"=>"required",
            ];
            $message = [
                "name.required"=>"name are required",
                "name.min"=>"name Letter minimum 3 letter",
            ];
            $validation = validator($request->all(),$rule,$message);
            if($validation->fails()){
            return response()->json(["status"=>false,"message"=>$validation->errors()],400);
            }
            // $email=$request->email;
            $user = User::find($id);
            $role = Role::findOrCreate($request->role,'web');
            $user->update([
                'name'=>$request->name,
                'role_id'=>$role->id,
            ]);
            return response()->json(["status "=>true, "message"=>"user Are UPDATED"]);
        }
        catch(\Exception $e){
            return response()->json(["status"=>false,"message"=>$e->getMessage()],400);

        }
    }
    public function RegisterUB(Request $request)
    {
        $rule = array(
            "name" => 'required | min:2',
            'email' => "required | email | unique:users",
            'password' => "required | min:8",
            'role' => 'required'
        );
        $message = [
            "name.required" => "Name Are Required",
            "name.min" => "Name minimum letter 2 letter",
            "email.required" => "Email Are Required",
            "email.email" => "Email Are Not Correct Format",
            "email.unique" => "Email Are Allready userd Try Other or Login",
            "password.required" => "Password Are Required",
            "password.min" => "Password Are Minimum 8 Letter ",
            "Role.required" => "Role Are Required"
        ];
        $valdation = Validator::make($request->all(), $rule, $message);
        if ($valdation->fails()) {
            return response()->json(['status' => false, 'message' => $valdation->errors()], 422);
        } else {
            $role = $request->role;
            $defaultrole = Role::findOrCreate($role,'web');
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $defaultrole->id,

            ]);
            // $token = $user->createToken('apitoken')->plainTextToken;
            $user->assignRole($defaultrole);
            return response()->json(['status' => true, 'user' => $user, ], 201);
        }
    }

    public function logout(Request $request)
    {
        try{
            $token = $request->user()?->currentAccessToken();
        if ($token) {
            $token->delete();
        }
        return response()->json([
            'status' => true,
            'message' => "Logged out Successfully"
        ],200);
        }
        catch(\Exception $e){
            return response()->json(["status"=>false,"message"=>$e->getMessage()],422);
        }
    }
    public function verifyProfile(Request $request)
    {
        //  $rolled = $request->user()->load('role')->rolle->name;
        return response()->json(['status' => true, "user" => $request->user()], 200);
    }
    public function getallusers()
    { 
        $user = User::with('role:id,name')->whereHas('role',function ($query) {
            $query->where('name','!=','admin');
        })->get();

        // $user1 = $user->filter(function ($value,$key){
        //   return  optional($value->role)->name !== 'admin';
        // });
        // $user = User::Where('role', '!=', 'admin')->get();
        return response()->json(["status" => true, "user" => $user], 200);
    }
    public function getuser(Request $request)
    {    
        // $user = User::with('role:id,name')->get();
        $user = User::with('role:id,name')->whereHas('role',function ($query) {
            $query->where('name','user');
        })->get();
        return response()->json(['status' => true, "user" => $user,], 200);
    }
    public function getbloger()
    {
        // $user = User::Where('role', 'bloger')->get();
        $user = User::with('role:id,name')->whereHas('role',function ($query){
            $query->where('name','bloger');
        })->get();
        return response()->json(['status' => true, "user" => $user], 200);
    }
}
