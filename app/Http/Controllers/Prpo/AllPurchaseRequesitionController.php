<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\PurchaseRequisitionQuery;
use Illuminate\Support\Facades\Auth;


class AllPurchaseRequesitionController extends Controller
{


    use PurchaseRequisitionQuery;

    public function index(){
        return Inertia::render('prpo/purchase_requisition_all');
    }

    public function allRequests(Request $request)
    {
        $prQuery = $this->buildPurchaseRequisitionQuery($request)
        ->where('bu_id', Auth::user()->bu_id)
        ->orderByDesc('id');

        $purchaseRequisitions = $prQuery->get();

        return response()->json([
            'purchaseRequisition' => [
                'data' => $purchaseRequisitions,
            ],
        ]);
    }
}
