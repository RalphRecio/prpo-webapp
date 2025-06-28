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
        Schema::table('purchase_order_details', function (Blueprint $table) {
            $table->text('description')->nullable();
            $table->foreignId('po_id')->constrained('purchase_order');
            $table->foreignId('pr_id')->constrained('purchase_requisition');
            $table->foreignId('pr_details_id')->constrained('purchase_req_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchase_order_details', function (Blueprint $table) {
            $table->dropForeign(['po_id']);
            $table->dropForeign(['pr_id']);
            $table->dropForeign(['pr_details_id']);
            $table->dropColumn(['description']);
        });
    }
};
