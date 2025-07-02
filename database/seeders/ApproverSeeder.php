<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApproverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample approvers
        DB::table('approvers')->insert([
            [
                'user_id' => 30,
                'id_no' => '1055',
                'approver_name' => 'Jerald Paghangaan',
                'approver_email' => 'jpaghangaan@suhay.com.ph',
                'bu_id' => '1',
                'dept_id' => '1',
                'job_title' => 'IT Manager',
                'approver_type' => 'itmanager',
                'approver_status' => 'active',
                'approver_level' => '1',
            ],
            [
                'user_id' => '',
                'id_no' => '',
                'approver_name' => '',
                'approver_email' => '',
                'bu_id' => '0',
                'dept_id' => '0',
                'job_title' => 'Immediate Supervisor',
                'approver_type' => 'immsupervisor',
                'approver_status' => 'active',
                'approver_level' => '2',
            ],
            [
                'user_id' => 244,
                'id_no' => '1065',
                'approver_name' => 'Jonalyn Reyes',
                'approver_email' => 'jreyes@suhay.com.ph',
                'bu_id' => '1',
                'dept_id' => '3',
                'job_title' => 'Accounts Payable Specialist',
                'approver_type' => 'finance',
                'approver_status' => 'active',
                'approver_level' => '3',
            ],
            [
                'user_id' => 9,
                'id_no' => '1046',
                'approver_name' => 'Camille Bautista',
                'approver_email' => 'cbautista@suhay.com.ph',
                'bu_id' => '1',
                'dept_id' => '3',
                'job_title' => 'General Accountant',
                'approver_type' => 'finance',
                'approver_status' => 'active',
                'approver_level' => '3',
            ],

            // PROCUREMENT
            [
                'user_id' => 21,
                'id_no' => '1047',
                'approver_name' => 'Fabrianne Canicosa',
                'approver_email' => 'fcanicosa@suhay.com.ph',
                'bu_id' => '10',
                'dept_id' => '3',
                'job_title' => 'General Accountant',
                'approver_type' => 'finance',
                'approver_status' => 'active',
                'approver_level' => '3',
            ],
            [
                'user_id' => 14,
                'id_no' => '1008',
                'approver_name' => 'Czarina Roma Sumalinog',
                'approver_email' => 'csumalinog@suhay.com.ph',
                'bu_id' => '3',
                'dept_id' => '3',
                'job_title' => 'Finance Supervisor',
                'approver_type' => 'finance',
                'approver_status' => 'active',
                'approver_level' => '3',
            ],
            [
                'user_id' => 8,
                'id_no' => '1047',
                'approver_name' => 'Bebelyn Catarinin',
                'approver_email' => 'bcatarinin@suhay.com.ph',
                'bu_id' => '2',
                'dept_id' => '3',
                'job_title' => 'General Accountant',
                'approver_type' => 'finance',
                'approver_status' => 'active',
                'approver_level' => '3',
            ],

            // IT AND IM 
            [
                'user_id' => 30,
                'id_no' => '1055',
                'approver_name' => 'Jerald Paghangaan',
                'approver_email' => 'jpaghangaan@suhay.com.ph',
                'bu_id' => '1',
                'dept_id' => '1',
                'job_title' => 'IT Manager',
                'approver_type' => 'itmanager',
                'approver_status' => 'active',
                'approver_level' => '1',
            ],
            [
               'user_id'=>0,
                'id_no' => '',
                'approver_name' => '',
                'approver_email' => '',
                'bu_id' => '',
                'dept_id' => '',
                'job_title' => 'Immediate Supervisor',
                'approver_type' => 'immsupervisor',
                'approver_status' => 'active',
                'approver_level' => '2',
            ],
            [
                'user_id' => 251,
                'id_no' => '1070',
                'approver_name' => 'Clarivic Villanueva',
                'approver_email' => 'cvillanueva@suhay.com.ph',
                'bu_id' => '1',
                'dept_id' => '3',
                'job_title' => 'Senior Finance Manager',
                'approver_type' => 'comptroller',
                'approver_status' => 'active',
                'approver_level' => '5',
            ],
        ]);
    }
}
