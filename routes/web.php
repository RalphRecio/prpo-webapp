<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Prpo\PrpoController;
use App\Http\Controllers\Approvers\ApproverController;
use App\Http\Controllers\Prpo\PurchaseOrderController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('prpo')->group(function () {
        Route::get('purchase-request', [PrpoController::class, 'index'])->name('purchase-request');
        Route::get('purchase-request/all', [PrpoController::class, 'allRequests'])->name('purchase-request.all');
        Route::get('purchase-request/details/{id}', [PrpoController::class, 'viewDetails'])->name('purchase-request.show');
        Route::post('purchase-request', [PrpoController::class, 'store']);
        Route::get('create_pr', [PrpoController::class, 'createPr'])->name('create_pr');
        Route::post('purchase-request/approve/{id}', [PrpoController::class, 'approve'])->name('purchase-request.approve');
        Route::post('purchase-request/approve-unbudget/{id}', [PrpoController::class, 'approveUnbudget'])->name('purchase-request.approveUnbudget');
        Route::post('purchase-request/approve-overbudget/{id}', [PrpoController::class, 'approveOverBudget'])->name('purchase-request.approveOverBudget');
        Route::post('purchase-request/verify-finance/{id}', [PrpoController::class, 'verifyFinance'])->name('purchase-request.verifyFinance');
        Route::get('pending_approval', [PrpoController::class, 'pendingForReview'])->name('purchase-request.pending');
        Route::post('purchase-request/verify-procurement/{id}', [PrpoController::class, 'verifyProcurement'])->name('purchase-request.verifyProcurement');

        Route::get('approvers/{bu_id}', [ApproverController::class, 'index'])->name('approver.index');

        Route::get('purchase-order/{id}',[PurchaseOrderController::class, 'index'])->name('purchase-order.index');

        Route::get('purchase-order/pr-items/{id}',[PurchaseOrderController::class,'getPRItem'])->name('purchase-order.pr-items');
        


    });
});


require __DIR__.'/user.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
