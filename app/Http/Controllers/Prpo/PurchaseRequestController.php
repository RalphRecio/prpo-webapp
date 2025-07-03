<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PurchaseRequisitionNotificationService;
use App\Traits\PurchaseRequisitionQuery;
use App\Models\PurchaseRequisiton;
use App\Models\Approver;
use App\Models\Classification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;

class PurchaseRequestController extends Controller
{

    use PurchaseRequisitionQuery;

    public function index()
    {
        return Inertia::render('prpo/purchase_requisition');
    }

    public function myPurchaseRequest(Request $request)
    {
        $prQuery = $this->buildPurchaseRequisitionQuery($request)
            ->where('department_id', Auth::user()->dept_id);
    
        $purchaseRequisitions = $prQuery->get();
    
        return response()->json([
            'purchaseRequisition' => [
                'data' => $purchaseRequisitions,
            ],
        ]);
    }

    public function createPr() {
        return Inertia::render('prpo/create_pr');
    }

    public function classification()
    {
        $classifications = Classification::all();

        return response()->json([
            'classifications' => $classifications
        ]);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date_needed' => 'required|date',
            'prod_end_user' => 'required|max:255',
            'classification_id' => 'required|integer',
            'is_it_related' => 'integer',
            'remarks' => 'nullable|string',
            'items' => 'nullable|array',
            'im_supervisor_id' => 'required|integer',
            'items.*.qty_in_figures' => 'required_with:items|numeric',
            'items.*.uom' => 'required_with:items|string|max:50',
            'items.*.description' => 'required_with:items|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $year = now()->year;
            $deptId = Auth::user()->department->id;
            $deptCode = Auth::user()->department->code;

            $latestPR = PurchaseRequisiton::whereYear('created_at', $year)
                ->where('department_id', $deptId)
                ->where('pr_no', 'like', "PR-{$deptCode}-{$year}-%")
                ->orderBy('id', 'desc')
                ->first();

            $nextNumber = $latestPR
                ? ((int) str_replace("PR-{$deptCode}-{$year}-", '', $latestPR->pr_no)) + 1
                : 1;

            $generatedPrNo = "PR-{$deptCode}-{$year}-{$nextNumber}";
            $validated['pr_no'] = $generatedPrNo;
            $validated['department_id'] = Auth::user()->dept_id;
            $validated['requestor_id'] = Auth::user()->id;
            $validated['bu_id'] = Auth::user()->bu_id;
            $validated['date_issue'] = Carbon::now();

            $purchaseRequisition = PurchaseRequisiton::create($validated);
            $purchaseRequisition->is_approve_it_manager = 0;
            $purchaseRequisition->is_approve_im_supervisor = 0;
            $purchaseRequisition->im_supervisor_id = Auth::user()->immediate_head_id;
            $purchaseRequisition->status = $validated['is_it_related'] == "1"
                ? "For approval of IT Manager"
                : "For approval of Immediate Head";
            $purchaseRequisition->save();

            if ($request->has('items')) {
                $purchaseRequisition->purchaseRequisitionItems()->createMany($validated['items']);
            }

            $approverList = $validated['is_it_related'] == 1
                ? Approver::whereIn('approver_level', [1, 2])->get()
                : Approver::where('approver_level', 2)->get();

            $isFirst = true;
            foreach ($approverList as $approver) {
                $purchaseRequisition->approversList()->create([
                    'approver_id'    => $approver->approver_type == 'immsupervisor'
                        ? Auth::user()->immediate_head_id
                        : $approver->user_id,
                    'is_approve'     => 0,
                    'is_send_count'  => $isFirst ? 1 : 0,
                    'remarks'        => null,
                    'approver_level' => $approver->approver_level,
                ]);
                $isFirst = false;
            }

            // Send email to the first approver
            $this->sendInitialApprovalEmail($purchaseRequisition, $approverList, $generatedPrNo);

            DB::commit();

            return response()->json([
                'message' => 'Purchase Requisition created successfully.',
                'data' => $purchaseRequisition->load('purchaseRequisitionItems')
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create Purchase Requisition.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function sendInitialApprovalEmail($purchaseRequisition, $approverList, $generatedPrNo)
    {
        // Send to the first approver in the list
        $firstApprover = $approverList->first();
        if (!$firstApprover) {
            return;
        }

        $to = $firstApprover->approver_type == 'immsupervisor'
            ? $purchaseRequisition->requestor->immediateHead->email
            : $firstApprover->approver_email;

        PurchaseRequisitionNotificationService::sendApprovalEmail(
            $to,
            $purchaseRequisition,
            $firstApprover->approver_type == 'immsupervisor' ? 'IT Manager' : $firstApprover->approver_type,
            $firstApprover,
            $approverList,
            $generatedPrNo
        );
    }
}
