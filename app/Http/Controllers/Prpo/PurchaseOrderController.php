<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Models\PurchaseRequisitionDetails;
use Illuminate\Http\Request;
use App\Models\PurchaseRequisiton;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\PurchaseOrder;
use App\Models\Approver;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use \Exception;
use App\Services\PurchaseOrderNotificationService;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;


class PurchaseOrderController extends Controller
{
    public function index(Request $reqeust, $id ){

        $purchaseRequest = PurchaseRequisiton::with(['bu'])->findOrFail($id);

        $vendorList = Vendor::get();

        return Inertia::render('prpo/create_purchase_order', [
            'purchaseRequest' => $purchaseRequest,
            'vendorList' => $vendorList
        ]);
    }

    public function getPRItem($id){
        $prItems = PurchaseRequisitionDetails::where('pr_id',$id)->where('qty_in_figures','>',0)->get();

        return response()->json($prItems); 
    }

    public function store(Request $request)
    {
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
            'ship_to'=> 'required|string',
            'ship_to_address'=> 'required|string',
            'items' => 'nullable|array',
            'items.*.pr_details_id' => 'required|numeric',
            'items.*.qty_ordered' => 'required_with:items|numeric',
            'items.*.unit_of_measure' => 'required_with:items|string|max:50',
            'items.*.description1' => 'required_with:items|string|max:255',
            'items.*.description2' => 'max:255',
            'items.*.unit_price' => 'required_with:items|decimal:0,2',
            'items.*.extended_price' => 'required_with:items|decimal:0,2',
        ]);

        DB::beginTransaction();
        try {
            $purchaseRequest = PurchaseRequisiton::findOrFail($validated['pr_id']);

            $year = now()->year;
            $deptId = $purchaseRequest->department->id;
            $deptCode = $purchaseRequest->department->code;

            $latestPO = PurchaseOrder::whereYear('created_at', $year)
                ->where('department_id', $deptId)
                ->where('po_no', 'like', "PO-{$deptCode}-{$year}-%")
                ->orderBy('id', 'desc')
                ->first();

            $nextNumber = $latestPO
                ? ((int) str_replace("PO-{$deptCode}-{$year}-", '', $latestPO->po_no)) + 1
                : 1;

            $generatedPoNo = "PO-{$deptCode}-{$year}-{$nextNumber}";
            $validated['department_id'] = $deptId;
            $validated['pr_no'] = $purchaseRequest->pr_no;
            $validated['po_no'] = $generatedPoNo;
            $validated['status'] = 'For approval of HRA';
            $validated['prepared_by_id'] = Auth::user()->id;

            $purchaseOrder = PurchaseOrder::create($validated);

            // Insert purchase order details and update PR details
            if (!empty($validated['items'])) {
                $itemsWithPrId = array_map(function ($item) use ($purchaseRequest) {
                    $item['pr_id'] = $purchaseRequest->id;
                    return $item;
                }, $validated['items']);

                $purchaseOrder->purchaseOrderDetails()->createMany($itemsWithPrId);

                foreach ($itemsWithPrId as $item) {
                    PurchaseRequisitionDetails::where('id', $item['pr_details_id'])
                        ->decrement('qty_in_figures', $item['qty_ordered']);
                }
            }

            // Assign approvers and send notification
            $approverList = Approver::where('approver_type', 'poapprover')->orderBy('approver_level')->get();
            $isFirst = true;
            foreach ($approverList as $approver) {
                $purchaseOrder->poApproversList()->create([
                    'approver_id'    => $approver->user_id,
                    'is_approve'     => 0,
                    'is_send_count'  => $isFirst ? 1 : 0,
                    'remarks'        => null,
                    'approver_level' => $approver->approver_level,
                ]);
                $isFirst = false;
            }

            PurchaseOrderNotificationService::sendApprovalEmail(
                $generatedPoNo, 
                $approverList->first()->approver_name , 
                Auth::user()->fname . ' ' . Auth::user()->lname, 
                Carbon::now(), 
                $purchaseOrder->id,
                $approverList->first()->approver_email
            );

            DB::commit();

        } catch(Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function downloadPdf($id)
    {

        $purchaseOrder = PurchaseOrder::with(['purchaseOrderDetails', 'preparedBy','poApproversList.approver','purchaseRequest'])->findOrFail($id);
        $data = [
            'purchaseOrder' => $purchaseOrder,
        ];


        $purchaseOrder->purchase_order_details = $purchaseOrder->purchaseOrderDetails ? $purchaseOrder->purchaseOrderDetails->toArray() : [];
        // return view('printable.po_print', compact('purchaseOrder'));
        $pdf = Pdf::loadView('printable.po_print', $data);
        return $pdf->download('purchase-order.pdf');
    }


    public function printPo($id)
    {

        $purchaseOrder = PurchaseOrder::with(['purchaseOrderDetails', 'preparedBy','poApproversList.approver','purchaseRequest'])->findOrFail($id);
        $data = [
            'purchaseOrder' => $purchaseOrder,
        ];
        $purchaseOrder->purchase_order_details = $purchaseOrder->purchaseOrderDetails ? $purchaseOrder->purchaseOrderDetails->toArray() : [];
        return view('printable.po_print', compact('purchaseOrder'));
    
    }
};
