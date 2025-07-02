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
     

        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('business_type',500)->nullable();
            $table->string('supplier_name',500)->nullable();
            $table->string('address',500)->nullable();
            $table->string('contact_number',500)->nullable();
            $table->string('email',500)->nullable();
            $table->string('contact_person',500)->nullable();
            $table->string('payment_terms',500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
