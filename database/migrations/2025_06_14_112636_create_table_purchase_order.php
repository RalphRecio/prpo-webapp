<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('purchase_order', function (Blueprint $table) {
            $table->id();
            $table->string('po_no');
            $table->foreignId('vendor_id')->constrained('vendor');

            $table->integer('is_approve1')->default(0);
            $table->integer('is_approve2')->default(0);
            $table->integer('approver1_id')->default(0);
            $table->integer('approver2_id')->default(0);
       
            $table->string('vendor_contact_person');
            $table->string('vendor_email_address');
            $table->string('vendor_tel_no');
            $table->string('vendor_name');

            $table->string('ship_via');
            $table->string('terms');
            $table->string('status');
            $table->string('buyer');
            $table->string('confirming_to');
            $table->foreignId('pr_id')->constrained('purchase_requisition');
            $table->string('freight');
            $table->text('remarks');
            $table->integer('department_id')->nullable();
            $table->string('prepared_by')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_order');
    }
};
