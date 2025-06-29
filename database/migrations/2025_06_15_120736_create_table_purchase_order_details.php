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
        Schema::create('purchase_order_details', function (Blueprint $table) {
            $table->id();
            $table->integer('qty_ordered')->nullable();
            $table->string('unit_of_measure')->nullable();
            $table->decimal('unit_price', 10, 2)->nullable();
            $table->decimal('extended_price', 10, 2)->nullable();
            $table->text('description1')->nullable();
            $table->text('description2')->nullable();
            $table->foreignId('po_id')->constrained('purchase_order')->nullable();
            $table->foreignId('pr_id')->constrained('purchase_requisition')->nullable();
            $table->foreignId('pr_details_id')->constrained('purchase_req_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_order_details');
    }
};
