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
        Schema::create('purchase_req_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId("pr_id")->constrained("purchase_requisition")->onDelete('cascade');
            $table->integer("qty_in_figures");
            $table->string("uom");
            $table->string("description");
            $table->string("status")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_req_details');
    }
};
