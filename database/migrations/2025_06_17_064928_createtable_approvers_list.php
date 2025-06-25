<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('approvers', function (Blueprint $table) {
            $table->id();
            $table->string('id_no');
            $table->integer("user_id")->nullable();
            $table->string('approver_name');
            $table->string('approver_email');
            $table->integer('bu_id');
            $table->integer('dept_id');
            $table->string('job_title');
            $table->string('approver_type');
            $table->string('approver_status')->default('active');
            $table->string('approver_level')->default('1');   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approvers');
    }
};
