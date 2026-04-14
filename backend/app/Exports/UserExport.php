<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

 class UserExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
         return User::select('id', 'name', 'email','role_id', 'created_at', 'updated_at')->get();
    }
//  
   /**
    * @return array
    */
    public function headings() : array {
        return [
            'id',
            'Name',
            'Email', 
            'Role-id',
            'Created_AT',
            'Updated_AT'
        ];
    }
}
