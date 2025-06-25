<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create("permissions", function (Blueprint $table) {
            $table->id();
            $table->integer("user_id");
            $table->string("page");
            $table->integer("can_access");
            $table->timestamps();
        });

    }

    public function down(): void
    {
         Schema::dropIfExists('permissions');
    }
};
