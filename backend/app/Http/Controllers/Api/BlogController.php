<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function ChangeStatus(Request $request){
        $blogId = $request->blogid;
        $blog = Blog::Where('id',$blogId)->update(['status'=>'published']);
        $updated = Blog::find($blogId); 
        return response()->json(["status"=>true, "message"=>"data are changed Successfull","blog"=>$blog,"update"=>$updated],200);
    }
    public function getblogs(Request $request)
    {
        $userId  = Auth::id();
         $blogs = Blog::where('bloger_id', $userId)->get()->map(function ($blog) {
            $blog->image_url = $blog->image
                ? asset('storage/blogs/' . $blog->image)
                : null;
            return $blog;
        });
        // $blogs = Blog::where('bloger_id', $userId)->get();
        return ["status" => true, "message" => $blogs];
    }
    public function getallblogs(Request $request)
    {
        $blog = Blog::all();
        return response()->json(["status" => true, "message" => $blog]);
    }
    public function CreateBlog(Request $request)
    {
        // dd($_FILES, $request->all());
        $rule = [
            "title" => "required | min:2",
            "footer" => "required | min:4",
            "slug" => "required | min:3 | unique:blogs,slug",
            "content" => "required | min:10",
            "image" => "nullable | image | mimes:jpg,jpeg,png,webp|max:2048",
        ];
        $message = [
            "title.required" => "Title Are Required",
            "title.min" => "Title are Minimum 2 letter",
            "footer.required" => "Footer Are required ",
            "footer.min" => "Footer Are Minimum 4 letter",
            "slug.required" => "Slug Are Required",
            "content.required" => "Content Are  Required",
        ];
        $validation = Validator::make($request->all(), $rule, $message);
        if ($validation->fails()) {
            return response()->json(["status" => false, "message" => $validation->errors()]);
        } else {
            $image = null;

            if ($request->file('image')) {
                $file = $request->file('image');
                $image = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('blogs', $image, 'public');
            }
            $blog = Blog::create([
                'title' => $request->title,
                'slug' => $request->slug,
                'footer' => $request->footer,
                'content' => $request->content,
                'image' => $image,
                'bloger_id' => Auth::id(),
            ]);
        }
        return response()->json([
            "status" => true,
            "message" => $blog,

        ]);
    }
}
