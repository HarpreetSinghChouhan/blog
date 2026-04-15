<?php

namespace App\Imports;

use App\Models\User;
use App\Events\ImportProgress;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeSheet;
use Spatie\Permission\Models\Role;

class UserImport implements ToModel, WithHeadingRow, WithEvents
{
    private $totalRows = 0;
    private $currentRow = 0;
    private $startTime;

    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => function (BeforeSheet $event) {
                // Get approximate total rows
                $this->totalRows = max(1, $event->sheet->getHighestRow() - 1);
                $this->startTime = microtime(true);
            },
        ];
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {   
        $this->currentRow++;
        
        // Dispatch progress event every 5 rows or on last row
        if ($this->currentRow % 5 === 0 || $this->currentRow >= $this->totalRows) {
            $percent = min(100, round(($this->currentRow / $this->totalRows) * 100));
            
            // Calculate time estimation
            $elapsedTime = microtime(true) - $this->startTime;
            $avgTimePerRow = $elapsedTime / $this->currentRow;
            $remainingRows = $this->totalRows - $this->currentRow;
            $timeLeft = round($avgTimePerRow * $remainingRows);

            ImportProgress::dispatch($percent, $timeLeft);
        }

        $role = Role::where('name', $row['role'])->where('guard_name', 'web')->first();
        
        // Use updateOrCreate to handle duplicate emails by updating existing users
        return User::updateOrCreate(
            ['email' => $row['email']],
            [
                'name'     => $row['name'],
                'password' => Hash::make($row['paasword'] ?? 'qwerty@123'),
                'role_id'  => $role ? $role->id : 'user',
            ]
        );
    }
}
