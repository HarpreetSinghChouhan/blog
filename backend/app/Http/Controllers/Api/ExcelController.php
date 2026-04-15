<?php

namespace App\Http\Controllers\Api;

use App\Exports\BlogExport;
use App\Exports\SimpleExport;
use App\Exports\UserExport;
use App\Http\Controllers\Controller;
use App\Imports\UserImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    //
    public function SimpleExport()
    {
        try {
            return Excel::download(new SimpleExport, 'simple.xlsx');
        } catch (\Exception $e) {
            return response()->json(["status" => false, "message" => $e->getMessage()]);
        }
    }
    public function UserImport(Request $request)
    {
        $request->validate(['file' => 'required|mimes:xlsx,xls,csv']);
        try {
            // Increase timeout and memory for large imports
            set_time_limit(0);
            ini_set('memory_limit', '512M');

            Excel::import(new UserImport, $request->file);
            return response()->json([
                'status' => true,
                'message' => 'Users imported successfully!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
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
    public function BlogExport()
    {
        try {
            return Excel::download(new BlogExport, 'blogs.xlsx');
        } catch (\Exception $e) {
            return response()->json(['status' => false, "message" => $e->getMessage()]);
        }
    }
}
