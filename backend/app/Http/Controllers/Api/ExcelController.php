<?php

namespace App\Http\Controllers\Api;

use App\Exports\BlogExport;
use App\Exports\UserExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

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
            Excel::download(new UserExport, 'Users.xlsx');
            return response()->json(["status" => true, "message" => "users Execl File Download"]);
        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
}
