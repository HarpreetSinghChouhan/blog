<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Role::firstOrCreate(['name'=>'user']);
        $admin= Role::firstOrCreate(['name'=>'admin']);
        $bloger = Role::firstOrCreate(['name'=>'bloger']);
          
        Permission::FirstOrCreate(['name'=>'write blog']);
        Permission::FirstOrCreate(['name'=>'edit blog']);
        Permission::FirstOrCreate(['name'=>'read blog']);
        Permission::FirstOrCreate(['name'=>'delete Blog']);
        Permission::FirstOrCreate(['name'=>'comment']);
        
    }
}
