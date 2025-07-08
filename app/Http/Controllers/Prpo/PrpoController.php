<?php

namespace App\Http\Controllers\Prpo;

use App\Services\PurchaseRequisitionNotificationService;
use App\Http\Controllers\Controller;
use App\Traits\PurchaseRequisitionQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PurchaseRequisiton;
use App\Models\Classification; 
use App\Models\ApproverList;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Mail\ApproveEmail;
use App\Models\Approver;
use Carbon\Carbon;
use Exception;

class PrpoController extends Controller
{
    use PurchaseRequisitionQuery;
  
    public function destroy(Request $request, $id){
        $pr = PurchaseRequisiton::find($id);
        if ($pr) {
            $pr->delete();

            $prData = $this->buildPurchaseRequisitionQuery($request)
            ->where('department_id', auth()->user()->dept_id);

            return response()->json([
                'purchaseRequisition' => [
                    'data' => $prData->get(),
                    // 'current_page' => $pr->currentPage(),
                    // 'last_page' => $pr->lastPage(),
                    // 'total' => $pr->total(),
                ],
            ]);
        }
        return response()->json(['message' => 'Purchase Requisition not found.'], 404);
    }


    public function pendingForReview(Request $request)
    {
        $page = $request->input('page', 1);
        $pr = $this->buildPurchaseRequisitionQuery($request)
        // Only show PRs where the current user is an approver and has not yet approved
        ->whereRaw('LOWER(status) NOT LIKE ?', ['%disapproved%'])
        ->whereHas('approversList', function($query) {
            $query->where('approver_id', auth()->user()->id)
                ->where('is_send_count', 1)
                  ->where('is_approve', 0);
        });
      
       
            // ->paginate(10, ['*'], 'page', $page);
            // dd(auth()->user()->id);
        return Inertia::render('prpo/pending_approval', [
            'pendingForApproval' => [
                'data' => $pr->get(),
                // 'current_page' => $pr->currentPage(),
                // 'last_page' => $pr->lastPage(),
                // 'total' => $pr->total(),
            ],
        ]);
    }
    public function pendingForApproval(Request $request)
    {
        $page = $request->input('page', 1);
        $pr = $this->buildPurchaseRequisitionQuery($request)
            ->paginate(10, ['*'], 'page', $page);

        $pr = $pr->where('status', 'Pending for Approval');

        return Inertia::render('prpo/purchase_requisition_all', [
            'purchaseRequisition' => [
                'data' => $pr->items(),
                'current_page' => $pr->currentPage(),
                'last_page' => $pr->lastPage(),
                'total' => $pr->total(),
            ],
        ]);
    }
   
    public function viewDetails($id)
    {
        $purchaseRequisition = PurchaseRequisiton::with(['approversList.approver','requestor', 'bu.buHead', 'department', 'classification','purchaseRequisitionItems','immediateHead'])
            ->findOrFail($id);

        $classifications = Classification::all();

        return Inertia::render('prpo/pr_details', [
            'purchaseRequisition' => $purchaseRequisition,
            'classification' => $classifications
        ]);
    }
    public function approve(Request $request, $id)
    {
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        if ($request->approver_level == "1") {

            $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_level',   1)
                ->where('approver_id', auth()->user()->id)
                ->first();

            if ($approverList) {
                $approverList->is_approve = 1;
                $approverList->is_send_count = 1;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->remarks = '';
                $approverList->save();
            }
                    
            $purchaseRequisition->is_approve_it_manager = 1;
            $purchaseRequisition->status = 'For approval of Immediate Head';
            $purchaseRequisition->save();

            $approverList2 = ApproverList::where('pr_id', $id)
                ->where('approver_level', 2)
                ->first();

            if ($approverList2) {
                $approverList2->is_approve = 0;
                $approverList2->is_send_count = 1;
                $approverList2->approval_date = \Carbon\Carbon::now();
                $approverList2->remarks = '';
                $approverList2->save();
            }

            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $approverList->first()->approver_name,
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
    
               'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];

            Mail::to($approverList->approver->email)->send(new ApproveEmail($data));
        }

 

        if ($request->approver_level == "2") {

            $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_level', 2)
                ->where('approver_id', auth()->user()->id)
                ->first();
            if ($approverList) {
                $approverList->is_approve = 1;
                $approverList->is_send_count = 1;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->remarks = '';
                $approverList->save();
            }

            $purchaseRequisition->is_approve_im_supervisor = 1;
            $purchaseRequisition->status = 'For Finance Verification';
            $purchaseRequisition->save();

            $financeApprovers = Approver::where('approver_level', "3")
            ->where('bu_id',$purchaseRequisition->bu_id)
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

                $data = [
                    'request_type' => 'Purchase Request',
                    'pr_no' => $purchaseRequisition->pr_no,
                    'approver_name' => $financeApprover->approver_name,
                    'submitted_by' => $purchaseRequisition->requestor->fname,
                    'date_submitted' => $purchaseRequisition->date_issue,
        
                   'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
                ];

                Mail::to($financeApprover->approver_email)->send(new ApproveEmail($data));
            }

          
        }

        if ($request->approver_level == "3") {

            $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_level', 3)
                ->where('approver_id', auth()->user()->id)
                ->first();
            if ($approverList) {
                $approverList->is_approve = 1;
                $approverList->is_send_count = 1;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->remarks = '';
                $approverList->save();
            }

            $purchaseRequisition->budgeted = $request->budgeted;
            $purchaseRequisition->isCapexOpex = $request->budgeted;
            $purchaseRequisition->budgeted_amount =  $request->budgeted_amount;
            $purchaseRequisition->save();

            if($request->budgeted == "1") {
                $financeApprovers = Approver::where('approver_level', '4')
                ->where('bu_id',$purchaseRequisition->bu_id)
                ->get();

                foreach ($financeApprovers as $financeApprover) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $financeApprover->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => 0,
                        'remarks'       => null,
                        'approver_level'=> $financeApprover->approver_level,
                    ]);

                  
                }
            }else{
                $financeApprovers = Approver::where('approver_level', '5')
                ->where('bu_id',$purchaseRequisition->bu_id)
                ->get();

                foreach ($financeApprovers as $financeApprover) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $financeApprover->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => 0,
                        'remarks'       => null,
                        'approver_level'=> $financeApprover->approver_level,
                    ]);

        
                }

            }
        }

        return response()->json(['purchaseRequisition' => $purchaseRequisition, 'message' => 'Purchase Requisition approved successfully.']);
    }
    public function verifyFinance(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

            $purchaseRequisition->budgeted = $request->budgeted;
            $purchaseRequisition->currency = $request->currency;
            $purchaseRequisition->finance_remarks = $request->remarks;
            $purchaseRequisition->is_finance_verified = 1;
            $purchaseRequisition->budget_amount = $request->budget_amount;
            $purchaseRequisition->isCapexOpex = $request->isCapexOpex;
            $purchaseRequisition->save();

            $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_id', auth()->user()->id)
                ->first();

            if ($approverList) {
                $approverList->is_approve = 1;
                $approverList->is_send_count = 1;
                $approverList->remarks = $request->remarks;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->save();
            }

            if ((int)$request->budgeted === 1) {
                // Budgeted: Next approver is level 4
                $financeApprover = Approver::where('approver_level', 4)
                    ->where('bu_id', $purchaseRequisition->bu_id)
                    ->first();

                if ($financeApprover) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $financeApprover->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => 1,
                        'remarks'       => null,
                        'approver_level'=> $financeApprover->approver_level,
                    ]);

                    $purchaseRequisition->status = "For Procurement Sourcing";
                    $purchaseRequisition->save();

                    $data = [
                        'request_type' => 'Purchase Request',
                        'pr_no' => $purchaseRequisition->pr_no,
                        'approver_name' => $financeApprover->approver_name,
                        'submitted_by' => $purchaseRequisition->requestor->fname,
                        'date_submitted' => $purchaseRequisition->date_issue,
                        'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
                    ];

                    PurchaseRequisitionNotificationService::sendApprovalEmail(
                        'Purchase Requisition',
                        $purchaseRequisition->pr_no,
                        $financeApprover->approver_name,
                        $purchaseRequisition->requestor->fname,
                        Carbon::now(),
                        $purchaseRequisition->id,
                        $financeApprover->approver_email
                    );
                }
            } else {
                // Unbudgeted: Next approvers are level 5 and 6
                $financeApprovers = Approver::whereIn('approver_level', [5, 6])
                    ->orderBy('approver_level')
                    ->get();

                $isFirst = true;
                foreach ($financeApprovers as $financeApprover) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $financeApprover->approver_type == 'buhead'
                            ? $purchaseRequisition->bu->buHead->id
                            : $financeApprover->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => $isFirst ? 1 : 0,
                        'remarks'       => null,
                        'approver_level'=> $financeApprover->approver_level,
                    ]);
                    $isFirst = false;
                }

                // Send email to BU Head (first unbudgeted approver)
                $buHead = $purchaseRequisition->bu->buHead ?? null;
                if ($buHead) {
                    $data = [
                        'request_type' => 'Purchase Request',
                        'pr_no' => $purchaseRequisition->pr_no,
                        'approver_name' => $buHead->fname . ' ' . $buHead->lname,
                        'submitted_by' => $purchaseRequisition->requestor->fname,
                        'date_submitted' => $purchaseRequisition->date_issue,
                        'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
                    ];

                    PurchaseRequisitionNotificationService::sendApprovalEmail(
                        'Purchase Requisition',
                        $purchaseRequisition->pr_no,
                        $financeApprover->first()->approver_name,
                        $purchaseRequisition->requestor->fname,
                        Carbon::now(),
                        $purchaseRequisition->id,
                        $financeApprover->first()->approver_email
                    );
                }

                $purchaseRequisition->status = "For approval of Business Unit Head (Unbudgeted)";
                $purchaseRequisition->save();
            }

            DB::commit();
            return response()->json(['message' => 'Finance verification successful.']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Finance verification failed.', 'message' => $e->getMessage()], 500);
        }
    }
    public function approveUnbudget($id){
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        if($purchaseRequisition->is_approve1_unbudgeted == 1){
            $purchaseRequisition->is_approve2_unbudgeted = 1;
            $purchaseRequisition->status = "For approval of Comptroller (Unbudgeted)";
            $purchaseRequisition->save();

            $financeApprover = Approver::where('approver_level', '4')
            ->where('bu_id',$purchaseRequisition->bu_id)
            ->first();

            ApproverList::create([
                'pr_id'         => $id,
                'approver_id'   => $financeApprover->user_id,
                'is_approve'    => 0,
                'is_send_count' => 1,
                'remarks'       => null,
                'approver_level'=> $financeApprover->approver_level,
            ]);
            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $financeApprover->approver_name,
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
                'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];

            Mail::to($financeApprover->approver_email)->send(new ApproveEmail($data));
        }

        $purchaseRequisition->is_approve1_unbudgeted = 1;
        $purchaseRequisition->save();

        $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_id', Auth::user()->id)
                ->first();

        if ($approverList) {
            $approverList->is_approve = 1;
            $approverList->is_send_count = 1;
            $approverList->remarks =  '';
            $approverList->approval_date = \Carbon\Carbon::now();
            $approverList->save();
        }
    }
    public function verifyProcurement(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

            $purchaseRequisition->supplier_name = $request->supplier_name;
            $purchaseRequisition->actual_amount = $request->actual_amount;
            $purchaseRequisition->procurement_remarks = $request->procurement_remarks;
            $purchaseRequisition->is_procurement_verified = 1;
            $purchaseRequisition->save();

            $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_id', Auth::user()->id)
                ->first();

            if ($approverList) {
                $approverList->is_approve = 1;
                $approverList->remarks = $request->remarks;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->save();
            }

            if ($purchaseRequisition->budget_amount < $purchaseRequisition->actual_amount) {
                $purchaseRequisition->status = 'Pending For Approval (Over budget)';
                $purchaseRequisition->is_overbudget = 1;
                $purchaseRequisition->save();

                $overBudgetApprovers = Approver::whereIn('approver_level', [5, 6])
                    ->orderBy('approver_level')
                    ->get();

                $approverLevel = 7;
                $isFirst = true;
                foreach ($overBudgetApprovers as $approver) {
                    ApproverList::create([
                        'pr_id'         => $id,
                        'approver_id'   => $approver->approver_type == 'buhead'
                            ? $purchaseRequisition->bu->buHead->id
                            : $approver->user_id,
                        'is_approve'    => 0,
                        'is_send_count' => $isFirst ? 1 : 0,
                        'remarks'       => null,
                        'approver_level'=> $approverLevel,
                    ]);
                    $approverLevel++;
                    $isFirst = false;
                }

                $firstOverBudgetApprover = $overBudgetApprovers->first();
                if ($firstOverBudgetApprover) {
                    PurchaseRequisitionNotificationService::sendApprovalEmail(
                        'Purchase Request',
                        $purchaseRequisition->pr_no,
                        $firstOverBudgetApprover->approver_name,
                        $purchaseRequisition->requestor->fname,
                        Carbon::now(),
                        $purchaseRequisition->id,
                        $firstOverBudgetApprover->approver_email
                    );
                }
            } else {
                $purchaseRequisition->status = 'Open';
                $purchaseRequisition->save();
            }

            DB::commit();
            return response()->json(['message' => 'Purchase Requisition approved successfully.']);
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json(['message' => 'Error approving purchase requisition.'], 500);
        }
    }
    public function approveOverBudget($id)
    {
        DB::beginTransaction();
        try {
            $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

            if ($purchaseRequisition->is_approve1_overbudgeted == 1) {
                $purchaseRequisition->is_approve2_overbudgeted = 1;
                $purchaseRequisition->status = 'open';
                $purchaseRequisition->save();

                // Get current approver (level 8)
                $approverOverbudget = ApproverList::where('pr_id', $id)
                    ->where('approver_id', Auth::user()->id)
                    ->where('approver_level', 8)
                    ->first();

                if ($approverOverbudget) {
                    $approverOverbudget->is_approve = 1;
                    $approverOverbudget->remarks = '';
                    $approverOverbudget->approval_date = Carbon::now();
                    $approverOverbudget->save();
                }

                DB::commit();
                return response()->json(['message' => 'Overbudget approval completed.']);
            }

            $purchaseRequisition->is_approve1_overbudgeted = 1;
            $purchaseRequisition->save();

            // Get current approver (level 7)
            $approverOverbudget = ApproverList::where('pr_id', $id)
                ->where('approver_id', Auth::user()->id)
                ->where('approver_level', 7)
                ->first();

            if ($approverOverbudget) {
                $approverOverbudget->is_approve = 1;
                $approverOverbudget->remarks = '';
                $approverOverbudget->approval_date = Carbon::now();
                $approverOverbudget->save();
            }

            // Set up next approver (level 8)
            $nextApproverOverbudget = ApproverList::where('pr_id', $id)
                ->where('approver_level', 8)
                ->first();

            if ($nextApproverOverbudget) {
                $nextApproverOverbudget->is_approve = 0;
                $nextApproverOverbudget->is_send_count = 1;
                $nextApproverOverbudget->remarks = '';
                $nextApproverOverbudget->save();

                // Send email to next approver
                PurchaseRequisitionNotificationService::sendApprovalEmail(
                    'Purchase Requisition',
                    $purchaseRequisition->pr_no,
                    $nextApproverOverbudget->approver->fname . ' ' . $nextApproverOverbudget->approver->lname,
                    $purchaseRequisition->requestor->fname,
                    $purchaseRequisition->date_issue,
                    $purchaseRequisition->id,
                    $nextApproverOverbudget->approver->email
                );
            }

            DB::commit();
            return response()->json(['message' => 'Overbudget approval completed.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error in overbudget approval.', 'error' => $e->getMessage()], 500);
        }
    }
}
