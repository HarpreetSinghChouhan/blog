<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function ChangeStatus(Request $request)
    {
        $blogId = $request->blogid;
        $blog = Blog::Where('id', $blogId)->update(['status' => 'published']);
        $updated = Blog::find($blogId);
        
        broadcast(new \App\Events\BlogPublished($updated));
        
        return response()->json(["status" => true, "message" => "data are changed Successfull", "blog" => $blog, "update" => $updated], 200);
    }

    public function getblogs(Request $request)
    {
        $userId  = Auth::id();
        
        $blogs = Blog::where('bloger_id', $userId)->get()->map( function ($blog){
            $blog->image_url = $blog->image?asset("/storage/blogs/".$blog->image):null;
            return $blog;
        });
        return ["status" => true, "message" => $blogs];
    }

    public function deleteblog1($id){
        try{
            $blog = Blog::find($id);
            if(!$blog){
                return response()->json(["status"=>false,"message"=>"Blog Are Not Found"],404);       
            }
        }
        catch(\Exception $e){
            return response()->json(["status"=>false,"message"=>$e->getMessage()]);
        }
    }
  
    public function getblog($id)
    {
        $blog = Blog::find($id);
        
        if (!$blog) {
            $blog = Blog::where('slug',$id)->first();
           if(!$blog){
             return response()->json(["status"=>false,"message"=>"Blog are Not Found"]);
           }
        }

        $blog->image_url = $blog->image
            ? asset('storage/blogs/' . $blog->image)
            : null;

        return response()->json([
            "status" => true,
            "data" => $blog
        ]);
    }

      
     public function blogs(Request $request)
    {
        try {
            $user = $request->user();
          
            $user = User::with('role:id,name')->find($user->id); 
            
            $user->load('role:id,name');
            if ($user->hasRole('admin')) {
                $blogs = Blog::with('user:id,name,email')->get();
            } elseif ($user->hasRole('bloger')) {
                // Bloger sees only their own blogs
                $blogs = Blog::with('user:id,name,email')->get();
            } else {
                // Regular user sees only published blogs
                $blogs = Blog::where('status', 'published')->get();
            }

            return response()->json([
                'status' => true,
                'blogs'  => $blogs,
            ]);
        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
    public function EditBlog(Request $request){
   try{
    $rule = [
        "title" => "required | min:2",
        "footer" =>"required | min:4",
        "slug" => "required|min:5|unique:blogs,slug," . $request->id,
        "content"=>"required | min:100",
        "image" => "nullable | image | mimes:jpg,jpeg,png,webp | max:3072",
    ];
    $message = [
        "tilte.required" => "Title are Required",
        "title.min" => "Title are Minimum 2 letter",
        "footer.required" => "Footer Are required ",
        "footer.min" => "Footer Are Minimum 4 letter",
        "slug.required" => "Slug Are Required",
        "slug.unique"      => "Slug already exists", 
        "content.required" => "Content Are  Required",
    ];
      $validation =  Validator::make($request->all(),$rule,$message);
      if($validation->fails()){
        return response()->json(["status"=>false,"message"=>$validation->errors()]);
      }
      else{
        $blog = Blog::find($request->id);
        // $blog1 = Blog::find($request->id);
        if(!$blog){
          return response()->json(["status"=>false, "message"=>"Blog are Not Found"]);
        }
        else{
            $image = $blog->image;
            if($request->file('image')){
                $file = $request->file('image');
                $image = time()."_".$file->getClientOriginalName();
                $file->storeAs('blogs',$image,'public'); 
            }
             $blog->update([
                'title'=>$request->title,
                'footer'=>$request->footer,
                'content' => $request->input('content'),
                'slug' => $request->slug,
                'image'=>$image,
                ]
             );
            return response()->json(["status"=>true,"update"=>$blog]);
        }
      }
   }
   catch(\Exception $e){
        return response()->json(["status"=>false, "message"=>$e->getMessage()]);
         }
    }

    // public function getallblogs(Request $request)
    // {
    //     $blog = Blog::with(['user:id,email,name'])->get();
    //     return response()->json(["status" => true, "message" => $blog]);
    // }
    public function CreateBlog(Request $request)
    {
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
                'content' => $request->input('content'),
                'image' => $image,
                'bloger_id' => Auth::id(),
            ]);
        }
        return response()->json([
            "status" => true,
            "message" => $blog,
        ]);
    }
    public function Deleteblog(Request $request)
    {
        $blog = Blog::find($request->blogid);
        if ($blog) {
            $blog->delete();
            return response()->json(["status" => true, "message" => "Blog are Delete succesfull"], 200);
        }
        return response()->json(["status" => false, "message" => "blog are Not Found"], 404);
    }
}
