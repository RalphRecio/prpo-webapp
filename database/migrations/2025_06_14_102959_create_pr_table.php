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
        Schema::create('purchase_requisition', function (Blueprint $table) {
            $table->id();
            $table->string("pr_no");
            $table->integer("requestor_id");
            $table->dateTime("date_issue");
            $table->dateTime("date_needed");
            $table->integer("bu_id");
            $table->integer("department_id");
            $table->string("prod_end_user");
            $table->foreignId("classification_id")->constrained("classification");
            $table->text("remarks")->nullable();
            $table->integer("is_it_related")->default(0);
            $table->integer("is_approve_it_manager")->default(0);

            $table->integer("is_approve_im_supervisor")->nullable();
            $table->integer('im_supervisor_id');

            $table->string("currency")->default("php");
            $table->integer("budgeted")->default(0);
            $table->string("isCapexOpex")->nullable();
            $table->decimal("budget_amount", 10, 2)->nullable();
            $table->string("finance_remarks")->nullable();
            $table->integer("is_finance_verified")->default(0);
            $table->integer('finance_verified_id')->default(0);

            $table->integer("is_approve1_unbudgeted")->default(0);
            $table->integer("approver1_unbgtd_id")->default(0);
            $table->integer("is_approve2_unbudgeted")->default(0);
            $table->integer("approver2_unbgtd_id")->default(0);

            $table->integer("is_overbudget")->default(0);
            $table->integer("is_approve1_overbudgeted")->default(0);
            $table->integer("approver1_bgtd_id")->default(0);
            $table->integer("is_approve2_overbudgeted")->default(0);
            $table->integer("approver2_bgtd_id")->default(0);
            $table->integer("is_procurement_verified")->default(0);
            $table->integer('procurement_verified_id')->default(0);

            $table->string("supplier_name")->nullable();
            $table->decimal("actual_amount", 10, 2)->nullable();
            $table->string("procurement_remarks")->nullable();


            $table->string("status")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_requisition');
    }
};
