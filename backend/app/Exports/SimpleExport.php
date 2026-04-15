<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SimpleExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        //
        return collect([]);

    }
    /**
     * @return array
     */
    public function headings(): array {
        return [ 
            'id',
            'name',
            'email',
            'role_id',
            'created_at',
            'updated_at',
        ];
    }
}