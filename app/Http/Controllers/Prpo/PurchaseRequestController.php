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
use App\Models\ApproverList;

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
            
            if ((string) $request->input('requestedByMe') === "true") {
                $prQuery->where('requestor_id', Auth::id());

            }

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

        $user = Auth::user();

        $validated = $request->validate([
            'date_needed' => 'required|date',
            'prod_end_user' => 'required|max:255',
            'classification_id' => 'required|integer|not_in:0',
            'is_it_related' => 'integer',
            'remarks' => 'required|string',
            'items' => 'required|array',
            'im_supervisor_id' => 'required|integer',
            'items.*.qty_in_figures' => 'required_with:items|numeric',
            'items.*.uom' => 'required_with:items|string|max:50',
            'items.*.description' => 'required_with:items|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $year = now()->year;
            $deptId = $user->department->id;
            $deptCode = $user->department->code;

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
            $validated['department_id'] = $user->dept_id;
            $validated['requestor_id'] = $user->id;
            $validated['bu_id'] = $user->bu_id;
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

            $firstApprover = $approverList->first();

            if ($firstApprover) {
                $isImmSupervisor = $firstApprover->approver_type === 'immsupervisor';

                $approverName = $isImmSupervisor
                    ? $purchaseRequisition->requestor->immediateHead->fname . ' ' . $purchaseRequisition->requestor->immediateHead->lname
                    : $firstApprover->approver_name;

                $approverEmail = $isImmSupervisor
                    ? $purchaseRequisition->requestor->immediateHead->email
                    : $firstApprover->approver_email;

                // PurchaseRequisitionNotificationService::sendApprovalEmail(
                //     'Purchase Requisition',
                //     $generatedPrNo,
                //     $approverName,
                //     $purchaseRequisition->requestor->fname . ' ' . $purchaseRequisition->requestor->lname,
                //     Carbon::now(),
                //     $purchaseRequisition->id,
                //     $approverEmail
                // );
            }

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

    public function approve(Request $request, $id)
    {
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);
        DB::beginTransaction();
        try {
            if ($request->approver_level == "1") {
                $firstApprover = ApproverList::where('pr_id', $id)
                    ->where('approver_level', 1)
                    ->where('approver_id', Auth::user()->id)
                    ->first();
    
                if ($firstApprover) {
                    $firstApprover->is_approve = 1;
                    $firstApprover->is_send_count = 1;
                    $firstApprover->approval_date = Carbon::now();
                    $firstApprover->remarks = $request->remarks;
                    $firstApprover->save();
                }
    
                $purchaseRequisition->is_approve_it_manager = 1;
                $purchaseRequisition->status = 'For approval of Immediate Head';
                $purchaseRequisition->save();
    
                $secondApprover = ApproverList::where('pr_id', $id)
                    ->where('approver_level', 2)
                    ->first();
    
                if ($secondApprover) {
                    $secondApprover->is_approve = 0;
                    $secondApprover->is_send_count = 1;
                    $secondApprover->remarks = '';
                    $secondApprover->save();
                }

                PurchaseRequisitionNotificationService::sendApprovalEmail(
                    'Purchase Requisition',
                    $purchaseRequisition->pr_no,
                    $secondApprover->approver->fname . ' ' . $secondApprover->approver->lname,
                    $purchaseRequisition->requestor->fname . ' ' . $purchaseRequisition->requestor->lname,
                    Carbon::now(),
                    $purchaseRequisition->id,
                    $secondApprover->approver->email
                );
            }
    
            if ($request->approver_level == "2") {
                $approverList = ApproverList::where('pr_id', $id)
                    ->where('approver_level', 2)
                    ->where('approver_id', Auth::user()->id)
                    ->first();
    
                if ($approverList) {
                    $approverList->is_approve = 1;
                    $approverList->is_send_count = 1;
                    $approverList->approval_date = Carbon::now();
                    $approverList->remarks = $request->remarks;
                    $approverList->save();
                }
    
                $purchaseRequisition->is_approve_im_supervisor = 1;
                $purchaseRequisition->status = 'For Finance Verification';
                $purchaseRequisition->save();
    
                $financeApprovers = Approver::where('approver_level', "3")
                    ->where('bu_id', $purchaseRequisition->bu_id)
                    ->get();
    
                foreach ($financeApprovers as $financeApprover) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $financeApprover->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => 1,
                        'remarks'       => null,
                        'approver_level'=> $financeApprover->approver_level,
                    ]);
                    PurchaseRequisitionNotificationService::sendReviewerEmail(
                        'Purchase Requisition',
                        $purchaseRequisition->pr_no,
                        $financeApprover->approver_name,
                        $purchaseRequisition->requestor->fname,
                        Carbon::now(),
                        $purchaseRequisition->id,
                        $financeApprover->approver_email
                    );
                }
            }

            DB::commit();
    
            return response()->json([
                'purchaseRequisition' => $purchaseRequisition,
                'message' => 'Purchase Requisition approved successfully.'
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
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);
        DB::beginTransaction();
        try{
            $approver = ApproverList::where('pr_id', $id)
                ->where('approver_id', Auth::user()->id)
                ->where('approver_level', $request->input('approver_level'))
                ->first();

            $approver->is_approve = 2;
            $approver->approval_date = Carbon::now();
            $approver->remarks = $request->input('remarks', 'No remarks provided.');
            $approver->save();

            if($purchaseRequisition) {
                switch ((int)$request->input('approver_level')) {
                    case 1:
                        $purchaseRequisition->status = 'Disapproved By IT Manager';
                        $purchaseRequisition->save();
                        break;
                    case 2:
                        $purchaseRequisition->status = 'Disapproved By Immediate Head';
                        $purchaseRequisition->is_approve_it_manager = 2;
                        break;
                    case 5:
                        $purchaseRequisition->status = 'Disapproved by Business Unit Head (Unbudgeted)';
                        $purchaseRequisition->is_approve1_unbudgeted = 2;
                        break;
                    case 7:
                        $purchaseRequisition->status = 'Disapproved by Business Unit Head (Overbudget)';
                        $purchaseRequisition->is_approve1_overbudgeted = 2;
                        break;
                    case 6:
                        $purchaseRequisition->status = 'Disapproved by Comptroller (Unbudgeted)';
                        $purchaseRequisition->is_approve2_unbudgeted = 2;
                        break;
                    case 8:
                        $purchaseRequisition->status = 'Disapproved by Comptroller (Overbudget)';
                        $purchaseRequisition->is_approve2_overbudgeted = 2;
                        break;
                }
                $purchaseRequisition->save();

                PurchaseRequisitionNotificationService::sendDisapprovedEmail(
                    'Purchase Requisition',
                    $purchaseRequisition->pr_no,
                    $approver->approver->fname . ' ' . $approver->approver->lname,
                    $purchaseRequisition->requestor->fname . ' ' . $purchaseRequisition->requestor->lname,
                    Carbon::now(),
                    $purchaseRequisition->id,
                    $purchaseRequisition->requestor->email
                );
            }

            DB::commit();
            return response()->json([
                'message' => 'Purchase Requisition disapproved successfully.'
            ]);
        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to disapprove Purchase Requisition.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
