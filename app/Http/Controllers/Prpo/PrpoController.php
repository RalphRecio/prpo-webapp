<?php

namespace App\Http\Controllers\Prpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PurchaseRequisiton;
use App\Models\Classification; 
use App\Models\ApproverList;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApproveEmail;
use App\Mail\DisapprovedEmail;
use App\Models\Approver;
use Carbon\Carbon;

class PrpoController extends Controller
{
    private function buildPurchaseRequisitionQuery(Request $request)
    {
        $search = $request->input('search', '');

        $pr = PurchaseRequisiton::query();

        // Search filter
        if (!empty($search)) {
            $columns = [
                'pr_no', 'requestor_id', 'date_issue', 'date_needed', 'bu_id',
                'department_id', 'prod_end_user', 'classification_id', 'remarks',
                'is_it_related', 'is_approve_it_manager', 'is_approve_im_supervisor', 'status'
            ];
            $pr->where(function($query) use ($search, $columns) {
                foreach ($columns as $col) {
                    $query->orWhere($col, 'like', '%' . $search . '%');
                }
            });
        }

        // Additional filters
        $filters = [
            'Barcode' => 'product.barcode',
            'Lot_Code' => 'lot_code',
            'Product_Code' => 'product.item_code',
        ];

        foreach ($filters as $requestKey => $dbColumn) {
            $value = $request->input($requestKey);
            if (!empty($value)) {
                if (str_contains($dbColumn, '.')) {
                    [$relation, $column] = explode('.', $dbColumn, 2);
                    $pr->whereHas($relation, function ($query) use ($column, $value) {
                        $query->where($column, 'like', "%{$value}%");
                    });
                } else {
                    $pr->where($dbColumn, 'like', "%{$value}%");
                }
            }
        }

        return $pr->select(
                'id',
                'pr_no',
                'requestor_id',
                'date_issue',
                'date_needed',
                'bu_id',
                'department_id',
                'prod_end_user',
                'classification_id',
                'remarks',
                'is_it_related',
                'is_approve_it_manager',
                'is_approve_im_supervisor',
                'status'
            )
            ->with(['requestor', 'bu', 'department', 'classification','approversList']);
    }
    public function index()
    {
        return Inertia::render('prpo/purchase_requisition');
    }
    public function myPurchaseRequest(Request $request){
        $page = $request->input('page', 1);
        $pr = $this->buildPurchaseRequisitionQuery($request)
            ->where('department_id', auth()->user()->dept_id);
            // ->paginate(10, ['*'], 'page', $page);

            return response()->json([
                'purchaseRequisition' => [
                    'data' => $pr->get(),
                    // 'current_page' => $pr->currentPage(),
                    // 'last_page' => $pr->lastPage(),
                    // 'total' => $pr->total(),
                ],
            ]);
    }
    public function allRequests(Request $request)
    {
        $page = $request->input('page', 1);
        $pr = $this->buildPurchaseRequisitionQuery($request)
            ->paginate(10, ['*'], 'page', $page);

        return Inertia::render('prpo/purchase_requisition_all', [
            'purchaseRequisition' => [
                'data' => $pr->items(),
                'current_page' => $pr->currentPage(),
                'last_page' => $pr->lastPage(),
                'total' => $pr->total(),
            ],
        ]);
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
            'items.*.status' => 'required_with:items|string|max:50'
            ]
        );

        $year = now()->year;
        $deptId = auth()->user()->department->id;
        $deptCode = auth()->user()->department->code;

        $latestPR = PurchaseRequisiton::whereYear('created_at', $year)
            ->where('department_id', $deptId)
            ->where('pr_no', 'like', "PR-{$deptCode}-{$year}-%")
            ->orderBy('id', 'desc')
            ->first();

        if ($latestPR) {
            $lastNumber = (int) str_replace("PR-{$deptCode}-{$year}-", '', $latestPR->pr_no);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        $generatedPrNo = "PR-{$deptCode}-{$year}-{$nextNumber}";
        $validated['pr_no'] = $generatedPrNo;

        $validated['department_id'] = auth()->user()->dept_id;
        $validated['requestor_id'] = auth()->user()->id;
        $validated['bu_id'] = auth()->user()->bu_id;
        $validated['date_issue'] =  Carbon::now();

        $purchaseRequisition = PurchaseRequisiton::create($validated);
        $purchaseRequisition->is_approve_it_manager = 0;
        $purchaseRequisition->is_approve_im_supervisor = 0;
        $purchaseRequisition->im_supervisor_id = auth()->user()->immediate_head_id;

        $purchaseRequisition->status = $validated['is_it_related']  == "1" ? "For approval of IT Manager" : "For approval of Immediate Head";
        $purchaseRequisition->save();

        if ($request->has('items')) {
            $purchaseRequisition->purchaseRequisitionItems()->createMany($validated['items']);
        }

        if ($validated['is_it_related'] == 1) {
            $approverList = Approver::whereIn('approver_level', [1, 2])->get();
        } else {
            $approverList = Approver::where('approver_level', 2)->get();
        }

        $isFirst = true;
        foreach ($approverList as $approver) {
            $purchaseRequisition->approversList()->create([
                'approver_id'    => $approver->approver_type == 'immsupervisor' ? auth()->user()->immediate_head_id : $approver->user_id,
                'is_approve'     => 0,
                'is_send_count'  => $isFirst ? 1 : 0,
                'remarks'        => null,
                'approver_level' => $approver->approver_level,
            ]);
            $isFirst = false;
        }

        $data = [
            'request_type' => 'Purchase Request',
            'pr_no' => $generatedPrNo,
            'approver_name' => $approver->approver_type == 'immsupervisor' ? $purchaseRequisition->requestor->immediateHead->fname :  $approverList->first()->approver_name,
            'submitted_by' => auth()->user()->fname,
            'date_submitted' => Carbon::now(),

           'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
        ];

        Mail::to($approver->approver_type == 'immsupervisor' ? $purchaseRequisition->requestor->immediateHead->email : $approverList->approver_email)->send(new ApproveEmail($data));

        return response()->json([
            'message' => 'Purchase Requisition created successfully.',
            'data' => $purchaseRequisition->load('purchaseRequisitionItems')
        ], 201);
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
    public function verifyFinance(Request $request, $id){

        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        $purchaseRequisition->budgeted = $request->budgeted;
        $purchaseRequisition->currency = $request->currency;
        $purchaseRequisition->finance_remarks =  $request->remarks;
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
                $approverList->remarks =  $request->remarks;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->save();
            }

        //IF BUDGETED
        if ((int)$request->budgeted == 1){
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

            Mail::to($financeApprover->approver_email)->send(new ApproveEmail($data));

            

        }else{
            $financeApprovers = Approver::whereIn('approver_level', ['5','6'])
            ->orderBy('approver_level')
            ->get();

            $isFirst = true;
            foreach ($financeApprovers as $financeApprover) {
                ApproverList::create([
                    'pr_id'         => $id,
                    'approver_id'   => $financeApprover->approver_type == 'buhead' ? $purchaseRequisition->bu->buHead->id : $financeApprover->user_id,
                    'is_approve'    => 0,
                    'is_send_count' => $isFirst ? 1 : 0,
                    'remarks'       => null,
                    'approver_level'=> $financeApprover->approver_level,
                ]);

                $isFirst = false; 
            }


            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $financeApprover->approver_name,
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
    
            'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];

            Mail::to($purchaseRequisition->bu->buHead->email)->send(new ApproveEmail($data));


            $purchaseRequisition->status = "For approval of Business Unit Head (Unbudgeted)";
            $purchaseRequisition->save();

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
                ->where('approver_id', auth()->user()->id)
                ->first();

        if ($approverList) {
            $approverList->is_approve = 1;
            $approverList->is_send_count = 1;
            $approverList->remarks =  '';
            $approverList->approval_date = \Carbon\Carbon::now();
            $approverList->save();
        }
    }
    public function verifyProcurement(Request $request, $id){

        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        $purchaseRequisition->supplier_name = $request->supplier_name;
        $purchaseRequisition->actual_amount =  $request->actual_amount;
        $purchaseRequisition->procurement_remarks = $request->procurement_remarks;
        $purchaseRequisition->is_procurement_verified = 1;
        $purchaseRequisition->save();

        $approverList = ApproverList::where('pr_id', $id)
                ->where('approver_id', auth()->user()->id)
                ->first();
                
            if ($approverList) {
                $approverList->is_approve = 1;
                // $approverList->is_send_count = 1;
                $approverList->remarks =  $request->remarks;
                $approverList->approval_date = \Carbon\Carbon::now();
                $approverList->save();
            }


        if ($purchaseRequisition->budget_amount < $purchaseRequisition->actual_amount){

            $purchaseRequisition->status = 'Pending For Approval (Over budget)';    
            $purchaseRequisition->is_overbudget = 1;
            $purchaseRequisition->save();

            $overBudgetApprover = Approver::whereIn('approver_level', ['5','6'])->orderBy('approver_level')->get();

            $approverLevel = 7;
            $isFirst = true;
            foreach ($overBudgetApprover as $approver) {
                ApproverList::create([
                    'pr_id'         => $id,
                    'approver_id'   => $approver->approver_type == 'buhead' ? $purchaseRequisition->bu->buHead->id : $approver->user_id,
                    'is_approve'    => 0,
                    'is_send_count' => $isFirst ? 1 : 0,
                    'remarks'       => null,
                    'approver_level'=> $approverLevel,
                ]);
                $approverLevel++;
                $isFirst = false; // Only the first will be 1, rest will be 0
            }

            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $overBudgetApprover->first()->approver_name,
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
    
               'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];
            Mail::to($purchaseRequisition->bu->buHead->email)->send(new ApproveEmail($data));
        }else{
        
            $purchaseRequisition->status = 'Open';
            $purchaseRequisition->save();
        }

        return response()->json(['message' => 'Purchase Requisition approved successfully.']);
    }
    public function approveOverBudget($id){
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        if($purchaseRequisition->is_approve1_overbudgeted == 1){
            $purchaseRequisition->is_approve2_overbudgeted = 1;
            $purchaseRequisition->status = 'open';
            $purchaseRequisition->save();


            $approverOverbudget = ApproverList::where('pr_id', $id)
            ->where('approver_id', auth()->user()->id)
            ->where('approver_level', 8)
            ->first();

            if ($approverOverbudget) {
                    $approverOverbudget->is_approve = 1;
                    $approverOverbudget->remarks =  '';
                    $approverOverbudget->approval_date = \Carbon\Carbon::now();
                    $approverOverbudget->save();
                }

                return;
        }

        $purchaseRequisition->is_approve1_overbudgeted = 1;
        $purchaseRequisition->save();

        $approverOverbudget = ApproverList::where('pr_id', $id)
                ->where('approver_id', auth()->user()->id)
                ->where('approver_level',operator: 7)
                ->first();

           if ($approverOverbudget) {
                $approverOverbudget->is_approve = 1;
                $approverOverbudget->remarks =  '';
                $approverOverbudget->approval_date = \Carbon\Carbon::now();
                $approverOverbudget->save();
            }

            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $approverOverbudget->approver_name,
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
                'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];

            Mail::to($approverOverbudget->approver_email)->send(new ApproveEmail($data));
    }


    public function disapprove(Request $request,$id){
        $purchaseRequisition = PurchaseRequisiton::findOrFail($id);

        $approver = ApproverList::where('pr_id', $id)
            ->where('approver_id', auth()->user()->id)
            ->where('approver_level', $request->input('approver_level'))
            ->first();

        $approver->is_approve = 2;
        $approver->approval_date = \Carbon\Carbon::now();
        $approver->remarks = $request->input('remarks', 'No remarks provided.');
        $approver->save();

        if($purchaseRequisition) {
            switch ((int)$request->input('approver_level')) {
                case 1:
                    $purchaseRequisition->status = 'Disapproved By IT Manager';
                    break;
                case 2:
                    $purchaseRequisition->status = 'Disapproved By Immediate Head';
                    break;
                case 5:
                    $purchaseRequisition->status = 'Disapproved by Business Unit Head (Unbudgeted)';
                    break;
                case 7:
                    $purchaseRequisition->status = 'Disapproved by Business Unit Head (Overbudget)';
                    break;
                case 6:
                    $purchaseRequisition->status = 'Disapproved by Comptroller (Unbudgeted)';
                    break;
                case 8:
                    $purchaseRequisition->status = 'Disapproved by Comptroller (Overbudget)';
                    break;
            }
            $purchaseRequisition->save();

            $data = [
                'request_type' => 'Purchase Request',
                'pr_no' => $purchaseRequisition->pr_no,
                'approver_name' => $request->input('approver_name'),
                'submitted_by' => $purchaseRequisition->requestor->fname,
                'date_submitted' => $purchaseRequisition->date_issue,
                'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id)
            ];

            Mail::to($purchaseRequisition->requestor->email)->send(new DisapprovedEmail($data));
        }
    }
}
