<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Traits\PurchaseOrderQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AllPurchaseOrderController extends Controller
{

    use PurchaseOrderQuery;

    public function index(){
        return Inertia::render('prpo/purchase_order_all');
    }

    public function allPurchaseOrder(Request $request)
    {
        $poQuery = $this->buildPurchaseOrderQuery($request)
            ->whereHas('purchaseRequest', function ($q) {
                $q->where('bu_id', Auth::user()->bu_id);
            })
            ->orderByDesc('id');

        $purchaseOrders = $poQuery->get();

        return response()->json([
            'purchaseOrders' => [
                'data' => $purchaseOrders,
            ],
        ]);
    }
}
