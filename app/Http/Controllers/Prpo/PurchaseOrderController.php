<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Models\PurchaseRequisitionDetails;
use Illuminate\Http\Request;
use App\Models\PurchaseRequisiton;
use Inertia\Inertia;
use App\Models\Vendor;
use Illuminate\Support\Facades\Redis;
use App\Models\PurchaseOrder;

class PurchaseOrderController extends Controller
{
    public function index(Request $reqeust, $id ){

        $purchaseRequest = PurchaseRequisiton::with(['bu'])->findOrFail($id);

        $vendorList = Vendor::get();

        return Inertia::render('prpo/purchase_order', [
            'purchaseRequest' => $purchaseRequest,
            'vendorList' => $vendorList
        ]);
    }


    public function getPRItem($id){
        $prItems = PurchaseRequisitionDetails::where('pr_id',$id)->get();

        return response()->json($prItems); 
    }

    public function store(Request $request){

        $validated = $request->validate([
            'vendor_id' => 'required|integer',
            'vendor_contact_person' => 'require|string',
            'vendor_email_address' => 'require|string',
            'vendor_tel_no' => 'require|string',
            'vendor_name' => 'require|string',

            'ship_via' => 'required|string',
            'terms' => 'required|string',
            'status' => 'required|string',
            'buyer' => 'required|string',
            'confirming_to' => 'required|string',
            'pr_id' => 'required|integer',
            'freight' => 'require|string',
            'remarks' => 'require|string',
            'prepared_by_id' => 'required|integer',
            ]);


            $year = now()->year;
            $deptId = $validated['department_id'];
            $deptCode = auth()->user()->department->code;
    
            $latestPO = PurchaseOrder::whereYear('created_at', $year)
                ->where('department_id', $deptId)
                ->where('pr_no', 'like', "PR-{$deptCode}-{$year}-%")
                ->orderBy('id', 'desc')
                ->first();
    
            if ($latestPO) {
                $lastNumber = (int) str_replace("PO-{$deptCode}-{$year}-", '', $latestPO->pr_no);
                $nextNumber = $lastNumber + 1;
            } else {
                $nextNumber = 1;
            }

    }
}
