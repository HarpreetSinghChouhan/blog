<?php

namespace App\Http\Controllers;


use App\Models\SlugUrl;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SlugController extends Controller
{
    //
    public  function CreateSlug(Request $request)
    {
        try {
            $rule = [
                'slug' => 'required|url'
            ];
            $message = [
                'slug.required' => 'Slug fuild are required',
                'slug.url' => 'Slug are required url'
            ];
            $validation = validator($request->all(), $rule, $message);
            if ($validation->fails()) {
                return response()->json(['status' => false, 'message' => $validation->errors()]);
            } else {
                $shorturl = Str::random(6);
                SlugUrl::create([
                    'shorturl' => $shorturl,
                    'correcturl' => $request->slug
                ]);
                return response()->json(['status' => true, 'message' => "Slug Are create", 'shortslug' => $shorturl]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }
    public function Redirect($shorturl)
    {
        $url = SlugUrl::where('shorturl', $shorturl)->first();
        if (!$url) {
            return response()->json(['status' => false, "message" => "Short Are Url Are Not Correct"]);
        } 
       return redirect()->away($url->correcturl);
        // header(`Location:`, $url->currenturl );
        // return response()->json(['status' => true, 'message' => $url->correcturl]);
    }
    public function AllSlug()
    {
        $url = SlugUrl::all();
        return response()->json(['status' => true, 'message' => $url]);
    }
}
