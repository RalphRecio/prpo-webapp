<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Traits\PurchaseRequisitionQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingPurchaseController extends Controller
{
    use PurchaseRequisitionQuery;

    public function index(){
        return Inertia::render('prpo/pending_approval');
    }

    public function pendingForApproval(Request $request)
    {
        $page = $request->input('page', 1);
        $pr = $this->buildPurchaseRequisitionQuery($request)
        ->whereRaw('LOWER(status) NOT LIKE ?', ['%disapproved%'])
        ->whereHas('approversList', function($query) {
            $query->where('approver_id', auth()->user()->id)
                ->where('is_send_count', 1)
                  ->where('is_approve', 0);
        });

        return response()->json([
            'purchaseRequisition' => [
                'data' => $pr->get(),
                // 'current_page' => $pr->currentPage(),
                // 'last_page' => $pr->lastPage(),
                // 'total' => $pr->total(),
            ],
        ]);
  
    }
}
