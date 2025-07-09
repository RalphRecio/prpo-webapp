<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use App\Models\PoApproverList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;
use App\Services\PurchaseOrderNotificationService;

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

    public function approve(Request $request, $id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);
        DB::beginTransaction();
        try {
            if ($request->approver_level == "7") {
                $firstApprover = PoApproverList::where('po_id', $id)
                    ->where('approver_level', 7)
                    ->where('approver_id', Auth::user()->id)
                    ->first();
    
                if ($firstApprover) {
                    $firstApprover->is_approve = 1;
                    $firstApprover->is_send_count = 1;
                    $firstApprover->approval_date = Carbon::now();
                    $firstApprover->remarks = $request->remarks;
                    $firstApprover->save();
                }
    
                $purchaseOrder->is_approve1 = 1;
                $purchaseOrder->status = 'For approval of Business Unit Head(Purchase Order)';
                $purchaseOrder->save();
    
                $secondApprover = PoApproverList::where('po_id', $id)
                    ->where('approver_level', operator: 8)
                    ->first();
    
                if ($secondApprover) {
                    $secondApprover->is_approve = 0;
                    $secondApprover->is_send_count = 1;
                    $secondApprover->remarks = '';
                    $secondApprover->save();
                }

                PurchaseOrderNotificationService::sendApprovalEmail(
                    $purchaseOrder->po_no, 
                    $secondApprover->approver->approver_name, 
                    $purchaseOrder->preparedBy->fname . ' ' . $purchaseOrder->preparedBy->lname, 
                    Carbon::now(), 
                    $purchaseOrder->id,
                    $secondApprover->approver->email
                );
            }
    
            if ($request->approver_level == "8") {
                $approverList = PoApproverList::where('po_id', $id)
                    ->where('approver_level', 8)
                    ->where('approver_id', Auth::user()->id)
                    ->first();
    
                if ($approverList) {
                    $approverList->is_approve = 1;
                    $approverList->is_send_count = 1;
                    $approverList->approval_date = Carbon::now();
                    $approverList->remarks = $request->remarks;
                    $approverList->save();
                }
    
                $purchaseOrder->is_approve2 = 1;
                $purchaseOrder->status = 'Completed Purchase Order';
                $purchaseOrder->save();   
            }

            DB::commit();
    
            return response()->json([
                'purchaseOrder' => $purchaseOrder,
                'message' => 'Purchase Order approved successfully.'
            ]);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to approve Purchase Requisition.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    public function disapprove(Request $request,$id){
        $purchaseOrder = PurchaseOrder::findOrFail($id);


        DB::beginTransaction();

        try{
            $approver = PoApproverList::where('po_id', $id)
                ->where('approver_id', Auth::user()->id)
                ->where('approver_level', $request->input('approver_level'))
                ->first();

            $approver->is_approve = 2;
            $approver->approval_date = Carbon::now();
            $approver->remarks = $request->input('remarks', 'No remarks provided.');
            $approver->save();

            if($purchaseOrder) {
                switch ((int)$request->input('approver_level')) {
                    case 7:
                        $purchaseOrder->status = 'Disapproved By HRA';
                        $purchaseOrder->is_approve1 = 2;
                        break;
                    case 8:
                        $purchaseOrder->status = 'Disapproved By Business Unit Head';
                        $purchaseOrder->is_approve2 = 2;
                        break;

                }
                $purchaseOrder->save();


                // PurchaseRequisitionNotificationService::sendApprovalEmail(
                //     'Purchase Requisition',
                //     $purchaseRequisition->pr_no,
                //     $secondApprover->approver_name,
                //     $purchaseRequisition->requestor->fname,
                //     Carbon::now(),
                //     $purchaseRequisition->id,
                //     $secondApprover->approver_email
                // );
            }

            DB::commit();

            return response()->json([
                'purchaseOrder' => $purchaseOrder,
                'message' => 'Purchase Order Disapproved successfully.'
            ]);

        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to disapprove Purchase Order.',
                'message' => $e->getMessage()
            ], 500);
        }
    }




}
