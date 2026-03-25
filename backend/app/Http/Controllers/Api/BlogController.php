<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    //
    // public function CreateBlog(Request $request){
    //    return response()->json(["status"=>true,"image"=>$request->image,"user"=>$request->title,"footer"=>$request->footer]);

    //    }
    public function CreateBlog(Request $request)
    {
            $rule = [
                "title"=>"required | min:2",
                "footer"=>"required | min:4",
                "slug"=>"required | min:3 | unique:slug",
                 "content"=>"required | min:10",
            ];
            $message = [
                "title.required" => "Title Are Required",
                 "title.min" =>"Title are Minimum 2 letter",
                 "footer.required" => "Footer Are required ",
                 "footer.min"=>"Footer Are Minimum 4 letter",
                 "slug.required" =>"Slug Are Required"
            ];
            $validation = Validator::make($request->all(),$rule,$message);
        return response()->json([
            "status" => true,
            "all" => $request->all(),
            "title"=>$request->title,
            "footer"=>$request->footer,
            "image"=>$request->image,
            ]);
    }
}
