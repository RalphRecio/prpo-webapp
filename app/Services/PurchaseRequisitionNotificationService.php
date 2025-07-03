<?php
namespace App\Services;

use App\Mail\ApproveEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class PurchaseRequisitionNotificationService
{
    public static function sendApprovalEmail($to ,$purchaseRequisition, $type, $approver, $approverList, $generatedPrNo = null)
    {
         
        $data = [
            'request_type' => 'Purchase Request',
            'pr_no' => $generatedPrNo ?? $purchaseRequisition->pr_no,
            'approver_name' => $approver->approver_type == 'immsupervisor'
                ? $purchaseRequisition->requestor->immediateHead->fname
                : $approverList->first()->approver_name,
            'submitted_by' => Auth::user()->fname,
            'date_submitted' => now(),
            'type' => $type,
            'approver_link' => url('/prpo/purchase-request/details/' . $purchaseRequisition->id),
            'approver_history' =>  $purchaseRequisition->approversList()
                ->with('approver')
                ->orderBy('created_at', 'desc')
                ->get()
        ];

        Mail::to($to)->send(new ApproveEmail($data));
    }
}