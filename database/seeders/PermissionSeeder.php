<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample permissions
        Permission::create([
            'user_id' => 'view_approvers',
            'description' => 'Permission to view approvers',
        ]);

      
    }
}
