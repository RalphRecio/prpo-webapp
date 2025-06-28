<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Models\PurchaseRequisitionDetails;
use Illuminate\Http\Request;
use App\Models\PurchaseRequisiton;
use Inertia\Inertia;
use App\Models\Vendor;
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
            'ship_via' => 'required|string',
            'terms' => 'required|string',   
            'buyer' => 'required|string',
            'confirming_to' => 'required|string',
            'pr_id' => 'required|integer',
            'freight' => 'required|string',
            'remarks' => 'required|string',
            'vendor_id' => 'required|integer',
            'vendor_contact_person' => 'required|string',
            'vendor_email_address' => 'required|string',
            'vendor_tel_no' => 'required|string',
            'vendor_name' => 'required|string',
            'vendor_address' => 'required|string',

            'items' => 'nullable|array',
            'items.*.qty_ordered' => 'required_with:items|numeric',
            'items.*.unit_of_measure' => 'required_with:items|string|max:50',
            'items.*.description1' => 'required_with:items|string|max:255',
            'items.*.description2' => 'required_with:items|string|max:255',
            'items.*.unit_price' => 'required_with:items|decimal:0,2',
            'items.*.extended_price' => 'required_with:items|decimal:0,2',
        ]);

        $purchaseRequest = PurchaseRequisiton::findOrFail($validated['pr_id']);
        
        $year = now()->year;
        $deptId =  $purchaseRequest->department->id;
        $deptCode = $purchaseRequest->department->code;
        
        $latestPO = PurchaseOrder::whereYear('created_at', $year)
        ->where('department_id', $deptId)
        ->where('po_no', 'like', "PO-{$deptCode}-{$year}-%")
        ->orderBy('id', 'desc')
        ->first();
        
        if ($latestPO) {
            $lastNumber = (int) str_replace("PO-{$deptCode}-{$year}-", '', $latestPO->po_no);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
        
        $generatedPoNo = "PO-{$deptCode}-{$year}-{$nextNumber}";
        $validated['department_id'] = $deptId;
        $validated['pr_no'] = $purchaseRequest->pr_no;
        $validated['po_no'] = $generatedPoNo;
        $validated['status'] = 'Pending for Approval';
        $purchaseOrder = PurchaseOrder::create($validated);
        $purchaseOrder->save();

        //TO INSERT PURCHASE ORDER DETAILs
        if ($request->has('items')) {
            $purchaseOrder->purchaseOrderDetails()->createMany($validated['items']);
        }
    }
};
