<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassificationSeeder extends Seeder
{
    
    public function run(): void
    {
        DB::table('classification')->insert([
            [
                'name'=>'Classification 1',
                'it_related' => '0',
            ],
            [
                'name'=>'Classification 2 (IT Related)',
                'it_related' => '1',
            ]
        ]);
    }
}
