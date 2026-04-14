<?php

namespace App\Http\Controllers\Api;

use App\Exports\BlogExport;
use App\Exports\UserExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class ExcelController extends Controller
{
    //
    public function BlogExport()
    {
        try {
            Excel::download(new BlogExport, 'blogs.xlsx');
            return response()->json(["status" => true, "message" => "file Are Downloaded"]);
        } catch (\Exception $e) {
            return response()->json(['status' => false, "message" => $e->getMessage()]);
        }
    }

    public function UserExport()
    { 
        try {
           
          return  Excel::download(new UserExport, 'Users.xlsx');

        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
    public function UserImport(Request $request){
        return response()->json(['status'=>true, 'message'=>$request->all() ]);
    }
}
