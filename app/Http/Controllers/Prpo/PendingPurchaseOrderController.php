<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\PurchaseOrder;

class PendingPurchaseOrderController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('prpo/po_pending_approval');
    }

    public function pendingForApproval(Request $request)
    {
        $user = Auth::user();
        $purchaseOrders = PurchaseOrder::with(['vendors', 'poApproversList','purchaseOrderDetails','purchaseRequest','preparedBy'])
            ->whereHas('poApproversList', function ($query) use ($user) {
                $query->where('approver_id', $user->id)
                      ->where('is_approve', 0)
                      ->where('is_send_count', 1);
            })
            ->get();

         return response()->json([
            'purchaseOrders' => [
                'data' => $purchaseOrders,
            ],
        ]);
    }

     public function viewPoDetails($id)
    {
        $purchaseOrder = PurchaseOrder::with([
            'purchaseRequest',
            'vendors',
            'poApproversList.approver',
            'purchaseOrderDetails',
            'preparedBy'
        ])->findOrFail($id);

        return Inertia::render('prpo/purchase_order_details', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }


}
