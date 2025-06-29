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
        Schema::create("po_approver_list", function (Blueprint $table) {
            $table->id();
            $table->integer("approver_id");
            $table->integer('is_approve')->default(0);
            $table->integer('is_send_count')->default(0);
            $table->foreignId('po_id')->constrained("purchase_order");
            $table->text("remarks")->nullable();
            $table->integer('approver_level');
            $table->dateTime("approval_date")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("po_approver_list");
    }
};
