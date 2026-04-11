<?php

namespace App\Imports;

use App\Models\Blog;
use Maatwebsite\Excel\Concerns\ToModel;

class BlogImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Blog([
            //
        ]);
    }
}
